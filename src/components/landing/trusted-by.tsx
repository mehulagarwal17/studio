'use client';

const AccentureLogo = () => (
  <svg
    height="24"
    viewBox="0 0 24 8"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1.387.214h21.226v1.33H1.387v-1.33Zm2.66 2.66h15.906v1.33H4.047v-1.33Zm-2.66 2.66h21.226v1.33H1.387v-1.33Z" />
    <path d="M5.433 1.523.012 4.183l5.421 2.66V1.523ZM0 .214l1.375 1.33L0 2.874V.214Zm0 6.912 1.375-1.33L0 4.466v2.66Z" />
  </svg>
);

const companies = [
  { name: 'Accenture', logo: <AccentureLogo /> },
  { name: 'Google', logo: <span className="font-bold text-2xl tracking-tighter">Google</span> },
  { name: 'Intel', logo: <span className="font-bold text-2xl italic">intel</span> },
  { name: 'Meta', logo: <span className="font-bold text-2xl">meta</span> },
  { name: 'Salesforce', logo: <span className="font-bold text-2xl italic">salesforce</span> },
  { name: 'Shopify', logo: <span className="font-bold text-2xl">shopify</span> },
  { name: 'Stripe', logo: <span className="font-bold text-2xl italic">stripe</span> },
];

export function TrustedBy() {
  return (
    <section className="py-12 sm:py-16">
      <div className="container">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-widest text-foreground/60 uppercase">
            The #1 Professional Visualizing Tool Trusted By
          </p>
          <div className="relative mt-8 w-full overflow-hidden">
            <div className="flex w-max animate-[scroll_40s_linear_infinite]">
              {[...companies, ...companies].map((company, index) => (
                <div
                  key={index}
                  className="w-[160px] flex-shrink-0 text-foreground/70 transition-colors hover:text-foreground mx-6 flex items-center justify-center h-12"
                >
                  {company.logo}
                </div>
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
