import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { Button } from './ui/button';

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800/80 to-gray-900" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute -bottom-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/40 blur-3xl" />
      <div className="absolute -top-24 left-16 h-48 w-48 rounded-full bg-blue-400/30 blur-2xl" />
      <div className="absolute -top-32 right-16 h-64 w-64 rounded-full bg-purple-500/30 blur-3xl" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-semibold tracking-tight">
            Carlos Ibanez
          </h1>
          <p className="mt-4 text-xl sm:text-2xl md:text-3xl text-blue-300">
            Full Stack Developer · Cloud Practitioner · Problem Solver
          </p>
          <p className="mt-6 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            Miami-based engineer crafting performant web applications, resilient APIs, and cloud-native
            infrastructure with Python, Django, Flask, and modern JavaScript frameworks.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <Button className="bg-blue-600 hover:bg-blue-500 shadow-glow shadow-blue-500/40" asChild>
            <a href="#contact">
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </a>
          </Button>
          <Button
            variant="outline"
            className="
              !bg-transparent 
              !text-white 
              !border-white/70 
              hover:!bg-white/10 
              hover:!border-white 
              hover:!text-white 
              text-[14px]
            "
            asChild
          >
            <a href="https://docs.google.com/document/d/1F4YGXp6yZ3dmEHLujkwrZHrzlRLzLqfB7owMsMH5wrw/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-4 w-4" />
              View Resume
            </a>
          </Button>

        </div>

        <div className="flex gap-6 justify-center text-gray-400">
          <a
            href="https://github.com/carlosj1999"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <Github className="h-6 w-6" aria-hidden="true" />
          </a>
          <a
            href="https://linkedin.com/in/carlos-ibanez99"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <Linkedin className="h-6 w-6" aria-hidden="true" />
          </a>
          <a href="mailto:cjibanez1999@gmail.com" className="hover:text-white transition-colors">
            <Mail className="h-6 w-6" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
