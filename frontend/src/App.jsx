import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Quests from './pages/Quests';
import QuestAI from './pages/QuestAI';
import Studio from './pages/Studio';
import Finance from './pages/Finance';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Onboarding from './components/Onboarding';
import Placeholder from './pages/Placeholder';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('is_logged_in') === 'true');
  const [showOnboarding, setShowOnboarding] = useState(() => localStorage.getItem('show_onboarding') === 'true');

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <Router>
      <div className="flex h-screen bg-[#0B0F19] text-white overflow-hidden font-sans">
        {/* Onboarding Overlay */}
        <AnimatePresence>
          {showOnboarding && (
            <Onboarding onComplete={() => {
              setShowOnboarding(false);
              localStorage.removeItem('show_onboarding');
            }} />
          )}
        </AnimatePresence>

        {/* Sidebar Overlay for Mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <div className="flex-1 flex flex-col relative overflow-hidden">
          {/* Futuristic background blobs */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none" />
          
          <Header onMenuClick={() => setIsSidebarOpen(true)} />
          
          <main className="flex-1 overflow-y-auto p-4 md:p-8 z-10 scrollbar-hide">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/quests" element={<Quests />} />
              <Route path="/ai-coach" element={<QuestAI />} />
              <Route path="/studio" element={<Studio />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;

