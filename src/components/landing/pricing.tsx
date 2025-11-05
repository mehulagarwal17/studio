'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const pricingTiers = [
  {
    name: 'Free',
    price: {
      monthly: '$0',
      yearly: '$0',
    },
    features: [
      'Public and private projects',
      '300K tokens daily limit',
      '1M tokens per month',
      'Bolt branding on websites',
    ],
    cta: 'Get started',
  },
  {
    name: 'Pro',
    price: {
      monthly: '$25',
      yearly: '$22',
    },
    popular: true,
    features: [
      'Public and private projects',
      'No daily token limit',
      'Start at 10M tokens per month',
      'No bolt branding on websites',
    ],
    cta: 'Get started',
  },
  {
    name: 'Teams',
    price: {
      monthly: '$30',
      yearly: '$27',
    },
    priceSuffix: 'per month and member',
    features: [
      'Everything in Pro, plus:',
      'Centralized billing',
      'Team-level access management',
      'Granular admin controls & user provisioning',
      'Private NPM registries support',
    ],
    cta: 'Get started',
  },
  {
    name: 'Enterprise',
    price: {
      monthly: 'Custom',
      yearly: 'Custom',
    },
    description: 'Get advanced security, compliance, and 24/7 support. Customized to your team\'s exact needs.',
    features: [
      'Everything in Pro, plus:',
      'Advanced security (SSO, audit logs, compliance support)',
    ],
    cta: 'Ask for a quote',
    ctaVariant: 'secondary' as const,
  },
];

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-20 sm:py-28 lg:py-32">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Pricing</h2>
          <p className="mt-4 text-lg text-foreground/70">
            Start for free. Upgrade as you go.
          </p>
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <Label htmlFor="billing-cycle">Monthly</Label>
          <Switch
            id="billing-cycle"
            checked={isYearly}
            onCheckedChange={setIsYearly}
          />
          <Label htmlFor="billing-cycle">Yearly</Label>
        </div>
        <p className="text-center mt-4 text-sm text-foreground/70">
          Save 10% on a yearly subscription
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              className={cn(
                'flex flex-col bg-card/60 backdrop-blur-sm border-border hover:border-primary/30 transition-all duration-300',
                tier.popular ? 'border-primary/50 ring-2 ring-primary/50' : 'border-border'
              )}
            >
              {tier.popular && (
                <div className="absolute -top-3 right-4 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  POPULAR
                </div>
              )}
              <CardHeader className="p-6">
                <CardTitle className="text-xl font-semibold">{tier.name}</CardTitle>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">
                    {isYearly ? tier.price.yearly : tier.price.monthly}
                  </span>
                  {tier.price.monthly !== 'Custom' && tier.name !== 'Free' && (
                     <span className="ml-2 text-sm text-foreground/60">
                     {tier.name === 'Teams' ? 'per member/month' : 'per month'}
                   </span>
                  )}
                </div>
                 {tier.name !== 'Free' && tier.price.monthly !== 'Custom' && (
                    <p className="text-xs text-foreground/50">billed {isYearly ? 'annually' : 'monthly'}</p>
                 )}
                {tier.description && (
                  <p className="mt-4 text-sm text-foreground/70 h-16">{tier.description}</p>
                )}
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between p-6 pt-0">
                <div>
                  <Button className={cn('w-full', tier.ctaVariant === 'secondary' && 'bg-secondary text-secondary-foreground hover:bg-secondary/80')}>{tier.cta}</Button>
                  <ul className="mt-6 space-y-4 text-sm">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
