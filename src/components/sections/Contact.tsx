
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  const handleContactEmail = () => {
    window.location.href = 'mailto:hello@sankalp-tech.com';
  };

  const handleScheduleCall = () => {
    navigate('/consultation');
  };

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Let's Build Together</h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Have a project in mind or want to learn more? We'd love to hear from you.
          </p>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" onClick={handleContactEmail}>
                <Mail className="mr-2 h-4 w-4" /> hello@sankalp-tech.com
            </Button>
            <Button size="lg" variant="outline" onClick={handleScheduleCall}>
                <Phone className="mr-2 h-4 w-4" /> Schedule a Call
            </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
