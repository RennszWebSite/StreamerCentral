import React from "react";
import { Switch, Route } from "wouter";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";
import { useAuth } from "./contexts/AuthContext";
import { useTheme } from "./contexts/ThemeContext";
import { useEffect } from "react";

function App() {
  // Get auth context
  const { isAuthenticated } = useAuth();
  
  // Get theme context
  const { theme } = useTheme();
  
  // Apply theme CSS variables
  useEffect(() => {
    if (theme) {
      document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
      document.documentElement.style.setProperty('--secondary-color', theme.secondaryColor);
      document.documentElement.style.setProperty('--accent-color', theme.accentColor);
    }
  }, [theme]);

  return (
    <div className="app-container">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
