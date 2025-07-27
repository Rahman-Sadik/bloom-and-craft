import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import heroBg from '@/assets/hero-botanical-bg.jpg';
import profileAvatar from '@/assets/profile-avatar.jpg';

const HeroSection = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const roles = [
    'Full-Stack Developer',
    'Clean Code Advocate', 
    'UI/UX Enthusiast',
    'Digital Craftsman'
  ];

  const fullName = "Alex Thompson";

  useEffect(() => {
    if (isTyping && displayedText.length < fullName.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullName.slice(0, displayedText.length + 1));
      }, 150);
      return () => clearTimeout(timer);
    } else if (displayedText.length === fullName.length) {
      setIsTyping(false);
    }
  }, [displayedText, isTyping]);

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(roleInterval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat paper-texture"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-organic opacity-60" />
      </div>

      {/* Floating organic elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-8 h-8 rounded-full bg-primary/10 animate-float",
              i % 2 === 0 ? "bg-accent/15" : "bg-primary/10"
            )}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${6 + i}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Profile Avatar */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <img
              src={profileAvatar}
              alt="Alex Thompson"
              className="w-32 h-32 rounded-full object-cover shadow-organic animate-breathe border-4 border-primary/20"
            />
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse-gentle" />
          </div>
        </div>

        {/* Name with typewriter effect */}
        <div className="mb-6">
          <h1 className="text-fluid-4xl font-bold text-foreground mb-2">
            <span className="inline-block overflow-hidden">
              {displayedText}
              <span className={cn(
                "inline-block w-0.5 h-12 bg-primary ml-1 animate-pulse",
                !isTyping && "opacity-0"
              )} />
            </span>
          </h1>
          
          {/* Animated underline */}
          <div className="relative">
            <div className={cn(
              "h-1 bg-primary rounded-full mx-auto animate-draw-line",
              !isTyping ? "w-32" : "w-0"
            )} />
          </div>
        </div>

        {/* Dynamic role cycling */}
        <div className="mb-8 h-12 flex items-center justify-center">
          <div className="relative">
            {roles.map((role, index) => (
              <p
                key={role}
                className={cn(
                  "absolute inset-0 text-fluid-xl text-muted-foreground transition-all duration-500",
                  index === currentRoleIndex
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform translate-y-4"
                )}
              >
                {role}
              </p>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium transition-all duration-300 hover-lift hover:bg-sage-hover shadow-medium"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
          </button>
          
          <button 
            className="group relative px-8 py-4 bg-transparent border-2 border-primary text-primary rounded-full font-medium transition-all duration-300 hover-lift hover:bg-primary hover:text-primary-foreground"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="relative z-10">Get In Touch</span>
            <div className="absolute inset-0 bg-primary/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Parallax layers for depth */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-16 h-16 rounded-full bg-gradient-sage opacity-20 animate-drift",
              `top-[${20 + i * 25}%]`
            )}
            style={{
              animationDelay: `${i * 3}s`,
              animationDuration: `${15 + i * 5}s`
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;