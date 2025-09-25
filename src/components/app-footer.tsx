import ClientOnly from './client-only';
import FeedbackForm from './feedback-form';
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from './ui/button';

export default function AppFooter() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Climate Impact', href: '#education' },
    { name: 'Destinations', href: '#destinations' },
    { name: 'Carbon Calculator', href: '#calculator' },
    { name: 'Statistics', href: '#statistics' },
    { name: 'Eco Tips', href: '#tips' },
    { name: 'Latest News', href: '#news' },
  ];

  const resources = [
    { name: 'Sustainability Guide', href: '#' },
    { name: 'Travel Tips', href: '#' },
    { name: 'Climate Data', href: '#' },
    { name: 'Partner Hotels', href: '#' },
    { name: 'Eco Certifications', href: '#' },
    { name: 'Research Papers', href: '#' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gradient-to-br from-secondary to-accent text-accent-foreground">
      {/* Feedback Section */}
      <section id="feedback" className="py-16 md:py-20 border-b border-accent-foreground/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Mail className="w-4 h-4 text-primary" />
                Get In Touch
              </div>
              <h3 className="font-headline text-4xl md:text-5xl font-bold mb-6">
                Share Your Journey
              </h3>
              <p className="text-xl text-accent-foreground/80 leading-relaxed mb-8">
                Have suggestions for eco-friendly destinations? Feedback on our tools? 
                Ideas for improving sustainable travel? We&apos;d love to hear from you and 
                build a community of conscious travelers together.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>hello@ecoterra.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
            <ClientOnly>
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-border/50">
                <FeedbackForm />
              </div>
            </ClientOnly>
          </div>
        </div>
      </section>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h4 className="font-headline text-2xl font-bold">EcoTerra</h4>
                  <p className="text-sm text-accent-foreground/70">Journeys for Tomorrow</p>
                </div>
              </div>
              <p className="text-accent-foreground/80 leading-relaxed mb-6">
                Empowering travelers to explore the world responsibly while protecting 
                our planet for future generations. Every journey matters.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="icon"
                    asChild
                    className="hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                  >
                    <a href={social.href} aria-label={social.label}>
                      <social.icon className="h-4 w-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="font-headline text-lg font-semibold mb-6">Quick Links</h5>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-accent-foreground/80 hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h5 className="font-headline text-lg font-semibold mb-6">Resources</h5>
              <ul className="space-y-3">
                {resources.map((resource, index) => (
                  <li key={index}>
                    <a
                      href={resource.href}
                      className="text-accent-foreground/80 hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {resource.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h5 className="font-headline text-lg font-semibold mb-6">Stay Updated</h5>
              <p className="text-accent-foreground/80 mb-4">
                Get the latest sustainable travel tips and destination updates.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg border border-accent-foreground/20 bg-background/80 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button className="w-full bg-primary hover:bg-primary/90 transition-all duration-300">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-accent-foreground/60 mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-accent-foreground/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-accent-foreground/70">
                &copy; {currentYear} EcoTerra Journeys. All rights reserved.
              </p>
              <p className="text-sm text-accent-foreground/60 mt-1">
                Built with 💚 for a sustainable future
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#" className="text-accent-foreground/70 hover:text-primary transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-accent-foreground/70 hover:text-primary transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-accent-foreground/70 hover:text-primary transition-colors duration-300">
                Cookie Policy
              </a>
              <a href="#" className="text-accent-foreground/70 hover:text-primary transition-colors duration-300">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
