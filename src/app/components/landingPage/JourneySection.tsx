import React from "react";
import { motion } from "framer-motion";

const JourneySection = () => {
  const steps = [
    {
      icon: "🔍",
      title: "Enter Preferences",
      description: "Tell us your budget, duration, and interests",
      details: ["Adventure or relaxation", "Cultural or nature focus", "Group size and budget", "Accessibility needs"],
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: "🗺️",
      title: "Get Personalized Itinerary",
      description: "AI creates your perfect trip plan",
      details: ["Optimized routes", "Local hidden gems", "Best timing for activities", "Weather considerations"],
      color: "from-green-500 to-lime-500"
    },
    {
      icon: "💬",
      title: "Chatbot Support",
      description: "24/7 assistance during your journey",
      details: ["Real-time help", "Language translation", "Emergency contacts", "Local recommendations"],
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: "📅",
      title: "Book Everything",
      description: "Guides, transport, and homestays in one place",
      details: ["Verified local guides", "Transport arrangements", "Authentic homestays", "Cultural activities"],
      color: "from-pink-500 to-purple-500"
    },
    {
      icon: "📸",
      title: "Explore with AR/VR",
      description: "Enhanced experiences at destinations",
      details: ["AR historical overlays", "Virtual nature tours", "Cultural storytelling", "Photo opportunities"],
      color: "from-violet-500 to-indigo-500"
    },
    {
      icon: "⭐",
      title: "Share & Review",
      description: "Help improve experiences for future travelers",
      details: ["Rate your guides", "Photo sharing", "Feedback collection", "Community building"],
      color: "from-red-500 to-pink-500"
    }
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          className="text-4xl font-extrabold text-gray-900 mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Your Journey with{" "}
          <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
            Explore Jharkhand
          </span>
        </motion.h2>

        <motion.p
          className="text-gray-600 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          From planning to memories, we guide you through every step of your Jharkhand
          adventure with personalized AI assistance and local expertise.
        </motion.p>

        {/* Timeline */}
        <div className="relative">
        {/* Center Line */}
        <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gray-200"></div>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`relative mb-20 flex flex-col lg:flex-row items-center ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-10`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Card */}
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                className="w-full lg:w-5/12 p-8 rounded-2xl bg-white backdrop-blur-md 
                           border border-gray-200 shadow-md hover:shadow-2xl hover:border-green-400 
                           transition-all duration-300 text-left relative"
              >
                {/* Step Number */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-full 
                               bg-gradient-to-r from-green-500 to-emerald-600 
                               text-white font-bold shadow-md"
                  >
                    {index + 1}
                  </div>
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-lg 
                                bg-gradient-to-r ${step.color} text-white text-2xl shadow-md`}
                  >
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-4">{step.description}</p>

                <ul className="grid grid-cols-2 gap-x-4 text-gray-700 text-sm space-y-1">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-green-500">✔</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Big Icon */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-full lg:w-5/12 flex justify-center"
              >
                <div
                  className={`w-44 h-32 rounded-xl bg-gradient-to-r ${step.color} 
                              flex items-center justify-center text-white text-5xl shadow-lg`}
                >
                  {step.icon}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all">
            🚀 Begin Your Adventure
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default JourneySection;
