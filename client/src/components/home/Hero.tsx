import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import PropertySearch from "@/components/properties/PropertySearch";
import { getHeroImages } from "@/lib/images";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = getHeroImages();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative bg-neutral-light">
      <div className="h-[600px] overflow-hidden">
        <div id="hero-slider" className="relative h-full">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`slide absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <img 
                src={slide.image} 
                alt={slide.alt} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-heading">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl text-white mb-6">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href={slide.primaryLink}>
                        <Button size="lg" className="bg-[#1A237E] hover:bg-[#0D1642] text-white transition duration-300">
                          {slide.primaryText}
                        </Button>
                      </Link>
                      <Link href={slide.secondaryLink}>
                        <Button size="lg" variant="outline" className="border-[#1A237E] text-[#1A237E] hover:bg-[#1A237E] hover:text-white transition duration-300">
                          {slide.secondaryText}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Controls */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full bg-white ${
              index === currentSlide ? "opacity-100" : "opacity-50"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Property Search Form */}
      <div className="container mx-auto px-4 relative -mt-16 z-10">
        <PropertySearch />
      </div>
    </section>
  );
};

export default Hero;