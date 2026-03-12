import { Check, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Pricing() {
  const { t } = useLanguage();

  const plans = [
    {
      name: t('pricing_basic_title'),
      price: t('pricing_basic_price'),
      description: t('pricing_basic_desc'),
      features: [
        t('pricing_basic_feature1'),
        t('pricing_basic_feature2'),
        t('pricing_basic_feature3'),
        t('pricing_basic_feature4'),
        t('pricing_basic_feature5'),
        t('pricing_basic_feature6'),
      ],
      popular: false,
      cta: t('pricing_cta'),
    },
    {
      name: t('pricing_standard_title'),
      price: t('pricing_standard_price'),
      description: t('pricing_standard_desc'),
      features: [
        t('pricing_standard_feature1'),
        t('pricing_standard_feature2'),
        t('pricing_standard_feature3'),
        t('pricing_standard_feature4'),
        t('pricing_standard_feature5'),
        t('pricing_standard_feature6'),
        t('pricing_standard_feature7'),
      ],
      popular: true,
      cta: t('pricing_cta'),
    },
    {
      name: t('pricing_premium_title'),
      price: t('pricing_premium_price'),
      description: t('pricing_premium_desc'),
      features: [
        t('pricing_premium_feature1'),
        t('pricing_premium_feature2'),
        t('pricing_premium_feature3'),
        t('pricing_premium_feature4'),
        t('pricing_premium_feature5'),
        t('pricing_premium_feature6'),
        t('pricing_premium_feature7'),
        t('pricing_premium_feature8'),
      ],
      popular: false,
      cta: t('pricing_cta'),
    },
    {
      name: t('pricing_custom_title'),
      price: t('pricing_custom'),
      description: t('pricing_custom_desc'),
      features: [
        t('pricing_custom_feature1'),
        t('pricing_custom_feature2'),
        t('pricing_custom_feature3'),
        t('pricing_custom_feature4'),
        t('pricing_custom_feature5'),
      ],
      popular: false,
      cta: t('pricing_contact'),
    },
  ];

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-nunito-900 mb-4">
            {t('pricing_title')}
          </h2>
          <p className="text-xl text-nunito-600 max-w-3xl mx-auto">
            {t('pricing_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                plan.popular ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center gap-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    <Sparkles className="w-4 h-4" />
                    <span>Popular</span>
                  </div>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-nunito-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-nunito-600 text-sm mb-6">
                  {plan.description}
                </p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-nunito-900">
                      {t('pricing_currency')}
                    </span>
                    <span className="text-5xl font-bold text-nunito-900">
                      {plan.price}
                    </span>
                  </div>
                </div>

                <button
                  onClick={scrollToContact}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 mb-8 ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-slate-100 hover:bg-slate-200 text-nunito-900'
                  }`}
                >
                  {plan.cta}
                </button>

                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-nunito-700 text-sm">{feature}</span>
                    </div>
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
