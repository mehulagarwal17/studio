import { CodeXml } from 'lucide-react';
import { ThemeToggle } from '@/components/codesight/theme-toggle';
import { Button } from '../ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <CodeXml className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block text-lg">CodeSight</span>
          </a>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <a href="#demo" className="transition-colors hover:text-foreground/80 text-foreground/60">Demo</a>
          <a href="#features" className="transition-colors hover:text-foreground/80 text-foreground/60">Features</a>
          <a href="#how-it-works" className="transition-colors hover:text-foreground/80 text-foreground/60">How It Works</a>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
           <Button className="hidden sm:inline-flex">Try Live Demo</Button>
        </div>
      </div>
    </header>
  );
}
