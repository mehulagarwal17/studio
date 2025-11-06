'use client';

import {
  ChevronDown,
  CodeXml,
  LogOut,
  LayoutDashboard,
  Moon,
} from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';

function UserProfile() {
  const { user } = useUser();
  const auth = useAuth();

  if (!user) return null;

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user.photoURL || ''}
              alt={user.displayName || ''}
            />
            <AvatarFallback>
              {user.displayName?.[0] || user.email?.[0]}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.displayName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Header() {
  const { user, isUserLoading } = useUser();

  const navLinks = [
    { href: '#', label: 'Home' },
    { href: '#features', label: 'Features' },
    { href: '#reviews', label: 'Reviews' },
    { href: '#about', label: 'About', dropdown: true },
    { href: '#services', label: 'Services', dropdown: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <CodeXml className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block text-lg">
              CodeSight
            </span>
          </a>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium mr-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                'flex items-center gap-1 transition-colors hover:text-foreground/80 text-foreground/80'
              )}
            >
              {link.label}
              {link.dropdown && <ChevronDown className="h-4 w-4" />}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end space-x-4">
          {isUserLoading ? null : user ? (
            <UserProfile />
          ) : (
            <Button size="sm" asChild>
              <Link href="/login">Login/Signup</Link>
            </Button>
          )}
           <Button variant="ghost" size="icon">
            <Moon className="h-5 w-5" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
