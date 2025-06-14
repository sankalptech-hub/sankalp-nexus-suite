
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container px-4 md:px-6 max-w-6xl">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-6 max-w-4xl">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary">
              🚀 Digital Innovation Partner
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none">
              We Build
              <span className="block bg-gradient-to-r from-primary via-blue-500 to-primary bg-clip-text text-transparent">
                Digital Excellence
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Transforming ideas into powerful digital solutions. From AI automation to custom development, we craft technology that drives your business forward.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Button size="lg" className="text-lg px-8 py-4 h-auto group">
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto group">
              <Play className="mr-2 h-5 w-5" />
              Watch Our Story
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              50+ Projects Delivered
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              AI-Powered Solutions
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              24/7 Support
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full p-1">
          <div className="w-1 h-3 bg-primary rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
