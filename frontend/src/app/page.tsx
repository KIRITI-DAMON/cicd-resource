
'use client';

import Link from 'next/link';
import {
  ArrowRight,
  UploadCloud,
  FileCheck2,
  Users,
  Archive,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function Home() {

  const features = [
    {
      icon: <UploadCloud className="h-8 w-8 text-primary" />,
      title: 'Seamless Submissions',
      description: 'Authors can easily upload and submit their research papers through our intuitive platform.',
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'Peer Review Management',
      description: 'Editors can assign reviewers, track review progress, and manage feedback all in one place.',
    },
    {
      icon: <FileCheck2 className="h-8 w-8 text-primary" />,
      title: 'Revision Tracking',
      description: 'A complete version history for every submission, making it easy to track changes and revisions.',
    },
    {
      icon: <Archive className="h-8 w-8 text-primary" />,
      title: 'Effortless Publishing',
      description: 'Accepted papers are seamlessly published and archived, creating a permanent academic record.',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      <Header />
      <main className="flex-1">
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="container relative z-10 mx-auto px-4">
            <div className="grid grid-cols-1 items-center gap-12">
              <div className="space-y-6 text-center">
                <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                  Streamline Your Academic Publishing
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                  A research journal management system that helps authors, editors, and reviewers handle submissions, track revisions, and publish academic work efficiently.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Button asChild size="lg">
                    <Link href="/signup">
                      Submit Your Paper <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                   <Button asChild size="lg" variant="outline">
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                A Seamless Workflow for Academic Publishing
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our platform provides all the tools you need to manage the entire publication lifecycle.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center bg-background/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      {feature.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
