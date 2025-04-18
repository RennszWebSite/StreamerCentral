import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAnnouncementSchema, themeSchema, streamSettingSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  
  // User auth route
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      console.log('Login attempt:', { username });

      if (!username || !password) {
        console.log('Missing credentials');
        return res.status(400).json({ message: "Username and password are required" });
      }

      const user = await storage.getUserByUsername(username);
      console.log('Auth debug:', { 
        userExists: !!user,
        username: user?.username,
        providedPassword: password,
        storedPassword: user?.password,
        passwordMatch: user?.password === password
      });
      
      if (!user || user.password !== password) {
        console.log('Password mismatch');
        return res.status(401).json({ message: "Invalid username or password" });
      }

      return res.status(200).json({ 
        message: "Login successful", 
        user: { id: user.id, username: user.username } 
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Announcements endpoints
  app.get("/api/announcements", async (_req: Request, res: Response) => {
    try {
      const announcements = await storage.getAnnouncements();
      return res.status(200).json(announcements);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/announcements", async (req: Request, res: Response) => {
    try {
      const announcementData = insertAnnouncementSchema.parse(req.body);
      const announcement = await storage.createAnnouncement(announcementData);
      return res.status(201).json(announcement);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid announcement data", errors: error.errors });
      }
      console.error("Error creating announcement:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/announcements/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid announcement ID" });
      }

      const announcementData = insertAnnouncementSchema.partial().parse(req.body);
      const updatedAnnouncement = await storage.updateAnnouncement(id, announcementData);
      
      if (!updatedAnnouncement) {
        return res.status(404).json({ message: "Announcement not found" });
      }

      return res.status(200).json(updatedAnnouncement);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid announcement data", errors: error.errors });
      }
      console.error("Error updating announcement:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/announcements/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid announcement ID" });
      }

      const success = await storage.deleteAnnouncement(id);
      
      if (!success) {
        return res.status(404).json({ message: "Announcement not found" });
      }

      return res.status(200).json({ message: "Announcement deleted successfully" });
    } catch (error) {
      console.error("Error deleting announcement:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Theme settings endpoints
  app.get("/api/settings/theme", async (_req: Request, res: Response) => {
    try {
      const themeSettings = await storage.getThemeSettings();
      return res.status(200).json(themeSettings);
    } catch (error) {
      console.error("Error fetching theme settings:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/settings/theme", async (req: Request, res: Response) => {
    try {
      const themeData = themeSchema.parse(req.body);
      await storage.updateThemeSettings(themeData);
      return res.status(200).json({ message: "Theme settings updated successfully", theme: themeData });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid theme data", errors: error.errors });
      }
      console.error("Error updating theme settings:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Stream settings endpoints
  app.get("/api/settings/stream", async (_req: Request, res: Response) => {
    try {
      const streamSettings = await storage.getStreamSetting();
      return res.status(200).json(streamSettings);
    } catch (error) {
      console.error("Error fetching stream settings:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/settings/stream", async (req: Request, res: Response) => {
    try {
      const streamData = streamSettingSchema.parse(req.body);
      await storage.updateStreamSetting(streamData);
      return res.status(200).json({ message: "Stream settings updated successfully", stream: streamData });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid stream data", errors: error.errors });
      }
      console.error("Error updating stream settings:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
