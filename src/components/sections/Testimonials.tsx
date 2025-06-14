
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Sophie Lavoie",
    company: "Maple Consulting Group",
    quote:
      "Sankalp Tech delivered a seamless CRM tailored to our needs. The support team is responsive and truly understands client challenges.",
  },
  {
    name: "Darren Chen",
    company: "UrbanAI Innovations",
    quote:
      "Our AI automation tools were up and running in no time. We’ve seen a huge boost in efficiency across our workflows.",
  },
  {
    name: "Roxanne Dubois",
    company: "Equinox Marketing",
    quote:
      "Their dashboard systems keep our projects on track and our team aligned. Highly recommend for digital transformation.",
  },
];

const Testimonials = () => (
  <section id="testimonials" className="py-16 bg-background">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-primary mb-8">What Our Clients Say</h2>
      <Carousel className="w-full max-w-5xl mx-auto">
        <CarouselContent>
          {testimonials.map((t, idx) => (
            <CarouselItem key={idx} className="sm:basis-1/2 md:basis-1/3">
              <div className="bg-muted/70 rounded-xl shadow-md p-8 h-full flex flex-col items-center text-center transition-all hover:shadow-lg">
                <blockquote className="text-lg text-foreground mb-4 italic">“{t.quote}”</blockquote>
                <div className="mt-auto">
                  <div className="font-semibold text-primary">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.company}</div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  </section>
);

export default Testimonials;
