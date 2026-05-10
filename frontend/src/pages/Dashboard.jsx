import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, Award, Zap, DollarSign, Brain, Play, Flame, Calendar, CheckCircle2 } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement
);

const StatCard = ({ title, value, subtext, icon: Icon, colorClass, delay }) => (
  <motion.div 
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay }}
    className="glass-panel p-6 relative overflow-hidden group hover:border-white/20 transition-all"
  >
    <div className={`absolute top-0 right-0 w-24 h-24 ${colorClass.replace('text-', 'bg-').replace(']', ']/10')} rounded-full blur-2xl -mr-10 -mt-10 transition-all duration-500`} />
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${colorClass}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <p className="text-xs text-gray-500">{subtext}</p>
  </motion.div>
);

const Dashboard = () => {
  const [quests, setQuests] = useState([
    { id: 1, task: 'Drink 2L Water', xp: 20, done: true },
    { id: 2, task: 'Edit latest vlog', xp: 100, done: false },
    { id: 3, task: 'Save ₹100', xp: 50, done: false }
  ]);

  const toggleQuest = (id) => {
    setQuests(quests.map(q => q.id === id ? { ...q, done: !q.done } : q));
  };

  const lineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        fill: true,
        label: 'Earnings',
        data: [1200, 1900, 1500, 2500, 2200, 3000, 2800],
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { display: false },
      x: { 
        grid: { display: false },
        ticks: { color: '#64748b' }
      },
    },
  };

  const doughnutData = {
    labels: ['XP Earned', 'Remaining'],
    datasets: [
      {
        data: [1250, 750],
        backgroundColor: ['#8B5CF6', '#1e293b'],
        borderWidth: 0,
        cutout: '80%',
      },
    ],
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard title="Productivity Score" value="92/100" subtext="+5% from last week" icon={Zap} colorClass="text-[#10B981]" delay={0.1} />
        <StatCard title="Monthly Earnings" value="₹45,200" subtext="On track for ₹50k goal" icon={DollarSign} colorClass="text-[#8B5CF6]" delay={0.2} />
        <StatCard title="Total XP" value="12,450" subtext="750 XP to next level" icon={Award} colorClass="text-[#F59E0B]" delay={0.3} />
        <StatCard title="Content Streak" value="3 Weeks" subtext="Next upload due in 2 days" icon={TrendingUp} colorClass="text-[#3B82F6]" delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Quests */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 glass-panel p-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl font-bold text-white">Daily Quests</h2>
            <div className="flex gap-4 items-center">
              <span className="text-xs text-gray-400">Streak: 14 Days</span>
              <Link to="/quests" className="text-sm text-[#8B5CF6] hover:text-white transition-colors">View All</Link>
            </div>
          </div>
          
          <div className="space-y-4">
            {quests.map((quest) => (
              <div 
                key={quest.id} 
                onClick={() => toggleQuest(quest.id)}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer ${quest.done ? 'bg-[#10B981]/10 border-[#10B981]/20' : 'bg-white/5 border-white/5'} transition-all hover:bg-white/10`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${quest.done ? 'bg-[#10B981] border-[#10B981]' : 'border-gray-500'}`}>
                    {quest.done && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <span className={`font-medium ${quest.done ? 'text-gray-300 line-through' : 'text-white'}`}>{quest.task}</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-[#F59E0B]">
                  <span>+{quest.xp} XP</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Circular XP Meter */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="glass-panel p-6 flex flex-col items-center justify-center text-center"
        >
          <h2 className="text-lg font-bold text-white mb-6">Level 42 Progress</h2>
          <div className="relative w-40 h-40">
            <Doughnut data={doughnutData} options={{ plugins: { legend: { display: false } } }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-white">62%</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest">To Master</span>
            </div>
          </div>
          <p className="mt-6 text-sm text-gray-400">750 XP remaining to reach Level 43</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income Graph */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="glass-panel p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Earnings Trend</h2>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-400">Weekly</span>
            </div>
          </div>
          <div className="h-64">
            <Line data={lineData} options={lineOptions} />
          </div>
        </motion.div>

        {/* AI Coach */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="glass-panel p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B5CF6]/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.4)]">
              <Brain className="text-white w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white">Quest AI Insights</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-[#0B0F19]/50 border border-white/5 rounded-xl p-4 backdrop-blur-md hover:border-white/20 transition-all">
              <p className="text-sm text-gray-300 leading-relaxed italic">
                "Your productivity peaks at 8 PM! Schedule your most intense editing tasks then for 30% faster results."
              </p>
            </div>
            <div className="bg-[#0B0F19]/50 border border-white/5 rounded-xl p-4 backdrop-blur-md hover:border-white/20 transition-all">
              <p className="text-sm text-gray-300 leading-relaxed italic">
                "You saved ₹450 this week by skipping outside snacks. That's 5% of your camera gear goal!"
              </p>
            </div>
          </div>
          
          <div className="mt-6 flex gap-2">
            <input 
              type="text" 
              placeholder="Ask for advice..." 
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
            />
            <button className="bg-[#8B5CF6] hover:bg-[#8B5CF6]/80 text-white rounded-lg p-2 transition-colors">
              <Play className="w-4 h-4 fill-current" />
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Workflow Tracker */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="glass-panel p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6">Content Pipeline</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {['Idea', 'Script', 'Record', 'Edit', 'Upload'].map((step, i) => (
            <div key={step} className="flex flex-col items-center relative">
              <div className={`w-full h-2 rounded-full mb-3 ${i < 3 ? 'bg-[#10B981] shadow-[0_0_10px_rgba(16,185,129,0.5)]' : i === 3 ? 'bg-[#8B5CF6] animate-pulse shadow-[0_0_10px_rgba(139,92,246,0.5)]' : 'bg-white/10'}`} />
              <span className={`text-xs font-medium ${i <= 3 ? 'text-white' : 'text-gray-500'}`}>{step}</span>
              {i === 3 && <span className="absolute -bottom-6 text-[10px] text-[#8B5CF6] whitespace-nowrap bg-[#8B5CF6]/10 px-2 py-0.5 rounded-full border border-[#8B5CF6]/20">In Progress</span>}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
