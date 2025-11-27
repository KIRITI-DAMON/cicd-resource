
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
import { mockSubmissions } from '@/lib/data';
import { Download } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function PublicationHistoryPage() {
  const { user } = useAuth();
  const publishedPapers = mockSubmissions.filter(s => s.author === user?.name && s.status === 'Published');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Publication History</h1>
        <p className="text-muted-foreground">Your academic legacy.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Published Works</CardTitle>
          <CardDescription>
            A list of your papers that have been successfully published.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Journal</TableHead>
                <TableHead>Publication Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {publishedPapers.map((paper) => (
                <TableRow key={paper.id}>
                  <TableCell className="font-medium">{paper.title}</TableCell>
                  <TableCell>{paper.journal}</TableCell>
                  <TableCell>{paper.submittedDate}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
               {publishedPapers.length === 0 && (
                <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                        You have no published papers yet.
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
