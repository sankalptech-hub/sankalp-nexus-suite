
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          Sankalp Tech
        </Link>
        
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button asChild className="hidden md:flex">
            <Link to="/auth">
              Client Login
              <LogIn className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border/40">
          <nav className="container mx-auto py-4 px-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button asChild className="w-full">
              <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                Client Login
                <LogIn className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
