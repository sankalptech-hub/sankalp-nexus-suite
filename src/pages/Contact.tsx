
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import FAQ from '@/components/sections/FAQ';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    projectType: 'web-development',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .insert([{
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          company: formData.company,
          service_type: formData.projectType,
          message: formData.message,
          inquiry_type: 'general',
          urgency: 'medium',
          status: 'new'
        }]);

      if (error) throw error;

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        projectType: 'web-development',
        message: ''
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: 'Email Us',
      details: 'hello@sankalp-tech.com',
      description: 'Send us an email anytime'
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri from 9am to 6pm'
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: 'Visit Us',
      details: 'Toronto, ON, Canada',
      description: 'Come say hello at our office'
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: 'Working Hours',
      details: '9:00 AM - 6:00 PM',
      description: 'Monday to Friday'
    }
  ];

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
                  Get In Touch
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Let's Build Something
                  <span className="block text-primary">Amazing Together</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Ready to transform your business with cutting-edge technology? We'd love to hear about your project and discuss how we can help.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16">
          <div className="container px-4 md:px-6 max-w-6xl">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {contactInfo.map((info) => (
                <Card key={info.title} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-center">{info.icon}</div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">{info.title}</h3>
                      <p className="font-medium text-primary">{info.details}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6 max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  <p className="text-muted-foreground">Fill out the form below and we'll get back to you within 24 hours.</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName"
                          placeholder="John" 
                          value={formData.firstName}
                          onChange={(e) => handleChange('firstName', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName"
                          placeholder="Doe" 
                          value={formData.lastName}
                          onChange={(e) => handleChange('lastName', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email"
                        type="email" 
                        placeholder="john@example.com" 
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input 
                        id="company"
                        placeholder="Your Company" 
                        value={formData.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectType">Project Type</Label>
                      <Select value={formData.projectType} onValueChange={(value) => handleChange('projectType', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web-development">Web Development</SelectItem>
                          <SelectItem value="mobile-development">Mobile App</SelectItem>
                          <SelectItem value="ai-automation">AI & Automation</SelectItem>
                          <SelectItem value="crm-systems">CRM System</SelectItem>
                          <SelectItem value="cloud-solutions">Cloud Solutions</SelectItem>
                          <SelectItem value="consulting">Consulting</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message"
                        placeholder="Tell us about your project..." 
                        className="min-h-[120px]"
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        required
                      />
                    </div>
                    <Button className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Map & Additional Info */}
              <div className="space-y-8">
                <Card>
                  <CardContent className="p-0">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <MapPin className="h-12 w-12 text-primary mx-auto" />
                        <h3 className="font-semibold">Toronto, ON, Canada</h3>
                        <p className="text-muted-foreground">Interactive map coming soon</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Why Choose Sankalp Tech?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      </div>
                      <div>
                        <h4 className="font-medium">Expert Team</h4>
                        <p className="text-sm text-muted-foreground">Experienced professionals with proven track records</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      </div>
                      <div>
                        <h4 className="font-medium">Quality Delivery</h4>
                        <p className="text-sm text-muted-foreground">On-time delivery with attention to detail</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      </div>
                      <div>
                        <h4 className="font-medium">Ongoing Support</h4>
                        <p className="text-sm text-muted-foreground">24/7 support and maintenance services</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
