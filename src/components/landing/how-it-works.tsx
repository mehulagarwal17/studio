import { ClipboardPaste, PlayCircle, Network } from "lucide-react";

const steps = [
    {
      icon: <ClipboardPaste className="h-10 w-10 text-primary" />,
      title: "1. Paste Your Code",
      description: "Write or paste any Python script into the editor. No setup or installation required."
    },
    {
      icon: <PlayCircle className="h-10 w-10 text-primary" />,
      title: "2. Run Safely",
      description: "Our AI agent executes your code in a secure sandbox, capturing every single step of the process."
    },
    {
      icon: <Network className="h-10 w-10 text-primary" />,
      title: "3. Explore Visually",
      description: "Step through the execution, inspect variables, and watch the call stack evolve in real-time."
    }
  ]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 lg:py-32">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Go from code to insight in seconds.</h2>
          <p className="mt-4 text-lg text-foreground/70">
            A simple, intuitive workflow to transform static code into a dynamic learning experience.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
                <div key={index} className="text-center">
                    <div className="flex justify-center items-center h-24 w-24 rounded-full bg-primary/10 mx-auto mb-6">
                        {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 text-foreground/60">{step.description}</p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
