import { pgTable, text, serial, integer, boolean, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("member"), // member, coach, admin
  createdAt: timestamp("created_at").defaultNow(),
});

export const members = pgTable("members", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  age: integer("age").notNull(),
  swimmingLevel: text("swimming_level").notNull(), // beginner, intermediate, advanced, competitive
  medicalInfo: text("medical_info"),
  emergencyContact: text("emergency_contact"),
  program: text("program").notNull(), // kids, adult, competitive
  registrationDate: timestamp("registration_date").defaultNow(),
  status: text("status").notNull().default("active"), // active, inactive, pending
});

export const coaches = pgTable("coaches", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  experience: integer("experience").notNull(),
  certifications: text("certifications").array(),
  specialties: text("specialties").array(),
  bio: text("bio"),
  imageUrl: text("image_url"),
  status: text("status").notNull().default("active"),
});

export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  ageGroup: text("age_group").notNull(),
  level: text("level").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  duration: integer("duration").notNull(), // in minutes
  capacity: integer("capacity").notNull(),
  status: text("status").notNull().default("active"),
});

export const classes = pgTable("classes", {
  id: serial("id").primaryKey(),
  programId: integer("program_id").references(() => programs.id).notNull(),
  coachId: integer("coach_id").references(() => coaches.id).notNull(),
  dayOfWeek: text("day_of_week").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  capacity: integer("capacity").notNull(),
  currentEnrollment: integer("current_enrollment").notNull().default(0),
  status: text("status").notNull().default("active"),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  memberId: integer("member_id").references(() => members.id).notNull(),
  classId: integer("class_id").references(() => classes.id).notNull(),
  bookingDate: timestamp("booking_date").defaultNow(),
  status: text("status").notNull().default("confirmed"), // confirmed, cancelled, pending
  notes: text("notes"),
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  memberId: integer("member_id").references(() => members.id).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: text("payment_method").notNull(),
  paymentStatus: text("payment_status").notNull().default("pending"), // pending, completed, failed
  paymentDate: timestamp("payment_date").defaultNow(),
  invoiceNumber: text("invoice_number"),
  description: text("description"),
});

export const memberProgress = pgTable("member_progress", {
  id: serial("id").primaryKey(),
  memberId: integer("member_id").references(() => members.id).notNull(),
  coachId: integer("coach_id").references(() => coaches.id).notNull(),
  stroke: text("stroke").notNull(), // freestyle, backstroke, breaststroke, butterfly
  progress: integer("progress").notNull().default(0), // 0-100
  notes: text("notes"),
  evaluationDate: timestamp("evaluation_date").defaultNow(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  author: text("author").notNull(),
  imageUrl: text("image_url"),
  category: text("category").notNull(),
  publishedDate: timestamp("published_date").defaultNow(),
  status: text("status").notNull().default("published"),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"), // new, read, replied
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertMemberSchema = createInsertSchema(members).omit({ id: true, registrationDate: true });
export const insertCoachSchema = createInsertSchema(coaches).omit({ id: true });
export const insertProgramSchema = createInsertSchema(programs).omit({ id: true });
export const insertClassSchema = createInsertSchema(classes).omit({ id: true });
export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true, bookingDate: true });
export const insertPaymentSchema = createInsertSchema(payments).omit({ id: true, paymentDate: true });
export const insertMemberProgressSchema = createInsertSchema(memberProgress).omit({ id: true, evaluationDate: true });
export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({ id: true, publishedDate: true });
export const insertContactSchema = createInsertSchema(contacts).omit({ id: true, createdAt: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Member = typeof members.$inferSelect;
export type InsertMember = z.infer<typeof insertMemberSchema>;
export type Coach = typeof coaches.$inferSelect;
export type InsertCoach = z.infer<typeof insertCoachSchema>;
export type Program = typeof programs.$inferSelect;
export type InsertProgram = z.infer<typeof insertProgramSchema>;
export type Class = typeof classes.$inferSelect;
export type InsertClass = z.infer<typeof insertClassSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Payment = typeof payments.$inferSelect;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type MemberProgress = typeof memberProgress.$inferSelect;
export type InsertMemberProgress = z.infer<typeof insertMemberProgressSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;

// Login schema
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginData = z.infer<typeof loginSchema>;

// Register schema
export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(2),
  phone: z.string().min(10),
  age: z.number().min(4).max(100),
  swimmingLevel: z.enum(["beginner", "intermediate", "advanced", "competitive"]),
  program: z.enum(["kids", "adult", "competitive"]),
  medicalInfo: z.string().optional(),
  emergencyContact: z.string().optional(),
});

export type RegisterData = z.infer<typeof registerSchema>;
