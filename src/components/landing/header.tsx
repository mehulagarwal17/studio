'use client';

import {
  ChevronDown,
  CodeXml,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  LogOut,
  LayoutDashboard,
} from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth, useUser } from '@/firebase';
import { getAuth, signOut } from 'firebase/auth';
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
            <AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} />
            <AvatarFallback>{user.displayName?.[0] || user.email?.[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
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
          {isUserLoading ? null : user ? (
            <UserProfile />
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Get started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
