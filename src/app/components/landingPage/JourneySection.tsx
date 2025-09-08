import React from "react";

const JourneySection = () => {
  const steps = [
    {
      icon: "🔍",
      title: "Enter Preferences",
      description: "Tell us your budget, duration, and interests",
      details: ["Adventure or relaxation", "Cultural or nature focus", "Group size and budget", "Accessibility needs"],
      color: "from-cyan-400 to-blue-500"
    },
    {
      icon: "🗺️",
      title: "Get Personalized Itinerary",
      description: "AI creates your perfect trip plan",
      details: ["Optimized routes", "Local hidden gems", "Best timing for activities", "Weather considerations"],
      color: "from-green-400 to-lime-500"
    },
    {
      icon: "💬",
      title: "Chatbot Support",
      description: "24/7 assistance during your journey",
      details: ["Real-time help", "Language translation", "Emergency contacts", "Local recommendations"],
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: "📅",
      title: "Book Everything",
      description: "Guides, transport, and homestays in one place",
      details: ["Verified local guides", "Transport arrangements", "Authentic homestays", "Cultural activities"],
      color: "from-pink-400 to-purple-500"
    },
    {
      icon: "📸",
      title: "Explore with AR/VR",
      description: "Enhanced experiences at destinations",
      details: ["AR historical overlays", "Virtual nature tours", "Cultural storytelling", "Photo opportunities"],
      color: "from-violet-400 to-indigo-500"
    },
    {
      icon: "⭐",
      title: "Share & Review",
      description: "Help improve experiences for future travelers",
      details: ["Rate your guides", "Photo sharing", "Feedback collection", "Community building"],
      color: "from-red-400 to-pink-500"
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Your Journey with <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">Explore Jharkhand</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          From planning to memories, we guide you through every step of your Jharkhand adventure with personalized AI assistance and local expertise.
        </p>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 via-blue-400 to-pink-400"></div>

          {/* Timeline items */}
          {steps.map((step, index) => (
            <div key={index} className={`mb-10 flex ${index % 2 === 0 ? "justify-start" : "justify-end"} w-full relative`}>
              <div className={`w-5/12 p-6 rounded-xl shadow-xl bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}>
                <div className={`w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r ${step.color} text-white text-2xl mb-4 mx-auto`}>{step.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Step {index + 1}: {step.title}</h3>
                <p className="text-gray-600 mb-3">{step.description}</p>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 text-left">
                  {step.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:scale-105 transition-all shadow-lg">
            Begin Your Adventure
          </button>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
