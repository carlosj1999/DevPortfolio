import { Briefcase, Calendar } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export function Experience() {
  const experiences = [
    {
      title: 'Full Stack Developer',
      company: 'Oliphant USA',
      location: 'Miami, FL',
      period: 'Jan 2025 - Oct 2025',
      description:
        'Delivered end-to-end web applications with scalable Python backends, modern front-end experiences, and production-ready DevOps pipelines.',
      responsibilities: [
        'Designed REST APIs in Django and Flask with robust authentication and documentation',
        'Modeled relational data in PostgreSQL, optimized queries, and introduced Redis caching + queues',
        'Implemented Celery-powered background jobs to offload intensive workloads and improve response times',
        'Shipped feature-rich React interfaces to maintain parity between API capabilities and UI flows',
        'Containerized services with Docker/Docker Compose and automated CI/CD for testing, linting, and deployments',
        'Configured Azure infrastructure—secrets, monitoring, logging, and health checks—to support resilient releases'
      ],
      technologies: [
        'Python',
        'Django',
        'Flask',
        'React',
        'PostgreSQL',
        'Celery',
        'Docker',
        'Azure',
      ]
    },
    {
      title: 'Python Developer',
      company: 'TrueIT LLC',
      location: 'Miami, FL',
      period: 'Feb 2022 - Jan 2025',
      description:
        'Engineered automation and integration solutions across AWS-backed environments while maintaining high availability systems.',
      responsibilities: [
        'Leveraged open-source Python frameworks to streamline internal tooling and client deliverables',
        'Integrated AWS services into development workflows, improving observability and deployment speed',
        'Administered Linux servers, automated deployments, and resolved networking issues to cut downtime by 20%',
        'Collaborated with stakeholders to prioritize features, triage incidents, and deliver timely hotfixes'
      ],
      technologies: ['Python', 'Django', 'AWS', 'Linux', 'Docker']
    },
    {
      title: 'Life and Safety Mechanic II',
      company: 'Florida International University',
      location: 'Miami, FL',
      period: 'Oct 2021 - Dec 2024',
      description:
        'Supported university research facilities by maintaining critical life safety systems and coordinating technical interventions.',
      responsibilities: [
        'Diagnosed and repaired safety equipment ensuring compliance with rigorous operational standards',
        'Partnered with cross-functional teams to safeguard uptime for research activities and campus operations',
        'Documented procedures and preventative maintenance plans to enhance reliability and knowledge transfer'
      ],
      technologies: ['Problem Solving', 'Teamwork', 'Process Improvement', 'Fire Alarm Systems']
    },
    {
      title: 'Data Engineering & Analytics Intern',
      company: 'Belle Fleur Technologies',
      location: 'Miami, FL',
      period: 'Apr 2021 - Aug 2021',
      description:
        'Supported data teams with cloud-enabled analytics, reporting automation, and database administration.',
      responsibilities: [
        'Developed and managed MySQL schemas to streamline ingestion, storage, and retrieval workflows',
        'Built dashboards in AWS QuickSight, reducing stakeholder reporting time by 30%',
        'Partnered with analysts to uncover data patterns and deliver actionable insights for customers'
      ],
      technologies: ['AWS', 'MySQL', 'Data Analysis', 'Python']
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl text-white mb-12 text-center">Work Experience</h2>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                <div className="flex items-start mb-4 sm:mb-0">
                  <Briefcase className="h-6 w-6 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white text-lg sm:text-xl mb-1">{exp.title}</h3>
                    <p className="text-blue-400">{exp.company}</p>
                    <p className="text-gray-400 text-sm">{exp.location}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-400 text-sm sm:ml-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  {exp.period}
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">{exp.description}</p>
              
              <ul className="space-y-2 mb-6">
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx} className="text-gray-400 text-sm flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    {resp}
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-gray-700 text-gray-200 hover:bg-gray-600">
                    {tech}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
