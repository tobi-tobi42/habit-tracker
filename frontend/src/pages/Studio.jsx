import React from 'react';
import { motion } from 'framer-motion';
import { Video, Plus, Search, Calendar, Play, Settings, Clock } from 'lucide-react';

const Studio = () => {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            Creator Studio <Video className="w-6 h-6 text-[#10B981]" />
          </h1>
          <p className="text-gray-400">Manage your content pipeline and video projects.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#10B981] hover:bg-[#10B981]/80 text-[#0B0F19] px-6 py-3 rounded-xl font-black transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <Plus className="w-5 h-5" />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3 space-y-6">
          <div className="flex gap-4 mb-4 overflow-x-auto pb-2 scrollbar-hide">
            {['All Projects', 'In Progress', 'Editing', 'Scheduled', 'Published'].map((tab, i) => (
              <button key={i} className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${i === 0 ? 'bg-white text-[#0B0F19]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: 'The Future of AI Coding', status: 'Editing', progress: 75, thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&auto=format&fit=crop&q=60' },
              { title: 'My 2024 Tech Setup', status: 'In Progress', progress: 40, thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60' },
              { title: 'React 19 Deep Dive', status: 'Scheduled', progress: 100, thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60' },
              { title: 'Vite vs Webpack', status: 'Published', progress: 100, thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&auto=format&fit=crop&q=60' },
            ].map((project, i) => (
              <motion.div 
                key={i}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel group overflow-hidden border border-white/5 hover:border-[#10B981]/50 transition-all"
              >
                <div className="relative h-40">
                  <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500 opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] to-transparent" />
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    project.status === 'Published' ? 'bg-[#10B981] text-[#0B0F19]' : 'bg-[#8B5CF6] text-white'
                  }`}>
                    {project.status}
                  </span>
                  <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-[#10B981] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                      <Play className="w-6 h-6 text-[#0B0F19] fill-current" />
                    </div>
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white mb-4 truncate">{project.title}</h3>
                  <div className="flex justify-between items-center text-[10px] text-gray-500 mb-2">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-1000 ${project.progress === 100 ? 'bg-[#10B981]' : 'bg-[#8B5CF6]'}`} style={{ width: `${project.progress}%` }}></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#8B5CF6]" /> Upcoming
            </h2>
            <div className="space-y-4">
              {[
                { title: 'Sponsor Integration', time: 'Tomorrow, 10 AM', type: 'Task' },
                { title: 'Community Live', time: 'Friday, 8 PM', type: 'Event' },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-xs font-bold text-[#8B5CF6] mb-1">{item.type}</p>
                  <p className="text-sm font-bold text-white mb-2">{item.title}</p>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-gray-400" /> Export Settings
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-[#0B0F19] border border-white/5">
                <span className="text-xs text-gray-400">Resolution</span>
                <span className="text-xs font-bold text-white">4K (Ultra HD)</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-[#0B0F19] border border-white/5">
                <span className="text-xs text-gray-400">Frame Rate</span>
                <span className="text-xs font-bold text-white">60 FPS</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-[#0B0F19] border border-white/5">
                <span className="text-xs text-gray-400">Format</span>
                <span className="text-xs font-bold text-white">ProRes 422</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studio;
