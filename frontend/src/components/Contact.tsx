import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl text-white mb-4 text-center">Get In Touch</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out!
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-700 p-6">
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-blue-400 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-white mb-1">Email</h3>
                  <a href="mailto:cjibanez1999@gmail.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                    cjibanez1999@gmail.com
                  </a>
                </div>
              </div>
            </Card>
            
            <Card className="bg-gray-900 border-gray-700 p-6">
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-blue-400 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-white mb-1">Phone</h3>
                  <a href="tel:+17865375524" className="text-gray-400 hover:text-blue-400 transition-colors">
                    +1 (786) 537-5524
                  </a>
                </div>
              </div>
            </Card>
            
            <Card className="bg-gray-900 border-gray-700 p-6">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-blue-400 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-white mb-1">Location</h3>
                  <p className="text-gray-400">Miami, FL, USA</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="bg-gray-900 border-gray-700 p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="text-white mb-2 block text-sm">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="text-white mb-2 block text-sm">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="text-white mb-2 block text-sm">
                  Message
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 min-h-[150px]"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>
              
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
