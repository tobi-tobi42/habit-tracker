import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Globe, Camera, Shield, Award, Zap } from 'lucide-react';

const Profile = () => {
  const fileInputRef = React.useRef(null);
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('creator_profile');
    return saved ? JSON.parse(saved) : {
      name: 'Master Creator',
      username: '@master_creator',
      bio: 'Futuristic content creator & AI enthusiast. Building the next generation of digital experiences.',
      email: 'master@creatorquest.ai',
      website: 'www.creatorquest.ai',
      twitter: '@creator_quest',
      instagram: '@creator_quest_official',
      avatar: 'https://i.pravatar.cc/150?img=11'
    };
  });

  const [isEditing, setIsEditing] = useState(false);

  const saveProfile = () => {
    localStorage.setItem('creator_profile', JSON.stringify(profile));
    setIsEditing(false);
    window.dispatchEvent(new Event('profileUpdate'));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageChange} 
        className="hidden" 
        accept="image/*"
      />
      
      <div className="relative">
        {/* Cover Image */}
        <div className="h-48 w-full rounded-3xl bg-gradient-to-r from-[#8B5CF6] via-[#3B82F6] to-[#10B981] opacity-20 blur-sm absolute top-0" />
        <div className="h-48 w-full rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>

        {/* Profile Info Header */}
        <div className="px-8 -mt-16 relative flex flex-col md:flex-row items-end gap-6">
          <div className="relative group">
            <div 
              onClick={() => isEditing && fileInputRef.current.click()}
              className={`w-32 h-32 rounded-3xl bg-[#0B0F19] p-1 border-4 border-[#0B0F19] shadow-2xl overflow-hidden ${isEditing ? 'cursor-pointer hover:border-[#8B5CF6] transition-colors' : ''}`}
            >
              <img 
                src={profile.avatar} 
                alt="Profile" 
                className="w-full h-full rounded-2xl object-cover"
              />
            </div>
            {isEditing && (
              <div 
                onClick={() => fileInputRef.current.click()}
                className="absolute inset-0 bg-black/60 rounded-3xl flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera className="w-6 h-6 text-white mb-1" />
                <span className="text-[10px] text-white font-bold uppercase">Change Image</span>
              </div>
            )}
          </div>
          
          <div className="flex-1 pb-4">
            {isEditing ? (
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Display Name</label>
                <input 
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="text-3xl font-bold text-white bg-white/5 border border-[#8B5CF6] rounded-lg px-2 w-full focus:outline-none"
                />
              </div>
            ) : (
              <h1 className="text-3xl font-bold text-white mb-1">{profile.name}</h1>
            )}
            <p className="text-[#8B5CF6] font-medium">{profile.username}</p>
          </div>

          <div className="pb-4 flex gap-3">
            <button 
              onClick={isEditing ? saveProfile : () => setIsEditing(true)}
              className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all"
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
            <button className="p-2.5 rounded-xl bg-[#8B5CF6] text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <Shield className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* About Section */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-panel p-8"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-[#8B5CF6]" /> About Me
            </h2>
            {isEditing ? (
              <textarea 
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                className="w-full bg-[#0B0F19] border border-white/10 rounded-xl p-4 text-gray-300 text-sm focus:outline-none focus:border-[#8B5CF6] min-h-[120px]"
              />
            ) : (
              <p className="text-gray-400 leading-relaxed">
                {profile.bio}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-300">{profile.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-300">{profile.website}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="w-4 h-4 text-[#1DA1F2]" />
                  <span className="text-gray-300">{profile.twitter}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="w-4 h-4 text-[#E4405F]" />
                  <span className="text-gray-300">{profile.instagram}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Experience/Skills Section */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-8"
          >
            <h2 className="text-xl font-bold text-white mb-6">Creator Skills</h2>
            <div className="flex flex-wrap gap-3">
              {['Video Editing', 'Script Writing', 'AI Prompting', 'Motion Graphics', 'Community Building', 'Analytics'].map((skill) => (
                <span key={skill} className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-xs font-bold text-gray-400 hover:text-white hover:border-[#8B5CF6] transition-all cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="space-y-8">
          {/* Stats/Achievements */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-6"
          >
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#F59E0B]" /> Achievements
            </h2>
            <div className="space-y-4">
              {[
                { title: 'Level 42 Master', icon: Zap, color: 'text-[#8B5CF6]', bg: 'bg-[#8B5CF6]/10' },
                { title: '14 Day Streak', icon: Shield, color: 'text-[#10B981]', bg: 'bg-[#10B981]/10' },
                { title: 'Top 1% Creator', icon: Award, color: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/10' },
              ].map((ach, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className={`p-2 rounded-lg ${ach.bg} ${ach.color}`}>
                    <ach.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-gray-200">{ach.title}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Social Links Form */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-6 bg-gradient-to-br from-[#10B981]/10 to-transparent border border-[#10B981]/20"
          >
            <Globe className="w-8 h-8 text-white mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Connect GitHub</h3>
            <p className="text-xs text-gray-400 mb-4">Sync your repositories to showcase your technical projects on your profile.</p>
            <button className="w-full py-2 bg-white text-[#0B0F19] font-black text-xs rounded-lg hover:bg-gray-200 transition-all">
              LINK ACCOUNT
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
