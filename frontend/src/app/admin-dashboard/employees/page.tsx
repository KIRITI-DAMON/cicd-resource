
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Eye, FilePenLine, PlusCircle, Search } from 'lucide-react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockSubmissions } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Submission, SubmissionStatus } from '@/types';

const statusStyles: { [key in SubmissionStatus]: string } = {
  Submitted: 'bg-blue-500/10 text-blue-500',
  'Under Review': 'bg-yellow-500/10 text-yellow-500',
  'Revisions Required': 'bg-orange-500/10 text-orange-500',
  Accepted: 'bg-green-500/10 text-green-500',
  Rejected: 'bg-red-500/10 text-red-500',
  Published: 'bg-purple-500/10 text-purple-500',
};


export default function SubmissionsPage() {

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Submissions</h1>
          <p className="text-muted-foreground">Manage all submitted research papers.</p>
        </div>
        <Button asChild>
          <Link href="#">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Submission
          </Link>
        </Button>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>All Papers</CardTitle>
          <CardDescription>
            A list of all papers submitted to the journal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by title or author..." className="pl-8" />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Date Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSubmissions.map((submission: Submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium">{submission.title}</TableCell>
                  <TableCell>{submission.author}</TableCell>
                  <TableCell>{submission.submittedDate}</TableCell>
                  <TableCell>
                    <Badge className={statusStyles[submission.status]}>{submission.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="mr-2">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <FilePenLine className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
