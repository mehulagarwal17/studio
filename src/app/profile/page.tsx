'use client';

import { useUser } from '@/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();

  if (isUserLoading) {
    return (
        <div className="p-4 sm:px-6 sm:py-0 grid auto-rows-max items-start gap-4 md:gap-8">
            <header className="mb-4">
                <Skeleton className="h-10 w-1/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
            </header>
            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-1/3" />
                        <Skeleton className="h-4 w-2/3" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-20 w-full" />
                    </CardContent>
                    <CardFooter>
                        <Skeleton className="h-10 w-32" />
                    </CardFooter>
                </Card>
            </div>
      </div>
    );
  }

  if (!user) {
      return null;
  }

  return (
    <div className="p-4 sm:px-6 sm:py-0 grid auto-rows-max items-start gap-4 md:gap-8">
      <header className="mb-4">
        <h1 className="text-4xl font-bold tracking-tight">Your Profile</h1>
        <p className="text-muted-foreground mt-2">
          Manage your public presence and personal information.
        </p>
      </header>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Public Profile</CardTitle>
            <CardDescription>
              This information will be visible to other users.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.photoURL || ''} alt={user.displayName || ''} />
                            <AvatarFallback>
                                {user.displayName?.[0] || user.email?.[0]}
                            </AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="icon" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 bg-background hover:bg-muted">
                            <Camera className="h-4 w-4" />
                            <span className="sr-only">Change Photo</span>
                        </Button>
                    </div>
                     <div className="grid gap-2 flex-1">
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input id="displayName" defaultValue={user?.displayName || ''} />
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="@your-username" defaultValue={user?.email?.split('@')[0] || ''} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" placeholder="Tell us a little bit about yourself" />
                </div>
            </form>
          </CardContent>
           <CardFooter className="border-t px-6 py-4">
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Private Information</CardTitle>
                <CardDescription>
                    This information is private and will not be shared.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={user?.email || ''} disabled />
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
