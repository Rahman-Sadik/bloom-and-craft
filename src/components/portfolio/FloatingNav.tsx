import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const FloatingNav = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.id);
      const scrollY = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={cn(
      "fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300",
      "glass-organic rounded-full px-6 py-3",
      isScrolled ? "shadow-medium" : "shadow-soft"
    )}>
      <div className="flex items-center space-x-1">
        {navItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={cn(
              "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              "hover:text-primary hover:bg-accent/50",
              activeSection === item.id 
                ? "text-primary bg-accent" 
                : "text-muted-foreground"
            )}
          >
            <span className="relative z-10">{item.label}</span>
            
            {/* Active indicator */}
            {activeSection === item.id && (
              <div className="absolute inset-0 bg-primary/10 rounded-full animate-organic-entrance" />
            )}
            
            {/* Hover ripple effect */}
            <div className="absolute inset-0 rounded-full bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-300" />
          </button>
        ))}
      </div>
      
      {/* Accent line */}
      <div 
        className={cn(
          "absolute bottom-0 left-6 h-0.5 bg-primary transition-all duration-500",
          isScrolled ? "w-12" : "w-8"
        )}
      />
    </nav>
  );
};

export default FloatingNav;