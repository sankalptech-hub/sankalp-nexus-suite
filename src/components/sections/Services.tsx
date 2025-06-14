
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Code, Settings, Book } from 'lucide-react';

const services = [
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    title: 'Custom Software Development',
    description: 'Bespoke software solutions tailored to your unique business needs, from web apps to enterprise systems.',
  },
  {
    icon: <Settings className="h-8 w-8 text-primary" />,
    title: 'AI & ML Integration',
    description: 'Leverage the power of artificial intelligence to automate processes, gain insights, and create smarter products.',
  },
  {
    icon: <Book className="h-8 w-8 text-primary" />,
    title: 'Cloud & DevOps',
    description: 'Optimize your infrastructure with our cloud migration, management, and DevOps services for scalability and efficiency.',
  },
];

const Services = () => {
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Our Services</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What We Do</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We provide a wide range of technology services to help you achieve your business goals.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
          {services.map((service) => (
            <Card key={service.title}>
              <CardHeader className="flex flex-col items-center text-center">
                {service.icon}
                <CardTitle className="mt-4">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
