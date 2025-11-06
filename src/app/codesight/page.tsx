'use client';

export default function CodeSightPage() {
  return (
    <div className="absolute inset-0 top-14 sm:top-0 sm:left-60 bg-background">
      <iframe
        src="https://dsavisualizer.in/visualizer"
        className="w-full h-full border-0"
        title="DSA Visualizer"
      ></iframe>
    </div>
  );
}
