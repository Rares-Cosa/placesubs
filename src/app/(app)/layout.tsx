import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Navbar />

      <main className="pb-32 md:pb-0">{children}</main>

      <MobileNav />
    </div>
  );
}