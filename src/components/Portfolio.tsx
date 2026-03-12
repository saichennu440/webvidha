import { useState, useRef, useEffect } from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const projects = [

  {
    title: 'WahStays',
    category: 'Booking App',
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React', 'Booking System', 'Tailwind'],
    link: 'https://wahstays.vercel.app/',
    description: 'Hotel and stay booking web app with real-time availability and smooth UX.',
    year: '2024',
  },
  {
    title: 'VOC Infra',
    category: 'Corporate',
    image: '/portfolio/vocinfra.png',
    tags: ['React', 'TypeScript', 'Animation', 'Vite'],
    link: 'https://vocinfra.com',
    description: 'High-performance IT company site with custom animations and fast load times.',
    year: '2024',
  },
  {
    title: 'Salient Learnings',
    category: 'EdTech',
    image: '/portfolio/edutech.png',
    tags: ['React', 'Courses', 'AI & DeepTech', 'Tailwind'],
    link: 'https://salientlearnings.com/',
    description: 'EdTech platform offering AI and deep-tech courses with structured learning paths.',
    year: '2024',
  },
  {
    title: 'Brow Crush',
    category: 'Beauty & Lifestyle',
    image: '/portfolio/browcrush.png',
    tags: ['React', 'Tailwind', 'Vercel', 'Animation'],
    link: 'https://brow-crush.vercel.app/',
    description: 'Elegant beauty studio website with smooth transitions and booking flow.',
    year: '2024',
  },
  {
    title: 'Aroma Spa',
    category: 'Beauty & Lifestyle',
    image: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React', 'Tailwind', 'SEO', 'CMS'],
    link: 'https://aromaspa.in',
    description: 'Spa & wellness website with CMS integration and strong local SEO setup.',
    year: '2024',
  },
  {
    title: 'Astroping',
    category: 'Corporate',
    image: '/portfolio/astroping.png',
    tags: ['React', 'Tailwind', 'Animation', 'Vite'],
    link: 'https://astroping.com',
    description: 'Astrology platform with engaging animations and a vibrant visual identity.',
    year: '2024',
  },
  {
    title: 'Oakland School',
    category: 'EdTech',
    image: 'https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React', 'Tailwind', 'SEO', 'CMS'],
    link: 'https://www.oaklandschool.in/',
    description: 'School website with admissions, events, and CMS-managed content pages.',
    year: '2024',
  },
    {
    title: 'FreshCuts',
    category: 'E-Commerce',
    image: '/portfolio/freshcuts.png',
    tags: ['React', 'Node.js', 'MongoDB', 'Admin Dashboard'],
    link: 'https://fresh-cuts.vercel.app/',
    description: 'Full-stack e-commerce platform with inventory management and admin dashboard.',
    year: '2024',
  },
];

const ALL_FILTERS = ['All', 'E-Commerce', 'Booking App', 'Corporate', 'EdTech', 'Beauty & Lifestyle'];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.5s ease ${index * 0.07}s, transform 0.5s ease ${index * 0.07}s`,
      }}
    >
      <div
        onClick={() => window.open(project.link, '_blank')}
        tabIndex={0}
        role="link"
        onKeyDown={e => e.key === 'Enter' && window.open(project.link, '_blank')}
        aria-label={`Open ${project.title}`}
        className="portfolio-card group bg-white rounded-2xl overflow-hidden flex flex-col h-full"
        style={{ cursor: 'pointer' }}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/10', flexShrink: 0 }}>
          <img
            src={project.image}
            alt={project.title}
            className="portfolio-card-img w-full h-full object-cover"
          />

          {/* Dark overlay on hover */}
          <div className="portfolio-card-overlay absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(8,18,36,0.78) 0%, rgba(8,18,36,0.08) 55%, transparent 100%)' }}
          />

          {/* Top badges */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(0,0,0,0.42)', color: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(4px)' }}>
            {project.year}
          </div>
          <div className="portfolio-card-arrow absolute top-3 right-3 rounded-full p-1.5 shadow-md"
            style={{ background: 'rgba(255,255,255,0.92)' }}>
            <ArrowUpRight size={14} style={{ color: '#2563eb' }} />
          </div>
        </div>

        {/* Slide-in accent line */}
        <div className="portfolio-card-line" style={{ height: '2px', background: 'linear-gradient(90deg,#1d4ed8,#60a5fa)', width: 0 }} />

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#2563eb' }}>
              {project.category}
            </span>
            <ExternalLink size={12} className="portfolio-card-exticon flex-shrink-0 mt-0.5" style={{ color: '#cbd5e1', transition: 'color 0.2s' }} />
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
            {project.title}
          </h3>

          <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="portfolio-card-tag px-2.5 py-1 text-xs rounded-full font-medium"
                style={{ background: '#f1f5f9', color: '#475569' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 bg-slate-50">
      <style>{`
        .portfolio-card {
          box-shadow: 0 2px 14px rgba(0,0,0,0.07);
          transition: box-shadow 0.35s ease, transform 0.35s ease;
        }
        .portfolio-card:hover {
          box-shadow: 0 18px 50px rgba(0,0,0,0.13);
          transform: translateY(-5px);
        }
        .portfolio-card-img {
          transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .portfolio-card:hover .portfolio-card-img {
          transform: scale(1.07);
        }
        .portfolio-card-overlay {
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .portfolio-card:hover .portfolio-card-overlay {
          opacity: 1;
        }
        .portfolio-card-arrow {
          opacity: 0;
          transform: translate(-3px, 3px) scale(0.85);
          transition: opacity 0.28s ease, transform 0.28s ease;
        }
        .portfolio-card:hover .portfolio-card-arrow {
          opacity: 1;
          transform: translate(0,0) scale(1);
        }
        .portfolio-card-line {
          transition: width 0.4s ease;
        }
        .portfolio-card:hover .portfolio-card-line {
          width: 100%;
        }
        .portfolio-card:hover .portfolio-card-exticon {
          color: #3b82f6 !important;
        }
        .portfolio-card:hover .portfolio-card-tag {
          background: #eff6ff !important;
          color: #1d4ed8 !important;
        }
        .portfolio-filter-btn {
          transition: all 0.22s ease;
        }
        .portfolio-filter-btn:hover {
          transform: translateY(-1px);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            {t('portfolio_title')}
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            {t('portfolio_subtitle')}
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {ALL_FILTERS.map(f => {
            const count = f === 'All' ? projects.length : projects.filter(p => p.category === f).length;
            const isActive = activeFilter === f;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="portfolio-filter-btn px-4 py-2 rounded-full text-sm font-semibold"
                style={
                  isActive
                    ? {
                        background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
                        color: 'white',
                        boxShadow: '0 4px 16px rgba(59,130,246,0.38)',
                        border: '1px solid transparent',
                      }
                    : {
                        background: 'white',
                        color: '#64748b',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                      }
                }
              >
                {f}
                {f !== 'All' && (
                  <span className="ml-1.5 text-xs" style={{ opacity: 0.6 }}>{count}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Cards grid — re-mounts on filter change to retrigger fade-in */}
        <div key={activeFilter} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-sm text-slate-400 mb-4">Got a project in mind? Let's build it.</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white"
            style={{
              background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
              boxShadow: '0 4px 20px rgba(59,130,246,0.3)',
              transition: 'box-shadow 0.3s ease, transform 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(59,130,246,0.5)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(59,130,246,0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Start Your Project <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}