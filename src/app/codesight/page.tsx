'use client';

export default function CodeSightPage() {
  return (
    <div className="h-[calc(100vh-6rem)] w-full -mt-4 -ml-4 sm:-ml-6">
      <iframe
        src="https://pythontutor.com/visualize.html#mode=edit"
        className="w-full h-full border-0"
        title="Python Tutor"
      ></iframe>
    </div>
  );
}
