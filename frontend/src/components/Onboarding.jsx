import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, LayoutDashboard, CheckCircle, Video, Wallet, Sparkles, X, ChevronRight } from 'lucide-react';

const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Welcome to CreatorQuest!",
      description: "You've just unlocked the future of content strategy. Let's take a quick tour of your new digital headquarters.",
      icon: Sparkles,
      color: "text-[#8B5CF6]"
    },
    {
      title: "The Main Dashboard",
      description: "Monitor your overall channel health, productivity scores, and earnings at a single glance with our glassmorphism widgets.",
      icon: LayoutDashboard,
      color: "text-[#3B82F6]"
    },
    {
      title: "Daily Quests",
      description: "Level up your life by completing personalized daily tasks. Earn XP and unlock powerful creator tools as you grow.",
      icon: CheckCircle,
      color: "text-[#10B981]"
    },
    {
      title: "Quest AI Bot",
      description: "Our online AI strategist is always ready to analyze your metrics and give you the competitive edge you need.",
      icon: Brain,
      color: "text-[#8B5CF6]"
    },
    {
      title: "Money Tracker",
      description: "Take full control of your finances. Manually track sponsorships, AdSense, and gear expenses with built-in analytics.",
      icon: Wallet,
      color: "text-[#F59E0B]"
    },
    {
      title: "Ready to Start?",
      description: "The world is waiting for your content. Your quest begins now!",
      icon: Video,
      color: "text-[#10B981]"
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const Icon = steps[step].icon;

  return (
    <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center px-6">
      <motion.div 
        key={step}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg glass-panel p-10 relative overflow-hidden"
      >
        {/* Step Indicator */}
        <div className="absolute top-0 left-0 h-1 bg-[#8B5CF6] transition-all duration-500" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        
        <button 
          onClick={onComplete}
          className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className={`w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-8 ${steps[step].color}`}>
            <Icon className="w-10 h-10" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">{steps[step].title}</h2>
          <p className="text-gray-400 leading-relaxed mb-10">
            {steps[step].description}
          </p>

          <div className="flex flex-col w-full gap-4">
            <button 
              onClick={handleNext}
              className="w-full bg-[#8B5CF6] hover:bg-[#8B5CF6]/80 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)]"
            >
              {step === steps.length - 1 ? "Launch My Dashboard" : "Next Chapter"}
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="flex justify-center gap-2">
              {steps.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-[#8B5CF6]' : 'w-2 bg-white/10'}`} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Onboarding;
