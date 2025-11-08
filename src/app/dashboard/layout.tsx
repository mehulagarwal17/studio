'use client';

import {
  Home,
  Swords,
  BookOpen,
  BrainCircuit,
  Zap,
  Crown,
  PanelLeft,
  Code,
  LayoutGrid,
  Server,
  User as UserIcon,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useUser } from '@/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from 'firebase/auth';
import { useAuth } from '@/firebase';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';

const sidebarNavLinks = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/arena', icon: Swords, label: 'Arena' },
  { href: '/learn', icon: LayoutGrid, label: 'Learn' },
  { href: '/codesight', icon: Code, label: 'CodeSight' },
  { href: '/backend-design', icon: Server, label: 'Backend Design' },
  { href: '/ai-mentor', icon: BrainCircuit, label: 'AI Mentor' },
  { href: '/profile', icon: UserIcon, label: 'Profile' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

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
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
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
        <DropdownMenuItem onClick={handleSignOut}>
          <span className="text-red-500">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col bg-background">
        <Sidebar>
          <div className="absolute inset-0 animated-background"></div>
           <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <h1 className="vertical-text text-8xl font-extrabold tracking-widest text-foreground/5 opacity-50 select-none">
              CodeSight
            </h1>
          </div>
          <SidebarHeader className='relative z-10'>
            <Link
              href="#"
              className="group flex h-9 w-full shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:text-base"
            >
              <Zap className="h-5 w-5 text-primary" />
              <span className="font-bold text-foreground">AlgoArena</span>
            </Link>
          </SidebarHeader>
          <SidebarContent className='relative z-10'>
            <SidebarMenu>
              {sidebarNavLinks.map((link) => (
                <SidebarMenuItem key={link.href}>
                  <Link href={link.href}>
                    <SidebarMenuButton
                      isActive={pathname === link.href}
                      icon={<link.icon />}
                    >
                      {link.label}
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className='relative z-10'>
            <div className="w-full p-2">
              <Button variant="outline" className="w-full gap-2">
                <Crown className="h-4 w-4 text-yellow-500" />
                Upgrade to Pro
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 group-data-[sidebar-collapsed=icon]:sm:pl-14 group-data-[sidebar-collapsed=offcanvas]:sm:pl-0 transition-all duration-200 ease-in-out">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <SidebarTrigger className="sm:hidden" />
            <div className="ml-auto">
              <UserProfile />
            </div>
          </header>
          <main className="grid flex-1 items-start gap-4 md:gap-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
