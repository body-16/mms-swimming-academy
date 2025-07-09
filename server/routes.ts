import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, insertMemberSchema, insertContactSchema, 
  loginSchema, registerSchema, insertBookingSchema, insertPaymentSchema,
  insertMemberProgressSchema, insertBlogPostSchema 
} from "@shared/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
  };
}

// Middleware to verify JWT token
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Middleware to check if user is admin
const requireAdmin = (req: any, res: any, next: any) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = registerSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      // Create user
      const user = await storage.createUser({
        email: userData.email,
        password: hashedPassword,
        role: "member"
      });
      
      // Create member profile
      const member = await storage.createMember({
        userId: user.id,
        fullName: userData.fullName,
        phone: userData.phone,
        age: userData.age,
        swimmingLevel: userData.swimmingLevel,
        program: userData.program,
        medicalInfo: userData.medicalInfo,
        emergencyContact: userData.emergencyContact,
        status: "active"
      });
      
      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      res.json({
        user: { id: user.id, email: user.email, role: user.role },
        member,
        token
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).json({ message: "Registration failed" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      
      // Find user
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      // Get additional profile data
      let profile = null;
      if (user.role === "member") {
        profile = await storage.getMemberByUserId(user.id);
      } else if (user.role === "coach") {
        profile = await storage.getCoachByUserId(user.id);
      }
      
      res.json({
        user: { id: user.id, email: user.email, role: user.role },
        profile,
        token
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(400).json({ message: "Login failed" });
    }
  });

  // Member routes
  app.get("/api/members", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const members = await storage.getAllMembers();
      res.json(members);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch members" });
    }
  });

  app.get("/api/members/me", authenticateToken, async (req: any, res) => {
    try {
      const member = await storage.getMemberByUserId(req.user.id);
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }
      res.json(member);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch member data" });
    }
  });

  // Coach routes
  app.get("/api/coaches", async (req, res) => {
    try {
      const coaches = await storage.getAllCoaches();
      res.json(coaches);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch coaches" });
    }
  });

  // Program routes
  app.get("/api/programs", async (req, res) => {
    try {
      const programs = await storage.getAllPrograms();
      res.json(programs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch programs" });
    }
  });

  // Class routes
  app.get("/api/classes", async (req, res) => {
    try {
      const classes = await storage.getAllClasses();
      res.json(classes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch classes" });
    }
  });

  // Booking routes
  app.post("/api/bookings", authenticateToken, async (req: any, res) => {
    try {
      const member = await storage.getMemberByUserId(req.user.id);
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }
      
      const bookingData = insertBookingSchema.parse({
        ...req.body,
        memberId: member.id
      });
      
      const booking = await storage.createBooking(bookingData);
      res.json(booking);
    } catch (error) {
      res.status(400).json({ message: "Failed to create booking" });
    }
  });

  app.get("/api/bookings/me", authenticateToken, async (req: any, res) => {
    try {
      const member = await storage.getMemberByUserId(req.user.id);
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }
      
      const bookings = await storage.getBookingsByMember(member.id);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  // Payment routes
  app.post("/api/payments", authenticateToken, async (req: any, res) => {
    try {
      const member = await storage.getMemberByUserId(req.user.id);
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }
      
      const paymentData = insertPaymentSchema.parse({
        ...req.body,
        memberId: member.id
      });
      
      const payment = await storage.createPayment(paymentData);
      res.json(payment);
    } catch (error) {
      res.status(400).json({ message: "Failed to create payment" });
    }
  });

  app.get("/api/payments/me", authenticateToken, async (req: any, res) => {
    try {
      const member = await storage.getMemberByUserId(req.user.id);
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }
      
      const payments = await storage.getPaymentsByMember(member.id);
      res.json(payments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch payments" });
    }
  });

  app.get("/api/payments", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const payments = await storage.getAllPayments();
      res.json(payments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch payments" });
    }
  });

  // Member progress routes
  app.get("/api/progress/me", authenticateToken, async (req: any, res) => {
    try {
      const member = await storage.getMemberByUserId(req.user.id);
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }
      
      const progress = await storage.getMemberProgressByMember(member.id);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });

  app.post("/api/progress", authenticateToken, async (req: any, res) => {
    try {
      const progressData = insertMemberProgressSchema.parse(req.body);
      const progress = await storage.createMemberProgress(progressData);
      res.json(progress);
    } catch (error) {
      res.status(400).json({ message: "Failed to create progress entry" });
    }
  });

  // Blog routes
  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getBlogPostById(id);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.post("/api/blog", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const postData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(postData);
      res.json(post);
    } catch (error) {
      res.status(400).json({ message: "Failed to create blog post" });
    }
  });

  // Contact routes
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.json(contact);
    } catch (error) {
      res.status(400).json({ message: "Failed to submit contact form" });
    }
  });

  app.get("/api/contacts", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  // Dashboard stats routes
  app.get("/api/admin/stats", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const members = await storage.getAllMembers();
      const payments = await storage.getAllPayments();
      const classes = await storage.getAllClasses();
      
      const totalMembers = members.length;
      const activeMembers = members.filter(m => m.status === "active").length;
      const totalRevenue = payments
        .filter(p => p.paymentStatus === "completed")
        .reduce((sum, p) => sum + parseFloat(p.amount), 0);
      const activeClasses = classes.filter(c => c.status === "active").length;
      
      res.json({
        totalMembers,
        activeMembers,
        totalRevenue,
        activeClasses,
        monthlyRevenue: totalRevenue, // Simplified for demo
        poolUtilization: Math.floor(Math.random() * 30) + 70 // Mock data
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch admin stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
