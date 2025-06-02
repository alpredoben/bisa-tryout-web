import { Footer, TopNavbar } from "../../layouts/landing";
import {
  HeroSection,
  Features,
  CTA,
  Testimonials,
  ListProducts,
} from "../../components/landing";

import { PageMeta } from "../../components/common/PageMeta";

const LandingPage = () => {
  return (
    <>
      <PageMeta title="BISA Tryout | Beranda" description="This is about landing page - Beranda" />
      <div className="min-h-screen flex flex-col">
        {/* Navbar di atas */}
        <TopNavbar />

        {/* Konten utama */}
        <div className="flex-grow">
          <HeroSection />
          <Features />
          <Testimonials />
          <ListProducts />
          <CTA />
        </div>

        {/* Footer di bawah */}
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
