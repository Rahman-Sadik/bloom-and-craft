import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Code, Heart, Lightbulb, Target, Coffee, Rocket } from 'lucide-react';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const infoCards = [
    {
      icon: Code,
      title: "Passionate Developer",
      description: "5+ years crafting digital experiences with modern technologies and clean, maintainable code.",
      color: "bg-primary/10 text-primary"
    },
    {
      icon: Heart,
      title: "User-Centered Design",
      description: "Obsessed with creating intuitive interfaces that users love and businesses trust.",
      color: "bg-accent/20 text-accent-foreground"
    },
    {
      icon: Lightbulb,
      title: "Innovation Mindset",
      description: "Always exploring new technologies and methodologies to solve complex problems elegantly.",
      color: "bg-sage/10 text-sage-hover"
    }
  ];

  const milestones = [
    {
      year: "2019",
      title: "Started Journey",
      description: "Began with HTML, CSS, and JavaScript",
      position: "left"
    },
    {
      year: "2020",
      title: "First Full-Stack App",
      description: "Built my first React + Node.js application",
      position: "right"
    },
    {
      year: "2021",
      title: "Professional Developer",
      description: "Joined tech startup as frontend developer",
      position: "left"
    },
    {
      year: "2022",
      title: "Lead Developer",
      description: "Promoted to lead frontend development team",
      position: "right"
    },
    {
      year: "2023",
      title: "Full-Stack Expert",
      description: "Mastered modern full-stack development",
      position: "left"
    },
    {
      year: "2024",
      title: "Freelance Success",
      description: "Building amazing projects for global clients",
      position: "right"
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

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 px-6 bg-gradient-warm relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute rounded-full bg-primary/5 animate-float",
              i % 3 === 0 ? "w-20 h-20" : i % 3 === 1 ? "w-12 h-12" : "w-8 h-8"
            )}
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${6 + (i % 3) * 2}s`
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
            About Me
          </h2>
          <div className={cn(
            "w-24 h-1 bg-primary rounded-full mx-auto mb-6",
            isVisible && "animate-draw-line"
          )} />
          <p className={cn(
            "text-fluid-lg text-muted-foreground max-w-2xl mx-auto",
            isVisible && "animate-slide-up-fade"
          )} style={{ animationDelay: '0.2s' }}>
            I'm a passionate full-stack developer who believes in crafting digital experiences that are both beautiful and functional.
          </p>
        </div>

        {/* Info cards with origami effect */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {infoCards.map((card, index) => (
            <div
              key={index}
              className={cn(
                "relative group cursor-pointer",
                isVisible && "animate-organic-entrance"
              )}
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className={cn(
                "bg-card p-8 rounded-2xl shadow-soft transition-all duration-500 hover-lift",
                "border border-border/50 paper-texture",
                activeCard === index && "shadow-organic"
              )}>
                <div className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto transition-all duration-300",
                  card.color,
                  activeCard === index && "scale-110 animate-breathe"
                )}>
                  <card.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-4 text-center">
                  {card.title}
                </h3>
                
                <p className="text-muted-foreground text-center leading-relaxed">
                  {card.description}
                </p>

                {/* Hover effect overlay */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-sage rounded-2xl opacity-0 transition-opacity duration-500",
                  activeCard === index && "opacity-5"
                )} />
              </div>
            </div>
          ))}
        </div>

        {/* Personal journey timeline */}
        <div className="relative">
          <h3 className={cn(
            "text-fluid-2xl font-semibold text-foreground text-center mb-12",
            isVisible && "animate-slide-up-fade"
          )} style={{ animationDelay: '0.6s' }}>
            My Journey
          </h3>

          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary/20 rounded-full">
            <div className={cn(
              "w-full bg-primary rounded-full transition-all duration-2000",
              isVisible ? "h-full" : "h-0"
            )} style={{ transitionDelay: '0.8s' }} />
          </div>

          {/* Timeline items */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={cn(
                  "relative flex items-center",
                  milestone.position === "left" ? "justify-start" : "justify-end"
                )}
              >
                {/* Timeline bubble */}
                <div className={cn(
                  "absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-background z-10 transition-all duration-500",
                  isVisible ? "bg-primary scale-100" : "bg-muted scale-75"
                )} style={{ transitionDelay: `${0.9 + index * 0.1}s` }}>
                  <div className="absolute inset-0 rounded-full bg-primary animate-pulse-gentle" />
                </div>

                {/* Content bubble */}
                <div className={cn(
                  "w-5/12 p-6 rounded-2xl shadow-soft paper-texture bg-card border border-border/50 transition-all duration-500",
                  milestone.position === "left" ? "mr-auto" : "ml-auto",
                  isVisible && "animate-organic-entrance hover-lift"
                )} style={{ animationDelay: `${1 + index * 0.1}s` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl font-bold text-primary">{milestone.year}</span>
                    <div className="flex-1 h-px bg-primary/20" />
                  </div>
                  
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {milestone.title}
                  </h4>
                  
                  <p className="text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personal touch */}
        <div className={cn(
          "mt-20 text-center p-8 rounded-2xl bg-gradient-sage shadow-medium border border-primary/20",
          isVisible && "animate-organic-entrance"
        )} style={{ animationDelay: '1.5s' }}>
          <div className="flex justify-center gap-4 mb-4">
            <Coffee className="w-6 h-6 text-primary animate-bounce" style={{ animationDelay: '0s' }} />
            <Target className="w-6 h-6 text-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
            <Rocket className="w-6 h-6 text-primary animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
          
          <p className="text-lg text-card-foreground font-medium">
            When I'm not coding, you'll find me exploring nature trails, experimenting with new coffee brewing methods, 
            or contributing to open-source projects that make a difference.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;