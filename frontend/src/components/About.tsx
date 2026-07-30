import { Code2, Database, Cloud, Smartphone } from 'lucide-react';
import { Card } from './ui/card';

export function About() {
  const highlights = [
    {
      icon: Code2,
      title: 'Full Stack Engineering',
      description: 'Crafting polished user experiences in React and Angular backed by robust Python APIs'
    },
    {
      icon: Database,
      title: 'Data & Performance',
      description: 'Designing relational models, tuning queries, and shipping reliable background jobs'
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      description: 'Automating delivery across Azure, AWS, and Dockerized environments with CI/CD best practices'
    },
    {
      icon: Smartphone,
      title: 'Native iOS Development',
      description: 'Building and shipping SwiftUI apps to the App Store, from StoreKit billing to on-device image processing'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl text-white mb-12 text-center">About Me</h2>
        
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-gray-300 text-center mb-6">
            I'm a full-stack software developer and certified cloud practitioner who builds and ships
            complete products — from multi-tenant SaaS platforms and rental marketplaces to a native
            iOS app on the App Store. I enjoy translating real business operations into software that
            people actually rely on day to day.
          </p>
          <p className="text-gray-300 text-center">
            From architecting Django backends and relational schemas to containerized deployments,
            hardened Linux servers, and SwiftUI interfaces, I own the whole stack and focus on
            end-to-end quality and measurable impact.
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
