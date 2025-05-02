import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="bg-[#1A237E] py-16 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Dream Property?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Let us help you find the perfect property that meets all your requirements and preferences.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="bg-[#FFD700] text-[#212121] hover:bg-[#E6C200]">
            Browse Properties
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#1A237E]">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;