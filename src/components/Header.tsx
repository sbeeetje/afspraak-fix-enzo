import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scissors, Calendar, LogIn, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isDashboard = location.pathname === '/dashboard';

  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Scissors className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">AfspraakPro</h1>
              <p className="text-xs text-muted-foreground">Voor kappers & zorgverleners</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-4">
            {!isDashboard && !isLoginPage && (
              <Link to="/login">
                <Button variant="outline" size="sm" className="gap-2">
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Inloggen</span>
                </Button>
              </Link>
            )}
            
            {isDashboard && (
              <div className="flex items-center gap-4">
                <Link to="/">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="hidden sm:inline">Publieke pagina</span>
                  </Button>
                </Link>
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profiel</span>
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}