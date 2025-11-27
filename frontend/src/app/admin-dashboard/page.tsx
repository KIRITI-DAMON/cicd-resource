
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FileText, Hourglass, CheckCircle, Archive, Users } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, CartesianGrid, XAxis, BarChart as RechartsBarChart } from 'recharts';
import { useEffect, useState } from 'react';
import { mockSubmissions } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const chartConfig = {
  submissions: {
    label: 'Submissions',
    color: 'hsl(var(--primary))',
  },
};

export default function AdminDashboardPage() {
  const [chartData, setChartData] = useState<Array<{ month: string; submissions: number }>>([]);
  
  useEffect(() => {
    // Generate chart data on the client side to avoid hydration errors
    const data = [
      { month: 'Jan', submissions: 18 },
      { month: 'Feb', submissions: 25 },
      { month: 'Mar', submissions: 32 },
      { month: 'Apr', submissions: 28 },
      { month: 'May', submissions: 41 },
      { month: 'Jun', submissions: 35 },
    ];
    setChartData(data);
  }, []);

  const recentSubmissions = mockSubmissions.slice(0, 5);
  const totalSubmissions = mockSubmissions.length;
  const pendingReview = mockSubmissions.filter(s => s.status === 'Under Review' || s.status === 'Submitted').length;
  const published = mockSubmissions.filter(s => s.status === 'Published').length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Editor Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSubmissions}</div>
            <p className="text-xs text-muted-foreground">+5 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Hourglass className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReview}</div>
            <p className="text-xs text-muted-foreground">Awaiting editor action</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Published</CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{published}</div>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Reviewers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Ready to be assigned</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Submission Activity</CardTitle>
            <CardDescription>Submissions over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <RechartsBarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} stroke="hsl(var(--border) / 0.5)" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                 <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                />
                <Bar
                  dataKey="submissions"
                  fill="var(--color-submissions)"
                  radius={4}
                />
              </RechartsBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
            <CardDescription>The latest papers awaiting your attention.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recentSubmissions.map((sub) => (
                        <TableRow key={sub.id}>
                            <TableCell>
                                <p className="font-medium line-clamp-1">{sub.title}</p>
                                <p className="text-sm text-muted-foreground">{sub.author}</p>
                            </TableCell>
                            <TableCell>
                                <Badge variant={sub.status === 'Published' ? 'success' : 'secondary'}>{sub.status}</Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
             <Button asChild variant="outline">
              <Link href="/admin-dashboard/employees">View All Submissions</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
