import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Announcements table
export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  isFeatured: boolean("is_featured").default(false),
  date: timestamp("date").defaultNow().notNull(),
  userId: integer("user_id").references(() => users.id),
});

export const insertAnnouncementSchema = createInsertSchema(announcements).pick({
  title: true,
  content: true,
  isFeatured: true,
});

export type InsertAnnouncement = z.infer<typeof insertAnnouncementSchema>;
export type Announcement = typeof announcements.$inferSelect;

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  announcements: many(announcements)
}));

export const announcementsRelations = relations(announcements, ({ one }) => ({
  user: one(users, {
    fields: [announcements.userId],
    references: [users.id]
  })
}));

// Site settings table
export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
});

export const insertSettingSchema = createInsertSchema(settings).pick({
  key: true,
  value: true,
});

export type InsertSetting = z.infer<typeof insertSettingSchema>;
export type Setting = typeof settings.$inferSelect;

// Theme settings validation schemas
export const themeSchema = z.object({
  primaryColor: z.string(),
  secondaryColor: z.string(),
  accentColor: z.string(),
  currentTheme: z.string(),
});

export type ThemeSettings = z.infer<typeof themeSchema>;

export const streamSettingSchema = z.object({
  activeStream: z.enum(["rennsz", "rennszino"]),
});

export type StreamSetting = z.infer<typeof streamSettingSchema>;
