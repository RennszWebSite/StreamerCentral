import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { AlertCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      const success = await login(username, password);
      
      if (success) {
        onSuccess();
        resetForm();
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-black border border-gold/50 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-heading gold-gradient inline-block">Admin Login</DialogTitle>
          <DialogDescription className="text-gold-light">
            Enter your credentials to access the admin panel.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-950/30 text-red-400 border border-red-800/50 p-3 rounded-md flex items-start gap-2">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="username" className="text-gold">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              disabled={isLoading}
              className="bg-black border-gold/50 text-white focus:border-gold"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gold">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              disabled={isLoading}
              className="bg-black border-gold/50 text-white focus:border-gold"
            />
          </div>
          
          <DialogFooter className="pt-4">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              type="button"
              className="border-gold/50 text-gold hover:bg-gold hover:text-black"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-gold text-black hover:bg-gold/90"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
