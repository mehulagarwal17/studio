'use client';

export default function CodeSightPage() {
  return (
    <div className="absolute inset-0 bg-background">
      <iframe
        src="https://dsavisualizer.in/visualizer"
        className="w-full h-full border-0"
        title="DSA Visualizer"
      ></iframe>
    </div>
  );
}
