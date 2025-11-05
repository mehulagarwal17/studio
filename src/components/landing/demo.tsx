import Image from "next/image";

export function Demo() {
  return (
    <section id="demo" className="py-12 sm:py-16 lg:py-20">
      <div className="container text-center">
        <div className="relative bg-card/50 border rounded-2xl p-4 shadow-2xl shadow-primary/10 max-w-5xl mx-auto">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                 <Image
                    src="https://picsum.photos/seed/codesight-demo/1200/675"
                    alt="CodeSight Demo Animation"
                    width={1200}
                    height={675}
                    className="w-full h-full object-cover"
                    data-ai-hint="code visualization animation"
                 />
            </div>
        </div>
        <p className="mt-8 text-lg font-medium">Watch your code execute step by step.</p>
        <p className="text-sm text-foreground/60">Built for developers, educators, and curious minds.</p>
      </div>
    </section>
  );
}
