import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'te' | 'hi' | 'ta' | 'kn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
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
    portfolio_subtitle: "Projects We're Proud Of",
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
    contact_subtitle: "Let's Build Something Amazing Together",
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

  hi: {
    nav_home: 'होम',
    nav_services: 'सेवाएं',
    nav_portfolio: 'पोर्टफोलियो',
    nav_pricing: 'मूल्य',
    nav_contact: 'संपर्क करें',

    hero_title: 'अपनी डिजिटल उपस्थिति बदलें',
    hero_subtitle: 'व्यापार विकास को बढ़ावा देने वाले कस्टम वेब समाधान',
    hero_description: 'फुल-स्टैक वेब डेवलपमेंट एजेंसी जो आपकी व्यावसायिक जरूरतों के अनुसार कस्टम वेबसाइट, ई-कॉमर्स समाधान और वेब एप्लिकेशन में विशेषज्ञता रखती है।',
    hero_cta_primary: 'शुरू करें',
    hero_cta_secondary: 'हमारा काम देखें',

    services_title: 'हमारी सेवाएं',
    services_subtitle: 'व्यापक वेब विकास समाधान',

    service1_title: 'कस्टम वेब डिज़ाइन',
    service1_desc: 'सुंदर, रिस्पॉन्सिव वेबसाइट जो आपके ब्रांड को दर्शाती हैं और आपके दर्शकों को आकर्षित करती हैं।',

    service2_title: 'ई-कॉमर्स समाधान',
    service2_desc: 'सहज चेकआउट अनुभव और इन्वेंटरी प्रबंधन के साथ शक्तिशाली ऑनलाइन स्टोर।',

    service3_title: 'वेब एप्लिकेशन',
    service3_desc: 'आपकी अनूठी व्यावसायिक चुनौतियों को हल करने के लिए आधुनिक तकनीकों से बनी कस्टम वेब एप्लिकेशन।',

    service4_title: 'वेबसाइट रीडिज़ाइन',
    service4_desc: 'नए डिज़ाइन और बेहतर कार्यक्षमता के साथ अपनी मौजूदा वेबसाइट को आधुनिक बनाएं।',

    service5_title: 'वर्डप्रेस डेवलपमेंट',
    service5_desc: 'थीम, प्लगइन और ऑप्टिमाइज़ेशन के साथ कस्टम वर्डप्रेस समाधान।',

    service6_title: 'रखरखाव और सहायता',
    service6_desc: 'आपकी वेबसाइट को सुरक्षित, अपडेट और बेहतर प्रदर्शन करने के लिए निरंतर सहायता।',

    portfolio_title: 'फीचर्ड काम',
    portfolio_subtitle: 'जिन प्रोजेक्ट्स पर हमें गर्व है',
    portfolio_view: 'प्रोजेक्ट देखें',

    testimonials_title: 'ग्राहक प्रशंसापत्र',
    testimonials_subtitle: 'हमारे ग्राहक क्या कहते हैं',

    testimonial1_text: 'वेबविधा ने हमारी ऑनलाइन उपस्थिति को पूरी तरह बदल दिया। टीम ने एक शानदार वेबसाइट बनाई जो हमारे ब्रांड को सटीक रूप से दर्शाती है और हमारी ग्राहक पूछताछ को काफी बढ़ाया।',
    testimonial1_author: 'राजेश कुमार',
    testimonial1_role: 'CEO, टेकस्टार्ट सॉल्यूशंस',

    testimonial2_text: 'पेशेवर, जिम्मेदार और अविश्वसनीय रूप से प्रतिभाशाली। उन्होंने हमारा ई-कॉमर्स प्लेटफॉर्म शुरू से बनाया और यह हमारी सभी उम्मीदों से बेहतर निकला। अत्यधिक अनुशंसित!',
    testimonial2_author: 'प्रिया शर्मा',
    testimonial2_role: 'संस्थापक, स्टाइलहब फैशन',

    testimonial3_text: 'हैदराबाद में सबसे अच्छी वेब डेवलपमेंट एजेंसी। उन्होंने हमारी जरूरतों को पूरी तरह समझा और एक कस्टम वेब एप्लिकेशन बनाई जिसने हमारी पूरी व्यावसायिक प्रक्रिया को सुव्यवस्थित किया।',
    testimonial3_author: 'अनिल रेड्डी',
    testimonial3_role: 'निदेशक, ग्लोबल एंटरप्राइजेज',

    pricing_title: 'मूल्य योजनाएं',
    pricing_subtitle: 'अपने व्यवसाय के लिए सही पैकेज चुनें',
    pricing_currency: '₹',
    pricing_month: '/माह',
    pricing_custom: 'कस्टम कोट',
    pricing_cta: 'शुरू करें',
    pricing_contact: 'हमसे संपर्क करें',

    pricing_basic_title: 'बेसिक',
    pricing_basic_price: '5,000',
    pricing_basic_desc: 'छोटे व्यवसायों और स्टार्टअप के लिए परफेक्ट',
    pricing_basic_feature1: '5 पेज तक',
    pricing_basic_feature2: 'रिस्पॉन्सिव डिज़ाइन',
    pricing_basic_feature3: 'संपर्क फ़ॉर्म',
    pricing_basic_feature4: 'SEO ऑप्टिमाइज़ेशन',
    pricing_basic_feature5: '30 दिन की सहायता',

    pricing_standard_title: 'स्टैंडर्ड',
    pricing_standard_price: '15,000',
    pricing_standard_desc: 'बढ़ते व्यवसायों के लिए आदर्श',
    pricing_standard_feature1: '10 पेज तक',
    pricing_standard_feature2: 'कस्टम डिज़ाइन',
    pricing_standard_feature3: 'CMS इंटीग्रेशन',
    pricing_standard_feature4: 'एडवांस्ड SEO',
    pricing_standard_feature5: '90 दिन की सहायता',
    pricing_standard_feature6: 'सोशल मीडिया इंटीग्रेशन',

    pricing_premium_title: 'प्रीमियम',
    pricing_premium_price: '30,000',
    pricing_premium_desc: 'स्थापित कंपनियों के लिए',
    pricing_premium_feature1: '20 पेज तक',
    pricing_premium_feature2: 'कस्टम वेब एप्लिकेशन',
    pricing_premium_feature3: 'ई-कॉमर्स फंक्शनैलिटी',
    pricing_premium_feature4: 'एडवांस्ड इंटीग्रेशन',
    pricing_premium_feature5: '6 महीने की सहायता',
    pricing_premium_feature6: 'परफॉर्मेंस ऑप्टिमाइज़ेशन',
    pricing_premium_feature7: 'प्राथमिकता सहायता',

    pricing_custom_title: 'कस्टम प्रोजेक्ट्स',
    pricing_custom_desc: 'अनूठी आवश्यकताओं के लिए अनुकूलित समाधान',
    pricing_custom_feature1: 'कस्टम आवश्यकताएं',
    pricing_custom_feature2: 'समर्पित टीम',
    pricing_custom_feature3: 'लचीली समयसीमा',
    pricing_custom_feature4: 'निरंतर रखरखाव',
    pricing_custom_feature5: 'पूर्ण प्रोजेक्ट स्वामित्व',

    contact_title: 'संपर्क करें',
    contact_subtitle: 'मिलकर कुछ अद्भुत बनाएं',
    contact_name: 'पूरा नाम',
    contact_email: 'ईमेल पता',
    contact_phone: 'फ़ोन नंबर',
    contact_service: 'रुचि की सेवा',
    contact_message: 'प्रोजेक्ट विवरण',
    contact_submit: 'संदेश भेजें',
    contact_sending: 'भेजा जा रहा है...',

    contact_service_web: 'वेब डिज़ाइन',
    contact_service_ecommerce: 'ई-कॉमर्स',
    contact_service_webapp: 'वेब एप्लिकेशन',
    contact_service_redesign: 'वेबसाइट रीडिज़ाइन',
    contact_service_wordpress: 'वर्डप्रेस',
    contact_service_other: 'अन्य',

    contact_info_title: 'संपर्क जानकारी',
    contact_info_email: 'hello@webvidha.com',
    contact_info_phone: '+91 98765 43210',
    contact_info_location: 'हैदराबाद, तेलंगाना',

    footer_tagline: 'डिजिटल उत्कृष्टता को आकार देना',
    footer_copyright: '© 2024 वेबविधा। सर्वाधिकार सुरक्षित।',
    footer_services: 'सेवाएं',
    footer_company: 'कंपनी',
    footer_about: 'हमारे बारे में',
    footer_careers: 'करियर',
    footer_blog: 'ब्लॉग',

    trust_clients: 'खुश ग्राहक',
    trust_projects: 'पूर्ण प्रोजेक्ट्स',
    trust_experience: 'वर्षों का अनुभव',
    trust_satisfaction: 'ग्राहक संतुष्टि',
  },

  ta: {
    nav_home: 'முகப்பு',
    nav_services: 'சேவைகள்',
    nav_portfolio: 'போர்ட்ஃபோலியோ',
    nav_pricing: 'விலை',
    nav_contact: 'தொடர்பு',

    hero_title: 'உங்கள் டிஜிட்டல் இருப்பை மாற்றுங்கள்',
    hero_subtitle: 'வணிக வளர்ச்சியை இயக்கும் தனிப்பயன் வலை தீர்வுகள்',
    hero_description: 'உங்கள் வணிக தேவைகளுக்கு ஏற்ப தனிப்பயன் வலைதளங்கள், இ-காமர்ஸ் தீர்வுகள் மற்றும் வலை பயன்பாடுகளில் நிபுணத்துவம் வாய்ந்த ஃபுல்-ஸ்டாக் வலை மேம்பாட்டு நிறுவனம்.',
    hero_cta_primary: 'தொடங்குங்கள்',
    hero_cta_secondary: 'எங்கள் பணியைப் பாருங்கள்',

    services_title: 'எங்கள் சேவைகள்',
    services_subtitle: 'விரிவான வலை மேம்பாட்டு தீர்வுகள்',

    service1_title: 'தனிப்பயன் வலை வடிவமைப்பு',
    service1_desc: 'உங்கள் பிராண்டை பிரதிபலிக்கும் மற்றும் உங்கள் பார்வையாளர்களை ஈர்க்கும் அழகான, பதிலளிக்கக்கூடிய வலைதளங்கள்.',

    service2_title: 'இ-காமர்ஸ் தீர்வுகள்',
    service2_desc: 'தடையற்ற செக்அவுட் அனுபவங்கள் மற்றும் சரக்கு மேலாண்மையுடன் சக்திவாய்ந்த ஆன்லைன் கடைகள்.',

    service3_title: 'வலை பயன்பாடுகள்',
    service3_desc: 'உங்கள் தனிப்பட்ட வணிக சவால்களை தீர்க்க நவீன தொழில்நுட்பங்களுடன் கட்டமைக்கப்பட்ட தனிப்பயன் வலை பயன்பாடுகள்.',

    service4_title: 'வலைதளம் மறுவடிவமைப்பு',
    service4_desc: 'புதிய வடிவமைப்பு மற்றும் மேம்பட்ட செயல்பாட்டுடன் உங்கள் தற்போதைய வலைதளத்தை நவீனப்படுத்துங்கள்.',

    service5_title: 'வேர்ட்பிரஸ் மேம்பாடு',
    service5_desc: 'தீம்கள், செருகுநிரல்கள் மற்றும் உகப்பாக்கங்களுடன் தனிப்பயன் வேர்ட்பிரஸ் தீர்வுகள்.',

    service6_title: 'பராமரிப்பு & ஆதரவு',
    service6_desc: 'உங்கள் வலைதளத்தை பாதுகாப்பாக, புதுப்பிக்கப்பட்டதாக மற்றும் சரியாக செயல்படுத்த தொடர்ந்து ஆதரவு.',

    portfolio_title: 'சிறப்பிக்கப்பட்ட பணி',
    portfolio_subtitle: 'நாங்கள் பெருமைப்படும் திட்டங்கள்',
    portfolio_view: 'திட்டத்தைப் பாருங்கள்',

    testimonials_title: 'வாடிக்கையாளர் சான்றுகள்',
    testimonials_subtitle: 'எங்கள் வாடிக்கையாளர்கள் என்ன சொல்கிறார்கள்',

    testimonial1_text: 'வெப்விதா எங்கள் ஆன்லைன் இருப்பை முழுமையாக மாற்றியது. குழு எங்கள் பிராண்டை சரியாக பிடிக்கும் ஒரு அற்புதமான வலைதளத்தை வழங்கியது மற்றும் எங்கள் வாடிக்கையாளர் விசாரணைகளை கணிசமாக அதிகரித்தது.',
    testimonial1_author: 'ராஜேஷ் குமார்',
    testimonial1_role: 'CEO, டெக்ஸ்டார்ட் சொல்யூஷன்ஸ்',

    testimonial2_text: 'தொழில்முறை, பதிலளிக்கக்கூடிய மற்றும் நம்பமுடியாத திறமையான. அவர்கள் எங்கள் இ-காமர்ஸ் தளத்தை ஆரம்பத்திலிருந்து கட்டினார்கள், இது எங்கள் அனைத்து எதிர்பார்ப்புகளையும் மீறியது. மிகவும் பரிந்துரைக்கப்படுகிறது!',
    testimonial2_author: 'பிரியா சர்மா',
    testimonial2_role: 'நிறுவனர், ஸ்டைல்ஹப் ஃபேஷன்',

    testimonial3_text: 'ஹைதராபாத்தில் சிறந்த வலை மேம்பாட்டு நிறுவனம். அவர்கள் எங்கள் தேவைகளை முழுமையாக புரிந்துகொண்டார்கள் மற்றும் எங்கள் முழு வணிக செயல்முறையை ஒழுங்குபடுத்திய தனிப்பயன் வலை பயன்பாட்டை வழங்கினர்.',
    testimonial3_author: 'அனில் ரெட்டி',
    testimonial3_role: 'இயக்குனர், குளோபல் என்டர்பிரைசஸ்',

    pricing_title: 'விலை திட்டங்கள்',
    pricing_subtitle: 'உங்கள் வணிகத்திற்கு சரியான தொகுப்பை தேர்வு செய்யுங்கள்',
    pricing_currency: '₹',
    pricing_month: '/மாதம்',
    pricing_custom: 'தனிப்பயன் மேற்கோள்',
    pricing_cta: 'தொடங்குங்கள்',
    pricing_contact: 'எங்களை தொடர்பு கொள்ளுங்கள்',

    pricing_basic_title: 'அடிப்படை',
    pricing_basic_price: '5,000',
    pricing_basic_desc: 'சிறு வணிகங்கள் மற்றும் ஸ்டார்ட்அப்களுக்கு சரியானது',
    pricing_basic_feature1: '5 பக்கங்கள் வரை',
    pricing_basic_feature2: 'பதிலளிக்கக்கூடிய வடிவமைப்பு',
    pricing_basic_feature3: 'தொடர்பு படிவம்',
    pricing_basic_feature4: 'SEO உகப்பாக்கம்',
    pricing_basic_feature5: '30 நாள் ஆதரவு',

    pricing_standard_title: 'நிலையான',
    pricing_standard_price: '15,000',
    pricing_standard_desc: 'வளர்ந்துவரும் வணிகங்களுக்கு ஏற்றது',
    pricing_standard_feature1: '10 பக்கங்கள் வரை',
    pricing_standard_feature2: 'தனிப்பயன் வடிவமைப்பு',
    pricing_standard_feature3: 'CMS ஒருங்கிணைப்பு',
    pricing_standard_feature4: 'மேம்பட்ட SEO',
    pricing_standard_feature5: '90 நாள் ஆதரவு',
    pricing_standard_feature6: 'சமூக ஊடக ஒருங்கிணைப்பு',

    pricing_premium_title: 'பிரீமியம்',
    pricing_premium_price: '30,000',
    pricing_premium_desc: 'நிறுவப்பட்ட நிறுவனங்களுக்கு',
    pricing_premium_feature1: '20 பக்கங்கள் வரை',
    pricing_premium_feature2: 'தனிப்பயன் வலை பயன்பாடு',
    pricing_premium_feature3: 'இ-காமர்ஸ் செயல்பாடு',
    pricing_premium_feature4: 'மேம்பட்ட ஒருங்கிணைப்புகள்',
    pricing_premium_feature5: '6 மாத ஆதரவு',
    pricing_premium_feature6: 'செயல்திறன் உகப்பாக்கம்',
    pricing_premium_feature7: 'முன்னுரிமை ஆதரவு',

    pricing_custom_title: 'தனிப்பயன் திட்டங்கள்',
    pricing_custom_desc: 'தனிப்பட்ட தேவைகளுக்கான தனிப்பயன் தீர்வுகள்',
    pricing_custom_feature1: 'தனிப்பயன் தேவைகள்',
    pricing_custom_feature2: 'அர்ப்பணிக்கப்பட்ட குழு',
    pricing_custom_feature3: 'நெகிழ்வான காலக்கெடு',
    pricing_custom_feature4: 'தொடர்ந்து பராமரிப்பு',
    pricing_custom_feature5: 'முழு திட்ட உரிமை',

    contact_title: 'தொடர்பு கொள்ளுங்கள்',
    contact_subtitle: 'சேர்ந்து ஏதாவது அற்புதமானதை உருவாக்குவோம்',
    contact_name: 'முழு பெயர்',
    contact_email: 'மின்னஞ்சல் முகவரி',
    contact_phone: 'தொலைபேசி எண்',
    contact_service: 'ஆர்வமுள்ள சேவை',
    contact_message: 'திட்ட விவரங்கள்',
    contact_submit: 'செய்தி அனுப்பு',
    contact_sending: 'அனுப்புகிறது...',

    contact_service_web: 'வலை வடிவமைப்பு',
    contact_service_ecommerce: 'இ-காமர்ஸ்',
    contact_service_webapp: 'வலை பயன்பாடு',
    contact_service_redesign: 'வலைதளம் மறுவடிவமைப்பு',
    contact_service_wordpress: 'வேர்ட்பிரஸ்',
    contact_service_other: 'மற்றவை',

    contact_info_title: 'தொடர்பு தகவல்',
    contact_info_email: 'hello@webvidha.com',
    contact_info_phone: '+91 98765 43210',
    contact_info_location: 'ஹைதராபாத், தெலங்கானா',

    footer_tagline: 'டிஜிட்டல் சிறப்பை உருவாக்குகிறோம்',
    footer_copyright: '© 2024 வெப்விதா. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    footer_services: 'சேவைகள்',
    footer_company: 'நிறுவனம்',
    footer_about: 'எங்களைப் பற்றி',
    footer_careers: 'வேலைவாய்ப்புகள்',
    footer_blog: 'வலைப்பதிவு',

    trust_clients: 'மகிழ்ச்சியான வாடிக்கையாளர்கள்',
    trust_projects: 'முடிக்கப்பட்ட திட்டங்கள்',
    trust_experience: 'ஆண்டுகள் அனுபவம்',
    trust_satisfaction: 'வாடிக்கையாளர் திருப்தி',
  },

  kn: {
    nav_home: 'ಮುಖಪುಟ',
    nav_services: 'ಸೇವೆಗಳು',
    nav_portfolio: 'ಪೋರ್ಟ್‌ಫೋಲಿಯೊ',
    nav_pricing: 'ಬೆಲೆ',
    nav_contact: 'ಸಂಪರ್ಕಿಸಿ',

    hero_title: 'ನಿಮ್ಮ ಡಿಜಿಟಲ್ ಉಪಸ್ಥಿತಿಯನ್ನು ರೂಪಾಂತರಿಸಿ',
    hero_subtitle: 'ವ್ಯಾಪಾರ ಬೆಳವಣಿಗೆಯನ್ನು ಉತ್ತೇಜಿಸುವ ಕಸ್ಟಮ್ ವೆಬ್ ಪರಿಹಾರಗಳು',
    hero_description: 'ನಿಮ್ಮ ವ್ಯಾಪಾರದ ಅಗತ್ಯಗಳಿಗೆ ಅನುಗುಣವಾಗಿ ಕಸ್ಟಮ್ ವೆಬ್‌ಸೈಟ್‌ಗಳು, ಇ-ಕಾಮರ್ಸ್ ಪರಿಹಾರಗಳು ಮತ್ತು ವೆಬ್ ಅಪ್ಲಿಕೇಶನ್‌ಗಳಲ್ಲಿ ಪರಿಣತಿ ಹೊಂದಿರುವ ಫುಲ್-ಸ್ಟಾಕ್ ವೆಬ್ ಡೆವಲಪ್‌ಮೆಂಟ್ ಏಜೆನ್ಸಿ.',
    hero_cta_primary: 'ಪ್ರಾರಂಭಿಸಿ',
    hero_cta_secondary: 'ನಮ್ಮ ಕೆಲಸ ನೋಡಿ',

    services_title: 'ನಮ್ಮ ಸೇವೆಗಳು',
    services_subtitle: 'ಸಮಗ್ರ ವೆಬ್ ಅಭಿವೃದ್ಧಿ ಪರಿಹಾರಗಳು',

    service1_title: 'ಕಸ್ಟಮ್ ವೆಬ್ ವಿನ್ಯಾಸ',
    service1_desc: 'ನಿಮ್ಮ ಬ್ರ್ಯಾಂಡ್ ಅನ್ನು ಪ್ರತಿಬಿಂಬಿಸುವ ಮತ್ತು ನಿಮ್ಮ ಪ್ರೇಕ್ಷಕರನ್ನು ತೊಡಗಿಸಿಕೊಳ್ಳುವ ಸುಂದರ, ಸ್ಪಂದನಶೀಲ ವೆಬ್‌ಸೈಟ್‌ಗಳು.',

    service2_title: 'ಇ-ಕಾಮರ್ಸ್ ಪರಿಹಾರಗಳು',
    service2_desc: 'ನಿರಾತಂಕ ಚೆಕ್‌ಔಟ್ ಅನುಭವಗಳು ಮತ್ತು ದಾಸ್ತಾನು ನಿರ್ವಹಣೆಯೊಂದಿಗೆ ಶಕ್ತಿಶಾಲಿ ಆನ್‌ಲೈನ್ ಅಂಗಡಿಗಳು.',

    service3_title: 'ವೆಬ್ ಅಪ್ಲಿಕೇಶನ್‌ಗಳು',
    service3_desc: 'ನಿಮ್ಮ ಅನನ್ಯ ವ್ಯಾಪಾರ ಸವಾಲುಗಳನ್ನು ಪರಿಹರಿಸಲು ಆಧುನಿಕ ತಂತ್ರಜ್ಞಾನಗಳೊಂದಿಗೆ ನಿರ್ಮಿಸಲಾದ ಕಸ್ಟಮ್ ವೆಬ್ ಅಪ್ಲಿಕೇಶನ್‌ಗಳು.',

    service4_title: 'ವೆಬ್‌ಸೈಟ್ ಮರುವಿನ್ಯಾಸ',
    service4_desc: 'ತಾಜಾ ವಿನ್ಯಾಸ ಮತ್ತು ಸುಧಾರಿತ ಕಾರ್ಯವಿಧಾನದೊಂದಿಗೆ ನಿಮ್ಮ ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ವೆಬ್‌ಸೈಟ್ ಅನ್ನು ಆಧುನೀಕರಿಸಿ.',

    service5_title: 'ವರ್ಡ್‌ಪ್ರೆಸ್ ಅಭಿವೃದ್ಧಿ',
    service5_desc: 'ಥೀಮ್‌ಗಳು, ಪ್ಲಗಿನ್‌ಗಳು ಮತ್ತು ಆಪ್ಟಿಮೈಸೇಶನ್‌ಗಳೊಂದಿಗೆ ಕಸ್ಟಮ್ ವರ್ಡ್‌ಪ್ರೆಸ್ ಪರಿಹಾರಗಳು.',

    service6_title: 'ನಿರ್ವಹಣೆ & ಬೆಂಬಲ',
    service6_desc: 'ನಿಮ್ಮ ವೆಬ್‌ಸೈಟ್ ಅನ್ನು ಸುರಕ್ಷಿತವಾಗಿ, ನವೀಕರಿಸಿ ಮತ್ತು ಉತ್ತಮವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸಲು ನಿರಂತರ ಬೆಂಬಲ.',

    portfolio_title: 'ವೈಶಿಷ್ಟ್ಯಪೂರ್ಣ ಕೆಲಸ',
    portfolio_subtitle: 'ನಾವು ಹೆಮ್ಮೆಪಡುವ ಯೋಜನೆಗಳು',
    portfolio_view: 'ಯೋಜನೆ ನೋಡಿ',

    testimonials_title: 'ಗ್ರಾಹಕ ಪ್ರಶಂಸಾಪತ್ರಗಳು',
    testimonials_subtitle: 'ನಮ್ಮ ಗ್ರಾಹಕರು ಏನು ಹೇಳುತ್ತಾರೆ',

    testimonial1_text: 'ವೆಬ್‌ವಿಧಾ ನಮ್ಮ ಆನ್‌ಲೈನ್ ಉಪಸ್ಥಿತಿಯನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ರೂಪಾಂತರಿಸಿತು. ತಂಡವು ನಮ್ಮ ಬ್ರ್ಯಾಂಡ್ ಅನ್ನು ಸರಿಯಾಗಿ ಸೆರೆಹಿಡಿಯುವ ಅದ್ಭುತ ವೆಬ್‌ಸೈಟ್ ನೀಡಿತು ಮತ್ತು ನಮ್ಮ ಗ್ರಾಹಕ ವಿಚಾರಣೆಗಳನ್ನು ಗಣನೀಯವಾಗಿ ಹೆಚ್ಚಿಸಿತು.',
    testimonial1_author: 'ರಾಜೇಶ್ ಕುಮಾರ್',
    testimonial1_role: 'CEO, ಟೆಕ್‌ಸ್ಟಾರ್ಟ್ ಸೊಲ್ಯೂಷನ್ಸ್',

    testimonial2_text: 'ವೃತ್ತಿಪರ, ಸ್ಪಂದನಶೀಲ ಮತ್ತು ಅದ್ಭುತವಾಗಿ ಪ್ರತಿಭಾವಂತ. ಅವರು ನಮ್ಮ ಇ-ಕಾಮರ್ಸ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಅನ್ನು ಮೊದಲಿನಿಂದ ನಿರ್ಮಿಸಿದರು ಮತ್ತು ಇದು ನಮ್ಮ ಎಲ್ಲಾ ನಿರೀಕ್ಷೆಗಳನ್ನು ಮೀರಿದೆ. ಹೆಚ್ಚು ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ!',
    testimonial2_author: 'ಪ್ರಿಯಾ ಶರ್ಮಾ',
    testimonial2_role: 'ಸಂಸ್ಥಾಪಕ, ಸ್ಟೈಲ್‌ಹಬ್ ಫ್ಯಾಷನ್',

    testimonial3_text: 'ಹೈದರಾಬಾದ್‌ನಲ್ಲಿ ಅತ್ಯುತ್ತಮ ವೆಬ್ ಡೆವಲಪ್‌ಮೆಂಟ್ ಏಜೆನ್ಸಿ. ಅವರು ನಮ್ಮ ಅಗತ್ಯಗಳನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಂಡರು ಮತ್ತು ನಮ್ಮ ಸಂಪೂರ್ಣ ವ್ಯಾಪಾರ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಸುಗಮಗೊಳಿಸಿದ ಕಸ್ಟಮ್ ವೆಬ್ ಅಪ್ಲಿಕೇಶನ್ ನೀಡಿದರು.',
    testimonial3_author: 'ಅನಿಲ್ ರೆಡ್ಡಿ',
    testimonial3_role: 'ನಿರ್ದೇಶಕ, ಗ್ಲೋಬಲ್ ಎಂಟರ್‌ಪ್ರೈಸಸ್',

    pricing_title: 'ಬೆಲೆ ಯೋಜನೆಗಳು',
    pricing_subtitle: 'ನಿಮ್ಮ ವ್ಯಾಪಾರಕ್ಕಾಗಿ ಸರಿಯಾದ ಪ್ಯಾಕೇಜ್ ಆಯ್ಕೆ ಮಾಡಿ',
    pricing_currency: '₹',
    pricing_month: '/ತಿಂಗಳು',
    pricing_custom: 'ಕಸ್ಟಮ್ ಕೋಟ್',
    pricing_cta: 'ಪ್ರಾರಂಭಿಸಿ',
    pricing_contact: 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ',

    pricing_basic_title: 'ಮೂಲಭೂತ',
    pricing_basic_price: '5,000',
    pricing_basic_desc: 'ಸಣ್ಣ ವ್ಯಾಪಾರಗಳು ಮತ್ತು ಸ್ಟಾರ್ಟ್‌ಅಪ್‌ಗಳಿಗೆ ಸೂಕ್ತ',
    pricing_basic_feature1: '5 ಪುಟಗಳವರೆಗೆ',
    pricing_basic_feature2: 'ಸ್ಪಂದನಶೀಲ ವಿನ್ಯಾಸ',
    pricing_basic_feature3: 'ಸಂಪರ್ಕ ನಮೂನೆ',
    pricing_basic_feature4: 'SEO ಆಪ್ಟಿಮೈಸೇಶನ್',
    pricing_basic_feature5: '30 ದಿನಗಳ ಬೆಂಬಲ',

    pricing_standard_title: 'ಮಾನಕ',
    pricing_standard_price: '15,000',
    pricing_standard_desc: 'ಬೆಳೆಯುತ್ತಿರುವ ವ್ಯಾಪಾರಗಳಿಗೆ ಆದರ್ಶ',
    pricing_standard_feature1: '10 ಪುಟಗಳವರೆಗೆ',
    pricing_standard_feature2: 'ಕಸ್ಟಮ್ ವಿನ್ಯಾಸ',
    pricing_standard_feature3: 'CMS ಏಕೀಕರಣ',
    pricing_standard_feature4: 'ಸುಧಾರಿತ SEO',
    pricing_standard_feature5: '90 ದಿನಗಳ ಬೆಂಬಲ',
    pricing_standard_feature6: 'ಸೋಶಿಯಲ್ ಮೀಡಿಯಾ ಏಕೀಕರಣ',

    pricing_premium_title: 'ಪ್ರೀಮಿಯಂ',
    pricing_premium_price: '30,000',
    pricing_premium_desc: 'ಸ್ಥಾಪಿತ ಕಂಪನಿಗಳಿಗೆ',
    pricing_premium_feature1: '20 ಪುಟಗಳವರೆಗೆ',
    pricing_premium_feature2: 'ಕಸ್ಟಮ್ ವೆಬ್ ಅಪ್ಲಿಕೇಶನ್',
    pricing_premium_feature3: 'ಇ-ಕಾಮರ್ಸ್ ಕಾರ್ಯವಿಧಾನ',
    pricing_premium_feature4: 'ಸುಧಾರಿತ ಏಕೀಕರಣಗಳು',
    pricing_premium_feature5: '6 ತಿಂಗಳ ಬೆಂಬಲ',
    pricing_premium_feature6: 'ಕಾರ್ಯಕ್ಷಮತೆ ಆಪ್ಟಿಮೈಸೇಶನ್',
    pricing_premium_feature7: 'ಆದ್ಯತೆಯ ಬೆಂಬಲ',

    pricing_custom_title: 'ಕಸ್ಟಮ್ ಯೋಜನೆಗಳು',
    pricing_custom_desc: 'ಅನನ್ಯ ಅಗತ್ಯಗಳಿಗೆ ಅನುಗುಣವಾದ ಪರಿಹಾರಗಳು',
    pricing_custom_feature1: 'ಕಸ್ಟಮ್ ಅಗತ್ಯಗಳು',
    pricing_custom_feature2: 'ಮೀಸಲಾದ ತಂಡ',
    pricing_custom_feature3: 'ಹೊಂದಿಕೊಳ್ಳುವ ಸಮಯರೇಖೆ',
    pricing_custom_feature4: 'ನಿರಂತರ ನಿರ್ವಹಣೆ',
    pricing_custom_feature5: 'ಸಂಪೂರ್ಣ ಯೋಜನೆ ಒಡೆತನ',

    contact_title: 'ಸಂಪರ್ಕದಲ್ಲಿರಿ',
    contact_subtitle: 'ಒಟ್ಟಾಗಿ ಅದ್ಭುತವಾದದ್ದನ್ನು ನಿರ್ಮಿಸೋಣ',
    contact_name: 'ಪೂರ್ಣ ಹೆಸರು',
    contact_email: 'ಇಮೇಲ್ ವಿಳಾಸ',
    contact_phone: 'ಫೋನ್ ಸಂಖ್ಯೆ',
    contact_service: 'ಆಸಕ್ತಿಯ ಸೇವೆ',
    contact_message: 'ಯೋಜನೆಯ ವಿವರಗಳು',
    contact_submit: 'ಸಂದೇಶ ಕಳುಹಿಸಿ',
    contact_sending: 'ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...',

    contact_service_web: 'ವೆಬ್ ವಿನ್ಯಾಸ',
    contact_service_ecommerce: 'ಇ-ಕಾಮರ್ಸ್',
    contact_service_webapp: 'ವೆಬ್ ಅಪ್ಲಿಕೇಶನ್',
    contact_service_redesign: 'ವೆಬ್‌ಸೈಟ್ ಮರುವಿನ್ಯಾಸ',
    contact_service_wordpress: 'ವರ್ಡ್‌ಪ್ರೆಸ್',
    contact_service_other: 'ಇತರೆ',

    contact_info_title: 'ಸಂಪರ್ಕ ಮಾಹಿತಿ',
    contact_info_email: 'hello@webvidha.com',
    contact_info_phone: '+91 98765 43210',
    contact_info_location: 'ಹೈದರಾಬಾದ್, ತೆಲಂಗಾಣ',

    footer_tagline: 'ಡಿಜಿಟಲ್ ಶ್ರೇಷ್ಠತೆಯನ್ನು ರೂಪಿಸುವುದು',
    footer_copyright: '© 2024 ವೆಬ್‌ವಿಧಾ. ಎಲ್ಲಾ ಹಕ್ಕುಗಳು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.',
    footer_services: 'ಸೇವೆಗಳು',
    footer_company: 'ಕಂಪನಿ',
    footer_about: 'ನಮ್ಮ ಬಗ್ಗೆ',
    footer_careers: 'ವೃತ್ತಿ',
    footer_blog: 'ಬ್ಲಾಗ್',

    trust_clients: 'ಸಂತೋಷಪಟ್ಟ ಗ್ರಾಹಕರು',
    trust_projects: 'ಪೂರ್ಣಗೊಂಡ ಯೋಜನೆಗಳು',
    trust_experience: 'ವರ್ಷಗಳ ಅನುಭವ',
    trust_satisfaction: 'ಗ್ರಾಹಕ ತೃಪ್ತಿ',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LANGUAGE_OPTIONS: { code: Language; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English',  nativeLabel: 'English' },
  { code: 'te', label: 'Telugu',   nativeLabel: 'తెలుగు' },
  { code: 'hi', label: 'Hindi',    nativeLabel: 'हिंदी' },
  { code: 'ta', label: 'Tamil',    nativeLabel: 'தமிழ்' },
  { code: 'kn', label: 'Kannada',  nativeLabel: 'ಕನ್ನಡ' },
];

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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