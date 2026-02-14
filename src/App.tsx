import { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import { supabase } from './lib/supabase';
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
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  const checkAdminStatus = async () => {
    if (!user) {
      setCheckingAdmin(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin, status')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data?.is_admin && data?.status === 'active') {
        const urlParams = new URLSearchParams(window.location.search);
        const isAdminRoute = urlParams.get('admin') === 'true';
        setIsAdmin(isAdminRoute);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    } finally {
      setCheckingAdmin(false);
    }
  };

  useEffect(() => {
    checkAdminStatus();
  }, [user]);

  if (loading || checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    if (isAdmin) {
      return <AdminDashboard />;
    }
    return <Dashboard />;
  }

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
