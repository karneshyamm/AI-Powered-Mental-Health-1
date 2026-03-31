import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { motion } from 'motion/react';
import { Leaf, ArrowRight, Loader2 } from 'lucide-react';
import { useTheme } from '../ThemeContext';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const SignupPage = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update profile with name
      await updateProfile(user, { displayName: name });
      
      // Store extra data in Firestore
      const path = `users/${user.uid}`;
      try {
        await setDoc(doc(db, 'users', user.uid), {
          name,
          age: parseInt(age),
          email,
          createdAt: new Date().toISOString()
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, path);
      }

      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-500 ${isDarkMode ? 'bg-[#0F172A]' : 'bg-[#f5f5f0]'}`}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`w-full max-w-md rounded-[2.5rem] shadow-xl p-10 relative overflow-hidden transition-all ${isDarkMode ? 'bg-[#1E293B] border border-white/5' : 'bg-white'}`}
      >
        <div className={`absolute top-0 left-0 w-32 h-32 rounded-full -ml-16 -mt-16 ${isDarkMode ? 'bg-indigo-500/10' : 'bg-[#5A5A40]/5'}`} />
        
        <div className="flex flex-col items-center mb-8">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white mb-4 ${isDarkMode ? 'bg-indigo-600' : 'bg-[#5A5A40]'}`}>
            <Leaf size={24} />
          </div>
          <h2 className={`text-3xl font-serif ${isDarkMode ? 'text-white' : 'text-[#5A5A40]'}`}>Join Serenity</h2>
          <p className={`text-sm mt-2 ${isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/60'}`}>Start your journey to mindfulness</p>
        </div>

        {error && (
          <div className={`p-4 rounded-xl text-sm mb-6 text-center ${isDarkMode ? 'bg-red-900/20 text-red-400 border border-red-900/30' : 'bg-red-50 text-red-600'}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-semibold uppercase tracking-widest mb-2 ml-1 ${isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/60'}`}>Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={`w-full px-6 py-4 border-none rounded-2xl transition-all outline-none ${isDarkMode ? 'bg-white/5 text-white focus:ring-indigo-500/20' : 'bg-[#f5f5f0] text-[#5A5A40] focus:ring-[#5A5A40]/20'}`}
                placeholder="Name"
              />
            </div>
            <div>
              <label className={`block text-xs font-semibold uppercase tracking-widest mb-2 ml-1 ${isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/60'}`}>Age</label>
              <input 
                type="number" 
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                className={`w-full px-6 py-4 border-none rounded-2xl transition-all outline-none ${isDarkMode ? 'bg-white/5 text-white focus:ring-indigo-500/20' : 'bg-[#f5f5f0] text-[#5A5A40] focus:ring-[#5A5A40]/20'}`}
                placeholder="Age"
              />
            </div>
          </div>
          <div>
            <label className={`block text-xs font-semibold uppercase tracking-widest mb-2 ml-1 ${isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/60'}`}>Email</label>
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
            className={`w-full py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-4 ${isDarkMode ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/20' : 'bg-[#5A5A40] text-white hover:bg-[#4a4a34]'}`}
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <>Create Account <ArrowRight size={20} /></>}
          </button>
        </form>

        <div className={`mt-8 text-center text-sm ${isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/60'}`}>
          Already have an account? {' '}
          <Link to="/login" className={`font-bold hover:underline ${isDarkMode ? 'text-indigo-400' : 'text-[#5A5A40]'}`}>Login</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
