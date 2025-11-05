'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";

export function CTA() {
  return (
    <section className="py-20 sm:py-28 lg:py-32">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="text-center lg:text-left">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Ready to build something amazing?
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Try it out and start building for free. No setup needed.
          </p>
          <div className="mt-8 flex gap-4 justify-center lg:justify-start">
            <Button size="lg">Build now</Button>
            <Button size="lg" variant="outline">Sign Up</Button>
          </div>
        </div>
        <div className="relative flex justify-center">
          <Card className="w-full max-w-sm bg-card/80 backdrop-blur-sm transform lg:rotate-3 transition-transform duration-300 hover:rotate-0">
            <CardHeader className="flex flex-row items-center gap-3">
               <Avatar>
                <AvatarFallback>AI</AvatarFallback>
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="h-6 w-6 text-primary-foreground" />
                </div>
               </Avatar>
              <div>
                <CardTitle className="text-lg">AI Assistant</CardTitle>
                <p className="text-sm text-primary">Online</p>
              </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex justify-start">
                        <div className="bg-muted rounded-lg px-4 py-2 text-sm max-w-[80%]">
                            Hey! What should we build today?
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm max-w-[80%]">
                            Build me a cool dashboard for my startup
                        </div>
                    </div>
                     <div className="flex justify-start">
                        <div className="bg-muted rounded-lg px-4 py-2 text-sm max-w-[80%]">
                           Sure, I can help with that! What kind of data will it display?
                        </div>
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
