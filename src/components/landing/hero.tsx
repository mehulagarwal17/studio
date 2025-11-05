'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Github, Plus } from 'lucide-react';

const FigmaIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#2C2C2C"/>
        <path d="M8 12C8 10.3431 9.34315 9 11 9H13V15H11C9.34315 15 8 13.6569 8 12Z" fill="#0ACF83"/>
        <path d="M8 7C8 5.34315 9.34315 4 11 4H13V9H11C9.34315 9 8 7.65685 8 6V7Z" fill="#A259FF"/>
        <path d="M8 17C8 18.6569 9.34315 20 11 20H13V15H11C9.34315 15 8 16.3431 8 17Z" fill="#F24E1E"/>
        <path d="M13 4H15C16.6569 4 18 5.34315 18 7C18 8.65685 16.6569 10 15 10H13V4Z" fill="#FF7262"/>
        <path d="M18 12C18 13.6569 16.6569 15 15 15C13.3431 15 12 13.6569 12 12C12 10.3431 13.3431 9 15 9C16.6569 9 18 10.3431 18 12Z" fill="#1ABCFE"/>
    </svg>
  );

export function Hero() {
  return (
    <section className="relative py-20 sm:py-28 lg:pb-20 lg:pt-32 overflow-hidden">
       <div className="absolute inset-x-0 bottom-0 z-0 h-64 w-full bg-gradient-to-t from-primary/10 to-transparent"></div>
       <div className="absolute inset-x-0 bottom-0 z-0 h-40 w-full bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      <div className="container text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <span className="inline-block bg-card/60 border border-border rounded-full px-4 py-1.5 text-sm font-medium">
              <span className="font-bold text-primary">b²</span> Introducing Bolt V2
            </span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            What will you
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> build </span>
            today?
          </h1>
          <p className="mt-6 text-lg max-w-2xl mx-auto text-foreground/80 sm:text-xl">
            Create stunning apps & websites by chatting with AI.
          </p>
        </div>

        <div className="mt-10 max-w-2xl mx-auto">
          <div className="bg-card/50 border border-border/50 rounded-2xl p-4 shadow-xl shadow-primary/10">
            <Textarea 
              placeholder="Let's build a data visualization tool" 
              className="bg-transparent border-0 text-base h-20 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-foreground/50"
            />
            <div className="flex items-center justify-between mt-2">
              <Button variant="ghost" size="icon">
                <Plus className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="ghost" className="text-foreground/70">Plan</Button>
                <Button>Build now</Button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-foreground/60">
            <span>or import from</span>
            <Button variant="outline" className="rounded-full gap-2">
                <FigmaIcon />
                Figma
            </Button>
            <Button variant="outline" className="rounded-full gap-2">
                <Github className="h-4 w-4" />
                GitHub
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
