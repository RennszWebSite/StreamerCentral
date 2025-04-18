import { Switch, Route } from "wouter";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";
import { useAuth } from "./contexts/AuthContext";
import { useEffect } from "react";
import { useTheme } from "./contexts/ThemeContext";

function App() {
  // Get auth state from context
  const { isAuthenticated } = useAuth();
  
  // Get theme from context
  const { theme } = useTheme();
  
  // Apply theme variables to CSS
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
        <Route path="/admin">
          {isAuthenticated ? <Admin /> : <Home />}
        </Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
