import { useEffect, useState } from 'react';
import Hero from '@/react-app/components/Hero';
import Stats from '@/react-app/components/Stats';
import GymShowcase from '@/react-app/components/GymShowcase';
import Equipment from '@/react-app/components/Equipment';
import Trainers from '@/react-app/components/Trainers';
import Membership from '@/react-app/components/Membership';
import Programs from '@/react-app/components/Programs';
import Testimonials from '@/react-app/components/Testimonials';
import Contact from '@/react-app/components/Contact';
import Navigation from '@/react-app/components/Navigation';
import Footer from '@/react-app/components/Footer';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-black">
      <Navigation />
      <Hero scrollY={scrollY} />
      <Stats />
      <GymShowcase scrollY={scrollY} />
      <Equipment />
      <Trainers />
      <Programs />
      <Membership />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
