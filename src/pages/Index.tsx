
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import About from '@/components/sections/About';
import FeaturedContent from '@/components/sections/FeaturedContent';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <About />
        <FeaturedContent />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
