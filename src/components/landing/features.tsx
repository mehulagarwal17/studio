import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, Bot, Eye } from "lucide-react";

const features = [
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Interactive Execution",
    description: "Step through your code line-by-line and see the entire program state change in real-time.",
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: "AI Insight",
    description: "Get automatic, contextual explanations of complex logic, variable assignments, and function calls.",
  },
  {
    icon: <Eye className="h-8 w-8 text-primary" />,
    title: "Beautiful Visuals",
    description: "Experience an elegant and intuitive visualization of the call stack, variables, and memory heap.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-28 lg:py-32 bg-background/50">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Code you can see, logic you can feel.</h2>
          <p className="mt-4 text-lg text-foreground/70">
            CodeSight gives you superpowers to understand, debug, and learn any Python code.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/60 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
              <CardHeader className="p-8">
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                <CardDescription className="mt-2 text-base text-foreground/60">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
