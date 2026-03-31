import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../AuthContext';
import { useTheme } from '../ThemeContext';
import { auth, db } from '../firebase';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { User, Bell, Shield, Moon, Loader2, Save } from 'lucide-react';

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

const Settings = () => {
  const { user } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [name, setName] = useState(user?.displayName || '');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    const path = `users/${user.uid}`;
    try {
      await updateProfile(user, { displayName: name });
      await updateDoc(doc(db, 'users', user.uid), { name });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, path);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <header>
        <h1 className={`text-4xl font-serif mb-2 ${isDarkMode ? 'text-white' : 'text-[#5A5A40]'}`}>Settings</h1>
        <p className={isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/60'}>Manage your account and preferences.</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Settings */}
          <section className={`p-8 rounded-[2.5rem] shadow-sm border transition-colors ${isDarkMode ? 'bg-[#1E293B] border-white/10' : 'bg-white border-[#5A5A40]/5'}`}>
            <div className="flex items-center gap-3 mb-8">
              <User className={isDarkMode ? 'text-indigo-400' : 'text-[#5A5A40]'} />
              <h2 className={`text-xl font-serif ${isDarkMode ? 'text-white' : 'text-[#5A5A40]'}`}>Profile Information</h2>
            </div>
            <form onSubmit={handleUpdate} className="space-y-6">
              <div>
                <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ml-1 ${isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/60'}`}>Display Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-6 py-4 border-none rounded-2xl focus:ring-2 transition-all outline-none ${isDarkMode ? 'bg-[#0F172A] text-white focus:ring-indigo-500/20' : 'bg-[#f5f5f0] text-[#1a1a1a] focus:ring-[#5A5A40]/20'}`}
                />
              </div>
              <div>
                <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ml-1 ${isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/60'}`}>Email Address</label>
                <input 
                  type="email" 
                  value={user?.email || ''}
                  disabled
                  className={`w-full px-6 py-4 border-none rounded-2xl opacity-50 cursor-not-allowed ${isDarkMode ? 'bg-[#0F172A] text-white' : 'bg-[#f5f5f0] text-[#1a1a1a]'}`}
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className={`px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center gap-2 transition-all disabled:opacity-50 ${isDarkMode ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-[#5A5A40] text-white hover:bg-[#4a4a34]'}`}
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : <><Save size={16} /> Save Changes</>}
              </button>
              {success && <p className="text-green-500 text-sm font-medium">Profile updated successfully!</p>}
            </form>
          </section>

          {/* Preferences */}
          <section className={`p-8 rounded-[2.5rem] shadow-sm border transition-colors ${isDarkMode ? 'bg-[#1E293B] border-white/10' : 'bg-white border-[#5A5A40]/5'}`}>
            <div className="flex items-center gap-3 mb-8">
              <Bell className={isDarkMode ? 'text-indigo-400' : 'text-[#5A5A40]'} />
              <h2 className={`text-xl font-serif ${isDarkMode ? 'text-white' : 'text-[#5A5A40]'}`}>Preferences</h2>
            </div>
            <div className="space-y-4">
              {[
                { icon: <Bell size={18} />, label: 'Email Notifications', desc: 'Receive weekly mindfulness tips.', type: 'toggle' },
                { icon: <Moon size={18} />, label: 'Dark Mode', desc: 'Switch to a darker theme for night use.', type: 'theme' },
                { icon: <Shield size={18} />, label: 'Privacy Mode', desc: 'Hide sensitive data from the dashboard.', type: 'toggle' }
              ].map((item, i) => (
                <div key={i} className={`flex items-center justify-between p-4 rounded-2xl ${isDarkMode ? 'bg-[#0F172A]' : 'bg-[#f5f5f0]'}`}>
                  <div>
                    <p className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-[#5A5A40]'}`}>{item.label}</p>
                    <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-[#5A5A40]/60'}`}>{item.desc}</p>
                  </div>
                  <div 
                    onClick={item.type === 'theme' ? toggleDarkMode : undefined}
                    className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
                      (item.type === 'theme' ? isDarkMode : false) 
                        ? (isDarkMode ? 'bg-indigo-600' : 'bg-[#5A5A40]') 
                        : (isDarkMode ? 'bg-slate-800' : 'bg-[#5A5A40]/20')
                    }`}
                  >
                    <motion.div 
                      animate={{ x: (item.type === 'theme' ? isDarkMode : false) ? 24 : 4 }}
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className={`p-8 rounded-[2rem] text-center ${isDarkMode ? 'bg-indigo-600 text-white' : 'bg-[#5A5A40] text-white'}`}>
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield size={32} />
            </div>
            <h3 className="font-serif text-xl mb-2">Premium Plan</h3>
            <p className="text-sm opacity-70 mb-6">Unlock advanced AI features and unlimited journaling.</p>
            <button className={`w-full py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${isDarkMode ? 'bg-white text-indigo-600 hover:bg-slate-100' : 'bg-white text-[#5A5A40] hover:bg-slate-100'}`}>
              Upgrade Now
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Settings;
