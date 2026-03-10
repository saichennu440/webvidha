import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdPopup from './components/AdPopup';
import SplashScreen from './components/SplashScreen';
import FloatingCTA from './components/FloatingCTA';
function App() {
  const [splashDone, setSplashDone] = useState(false);
  
  return (
    <div className="min-h-screen">
       {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      <Header />
      <Hero />
      <Services />
      <Portfolio />
      <Testimonials />
      <Pricing />
      <Contact />
      <Footer />
      <AdPopup />
      <FloatingCTA />
    </div>
  );
}

export default App;
