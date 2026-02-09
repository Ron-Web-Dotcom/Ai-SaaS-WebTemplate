import AnnouncementBar from './components/AnnouncementBar';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Features from './components/Features';
import ProductExplainer from './components/ProductExplainer';
import UseCases from './components/UseCases';
import Benefits from './components/Benefits';
import Integrations from './components/Integrations';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Navigation />
      <main>
        <Hero />
        <SocialProof />
        <Features />
        <ProductExplainer />
        <UseCases />
        <Benefits />
        <Integrations />
        <Pricing />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
