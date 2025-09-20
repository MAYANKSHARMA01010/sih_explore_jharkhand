"use client";

import { Users, ShoppingBag, Play } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="section-padding relative overflow-hidden 
      bg-gradient-to-br from-emerald-800 via-emerald-600 to-cyan-700">
      
      {/* Floating Background Orbs */}
      <div className="absolute inset-0 opacity-20">
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }} 
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
        />
        <motion.div 
          animate={{ y: [0, 25, 0], x: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-56 h-56 bg-white/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container-responsive relative z-10 py-20">
        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-center text-white mb-16"
        >
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight">
            Plan Your Next Trip with{" "}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              Johar
            </span>
          </h2>
          <motion.div 
            initial={{ scaleX: 0 }} 
            animate={{ scaleX: 1 }} 
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-28 h-1 bg-white/70 mx-auto mb-6 origin-left rounded-full"
          />
          <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
            Smart · Authentic · Sustainable
          </p>
        </motion.div>

        {/* Main CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
          <Link href="/register">
            <motion.button 
              whileHover={{ scale: 1.08 }} 
              whileTap={{ scale: 0.95 }}
              className="bg-white text-teal-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg 
                        hover:shadow-cyan-200/50 transition-all duration-300 flex items-center group"
            >
              Join as User
              <Play className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
          
          <Link href="/register">
            <motion.button 
              whileHover={{ scale: 1.08 }} 
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg 
                        hover:bg-white/10 backdrop-blur-sm transition-all duration-300 flex items-center group"
            >
              Join as Local Guide
              <Users className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
          
          <Link href="/register">
            <motion.button 
              whileHover={{ scale: 1.08 }} 
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white/70 text-white hover:bg-white/10 px-8 py-4 rounded-xl 
                        font-semibold text-lg backdrop-blur-sm transition-all duration-300 flex items-center group"
            >
              Sell Your Handicrafts
              <ShoppingBag className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
