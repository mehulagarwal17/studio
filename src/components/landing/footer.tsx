import { CodeXml } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/40">
       <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="container py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <CodeXml className="h-5 w-5 text-primary" />
            <span className="font-bold">CodeSight</span>
          </div>
          <p className="text-sm text-foreground/60">AI that shows what your code is thinking.</p>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <a href="#" className="transition-colors hover:text-foreground/80 text-foreground/60">Docs</a>
            <a href="#" className="transition-colors hover:text-foreground/80 text-foreground/60">GitHub</a>
            <a href="#" className="transition-colors hover:text-foreground/80 text-foreground/60">Contact</a>
            <a href="#" className="transition-colors hover:text-foreground/80 text-foreground/60">Privacy</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
