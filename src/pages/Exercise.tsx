import React from 'react';
import { Activity, Wind, Heart, Sparkles, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

const Exercise = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const exercises = [
    {
      id: 'box-breathing',
      title: 'Box Breathing',
      duration: '5 mins',
      desc: 'A simple technique to calm your nervous system and reduce stress.',
      icon: <Wind size={24} />,
      color: isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600'
    },
    {
      id: '4-7-8-breathing',
      title: '4-7-8 Breathing',
      duration: '10 mins',
      desc: 'Focus on each part of your body to release tension and stay present.',
      icon: <Activity size={24} />,
      color: isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-green-50 text-green-600'
    },
    {
      id: 'quick-calm',
      title: 'Quick Calm',
      duration: '3 mins',
      desc: 'List three things you are grateful for to shift your perspective.',
      icon: <Heart size={24} />,
      color: isDarkMode ? 'bg-rose-500/20 text-rose-400' : 'bg-red-50 text-red-600'
    },
    {
      id: 'mindful-walking',
      title: 'Mindful Walking',
      duration: '15 mins',
      desc: 'Connect with your surroundings through a slow, intentional walk.',
      icon: <Sparkles size={24} />,
      color: isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-50 text-purple-600'
    }
  ];

  return (
    <div className="space-y-10">
      <header>
        <h1 className={`text-4xl font-serif mb-2 ${isDarkMode ? 'text-white' : 'text-[#5A5A40]'}`}>Wellness Exercises</h1>
        <p className={isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/60'}>Simple practices for a balanced mind.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {exercises.map((ex, i) => (
          <div
            key={i}
            className={`p-8 rounded-[2.5rem] shadow-sm border group transition-all ${isDarkMode ? 'bg-[#1E293B] border-white/5' : 'bg-white border-[#5A5A40]/5'}`}
          >
            <div className="flex items-start justify-between mb-6">
              <div className={`w-14 h-14 ${ex.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                {ex.icon}
              </div>
              <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-lg ${isDarkMode ? 'text-slate-400 bg-white/5' : 'text-[#5A5A40]/40 bg-[#f5f5f0]'}`}>
                {ex.duration}
              </span>
            </div>
            <h3 className={`text-2xl font-serif mb-3 ${isDarkMode ? 'text-white' : 'text-[#5A5A40]'}`}>{ex.title}</h3>
            <p className={`leading-relaxed mb-8 ${isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/60'}`}>{ex.desc}</p>
            <button 
              onClick={() => navigate(`/exercise/${ex.id}`)}
              className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all ${isDarkMode ? 'bg-white/5 text-white hover:bg-indigo-600' : 'bg-[#f5f5f0] text-[#5A5A40] hover:bg-[#5A5A40] hover:text-white'}`}
            >
              <Play size={14} /> Start Exercise
            </button>
          </div>
        ))}
      </div>

      {/* Featured Exercise */}
      <section className={`p-10 rounded-[3rem] relative overflow-hidden ${isDarkMode ? 'bg-indigo-600 text-white' : 'bg-[#5A5A40] text-white'}`}>
        <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-serif mb-4">Deep Relaxation</h2>
            <p className="opacity-80 leading-relaxed mb-8">
              A guided session to help you unwind after a long day. Perfect for improving sleep quality and mental clarity.
            </p>
            <button className={`px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform ${isDarkMode ? 'bg-white text-indigo-600' : 'bg-white text-[#5A5A40]'}`}>
              Join Live Session
            </button>
          </div>
          <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800" 
              alt="Yoga" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Exercise;
