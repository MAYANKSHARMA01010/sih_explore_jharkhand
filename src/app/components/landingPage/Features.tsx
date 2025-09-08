import { motion } from "framer-motion";

export default function SmartTechnology() {
  const features = [
    {
      icon: "🤖",
      title: "AI-Based Itinerary Planner",
      desc: "Smart trip planning powered by machine learning algorithms that create personalized travel experiences based on your preferences, budget, and duration.",
    },
    {
      icon: "💬",
      title: "Multilingual Chatbot",
      desc: "24/7 tourist assistance in English, Hindi, and tribal dialects. Get instant answers about destinations, bookings, and local customs.",
    },
    {
      icon: "🛡️",
      title: "Secure Verification System",
      desc: "Blockchain-inspired guide verification and local provider certification with digital badges for trust and authenticity.",
    },
    {
      icon: "🗺️",
      title: "Interactive Maps & AR/VR",
      desc: "Virtual tours of destinations with augmented reality previews, helping you explore before you visit.",
    },
    {
      icon: "📍",
      title: "Real-Time Transport Info",
      desc: "Live updates on local buses, trains, and routes with GPS tracking and estimated arrival times.",
    },
    {
      icon: "🛍️",
      title: "Local Marketplace",
      desc: "Integrated platform for tribal handicrafts, eco-homestays, and cultural events with direct community support.",
    },
    {
      icon: "📊",
      title: "AI-Driven Analytics",
      desc: "Sentiment analysis and feedback processing to continuously improve services and tourist experiences.",
    },
    {
      icon: "📈",
      title: "Tourism Dashboard",
      desc: "Analytics dashboard for officials to monitor trends, revenue impact, and visitor footfall with actionable insights.",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-gray-50 to-white">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Powered by{" "}
          <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
            Smart Technology
          </span>
        </h2>
        <p className="mt-6 text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          Our comprehensive platform combines artificial intelligence,
          community empowerment, and sustainable tourism practices to
          revolutionize travel in Jharkhand.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8, scale: 1.03 }}
            className="p-8 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all border border-gray-100"
          >
            <div className="text-4xl mb-5">{feature.icon}</div>
            <h3 className="font-semibold text-xl text-gray-900">
              {feature.title}
            </h3>
            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Buttons */}
      <div className="text-center mt-16">
        <p className="text-sm text-gray-500 mb-5 tracking-wide uppercase">
          ✨ Experience the Future of Tourism
        </p>
        <div className="flex justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-xl bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition-all"
          >
            Try Our AI Planner
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-xl bg-gray-900 text-white font-semibold shadow-md hover:bg-gray-800 transition-all"
          >
            Watch Demo
          </motion.button>
        </div>
      </div>
    </section>
  );
}
