import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import SocialProof from "@/components/SocialProof";

/** La página es la misma en los dos idiomas; los textos llegan por contexto. */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="bg-ink">
        <Hero />
        <Projects />
        <Services />
        <About />
        <SocialProof />
      </main>
      <Footer />
    </>
  );
}
