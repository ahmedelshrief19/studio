'use client';

import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { SmoothScrollLink } from './smooth-scroll-link';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn("sticky top-0 z-50 w-full transition-all duration-300", hasScrolled ? "border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "bg-transparent")}>
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <SmoothScrollLink href="#home" className="mr-6 flex items-center space-x-2">
          <span className="font-signature text-3xl font-bold text-foreground transition-colors hover:text-accent">Ahmed Elshrief</span>
        </SmoothScrollLink>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <SmoothScrollLink
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-accent"
            >
              {link.label}
            </SmoothScrollLink>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95">
          <nav className="flex flex-col items-center space-y-4 py-4">
            {navLinks.map((link) => (
              <SmoothScrollLink
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg transition-colors hover:text-accent"
              >
                {link.label}
              </SmoothScrollLink>
            ))}
          </nav>
        </div>
      )}
    </header