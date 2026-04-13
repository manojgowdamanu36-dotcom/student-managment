import { useState } from 'react';
import { LogIn, User, Lock } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    if (username === 'admin' && password === 'admin123') {
      onLogin(username, password);
      setError('');
    } else {
      setError('Invalid credentials. Use admin/admin123');
    }
  };

  return (
    <div className="size-full flex items-center justify-center bg-muted/30">
      <div className="w-full max-w-md p-8 bg-card rounded-lg border border-border shadow-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <User className="size-8 text-primary-foreground" />
          </div>
          <h1>Student Management System</h1>
          <p className="text-muted-foreground mt-2">Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-input-background rounded border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-input-background rounded border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter password"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded text-destructive">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <LogIn className="size-5" />
            Sign In
          </button>
        </form>

        <div className="mt-6 p-4 bg-muted/50 rounded border border-border">
          <p className="text-sm text-muted-foreground">
            Demo credentials:<br />
            Username: <strong className="text-foreground">admin</strong><br />
            Password: <strong className="text-foreground">admin123</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
