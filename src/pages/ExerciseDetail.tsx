import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Play, Pause, RotateCcw, CheckCircle2, Wind } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const ExerciseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const exercises: Record<string, any> = {
    'box-breathing': {
      title: 'Box Breathing',
      description: 'A powerful technique to calm the nervous system.',
      phases: [
        { name: 'Meditate', duration: 4 },
        { name: 'Hold', duration: 4 },
        { name: 'Meditate', duration: 4 },
        { name: 'Rest', duration: 4 }
      ],
      targetCycles: 5,
      displayText: 'Meditate'
    },
    '4-7-8-breathing': {
      title: '4-7-8 Breathing',
      description: 'A natural tranquilizer for the nervous system.',
      phases: [
        { name: 'Inhale', duration: 4 },
        { name: 'Hold', duration: 7 },
        { name: 'Exhale', duration: 8 }
      ],
      targetCycles: 4
    },
    'quick-calm': {
      title: 'Quick Calm',
      description: 'Rapidly reduce stress in under a minute.',
      phases: [
        { name: 'Inhale', duration: 3 },
        { name: 'Exhale', duration: 6 }
      ],
      targetCycles: 3
    },
    'mindful-walking': {
      title: 'Mindful Walking',
      description: 'Connect with your surroundings through a slow, intentional walk.',
      phases: [
        { name: 'Walking', duration: 5 },
        { name: 'Walking', duration: 5 }
      ],
      targetCycles: 10,
      displayText: 'Walking'
    }
  };

  const exercise = exercises[id || 'box-breathing'] || exercises['box-breathing'];

  useEffect(() => {
    if (isActive && !isFinished) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Move to next phase
            const currentPhaseIndex = exercise.phases.findIndex((p: any) => p.name === phase);
            const nextPhaseIndex = (currentPhaseIndex + 1) % exercise.phases.length;
            const nextPhase = exercise.phases[nextPhaseIndex];
            
            if (nextPhaseIndex === 0) {
              setCompletedCycles((c) => {
                if (c + 1 >= exercise.targetCycles) {
                  setIsFinished(true);
                  setIsActive(false);
                  return c + 1;
                }
                return c + 1;
              });
            }
            
            setPhase(nextPhase.name);
            return nextPhase.duration;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, phase, exercise, isFinished]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setIsFinished(false);
    setPhase(exercise.phases[0].name);
    setTimeLeft(exercise.phases[0].duration);
    setCompletedCycles(0);
  };

  return (
    <div className={`min-h-screen flex flex-col p-6 transition-colors duration-500 ${isDarkMode ? 'bg-[#0F172A]' : 'bg-[#f5f5f0]'}`}>
      <header className="flex items-center justify-between mb-12">
        <button 
          onClick={() => navigate('/exercise')}
          className={`p-3 rounded-2xl transition-all shadow-sm ${isDarkMode ? 'bg-[#1E293B] text-white hover:bg-white/5' : 'bg-white text-[#5A5A40] hover:bg-[#5A5A40]/10'}`}
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className={`text-2xl font-serif ${isDarkMode ? 'text-white' : 'text-[#5A5A40]'}`}>{exercise.title}</h1>
        <div className="w-12 h-12" /> {/* Spacer */}
      </header>

      <main className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {isFinished ? (
            <motion.div 
              key="finished"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8"
            >
              <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto shadow-lg ${isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-green-100 text-green-600'}`}>
                <CheckCircle2 size={64} />
              </div>
              <div className="space-y-4">
                <h2 className={`text-4xl font-serif ${isDarkMode ? 'text-white' : 'text-[#5A5A40]'}`}>Well Done!</h2>
                <p className={isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/60'}>You've completed {completedCycles} cycles of {exercise.title}.</p>
              </div>
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={resetTimer}
                  className={`px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all ${isDarkMode ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-[#5A5A40] text-white hover:bg-[#4a4a34]'}`}
                >
                  Repeat Exercise
                </button>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className={`px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all border ${isDarkMode ? 'bg-[#1E293B] text-white border-white/10 hover:bg-white/5' : 'bg-white text-[#5A5A40] border-[#5A5A40]/10 hover:bg-[#5A5A40]/10'}`}
                >
                  Back to Home
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="timer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full flex flex-col items-center"
            >
              {/* Visual Timer */}
              <div className="relative w-80 h-80 flex items-center justify-center mb-16">
                <div className="relative z-10 text-center">
                  <motion.div
                    key={phase}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-5xl font-serif mb-4 ${isDarkMode ? 'text-white' : 'text-[#5A5A40]'}`}
                  >
                    {exercise.displayText || phase}
                  </motion.div>
                  <div className={`text-8xl font-mono font-light ${isDarkMode ? 'text-slate-500' : 'text-[#5A5A40]/40'}`}>
                    {timeLeft}
                  </div>
                </div>
              </div>

              <div className="text-center mb-12">
                <div className="flex gap-2 justify-center mb-4">
                  {Array.from({ length: exercise.targetCycles }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-3 h-3 rounded-full transition-all ${i < completedCycles ? (isDarkMode ? 'bg-indigo-500' : 'bg-[#5A5A40]') : (isDarkMode ? 'bg-slate-700' : 'bg-[#5A5A40]/10')}`}
                    />
                  ))}
                </div>
                <p className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-[#5A5A40]/40'}`}>
                  Cycle {Math.min(completedCycles + 1, exercise.targetCycles)} of {exercise.targetCycles}
                </p>
              </div>

              <div className="flex gap-6">
                <button 
                  onClick={toggleTimer}
                  className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-all ${isDarkMode ? 'bg-indigo-600 text-white' : 'bg-[#5A5A40] text-white'}`}
                >
                  {isActive ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                </button>
                <button 
                  onClick={resetTimer}
                  className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all border ${isDarkMode ? 'bg-[#1E293B] text-white border-white/10 hover:bg-white/5' : 'bg-white text-[#5A5A40] border-[#5A5A40]/10 hover:bg-[#5A5A40]/10'}`}
                >
                  <RotateCcw size={28} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="max-w-md mx-auto w-full py-10 text-center">
        <div className={`flex items-center justify-center gap-2 mb-2 ${isDarkMode ? 'text-slate-600' : 'text-[#5A5A40]/40'}`}>
          <Wind size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">Breathing Guide</span>
        </div>
        <p className={`text-sm italic ${isDarkMode ? 'text-slate-500' : 'text-[#5A5A40]/60'}`}>
          {isActive ? "Follow the rhythm of your breath..." : "Press play to begin your session."}
        </p>
      </footer>
    </div>
  );
};

export default ExerciseDetail;
