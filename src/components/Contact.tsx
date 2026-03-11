import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const res = await fetch("https://formspree.io/f/xqeypaek", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      // success — reset form
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      alert("Message sent! We'll get back to you soon."); // or use your toast/success UI
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch {
    alert("Network error. Please check your connection.");
  } finally {
    setIsSubmitting(false);
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-nunito-900 mb-4">
            {t('contact_title')}
          </h2>
          <p className="text-xl text-nunito-600 max-w-3xl mx-auto">
            {t('contact_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-nunito-900 mb-2">
                  {t('contact_name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-nunito-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-nunito-900 mb-2">
                  {t('contact_email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-nunito-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-nunito-900 mb-2">
                  {t('contact_phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-nunito-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-semibold text-nunito-900 mb-2">
                  {t('contact_service')}
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-nunito-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select a service</option>
                  <option value="web-design">{t('contact_service_web')}</option>
                  <option value="ecommerce">{t('contact_service_ecommerce')}</option>
                  <option value="webapp">{t('contact_service_webapp')}</option>
                  <option value="redesign">{t('contact_service_redesign')}</option>
                  <option value="wordpress">{t('contact_service_wordpress')}</option>
                  <option value="other">{t('contact_service_other')}</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-nunito-900 mb-2">
                  {t('contact_message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-nunito-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
              >
                {isSubmitting ? t('contact_sending') : t('contact_submit')}
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-nunito-900 mb-6">
                {t('contact_info_title')}
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-nunito-900 mb-1">Email</div>
                    <a href={`mailto:${t('contact_info_email')}`} className="text-nunito-600 hover:text-blue-600 transition-colors">
                      {t('contact_info_email')}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-nunito-900 mb-1">Phone</div>
                    <a href={`tel:${t('contact_info_phone')}`} className="text-nunito-600 hover:text-blue-600 transition-colors">
                      {t('contact_info_phone')}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-nunito-900 mb-1">Location</div>
                    <div className="text-nunito-600">
                      {t('contact_info_location')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8">
              <h4 className="text-xl font-bold text-nunito-900 mb-4">
                Why Choose Webvidha?
              </h4>
              <ul className="space-y-3 text-nunito-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>5+ years of industry experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>100+ successful projects delivered</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Dedicated support team</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Competitive pricing packages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Latest technologies & frameworks</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
