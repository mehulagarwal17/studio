'use client';

import {
  ChevronDown,
  CodeXml,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
} from 'lucide-react';
import { Button } from '../ui/button';

const DiscordIcon = () => (
  <svg
    className="h-4 w-4"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.222 0H3.778C1.691 0 0 1.765 0 3.94V17.028C0 19.215 1.691 21 3.778 21H16.69L20.95 24V21H20.222C22.309 21 24 19.215 24 17.028V3.94C24 1.765 22.309 0 20.222 0ZM8.333 14.868H6.222V10.24h2.111V14.868ZM12 14.868H9.889V10.24H12V14.868ZM15.667 14.868H13.556V10.24h2.111V14.868Z" />
  </svg>
);

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <CodeXml className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block text-lg font-headline">CodeSight</span>
          </a>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <a
              href="#"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Community
            </a>
            <a
              href="#"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Enterprise
            </a>
            <a
              href="#"
              className="flex items-center gap-1 transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Resources <ChevronDown className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Careers
            </a>
            <a
              href="#"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Pricing
            </a>
          </nav>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="#"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              <DiscordIcon />
            </a>
            <a
              href="#"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
          <Button variant="ghost" size="sm">
            Sign in
          </Button>
          <Button size="sm">Get started</Button>
        </div>
      </div>
    </header>
  );
}
