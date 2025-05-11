import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Target, Award, Zap } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface HomePageProps {
  onStartPracticing: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartPracticing }) => {
  const benefits = [
    {
      icon: <Brain className="h-8 w-8 text-indigo-500" />,
      title: "Real-time Voice Feedback",
      description: "Get instant, AI-powered feedback on your interview responses as you speak."
    },
    {
      icon: <Target className="h-8 w-8 text-indigo-500" />,
      title: "Company-Specific Questions",
      description: "Practice with questions tailored to top Indian tech companies."
    },
    {
      icon: <Zap className="h-8 w-8 text-indigo-500" />,
      title: "Adaptive Difficulty",
      description: "Questions adjust based on your performance for optimal learning."
    },
    {
      icon: <Award className="h-8 w-8 text-indigo-500" />,
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

  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-slate-900">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative overflow-hidden px-4 pt-16 sm:px-6 lg:px-8"
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="mx-auto max-w-7xl">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <motion.div 
              className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left"
              variants={containerVariants}
            >
              <motion.h1 
                className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
                variants={textVariants}
              >
                <motion.span 
                  className="block"
                  variants={textVariants}
                >
                  Your Private
                </motion.span>
                <motion.span 
                  className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                  variants={textVariants}
                >
                  AI Interview Coach
                </motion.span>
              </motion.h1>
              <motion.p 
                className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
                variants={textVariants}
              >
                Practice product management interviews with real-time AI feedback. 
                Get company-specific questions and detailed performance analysis.
              </motion.p>
              <motion.div 
                className="mt-8 sm:mx-auto sm:max-w-lg sm:text-center lg:mx-0 lg:text-left"
                variants={textVariants}
              >
                <motion.button
                  onClick={onStartPracticing}
                  className="inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 text-base font-medium text-white shadow-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Practicing
                  <ArrowRight className="ml-3 h-5 w-5" />
                </motion.button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center"
              variants={textVariants}
            >
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full overflow-hidden rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <img 
                    className="w-full rounded-lg"
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
        className="mt-32 overflow-hidden py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              Three simple steps to improve your interview performance
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  className="relative rounded-2xl bg-slate-800/50 p-8 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="absolute -top-4 left-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                    {step.number}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-gray-300">{step.description}</p>
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
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Why Choose Us
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              Everything you need to ace your next PM interview
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  className="relative rounded-2xl bg-slate-800/50 p-8 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-white">{benefit.title}</h3>
                  <p className="mt-2 text-gray-300">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Success Metrics */}
      <motion.section 
        className="mt-32 py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Proven Results
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
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
                className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-8 text-center backdrop-blur-sm"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold text-indigo-400">{metric.value}</div>
                <div className="mt-2 text-sm text-gray-300">{metric.label}</div>
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
          className="flex items-center space-x-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 text-white shadow-lg hover:from-indigo-600 hover:to-purple-700"
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