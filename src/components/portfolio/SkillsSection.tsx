import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { 
  Leaf, 
  TreePine, 
  Flower2, 
  Sprout,
  Globe,
  Database,
  Palette,
  Wrench,
  Cloud,
  Shield
} from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'design' | 'tools';
  icon: any;
  description: string;
}

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const skills: Skill[] = [
    // Frontend Skills
    { name: 'React/Next.js', level: 95, category: 'frontend', icon: Leaf, description: 'Building dynamic user interfaces' },
    { name: 'TypeScript', level: 90, category: 'frontend', icon: Leaf, description: 'Type-safe development' },
    { name: 'Vue.js', level: 85, category: 'frontend', icon: Leaf, description: 'Progressive web applications' },
    { name: 'CSS/Tailwind', level: 92, category: 'frontend', icon: Leaf, description: 'Responsive styling systems' },
    
    // Backend Skills
    { name: 'Node.js', level: 88, category: 'backend', icon: TreePine, description: 'Server-side JavaScript' },
    { name: 'Python/Django', level: 85, category: 'backend', icon: TreePine, description: 'Robust web frameworks' },
    { name: 'PostgreSQL', level: 87, category: 'backend', icon: Database, description: 'Database design & optimization' },
    { name: 'MongoDB', level: 83, category: 'backend', icon: Database, description: 'NoSQL data management' },
    
    // Design Skills
    { name: 'UI/UX Design', level: 88, category: 'design', icon: Flower2, description: 'User experience design' },
    { name: 'Figma/Adobe', level: 85, category: 'design', icon: Palette, description: 'Design tools & prototyping' },
    { name: 'Animation', level: 80, category: 'design', icon: Flower2, description: 'Motion graphics & interactions' },
    
    // Tools & DevOps
    { name: 'Git/GitHub', level: 93, category: 'tools', icon: Wrench, description: 'Version control & collaboration' },
    { name: 'Docker', level: 82, category: 'tools', icon: Cloud, description: 'Containerization & deployment' },
    { name: 'AWS/Vercel', level: 85, category: 'tools', icon: Cloud, description: 'Cloud platforms & hosting' },
    { name: 'Security', level: 80, category: 'tools', icon: Shield, description: 'Web security best practices' }
  ];

  const categoryColors = {
    frontend: { bg: 'bg-sage/10', text: 'text-sage-hover', border: 'border-sage/30' },
    backend: { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/30' },
    design: { bg: 'bg-accent/20', text: 'text-accent-foreground', border: 'border-accent/30' },
    tools: { bg: 'bg-muted/20', text: 'text-muted-foreground', border: 'border-muted/30' }
  };

  const categoryIcons = {
    frontend: Sprout,
    backend: TreePine,
    design: Flower2,
    tools: Wrench
  };

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

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-20 px-6 bg-background relative overflow-hidden"
    >
      {/* Organic background elements */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute animate-float",
              i % 4 === 0 ? "w-6 h-6 bg-primary/10 rounded-full" :
              i % 4 === 1 ? "w-4 h-8 bg-accent/10 rounded-full" :
              i % 4 === 2 ? "w-8 h-4 bg-sage/10 rounded-full" :
              "w-5 h-5 bg-muted/10 rounded-full"
            )}
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${5 + (i % 4)}s`
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
            Skills Garden
          </h2>
          <div className={cn(
            "w-24 h-1 bg-primary rounded-full mx-auto mb-6",
            isVisible && "animate-draw-line"
          )} />
          <p className={cn(
            "text-fluid-lg text-muted-foreground max-w-2xl mx-auto",
            isVisible && "animate-slide-up-fade"
          )} style={{ animationDelay: '0.2s' }}>
            Watch my skills grow like plants in a digital garden - each one nurtured through practice and passion.
          </p>
        </div>

        {/* Skills garden grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {Object.entries(categoryColors).map(([category, colors], categoryIndex) => {
            const CategoryIcon = categoryIcons[category as keyof typeof categoryIcons];
            const categorySkills = getSkillsByCategory(category);
            
            return (
              <div
                key={category}
                className={cn(
                  "p-8 rounded-3xl border-2 paper-texture transition-all duration-500 hover-lift",
                  colors.bg,
                  colors.border,
                  isVisible && "animate-organic-entrance"
                )}
                style={{ animationDelay: `${0.3 + categoryIndex * 0.1}s` }}
              >
                {/* Category header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center",
                    colors.bg.replace('/10', '/20'),
                    colors.border
                  )}>
                    <CategoryIcon className={cn("w-6 h-6", colors.text)} />
                  </div>
                  <h3 className={cn("text-2xl font-semibold capitalize", colors.text)}>
                    {category} Skills
                  </h3>
                </div>

                {/* Skills list */}
                <div className="space-y-6">
                  {categorySkills.map((skill, skillIndex) => (
                    <div
                      key={skill.name}
                      className="group cursor-pointer"
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      {/* Skill header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <skill.icon className={cn(
                            "w-5 h-5 transition-all duration-300",
                            colors.text,
                            hoveredSkill === skill.name && "animate-breathe"
                          )} />
                          <span className="font-medium text-foreground">
                            {skill.name}
                          </span>
                        </div>
                        <span className={cn("text-sm font-semibold", colors.text)}>
                          {skill.level}%
                        </span>
                      </div>

                      {/* Growth progress bar */}
                      <div className="relative h-3 bg-muted/30 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "absolute inset-y-0 left-0 rounded-full transition-all duration-1000",
                            category === 'frontend' ? "bg-sage" :
                            category === 'backend' ? "bg-primary" :
                            category === 'design' ? "bg-accent" :
                            "bg-muted-foreground"
                          )}
                          style={{ 
                            width: isVisible ? `${skill.level}%` : '0%',
                            transitionDelay: `${0.5 + categoryIndex * 0.1 + skillIndex * 0.05}s`
                          }}
                        />
                        
                        {/* Growth indicator */}
                        <div 
                          className={cn(
                            "absolute top-0 w-3 h-3 rounded-full transition-all duration-1000",
                            category === 'frontend' ? "bg-sage-hover" :
                            category === 'backend' ? "bg-primary" :
                            category === 'design' ? "bg-accent" :
                            "bg-muted-foreground",
                            hoveredSkill === skill.name && "animate-pulse-gentle"
                          )}
                          style={{ 
                            left: isVisible ? `calc(${skill.level}% - 6px)` : '-6px',
                            transitionDelay: `${0.5 + categoryIndex * 0.1 + skillIndex * 0.05}s`
                          }}
                        />
                      </div>

                      {/* Skill description (appears on hover) */}
                      <div className={cn(
                        "mt-2 text-sm text-muted-foreground transition-all duration-300 overflow-hidden",
                        hoveredSkill === skill.name ? "opacity-100 max-h-20" : "opacity-0 max-h-0"
                      )}>
                        {skill.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating skill badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS', 'Figma'].map((tech, index) => (
            <div
              key={tech}
              className={cn(
                "px-6 py-3 bg-card rounded-full shadow-soft border border-border/50 transition-all duration-300 hover-lift cursor-pointer",
                isVisible && "animate-organic-entrance"
              )}
              style={{ animationDelay: `${1 + index * 0.05}s` }}
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                target.style.transform = 'translateY(-8px) rotate(5deg)';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget;
                target.style.transform = 'translateY(0) rotate(0deg)';
              }}
            >
              <span className="text-sm font-medium text-foreground">{tech}</span>
            </div>
          ))}
        </div>

        {/* Garden summary */}
        <div className={cn(
          "mt-16 text-center p-8 rounded-3xl bg-gradient-sage shadow-medium border border-primary/20",
          isVisible && "animate-organic-entrance"
        )} style={{ animationDelay: '1.2s' }}>
          <Globe className="w-8 h-8 text-primary mx-auto mb-4 animate-breathe" />
          <p className="text-lg text-card-foreground font-medium max-w-2xl mx-auto">
            My skills continue to evolve and grow, just like a living garden. I'm always learning new technologies 
            and refining my craft to create better digital experiences.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;