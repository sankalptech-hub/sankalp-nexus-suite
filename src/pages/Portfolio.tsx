
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Modern e-commerce solution with AI-powered recommendations and real-time inventory management.',
      image: '/placeholder.svg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AI/ML'],
      category: 'Web Development',
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 2,
      title: 'Healthcare Management System',
      description: 'Comprehensive CRM system for healthcare providers with patient management and automated scheduling.',
      image: '/placeholder.svg',
      technologies: ['Next.js', 'PostgreSQL', 'Supabase', 'Tailwind'],
      category: 'CRM Systems',
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 3,
      title: 'AI Content Generator',
      description: 'Advanced content generation platform using GPT-4 for marketing copy, blogs, and social media.',
      image: '/placeholder.svg',
      technologies: ['React', 'OpenAI API', 'Python', 'AWS'],
      category: 'AI & Automation',
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 4,
      title: 'Mobile Fitness App',
      description: 'Cross-platform fitness tracking app with social features and AI-powered workout recommendations.',
      image: '/placeholder.svg',
      technologies: ['React Native', 'Firebase', 'TensorFlow', 'Stripe'],
      category: 'Mobile Development',
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 5,
      title: 'Cloud Infrastructure Migration',
      description: 'Complete cloud migration for a Fortune 500 company with 99.9% uptime and cost reduction.',
      image: '/placeholder.svg',
      technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
      category: 'Cloud Solutions',
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 6,
      title: 'Real Estate CRM',
      description: 'Custom CRM solution for real estate agencies with lead management and automated marketing.',
      image: '/placeholder.svg',
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'SendGrid'],
      category: 'CRM Systems',
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    }
  ];

  const categories = ['All', 'Web Development', 'Mobile Development', 'AI & Automation', 'CRM Systems', 'Cloud Solutions'];
  const [activeCategory, setActiveCategory] = React.useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

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
                  Our Work
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Portfolio of
                  <span className="block text-primary">Innovation</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Explore our diverse portfolio of successful projects that have transformed businesses across various industries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Filters */}
        <section className="py-12 bg-muted/30">
          <div className="container px-4 md:px-6 max-w-7xl">
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? 'default' : 'outline'}
                  onClick={() => setActiveCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {project.featured && (
                      <Badge className="absolute top-4 left-4">Featured</Badge>
                    )}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Github className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <Badge variant="outline">{project.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full group">
                      View Project
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
          <div className="container px-4 md:px-6 max-w-4xl">
            <div className="text-center space-y-8 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-muted-foreground">
                Let's discuss how we can bring your vision to life with innovative technology solutions.
              </p>
            </div>
            <ContactForm type="project" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
