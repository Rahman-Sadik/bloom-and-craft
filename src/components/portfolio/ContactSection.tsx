import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  Github,
  Linkedin,
  Twitter,
  MessageCircle,
  Heart,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'alex.thompson@email.com',
      href: 'mailto:alex.thompson@email.com',
      color: 'text-primary'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
      color: 'text-accent-foreground'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'San Francisco, CA',
      href: 'https://maps.google.com/?q=San+Francisco,CA',
      color: 'text-sage-hover'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/alexthompson',
      color: 'hover:text-foreground'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/alexthompson',
      color: 'hover:text-blue-600'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: 'https://twitter.com/alexthompson',
      color: 'hover:text-blue-400'
    },
    {
      icon: MessageCircle,
      label: 'Discord',
      href: 'https://discord.com/users/alexthompson',
      color: 'hover:text-purple-500'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      toast({
        title: "Message sent successfully! 🌟",
        description: "Thank you for reaching out. I'll get back to you within 24 hours.",
      });
    }, 2000);
  };

  const isFormValid = formData.name && formData.email && formData.message;

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 px-6 bg-gradient-warm relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute animate-float",
              i % 4 === 0 ? "w-2 h-2 bg-primary/20 rounded-full" :
              i % 4 === 1 ? "w-3 h-3 bg-accent/20 rounded-full" :
              i % 4 === 2 ? "w-1 h-4 bg-sage/20 rounded-full" :
              "w-4 h-1 bg-muted/20 rounded-full"
            )}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${4 + (i % 4)}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className={cn(
            "text-fluid-3xl font-bold text-foreground mb-4",
            isVisible && "animate-slide-up-fade"
          )}>
            Let's Create Something Amazing
          </h2>
          <div className={cn(
            "w-24 h-1 bg-primary rounded-full mx-auto mb-6",
            isVisible && "animate-draw-line"
          )} />
          <p className={cn(
            "text-fluid-lg text-muted-foreground max-w-2xl mx-auto",
            isVisible && "animate-slide-up-fade"
          )} style={{ animationDelay: '0.2s' }}>
            Ready to bring your vision to life? I'd love to hear about your project and explore how we can work together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <div className={cn(
            "p-8 rounded-3xl shadow-soft paper-texture bg-card border border-border/50",
            isVisible && "animate-organic-entrance"
          )} style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Send className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">Send Message</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name field */}
              <div className="relative">
                <label 
                  htmlFor="name"
                  className={cn(
                    "absolute left-4 transition-all duration-300 pointer-events-none",
                    focusedField === 'name' || formData.name 
                      ? "top-2 text-xs text-primary" 
                      : "top-4 text-muted-foreground"
                  )}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className={cn(
                    "w-full pt-6 pb-4 px-4 bg-background/50 border-2 rounded-2xl transition-all duration-300",
                    "focus:outline-none focus:border-primary focus:bg-background",
                    focusedField === 'name' ? "border-primary" : "border-border"
                  )}
                />
              </div>

              {/* Email field */}
              <div className="relative">
                <label 
                  htmlFor="email"
                  className={cn(
                    "absolute left-4 transition-all duration-300 pointer-events-none",
                    focusedField === 'email' || formData.email 
                      ? "top-2 text-xs text-primary" 
                      : "top-4 text-muted-foreground"
                  )}
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={cn(
                    "w-full pt-6 pb-4 px-4 bg-background/50 border-2 rounded-2xl transition-all duration-300",
                    "focus:outline-none focus:border-primary focus:bg-background",
                    focusedField === 'email' ? "border-primary" : "border-border"
                  )}
                />
              </div>

              {/* Subject field */}
              <div className="relative">
                <label 
                  htmlFor="subject"
                  className={cn(
                    "absolute left-4 transition-all duration-300 pointer-events-none",
                    focusedField === 'subject' || formData.subject 
                      ? "top-2 text-xs text-primary" 
                      : "top-4 text-muted-foreground"
                  )}
                >
                  Subject (Optional)
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  className={cn(
                    "w-full pt-6 pb-4 px-4 bg-background/50 border-2 rounded-2xl transition-all duration-300",
                    "focus:outline-none focus:border-primary focus:bg-background",
                    focusedField === 'subject' ? "border-primary" : "border-border"
                  )}
                />
              </div>

              {/* Message field */}
              <div className="relative">
                <label 
                  htmlFor="message"
                  className={cn(
                    "absolute left-4 transition-all duration-300 pointer-events-none",
                    focusedField === 'message' || formData.message 
                      ? "top-2 text-xs text-primary" 
                      : "top-4 text-muted-foreground"
                  )}
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  className={cn(
                    "w-full pt-6 pb-4 px-4 bg-background/50 border-2 rounded-2xl transition-all duration-300 resize-none",
                    "focus:outline-none focus:border-primary focus:bg-background",
                    focusedField === 'message' ? "border-primary" : "border-border"
                  )}
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={cn(
                  "group relative w-full py-4 px-6 rounded-2xl font-medium transition-all duration-300",
                  "flex items-center justify-center gap-3 overflow-hidden",
                  isFormValid && !isSubmitting
                    ? "bg-primary text-primary-foreground hover-lift shadow-medium"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                <span className="relative z-10 flex items-center gap-3">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </span>

                {/* Ripple effect */}
                <div className="absolute inset-0 bg-white/10 scale-0 rounded-2xl transition-transform duration-300 group-hover:scale-100" />
              </button>
            </form>
          </div>

          {/* Contact information */}
          <div className="space-y-8">
            {/* Contact methods */}
            <div className={cn(
              "p-8 rounded-3xl shadow-soft paper-texture bg-card border border-border/50",
              isVisible && "animate-organic-entrance"
            )} style={{ animationDelay: '0.6s' }}>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Get In Touch</h3>
              
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <a
                    key={method.label}
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={cn(
                      "group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300",
                      "hover:bg-accent/10 hover-lift"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center",
                      "bg-background border border-border group-hover:border-primary/50 transition-colors duration-300"
                    )}>
                      <method.icon className={cn("w-6 h-6", method.color)} />
                    </div>
                    
                    <div>
                      <div className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                        {method.label}
                      </div>
                      <div className="text-muted-foreground">
                        {method.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className={cn(
              "p-8 rounded-3xl shadow-soft paper-texture bg-card border border-border/50",
              isVisible && "animate-organic-entrance"
            )} style={{ animationDelay: '0.8s' }}>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Connect With Me</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "group flex items-center gap-3 p-4 rounded-2xl transition-all duration-300",
                      "hover:bg-accent/10 hover-lift border border-border/50 hover:border-primary/50",
                      social.color
                    )}
                  >
                    <social.icon className="w-6 h-6 text-muted-foreground group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-medium text-foreground">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Personal note */}
            <div className={cn(
              "p-8 rounded-3xl bg-gradient-sage shadow-medium border border-primary/20",
              isVisible && "animate-organic-entrance"
            )} style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-primary animate-pulse-gentle" />
                <h3 className="text-xl font-semibold text-card-foreground">A Personal Note</h3>
              </div>
              
              <p className="text-card-foreground leading-relaxed">
                I believe every project is an opportunity to create something meaningful. Whether you're a startup with a bold vision or an established company looking to innovate, I'm here to help bring your ideas to life with passion and precision.
              </p>
            </div>
          </div>
        </div>

        {/* Response time indicator */}
        <div className={cn(
          "mt-12 text-center p-6 rounded-2xl bg-card border border-border/50 shadow-soft",
          isVisible && "animate-organic-entrance"
        )} style={{ animationDelay: '1.2s' }}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span className="font-medium text-foreground">Quick Response Guaranteed</span>
          </div>
          <p className="text-muted-foreground">
            I typically respond to all inquiries within 24 hours. For urgent matters, feel free to call or reach out on social media.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;