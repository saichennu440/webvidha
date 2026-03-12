import { useState, useEffect, useRef } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useLanguage, LANGUAGE_OPTIONS } from '../contexts/LanguageContext';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close language dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
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

  const logo1 = isScrolled
    ? '/webvidha-high-resolution-logo-grayscale-transparent.png'
    : '/webvidha-high-resolution-logo-transparent.png';

  const currentLang = LANGUAGE_OPTIONS.find(l => l.code === language)!;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <button onClick={scrollToTop} className="flex items-center gap-2 group">
            <img
              src={logo1}
              alt="Logo"
              className={`w-18 h-10 transition-transform duration-300 ${
                isScrolled ? 'group-hover:scale-110' : 'group-hover:scale-125'
              }`}
            />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => item.id ? scrollToSection(item.id) : item.action?.()}
                className={`font-medium transition-colors hover:text-blue-600 ${
                  isScrolled ? 'text-nunito-700' : 'text-white hover:text-blue-300'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Desktop Language Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(prev => !prev)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isScrolled
                    ? 'bg-slate-100 text-nunito-700 hover:bg-slate-200'
                    : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>{currentLang.nativeLabel}</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    isLangOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl shadow-lg bg-white border border-nunito-100 overflow-hidden z-50">
                  {LANGUAGE_OPTIONS.map(opt => (
                    <button
                      key={opt.code}
                      onClick={() => {
                        setLanguage(opt.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-slate-50 ${
                        language === opt.code
                          ? 'text-blue-600 font-semibold bg-blue-50'
                          : 'text-nunito-700'
                      }`}
                    >
                      <span>{opt.nativeLabel}</span>
                      <span className="text-xs text-nunito-400">{opt.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-nunito-900' : 'text-white'
            }`}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="px-4 py-6 space-y-4">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => item.id ? scrollToSection(item.id) : item.action?.()}
                className="block w-full text-left px-4 py-2 text-nunito-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}

            {/* Mobile Language Options */}
            <div className="pt-2 border-t border-nunito-100">
              <div className="flex items-center gap-2 px-4 pb-2 text-xs font-semibold text-nunito-400 uppercase tracking-wider">
                <Globe className="w-3 h-3" />
                Language
              </div>
              <div className="grid grid-cols-2 gap-2">
                {LANGUAGE_OPTIONS.map(opt => (
                  <button
                    key={opt.code}
                    onClick={() => {
                      setLanguage(opt.code);
                      setIsMenuOpen(false);
                    }}
                    className={`flex flex-col items-start px-4 py-2.5 rounded-lg text-sm transition-colors font-medium ${
                      language === opt.code
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'bg-slate-50 text-nunito-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{opt.nativeLabel}</span>
                    <span className="text-xs text-nunito-400 font-normal">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}