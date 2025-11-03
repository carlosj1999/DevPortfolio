import { Briefcase, Calendar } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export function Experience() {
  const experiences = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovations Inc.',
      location: 'San Francisco, CA',
      period: '2022 - Present',
      description: 'Leading development of cloud-based SaaS platform serving 100K+ users.',
      responsibilities: [
        'Architected and implemented microservices infrastructure using Node.js and Docker',
        'Led team of 5 developers, conducting code reviews and mentoring junior developers',
        'Improved application performance by 40% through optimization and caching strategies',
        'Implemented CI/CD pipelines reducing deployment time by 60%'
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes']
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Solutions Corp.',
      location: 'Los Angeles, CA',
      period: '2020 - 2022',
      description: 'Developed and maintained multiple client-facing web applications.',
      responsibilities: [
        'Built responsive web applications using React and Vue.js',
        'Designed and implemented RESTful APIs with Express.js and MongoDB',
        'Collaborated with UX designers to implement pixel-perfect designs',
        'Reduced page load times by 50% through code splitting and lazy loading'
      ],
      technologies: ['Vue.js', 'React', 'Express', 'MongoDB', 'Redis', 'GraphQL']
    },
    {
      title: 'Junior Software Developer',
      company: 'StartUp Ventures',
      location: 'San Jose, CA',
      period: '2018 - 2020',
      description: 'Contributed to the development of e-commerce platform and mobile applications.',
      responsibilities: [
        'Developed new features for e-commerce platform using React and Django',
        'Implemented payment integration with Stripe and PayPal',
        'Wrote unit and integration tests achieving 85% code coverage',
        'Participated in agile development process and sprint planning'
      ],
      technologies: ['React', 'Django', 'Python', 'MySQL', 'Jest', 'Git']
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
