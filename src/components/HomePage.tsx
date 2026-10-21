import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import SocialProof from "@/components/SocialProof";

/** La página es la misma en los dos idiomas; los textos llegan por contexto. */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <About />
        <SocialProof />
      </main>
      <Footer />
    </>
  );
}
