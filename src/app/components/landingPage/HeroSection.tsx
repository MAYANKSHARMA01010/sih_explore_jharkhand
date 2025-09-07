import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import heroImage from "../../../public/heroImage.jpg";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-24 flex items-center justify-center overflow-hidden bg-transparent"
      aria-label="Hero section showcasing Jharkhand tourism"
    >
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={heroImage}
          alt="Scenic view of Jharkhand's Netarhat hills and lush green landscapes"
          fill
          priority
          className="object-cover object-center animate-image-zoom"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-brightness-75"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-responsive section-padding text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-2 rounded-full bg-emerald-600/20 text-emerald-300 border border-emerald-500/50 backdrop-blur-sm mb-6 animate-fade-in-down transition-all duration-300 hover:scale-105 hover:bg-emerald-500/30">
            <span className="text-sm font-semibold tracking-wide">
              🌿 AI-Powered Tourism Platform
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl mb-4 leading-tight drop-shadow-lg animate-fade-in-up">
            Discover Jharkhand:
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-400 to-lime-300 hover:animate-text-glow transition-all duration-500">
              Nature, Culture & Adventure
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl mb-6 text-gray-200 leading-relaxed max-w-3xl mx-auto animate-fade-in-up-delay-1">
            Explore Jharkhand with Smart Travel
          </p>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl mb-10 text-gray-300 leading-relaxed max-w-2xl mx-auto animate-fade-in-up-delay-2">
            AI-powered itineraries, authentic cultural experiences, and sustainable eco-tourism — all in one platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-5 justify-center items-center mb-12 animate-fade-in-up-delay-3">
            <a
              href="#plan"
              className="group inline-flex items-center px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 transform-gpu
                bg-emerald-600 text-white shadow-lg hover:scale-105 hover:bg-emerald-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-50"
              aria-label="Plan your trip with AI assistance"
            >
              Plan Your Trip
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#marketplace"
              className="group inline-flex items-center px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 transform-gpu
                border-2 border-emerald-500 text-emerald-300 hover:text-white hover:bg-emerald-600 hover:border-emerald-600 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-50"
              aria-label="Explore the travel marketplace"
            >
              Explore Marketplace
            </a>
            <a
              href="#guides"
              className="flex items-center px-6 py-3 text-gray-200 hover:text-emerald-400 transition-colors font-medium"
              aria-label="Meet our local guides"
            >
              <Play className="mr-2 h-5 w-5 fill-current animate-bounce" />
              Meet Our Guides
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl mx-auto border-t border-gray-700/50 pt-8 sm:pt-12 animate-fade-in-up-delay-4">
            {[
              { value: "50+", label: "Destinations" },
              { value: "1000+", label: "Local Guides" },
              { value: "24/7", label: "AI Support" },
              { value: "5★", label: "Experience" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="font-display font-bold text-3xl sm:text-4xl mb-2 text-teal-300 drop-shadow-md animate-pulse-fade group-hover:text-emerald-400">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
