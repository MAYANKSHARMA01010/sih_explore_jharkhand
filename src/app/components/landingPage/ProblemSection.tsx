import { AlertTriangle, TrendingUp } from 'lucide-react';

const ProblemSection = () => {
  const challenges = [
    'Poor digital infrastructure',
    'Limited tourism outreach',
    'Low destination awareness',
    'Unorganized service providers',
    'Language barriers for tourists',
    'Lack of authentic experiences'
  ];

  const solutions = [
    'AI-powered smart platform',
    'Global digital presence',
    'Interactive destination discovery',
    'Verified guide network',
    'Multilingual AI chatbot',
    'Curated cultural experiences'
  ];

  return (
    <section className="py-20 px-4 sm:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl sm:text-5xl mb-6 text-black">
            The Challenge & Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-600">
              Solution
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Jharkhand boasts incredible natural beauty, rich tribal culture, and historic landmarks. 
            But tourism remains underdeveloped due to systemic challenges.
          </p>
        </div>

        {/* Two Columns */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Current Challenges */}
          <div className="space-y-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="font-display font-bold text-2xl text-gray-800">Current Challenges</h3>
            </div>
            
            <div className="space-y-4">
              {challenges.map((challenge, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-red-50 border border-red-300 rounded-lg 
                             hover:bg-red-100 hover:border-red-500 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-800 font-medium">{challenge}</p>
                </div>
              ))}
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
              <h4 className="font-semibold text-lg mb-3 text-gray-900">The Reality</h4>
              <p className="text-gray-600 leading-relaxed">
                Despite having attractions like Netarhat Hills, Hundru Falls, Betla National Park, 
                and Deoghar Temple, Jharkhand receives fewer tourists compared to neighboring states.
              </p>
            </div>
          </div>

          {/* Our Solution */}
          <div className="space-y-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-700 rounded-lg flex items-center justify-center mr-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-display font-bold text-2xl text-gray-800">Our Solution</h3>
            </div>
            
            <div className="space-y-4">
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-green-50 border border-green-300 rounded-lg 
                             hover:bg-green-100 hover:border-green-600 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-800 font-medium">{solution}</p>
                </div>
              ))}
            </div>

            <div className="border border-green-700 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 
                            bg-gradient-to-r from-green-500 to-green-700 text-white">
              <h4 className="font-semibold text-lg mb-3">The Future</h4>
              <p className="text-white/90 leading-relaxed">
                Through technology and community empowerment, we are creating a sustainable tourism 
                ecosystem that benefits both visitors and local communities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
