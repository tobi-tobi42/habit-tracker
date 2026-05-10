import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Send, Sparkles, Zap, Lightbulb, MessageSquare } from 'lucide-react';

const QuestAI = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am Quest AI, your dedicated creator strategist. I am currently online and ready to analyze your latest metrics. What’s on your mind?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response with typing delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Analyzing "${input}"... My recommendation: focus on your retention rate in the first 30 seconds of your next video. Based on your recent data, a faster intro could increase watch time by 20%.` 
      }]);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.4)]">
              <Brain className="text-white w-6 h-6" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#10B981] rounded-full border-2 border-[#0B0F19] animate-pulse shadow-[0_0_10px_#10B981]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              Quest AI Bot <span className="text-[10px] bg-[#10B981]/10 text-[#10B981] px-2 py-0.5 rounded-full border border-[#10B981]/20 uppercase tracking-widest font-black">Online</span>
            </h1>
            <p className="text-xs text-gray-400">Senior Growth Strategist • Always Learning</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 overflow-hidden">
        <div className="lg:col-span-3 glass-panel flex flex-col overflow-hidden relative">
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
            <AnimatePresence mode='popLayout'>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-2xl shadow-xl ${
                    msg.role === 'user' 
                    ? 'bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] text-white rounded-tr-none' 
                    : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none backdrop-blur-md'
                  }`}>
                    <p className="text-sm leading-relaxed font-medium">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex gap-1">
                    <span className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="p-4 border-t border-white/5 bg-white/5">
            <div className="flex gap-4">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about your analytics, content ideas, or productivity..." 
                className="flex-1 bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#8B5CF6] transition-all"
              />
              <button 
                onClick={handleSend}
                className="bg-[#8B5CF6] hover:bg-[#8B5CF6]/80 text-white p-3 rounded-xl transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex flex-col gap-6">
          <div className="glass-panel p-6 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#F59E0B]" /> Quick Insights
            </h3>
            <div className="space-y-4">
              {[
                { icon: Lightbulb, text: 'Title Idea: "How I grew 10k subs in 30 days"' },
                { icon: MessageSquare, text: 'Your audience loves tech reviews.' },
                { icon: Brain, text: 'Optimize post time for 7 PM.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-3 text-xs text-gray-400 bg-white/5 p-3 rounded-lg border border-white/5">
                  <item.icon className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass-panel p-6 bg-gradient-to-br from-[#10B981]/10 to-transparent">
            <h3 className="text-lg font-bold text-white mb-2">Coach Pro</h3>
            <p className="text-xs text-gray-400 mb-4">Unlock deep video analysis and real-time competitor tracking.</p>
            <button className="w-full py-2 bg-[#10B981] hover:bg-[#10B981]/80 text-[#0B0F19] font-black text-xs rounded-lg transition-all">
              UPGRADE NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestAI;
