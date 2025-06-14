
import React from "react";

const samplePosts = [
  {
    title: "Empowering Businesses with AI Automation",
    date: "2025-06-10",
    summary:
      "Discover how AI tools are revolutionizing business operations and driving new efficiencies for enterprises of all sizes.",
    link: "#",
  },
  {
    title: "Building Client Dashboards for Modern Teams",
    date: "2025-05-29",
    summary:
      "A behind-the-scenes look at our modular dashboard systems, crafted for seamless project management and data visibility.",
    link: "#",
  },
  {
    title: "Web Development Trends in 2025",
    date: "2025-05-14",
    summary:
      "The latest technologies and design philosophies shaping the future of web, from React innovations to advanced automation.",
    link: "#",
  },
];

const Blog = () => (
  <section id="blog" className="py-16 bg-background">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-primary mb-8">Insights &amp; Articles</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {samplePosts.map((post) => (
          <article key={post.title} className="bg-muted/70 rounded-xl shadow-md p-6 flex flex-col justify-between h-full transition-all hover:shadow-lg">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{post.title}</h3>
              <p className="text-xs text-muted-foreground mb-4">{new Date(post.date).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" })}</p>
              <p className="text-muted-foreground mb-6">{post.summary}</p>
            </div>
            <a
              href={post.link}
              className="mt-auto text-blue-400 hover:text-blue-300 transition-colors font-medium"
              aria-label={`Read more about ${post.title}`}
            >
              Read more &rarr;
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Blog;
