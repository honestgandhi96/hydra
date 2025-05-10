import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Target, Award, Zap } from 'lucide-react';

interface HomePageProps {
  onStartPracticing: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartPracticing }) => {
  const benefits = [
    {
      icon: <Brain className="h-8 w-8 text-purple-600" />,
      title: "Real-time Voice Feedback",
      description: "Get instant, AI-powered feedback on your interview responses as you speak."
    },
    {
      icon: <Target className="h-8 w-8 text-purple-600" />,
      title: "Company-Specific Questions",
      description: "Practice with questions tailored to top Indian tech companies."
    },
    {
      icon: <Zap className="h-8 w-8 text-purple-600" />,
      title: "Adaptive Difficulty",
      description: "Questions adjust based on your performance for optimal learning."
    },
    {
      icon: <Award className="h-8 w-8 text-purple-600" />,
      title: "Detailed Rubric",
      description: "Get scored on communication, technical depth, and problem-solving."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Choose Company",
      description: "Select from our curated list of top tech companies"
    },
    {
      number: "02",
      title: "Take Interview",
      description: "Answer PM questions with voice responses"
    },
    {
      number: "03",
      title: "Get AI Feedback",
      description: "Receive instant, detailed feedback"
    }
  ];

  const metrics = [
    { value: "10,000+", label: "Interviews Conducted" },
    { value: "85%", label: "Avg. Confidence Gain" },
    { value: "500+", label: "Offers Landed" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-teal-50">
      {/* Hero Section */}
      <motion.section 
        className="relative overflow-hidden px-4 pt-16 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <motion.div 
              className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Your Private</span>
                <span className="block bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
                  AI Interview Coach
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Practice product management interviews with real-time AI feedback. 
                Get company-specific questions and detailed performance analysis.
              </p>
              <div className="mt-8 sm:mx-auto sm:max-w-lg sm:text-center lg:mx-0 lg:text-left">
                <motion.button
                  onClick={onStartPracticing}
                  className="inline-flex items-center rounded-lg bg-purple-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Practicing
                  <ArrowRight className="ml-3 h-5 w-5" />
                </motion.button>
              </div>
            </motion.div>
            <motion.div 
              className="relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full overflow-hidden rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                  <img 
                    className="w-full"
                    src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
                    alt="Product screenshot"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section 
        className="mt-32 overflow-hidden bg-white py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Three simple steps to improve your interview performance
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  className="relative rounded-2xl bg-white p-8 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute -top-4 left-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white">
                    {step.number}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Benefits Grid */}
      <motion.section 
        className="mt-32 overflow-hidden py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose Us
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Everything you need to ace your next PM interview
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  className="relative rounded-2xl bg-white p-8 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900">{benefit.title}</h3>
                  <p className="mt-2 text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Success Metrics */}
      <motion.section 
        className="mt-32 bg-white py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Proven Results
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Join thousands who've improved their interview performance
            </p>
          </div>
          <motion.div 
            className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                className="flex flex-col items-center justify-center rounded-2xl bg-purple-50 p-8 text-center"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
              >
                <div className="text-4xl font-bold text-purple-600">{metric.value}</div>
                <div className="mt-2 text-sm text-gray-600">{metric.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Floating CTA Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.button
          onClick={onStartPracticing}
          className="flex items-center space-x-2 rounded-full bg-purple-600 px-6 py-3 text-white shadow-lg hover:bg-purple-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Start Now</span>
          <ArrowRight className="h-5 w-5" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default HomePage;