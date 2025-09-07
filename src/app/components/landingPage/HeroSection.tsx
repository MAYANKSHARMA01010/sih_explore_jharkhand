import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import heroImage from "../../../public/JHARKHAND_DUMMY.jpeg";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section showcasing Jharkhand tourism"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Scenic view of Jharkhand's Netarhat hills and lush green landscapes"
          fill
          priority
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 overlay-gradient"
          aria-hidden="true"
        ></div>
        <div
          className="absolute inset-0 bg-black/20"
          aria-hidden="true"
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <span className="text-sm font-medium">
              🌿 AI-Powered Tourism Platform
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl mb-6 leading-tight">
            Discover Jharkhand:
            <br />
            <span className="bg-gradient-to-r from-accent-light to-primary-light bg-clip-text text-transparent">
              Nature, Culture & Adventure
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl mb-8 text-white/90 leading-relaxed max-w-3xl mx-auto">
            Explore Jharkhand with Smart Travel
          </p>

          {/* Description */}
          <p className="text-lg mb-12 text-white/80 leading-relaxed max-w-2xl mx-auto">
            AI-powered itineraries, authentic cultural experiences, and
            sustainable eco-tourism — all in one platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              className="btn-hero group"
              aria-label="Plan your trip with AI assistance"
            >
              Plan Your Trip
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              className="btn-outline group"
              aria-label="Explore the travel marketplace"
            >
              Explore Marketplace
            </button>
            <button
              className="flex items-center px-6 py-3 text-white hover:text-accent-light transition-smooth font-medium"
              aria-label="Meet our local guides"
            >
              <Play className="mr-2 h-5 w-5" />
              Meet Our Guides
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { value: "50+", label: "Destinations" },
              { value: "1000+", label: "Local Guides" },
              { value: "24/7", label: "AI Support" },
              { value: "5★", label: "Experience" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="font-display font-bold text-3xl sm:text-4xl mb-2">
                  {stat.value}
                </div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        aria-hidden="true"
      >
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
