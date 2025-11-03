import { GraduationCap, Calendar } from 'lucide-react';
import { Card } from './ui/card';

export function Education() {
  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "Florida International University",
      location: "Miami, FL",
      period: "Jul 2022 - Jul 2024",
      description:
        "Graduated Cum Laude with a 3.64 GPA while completing advanced coursework in algorithms, AI, and software engineering.",
      achievements: [
        "Honors: Cum Laude distinction",
        "Team project: built a campus presence verification app for physical class check-ins",
        "Focused studies in Data Structures, Logic for CS, and Algorithm Design"
      ]
    },
    {
      degree: "Junior Cloud Practitioner Program",
      school: "Generation USA",
      location: "Miami, FL",
      period: "Nov 2020 - Mar 2021",
      description:
        "Immersive training covering Linux administration, Python, Terraform, DevOps fundamentals, and AWS cloud services.",
      achievements: [
        "Capstone: deployed a scalable web application on AWS using Terraform and Docker",
        "Hands-on experience with automation, monitoring, and cloud-first delivery",
        "Collaborated with cross-functional cohorts to ship production-ready solutions"
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
