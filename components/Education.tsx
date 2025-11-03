import { GraduationCap, Calendar } from 'lucide-react';
import { Card } from './ui/card';

export function Education() {
  const education = [
    {
      degree: 'Master of Science in Computer Science',
      school: 'Stanford University',
      location: 'Stanford, CA',
      period: '2018 - 2020',
      description: 'Specialized in Distributed Systems and Machine Learning. GPA: 3.9/4.0',
      achievements: [
        'Published research paper on microservices architecture',
        'Teaching Assistant for Advanced Algorithms course'
      ]
    },
    {
      degree: 'Bachelor of Science in Software Engineering',
      school: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      period: '2014 - 2018',
      description: 'Focus on Web Development and Software Architecture. GPA: 3.8/4.0',
      achievements: [
        'Dean\'s List all semesters',
        'Led development team for senior capstone project'
      ]
    }
  ];

  return (
    <section id="education" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl text-white mb-12 text-center">Education</h2>
        
        <div className="max-w-4xl mx-auto space-y-6">
          {education.map((edu, index) => (
            <Card key={index} className="bg-gray-900 border-gray-700 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                <div className="flex items-start mb-4 sm:mb-0">
                  <GraduationCap className="h-6 w-6 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white text-lg sm:text-xl mb-1">{edu.degree}</h3>
                    <p className="text-blue-400">{edu.school}</p>
                    <p className="text-gray-400 text-sm">{edu.location}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-400 text-sm sm:ml-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  {edu.period}
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">{edu.description}</p>
              
              <ul className="space-y-2">
                {edu.achievements.map((achievement, idx) => (
                  <li key={idx} className="text-gray-400 text-sm flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
