import { z } from "zod";

// Basic user input validation schemas

// Contact form validation
export const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  subject: z.string().min(1, {
    message: "Please select a subject.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

// Newsletter subscription validation
export const newsletterSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

// Property search validation
export const propertySearchSchema = z.object({
  location: z.string().optional(),
  type: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  status: z.string().optional(),
});

// Price range validation
export const priceRangeSchema = z.object({
  min: z.number().min(0).optional(),
  max: z.number().min(0).optional(),
}).refine(data => !data.min || !data.max || data.min <= data.max, {
  message: "Minimum price must be less than maximum price",
  path: ["min"],
});

// Helper function to validate an email
export function isValidEmail(email: string): boolean {
  return z.string().email().safeParse(email).success;
}

// Helper function to validate a phone number
export function isValidPhone(phone: string): boolean {
  return z.string().min(10).safeParse(phone).success;
}
