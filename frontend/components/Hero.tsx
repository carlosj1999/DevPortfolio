import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { Button } from './ui/button';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920')] bg-cover bg-center opacity-10"></div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4">
            John Doe
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-blue-400 mb-6">
            Full Stack Developer
          </p>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Passionate about building scalable web applications with modern technologies.
            Specialized in React, Node.js, and cloud architecture.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Mail className="mr-2 h-4 w-4" />
            Contact Me
          </Button>
          <Button variant="outline" className="!text-white !border-white/60 hover:!bg-white/10 hover:!border-white hover:!text-white text-[14px]">
            <Download className="mr-2 h-4 w-4" />
            Download CV
          </Button>
        </div>
        
        <div className="flex gap-6 justify-center">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <Github className="h-6 w-6" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <Linkedin className="h-6 w-6" />
          </a>
          <a href="mailto:john@example.com" className="text-gray-400 hover:text-white transition-colors">
            <Mail className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
