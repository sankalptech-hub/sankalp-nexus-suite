
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Users, DollarSign } from 'lucide-react';

const caseStudies = [
  {
    id: 1,
    client: "TechFlow Solutions",
    industry: "E-commerce",
    challenge: "Manual order processing was causing delays and errors, leading to customer dissatisfaction and lost revenue.",
    solution: "Implemented AI-powered order automation and custom CRM dashboard to streamline operations.",
    results: [
      { metric: "Processing Time", improvement: "75% reduction", icon: <TrendingUp className="h-5 w-5" /> },
      { metric: "Customer Satisfaction", improvement: "40% increase", icon: <Users className="h-5 w-5" /> },
      { metric: "Monthly Revenue", improvement: "$50K increase", icon: <DollarSign className="h-5 w-5" /> }
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    testimonial: "Sankalp Tech transformed our entire operation. The automation they built saved us countless hours and significantly improved our customer experience."
  },
  {
    id: 2,
    client: "HealthCare Plus",
    industry: "Healthcare",
    challenge: "Outdated patient management system was inefficient and didn't integrate with modern medical equipment.",
    solution: "Developed a comprehensive patient management dashboard with real-time data integration and AI-powered analytics.",
    results: [
      { metric: "Patient Wait Time", improvement: "60% reduction", icon: <TrendingUp className="h-5 w-5" /> },
      { metric: "Staff Efficiency", improvement: "50% improvement", icon: <Users className="h-5 w-5" /> },
      { metric: "Operational Costs", improvement: "$30K saved", icon: <DollarSign className="h-5 w-5" /> }
    ],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
    testimonial: "The new system has revolutionized how we manage patient care. Everything is more efficient and our staff can focus on what matters most - patient health."
  },
  {
    id: 3,
    client: "Global Manufacturing Inc.",
    industry: "Manufacturing",
    challenge: "Lack of real-time visibility into production processes and inventory management across multiple facilities.",
    solution: "Built a cloud-based manufacturing dashboard with IoT integration and predictive analytics for inventory optimization.",
    results: [
      { metric: "Production Efficiency", improvement: "35% increase", icon: <TrendingUp className="h-5 w-5" /> },
      { metric: "Inventory Costs", improvement: "25% reduction", icon: <DollarSign className="h-5 w-5" /> },
      { metric: "Downtime", improvement: "45% decrease", icon: <Users className="h-5 w-5" /> }
    ],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
    testimonial: "Sankalp Tech's solution gave us the visibility we desperately needed. We can now make data-driven decisions that directly impact our bottom line."
  }
];

const CaseStudies = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-4 md:px-6 max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary">
            Success Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Real Results for
            <span className="block text-primary">Real Businesses</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how we've helped businesses across industries transform their operations and achieve measurable success.
          </p>
        </div>

        <div className="grid gap-12 lg:gap-16">
          {caseStudies.map((study, index) => (
            <Card key={study.id} className="overflow-hidden">
              <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <img 
                    src={study.image} 
                    alt={`${study.client} case study`}
                    className="w-full h-full object-cover min-h-[400px]"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
                      {study.industry}
                    </span>
                  </div>
                </div>
                
                <CardContent className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold mb-2">{study.client}</h3>
                      <p className="text-muted-foreground text-lg">{study.industry}</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-lg mb-2">The Challenge</h4>
                        <p className="text-muted-foreground">{study.challenge}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-lg mb-2">Our Solution</h4>
                        <p className="text-muted-foreground">{study.solution}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {study.results.map((result, idx) => (
                        <div key={idx} className="bg-primary/5 p-4 rounded-lg text-center">
                          <div className="flex justify-center mb-2 text-primary">
                            {result.icon}
                          </div>
                          <div className="font-semibold text-primary">{result.improvement}</div>
                          <div className="text-sm text-muted-foreground">{result.metric}</div>
                        </div>
                      ))}
                    </div>

                    <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                      "{study.testimonial}"
                    </blockquote>

                    <Button className="w-fit group">
                      View Full Case Study
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold">
            Ready to Write Your Success Story?
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join these successful businesses and discover how our custom solutions can transform your operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Start Your Project
            </Button>
            <Button variant="outline" size="lg">
              Download Case Studies
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
