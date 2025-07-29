import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ExternalLink, Github, Play, ArrowRight, Sparkles } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  category: 'web' | 'mobile' | 'fullstack';
}

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'all' | 'web' | 'mobile' | 'fullstack'>('all');
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: 'ecommerce-platform',
      title: 'EcoCommerce Platform',
      description: 'Sustainable e-commerce platform with carbon footprint tracking',
      longDescription: 'A full-featured e-commerce platform focused on sustainability, featuring real-time carbon footprint calculation, eco-friendly product recommendations, and integrated offset programs.',
      image: '/api/placeholder/600/400',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
      liveUrl: 'https://eco-commerce-demo.com',
      githubUrl: 'https://github.com/example/eco-commerce',
      featured: true,
      category: 'fullstack'
    },
    {
      id: 'task-manager',
      title: 'Zen Task Manager',
      description: 'Mindful productivity app with natural themes and focus modes',
      longDescription: 'A beautiful task management application that promotes mindful productivity through natural themes, breathing exercises, and distraction-free focus modes.',
      image: '/api/placeholder/600/400',
      tech: ['Vue.js', 'TypeScript', 'Supabase', 'Tailwind'],
      liveUrl: 'https://zen-tasks-demo.com',
      githubUrl: 'https://github.com/example/zen-tasks',
      featured: true,
      category: 'web'
    },
    {
      id: 'fitness-tracker',
      title: 'Nature Fitness Tracker',
      description: 'Outdoor fitness tracking with environmental awareness',
      longDescription: 'Mobile fitness application that encourages outdoor activities while providing environmental data about workout locations.',
      image: '/api/placeholder/600/400',
      tech: ['React Native', 'Firebase', 'Maps API', 'TensorFlow'],
      liveUrl: 'https://nature-fitness-demo.com',
      githubUrl: 'https://github.com/example/nature-fitness',
      featured: false,
      category: 'mobile'
    },
    {
      id: 'design-system',
      title: 'Organic Design System',
      description: 'Component library inspired by natural forms and movements',
      longDescription: 'A comprehensive design system and component library featuring organic animations, natural color palettes, and accessibility-first components.',
      image: '/api/placeholder/600/400',
      tech: ['React', 'Storybook', 'TypeScript', 'CSS-in-JS'],
      liveUrl: 'https://organic-design-system.com',
      githubUrl: 'https://github.com/example/organic-design',
      featured: false,
      category: 'web'
    },
    {
      id: 'weather-app',
      title: 'Mindful Weather',
      description: 'Weather app with meditation suggestions based on conditions',
      longDescription: 'Weather application that suggests mindfulness activities and meditations based on current weather conditions and seasonal changes.',
      image: '/api/placeholder/600/400',
      tech: ['Next.js', 'Weather API', 'Framer Motion', 'Tailwind'],
      liveUrl: 'https://mindful-weather-demo.com',
      githubUrl: 'https://github.com/example/mindful-weather',
      featured: false,
      category: 'web'
    },
    {
      id: 'budget-tracker',
      title: 'Green Budget Tracker',
      description: 'Personal finance with sustainability scoring',
      longDescription: 'Budget tracking application that scores purchases based on environmental impact and suggests sustainable alternatives.',
      image: '/api/placeholder/600/400',
      tech: ['React', 'Python', 'ML APIs', 'Chart.js'],
      liveUrl: 'https://green-budget-demo.com',
      githubUrl: 'https://github.com/example/green-budget',
      featured: true,
      category: 'fullstack'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'fullstack', label: 'Full-Stack' }
  ];

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

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

  const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className={cn(
          "group relative overflow-hidden rounded-3xl shadow-soft transition-all duration-500 hover-lift cursor-pointer",
          "bg-card border border-border/50 paper-texture",
          project.featured && "md:col-span-2",
          isVisible && "animate-organic-entrance"
        )}
        style={{ animationDelay: `${0.4 + index * 0.1}s` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => navigate(`/project/${project.id}`)}
      >
        {/* Project image */}
        <div className="aspect-video relative overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className={cn(
              "w-full h-full object-cover transition-transform duration-700",
              isHovered && "scale-110"
            )}
          />
          
          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Featured
            </div>
          )}

          {/* Overlay gradient */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )} />

          {/* Quick action buttons */}
          <div className={cn(
            "absolute top-4 right-4 flex gap-2 transition-all duration-300",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          )}>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-background/90 rounded-full flex items-center justify-center hover:bg-background transition-colors duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4 text-foreground" />
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-background/90 rounded-full flex items-center justify-center hover:bg-background transition-colors duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-4 h-4 text-foreground" />
            </a>
          </div>
        </div>

        {/* Project info */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.slice(0, 4).map((tech, techIndex) => (
              <span
                key={tech}
                className="px-3 py-1 bg-accent/20 text-accent-foreground rounded-full text-xs font-medium transition-all duration-300"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="px-3 py-1 bg-muted/20 text-muted-foreground rounded-full text-xs font-medium">
                +{project.tech.length - 4} more
              </span>
            )}
          </div>

          {/* View project button */}
          <div className="flex items-center justify-between">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/project/${project.id}`);
              }}
              className="group/btn flex items-center gap-2 text-primary font-medium transition-all duration-300 hover:gap-3"
            >
              <span>View Project</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </button>
            
            <div className="flex gap-1">
              <div className={cn(
                "w-2 h-2 bg-primary rounded-full transition-all duration-300",
                isHovered && "animate-pulse-gentle"
              )} />
              <div className={cn(
                "w-2 h-2 bg-accent rounded-full transition-all duration-300",
                isHovered && "animate-pulse-gentle"
              )} style={{ animationDelay: '0.1s' }} />
              <div className={cn(
                "w-2 h-2 bg-sage rounded-full transition-all duration-300",
                isHovered && "animate-pulse-gentle"
              )} style={{ animationDelay: '0.2s' }} />
            </div>
          </div>
        </div>

        {/* Hover glow effect */}
        <div className={cn(
          "absolute inset-0 rounded-3xl transition-opacity duration-300 pointer-events-none",
          "bg-gradient-to-br from-primary/5 via-transparent to-accent/5",
          isHovered ? "opacity-100" : "opacity-0"
        )} />
      </div>
    );
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 px-6 bg-gradient-warm relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute animate-drift",
              i % 5 === 0 ? "w-3 h-3 bg-primary/20 rounded-full" :
              i % 5 === 1 ? "w-2 h-6 bg-accent/20 rounded-full" :
              i % 5 === 2 ? "w-6 h-2 bg-sage/20 rounded-full" :
              i % 5 === 3 ? "w-4 h-4 bg-muted/20 rounded-full" :
              "w-1 h-8 bg-primary/10 rounded-full"
            )}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${15 + (i % 5) * 3}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className={cn(
            "text-fluid-3xl font-bold text-foreground mb-4",
            isVisible && "animate-slide-up-fade"
          )}>
            Featured Projects
          </h2>
          <div className={cn(
            "w-24 h-1 bg-primary rounded-full mx-auto mb-6",
            isVisible && "animate-draw-line"
          )} />
          <p className={cn(
            "text-fluid-lg text-muted-foreground max-w-2xl mx-auto",
            isVisible && "animate-slide-up-fade"
          )} style={{ animationDelay: '0.2s' }}>
            A collection of projects that showcase my passion for creating meaningful digital experiences with natural, intuitive design.
          </p>
        </div>

        {/* Filter buttons */}
        <div className={cn(
          "flex flex-wrap justify-center gap-3 mb-12",
          isVisible && "animate-slide-up-fade"
        )} style={{ animationDelay: '0.3s' }}>
          {filters.map((filterOption) => (
            <button
              key={filterOption.id}
              onClick={() => setFilter(filterOption.id as any)}
              className={cn(
                "px-6 py-3 rounded-full font-medium transition-all duration-300 hover-lift",
                filter === filterOption.id
                  ? "bg-primary text-primary-foreground shadow-medium"
                  : "bg-card text-foreground border border-border/50 hover:border-primary/50"
              )}
            >
              {filterOption.label}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Call to action */}
        <div className={cn(
          "mt-16 text-center",
          isVisible && "animate-organic-entrance"
        )} style={{ animationDelay: '0.8s' }}>
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-card rounded-full shadow-medium border border-border/50 hover-lift cursor-pointer group">
            <Play className="w-5 h-5 text-primary group-hover:animate-pulse-gentle" />
            <span className="text-foreground font-medium">See More Projects on GitHub</span>
            <ArrowRight className="w-5 h-5 text-primary transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>

      {/* Project detail modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-card rounded-3xl shadow-organic max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-organic-entrance"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-t-3xl"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-background/90 rounded-full flex items-center justify-center hover:bg-background transition-colors duration-200"
              >
                ×
              </button>
            </div>
            
            <div className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {selectedProject.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {selectedProject.longDescription}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-accent/20 text-accent-foreground rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium transition-all duration-300 hover-lift"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-full font-medium transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                >
                  <Github className="w-4 h-4" />
                  View Code
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;