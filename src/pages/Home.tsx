import HeroSection from '@/components/landing/HeroSection';
import HowItWorks from '@/components/landing/HowItWorks';
import Testimonials from '@/components/landing/Testimonials';
import CTABanner from '@/components/landing/CTABanner';
import Navbar from '@/components/navbar/Navbar';
import FeaturesSection from '@/components/landing/FeatureSection';
import Footer from '@/components/footer/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Home;
