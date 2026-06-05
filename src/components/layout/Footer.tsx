
import React from 'react';
import { Linkedin, Twitter, Github, Mail } from 'lucide-react';

const socials = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/sankalptech",
    icon: Linkedin,
  },
  {
    label: "Twitter",
    url: "https://twitter.com/sankalptech",
    icon: Twitter,
  },
  {
    label: "GitHub",
    url: "https://github.com/sankalptech-hub",
    icon: Github,
  },
  {
    label: "Email",
    url: "mailto:hello@sankalp-tech.com",
    icon: Mail,
  },
];

const Footer = () => {
  return (
    <footer className="bg-muted p-6 md:py-8 w-full">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} 1001628330 Ontario Inc. o/a Sankalp Tech · All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="mailto:hello@sankalp-tech.com" className="hover:text-foreground">hello@sankalp-tech.com</a>
          <a href="#" className="hover:text-foreground">Privacy Policy</a>
          <a href="#" className="hover:text-foreground">Terms of Service</a>
        </div>
      </div>
      <div className="container mx-auto mt-6 flex flex-col items-center gap-2">
        <div className="flex gap-6">
          {socials.map(({ label, url, icon: Icon }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted-foreground hover:text-blue-400 transition-colors"
            >
              <Icon className="w-6 h-6" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
