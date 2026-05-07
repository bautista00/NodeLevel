import Nav from "@/components/Nav";
import HeroExpand from "@/components/HeroExpand";
import Ticker from "@/components/Ticker";
import Manifiesto from "@/components/Manifiesto";
import SolucionUnificada from "@/components/SolucionUnificada";
import Verificacion from "@/components/Verificacion";
import Membresias from "@/components/Membresias";
import Faq from "@/components/Faq";
import CtaFinal from "@/components/CtaFinal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <HeroExpand />
      <Ticker />
      <Manifiesto />
      <SolucionUnificada />
      <Verificacion />
      <Membresias />
      <Faq />
      <CtaFinal />
      <Footer />
    </main>
  );
}
