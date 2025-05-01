import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">Ready to Find Your Dream Property?</h2>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          Contact us today to speak with one of our expert agents and start your property journey with Samcom Properties Agency.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/properties">
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white text-primary hover:bg-gray-100 border-white"
            >
              Browse Properties
            </Button>
          </Link>
          <Link href="/contact">
            <Button 
              size="lg" 
              className="bg-secondary text-white hover:bg-yellow-600 border-none"
            >
              Contact Us Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
