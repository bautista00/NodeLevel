import Nav from "@/components/Nav";
import HeroScrub from "@/components/HeroScrub";
import Ticker from "@/components/Ticker";
import Problema from "@/components/Problema";
import Pilares from "@/components/Pilares";
import Verificacion from "@/components/Verificacion";
import Manifiesto from "@/components/Manifiesto";
import Membresias from "@/components/Membresias";
import Faq from "@/components/Faq";
import CtaFinal from "@/components/CtaFinal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <HeroScrub />
      <Ticker />
      <Problema />
      <Pilares />
      <Verificacion />
      <Manifiesto />
      <Membresias />
      <Faq />
      <CtaFinal />
      <Footer />
    </main>
  );
}
