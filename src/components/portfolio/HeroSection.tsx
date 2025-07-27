import { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Sparkles, Code, Heart, Zap, Mouse } from 'lucide-react';
import profileAvatar from '@/assets/profile-avatar.jpg';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isCreativeMode, setIsCreativeMode] = useState(false);
  const [assembledName, setAssembledName] = useState('');
  const [particleTrails, setParticleTrails] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);
  const [profileTilt, setProfileTilt] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const trailId = useRef(0);

  const roles = [
    'Full-Stack Developer',
    'Code Artist', 
    'Digital Alchemist',
    'Problem Solver'
  ];

  const nameLetters = "Alex Thompson".split('');
  const interactiveWords = ['creative', 'innovative', 'passionate', 'dedicated'];

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Name assembly animation
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (assembledName.length < nameLetters.length) {
      timeout = setTimeout(() => {
        setAssembledName(prev => prev + nameLetters[prev.length]);
      }, 200 + Math.random() * 300);
    }

    return () => clearTimeout(timeout);
  }, [assembledName]);

  // Role cycling with slot machine effect
  useEffect(() => {
    const roleInterval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 4000);

    return () => clearInterval(roleInterval);
  }, []);

  // Profile card tilt effect
  const handleProfileMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const tiltX = (e.clientY - centerY) / 10;
    const tiltY = (centerX - e.clientX) / 10;
    
    setProfileTilt({ x: tiltX, y: tiltY });
  }, []);

  const handleProfileMouseLeave = useCallback(() => {
    setProfileTilt({ x: 0, y: 0 });
  }, []);

  // Create mouse trail effect
  const createTrail = useCallback((e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (rect) {
      const newTrail = {
        id: trailId.current++,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      
      setParticleTrails(prev => [...prev, newTrail]);
      
      setTimeout(() => {
        setParticleTrails(prev => prev.filter(trail => trail.id !== newTrail.id));
      }, 1000);
    }
  }, []);

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative min-h-screen overflow-hidden"
      onMouseMove={createTrail}
    >
      {/* Creative Mode Toggle */}
      <button
        onClick={() => setIsCreativeMode(!isCreativeMode)}
        className="fixed top-6 right-6 z-50 group"
      >
        <div className="w-12 h-12 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-border/50 hover:border-primary/50 transition-all duration-300 hover-lift">
          <Sparkles className={cn(
            "w-5 h-5 transition-colors duration-300",
            isCreativeMode ? "text-primary animate-pulse-gentle" : "text-muted-foreground"
          )} />
        </div>
      </button>

      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-warm opacity-80" />
        <div className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          "bg-gradient-to-br from-background via-cream-warm to-mint-light",
          isCreativeMode && "animate-breathe"
        )} />
      </div>

      {/* Particle System */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating organic shapes */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute transition-all duration-1000",
              i % 4 === 0 ? "w-6 h-6 rounded-full bg-primary/10" :
              i % 4 === 1 ? "w-4 h-8 rounded-full bg-accent/15 rotate-45" :
              i % 4 === 2 ? "w-8 h-4 rounded-full bg-sage/10 -rotate-12" :
              "w-5 h-5 bg-mint/20 transform rotate-45"
            )}
            style={{
              left: `${10 + (i * 8)}%`,
              top: `${20 + (i * 6)}%`,
              transform: `translate(${mousePosition.x * (i % 3) * 0.01}px, ${mousePosition.y * (i % 3) * 0.01}px)`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${8 + i}s`
            }}
          />
        ))}
        
        {/* Mouse trails */}
        {particleTrails.map((trail) => (
          <div
            key={trail.id}
            className="absolute w-2 h-2 bg-primary/40 rounded-full animate-ripple pointer-events-none"
            style={{
              left: trail.x,
              top: trail.y,
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
      </div>

      {/* Diagonal Split Layout */}
      <div className="relative h-full flex">
        {/* Left Side - Floating Content Island */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
          <div 
            className="relative z-10"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
            }}
          >
            {/* Floating content bubble */}
            <div className="relative p-8 bg-card/90 backdrop-blur-sm rounded-3xl shadow-organic border border-border/50">
              {/* Background geometric shapes */}
              <div className="absolute -inset-4 bg-primary/5 rounded-3xl transform rotate-3" />
              <div className="absolute -inset-2 bg-accent/10 rounded-3xl transform -rotate-1" />
              
              <div className="relative z-10">
                {/* Puzzle piece name assembly */}
                <div className="mb-8">
                  <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4 flex flex-wrap justify-center gap-2">
                    {nameLetters.map((letter, index) => (
                      <span
                        key={index}
                        className={cn(
                          "inline-block transition-all duration-500 hover:text-primary hover:scale-110 cursor-pointer",
                          assembledName.length > index 
                            ? "opacity-100 translate-y-0 rotate-0" 
                            : "opacity-0 translate-y-8 rotate-12"
                        )}
                        style={{ 
                          animationDelay: `${index * 0.1}s`,
                          transitionDelay: `${index * 0.1}s`
                        }}
                      >
                        {letter === ' ' ? '\u00A0' : letter}
                      </span>
                    ))}
                  </h1>
                  
                  {/* Signature line animation */}
                  <div className="relative h-2 overflow-hidden">
                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-draw-line" />
                  </div>
                </div>

                {/* Slot machine role display */}
                <div className="mb-8 h-16 bg-muted/10 rounded-2xl flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
                  {roles.map((role, index) => (
                    <div
                      key={role}
                      className={cn(
                        "absolute inset-0 flex items-center justify-center text-lg lg:text-xl font-medium transition-all duration-700",
                        index === currentRoleIndex
                          ? "opacity-100 transform translate-y-0"
                          : "opacity-0 transform translate-y-8"
                      )}
                    >
                      <span className="text-primary font-semibold">{role}</span>
                    </div>
                  ))}
                </div>

                {/* Interactive text */}
                <p className="text-muted-foreground text-lg mb-8 text-center leading-relaxed">
                  I'm a{' '}
                  {interactiveWords.map((word, index) => (
                    <span
                      key={word}
                      className={cn(
                        "cursor-pointer transition-all duration-300 hover:text-primary",
                        hoveredWord === word && "text-primary font-semibold scale-105"
                      )}
                      onMouseEnter={() => setHoveredWord(word)}
                      onMouseLeave={() => setHoveredWord(null)}
                    >
                      {word}
                      {index < interactiveWords.length - 1 && ', '}
                    </span>
                  ))}{' '}
                  developer who loves crafting digital experiences.
                </p>

                {/* Floating action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium transition-all duration-300 hover-lift overflow-hidden"
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      View My Work
                    </span>
                    <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                  </button>
                  
                  <button 
                    className="group relative px-8 py-4 bg-transparent border-2 border-primary text-primary rounded-full font-medium transition-all duration-300 hover-lift hover:bg-primary hover:text-primary-foreground overflow-hidden"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Get In Touch
                    </span>
                    <div className="absolute inset-0 bg-primary/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Interactive Profile Experience */}
        <div className="hidden lg:flex w-1/2 items-center justify-center p-8 relative">
          <div className="relative">
            {/* Hologram-style profile card */}
            <div
              className="relative group cursor-pointer"
              onMouseMove={handleProfileMouseMove}
              onMouseLeave={handleProfileMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${profileTilt.x}deg) rotateY(${profileTilt.y}deg) rotate(15deg)`
              }}
            >
              {/* Card background with depth */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-accent/20 to-mint/20 rounded-3xl blur-xl" />
              <div className="absolute -inset-2 bg-gradient-to-br from-mint-light to-accent/30 rounded-3xl opacity-50" />
              
              {/* Main profile card */}
              <div className="relative w-80 h-96 bg-card/90 backdrop-blur-sm rounded-3xl overflow-hidden border border-border/50 shadow-organic">
                {/* Profile image with pixel reveal effect */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={profileAvatar}
                    alt="Alex Thompson"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    style={{
                      filter: isCreativeMode ? 'hue-rotate(15deg) saturate(1.2)' : 'none'
                    }}
                  />
                  
                  {/* Depth of field blur overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Floating skill badges around image */}
                  {['React', 'TypeScript', 'Node.js', 'Design'].map((skill, index) => (
                    <div
                      key={skill}
                      className={cn(
                        "absolute w-16 h-8 bg-primary/90 text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300",
                        "opacity-0 group-hover:opacity-100"
                      )}
                      style={{
                        left: `${20 + Math.cos(index * Math.PI / 2) * 60}%`,
                        top: `${50 + Math.sin(index * Math.PI / 2) * 40}%`,
                        transform: `translate(-50%, -50%) rotate(${index * 90}deg)`,
                        animationDelay: `${index * 0.2}s`
                      }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>

                {/* Card content */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-foreground mb-2">Alex Thompson</h3>
                  <p className="text-muted-foreground mb-4">Full-Stack Developer</p>
                  
                  {/* Interactive elements */}
                  <div className="flex justify-center gap-3">
                    {[Zap, Code, Heart].map((Icon, index) => (
                      <div
                        key={index}
                        className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer group/icon"
                      >
                        <Icon className="w-4 h-4 group-hover/icon:animate-pulse-gentle" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Signature animation */}
                <div className="absolute bottom-4 left-6 right-6">
                  <svg
                    viewBox="0 0 200 40"
                    className="w-full h-8"
                  >
                    <path
                      d="M10,20 Q50,10 100,20 T190,20"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      fill="none"
                      className="opacity-0 group-hover:opacity-100"
                      style={{
                        strokeDasharray: 200,
                        strokeDashoffset: 200,
                        animation: 'draw-line 2s ease-out forwards'
                      }}
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator with magnetic effect */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group"
        style={{
          transform: `translateX(-50%) translateY(${Math.sin(mousePosition.x * 0.01) * 5}px)`
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <Mouse className="w-6 h-6 text-primary/60 group-hover:text-primary transition-colors duration-300" />
          <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center group-hover:border-primary/60 transition-colors duration-300">
            <div className="w-1 h-3 bg-primary/60 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Creative mode ambient effects */}
      {isCreativeMode && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full animate-drift"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroSection;