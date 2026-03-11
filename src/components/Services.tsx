import { Code, ShoppingCart, Laptop, RefreshCw, Globe, Wrench } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Code,
      title: t('service1_title'),
      description: t('service1_desc'),
      color: 'bg-blue-500',
    },
    {
      icon: ShoppingCart,
      title: t('service2_title'),
      description: t('service2_desc'),
      color: 'bg-green-500',
    },
    {
      icon: Laptop,
      title: t('service3_title'),
      description: t('service3_desc'),
      color: 'bg-cyan-500',
    },
    {
      icon: RefreshCw,
      title: t('service4_title'),
      description: t('service4_desc'),
      color: 'bg-orange-500',
    },
    {
      icon: Globe,
      title: t('service5_title'),
      description: t('service5_desc'),
      color: 'bg-blue-600',
    },
    {
      icon: Wrench,
      title: t('service6_title'),
      description: t('service6_desc'),
      color: 'bg-slate-600',
    },
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-nunito-900 mb-4">
            {t('services_title')}
          </h2>
          <p className="text-xl text-nunito-600 max-w-3xl mx-auto">
            {t('services_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-nunito-100"
            >
              <div className={`${service.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-nunito-900 mb-4">
                {service.title}
              </h3>

              <p className="text-nunito-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
