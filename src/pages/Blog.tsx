
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const Blog = () => {
  const featuredPost = {
    title: "The Future of AI in Business Automation",
    excerpt: "Exploring how artificial intelligence is reshaping the way businesses operate, from customer service to data analysis and everything in between.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
    date: "2025-06-10",
    readTime: "8 min read",
    category: "AI & Automation"
  };

  const posts = [
    {
      title: "Building Scalable React Applications",
      excerpt: "Best practices for creating React applications that can grow with your business needs.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      date: "2025-06-05",
      readTime: "5 min read",
      category: "Development"
    },
    {
      title: "CRM Implementation Success Stories",
      excerpt: "How our clients transformed their customer relationships with custom CRM solutions.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      date: "2025-05-28",
      readTime: "6 min read",
      category: "Case Study"
    },
    {
      title: "Cloud Migration: A Complete Guide",
      excerpt: "Everything you need to know about moving your business to the cloud safely and efficiently.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
      date: "2025-05-22",
      readTime: "10 min read",
      category: "Cloud"
    },
    {
      title: "Mobile App Development Trends 2025",
      excerpt: "The latest trends shaping mobile application development and user experiences.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
      date: "2025-05-15",
      readTime: "7 min read",
      category: "Mobile"
    },
    {
      title: "Data Analytics for Business Growth",
      excerpt: "Leveraging data analytics to make informed decisions and drive business growth.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      date: "2025-05-08",
      readTime: "9 min read",
      category: "Analytics"
    },
    {
      title: "Cybersecurity Best Practices",
      excerpt: "Essential security measures every business should implement to protect their digital assets.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop",
      date: "2025-05-01",
      readTime: "8 min read",
      category: "Security"
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
                  Tech Insights
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Knowledge &
                  <span className="block text-primary">Innovation Hub</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Stay ahead of the curve with our latest insights, trends, and best practices in technology and business innovation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-16">
          <div className="container px-4 md:px-6 max-w-6xl">
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover min-h-[300px]"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
                      Featured
                    </span>
                  </div>
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-md">
                        {featuredPost.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(featuredPost.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold leading-tight">{featuredPost.title}</h2>
                    <p className="text-muted-foreground text-lg">{featuredPost.excerpt}</p>
                    <Button className="w-fit group">
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6 max-w-7xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Card key={post.title} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-black/50 text-white text-xs font-medium rounded-md backdrop-blur-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{post.excerpt}</p>
                    <div className="flex items-center text-primary font-medium group-hover:gap-3 gap-2 transition-all cursor-pointer">
                      Read More
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
