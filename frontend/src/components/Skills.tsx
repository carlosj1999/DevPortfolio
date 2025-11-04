import { Card } from './ui/card';
import { Badge } from './ui/badge';
import AwsCertificate from '../assets/certifications/AWS.png';
import AzureCertificate from '../assets/certifications/Azure.png';
import PythonCertificate from '../assets/certifications/python_certificate.png';

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

  const certifications = [
    {
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      image: AwsCertificate
    },
    {
      title: 'Microsoft Certified: Azure Fundamentals',
      issuer: 'Microsoft',
      image: AzureCertificate
    },
    {
      title: 'Python Programming Certificate',
      issuer: 'Python Institute',
      image: PythonCertificate
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
        <div className="mt-16">
          <h3 className="text-2xl sm:text-3xl text-white text-center">Certifications</h3>
          <p className="mt-4 text-gray-400 text-center max-w-3xl mx-auto">
            Verified credentials that showcase cloud expertise and professional development across leading platforms.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((certification) => (
              <Card key={certification.title} className="bg-gray-800/80 border-gray-700 p-6 h-full flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-900/60 border border-gray-700 shadow-lg">
                  <img
                    src={certification.image}
                    alt={`${certification.title} certificate`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-white">{certification.title}</h4>
                  <p className="mt-2 text-sm text-gray-400">Issued by {certification.issuer}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
