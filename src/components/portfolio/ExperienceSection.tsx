import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { 
  MapPin, 
  Calendar, 
  Award,
  Users,
  TrendingUp,
  Star,
  Building,
  Briefcase
} from 'lucide-react';

interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  type: 'fulltime' | 'contract' | 'freelance';
  description: string;
  achievements: string[];
  tech: string[];
  logo: string;
}

const ExperienceSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeExperience, setActiveExperience] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const experiences: Experience[] = [
    {
      id: 'tech-startup',
      company: 'GreenTech Solutions',
      role: 'Senior Full-Stack Developer',
      duration: '2023 - Present',
      location: 'Remote',
      type: 'fulltime',
      description: 'Leading development of sustainable technology solutions, focusing on clean energy management platforms.',
      achievements: [
        'Led team of 5 developers in building carbon tracking platform',
        'Reduced application load time by 60% through optimization',
        'Implemented CI/CD pipeline reducing deployment time by 80%',
        'Mentored 3 junior developers in modern web technologies'
      ],
      tech: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
      logo: '/api/placeholder/80/80'
    },
    {
      id: 'digital-agency',
      company: 'CreativeFlow Agency',
      role: 'Frontend Developer',
      duration: '2021 - 2023',
      location: 'San Francisco, CA',
      type: 'fulltime',
      description: 'Developed custom web applications and e-commerce solutions for diverse clients across various industries.',
      achievements: [
        'Built 15+ responsive web applications from scratch',
        'Improved client satisfaction scores by 40%',
        'Created reusable component library saving 200+ dev hours',
        'Collaborated with design team on 50+ projects'
      ],
      tech: ['Vue.js', 'React', 'TypeScript', 'Tailwind', 'Figma'],
      logo: '/api/placeholder/80/80'
    },
    {
      id: 'freelance',
      company: 'Independent Consultant',
      role: 'Full-Stack Developer',
      duration: '2020 - 2021',
      location: 'Remote',
      type: 'freelance',
      description: 'Provided end-to-end web development services for startups and small businesses.',
      achievements: [
        'Successfully delivered 20+ projects on time and budget',
        'Built MVP applications for 3 successful startups',
        'Achieved 5-star rating across all client platforms',
        'Generated $150K+ in freelance revenue'
      ],
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Heroku'],
      logo: '/api/placeholder/80/80'
    },
    {
      id: 'first-job',
      company: 'TechCorp Inc.',
      role: 'Junior Developer',
      duration: '2019 - 2020',
      location: 'Seattle, WA',
      type: 'fulltime',
      description: 'Started career building internal tools and contributing to customer-facing applications.',
      achievements: [
        'Developed 5+ internal automation tools',
        'Reduced manual data processing by 70%',
        'Completed advanced React certification',
        'Participated in company hackathon - 2nd place'
      ],
      tech: ['JavaScript', 'React', 'Python', 'MySQL', 'Git'],
      logo: '/api/placeholder/80/80'
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'fulltime':
        return 'bg-primary/10 text-primary border-primary/30';
      case 'contract':
        return 'bg-accent/20 text-accent-foreground border-accent/30';
      case 'freelance':
        return 'bg-sage/10 text-sage-hover border-sage/30';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'fulltime':
        return Building;
      case 'contract':
        return Briefcase;
      case 'freelance':
        return Users;
      default:
        return Building;
    }
  };

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="py-20 px-6 bg-background relative overflow-hidden"
    >
      {/* Flowing river background */}
      <div className="absolute inset-0 opacity-20">
        {/* River path */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <path
            d="M0,400 Q300,200 600,400 T1200,400"
            stroke="hsl(var(--primary))"
            strokeWidth="4"
            fill="none"
            opacity="0.3"
            className={cn(
              "transition-all duration-2000",
              isVisible && "animate-draw-line"
            )}
          />
          <path
            d="M0,450 Q350,250 700,450 T1200,450"
            stroke="hsl(var(--accent))"
            strokeWidth="2"
            fill="none"
            opacity="0.2"
            className={cn(
              "transition-all duration-2000",
              isVisible && "animate-draw-line"
            )}
            style={{ animationDelay: '0.5s' }}
          />
        </svg>

        {/* Floating elements */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute animate-float",
              i % 3 === 0 ? "w-4 h-4 bg-primary/10 rounded-full" :
              i % 3 === 1 ? "w-3 h-6 bg-accent/10 rounded-full" :
              "w-6 h-3 bg-sage/10 rounded-full"
            )}
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${6 + (i % 3)}s`
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
            Professional Journey
          </h2>
          <div className={cn(
            "w-24 h-1 bg-primary rounded-full mx-auto mb-6",
            isVisible && "animate-draw-line"
          )} />
          <p className={cn(
            "text-fluid-lg text-muted-foreground max-w-2xl mx-auto",
            isVisible && "animate-slide-up-fade"
          )} style={{ animationDelay: '0.2s' }}>
            Follow my growth as a developer through meaningful projects and collaborative experiences.
          </p>
        </div>

        {/* Experience timeline */}
        <div className="relative">
          {/* Central timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary/20 rounded-full hidden lg:block">
            <div className={cn(
              "w-full bg-primary rounded-full transition-all duration-2000",
              isVisible ? "h-full" : "h-0"
            )} style={{ transitionDelay: '0.5s' }} />
          </div>

          {/* Experience cards */}
          <div className="space-y-12 lg:space-y-16">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              const TypeIcon = getTypeIcon(exp.type);
              
              return (
                <div
                  key={exp.id}
                  className={cn(
                    "relative flex items-center",
                    isLeft ? "lg:justify-start" : "lg:justify-end"
                  )}
                >
                  {/* Timeline node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-background z-20 hidden lg:block">
                    <div className={cn(
                      "absolute inset-0 rounded-full bg-primary transition-all duration-500",
                      isVisible && "animate-pulse-gentle"
                    )} style={{ animationDelay: `${0.8 + index * 0.2}s` }} />
                  </div>

                  {/* Experience card */}
                  <div 
                    className={cn(
                      "w-full lg:w-5/12 group cursor-pointer",
                      isLeft ? "lg:pr-12" : "lg:pl-12"
                    )}
                    onMouseEnter={() => setActiveExperience(exp.id)}
                    onMouseLeave={() => setActiveExperience(null)}
                  >
                    <div className={cn(
                      "p-8 rounded-3xl shadow-soft transition-all duration-500 hover-lift paper-texture",
                      "bg-card border border-border/50",
                      activeExperience === exp.id && "shadow-organic",
                      isVisible && "animate-organic-entrance"
                    )} style={{ animationDelay: `${0.6 + index * 0.15}s` }}>
                      {/* Company header */}
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-medium flex-shrink-0">
                          <img 
                            src={exp.logo} 
                            alt={`${exp.company} logo`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-foreground truncate">
                              {exp.company}
                            </h3>
                            <div className={cn(
                              "px-3 py-1 rounded-full text-xs font-medium border",
                              getTypeColor(exp.type)
                            )}>
                              <TypeIcon className="w-3 h-3 inline mr-1" />
                              {exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}
                            </div>
                          </div>
                          
                          <h4 className="text-lg font-medium text-primary mb-3">
                            {exp.role}
                          </h4>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {exp.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {exp.location}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Award className="w-5 h-5 text-primary" />
                          <span className="font-medium text-foreground">Key Achievements</span>
                        </div>
                        
                        <div className="space-y-2">
                          {exp.achievements.map((achievement, achievementIndex) => (
                            <div
                              key={achievementIndex}
                              className={cn(
                                "flex items-start gap-3 text-sm text-muted-foreground transition-all duration-300",
                                activeExperience === exp.id && "animate-slide-up-fade"
                              )}
                              style={{ animationDelay: `${achievementIndex * 0.1}s` }}
                            >
                              <Star className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                              <span>{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech stack */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <TrendingUp className="w-5 h-5 text-primary" />
                          <span className="font-medium text-foreground">Technologies</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {exp.tech.map((tech, techIndex) => (
                            <span
                              key={tech}
                              className={cn(
                                "px-3 py-1 bg-accent/20 text-accent-foreground rounded-full text-xs font-medium transition-all duration-300",
                                activeExperience === exp.id && "animate-organic-entrance"
                              )}
                              style={{ animationDelay: `${techIndex * 0.05}s` }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Hover indicator */}
                      <div className={cn(
                        "absolute top-4 right-4 w-3 h-3 rounded-full bg-primary transition-all duration-300",
                        activeExperience === exp.id ? "opacity-100 animate-pulse-gentle" : "opacity-0"
                      )} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Career summary */}
        <div className={cn(
          "mt-20 text-center p-8 rounded-3xl bg-gradient-sage shadow-medium border border-primary/20",
          isVisible && "animate-organic-entrance"
        )} style={{ animationDelay: '1.5s' }}>
          <div className="flex justify-center gap-8 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">5+</div>
              <div className="text-sm text-card-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">50+</div>
              <div className="text-sm text-card-foreground">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">100%</div>
              <div className="text-sm text-card-foreground">Client Satisfaction</div>
            </div>
          </div>
          
          <p className="text-lg text-card-foreground font-medium max-w-2xl mx-auto">
            Every role has been a stepping stone in my journey to create meaningful digital experiences. 
            I'm passionate about continuous learning and contributing to teams that make a positive impact.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;