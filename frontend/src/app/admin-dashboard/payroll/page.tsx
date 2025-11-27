
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mockUsers } from '@/lib/data';
import { PlusCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function ReviewersPage() {
  
  const reviewers = mockUsers.filter(u => u.role === 'Admin'); // Using Admins as reviewers for now

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[1][0]}`;
    }
    return name.substring(0, 2);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div>
          <h1 className="text-3xl font-bold tracking-tight">Reviewers</h1>
          <p className="text-muted-foreground">Manage your pool of peer reviewers.</p>
        </div>
         <div className="flex items-center gap-2">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search reviewers..." className="pl-8" />
            </div>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Reviewer
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {reviewers.map((reviewer) => (
            <Card key={reviewer.uid} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                    <Avatar className="w-20 h-20 mb-4">
                        <AvatarImage src={reviewer.avatarUrl} alt={reviewer.name} />
                        <AvatarFallback>{getInitials(reviewer.name)}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-semibold">{reviewer.name}</h3>
                    <p className="text-sm text-muted-foreground">{reviewer.department}</p>
                    <Badge variant="outline" className="mt-2">3 Active Reviews</Badge>
                    <Button asChild variant="outline" className="mt-4 w-full">
                        <Link href="#">View Profile</Link>
                    </Button>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
