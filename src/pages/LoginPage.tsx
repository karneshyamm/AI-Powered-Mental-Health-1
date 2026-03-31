import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { motion } from 'motion/react';
import { Leaf, ArrowRight, Loader2 } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-500 ${isDarkMode ? 'bg-[#0F172A]' : 'bg-[#f5f5f0]'}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full max-w-md rounded-[2.5rem] shadow-xl p-10 relative overflow-hidden transition-all ${isDarkMode ? 'bg-[#1E293B] border border-white/5' : 'bg-white'}`}
      >
        {/* Decorative background */}
        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 ${isDarkMode ? 'bg-indigo-500/10' : 'bg-[#5A5A40]/5'}`} />
        
        <div className="flex flex-col items-center mb-10">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white mb-4 ${isDarkMode ? 'bg-indigo-600' : 'bg-[#5A5A40]'}`}>
            <Leaf size={24} />
          </div>
          <h2 className={`text-3xl font-serif ${isDarkMode ? 'text-white' : 'text-[#5A5A40]'}`}>Welcome Back</h2>
          <p className={`text-sm mt-2 ${isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/60'}`}>Continue your journey to peace</p>
        </div>

        {error && (
          <div className={`p-4 rounded-xl text-sm mb-6 text-center ${isDarkMode ? 'bg-red-900/20 text-red-400 border border-red-900/30' : 'bg-red-50 text-red-600'}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className={`block text-xs font-semibold uppercase tracking-widest mb-2 ml-1 ${isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/60'}`}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full px-6 py-4 border-none rounded-2xl transition-all outline-none ${isDarkMode ? 'bg-white/5 text-white focus:ring-indigo-500/20' : 'bg-[#f5f5f0] text-[#5A5A40] focus:ring-[#5A5A40]/20'}`}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className={`block text-xs font-semibold uppercase tracking-widest mb-2 ml-1 ${isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/60'}`}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full px-6 py-4 border-none rounded-2xl transition-all outline-none ${isDarkMode ? 'bg-white/5 text-white focus:ring-indigo-500/20' : 'bg-[#f5f5f0] text-[#5A5A40] focus:ring-[#5A5A40]/20'}`}
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-70 ${isDarkMode ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/20' : 'bg-[#5A5A40] text-white hover:bg-[#4a4a34]'}`}
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <>Login <ArrowRight size={20} /></>}
          </button>
        </form>

        <div className={`mt-8 text-center text-sm ${isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/60'}`}>
          Don't have an account? {' '}
          <Link to="/signup" className={`font-bold hover:underline ${isDarkMode ? 'text-indigo-400' : 'text-[#5A5A40]'}`}>Sign up</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
