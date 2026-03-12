import { Quote, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Testimonials() {
  const { t } = useLanguage();

  const testimonials = [
    {
      text: t('testimonial1_text'),
      author: t('testimonial1_author'),
      role: t('testimonial1_role'),
      image: 'https://www.vocinfra.com/Jagadish_Gadireddy.png',
    },
    {
      text: t('testimonial2_text'),
      author: t('testimonial2_author'),
      role: t('testimonial2_role'),
      image: '/shilpa.jpeg',
    },
    {
      text: t('testimonial3_text'),
      author: t('testimonial3_author'),
      role: t('testimonial3_role'),
      image: '/ramya.png',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-nunito-900 mb-4">
            {t('testimonials_title')}
          </h2>
          <p className="text-xl text-nunito-600 max-w-3xl mx-auto">
            {t('testimonials_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-nunito-50 to-blue-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="mb-6">
                <Quote className="w-10 h-10 text-blue-500 opacity-50" />
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-nunito text-700 leading-relaxed mb-6">
                {testimonial.text}
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-nunito-900">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-nunito-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
