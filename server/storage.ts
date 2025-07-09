import { 
  users, members, coaches, programs, classes, bookings, payments, 
  memberProgress, blogPosts, contacts,
  type User, type InsertUser, type Member, type InsertMember,
  type Coach, type InsertCoach, type Program, type InsertProgram,
  type Class, type InsertClass, type Booking, type InsertBooking,
  type Payment, type InsertPayment, type MemberProgress, type InsertMemberProgress,
  type BlogPost, type InsertBlogPost, type Contact, type InsertContact
} from "@shared/schema";

export interface IStorage {
  // User operations
  createUser(user: InsertUser): Promise<User>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserById(id: number): Promise<User | undefined>;
  
  // Member operations
  createMember(member: InsertMember): Promise<Member>;
  getMemberByUserId(userId: number): Promise<Member | undefined>;
  getMemberById(id: number): Promise<Member | undefined>;
  getAllMembers(): Promise<Member[]>;
  updateMember(id: number, member: Partial<Member>): Promise<Member>;
  
  // Coach operations
  createCoach(coach: InsertCoach): Promise<Coach>;
  getCoachByUserId(userId: number): Promise<Coach | undefined>;
  getAllCoaches(): Promise<Coach[]>;
  updateCoach(id: number, coach: Partial<Coach>): Promise<Coach>;
  
  // Program operations
  getAllPrograms(): Promise<Program[]>;
  getProgramById(id: number): Promise<Program | undefined>;
  createProgram(program: InsertProgram): Promise<Program>;
  
  // Class operations
  getAllClasses(): Promise<Class[]>;
  getClassById(id: number): Promise<Class | undefined>;
  getClassesByCoach(coachId: number): Promise<Class[]>;
  createClass(classData: InsertClass): Promise<Class>;
  
  // Booking operations
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookingsByMember(memberId: number): Promise<Booking[]>;
  getBookingsByClass(classId: number): Promise<Booking[]>;
  updateBooking(id: number, booking: Partial<Booking>): Promise<Booking>;
  
  // Payment operations
  createPayment(payment: InsertPayment): Promise<Payment>;
  getPaymentsByMember(memberId: number): Promise<Payment[]>;
  getAllPayments(): Promise<Payment[]>;
  
  // Member progress operations
  createMemberProgress(progress: InsertMemberProgress): Promise<MemberProgress>;
  getMemberProgressByMember(memberId: number): Promise<MemberProgress[]>;
  
  // Blog operations
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  
  // Contact operations
  createContact(contact: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
  updateContact(id: number, contact: Partial<Contact>): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private members: Map<number, Member>;
  private coaches: Map<number, Coach>;
  private programs: Map<number, Program>;
  private classes: Map<number, Class>;
  private bookings: Map<number, Booking>;
  private payments: Map<number, Payment>;
  private memberProgress: Map<number, MemberProgress>;
  private blogPosts: Map<number, BlogPost>;
  private contacts: Map<number, Contact>;
  
  private currentUserId: number;
  private currentMemberId: number;
  private currentCoachId: number;
  private currentProgramId: number;
  private currentClassId: number;
  private currentBookingId: number;
  private currentPaymentId: number;
  private currentProgressId: number;
  private currentBlogId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.members = new Map();
    this.coaches = new Map();
    this.programs = new Map();
    this.classes = new Map();
    this.bookings = new Map();
    this.payments = new Map();
    this.memberProgress = new Map();
    this.blogPosts = new Map();
    this.contacts = new Map();
    
    this.currentUserId = 1;
    this.currentMemberId = 1;
    this.currentCoachId = 1;
    this.currentProgramId = 1;
    this.currentClassId = 1;
    this.currentBookingId = 1;
    this.currentPaymentId = 1;
    this.currentProgressId = 1;
    this.currentBlogId = 1;
    this.currentContactId = 1;
    
    this.initializeData();
  }

  private initializeData() {
    // Create sample programs
    const kidsProgram: Program = {
      id: this.currentProgramId++,
      name: "Kids Program",
      description: "Fun and safe swimming lessons for children with water safety focus",
      ageGroup: "4-12 years",
      level: "beginner",
      price: "800",
      duration: 45,
      capacity: 8,
      status: "active"
    };
    
    const adultProgram: Program = {
      id: this.currentProgramId++,
      name: "Adult Program",
      description: "Professional swimming instruction for beginners to advanced levels",
      ageGroup: "18+",
      level: "all",
      price: "1200",
      duration: 60,
      capacity: 6,
      status: "active"
    };
    
    const competitiveProgram: Program = {
      id: this.currentProgramId++,
      name: "Competitive Training",
      description: "Elite training program for competitive swimmers and athletes",
      ageGroup: "12+",
      level: "advanced",
      price: "2000",
      duration: 90,
      capacity: 4,
      status: "active"
    };
    
    this.programs.set(kidsProgram.id, kidsProgram);
    this.programs.set(adultProgram.id, adultProgram);
    this.programs.set(competitiveProgram.id, competitiveProgram);
    
    // Create sample admin user
    const adminUser: User = {
      id: this.currentUserId++,
      email: "admin@mmsswimming.com",
      password: "$2b$10$hashedpassword", // In real app, this would be hashed
      role: "admin",
      createdAt: new Date()
    };
    this.users.set(adminUser.id, adminUser);
    
    // Create sample coaches
    const coachUser1: User = {
      id: this.currentUserId++,
      email: "ahmed.hassan@mmsswimming.com",
      password: "$2b$10$hashedpassword",
      role: "coach",
      createdAt: new Date()
    };
    this.users.set(coachUser1.id, coachUser1);
    
    const coach1: Coach = {
      id: this.currentCoachId++,
      userId: coachUser1.id,
      fullName: "Ahmed Hassan",
      phone: "+20 123 456 7890",
      experience: 15,
      certifications: ["Olympic training certified", "Water Safety Instructor"],
      specialties: ["Freestyle", "Butterfly"],
      bio: "15+ years experience, Olympic training certified",
      imageUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      status: "active"
    };
    this.coaches.set(coach1.id, coach1);
    
    const coachUser2: User = {
      id: this.currentUserId++,
      email: "sarah.mohamed@mmsswimming.com",
      password: "$2b$10$hashedpassword",
      role: "coach",
      createdAt: new Date()
    };
    this.users.set(coachUser2.id, coachUser2);
    
    const coach2: Coach = {
      id: this.currentCoachId++,
      userId: coachUser2.id,
      fullName: "Sarah Mohamed",
      phone: "+20 123 456 7891",
      experience: 12,
      certifications: ["Water Safety certified", "Kids Swimming Instructor"],
      specialties: ["Backstroke", "Breaststroke"],
      bio: "12+ years experience, Water Safety certified",
      imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b667fcce?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      status: "active"
    };
    this.coaches.set(coach2.id, coach2);
    
    // Create sample blog posts
    const blogPost1: BlogPost = {
      id: this.currentBlogId++,
      title: "Mastering the Freestyle Stroke",
      content: "Learn the fundamental techniques for perfect freestyle swimming...",
      excerpt: "Learn the fundamental techniques for perfect freestyle swimming, from body position to breathing patterns.",
      author: "Ahmed Hassan",
      imageUrl: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
      category: "Technique",
      publishedDate: new Date("2024-01-15"),
      status: "published"
    };
    this.blogPosts.set(blogPost1.id, blogPost1);
    
    const blogPost2: BlogPost = {
      id: this.currentBlogId++,
      title: "Water Safety for Kids",
      content: "Essential safety tips every parent should know...",
      excerpt: "Essential safety tips every parent should know when teaching children to swim and enjoy water activities.",
      author: "Sarah Mohamed",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
      category: "Safety",
      publishedDate: new Date("2024-01-12"),
      status: "published"
    };
    this.blogPosts.set(blogPost2.id, blogPost2);
    
    // Create sample classes
    const class1: Class = {
      id: this.currentClassId++,
      programId: kidsProgram.id,
      coachId: coach2.id,
      dayOfWeek: "Monday",
      startTime: "09:00",
      endTime: "09:45",
      capacity: 8,
      currentEnrollment: 5,
      status: "active"
    };
    this.classes.set(class1.id, class1);
    
    const class2: Class = {
      id: this.currentClassId++,
      programId: adultProgram.id,
      coachId: coach1.id,
      dayOfWeek: "Tuesday",
      startTime: "09:00",
      endTime: "10:00",
      capacity: 6,
      currentEnrollment: 4,
      status: "active"
    };
    this.classes.set(class2.id, class2);
  }

  // User operations
  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: this.currentUserId++,
      ...insertUser,
      role: insertUser.role || "member",
      createdAt: new Date()
    };
    this.users.set(user.id, user);
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async getUserById(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  // Member operations
  async createMember(insertMember: InsertMember): Promise<Member> {
    const member: Member = {
      id: this.currentMemberId++,
      ...insertMember,
      status: insertMember.status || "active",
      medicalInfo: insertMember.medicalInfo || null,
      emergencyContact: insertMember.emergencyContact || null,
      registrationDate: new Date()
    };
    this.members.set(member.id, member);
    return member;
  }

  async getMemberByUserId(userId: number): Promise<Member | undefined> {
    return Array.from(this.members.values()).find(member => member.userId === userId);
  }

  async getMemberById(id: number): Promise<Member | undefined> {
    return this.members.get(id);
  }

  async getAllMembers(): Promise<Member[]> {
    return Array.from(this.members.values());
  }

  async updateMember(id: number, memberUpdate: Partial<Member>): Promise<Member> {
    const member = this.members.get(id);
    if (!member) throw new Error("Member not found");
    
    const updatedMember = { ...member, ...memberUpdate };
    this.members.set(id, updatedMember);
    return updatedMember;
  }

  // Coach operations
  async createCoach(insertCoach: InsertCoach): Promise<Coach> {
    const coach: Coach = {
      id: this.currentCoachId++,
      ...insertCoach,
      status: insertCoach.status || "active",
      certifications: insertCoach.certifications || null,
      specialties: insertCoach.specialties || null,
      bio: insertCoach.bio || null,
      imageUrl: insertCoach.imageUrl || null
    };
    this.coaches.set(coach.id, coach);
    return coach;
  }

  async getCoachByUserId(userId: number): Promise<Coach | undefined> {
    return Array.from(this.coaches.values()).find(coach => coach.userId === userId);
  }

  async getAllCoaches(): Promise<Coach[]> {
    return Array.from(this.coaches.values());
  }

  async updateCoach(id: number, coachUpdate: Partial<Coach>): Promise<Coach> {
    const coach = this.coaches.get(id);
    if (!coach) throw new Error("Coach not found");
    
    const updatedCoach = { ...coach, ...coachUpdate };
    this.coaches.set(id, updatedCoach);
    return updatedCoach;
  }

  // Program operations
  async getAllPrograms(): Promise<Program[]> {
    return Array.from(this.programs.values());
  }

  async getProgramById(id: number): Promise<Program | undefined> {
    return this.programs.get(id);
  }

  async createProgram(insertProgram: InsertProgram): Promise<Program> {
    const program: Program = {
      id: this.currentProgramId++,
      ...insertProgram,
      status: insertProgram.status || "active"
    };
    this.programs.set(program.id, program);
    return program;
  }

  // Class operations
  async getAllClasses(): Promise<Class[]> {
    return Array.from(this.classes.values());
  }

  async getClassById(id: number): Promise<Class | undefined> {
    return this.classes.get(id);
  }

  async getClassesByCoach(coachId: number): Promise<Class[]> {
    return Array.from(this.classes.values()).filter(cls => cls.coachId === coachId);
  }

  async createClass(insertClass: InsertClass): Promise<Class> {
    const classData: Class = {
      id: this.currentClassId++,
      ...insertClass,
      status: insertClass.status || "active",
      currentEnrollment: insertClass.currentEnrollment || 0
    };
    this.classes.set(classData.id, classData);
    return classData;
  }

  // Booking operations
  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const booking: Booking = {
      id: this.currentBookingId++,
      ...insertBooking,
      status: insertBooking.status || "confirmed",
      notes: insertBooking.notes || null,
      bookingDate: new Date()
    };
    this.bookings.set(booking.id, booking);
    return booking;
  }

  async getBookingsByMember(memberId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(booking => booking.memberId === memberId);
  }

  async getBookingsByClass(classId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(booking => booking.classId === classId);
  }

  async updateBooking(id: number, bookingUpdate: Partial<Booking>): Promise<Booking> {
    const booking = this.bookings.get(id);
    if (!booking) throw new Error("Booking not found");
    
    const updatedBooking = { ...booking, ...bookingUpdate };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }

  // Payment operations
  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const payment: Payment = {
      id: this.currentPaymentId++,
      ...insertPayment,
      description: insertPayment.description || null,
      paymentStatus: insertPayment.paymentStatus || "pending",
      invoiceNumber: insertPayment.invoiceNumber || null,
      paymentDate: new Date()
    };
    this.payments.set(payment.id, payment);
    return payment;
  }

  async getPaymentsByMember(memberId: number): Promise<Payment[]> {
    return Array.from(this.payments.values()).filter(payment => payment.memberId === memberId);
  }

  async getAllPayments(): Promise<Payment[]> {
    return Array.from(this.payments.values());
  }

  // Member progress operations
  async createMemberProgress(insertProgress: InsertMemberProgress): Promise<MemberProgress> {
    const progress: MemberProgress = {
      id: this.currentProgressId++,
      ...insertProgress,
      progress: insertProgress.progress || 0,
      notes: insertProgress.notes || null,
      evaluationDate: new Date()
    };
    this.memberProgress.set(progress.id, progress);
    return progress;
  }

  async getMemberProgressByMember(memberId: number): Promise<MemberProgress[]> {
    return Array.from(this.memberProgress.values()).filter(progress => progress.memberId === memberId);
  }

  // Blog operations
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const post: BlogPost = {
      id: this.currentBlogId++,
      ...insertPost,
      status: insertPost.status || "published",
      imageUrl: insertPost.imageUrl || null,
      publishedDate: new Date()
    };
    this.blogPosts.set(post.id, post);
    return post;
  }

  // Contact operations
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const contact: Contact = {
      id: this.currentContactId++,
      ...insertContact,
      status: insertContact.status || "new",
      phone: insertContact.phone || null,
      createdAt: new Date()
    };
    this.contacts.set(contact.id, contact);
    return contact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async updateContact(id: number, contactUpdate: Partial<Contact>): Promise<Contact> {
    const contact = this.contacts.get(id);
    if (!contact) throw new Error("Contact not found");
    
    const updatedContact = { ...contact, ...contactUpdate };
    this.contacts.set(id, updatedContact);
    return updatedContact;
  }
}

export const storage = new MemStorage();
