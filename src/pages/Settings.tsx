import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LogOut, Moon, User } from 'lucide-react';

const Settings = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl py-8 px-4">
        {/* Header */}
        <header className="mb-8 animate-slide-down">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="glass-icon rounded-xl hover:scale-105 transition-transform"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          </div>
        </header>

        <div className="space-y-4">
          {/* User Info */}
          <div className="glass rounded-2xl p-5 animate-fade-in" style={{ animationDelay: '50ms' }}>
            <div className="flex items-center gap-4">
              <div className="glass-icon rounded-xl p-3">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Signed in as</p>
                <p className="font-medium text-foreground">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="glass rounded-2xl p-5 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="glass-icon rounded-xl p-3">
                  <Moon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Appearance</p>
                  <p className="text-sm text-muted-foreground">Toggle light or dark mode</p>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </div>

          {/* Sign Out */}
          <div className="glass rounded-2xl p-5 animate-fade-in" style={{ animationDelay: '150ms' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="glass-icon rounded-xl p-3">
                  <LogOut className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Sign Out</p>
                  <p className="text-sm text-muted-foreground">Log out of your account</p>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={signOut}
                className="glass-pill text-destructive hover:bg-destructive/10"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
