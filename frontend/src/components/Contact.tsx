import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

const EMAIL = 'cjibanez1999@gmail.com';
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Let's work together"
)}&body=${encodeURIComponent(
  "Hi Carlos,\n\nI came across your portfolio and I'd like to talk about\n\n"
)}`;

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl text-white mb-4 text-center">Get In Touch</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Send me an email and I'll get back to
          you within a day or two.
        </p>

        <div className="max-w-3xl mx-auto">
          {/* Primary call to action */}
          <Card className="bg-gray-900 border-gray-700 p-8 sm:p-10 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600/15">
              <Mail className="h-7 w-7 text-blue-400" />
            </div>
            <h3 className="text-white text-xl mb-2">Let's talk</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              The fastest way to reach me is email — one click opens your mail app with a
              message ready to go.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-500" asChild>
                <a href={MAILTO}>
                  <Mail className="mr-2 h-4 w-4" />
                  Email Me
                </a>
              </Button>
              <Button
                variant="outline"
                className="!bg-transparent !text-white !border-white/40 hover:!bg-white/10 hover:!border-white hover:!text-white"
                asChild
              >
                <a href="tel:+17865375524">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Me
                </a>
              </Button>
            </div>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-6 inline-block text-sm text-gray-500 hover:text-blue-400 transition-colors"
            >
              {EMAIL}
            </a>
          </Card>

          {/* Supporting details */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-gray-900 border-gray-700 p-5">
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white text-sm mb-1">Phone</h4>
                  <a
                    href="tel:+17865375524"
                    className="text-gray-400 text-sm hover:text-blue-400 transition-colors"
                  >
                    +1 (786) 537-5524
                  </a>
                </div>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-700 p-5">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white text-sm mb-1">Location</h4>
                  <p className="text-gray-400 text-sm">Miami, FL, USA</p>
                </div>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-700 p-5">
              <div className="flex items-start">
                <Linkedin className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white text-sm mb-1">Elsewhere</h4>
                  <div className="flex gap-3 mt-1">
                    <a
                      href="https://linkedin.com/in/carlos-ibanez99"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                      aria-label="LinkedIn profile"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href="https://github.com/carlosj1999"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                      aria-label="GitHub profile"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
