
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Linkedin, Twitter, Github } from 'lucide-react';

const teamMembers = [
  {
    name: 'Sarah Chen',
    role: 'Chief Technology Officer',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b890?w=400&h=400&fit=crop&crop=face',
    bio: 'Full-stack developer with 10+ years experience in enterprise solutions and AI integration.',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    }
  },
  {
    name: 'Michael Rodriguez',
    role: 'Lead AI Engineer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    bio: 'Machine learning specialist focused on automation and intelligent system development.',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    }
  },
  {
    name: 'Emily Johnson',
    role: 'UX/UI Design Director',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    bio: 'Creative designer passionate about user-centered design and digital experiences.',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    }
  },
  {
    name: 'David Park',
    role: 'DevOps Architect',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    bio: 'Cloud infrastructure expert specializing in scalable, secure deployment solutions.',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    }
  }
];

const Team = () => {
  return (
    <section id="team" className="py-24 md:py-32">
      <div className="container px-4 md:px-6 max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary">
            Our Team
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Meet The
            <span className="block text-primary">Innovators</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our diverse team of experts brings together years of experience in technology, design, and business strategy.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <Card key={member.name} className="group overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex gap-3">
                      <a href={member.social.linkedin} className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                        <Linkedin className="h-4 w-4 text-white" />
                      </a>
                      <a href={member.social.twitter} className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                        <Twitter className="h-4 w-4 text-white" />
                      </a>
                      <a href={member.social.github} className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                        <Github className="h-4 w-4 text-white" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-primary font-medium">{member.role}</p>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
