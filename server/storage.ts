import { 
  users, type User, type InsertUser,
  announcements, type Announcement, type InsertAnnouncement,
  settings, type Setting, type InsertSetting,
  type ThemeSettings, type StreamSetting
} from "@shared/schema";

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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private announcementsStore: Map<number, Announcement>;
  private settingsStore: Map<string, string>;
  private userCurrentId: number;
  private announcementCurrentId: number;

  constructor() {
    this.users = new Map();
    this.announcementsStore = new Map();
    this.settingsStore = new Map();
    this.userCurrentId = 1;
    this.announcementCurrentId = 1;
    
    // Initialize with admin user
    this.createUser({ 
      username: "admin", 
      password: "Rennsz5842" 
    });
    
    // Initialize with default settings
    this.settingsStore.set("primaryColor", "#4A2C82");
    this.settingsStore.set("secondaryColor", "#00A4BD");
    this.settingsStore.set("accentColor", "#D4AF37");
    this.settingsStore.set("currentTheme", "default");
    this.settingsStore.set("activeStream", "rennsz");
    
    // Add some sample announcements
    this.createAnnouncement({
      title: "Thailand Trip Announcement!",
      content: "Starting May 15th, we'll be streaming live from Thailand for two weeks! Join us as we explore Bangkok, Phuket, and Chiang Mai.",
      isFeatured: true
    });
    
    this.createAnnouncement({
      title: "New Membership Tiers Available!",
      content: "We've updated our membership tiers with new benefits and perks for our supporters.",
      isFeatured: false
    });
    
    this.createAnnouncement({
      title: "Weekend Streams Schedule Update",
      content: "Our weekend streams will now start at 2 PM EST instead of 3 PM. More time for adventures!",
      isFeatured: false
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Announcements
  async getAnnouncements(): Promise<Announcement[]> {
    return Array.from(this.announcementsStore.values())
      .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
  }
  
  async getAnnouncementById(id: number): Promise<Announcement | undefined> {
    return this.announcementsStore.get(id);
  }
  
  async createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement> {
    const id = this.announcementCurrentId++;
    const newAnnouncement: Announcement = { 
      ...announcement, 
      id, 
      date: new Date() 
    };
    this.announcementsStore.set(id, newAnnouncement);
    return newAnnouncement;
  }
  
  async updateAnnouncement(id: number, announcement: Partial<InsertAnnouncement>): Promise<Announcement | undefined> {
    const existingAnnouncement = this.announcementsStore.get(id);
    if (!existingAnnouncement) {
      return undefined;
    }
    
    const updatedAnnouncement = {
      ...existingAnnouncement,
      ...announcement
    };
    
    this.announcementsStore.set(id, updatedAnnouncement);
    return updatedAnnouncement;
  }
  
  async deleteAnnouncement(id: number): Promise<boolean> {
    return this.announcementsStore.delete(id);
  }
  
  // Settings
  async getSetting(key: string): Promise<string | undefined> {
    return this.settingsStore.get(key);
  }
  
  async updateSetting(key: string, value: string): Promise<void> {
    this.settingsStore.set(key, value);
  }
  
  async getThemeSettings(): Promise<ThemeSettings> {
    return {
      primaryColor: this.settingsStore.get("primaryColor") || "#4A2C82",
      secondaryColor: this.settingsStore.get("secondaryColor") || "#00A4BD",
      accentColor: this.settingsStore.get("accentColor") || "#D4AF37",
      currentTheme: this.settingsStore.get("currentTheme") || "default"
    };
  }
  
  async updateThemeSettings(theme: ThemeSettings): Promise<void> {
    this.settingsStore.set("primaryColor", theme.primaryColor);
    this.settingsStore.set("secondaryColor", theme.secondaryColor);
    this.settingsStore.set("accentColor", theme.accentColor);
    this.settingsStore.set("currentTheme", theme.currentTheme);
  }
  
  async getStreamSetting(): Promise<StreamSetting> {
    return {
      activeStream: (this.settingsStore.get("activeStream") as "rennsz" | "rennszino") || "rennsz"
    };
  }
  
  async updateStreamSetting(setting: StreamSetting): Promise<void> {
    this.settingsStore.set("activeStream", setting.activeStream);
  }
}

export const storage = new MemStorage();
