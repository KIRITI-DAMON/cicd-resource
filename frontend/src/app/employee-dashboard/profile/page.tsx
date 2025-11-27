
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
    
  const { user } = useAuth();
  
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[1][0]}`;
    }
    return name.substring(0, 2);
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Author Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and publication settings.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your photo and personal details here.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-32 w-32">
                      <AvatarImage src={user.avatarUrl} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline">Upload New Photo</Button>
              </div>
              <div className="flex-1 grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" defaultValue={user.name} />
                      </div>
                       <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" defaultValue={user.email} type="email" />
                      </div>
                  </div>
                   <div className="space-y-2">
                      <Label htmlFor="department">Department / Affiliation</Label>
                      <Input id="department" defaultValue={user.department} />
                  </div>
              </div>
           </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Change your password and manage account settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div>
           <div>
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
          </div>
           <div>
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" />
          </div>
           <Button>Update Password</Button>
        </CardContent>
      </Card>
    </div>
  );
}
