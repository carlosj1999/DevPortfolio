import { Card } from './ui/card';
import { Badge } from './ui/badge';

export function Skills() {
  const skillCategories = [
    {
      category: 'Languages & Frameworks',
      skills: ['Python', 'Java', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Django', 'Flask', 'React', 'Angular']
    },
    {
      category: 'Web & Data Engineering',
      skills: ['REST APIs', 'GraphQL', 'PostgreSQL', 'MySQL', 'Redis', 'Celery', 'Docker Compose', 'Unit & Integration Testing']
    },
    {
      category: 'Cloud & Infrastructure',
      skills: ['AWS (EC2, S3, Lambda, RDS, QuickSight)', 'Microsoft Azure', 'DigitalOcean', 'Terraform', 'Nginx', 'Linux (Ubuntu, CentOS, AlmaLinux)', 'Windows Server']
    },
    {
      category: 'Collaboration & Tooling',
      skills: ['Git', 'GitHub', 'Bitbucket', 'CI/CD Pipelines', 'Docker', 'Agile & Scrum', 'Monitoring & Logging', 'Problem Solving', 'Team Leadership']
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl text-white mb-12 text-center">Technical Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {skillCategories.map((category, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700 p-6">
              <h3 className="text-white text-xl mb-4">{category.category}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, idx) => (
                  <Badge 
                    key={idx} 
                    variant="secondary" 
                    className="bg-gray-700 text-gray-200 hover:bg-blue-600 hover:text-white transition-colors cursor-default"
                  >
                    {skill}
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
