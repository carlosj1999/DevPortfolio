import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-6">
            <a
              href="https://github.com/carlosj1999"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/carlos-ibanez99"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:cjibanez1999@gmail.com"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          <div className="text-gray-400 text-sm flex items-center">
            <span>© {new Date().getFullYear()} Carlos Ibanez. Made with</span>
            <Heart className="h-4 w-4 mx-1 text-red-500 fill-red-500" />
            <span>passion for clean code</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
