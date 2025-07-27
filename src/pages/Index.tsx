import { useEffect } from 'react';
import FloatingNav from '@/components/portfolio/FloatingNav';
import CustomCursor from '@/components/portfolio/CustomCursor';
import HeroSection from '@/components/portfolio/HeroSection';
import AboutSection from '@/components/portfolio/AboutSection';
import SkillsSection from '@/components/portfolio/SkillsSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import ExperienceSection from '@/components/portfolio/ExperienceSection';
import ContactSection from '@/components/portfolio/ContactSection';

const Index = () => {
  useEffect(() => {
    // Smooth scrolling for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-background cursor-organic">
      {/* Custom cursor */}
      <CustomCursor />
      
      {/* Floating navigation */}
      <FloatingNav />
      
      {/* Portfolio sections */}
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <footer className="py-8 px-6 bg-card border-t border-border/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground mb-4">
            Crafted with care and attention to detail • Built with React, TypeScript & Tailwind CSS
          </p>
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse-gentle" />
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse-gentle" style={{ animationDelay: '0.5s' }} />
            <div className="w-2 h-2 bg-sage rounded-full animate-pulse-gentle" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
