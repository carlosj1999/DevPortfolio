import { Code2, Database, Cloud, Smartphone } from 'lucide-react';
import { Card } from './ui/card';

export function About() {
  const highlights = [
    {
      icon: Code2,
      title: 'Frontend Development',
      description: 'Expert in React, Vue, and modern JavaScript frameworks'
    },
    {
      icon: Database,
      title: 'Backend Development',
      description: 'Proficient in Node.js, Python, and database design'
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      description: 'Experience with AWS, Docker, and CI/CD pipelines'
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'Building responsive and native mobile applications'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl text-white mb-12 text-center">About Me</h2>
        
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-gray-300 text-center mb-6">
            I'm a passionate full-stack developer with over 5 years of experience building web applications.
            I love turning complex problems into simple, beautiful, and intuitive solutions.
          </p>
          <p className="text-gray-300 text-center">
            When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects,
            or sharing my knowledge through technical writing and mentoring.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700 p-6 hover:bg-gray-750 transition-colors">
              <item.icon className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
