
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Code, Settings, Github, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    icon: <Code className="h-12 w-12 text-primary" />,
    title: 'Custom Development',
    description: 'Bespoke web applications, mobile apps, and enterprise software tailored to your unique business requirements.',
    features: ['React & Next.js', 'Mobile Apps', 'API Development', 'Cloud Native'],
    path: '/services'
  },
  {
    icon: <Settings className="h-12 w-12 text-primary" />,
    title: 'AI & Automation',
    description: 'Intelligent automation solutions that streamline operations and unlock new possibilities for your business.',
    features: ['Process Automation', 'AI Integration', 'Machine Learning', 'ChatBot Development'],
    path: '/services'
  },
  {
    icon: <Github className="h-12 w-12 text-primary" />,
    title: 'CRM & Dashboards',
    description: 'Powerful customer relationship management systems and analytics dashboards for data-driven decisions.',
    features: ['Custom CRM', 'Analytics', 'Real-time Data', 'User Management'],
    path: '/services'
  },
];

const Services = () => {
  const navigate = useNavigate();

  const handleLearnMore = (path: string) => {
    navigate(path);
  };

  return (
    <section id="services" className="py-24 md:py-32 bg-muted/30">
      <div className="container px-4 md:px-6 max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary">
            Our Expertise
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Services That
            <span className="block text-primary">Drive Growth</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We combine cutting-edge technology with strategic thinking to deliver solutions that transform your business.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={service.title} className="group relative overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  {service.icon}
                  <div className="text-6xl font-bold text-muted-foreground/10">
                    0{index + 1}
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold mt-4">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
                <div className="space-y-2">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div 
                  className="flex items-center text-primary font-medium group-hover:gap-3 gap-2 transition-all cursor-pointer"
                  onClick={() => handleLearnMore(service.path)}
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
