'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-20 sm:py-28 lg:py-32">
      <div className="container text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            See Your Code
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Come Alive.</span>
          </h1>
          <p className="mt-6 text-lg max-w-2xl mx-auto text-foreground/80 sm:text-xl">
            An AI agent that turns your code into stunning, interactive visuals. Understand logic. Trace execution. Learn faster.
          </p>
        </div>
        <div className="mt-10 flex justify-center gap-4">
          <Button size="lg" className="group" onClick={scrollToDemo}>
            Try it Live
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
          <Button size="lg" variant="outline">
            View on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
}
