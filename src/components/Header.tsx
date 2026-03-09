import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Header() {
  const { language, toggleLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: t('nav_home'), action: scrollToTop },
    { label: t('nav_services'), id: 'services' },
    { label: t('nav_portfolio'), id: 'portfolio' },
    { label: t('nav_pricing'), id: 'pricing' },
    { label: t('nav_contact'), id: 'contact' },
  ];
  const logo1 = isScrolled ? '/webvidha-high-resolution-logo-grayscale-transparent.png' : '/webvidha-high-resolution-logo-transparent.png';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 group"
          >
            <img
              src={logo1}
              alt="Logo"
              className={`w-18 h-9 transition-transform duration-300 ${
                isScrolled ? 'group-hover:scale-110' : 'group-hover:scale-125'
              }`}
            />
          
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => item.id ? scrollToSection(item.id) : item.action?.()}
                className={`font-medium transition-colors hover:text-blue-600 ${
                  isScrolled ? 'text-slate-700' : 'text-white hover:text-blue-300'
                }`}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isScrolled
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
              }`}
            >
              <Globe className="w-4 h-4" />
              {language === 'en' ? 'తెలుగు' : 'English'}
            </button>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-slate-900' : 'text-white'
            }`}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="px-4 py-6 space-y-4">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => item.id ? scrollToSection(item.id) : item.action?.()}
                className="block w-full text-left px-4 py-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 w-full px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors font-medium"
            >
              <Globe className="w-4 h-4" />
              {language === 'en' ? 'తెలుగు' : 'English'}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
