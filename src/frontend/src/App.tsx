import { Toaster } from "@/components/ui/sonner";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import SectorsSection from "./components/SectorsSection";
import AdminPage from "./pages/AdminPage";

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SectorsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const isAdmin =
    typeof window !== "undefined" && window.location.pathname === "/admin";

  return (
    <>
      {isAdmin ? <AdminPage /> : <HomePage />}
      <Toaster richColors theme="dark" />
    </>
  );
}
