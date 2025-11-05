'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { signOut } from 'firebase/auth';
import { useAuth } from '@/firebase';
import Header from '@/components/landing/header';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 p-8">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-4">Welcome, {user.displayName || 'User'}!</h1>
          <p className="text-lg text-muted-foreground mb-8">This is your protected dashboard.</p>
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>
                This information is associated with your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Email</h3>
                <p>{user.email}</p>
              </div>
              <div>
                <h3 className="font-semibold">User ID</h3>
                <p className="text-sm text-muted-foreground">{user.uid}</p>
              </div>
              <Button variant="destructive" onClick={() => signOut(auth)}>Sign Out</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
