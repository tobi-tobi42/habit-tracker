import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Plus, Filter, Search as SearchIcon } from 'lucide-react';

const QuestsPage = () => {
  const [quests, setQuests] = useState([
    { id: 1, task: 'Drink 2L Water', xp: 20, done: true, category: 'Health' },
    { id: 2, task: 'Edit latest vlog', xp: 100, done: false, category: 'Work' },
    { id: 3, task: 'Save ₹100', xp: 50, done: false, category: 'Finance' },
    { id: 4, task: 'Morning Meditation', xp: 30, done: false, category: 'Health' },
    { id: 5, task: 'Reply to comments', xp: 40, done: true, category: 'Social' },
  ]);

  const toggleQuest = (id) => {
    setQuests(quests.map(q => q.id === id ? { ...q, done: !q.done } : q));
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Daily Quests</h1>
          <p className="text-gray-400">Complete tasks to level up your Creator score.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#8B5CF6] hover:bg-[#8B5CF6]/80 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)]">
          <Plus className="w-5 h-5" />
          Add Quest
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="glass-panel p-2 flex items-center gap-2 mb-6">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search quests..." 
                className="w-full bg-transparent border-none py-3 pl-10 pr-4 text-sm text-white focus:ring-0"
              />
            </div>
            <button className="p-3 text-gray-400 hover:text-white transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {quests.map((quest, index) => (
            <motion.div 
              key={quest.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => toggleQuest(quest.id)}
              className={`flex items-center justify-between p-5 rounded-2xl border cursor-pointer transition-all ${
                quest.done 
                ? 'bg-[#10B981]/10 border-[#10B981]/20 opacity-75' 
                : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
              }`}
            >
              <div className="flex items-center gap-5">
                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                  quest.done ? 'bg-[#10B981] border-[#10B981]' : 'border-gray-600'
                }`}>
                  {quest.done && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
                <div>
                  <h3 className={`font-bold ${quest.done ? 'text-gray-400 line-through' : 'text-white'}`}>
                    {quest.task}
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider text-[#8B5CF6] font-bold">
                    {quest.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-[#F59E0B]">+{quest.xp} XP</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-white mb-6">Quest Analytics</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Completion Rate</span>
                <span className="text-[#10B981] font-bold">64%</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="bg-[#10B981] h-full" style={{ width: '64%' }}></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Weekly XP Earned</span>
                <span className="text-[#F59E0B] font-bold">1,240</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="bg-[#F59E0B] h-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 bg-gradient-to-br from-[#8B5CF6]/20 to-transparent">
            <CheckCircle2 className="w-10 h-10 text-[#8B5CF6] mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Master Quest</h2>
            <p className="text-sm text-gray-400 mb-6">Complete 50 Work quests to unlock the "Focus Mode" AI tool.</p>
            <div className="text-xs font-bold text-[#8B5CF6]">12 / 50 COMPLETED</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestsPage;
