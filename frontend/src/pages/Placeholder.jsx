import React from 'react';
import { motion } from 'framer-motion';

const Placeholder = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-full text-center p-10">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="glass-panel p-12 max-w-lg"
    >
      <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-[#8B5CF6] to-[#10B981] rounded-lg animate-pulse" />
      </div>
      <h2 className="text-3xl font-bold mb-4 text-white">{title}</h2>
      <p className="text-gray-400 mb-8 leading-relaxed">
        This section is currently being optimized by **Quest AI**. 
        New futuristic creator tools will be available here soon!
      </p>
      <div className="w-24 h-1 bg-gradient-to-r from-[#8B5CF6] to-[#10B981] mx-auto rounded-full" />
    </motion.div>
  </div>
);

export default Placeholder;
