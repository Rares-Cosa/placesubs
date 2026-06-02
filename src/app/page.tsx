import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
    </main>
  );
}