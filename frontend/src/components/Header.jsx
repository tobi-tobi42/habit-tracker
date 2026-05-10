import React from 'react';
import { Bell, Search, Flame, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = ({ onMenuClick }) => {
  const [search, setSearch] = React.useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      alert(`Searching for: ${search}. Quest AI is processing...`);
      setSearch('');
    }
  };

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-auto md:h-20 px-4 md:px-6 py-4 md:py-0 flex flex-col md:flex-row items-center justify-between gap-4 z-20"
    >
      <div className="flex items-center justify-between w-full md:w-auto md:hidden mb-2">
        <button 
          onClick={onMenuClick}
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2 text-[#F59E0B] md:hidden">
          <Flame className="w-5 h-5 fill-current" />
          <span className="font-bold text-sm">14 Day Streak</span>
        </div>
      </div>

      <div className="flex-1 w-full max-w-xl relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input 
          type="text" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Ask Quest AI..." 
          className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-12 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all"
        />
      </div>

      <div className="hidden md:flex items-center gap-6 ml-6">
        <div className="flex items-center gap-2 text-[#F59E0B]">
          <Flame className="w-5 h-5 fill-current" />
          <span className="font-bold">14 Day Streak</span>
        </div>
        
        <button className="relative p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
          <Bell className="w-5 h-5 text-gray-300" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#10B981] rounded-full neon-border"></span>
        </button>
      </div>

      <div className="flex md:hidden items-center justify-end w-full gap-4">
         <button className="relative p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
          <Bell className="w-5 h-5 text-gray-300" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#10B981] rounded-full neon-border"></span>
        </button>
      </div>
    </motion.header>
  );
};

export default Header;
