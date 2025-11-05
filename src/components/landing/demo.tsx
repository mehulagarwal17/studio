import Image from "next/image";

export function Demo() {
  return (
    <section id="demo" className="py-12 sm:py-16 lg:py-20">
      <div className="container text-center">
        <div className="relative bg-card/50 border rounded-2xl p-4 shadow-2xl shadow-primary/10 max-w-5xl mx-auto">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                 <div className="text-foreground/40">Your demo animation here</div>
            </div>
        </div>
        <p className="mt-8 text-lg font-medium">Watch your code execute step by step.</p>
        <p className="text-sm text-foreground/60">Built for developers, educators, and curious minds.</p>
      </div>
    </section>
  );
}
