
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Target, Users, Lightbulb, Award } from 'lucide-react';
import Team from '@/components/sections/Team';
import Testimonials from '@/components/sections/Testimonials';

const About = () => {
  const values = [
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: 'Innovation First',
      description: 'We stay at the forefront of technology to deliver cutting-edge solutions that give our clients a competitive advantage.'
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'Client-Centric',
      description: 'Your success is our success. We build lasting partnerships by understanding your unique challenges and goals.'
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: 'Excellence',
      description: 'We maintain the highest standards in everything we do, from code quality to customer service.'
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: 'Reliability',
      description: 'Count on us to deliver on time, within budget, and with the quality you expect from a trusted technology partner.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-20" role="main">
        {/* Hero Section */}
        <section className="py-24 md:py-32" aria-labelledby="about-hero-title">
          <div className="container px-4 md:px-6 max-w-6xl">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary">
                  About Us
                </div>
                <h1 id="about-hero-title" className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Transforming Ideas Into
                  <span className="block text-primary">Digital Reality</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Founded in Canada, Sankalp Tech & Solution Inc. is a leading technology company dedicated to helping businesses harness the power of modern technology to achieve their goals.
                </p>
              </div>
              <Button size="lg" className="group" aria-label="Get started with Sankalp Tech">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 bg-muted/30" aria-labelledby="mission-title">
          <div className="container px-4 md:px-6 max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <h2 id="mission-title" className="text-3xl md:text-4xl font-bold">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We believe that technology should empower businesses, not complicate them. Our mission is to bridge the gap between complex technology and practical business solutions, making innovation accessible to organizations of all sizes.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Through our comprehensive suite of services - from AI automation to custom development - we help our clients streamline operations, enhance customer experiences, and drive sustainable growth in an increasingly digital world.
                </p>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" 
                  alt="Team collaboration at Sankalp Tech showcasing our mission-driven approach"
                  className="rounded-xl shadow-lg w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24" aria-labelledby="values-title">
          <div className="container px-4 md:px-6 max-w-7xl">
            <div className="text-center space-y-4 mb-16">
              <h2 id="values-title" className="text-3xl md:text-4xl font-bold">Our Core Values</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The principles that guide our work and define our relationships with clients and partners.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <Card key={value.title} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex justify-center mb-4" aria-hidden="true">
                      {value.icon}
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <Team />

        {/* Testimonials Section */}
        <Testimonials />

        {/* CTA Section */}
        <section className="py-24 bg-muted/30" aria-labelledby="cta-title">
          <div className="container px-4 md:px-6 max-w-4xl text-center">
            <div className="space-y-8">
              <h2 id="cta-title" className="text-3xl md:text-4xl font-bold">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-muted-foreground">
                Join hundreds of satisfied clients who have revolutionized their operations with our technology solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" aria-label="Schedule a consultation with Sankalp Tech">
                  Schedule Consultation
                </Button>
                <Button variant="outline" size="lg" aria-label="View our portfolio of successful projects">
                  View Our Work
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

export default About;
