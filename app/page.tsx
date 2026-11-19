import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Education from '@/components/Education';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Marquee from '@/components/Marquee';
import ScrollProgress from '@/components/ScrollProgress';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <WhatsAppButton />
      <main>
        <Hero />
        <Marquee row={0} />
        <About />
        <Projects />
        <Marquee row={1} reverse />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
