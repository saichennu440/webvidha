import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Portfolio() {
  const { t } = useLanguage();

const projects = [
  {
    title: 'FreshCuts',
    category: 'E-Commerce Platform',
    image: '/portfolio/freshcuts.png',
    tags: ['React', 'Node.js', 'MongoDB', 'Admin Dashboard'],
    link: 'https://fresh-cuts.vercel.app/',
  },
  {
    title: 'WahStays',
    category: 'Booking Web App',
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React', 'Booking System', 'Tailwind'],
    link: 'https://wahstays.vercel.app/',
  },
  {
    title: 'VOC Infra',
    category: 'IT Company Website',
    image: '/portfolio/vocinfra.png',
    tags: ['React', 'TypeScript', 'Animation', 'Vite'],
    link: 'https://vocinfra.com',
  },
  {
    title: 'Salient Learnings',
    category: 'EdTech Platform',
    image: '/portfolio/edutech.png',
    tags: ['React', 'Courses', 'AI & DeepTech', 'Tailwind'],
    link: 'https://salientlearnings.com/',
  },
  // {
  //   title: 'Scalers Business Agency',
  //   category: 'Business Agency Website',
  //   image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800',
  //   tags: ['React', 'TypeScript', 'Tailwind', 'MongoDB'],
  //   link: 'https://scalersbusinessagency.com',
  // },
  {
    title: 'Brow Crush',
    category: 'Beauty Studio Website',
    image: '/portfolio/browcrush.png',
    tags: ['React', 'Tailwind', 'Vercel', 'Animation'],
    link: 'https://brow-crush.vercel.app/',
  },
  {
    title: 'Aroma Spa',
    category: 'Spa & Wellness Website',
    image: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React', 'Tailwind', 'SEO', 'CMS'],
    link: 'https://aromaspa.in',
  },
  {
    title: 'Astroping',
    category: 'Astrology Website',
    image: '/portfolio/astroping.png',
    tags: ['React', 'Tailwind', 'Animation', 'Vite'],
    link: 'https://astroping.com',
  },
  {
    title: 'Oakland School',
    category: 'Education Website',
    image: 'https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React', 'Tailwind', 'SEO', 'CMS'],
    link: 'https://www.oaklandschool.in/',
  },
];

  return (
    <section id="portfolio" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            {t('portfolio_title')}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t('portfolio_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <button
                    onClick={() => window.open(project.link, '_blank')}
                   className="flex items-center gap-2 text-white font-semibold">
                    {t('portfolio_view')}
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="text-sm font-semibold text-blue-600 mb-2">
                  {project.category}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
