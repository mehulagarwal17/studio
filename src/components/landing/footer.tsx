'use client';

import {
  CodeXml,
  Github,
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
  ExternalLink,
  Book,
  GalleryVertical,
  CircleHelp,
  Shield,
  FileText,
  Briefcase,
  Rss,
} from 'lucide-react';

const RedditIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M16.328 11.69a4.483 4.483 0 0 0-1.805-3.036 3.443 3.443 0 0 0-3.41-1.056 3.443 3.443 0 0 0-3.41 1.056A4.483 4.483 0 0 0 5.878 11.69a1.05 1.05 0 0 0 .14.887 1.049 1.049 0 0 0 .86.47h.342c.04 0 .08-.007.118-.02a1.442 1.442 0 0 1 1.256-.05.86.86 0 0 0 .615-.837v-1.85a.86.86 0 0 1 .86-.86h2.292a.86.86 0 0 1 .86.86v1.85c0 .363.224.693.565.81a1.442 1.442 wooded 0 0 1 1.256.05c.038.013.078.02.118.02h.342a1.05 1.05 0 0 0 .86-.47 1.05 1.05 0 0 0 .14-.887z" />
      <path d="M8.28 15.75a1.44 1.44 0 0 1 1.44-1.44h4.56a1.44 1.44 0 1 1 0 2.88H9.72a1.44 1.44 0 0 1-1.44-1.44z" />
      <circle cx="8.5" cy="11.5" r=".5" fill="currentColor" />
      <circle cx="15.5" cy="11.5" r=".5" fill="currentColor" />
    </svg>
  );

const DiscordIcon = () => (
  <svg
    className="h-6 w-6"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.222 0H3.778C1.691 0 0 1.765 0 3.94V17.028C0 19.215 1.691 21 3.778 21H16.69L20.95 24V21H20.222C22.309 21 24 19.215 24 17.028V3.94C24 1.765 22.309 0 20.222 0ZM8.333 14.868H6.222V10.24h2.111V14.868ZM12 14.868H9.889V10.24H12V14.868ZM15.667 14.868H13.556V10.24h2.111V14.868Z" />
  </svg>
);

const resourcesLinks = [
  { href: '#', text: 'Support', icon: <CircleHelp className="h-4 w-4" /> },
  { href: '#', text: 'Blog', icon: <Rss className="h-4 w-4" /> },
  { href: '#', text: 'Gallery', icon: <GalleryVertical className="h-4 w-4" /> },
  { href: '#', text: 'Status', icon: <Github className="h-4 w-4" /> },
];

const companyLinks = [
  { href: '#', text: 'Careers' },
  { href: '#', text: 'Privacy' },
  { href: '#', text: 'Terms' },
];

const socialLinks = [
  { href: '#', text: 'Discord', icon: <DiscordIcon /> },
  { href: '#', text: 'LinkedIn', icon: <Linkedin className="h-5 w-5" /> },
  { href: '#', text: 'YouTube', icon: <Youtube className="h-5 w-5" /> },
  { href: '#', text: 'Twitter/X', icon: <Twitter className="h-5 w-5" /> },
  { href: '#', text: 'Instagram', icon: <Instagram className="h-5 w-5" /> },
  { href: '#', text: 'Reddit', icon: <RedditIcon className="h-5 w-5" /> },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/40 pt-12 pb-8">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-1 bg-primary/50 blur-2xl" />

      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-2">
            <a className="flex items-center space-x-2" href="/">
              <CodeXml className="h-6 w-6 text-primary" />
              <span className="font-bold sm:inline-block text-lg font-headline">CodeSight</span>
            </a>
            <p className="mt-4 text-sm text-foreground/60 max-w-xs">
              AI that shows what your code is thinking.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="mt-4 space-y-3">
              {resourcesLinks.map((link) => (
                <li key={link.text}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {link.text}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.text}>
                  <a
                    href={link.href}
                    className="text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Social</h3>
            <ul className="mt-4 space-y-3">
              {socialLinks.map((link) => (
                <li key={link.text}>
                  <a
                    href={link.href}
                    className="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors"
                  >
                    <span className="h-6 w-6 flex items-center justify-center">{link.icon}</span>
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-border/40 text-center text-sm text-foreground/60">
          <p>&copy; {new Date().getFullYear()} CodeSight. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
