import { useParams } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink, Calendar, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Mock project data - in a real app this would come from an API or database
const projectData = {
  "1": {
    title: "E-Commerce Platform",
    thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&h=600",
    description: "A full-stack e-commerce platform built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, inventory management, and real-time analytics.",
    longDescription: "This comprehensive e-commerce solution was designed to handle high-traffic scenarios while maintaining excellent user experience. The platform includes advanced features like AI-powered product recommendations, multi-vendor support, and comprehensive analytics dashboard.",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis", "Docker"],
    githubUrl: "https://github.com/example/ecommerce",
    liveUrl: "https://ecommerce-demo.example.com",
    date: "2024-01-15",
    author: "John Doe",
    codeBlocks: [
      {
        title: "User Authentication Middleware",
        language: "javascript",
        code: `const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};`
      },
      {
        title: "Product Search Component",
        language: "tsx",
        code: `const ProductSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async (term: string) => {
      if (!term.trim()) return;
      
      setLoading(true);
      try {
        const response = await api.searchProducts(term);
        setProducts(response.data);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
        className="search-input"
      />
      {loading && <div className="loading-spinner" />}
      <ProductList products={products} />
    </div>
  );
};`
      }
    ]
  },
  "2": {
    title: "Task Management App",
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=1200&h=600",
    description: "A collaborative task management application with real-time updates, team collaboration features, and advanced project tracking capabilities.",
    longDescription: "Built for modern teams, this task management app focuses on simplicity and efficiency. It features drag-and-drop interfaces, real-time collaboration, time tracking, and comprehensive reporting tools.",
    technologies: ["Vue.js", "Firebase", "Vuex", "Tailwind CSS", "PWA"],
    githubUrl: "https://github.com/example/taskapp",
    liveUrl: "https://taskapp-demo.example.com",
    date: "2023-11-20",
    author: "John Doe",
    codeBlocks: [
      {
        title: "Real-time Task Updates",
        language: "javascript",
        code: `// Firebase real-time listener for task updates
const setupTaskListener = (projectId, callback) => {
  const tasksRef = db.collection('projects').doc(projectId).collection('tasks');
  
  return tasksRef.onSnapshot((snapshot) => {
    const tasks = [];
    snapshot.docChanges().forEach((change) => {
      const task = { id: change.doc.id, ...change.doc.data() };
      
      if (change.type === 'added') {
        tasks.push({ ...task, action: 'added' });
      } else if (change.type === 'modified') {
        tasks.push({ ...task, action: 'modified' });
      } else if (change.type === 'removed') {
        tasks.push({ ...task, action: 'removed' });
      }
    });
    
    callback(tasks);
  });
};`
      }
    ]
  }
};

const ProjectShowcase = () => {
  const { id } = useParams();
  const project = projectData[id as keyof typeof projectData];

  if (!project) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-forest mb-4">Project not found</h1>
          <Button onClick={() => window.history.back()} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section with Thumbnail */}
      <div className="relative">
        <div className="h-[70vh] relative overflow-hidden">
          <img 
            src={project.thumbnail} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-forest/20" />
          
          {/* Navigation */}
          <div className="absolute top-8 left-8">
            <Button 
              onClick={() => window.history.back()}
              variant="outline" 
              className="bg-white/90 backdrop-blur-sm border-sage hover:bg-sage hover:text-white transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
          </div>

          {/* Project Title Overlay */}
          <div className="absolute bottom-12 left-12 right-12">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-natural">
              <h1 className="text-4xl md:text-5xl font-bold text-forest mb-4 animate-fade-in">
                {project.title}
              </h1>
              <p className="text-lg text-gray max-w-3xl mb-6 animate-fade-in animation-delay-200">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-400">
                <Button asChild className="bg-sage hover:bg-sage-dark">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-sage hover:bg-sage hover:text-white">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    Source Code
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Project Meta */}
        <Card className="mb-12 border-sage/20 shadow-natural">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-sage" />
                <div>
                  <p className="text-sm text-gray">Project Date</p>
                  <p className="font-semibold text-forest">{new Date(project.date).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-sage" />
                <div>
                  <p className="text-sm text-gray">Developer</p>
                  <p className="font-semibold text-forest">{project.author}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Tag className="w-5 h-5 text-sage" />
                <div>
                  <p className="text-sm text-gray">Technologies</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-mint text-forest">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary" className="bg-sage text-white">
                        +{project.technologies.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Description */}
        <Card className="mb-12 border-sage/20 shadow-natural">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-forest mb-6">Project Overview</h2>
            <p className="text-gray leading-relaxed text-lg mb-6">
              {project.longDescription}
            </p>
            
            <h3 className="text-xl font-semibold text-forest mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="border-sage text-sage hover:bg-sage hover:text-white transition-colors">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Code Blocks */}
        <div className="space-y-8">
          {project.codeBlocks.map((block, index) => (
            <Card key={index} className="border-sage/20 shadow-natural overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-mint/30 px-8 py-4 border-b border-sage/20">
                  <h3 className="text-lg font-semibold text-forest">{block.title}</h3>
                  <p className="text-sm text-gray">Language: {block.language}</p>
                </div>
                <div className="p-8">
                  <pre className="bg-forest/5 rounded-lg p-6 overflow-x-auto">
                    <code className="text-sm text-forest whitespace-pre">
                      {block.code}
                    </code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation Footer */}
        <div className="mt-16 text-center">
          <Button 
            onClick={() => window.history.back()}
            variant="outline" 
            className="border-sage hover:bg-sage hover:text-white transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectShowcase;