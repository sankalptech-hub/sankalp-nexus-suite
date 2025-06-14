
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Code, Settings, Github, Smartphone, Cloud, Database } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Code className="h-12 w-12 text-primary" />,
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies',
      features: ['React & Next.js', 'Full-stack Development', 'Progressive Web Apps', 'E-commerce Solutions'],
      price: 'Starting at $5,000'
    },
    {
      icon: <Smartphone className="h-12 w-12 text-primary" />,
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile applications',
      features: ['iOS & Android', 'React Native', 'Flutter', 'App Store Optimization'],
      price: 'Starting at $8,000'
    },
    {
      icon: <Settings className="h-12 w-12 text-primary" />,
      title: 'AI & Automation',
      description: 'Intelligent solutions to streamline your operations',
      features: ['Process Automation', 'AI Integration', 'Machine Learning', 'ChatBot Development'],
      price: 'Starting at $10,000'
    },
    {
      icon: <Database className="h-12 w-12 text-primary" />,
      title: 'CRM Systems',
      description: 'Custom CRM and dashboard solutions',
      features: ['Custom CRM', 'Analytics Dashboards', 'Real-time Data', 'User Management'],
      price: 'Starting at $7,000'
    },
    {
      icon: <Cloud className="h-12 w-12 text-primary" />,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment',
      features: ['AWS & Azure', 'DevOps', 'Microservices', 'Container Orchestration'],
      price: 'Starting at $3,000'
    },
    {
      icon: <Github className="h-12 w-12 text-primary" />,
      title: 'Consulting',
      description: 'Strategic technology consulting and planning',
      features: ['Technical Audits', 'Architecture Planning', 'Code Reviews', 'Best Practices'],
      price: 'Starting at $150/hour'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-24 md:py-32">
          <div className="container px-4 md:px-6 max-w-6xl">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary">
                  Our Services
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Technology Solutions
                  <span className="block text-primary">That Drive Results</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  From concept to deployment, we provide comprehensive technology services that help your business thrive in the digital age.
                </p>
              </div>
              <Button size="lg" className="group">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 bg-muted/30">
          <div className="container px-4 md:px-6 max-w-7xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Card key={service.title} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      {service.icon}
                      <span className="text-sm font-medium text-primary">{service.price}</span>
                    </div>
                    <CardTitle className="text-2xl font-bold mt-4">{service.title}</CardTitle>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full group">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container px-4 md:px-6 max-w-4xl text-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-muted-foreground">
                Let's discuss how our services can help you achieve your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  Schedule Consultation
                </Button>
                <Button variant="outline" size="lg">
                  View Portfolio
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
