
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
import { mockSubmissions } from '@/lib/data';
import { Download, FileArchive } from 'lucide-react';

export default function ArchivePage() {
    
  const publishedArticles = mockSubmissions.filter(s => s.status === 'Published');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Published Archive</h1>
          <p className="text-muted-foreground">A record of all papers published in the journal.</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Archived Papers</CardTitle>
          <CardDescription>Browse and download previously published articles.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead className="hidden md:table-cell">Journal</TableHead>
                        <TableHead className="hidden md:table-cell">Date Published</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {publishedArticles.map(article => (
                        <TableRow key={article.id}>
                            <TableCell className="font-medium">{article.title}</TableCell>
                            <TableCell>{article.author}</TableCell>
                            <TableCell className="hidden md:table-cell">{article.journal}</TableCell>
                            <TableCell className="hidden md:table-cell">{article.submittedDate}</TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button variant="outline" size="sm">
                                    <Download className="mr-2 h-4 w-4"/>
                                    Download PDF
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
