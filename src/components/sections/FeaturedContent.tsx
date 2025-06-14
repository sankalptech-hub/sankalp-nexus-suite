
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const featuredItems = [
  {
    title: 'Case Study: Digital Transformation for a Fortune 500 Company',
    description: 'How we overhauled legacy systems to improve efficiency by 40%.',
  },
  {
    title: 'Blog: The Future of AI in Business Intelligence',
    description: 'Exploring trends and predictions for AI-driven analytics.',
  },
  {
    title: 'Case Study: Cloud Migration for a Fast-Growing Startup',
    description: 'A seamless transition to a scalable cloud infrastructure with zero downtime.',
  },
];

const FeaturedContent = () => {
  return (
    <section id="case-studies" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Insights & Success Stories</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our case studies and read our thoughts on the latest in tech.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
          {featuredItems.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{item.description}</CardDescription>
                <Button variant="link" className="px-0 mt-4">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedContent;
