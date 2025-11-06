'use client';

export default function CodeSightPage() {
  return (
    <div className="absolute inset-0 top-14 sm:top-0 sm:left-60 bg-background">
      <iframe
        src="https://pythontutor.com/visualize.html#mode=edit"
        className="w-full h-full border-0"
        title="Python Tutor"
      ></iframe>
    </div>
  );
}
