import { ExternalLink, Github, Star } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export function Projects() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform with real-time inventory management, payment processing, and admin dashboard. Built with modern technologies for scalability and performance.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS S3', 'Redis'],
      features: [
        'Real-time inventory updates',
        'Secure payment processing',
        'Advanced product filtering',
        'Responsive admin dashboard'
      ],
      github: 'https://github.com',
      demo: 'https://example.com',
      stars: 245
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, team workspaces, and advanced project tracking features. Supports drag-and-drop functionality and integrations.',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800',
      technologies: ['Vue.js', 'Express', 'PostgreSQL', 'Socket.io', 'Docker'],
      features: [
        'Real-time collaboration',
        'Drag-and-drop task boards',
        'Team workspaces',
        'Calendar integration'
      ],
      github: 'https://github.com',
      demo: 'https://example.com',
      stars: 189
    },
    {
      title: 'AI Content Generator',
      description: 'An AI-powered content generation tool that helps marketers and writers create high-quality content. Features customizable templates and multi-language support.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      technologies: ['Next.js', 'OpenAI API', 'Tailwind CSS', 'Supabase'],
      features: [
        'AI-powered content creation',
        'Multiple content templates',
        'Multi-language support',
        'Export in various formats'
      ],
      github: 'https://github.com',
      demo: 'https://example.com',
      stars: 412
    },
    {
      title: 'Analytics Dashboard',
      description: 'A comprehensive analytics dashboard for monitoring application metrics, user behavior, and business KPIs. Features interactive charts and real-time data visualization.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      technologies: ['React', 'D3.js', 'Python', 'FastAPI', 'PostgreSQL'],
      features: [
        'Real-time data visualization',
        'Customizable widgets',
        'Export reports to PDF',
        'Advanced filtering options'
      ],
      github: 'https://github.com',
      demo: 'https://example.com',
      stars: 328
    },
    {
      title: 'Social Media Scheduler',
      description: 'A multi-platform social media scheduling tool that helps manage and automate posts across different social networks. Includes analytics and engagement tracking.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
      technologies: ['React Native', 'Firebase', 'Node.js', 'Twitter API', 'Instagram API'],
      features: [
        'Multi-platform posting',
        'Schedule and automation',
        'Analytics and insights',
        'Content calendar view'
      ],
      github: 'https://github.com',
      demo: 'https://example.com',
      stars: 156
    },
    {
      title: 'Video Streaming Platform',
      description: 'A Netflix-like video streaming platform with adaptive streaming, user profiles, and recommendation engine. Built for high performance and scalability.',
      image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800',
      technologies: ['React', 'AWS', 'HLS', 'DynamoDB', 'Lambda', 'CloudFront'],
      features: [
        'Adaptive bitrate streaming',
        'User profiles and watchlists',
        'Content recommendation engine',
        'Offline download support'
      ],
      github: 'https://github.com',
      demo: 'https://example.com',
      stars: 567
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl text-white mb-4 text-center">Featured Projects</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          A collection of my recent work showcasing my expertise in full-stack development
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="bg-gray-900 border-gray-700 overflow-hidden hover:border-blue-500 transition-colors group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-gray-900/90 px-3 py-1 rounded-full flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
                  <span className="text-white text-sm">{project.stars}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-white text-xl mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                
                <div className="mb-4">
                  <p className="text-gray-500 text-xs mb-2">Key Features:</p>
                  <ul className="space-y-1">
                    {project.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="text-gray-400 text-xs flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-gray-800 text-gray-300 text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <Badge variant="secondary" className="bg-gray-800 text-gray-300 text-xs">
                      +{project.technologies.length - 4}
                    </Badge>
                  )}
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    asChild
                  >
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
