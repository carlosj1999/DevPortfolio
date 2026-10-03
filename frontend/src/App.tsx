import { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Github,
  Linkedin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import DeskOnFire from "./assets/projects/deskonfire.webp";
import KendEvents from "./assets/projects/kendevents.jpg";
import StencilFit from "./assets/projects/stencilfit.webp";
import AlphaTools from "./assets/projects/alphatools.webp";
import YuniorInk from "./assets/projects/Yunior_ink.webp";
import BreakTaxGroup from "./assets/projects/breaktax.webp";
import VPPowerControl from "./assets/projects/vppowercontrol.webp";
import Shortener from "./assets/projects/URL-Shortener.webp";
import Privnote from "./assets/projects/privnote.webp";
import IPAggregator from "./assets/projects/ip_aggregator.webp";
import { ChatBot } from "./components/ChatBot";
import { resolveBackendUrl } from "./utils/backend";

const featuredProjects = [
  {
    name: "DeskOnFire",
    type: "Fire protection operations platform",
    image: DeskOnFire,
    href: "https://deskonfire.com",
    problem:
      "A life-safety business needs dispatch, inspections, field work, and closeout to agree.",
    build:
      "A multi-tenant Django workspace with live dispatch, technician sync, recurring NFPA plans, and billing-ready work orders.",
    result: "One operating view from the office to technicians in the field.",
    stack: "Python · Django · PostgreSQL · Docker",
  },
  {
    name: "KendEvents",
    type: "Event planning platform",
    image: KendEvents,
    href: "https://kendevents.com",
    problem:
      "Planning an event means coordinating inspiration, vendors, guests, and a growing list of details.",
    build:
      "Built together as a two-person team around a complete platform for vendor discovery, inspiration, checklists, budgets, guest lists, RSVPs, and timelines.",
    result:
      "A connected planning experience that keeps the whole event in view.",
    buildLabel: "Teamwork",
    stack: "Team collaboration · Web platform",
  },
  {
    name: "StencilFit",
    type: "iOS tattoo stencil studio",
    image: StencilFit,
    href: "https://apps.apple.com/us/app/stencilfit/id6786130344",
    problem:
      "Tattoo artists need stencil sheets to print at a true physical scale without sending artwork away.",
    build:
      "A universal SwiftUI app with an on-device Core Image pipeline, calibration, exact-size PDF export, and AirPrint.",
    result:
      "A shipped App Store app with StoreKit 2 subscriptions and 24 localizations.",
    stack: "Swift · SwiftUI · Core Image · PDFKit",
  },
];

const moreProjects = [
  {
    name: "Alpha Tools",
    type: "Heavy equipment rental platform",
    image: AlphaTools,
    imageFit: "contain",
    href: "https://alphatoolllc.com",
  },
  {
    name: "Yunior Ink",
    type: "Tattoo portfolio & booking",
    image: YuniorInk,
    href: "https://yunior.ink/",
  },
  {
    name: "Break Tax Group",
    type: "Tax & accounting website",
    image: BreakTaxGroup,
    href: "https://breaktaxgroup.com",
  },
  {
    name: "VP Power Control",
    type: "Low-voltage systems website",
    image: VPPowerControl,
    href: "https://www.vppowercontrol.com",
  },
  {
    name: "URL Shortener",
    type: "Secure link management",
    image: Shortener,
    href: "/shortener/",
    codeHref: "https://github.com/carlosj1999/URL-Shortener",
  },
  {
    name: "PrivNote",
    type: "Self-destructing notes",
    image: Privnote,
    href: "/privnote/",
    codeHref: "https://github.com/carlosj1999/Private-Note",
  },
  {
    name: "IPAggregator",
    type: "Network management dashboard",
    image: IPAggregator,
    href: "/ip_aggregator/",
    codeHref: "https://github.com/carlosj1999/ip_aggregator",
  },
];

const navItems = ["Work", "About", "Contact"];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const heroCardY = useTransform(scrollY, [0, 800], [0, -50]);
  const heroPreviewY = useTransform(scrollY, [0, 800], [0, -80]);
  const heroPreviewRotate = useTransform(scrollY, [0, 800], [-5, 1]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const closeMenu = () => setMenuOpen(false);
  return (
    <div className="portfolio-shell">
      {!shouldReduceMotion && (
        <motion.div
          className="scroll-progress"
          style={{ scaleX: scrollYProgress }}
          aria-hidden="true"
        />
      )}
      <a className="skip-link" href="#work">
        Skip to work
      </a>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a
          className="wordmark"
          href="#top"
          onClick={closeMenu}
          aria-label="Carlos Ibanez home"
        >
          CI<span>.</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
          <a className="nav-contact" href="mailto:cjibanez1999@gmail.com">
            Start a conversation <ArrowUpRight aria-hidden="true" />
          </a>
        </nav>
        <button
          className="menu-button"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>
                {item}
              </a>
            ))}
            <a href="mailto:cjibanez1999@gmail.com" onClick={closeMenu}>
              Start a conversation <ArrowUpRight aria-hidden="true" />
            </a>
          </nav>
        )}
      </header>
      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <motion.div
            className="hero-copy"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="eyebrow">Carlos Ibanez · Miami, Florida</p>
            <h1 id="hero-title">
              Software for
              <br />
              <em>real work.</em>
            </h1>
            <p className="hero-intro">
              I build complete products for teams with real operations—from a
              field-service SaaS to an App Store stencil studio.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                Explore selected work <ArrowDownRight aria-hidden="true" />
              </a>
              <a
                className="text-link"
                href="https://docs.google.com/document/d/1F4YGXp6yZ3dmEHLujkwrZHrzlRLzLqfB7owMsMH5wrw/preview"
                target="_blank"
                rel="noopener noreferrer"
              >
                View résumé <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </motion.div>
          <motion.div
            className="hero-visual"
            style={shouldReduceMotion ? { y: 0 } : { y: heroCardY }}
          >
            <p>
              Selected work
              <br />
              Web + native iOS
            </p>
            <motion.img
              src={DeskOnFire}
              alt="DeskOnFire operations dashboard"
              fetchPriority="high"
              style={
                shouldReduceMotion
                  ? { y: 0, rotate: -5 }
                  : { y: heroPreviewY, rotate: heroPreviewRotate }
              }
            />
          </motion.div>
        </section>
        <section
          id="work"
          className="work-section"
          aria-labelledby="work-title"
        >
          <motion.div
            className="section-heading"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p className="eyebrow">01 / Selected work</p>
            <h2 id="work-title">
              Built for the work that happens after launch.
            </h2>
          </motion.div>
          <div className="feature-list">
            {featuredProjects.map((project, index) => (
              <motion.article
                className="feature-project"
                key={project.name}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                animate={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.06,
                  ease: "easeOut",
                }}
              >
                <div className="project-number">0{index + 1}</div>
                <div className="project-image">
                  <img
                    src={project.image}
                    alt={`Screenshot of ${project.name}`}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
                <div className="project-body">
                  <p className="project-type">{project.type}</p>
                  <h3>{project.name}</h3>
                  <dl className="case-study">
                    <div>
                      <dt>Problem</dt>
                      <dd>{project.problem}</dd>
                    </div>
                    <div>
                      <dt>{project.buildLabel ?? "Built"}</dt>
                      <dd>{project.build}</dd>
                    </div>
                    <div>
                      <dt>Result</dt>
                      <dd>{project.result}</dd>
                    </div>
                  </dl>
                  <div className="project-footer">
                    <p>{project.stack}</p>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit project <ArrowUpRight aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
        <section className="other-work" aria-labelledby="other-work-title">
          <motion.div
            className="section-heading compact"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p className="eyebrow">More shipped work</p>
            <h2 id="other-work-title">
              A few more ways I’ve helped businesses show up and operate.
            </h2>
          </motion.div>
          <div className="project-grid">
            {moreProjects.map((project) => (
              <article
                className={`mini-project${project.imageFit ? ` image-${project.imageFit}` : ""}`}
                key={project.name}
              >
                <a
                  className="mini-project-main"
                  href={
                    project.href.startsWith("/")
                      ? resolveBackendUrl(project.href)
                      : project.href
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={project.image}
                    alt={`Screenshot of ${project.name}`}
                    loading="lazy"
                  />
                  <span>
                    <strong>{project.name}</strong>
                    <small>{project.type}</small>
                  </span>
                  <ArrowUpRight aria-hidden="true" />
                </a>
                {project.codeHref && (
                  <a
                    className="code-link"
                    href={project.codeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Code <ArrowUpRight aria-hidden="true" />
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>
        <section
          id="about"
          className="about-section"
          aria-labelledby="about-title"
        >
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p className="eyebrow">02 / About</p>
            <h2 id="about-title">I care about the whole system.</h2>
          </motion.div>
          <motion.div
            className="about-copy"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
          >
            <p>
              I’m a full-stack developer who takes a product from its data model
              and API through its interface, infrastructure, and release. The
              thread in my work is simple: make the hard parts of a business
              feel straightforward to use.
            </p>
            <div className="capabilities">
              <span>Python & Django</span>
              <span>React & SwiftUI</span>
              <span>PostgreSQL & APIs</span>
              <span>Cloud & Docker</span>
            </div>
            <div className="credentials">
              <p>
                <strong>Experience</strong> Oliphant USA · TrueIT LLC · Florida
                International University
              </p>
              <p>
                <strong>Education</strong> B.S. Computer Science, Cum Laude ·
                Florida International University, 2024
              </p>
              <p>
                <strong>Certified</strong> AWS Cloud Practitioner · Microsoft
                Azure Fundamentals
              </p>
            </div>
          </motion.div>
        </section>
        <section
          id="contact"
          className="contact-section"
          aria-labelledby="contact-title"
        >
          <motion.p
            className="eyebrow"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            03 / Contact
          </motion.p>
          <motion.h2
            id="contact-title"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            animate={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
          >
            Have a product
            <br />
            worth building?
          </motion.h2>
          <motion.a
            className="contact-email"
            href="mailto:cjibanez1999@gmail.com"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.14, ease: "easeOut" }}
          >
            cjibanez1999@gmail.com <ArrowUpRight aria-hidden="true" />
          </motion.a>
          <div className="contact-links">
            <a
              href="https://github.com/carlosj1999"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github aria-hidden="true" /> GitHub
            </a>
            <a
              href="https://linkedin.com/in/carlos-ibanez99"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin aria-hidden="true" /> LinkedIn
            </a>
            <a href="tel:+17865375524">
              <Phone aria-hidden="true" /> +1 (786) 537-5524
            </a>
          </div>
        </section>
      </main>
      <footer>
        © {new Date().getFullYear()} Carlos Ibanez{" "}
        <span>Designed and built with care.</span>
      </footer>
      <ChatBot />
    </div>
  );
}
