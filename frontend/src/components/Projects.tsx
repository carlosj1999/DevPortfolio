import { ExternalLink, Github } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import IPAgregator from '../assets/projects/ip_aggregator.png';
import Privnote from '../assets/projects/privnote.png';
import Shortener from '../assets/projects/URL-Shortener.png';
import YuniorInk from '../assets/projects/Yunior_ink.png';
import { resolveBackendUrl } from '../utils/backend';

type Project = {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  features: string[];
  github?: string;
  demo?: string;
  demoPath?: string;
  stars: number;
};

export function Projects() {
  const projects: Project[] = [
    {
      title: 'Yunior Ink — Tattoo Portfolio & Booking',
      description:
        'Responsive portfolio and booking experience for a tattoo studio with SEO-friendly galleries, lead capture, and an internal CMS for content updates.',
      image: YuniorInk,
      technologies: ['Python', 'Django', 'PostgreSQL', 'Docker', 'Tailwind CSS', 'Azure'],
      features: [
        'Custom CMS for uploading, tagging, and organizing multi-format galleries',
        'Booking and reservation workflows with validation, notifications, and lead tracking',
        'Cloud-deployed infrastructure with HTTPS, logging, and observability'
      ],
      github: 'https://github.com/carlosj1999',
      demo: 'https://yunior.ink/',
      stars: 120
    },
    {
      title: 'URL Shortener Platform',
      description:
        'Secure URL management platform that lets users shorten, share, and monitor their links with built-in account management.',
      image: Shortener,
      technologies: ['Python', 'Django', 'SQLite', 'Bootstrap', 'HTML', 'CSS'],
      features: [
        'User authentication for personal link dashboards and analytics',
        'URL validation and formatting checks prior to shortening',
        'Simple sharing flows with copy-ready short links'
      ],
      github: 'https://github.com/carlosj1999/url_shortener',
      demoPath: '/shortener/',
      stars: 85
    },
    {
      title: 'PrivNote — Encrypted Notes',
      description:
        'End-to-end encrypted note application that supports expiring, one-time view links for sensitive communication.',
      image: Privnote,
      technologies: ['Python', 'Django', 'DigitalOcean', 'Ubuntu', 'AlmaLinux', 'CSS'],
      features: [
        'Self-destructing notes with configurable expiration policies',
        'One-time access links to ensure confidentiality for recipients',
        'Hardened deployment with Linux administration best practices'
      ],
      github: 'https://github.com/carlosj1999/privnote',
      demoPath: '/privnote/',
      stars: 96
    },
    {
      title: 'IPAggregator — Network Management',
      description:
        'Operational dashboard for aggregating and tracking IP address allocations across enterprise environments.',
      image: IPAgregator,
      technologies: ['Python', 'Django', 'PostgreSQL', 'DigitalOcean', 'Tailwind CSS'],
      features: [
        'Aggregated IP inventory with search and filtering across subnets',
        'Real-time tracking views to monitor allocation and usage trends',
        'Administrative tooling for streamlined updates and audits'
      ],
      github: 'https://github.com/carlosj1999/ipaggregator',
      demoPath: '/ip_aggregator/',
      stars: 78
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
          {projects.map((project, index) => {
            const demoUrl = project.demoPath ? resolveBackendUrl(project.demoPath) : project.demo;

            return (
              <Card key={index} className="bg-gray-900 border-gray-700 overflow-hidden hover:border-blue-500 transition-colors group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
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
                    <a
                      href={demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
