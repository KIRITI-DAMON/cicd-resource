
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2, FileText, CheckCircle, Hourglass, PlusCircle } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { mockSubmissions } from '@/lib/data';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { SubmissionStatus } from '@/types';

const statusStyles: { [key in SubmissionStatus]: string } = {
  Submitted: 'bg-blue-500/10 text-blue-500',
  'Under Review': 'bg-yellow-500/10 text-yellow-500',
  'Revisions Required': 'bg-orange-500/10 text-orange-500',
  Accepted: 'bg-green-500/10 text-green-500',
  Rejected: 'bg-red-500/10 text-red-500',
  Published: 'bg-purple-500/10 text-purple-500',
};


export default function UserDashboardPage() {
    const { user } = useAuth();
    
    if (!user) {
        return <div className="flex h-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
    }

    const mySubmissions = mockSubmissions.filter(s => s.author === user.name);
    const activeSubmissions = mySubmissions.filter(s => s.status !== 'Published' && s.status !== 'Rejected');
    const publishedCount = mySubmissions.filter(s => s.status === 'Published').length;

  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Author Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.name}. Manage your submissions and track your publication history.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Submissions</CardTitle>
                    <Hourglass className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{activeSubmissions.length}</div>
                    <p className="text-xs text-muted-foreground">Papers currently in the review process.</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Publications</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{publishedCount}</div>
                    <p className="text-xs text-muted-foreground">Papers you have successfully published.</p>
                </CardContent>
            </Card>
             <Card className="flex flex-col items-center justify-center bg-primary/5 border-dashed border-primary/50 hover:bg-primary/10 transition-colors">
                <CardContent className="pt-6 text-center">
                    <Button asChild variant="ghost" className="h-auto p-0">
                        <Link href="#">
                            <div className="flex flex-col items-center gap-2">
                                <PlusCircle className="h-8 w-8 text-primary" />
                                <span className="font-semibold text-primary">Submit New Paper</span>
                            </div>
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5"/> My Active Submissions</CardTitle>
                <CardDescription>Track the status of your papers currently in the submission pipeline.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Journal</TableHead>
                            <TableHead>Submitted On</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {activeSubmissions.map(sub => (
                             <TableRow key={sub.id}>
                                <TableCell className="font-medium">{sub.title}</TableCell>
                                <TableCell>{sub.journal}</TableCell>
                                <TableCell>{sub.submittedDate}</TableCell>
                                <TableCell><Badge className={statusStyles[sub.status]}>{sub.status}</Badge></TableCell>
                             </TableRow>
                        ))}
                    </TableBody>
                </Table>
                 {activeSubmissions.length === 0 && (
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                                You have no active submissions.
                            </TableCell>
                        </TableRow>
                    </TableBody>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
