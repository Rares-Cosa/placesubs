import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import ProductShowcase from "@/components/landing/ProductShowcase";
import Pricing from "@/components/landing/Pricing";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ProductShowcase />
      <Pricing />
    </main>
  );
}