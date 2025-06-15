
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Users, Zap } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';

const Consultation = () => {
  const benefits = [
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: 'Free Initial Assessment',
      description: 'Comprehensive analysis of your current technology stack and business needs at no cost.'
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: '30-Minute Strategy Session',
      description: 'Focused discussion on your goals, challenges, and potential solutions.'
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'Expert Team Access',
      description: 'Direct access to our senior developers and technology consultants.'
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: 'Actionable Roadmap',
      description: 'Detailed project timeline and implementation strategy tailored to your business.'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery Call',
      description: 'We discuss your business goals, current challenges, and vision for the future.'
    },
    {
      step: '02',
      title: 'Technical Assessment',
      description: 'Our experts analyze your existing systems and identify improvement opportunities.'
    },
    {
      step: '03',
      title: 'Solution Design',
      description: 'We create a custom technology roadmap aligned with your business objectives.'
    },
    {
      step: '04',
      title: 'Proposal & Timeline',
      description: 'Detailed project proposal with clear deliverables, timelines, and pricing.'
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
                  Free Consultation
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Let's Discuss Your
                  <span className="block text-primary">Technology Vision</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Schedule a free consultation with our technology experts to explore how we can transform your business with innovative solutions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 bg-muted/30">
          <div className="container px-4 md:px-6 max-w-7xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">
                What You'll Get
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our consultation process is designed to provide maximum value and clear next steps.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center">
                  <CardHeader className="pb-4">
                    <div className="flex justify-center mb-4">
                      {benefit.icon}
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24">
          <div className="container px-4 md:px-6 max-w-6xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">
                Our Consultation Process
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A structured approach to understanding your needs and crafting the perfect solution.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {process.map((item, index) => (
                <div key={index} className="relative">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-border -translate-x-8"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Consultation Form Section */}
        <section className="py-24 bg-muted/30">
          <div className="container px-4 md:px-6 max-w-4xl">
            <div className="text-center space-y-8 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">
                Schedule Your Free Consultation
              </h2>
              <p className="text-xl text-muted-foreground">
                Take the first step towards transforming your business with technology.
              </p>
            </div>
            <ContactForm type="consultation" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Consultation;
