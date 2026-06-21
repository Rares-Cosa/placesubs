import LandingNavbar from "@/components/landing/LandingNavbar";
import Hero from "@/components/landing/Hero";
import ProductShowcase from "@/components/landing/ProductShowcase";
import Pricing from "@/components/landing/Pricing";
import About from "@/components/landing/About";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <LandingNavbar />
      <Hero />
      <ProductShowcase />
      <Pricing />
      <About />
    </main>
  );
}