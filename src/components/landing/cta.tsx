'use client';

import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-20 sm:py-28 lg:py-32">
      <div className="container text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Ready to build something amazing?
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Try it out and start building for free.
          </p>
          <div className="mt-8">
            <Button size="lg" className="animate-pulse">Build now</Button>
          </div>
          <p className="mt-4 text-sm text-foreground/60">Free to explore. No setup needed.</p>
        </div>
      </div>
    </section>
  );
}
