'use client';

export default function CodeSightPage() {
  return (
    <div className="h-[calc(100vh-10rem)] w-full">
      <iframe
        src="https://pythontutor.com/visualize.html#mode=edit"
        className="w-full h-full border rounded-lg shadow-sm"
        title="Python Tutor"
      ></iframe>
    </div>
  );
}
