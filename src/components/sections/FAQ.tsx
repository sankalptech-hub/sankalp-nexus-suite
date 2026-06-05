
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: "What is the Sankalp Nexus Suite and how can it benefit my business?",
    answer: "The Sankalp Nexus Suite is our comprehensive technology platform that combines AI automation, custom development, and CRM solutions. It helps businesses streamline operations, reduce manual work, and make data-driven decisions. Benefits include increased efficiency, cost savings, improved customer satisfaction, and scalable growth capabilities."
  },
  {
    id: 2,
    question: "How long does it typically take to implement a custom solution?",
    answer: "Implementation timelines vary based on project complexity and scope. Simple automation tools can be deployed in 2-4 weeks, while comprehensive CRM systems typically take 6-12 weeks. We work closely with you to establish realistic timelines during our initial consultation and provide regular progress updates throughout the development process."
  },
  {
    id: 3,
    question: "Do you provide ongoing support and maintenance after project completion?",
    answer: "Yes, we offer comprehensive post-launch support including 24/7 monitoring, regular updates, bug fixes, and feature enhancements. Our support packages are flexible and can be customized based on your needs. We also provide training for your team to ensure smooth adoption of new systems."
  },
  {
    id: 4,
    question: "Can your solutions integrate with our existing software and systems?",
    answer: "Absolutely! Integration with existing systems is a core part of our development approach. We work with popular platforms like Salesforce, HubSpot, QuickBooks, and custom databases. Our team conducts a thorough analysis of your current tech stack during the planning phase to ensure seamless integration."
  },
  {
    id: 5,
    question: "What industries do you specialize in, and do you work with small businesses?",
    answer: "We work across various industries including healthcare, manufacturing, e-commerce, professional services, and technology companies. We serve businesses of all sizes, from startups to enterprise organizations. Our solutions are scalable and can be tailored to fit your budget and growth plans."
  },
  {
    id: 6,
    question: "How do you ensure data security and privacy in your solutions?",
    answer: "Data security is our top priority. We implement industry-standard encryption, secure authentication protocols, and follow GDPR and other privacy regulations. All our cloud solutions use secure hosting environments, and we conduct regular security audits. We also provide detailed documentation on security measures implemented in your solution."
  },
  {
    id: 7,
    question: "What is your pricing structure and do you offer payment plans?",
    answer: "Our pricing is project-based and depends on complexity, features, and timeline. We offer transparent pricing with no hidden fees. Payment options include milestone-based payments, monthly installments for larger projects, and ongoing subscription models for maintenance and support. We provide detailed quotes after our initial consultation."
  }
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-16">
      <div className="container px-4 md:px-6 max-w-4xl">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary">
            FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Get answers to common questions about our services and solutions.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <Card key={faq.id} className="overflow-hidden">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-6 text-left hover:bg-muted/50 transition-colors flex items-center justify-between"
                  aria-expanded={openItems.includes(faq.id)}
                >
                  <h3 className="font-semibold text-lg pr-4">{faq.question}</h3>
                  <div className="flex-shrink-0">
                    {openItems.includes(faq.id) ? (
                      <ChevronUp className="h-5 w-5 text-primary" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </button>
                
                {openItems.includes(faq.id) && (
                  <div className="px-6 pb-6">
                    <div className="pt-2 border-t border-border">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 p-8 bg-muted/50 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
          <p className="text-muted-foreground mb-4">
            Can't find what you're looking for? Our team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:hello@sankalp-tech.com"
              className="inline-flex items-center justify-center px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Email Us
            </a>
            <a 
              href="tel:"
              className="inline-flex items-center justify-center px-6 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
            >
              Schedule a Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
