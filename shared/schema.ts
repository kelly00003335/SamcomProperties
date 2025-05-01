import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Property Schema
export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  location: text("location").notNull(),
  type: text("type").notNull(), // apartment, house, land, commercial
  status: text("status").notNull(), // for sale, for rent
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  area: integer("area"), // in square feet
  images: text("images").array().notNull(),
  features: text("features").array(),
  agentId: integer("agent_id"),
  isFeatured: boolean("is_featured").default(false),
  createdAt: timestamp("created_at").defaultNow()
});

// Agent Schema
export const agents = pgTable("agents", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  bio: text("bio").notNull(),
  image: text("image").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  social: jsonb("social") // contains links to social profiles
});

// Testimonial Schema
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  image: text("image").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull() // 1-5
});

// Contact Message Schema
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

// Newsletter Subscription Schema
export const newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow()
});

// Create Insert Schemas
export const insertPropertySchema = createInsertSchema(properties).omit({ id: true, createdAt: true });
export const insertAgentSchema = createInsertSchema(agents).omit({ id: true });
export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true });
export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({ id: true, createdAt: true });
export const insertNewsletterSchema = createInsertSchema(newsletters).omit({ id: true, createdAt: true });

// Create Types
export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;

export type Agent = typeof agents.$inferSelect;
export type InsertAgent = z.infer<typeof insertAgentSchema>;

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

export type Newsletter = typeof newsletters.$inferSelect;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
