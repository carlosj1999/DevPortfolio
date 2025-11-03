import { Navigation } from './src/components/Navigation';
import { Hero } from './src/components/Hero';
import { About } from './src/components/About';
import { Education } from './src/components/Education';
import { Experience } from './src/components/Experience';
import { Projects } from './src/components/Projects';
import { Skills } from './src/components/Skills';
import { Contact } from './src/components/Contact';
import { Footer } from './src/components/Footer';
import { ChatBot } from './src/components/ChatBot';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <Hero />
      <About />
      <Education />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
      <ChatBot />
    </div>
  );
}
