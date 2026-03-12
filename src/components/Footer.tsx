import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <button onClick={scrollToTop} className="flex items-center gap-2 mb-4 group">
              <img src = '/webvidha-high-resolution-logo-transparent.png' alt="Logo" className="w-18 h-10 transition-transform duration-300 group-hover:scale-110" />
            </button>
            <p className="text-nunito-400 mb-6">
              {t('footer_tagline')}
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 hover:bg-blue-400 rounded-lg flex items-center justify-center transition-colors duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer_services')}</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-nunito-400 hover:text-white transition-colors"
                >
                  {t('service1_title')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-nunito-400 hover:text-white transition-colors"
                >
                  {t('service2_title')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-nunito-400 hover:text-white transition-colors"
                >
                  {t('service3_title')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-nunito-400 hover:text-white transition-colors"
                >
                  {t('service5_title')}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer_company')}</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={scrollToTop}
                  className="text-nunito-400 hover:text-white transition-colors"
                >
                  {t('footer_about')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('portfolio')}
                  className="text-nunito-400 hover:text-white transition-colors"
                >
                  {t('nav_portfolio')}
                </button>
              </li>
              <li>
                <button
                  onClick={scrollToTop}
                  className="text-nunito-400 hover:text-white transition-colors"
                >
                  {t('footer_careers')}
                </button>
              </li>
              <li>
                <button
                  onClick={scrollToTop}
                  className="text-nunito-400 hover:text-white transition-colors"
                >
                  {t('footer_blog')}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{t('contact_info_title')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <a
                  href={`mailto:${t('contact_info_email')}`}
                  className="text-nunito-400 hover:text-white transition-colors"
                >
                  {t('contact_info_email')}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <a
                  href={`tel:${t('contact_info_phone')}`}
                  className="text-nunito-400 hover:text-white transition-colors"
                >
                  {t('contact_info_phone')}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <span className="text-nunito-400">
                  {t('contact_info_location')}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-nunito-800 pt-8">
          <div className="text-center text-nunito-400">
            <p>{t('footer_copyright')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
