
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/hooks/use-auth';
import { mockSubmissions } from '@/lib/data';
import { Submission, SubmissionStatus } from '@/types';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Search, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';

const statusStyles: { [key in SubmissionStatus]: string } = {
  Submitted: 'bg-blue-500/10 text-blue-500',
  'Under Review': 'bg-yellow-500/10 text-yellow-500',
  'Revisions Required': 'bg-orange-500/10 text-orange-500',
  Accepted: 'bg-green-500/10 text-green-500',
  Rejected: 'bg-red-500/10 text-red-500',
  Published: 'bg-purple-500/10 text-purple-500',
};


export default function MySubmissionsPage() {
    const { user } = useAuth();
    const mySubmissions = mockSubmissions.filter(s => s.author === user?.name);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Submissions</h1>
          <p className="text-muted-foreground">A complete history of all your submitted papers.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submission History</CardTitle>
           <div className="flex items-center justify-between">
            <CardDescription>
                Browse and track all your papers.
            </CardDescription>
             <div className="flex items-center gap-4">
                <div className="relative w-full max-w-xs">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search your submissions..." className="pl-8" />
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    New Submission
                </Button>
            </div>
           </div>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Journal</TableHead>
                        <TableHead>Submitted On</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mySubmissions.map((submission: Submission) => (
                        <TableRow key={submission.id}>
                            <TableCell className="font-medium max-w-xs truncate">{submission.title}</TableCell>
                            <TableCell>{submission.journal}</TableCell>
                            <TableCell>{submission.submittedDate}</TableCell>
                            <TableCell>
                                <Badge className={statusStyles[submission.status]}>{submission.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="outline" size="sm">
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                     {mySubmissions.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center">
                                You haven't submitted any papers yet.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
