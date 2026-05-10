import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, ArrowRight, Shield, Zap, Sparkles } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    
    // Save initial profile
    const initialProfile = {
      name: formData.name,
      username: `@${formData.name.toLowerCase().replace(/\s/g, '_')}`,
      email: formData.email,
      bio: 'Futuristic content creator. Ready for the Quest!',
      avatar: 'https://i.pravatar.cc/150?img=11',
      website: '',
      twitter: '',
      instagram: ''
    };
    
    localStorage.setItem('creator_profile', JSON.stringify(initialProfile));
    localStorage.setItem('is_logged_in', 'true');
    localStorage.setItem('show_onboarding', 'true');
    onLogin();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#0B0F19] flex items-center justify-center overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-purple-600/20 rounded-full blur-[150px]" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-emerald-600/20 rounded-full blur-[150px]" />

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md px-6 relative z-10"
      >
        <div className="glass-panel p-8 md:p-10 border-white/5 bg-white/5 backdrop-blur-3xl shadow-[0_0_50px_rgba(139,92,246,0.1)]">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#10B981] flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.5)] mb-6">
              <Brain className="text-white w-10 h-10" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">CreatorQuest AI</h1>
            <p className="text-gray-400 text-center text-sm">Step into the future of digital content creation.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest ml-1">Your Full Name</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter your name"
                className="w-full bg-[#0B0F19] border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-[#8B5CF6] transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest ml-1">Email Address</label>
              <input 
                required
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="master@creatorquest.ai"
                className="w-full bg-[#0B0F19] border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-[#8B5CF6] transition-all outline-none"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white py-4 rounded-2xl font-black text-sm tracking-widest uppercase flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all group"
            >
              Start My Quest
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 flex justify-center gap-6">
            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase">
              <Shield className="w-3 h-3 text-[#10B981]" /> Encrypted
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase">
              <Zap className="w-3 h-3 text-[#F59E0B]" /> High Speed
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase">
              <Sparkles className="w-3 h-3 text-[#8B5CF6]" /> AI Powered
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
