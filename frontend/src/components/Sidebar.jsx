import React from 'react';
import { LayoutDashboard, CheckCircle, Brain, Video, Wallet, BarChart, X, User, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [isMobile, setIsMobile] = React.useState(false);
  const [userProfile, setUserProfile] = React.useState(() => {
    const saved = localStorage.getItem('creator_profile');
    return saved ? JSON.parse(saved) : { name: 'Master Creator', avatar: 'https://i.pravatar.cc/150?img=11' };
  });
  const [isEditing, setIsEditing] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const syncProfile = () => {
      const saved = localStorage.getItem('creator_profile');
      if (saved) setUserProfile(JSON.parse(saved));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('profileUpdate', syncProfile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('profileUpdate', syncProfile);
    };
  }, []);

  const setUserName = (name) => {
    const newProfile = { ...userProfile, name };
    setUserProfile(newProfile);
    localStorage.setItem('creator_profile', JSON.stringify(newProfile));
    window.dispatchEvent(new Event('profileUpdate'));
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: CheckCircle, label: 'Quests', path: '/quests' },
    { icon: Brain, label: 'Quest AI', path: '/ai-coach' },
    { icon: Video, label: 'Studio', path: '/studio' },
    { icon: Wallet, label: 'Finance', path: '/finance' },
    { icon: BarChart, label: 'Analytics', path: '/analytics' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const sidebarVariants = {
    open: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', opacity: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };

  return (
    <AnimatePresence>
      <motion.aside 
        initial={isMobile ? "closed" : "open"}
        animate={!isMobile ? "open" : (isOpen ? "open" : "closed")}
        variants={sidebarVariants}
        className={`fixed md:relative inset-y-0 left-0 w-64 glass-panel border-r border-white/5 flex flex-col z-40 m-0 md:m-4 ${isMobile ? '' : 'translate-x-0 opacity-100'}`}
      >

        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#10B981] flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.5)]">
              <Brain className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              CreatorQuest
            </h1>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-white/10 text-white shadow-[inset_2px_0_0_0_#8B5CF6]' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <div className="glass-panel p-4 rounded-xl border border-white/5 bg-white/5 group hover:border-[#8B5CF6]/30 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <Link to="/profile" className="w-10 h-10 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] p-[2px] shrink-0">
                <img src={userProfile.avatar} alt="Avatar" className="w-full h-full rounded-full border border-[#0B0F19]" />
              </Link>
              <div className="flex-1 overflow-hidden">
                {isEditing ? (
                  <input 
                    autoFocus
                    value={userProfile.name}
                    onChange={(e) => setUserName(e.target.value)}
                    onBlur={() => setIsEditing(false)}
                    onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
                    className="bg-white/10 text-xs font-bold text-white px-2 py-1 rounded w-full focus:outline-none border border-[#8B5CF6]"
                  />
                ) : (
                  <div className="flex items-center justify-between">
                    <p 
                      onClick={() => setIsEditing(true)}
                      className="text-sm font-bold text-white cursor-pointer hover:text-[#8B5CF6] truncate"
                    >
                      {userProfile.name}
                    </p>
                    <Link to="/profile">
                      <Settings className="w-3 h-3 text-gray-500 hover:text-white transition-colors" />
                    </Link>
                  </div>
                )}
                <p className="text-xs text-gray-400">Level 42 Master</p>
              </div>
            </div>
            <div className="w-full bg-[#0B0F19] rounded-full h-1.5">
              <div className="bg-gradient-to-r from-[#8B5CF6] to-[#10B981] h-1.5 rounded-full" style={{ width: '62%' }}></div>
            </div>
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
};

export default Sidebar;
