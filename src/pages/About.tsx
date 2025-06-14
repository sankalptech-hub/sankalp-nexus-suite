
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Team from '@/components/sections/Team';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Users, Zap } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: 'Mission Driven',
      description: 'We believe technology should empower businesses to achieve their fullest potential.'
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'Client First',
      description: 'Your success is our success. We partner with you every step of the way.'
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: 'Innovation Focus',
      description: 'We stay ahead of the curve to deliver cutting-edge solutions.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-24 md:py-32">
          <div className="container px-4 md:px-6 max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary">
                    About Sankalp Tech
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                    Building The
                    <span className="block text-primary">Future Together</span>
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Founded with a vision to bridge the gap between innovative technology and practical business solutions, Sankalp Tech & Solution Inc. has been at the forefront of digital transformation.
                  </p>
                </div>
                <Button size="lg" className="group">
                  Our Story
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" 
                  alt="Team collaboration" 
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-xl">
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-sm">Projects Delivered</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-muted/30">
          <div className="container px-4 md:px-6 max-w-6xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Our Core Values</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {values.map((value) => (
                <div key={value.title} className="text-center space-y-4 p-6">
                  <div className="flex justify-center">{value.icon}</div>
                  <h3 className="text-xl font-bold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <Team />
      </main>
      <Footer />
    </div>
  );
};

export default About;
