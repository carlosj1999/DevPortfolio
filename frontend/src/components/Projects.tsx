import { Apple, ExternalLink, Github } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import IPAgregator from '../assets/projects/ip_aggregator.webp';
import Privnote from '../assets/projects/privnote.webp';
import Shortener from '../assets/projects/URL-Shortener.webp';
import YuniorInk from '../assets/projects/Yunior_ink.webp';
import BreakTaxGroup from '../assets/projects/breaktax.webp';
import VPPowerControl from '../assets/projects/vppowercontrol.webp';
import AlphaTools from '../assets/projects/alphatools.webp';
import DeskOnFire from '../assets/projects/deskonfire.webp';
import StencilFit from '../assets/projects/stencilfit.webp';
import { resolveBackendUrl } from '../utils/backend';

type Project = {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  features: string[];
  github?: string;
  githubPrivate?: boolean;
  demo?: string;
  demoPath?: string;
  /** Overrides the "Demo" button label, e.g. "App Store" for a shipped app. */
  demoLabel?: string;
  /** Renders the Apple mark instead of the external-link icon. */
  demoIcon?: 'apple';
};

export function Projects() {
  const projects: Project[] = [
    {
      title: 'DeskOnFire — Fire Protection Operations Platform',
      description:
        'Multi-tenant SaaS that runs a fire alarm and life-safety business end to end: dispatch, NFPA inspections, technicians, and billing-ready closeout in one workspace.',
      image: DeskOnFire,
      technologies: ['Python', 'Django', 'PostgreSQL', 'Docker', 'Tailwind CSS', 'Nginx'],
      features: [
        'Live dispatch board with one-click reassign, emergency prioritization, and instant technician sync',
        'Technician portal capturing time, photos, deficiencies, and signatures from any device in the field',
        'Tenant-isolated workspaces with recurring NFPA service plans and billing-ready work order closeout'
      ],
      githubPrivate: true,
      demo: 'https://deskonfire.com',
    },
    {
      title: 'StencilFit — iOS Tattoo Stencil Studio',
      description:
        'Universal iPhone and iPad app for tattoo artists, published on the App Store. Lays out and prints stencil sheets at exact physical scale, entirely on-device.',
      image: StencilFit,
      technologies: ['Swift', 'SwiftUI', 'Core Image', 'PDFKit', 'StoreKit 2', 'XCTest'],
      features: [
        'Exact-size PDF and AirPrint export (72pt = 1in) with guided printer calibration for true-to-scale output',
        'On-device Core Image stencil pipeline — threshold, contrast, and background removal with no data leaving the phone',
        'Shipped with StoreKit 2 subscriptions, a unit-tested layout engine, and 24 localizations including full RTL'
      ],
      githubPrivate: true,
      demo: 'https://apps.apple.com/us/app/stencilfit/id6786130344',
      demoLabel: 'App Store',
      demoIcon: 'apple',
    },
    {
      title: 'Alpha Tools — Heavy Equipment Rental',
      description:
        'Rental platform for an industrial equipment company, covering fleet browsing, availability checks, quote requests, and payment-integrated request tracking.',
      image: AlphaTools,
      technologies: ['Python', 'Django', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'Stripe'],
      features: [
        'Searchable equipment catalog with per-machine specs and real-time availability by date',
        'Quote and booking flow with integrated payments — no account required to rent',
        'Secure Request ID tracking so customers can follow an order from quote to on-site delivery'
      ],
      githubPrivate: true,
      demo: 'https://alphatoolllc.com',
    },
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
      githubPrivate: true, 
      demo: 'https://yunior.ink/',
    },
    {
      title: 'Break Tax Group — Tax & Accounting Website',
      description:
        'Responsive marketing and lead-generation site for a tax and accounting firm, focused on clear service communication, SEO, and frictionless client onboarding.',
      image: BreakTaxGroup,
      technologies: ['React', 'Docker', 'Vite', 'Tailwind CSS', 'Node.js', 'Brevo API', 'Calendly'],
      features: [
        'Pure React front end implemented from a Figma design system for consistent branding and layout',
        'Integrated Brevo-powered contact flows for secure inquiries, automated email responses, and lead capture',
        'Embedded Calendly booking experiences for self-service appointment scheduling and calendar coordination'
      ],
      githubPrivate: true,
      demo: 'https://breaktaxgroup.com',
    },
    {
      title: 'VP Power Control — Low Voltage Systems Website',
      description:
        'Marketing website for a low voltage contractor, built from a Figma design with fast load times, clear service storytelling, and lead capture.',
      image: VPPowerControl,
      technologies: ['Python', 'Django', 'HTML', 'CSS', 'JavaScript'],
      features: [
        'Figma-to-code implementation with modular Django templates and static assets',
        'Service sections, project highlights, and CTA placement optimized for conversions',
        'Responsive layout with performance-focused assets and semantic markup'
      ],
      githubPrivate: true,
      demo: 'https://www.vppowercontrol.com',
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
      github: 'https://github.com/carlosj1999/URL-Shortener',
      demoPath: '/shortener/',
    },
    {
      title: 'PrivNote — Self-Destructing Notes',
      description:
        'Private note-sharing app built around expiring, one-time-view links for sensitive communication.',
      image: Privnote,
      technologies: ['Python', 'Django', 'Ubuntu', 'AlmaLinux', 'CSS'],
      features: [
        'Self-destructing notes with configurable expiration policies',
        'One-time access links to ensure confidentiality for recipients',
        'Hardened deployment with Linux administration best practices'
      ],
      github: 'https://github.com/carlosj1999/Private-Note',
      demoPath: '/privnote/',
    },
    {
      title: 'IPAggregator — Network Management',
      description:
        'Operational dashboard for aggregating and tracking IP address allocations across enterprise environments.',
      image: IPAgregator,
      technologies: ['Python', 'Django', 'PostgreSQL', 'Tailwind CSS'],
      features: [
        'Aggregated IP inventory with search and filtering across subnets',
        'Real-time tracking views to monitor allocation and usage trends',
        'Administrative tooling for streamlined updates and audits'
      ],
      github: 'https://github.com/carlosj1999/ip_aggregator',
      demoPath: '/ip_aggregator/',
    }
  ];

   const handlePrivateGithubClick = (title: string) => {
    window.alert(
      `The Code for "${title}" is private and cannot be shared 🙁`
    );
  };

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
                    alt={`Screenshot of ${project.title}`}
                    width={1200}
                    height={750}
                    loading={index < 3 ? 'eager' : 'lazy'}
                    decoding="async"
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
                    {/* GitHub button */}
                    {project.githubPrivate ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                        type="button"
                        onClick={() => handlePrivateGithubClick(project.title)}
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Private
                      </Button>
                    ) : (
                      project.github && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                          asChild
                        >
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      )
                    )}
                    
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
                      {project.demoIcon === 'apple' ? (
                        <Apple className="h-4 w-4 mr-2" />
                      ) : (
                        <ExternalLink className="h-4 w-4 mr-2" />
                      )}
                      {project.demoLabel ?? 'Demo'}
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
