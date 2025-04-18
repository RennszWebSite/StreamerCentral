import { 
  users, type User, type InsertUser,
  announcements, type Announcement, type InsertAnnouncement,
  settings, type Setting, type InsertSetting,
  type ThemeSettings, type StreamSetting
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Announcements
  getAnnouncements(): Promise<Announcement[]>;
  getAnnouncementById(id: number): Promise<Announcement | undefined>;
  createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement>;
  updateAnnouncement(id: number, announcement: Partial<InsertAnnouncement>): Promise<Announcement | undefined>;
  deleteAnnouncement(id: number): Promise<boolean>;
  
  // Settings
  getSetting(key: string): Promise<string | undefined>;
  updateSetting(key: string, value: string): Promise<void>;
  getThemeSettings(): Promise<ThemeSettings>;
  updateThemeSettings(theme: ThemeSettings): Promise<void>;
  getStreamSetting(): Promise<StreamSetting>;
  updateStreamSetting(setting: StreamSetting): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Announcements
  async getAnnouncements(): Promise<Announcement[]> {
    return await db.select().from(announcements).orderBy(desc(announcements.date));
  }
  
  async getAnnouncementById(id: number): Promise<Announcement | undefined> {
    const [announcement] = await db.select().from(announcements).where(eq(announcements.id, id));
    return announcement || undefined;
  }
  
  async createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement> {
    const [newAnnouncement] = await db
      .insert(announcements)
      .values({
        ...announcement,
        date: new Date()
      })
      .returning();
    return newAnnouncement;
  }
  
  async updateAnnouncement(id: number, announcement: Partial<InsertAnnouncement>): Promise<Announcement | undefined> {
    const [updated] = await db
      .update(announcements)
      .set(announcement)
      .where(eq(announcements.id, id))
      .returning();
    return updated || undefined;
  }
  
  async deleteAnnouncement(id: number): Promise<boolean> {
    const result = await db
      .delete(announcements)
      .where(eq(announcements.id, id))
      .returning();
    return result.length > 0;
  }
  
  // Settings
  async getSetting(key: string): Promise<string | undefined> {
    const [setting] = await db.select().from(settings).where(eq(settings.key, key));
    return setting?.value;
  }
  
  async updateSetting(key: string, value: string): Promise<void> {
    // Try to update first
    const updated = await db
      .update(settings)
      .set({ value })
      .where(eq(settings.key, key))
      .returning();
    
    // If no records were updated, insert a new one
    if (updated.length === 0) {
      await db.insert(settings).values({ key, value });
    }
  }
  
  async getThemeSettings(): Promise<ThemeSettings> {
    const primaryColor = await this.getSetting("primaryColor");
    const secondaryColor = await this.getSetting("secondaryColor");
    const accentColor = await this.getSetting("accentColor");
    const currentTheme = await this.getSetting("currentTheme");
    
    // Create default theme if not found
    if (!primaryColor || !secondaryColor || !accentColor || !currentTheme) {
      const defaultTheme = {
        primaryColor: "#4A2C82",
        secondaryColor: "#00A4BD",
        accentColor: "#D4AF37",
        currentTheme: "default"
      };
      
      // Save the default theme settings
      await this.updateThemeSettings(defaultTheme);
      return defaultTheme;
    }
    
    return {
      primaryColor,
      secondaryColor,
      accentColor,
      currentTheme
    };
  }
  
  async updateThemeSettings(theme: ThemeSettings): Promise<void> {
    await this.updateSetting("primaryColor", theme.primaryColor);
    await this.updateSetting("secondaryColor", theme.secondaryColor);
    await this.updateSetting("accentColor", theme.accentColor);
    await this.updateSetting("currentTheme", theme.currentTheme);
  }
  
  async getStreamSetting(): Promise<StreamSetting> {
    const activeStream = await this.getSetting("activeStream");
    
    if (!activeStream) {
      const defaultStream: StreamSetting = {
        activeStream: "rennsz"
      };
      
      // Save the default stream setting
      await this.updateStreamSetting(defaultStream);
      return defaultStream;
    }
    
    return {
      activeStream: activeStream as "rennsz" | "rennszino"
    };
  }
  
  async updateStreamSetting(setting: StreamSetting): Promise<void> {
    await this.updateSetting("activeStream", setting.activeStream);
  }
}

// Initialize the database with default data
async function initializeDatabase() {
  const storage = new DatabaseStorage();
  
  // Check if admin user exists
  const adminUser = await storage.getUserByUsername("admin");
  if (!adminUser) {
    await storage.createUser({
      username: "admin",
      password: "Rennsz5842"
    });
    console.log("Created admin user");
  }
  
  // Initialize theme settings
  await storage.getThemeSettings();
  
  // Initialize stream settings
  await storage.getStreamSetting();
  
  // Add sample announcements if none exist
  const announcements = await storage.getAnnouncements();
  if (announcements.length === 0) {
    await storage.createAnnouncement({
      title: "Thailand Trip Announcement!",
      content: "Starting May 15th, we'll be streaming live from Thailand for two weeks! Join us as we explore Bangkok, Phuket, and Chiang Mai.",
      isFeatured: true
    });
    
    await storage.createAnnouncement({
      title: "New Membership Tiers Available!",
      content: "We've updated our membership tiers with new benefits and perks for our supporters.",
      isFeatured: false
    });
    
    await storage.createAnnouncement({
      title: "Weekend Streams Schedule Update",
      content: "Our weekend streams will now start at 2 PM EST instead of 3 PM. More time for adventures!",
      isFeatured: false
    });
    
    console.log("Added sample announcements");
  }
}

export const storage = new DatabaseStorage();

// Initialize the database with default data
initializeDatabase().catch(error => {
  console.error("Failed to initialize database:", error);
});
