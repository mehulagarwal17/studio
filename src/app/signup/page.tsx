'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
  updateProfile,
} from 'firebase/auth';
import { useAuth } from '@/firebase';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CodeXml } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Google</title>
      <path
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l-2.333 2.333c-.933-.933-2.2-2.347-3.573-2.347-3.067 0-5.547 2.533-5.547 5.6s2.48 5.6 5.547 5.6c3.427 0 4.8-2.627 5.067-4.04H12.48z"
        fill="currentColor"
      />
    </svg>
  );

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName });
      }
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Sign-up Failed',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
      // The user is redirected, so no need to handle success here.
      // Firebase handles the redirect back and auth state persistence.
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Google Sign-in Failed',
        description: error.message,
      });
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-background via-background to-background/30 z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[800px] h-[800px] bg-primary/10 rounded-full blur-[200px]" />
        </div>
      </div>
      <Card className="w-full max-w-md mx-4 relative z-10">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CodeXml className="h-7 w-7 text-primary" />
            <span className="font-bold text-2xl font-headline">CodeSight</span>
          </div>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your information to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="grid gap-4">
            <Button
              variant="outline"
              className="w-full"
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading || isGoogleLoading}
            >
              {isGoogleLoading ? 'Redirecting...' : <> <GoogleIcon className="mr-2 h-4 w-4" /> Sign up with Google </>}
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="display-name">Display Name</Label>
              <Input
                id="display-name"
                type="text"
                placeholder="Your Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                disabled={isLoading || isGoogleLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading || isGoogleLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading || isGoogleLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading || isGoogleLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="underline text-primary">
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
