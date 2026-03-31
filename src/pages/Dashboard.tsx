import React from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../AuthContext';
import { useTheme } from '../ThemeContext';
import { 
  BookOpen, 
  Activity, 
  MessageSquare, 
  Heart, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Daily Journal',
      desc: 'Reflect on your day and emotional well-being.',
      icon: <BookOpen size={24} />,
      path: '/journal',
      color: isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Mood Tracker',
      desc: 'Log your daily emotions and track trends.',
      icon: <Activity size={24} />,
      path: '/mood-tracker',
      color: isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-green-50 text-green-600'
    },
    {
      title: 'AI Companion',
      desc: 'Talk to Serenity AI for immediate support.',
      icon: <MessageSquare size={24} />,
      path: '/chat',
      external: true,
      color: isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-50 text-purple-600'
    }
  ];

  const handleCardClick = (card: any) => {
    if (card.external) {
      window.open('https://shyamsundhrkarne1.retool.com/apps/bbb2d11e-2c50-11f1-a70e-73b21e59fc63/mental-health/page1', '_blank');
    } else {
      navigate(card.path);
    }
  };

  return (
    <div className="space-y-10">
      <header>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className={`text-4xl font-serif mb-2 ${isDarkMode ? 'text-white' : 'text-[#5A5A40]'}`}>
            Hello, {user?.displayName || 'Friend'}
          </h1>
          <p className={isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/60'}>How are you feeling today?</p>
        </motion.div>
      </header>

      {/* Daily Quote Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`p-8 rounded-[2.5rem] shadow-lg relative overflow-hidden transition-colors ${isDarkMode ? 'bg-indigo-600' : 'bg-[#5A5A40]'} text-white`}
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4 opacity-80">
            <Sparkles size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Daily Inspiration</span>
          </div>
          <p className="text-2xl font-serif italic mb-4 leading-relaxed">
            "The greatest weapon against stress is our ability to choose one thought over another."
          </p>
          <p className="text-sm opacity-60">— William James</p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16" />
      </motion.div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => handleCardClick(card)}
            className={`text-left p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-all border group ${isDarkMode ? 'bg-[#1E293B] border-white/10' : 'bg-white border-[#5A5A40]/5'}`}
          >
            <div className={`w-12 h-12 ${card.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              {card.icon}
            </div>
            <h3 className={`text-xl font-serif mb-2 ${isDarkMode ? 'text-white' : 'text-[#5A5A40]'}`}>{card.title}</h3>
            <p className={`text-sm leading-relaxed mb-6 ${isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/60'}`}>{card.desc}</p>
            <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-indigo-400' : 'text-[#5A5A40]'}`}>
              Explore <ArrowRight size={14} />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Mental Health Info Section */}
      <section className={`p-10 rounded-[2.5rem] border transition-colors ${isDarkMode ? 'bg-[#1E293B] border-white/10' : 'bg-white border-[#5A5A40]/5'}`}>
        <div className="flex items-center gap-3 mb-8">
          <Heart className="text-red-400" />
          <h2 className={`text-2xl font-serif ${isDarkMode ? 'text-white' : 'text-[#5A5A40]'}`}>Understanding Mental Health</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <p className={`leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/70'}`}>
              Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make choices.
            </p>
            <div className={`p-6 rounded-3xl ${isDarkMode ? 'bg-[#0F172A]' : 'bg-[#f5f5f0]'}`}>
              <h4 className={`font-bold mb-4 text-sm uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-[#5A5A40]'}`}>Why Serenity?</h4>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/70'}`}>
                Serenity AI is designed to be your safe space. We combine proven psychological techniques with modern AI to provide support that's always available, completely private, and tailored to your needs.
              </p>
            </div>
          </div>
          <div className={`p-6 rounded-3xl ${isDarkMode ? 'bg-[#0F172A]' : 'bg-[#f5f5f0]'}`}>
            <h4 className={`font-bold mb-4 text-sm uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-[#5A5A40]'}`}>Quick Tips for Peace</h4>
            <ul className={`space-y-3 text-sm ${isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/70'}`}>
              <li className="flex items-start gap-2">
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${isDarkMode ? 'bg-indigo-500' : 'bg-[#5A5A40]'}`} />
                Practice deep breathing for 5 minutes daily.
              </li>
              <li className="flex items-start gap-2">
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${isDarkMode ? 'bg-indigo-500' : 'bg-[#5A5A40]'}`} />
                Limit screen time before bed.
              </li>
              <li className="flex items-start gap-2">
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${isDarkMode ? 'bg-indigo-500' : 'bg-[#5A5A40]'}`} />
                Connect with a loved one today.
              </li>
              <li className="flex items-start gap-2">
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${isDarkMode ? 'bg-indigo-500' : 'bg-[#5A5A40]'}`} />
                Journal your thoughts to clear your mind.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Did You Know Section */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className={`p-8 rounded-[2rem] border ${isDarkMode ? 'bg-[#1E293B] border-white/10' : 'bg-white border-[#5A5A40]/5'}`}>
          <h4 className={`font-bold mb-3 text-xs uppercase tracking-widest ${isDarkMode ? 'text-indigo-400' : 'text-[#5A5A40]'}`}>Did You Know?</h4>
          <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/70'}`}>
            Studies show that just 10 minutes of meditation can significantly lower cortisol levels, the body's primary stress hormone.
          </p>
        </div>
        <div className={`p-8 rounded-[2rem] border ${isDarkMode ? 'bg-[#1E293B] border-white/10' : 'bg-white border-[#5A5A40]/5'}`}>
          <h4 className={`font-bold mb-3 text-xs uppercase tracking-widest ${isDarkMode ? 'text-indigo-400' : 'text-[#5A5A40]'}`}>Mindfulness Fact</h4>
          <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/70'}`}>
            Mindfulness can physically change the brain's structure, increasing gray matter density in areas associated with learning and memory.
          </p>
        </div>
        <div className={`p-8 rounded-[2rem] border ${isDarkMode ? 'bg-[#1E293B] border-white/10' : 'bg-white border-[#5A5A40]/5'}`}>
          <h4 className={`font-bold mb-3 text-xs uppercase tracking-widest ${isDarkMode ? 'text-indigo-400' : 'text-[#5A5A40]'}`}>Sleep Science</h4>
          <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/70'}`}>
            Consistent sleep patterns are more important for mental health than the total number of hours slept.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
