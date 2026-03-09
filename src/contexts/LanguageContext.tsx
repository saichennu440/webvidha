import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'te';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    nav_home: 'Home',
    nav_services: 'Services',
    nav_portfolio: 'Portfolio',
    nav_pricing: 'Pricing',
    nav_contact: 'Contact',

    hero_title: 'Transform Your Digital Presence',
    hero_subtitle: 'Custom Web Solutions That Drive Business Growth',
    hero_description: 'Full-stack web development agency specializing in custom websites, e-commerce solutions, and web applications tailored to your business needs.',
    hero_cta_primary: 'Get Started',
    hero_cta_secondary: 'View Our Work',

    services_title: 'Our Services',
    services_subtitle: 'Comprehensive Web Development Solutions',

    service1_title: 'Custom Web Design',
    service1_desc: 'Beautiful, responsive websites designed to reflect your brand and engage your audience.',

    service2_title: 'E-Commerce Solutions',
    service2_desc: 'Powerful online stores with seamless checkout experiences and inventory management.',

    service3_title: 'Web Applications',
    service3_desc: 'Custom web applications built with modern technologies to solve your unique business challenges.',

    service4_title: 'Website Redesign',
    service4_desc: 'Modernize your existing website with fresh design and improved functionality.',

    service5_title: 'WordPress Development',
    service5_desc: 'Custom WordPress solutions with themes, plugins, and optimizations.',

    service6_title: 'Maintenance & Support',
    service6_desc: 'Ongoing support to keep your website secure, updated, and performing optimally.',

    portfolio_title: 'Featured Work',
    portfolio_subtitle: 'Projects We\'re Proud Of',
    portfolio_view: 'View Project',

    testimonials_title: 'Client Testimonials',
    testimonials_subtitle: 'What Our Clients Say',

    testimonial1_text: 'Webvidha transformed our online presence completely. The team delivered a stunning website that perfectly captures our brand and has significantly increased our customer inquiries.',
    testimonial1_author: 'Rajesh Kumar',
    testimonial1_role: 'CEO, TechStart Solutions',

    testimonial2_text: 'Professional, responsive, and incredibly talented. They built our e-commerce platform from scratch and it has exceeded all our expectations. Highly recommended!',
    testimonial2_author: 'Priya Sharma',
    testimonial2_role: 'Founder, StyleHub Fashion',

    testimonial3_text: 'The best web development agency in Hyderabad. They understood our requirements perfectly and delivered a custom web application that streamlined our entire business process.',
    testimonial3_author: 'Anil Reddy',
    testimonial3_role: 'Director, Global Enterprises',

    pricing_title: 'Pricing Plans',
    pricing_subtitle: 'Choose the Perfect Package for Your Business',
    pricing_currency: '₹',
    pricing_month: '/month',
    pricing_custom: 'Custom Quote',
    pricing_cta: 'Get Started',
    pricing_contact: 'Contact Us',

    pricing_basic_title: 'Basic',
    pricing_basic_price: '5,000',
    pricing_basic_desc: 'Perfect for small businesses and startups',
    pricing_basic_feature1: 'Up to 5 pages',
    pricing_basic_feature2: 'Responsive design',
    pricing_basic_feature3: 'Contact form',
    pricing_basic_feature4: 'SEO optimization',
    pricing_basic_feature5: '30 days support',

    pricing_standard_title: 'Standard',
    pricing_standard_price: '15,000',
    pricing_standard_desc: 'Ideal for growing businesses',
    pricing_standard_feature1: 'Up to 10 pages',
    pricing_standard_feature2: 'Custom design',
    pricing_standard_feature3: 'CMS integration',
    pricing_standard_feature4: 'Advanced SEO',
    pricing_standard_feature5: '90 days support',
    pricing_standard_feature6: 'Social media integration',

    pricing_premium_title: 'Premium',
    pricing_premium_price: '30,000',
    pricing_premium_desc: 'For established companies',
    pricing_premium_feature1: 'Up to 20 pages',
    pricing_premium_feature2: 'Custom web application',
    pricing_premium_feature3: 'E-commerce functionality',
    pricing_premium_feature4: 'Advanced integrations',
    pricing_premium_feature5: '6 months support',
    pricing_premium_feature6: 'Performance optimization',
    pricing_premium_feature7: 'Priority support',

    pricing_custom_title: 'Custom Projects',
    pricing_custom_desc: 'Tailored solutions for unique requirements',
    pricing_custom_feature1: 'Custom requirements',
    pricing_custom_feature2: 'Dedicated team',
    pricing_custom_feature3: 'Flexible timeline',
    pricing_custom_feature4: 'Ongoing maintenance',
    pricing_custom_feature5: 'Full project ownership',

    contact_title: 'Get In Touch',
    contact_subtitle: 'Let\'s Build Something Amazing Together',
    contact_name: 'Full Name',
    contact_email: 'Email Address',
    contact_phone: 'Phone Number',
    contact_service: 'Service Interested In',
    contact_message: 'Project Details',
    contact_submit: 'Send Message',
    contact_sending: 'Sending...',

    contact_service_web: 'Web Design',
    contact_service_ecommerce: 'E-Commerce',
    contact_service_webapp: 'Web Application',
    contact_service_redesign: 'Website Redesign',
    contact_service_wordpress: 'WordPress',
    contact_service_other: 'Other',

    contact_info_title: 'Contact Information',
    contact_info_email: 'hello@webvidha.com',
    contact_info_phone: '+91 98765 43210',
    contact_info_location: 'Hyderabad, Telangana',

    footer_tagline: 'Crafting Digital Excellence',
    footer_copyright: '© 2024 Webvidha. All rights reserved.',
    footer_services: 'Services',
    footer_company: 'Company',
    footer_about: 'About Us',
    footer_careers: 'Careers',
    footer_blog: 'Blog',

    trust_clients: 'Happy Clients',
    trust_projects: 'Projects Completed',
    trust_experience: 'Years Experience',
    trust_satisfaction: 'Client Satisfaction',
  },
  te: {
    nav_home: 'హోం',
    nav_services: 'సేవలు',
    nav_portfolio: 'పోర్ట్‌ఫోలియో',
    nav_pricing: 'ధరలు',
    nav_contact: 'సంప్రదించండి',

    hero_title: 'మీ డిజిటల్ ఉనికిని మార్చండి',
    hero_subtitle: 'వ్యాపార వృద్ధిని నడిపించే కస్టమ్ వెబ్ సొల్యూషన్స్',
    hero_description: 'మీ వ్యాపార అవసరాలకు అనుగుణంగా కస్టమ్ వెబ్‌సైట్లు, ఇ-కామర్స్ సొల్యూషన్స్ మరియు వెబ్ అప్లికేషన్లలో ప్రత్యేకత కలిగిన ఫుల్-స్టాక్ వెబ్ డెవలప్‌మెంట్ ఏజెన్సీ.',
    hero_cta_primary: 'ప్రారంభించండి',
    hero_cta_secondary: 'మా పనిని చూడండి',

    services_title: 'మా సేవలు',
    services_subtitle: 'సమగ్ర వెబ్ అభివృద్ధి పరిష్కారాలు',

    service1_title: 'కస్టమ్ వెబ్ డిజైన్',
    service1_desc: 'మీ బ్రాండ్‌ను ప్రతిబింబించే మరియు మీ ప్రేక్షకులను ఆకర్షించే అందమైన, రెస్పాన్సివ్ వెబ్‌సైట్లు.',

    service2_title: 'ఇ-కామర్స్ సొల్యూషన్స్',
    service2_desc: 'సీమ్‌లెస్ చెక్అవుట్ అనుభవాలు మరియు ఇన్వెంటరీ నిర్వహణతో శక్తివంతమైన ఆన్‌లైన్ స్టోర్లు.',

    service3_title: 'వెబ్ అప్లికేషన్స్',
    service3_desc: 'మీ ప్రత్యేక వ్యాపార సవాళ్లను పరిష్కరించడానికి ఆధునిక సాంకేతికతలతో నిర్మించిన కస్టమ్ వెబ్ అప్లికేషన్స్.',

    service4_title: 'వెబ్‌సైట్ రీడిజైన్',
    service4_desc: 'తాజా డిజైన్ మరియు మెరుగైన ఫంక్షనాలిటీతో మీ ప్రస్తుత వెబ్‌సైట్‌ను ఆధునీకరించండి.',

    service5_title: 'వర్డ్‌ప్రెస్ డెవలప్‌మెంట్',
    service5_desc: 'థీమ్‌లు, ప్లగిన్‌లు మరియు ఆప్టిమైజేషన్‌లతో కస్టమ్ వర్డ్‌ప్రెస్ సొల్యూషన్స్.',

    service6_title: 'మెయింటెనెన్స్ & సపోర్ట్',
    service6_desc: 'మీ వెబ్‌సైట్‌ను సురక్షితంగా, అప్‌డేట్‌గా మరియు సరిగ్గా పనిచేసేలా కొనసాగుతున్న మద్దతు.',

    portfolio_title: 'ఫీచర్ చేసిన పని',
    portfolio_subtitle: 'మేము గర్వపడే ప్రాజెక్ట్‌లు',
    portfolio_view: 'ప్రాజెక్ట్ చూడండి',

    testimonials_title: 'క్లయింట్ టెస్టిమోనియల్స్',
    testimonials_subtitle: 'మా క్లయింట్లు చెప్పేది',

    testimonial1_text: 'వెబ్విధా మా ఆన్‌లైన్ ఉనికిని పూర్తిగా మార్చింది. టీమ్ మా బ్రాండ్‌ను సంపూర్ణంగా సంగ్రహించే అద్భుతమైన వెబ్‌సైట్‌ను అందించింది మరియు మా కస్టమర్ విచారణలను గణనీయంగా పెంచింది.',
    testimonial1_author: 'రాజేష్ కుమార్',
    testimonial1_role: 'CEO, టెక్‌స్టార్ట్ సొల్యూషన్స్',

    testimonial2_text: 'ప్రొఫెషనల్, రెస్పాన్సివ్ మరియు అద్భుతమైన ప్రతిభావంతులు. వారు మా ఇ-కామర్స్ ప్లాట్‌ఫారమ్‌ను మొదటి నుండి నిర్మించారు మరియు ఇది మా అంచనాలన్నింటినీ మించిపోయింది. బాగా సిఫార్సు చేయబడింది!',
    testimonial2_author: 'ప్రియా శర్మ',
    testimonial2_role: 'వ్యవస్థాపకుడు, స్టైల్‌హబ్ ఫ్యాషన్',

    testimonial3_text: 'హైదరాబాద్‌లో అత్యుత్తమ వెబ్ డెవలప్‌మెంట్ ఏజెన్సీ. వారు మా అవసరాలను సంపూర్ణంగా అర్థం చేసుకున్నారు మరియు మా మొత్తం వ్యాపార ప్రక్రియను క్రమబద్ధీకరించే కస్టమ్ వెబ్ అప్లికేషన్‌ను అందించారు.',
    testimonial3_author: 'అనిల్ రెడ్డి',
    testimonial3_role: 'డైరెక్టర్, గ్లోబల్ ఎంటర్‌ప్రైజెస్',

    pricing_title: 'ధర ప్రణాళికలు',
    pricing_subtitle: 'మీ వ్యాపారానికి సరైన ప్యాకేజీని ఎంచుకోండి',
    pricing_currency: '₹',
    pricing_month: '/నెల',
    pricing_custom: 'కస్టమ్ కోట్',
    pricing_cta: 'ప్రారంభించండి',
    pricing_contact: 'మమ్మల్ని సంప్రదించండి',

    pricing_basic_title: 'బేసిక్',
    pricing_basic_price: '25,000',
    pricing_basic_desc: 'చిన్న వ్యాపారాలు మరియు స్టార్టప్‌లకు పర్ఫెక్ట్',
    pricing_basic_feature1: '5 పేజీల వరకు',
    pricing_basic_feature2: 'రెస్పాన్సివ్ డిజైన్',
    pricing_basic_feature3: 'కాంటాక్ట్ ఫారమ్',
    pricing_basic_feature4: 'SEO ఆప్టిమైజేషన్',
    pricing_basic_feature5: '30 రోజుల మద్దతు',

    pricing_standard_title: 'స్టాండర్డ్',
    pricing_standard_price: '50,000',
    pricing_standard_desc: 'పెరుగుతున్న వ్యాపారాలకు అనువైనది',
    pricing_standard_feature1: '10 పేజీల వరకు',
    pricing_standard_feature2: 'కస్టమ్ డిజైన్',
    pricing_standard_feature3: 'CMS ఇంటిగ్రేషన్',
    pricing_standard_feature4: 'అడ్వాన్స్‌డ్ SEO',
    pricing_standard_feature5: '90 రోజుల మద్దతు',
    pricing_standard_feature6: 'సోషల్ మీడియా ఇంటిగ్రేషన్',

    pricing_premium_title: 'ప్రీమియం',
    pricing_premium_price: '1,00,000',
    pricing_premium_desc: 'స్థిరపడిన కంపెనీలకు',
    pricing_premium_feature1: 'అపరిమిత పేజీలు',
    pricing_premium_feature2: 'కస్టమ్ వెబ్ అప్లికేషన్',
    pricing_premium_feature3: 'ఇ-కామర్స్ ఫంక్షనాలిటీ',
    pricing_premium_feature4: 'అడ్వాన్స్‌డ్ ఇంటిగ్రేషన్స్',
    pricing_premium_feature5: '6 నెలల మద్దతు',
    pricing_premium_feature6: 'పెర్ఫార్మెన్స్ ఆప్టిమైజేషన్',
    pricing_premium_feature7: 'ప్రాధాన్యత మద్దతు',

    pricing_custom_title: 'కస్టమ్ ప్రాజెక్ట్‌లు',
    pricing_custom_desc: 'ప్రత్యేక అవసరాలకు తగిన పరిష్కారాలు',
    pricing_custom_feature1: 'కస్టమ్ అవసరాలు',
    pricing_custom_feature2: 'అంకితమైన టీమ్',
    pricing_custom_feature3: 'సౌకర్యవంతమైన సమయరేఖ',
    pricing_custom_feature4: 'కొనసాగుతున్న నిర్వహణ',
    pricing_custom_feature5: 'పూర్తి ప్రాజెక్ట్ యాజమాన్యం',

    contact_title: 'సంప్రదించండి',
    contact_subtitle: 'కలిసి అద్భుతమైనదాన్ని నిర్మిద్దాం',
    contact_name: 'పూర్తి పేరు',
    contact_email: 'ఇమెయిల్ చిరునామా',
    contact_phone: 'ఫోన్ నంబర్',
    contact_service: 'ఆసక్తి ఉన్న సేవ',
    contact_message: 'ప్రాజెక్ట్ వివరాలు',
    contact_submit: 'సందేశం పంపండి',
    contact_sending: 'పంపుతోంది...',

    contact_service_web: 'వెబ్ డిజైన్',
    contact_service_ecommerce: 'ఇ-కామర్స్',
    contact_service_webapp: 'వెబ్ అప్లికేషన్',
    contact_service_redesign: 'వెబ్‌సైట్ రీడిజైన్',
    contact_service_wordpress: 'వర్డ్‌ప్రెస్',
    contact_service_other: 'ఇతర',

    contact_info_title: 'సంప్రదింపు సమాచారం',
    contact_info_email: 'hello@webvidha.com',
    contact_info_phone: '+91 98765 43210',
    contact_info_location: 'హైదరాబాద్, తెలంగాణ',

    footer_tagline: 'డిజిటల్ శ్రేష్ఠతను రూపొందించడం',
    footer_copyright: '© 2024 వెబ్విధా. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.',
    footer_services: 'సేవలు',
    footer_company: 'కంపెనీ',
    footer_about: 'మా గురించి',
    footer_careers: 'కెరీర్స్',
    footer_blog: 'బ్లాగ్',

    trust_clients: 'సంతోషకరమైన క్లయింట్లు',
    trust_projects: 'పూర్తయిన ప్రాజెక్ట్‌లు',
    trust_experience: 'సంవత్సరాల అనుభవం',
    trust_satisfaction: 'క్లయింట్ సంతృప్తి',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'te' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
