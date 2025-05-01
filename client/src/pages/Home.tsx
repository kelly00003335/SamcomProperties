import Hero from "@/components/home/Hero";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import Services from "@/components/home/Services";
import AboutUs from "@/components/home/AboutUs";
import Testimonials from "@/components/home/Testimonials";
import AgentProfiles from "@/components/home/AgentProfiles";
import CallToAction from "@/components/home/CallToAction";
import ContactSection from "@/components/home/ContactSection";
import LocationMap from "@/components/home/LocationMap";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <Services />
      <AboutUs />
      <Testimonials />
      <AgentProfiles />
      <CallToAction />
      <ContactSection />
      <LocationMap />
    </>
  );
};

export default Home;
