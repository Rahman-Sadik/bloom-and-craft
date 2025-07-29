import { useParams } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink, Calendar, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Mock project data - in a real app this would come from an API or database
const projectData = {
  "ecommerce-platform": {
    title: "EcoCommerce Platform",
    thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&h=600",
    description: "Sustainable e-commerce platform with carbon footprint tracking and eco-friendly product recommendations.",
    longDescription: "A full-featured e-commerce platform focused on sustainability, featuring real-time carbon footprint calculation, eco-friendly product recommendations, and integrated offset programs. This comprehensive solution was designed to handle high-traffic scenarios while maintaining excellent user experience and environmental consciousness.",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS", "Redux"],
    githubUrl: "https://github.com/example/eco-commerce",
    liveUrl: "https://eco-commerce-demo.com",
    date: "2024-01-15",
    author: "John Doe",
    codeBlocks: [
      {
        title: "Carbon Footprint Calculator",
        language: "javascript",
        code: `const calculateCarbonFootprint = async (product, shippingDistance) => {
  const productEmissions = product.weight * product.carbonIntensity;
  const shippingEmissions = shippingDistance * 0.21; // kg CO2 per km
  const packagingEmissions = product.packaging.recyclable ? 0.5 : 2.1;
  
  const totalEmissions = productEmissions + shippingEmissions + packagingEmissions;
  
  // Store calculation for analytics
  await analytics.track('carbon_calculated', {
    productId: product.id,
    emissions: totalEmissions,
    shippingDistance,
    timestamp: Date.now()
  });
  
  return {
    total: totalEmissions,
    breakdown: {
      product: productEmissions,
      shipping: shippingEmissions,
      packaging: packagingEmissions
    },
    offsetCost: totalEmissions * 0.02 // $0.02 per kg CO2
  };
};`
      },
      {
        title: "Eco-Friendly Product Recommender",
        language: "tsx",
        code: `const EcoRecommendations: React.FC<{ productId: string }> = ({ productId }) => {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEcoAlternatives = async () => {
      try {
        const response = await api.get(\`/products/\${productId}/eco-alternatives\`);
        const alternatives = response.data.filter(product => 
          product.sustainabilityScore > 7 && 
          product.certifications.includes('eco-friendly')
        );
        
        setRecommendations(alternatives);
      } catch (error) {
        console.error('Failed to fetch eco alternatives:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEcoAlternatives();
  }, [productId]);

  return (
    <div className="eco-recommendations">
      <h3 className="text-lg font-semibold text-green-600 mb-4">
        🌱 Eco-Friendly Alternatives
      </h3>
      {loading ? (
        <div className="animate-pulse space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {recommendations.map(product => (
            <EcoProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};`
      }
    ]
  },
  "task-manager": {
    title: "Zen Task Manager",
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=1200&h=600",
    description: "Mindful productivity app with natural themes and focus modes to promote work-life balance.",
    longDescription: "A beautiful task management application that promotes mindful productivity through natural themes, breathing exercises, and distraction-free focus modes. Built for modern teams who value both productivity and mental wellness.",
    technologies: ["Vue.js", "TypeScript", "Supabase", "Tailwind", "PWA"],
    githubUrl: "https://github.com/example/zen-tasks",
    liveUrl: "https://zen-tasks-demo.com",
    date: "2023-11-20",
    author: "John Doe",
    codeBlocks: [
      {
        title: "Mindful Focus Mode Component",
        language: "vue",
        code: `<template>
  <div class="focus-mode" :class="{ active: focusActive }">
    <div class="breathing-circle" ref="breathingCircle">
      <div class="inner-circle" :style="circleStyle"></div>
    </div>
    
    <div class="focus-controls">
      <button @click="startFocusSession" class="focus-btn">
        {{ focusActive ? 'End Session' : 'Start Focus' }}
      </button>
      
      <div class="timer" v-if="focusActive">
        {{ formatTime(remainingTime) }}
      </div>
    </div>
    
    <TaskList 
      :tasks="activeTasks" 
      :focus-mode="focusActive"
      @task-complete="handleTaskComplete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const focusActive = ref(false)
const remainingTime = ref(25 * 60) // 25 minutes in seconds
const breathingPhase = ref<'inhale' | 'exhale'>('inhale')

const circleStyle = computed(() => ({
  transform: \`scale(\${breathingPhase.value === 'inhale' ? 1.2 : 0.8})\`,
  transition: 'transform 4s ease-in-out'
}))

const startFocusSession = () => {
  focusActive.value = !focusActive.value
  if (focusActive.value) {
    startBreathingAnimation()
    startTimer()
  }
}
</script>`
      }
    ]
  },
  "fitness-tracker": {
    title: "Nature Fitness Tracker",
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&h=600",
    description: "Outdoor fitness tracking with environmental awareness and location-based insights.",
    longDescription: "Mobile fitness application that encourages outdoor activities while providing environmental data about workout locations. Features include air quality monitoring, nature trail recommendations, and wildlife spotting integration.",
    technologies: ["React Native", "Firebase", "Maps API", "TensorFlow", "Redux"],
    githubUrl: "https://github.com/example/nature-fitness",
    liveUrl: "https://nature-fitness-demo.com",
    date: "2023-09-10",
    author: "John Doe",
    codeBlocks: [
      {
        title: "Location-Based Workout Tracking",
        language: "javascript",
        code: `const trackWorkout = async (workoutType, location) => {
  const workoutSession = {
    id: generateUUID(),
    type: workoutType,
    startTime: Date.now(),
    location: {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      altitude: location.coords.altitude
    },
    environmentalData: await getEnvironmentalData(location)
  };

  // Start real-time tracking
  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      updateWorkoutPath(workoutSession.id, position);
      checkForWildlifeSpottings(position);
    },
    (error) => console.error('GPS tracking error:', error),
    { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
  );

  return { workoutSession, watchId };
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