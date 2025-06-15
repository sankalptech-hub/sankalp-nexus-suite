
import React from "react";
import { ArrowRight, Calendar, User } from "lucide-react";

const samplePosts = [
  {
    title: "The Future of AI in Business Operations",
    date: "2025-06-15",
    author: "Sarah Chen",
    summary: "Discover how artificial intelligence is revolutionizing business processes, from customer service automation to predictive analytics. Learn about the latest AI trends that are reshaping industries and creating new opportunities for growth.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
    category: "AI & Automation",
    readTime: "6 min read",
    link: "/blog"
  },
  {
    title: "Building Scalable CRM Systems for Modern Teams",
    date: "2025-06-12",
    author: "Mike Rodriguez",
    summary: "A comprehensive guide to designing and implementing CRM solutions that grow with your business. Explore best practices for data management, user experience design, and integration strategies that deliver real value.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    category: "CRM Solutions",
    readTime: "8 min read",
    link: "/blog"
  },
  {
    title: "Cloud Migration Success: A Step-by-Step Approach",
    date: "2025-06-08",
    author: "David Park",
    summary: "Learn from real-world cloud migration projects and discover the strategies that lead to successful transitions. From planning and risk assessment to execution and optimization, we cover everything you need to know.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
    category: "Cloud Solutions",
    readTime: "10 min read",
    link: "/blog"
  },
  {
    title: "React Performance Optimization Techniques",
    date: "2025-06-05",
    author: "Jessica Wu",
    summary: "Master the art of building lightning-fast React applications with advanced performance optimization techniques. From code splitting to memory management, learn how to deliver exceptional user experiences.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    category: "Web Development",
    readTime: "7 min read",
    link: "/blog"
  },
  {
    title: "Cybersecurity Best Practices for Small Businesses",
    date: "2025-06-02",
    author: "Alex Thompson",
    summary: "Protect your business from cyber threats with practical security measures that don't break the bank. Discover essential tools, policies, and practices that every small business should implement to stay safe online.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
    category: "Security",
    readTime: "9 min read",
    link: "/blog"
  }
];

const Blog = () => (
  <section id="blog" className="py-24 bg-muted/30">
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary">
          Latest Insights
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-4">
          Knowledge Hub
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Stay ahead of the curve with our latest insights, best practices, and industry trends in technology and business innovation.
        </p>
      </div>
      
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {samplePosts.map((post) => (
          <article key={post.title} className="bg-card rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
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
            
            <div className="p-6 flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {post.author}
                  </div>
                  <span>{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {post.summary}
                </p>
              </div>
              
              <a
                href={post.link}
                className="mt-6 inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium group/link"
                aria-label={`Read more about ${post.title}`}
              >
                Read Full Article
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
              </a>
            </div>
          </article>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <a 
          href="/blog" 
          className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
        >
          View All Articles
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  </section>
);

export default Blog;
