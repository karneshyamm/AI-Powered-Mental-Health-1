import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../AuthContext';
import { useTheme } from '../ThemeContext';
import { db, auth } from '../firebase';
import { collection, addDoc, query, where, orderBy, onSnapshot, Timestamp, deleteDoc, doc } from 'firebase/firestore';
import { Smile, Meh, Frown, Plus, Calendar, Loader2, MessageSquare, Trash2 } from 'lucide-react';

interface MoodEntry {
  id: string;
  mood: string;
  note: string;
  createdAt: Timestamp;
}

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

const MoodTracker = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [indexError, setIndexError] = useState<string | null>(null);

  const moods = [
    { label: 'Happy', icon: <Smile className="text-green-500" />, color: isDarkMode ? 'bg-green-500/10' : 'bg-green-50' },
    { label: 'Calm', icon: <Smile className="text-blue-500" />, color: isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50' },
    { label: 'Neutral', icon: <Meh className="text-gray-500" />, color: isDarkMode ? 'bg-gray-500/10' : 'bg-gray-50' },
    { label: 'Sad', icon: <Frown className="text-indigo-500" />, color: isDarkMode ? 'bg-indigo-500/10' : 'bg-indigo-50' },
    { label: 'Anxious', icon: <Frown className="text-amber-500" />, color: isDarkMode ? 'bg-amber-500/10' : 'bg-amber-50' },
    { label: 'Angry', icon: <Frown className="text-red-500" />, color: isDarkMode ? 'bg-red-500/10' : 'bg-red-50' },
  ];

  useEffect(() => {
    if (!user) return;

    const path = 'moods';
    const q = query(
      collection(db, path),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MoodEntry[];
      setEntries(docs);
      setLoading(false);
    }, (error: any) => {
      if (error.message?.includes('requires an index')) {
        const match = error.message.match(/https:\/\/console\.firebase\.google\.com[^\s]*/);
        setIndexError(match ? match[0] : 'Index required');
        setLoading(false);
      } else {
        handleFirestoreError(error, OperationType.GET, path);
      }
    });

    return unsubscribe;
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood || !user) return;

    const path = 'moods';
    setSubmitting(true);
    try {
      await addDoc(collection(db, path), {
        userId: user.uid,
        mood: selectedMood,
        note: note.trim(),
        createdAt: Timestamp.now()
      });
      setSelectedMood(null);
      setNote('');
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, path);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const path = 'moods';
    try {
      await deleteDoc(doc(db, path, id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, path);
    }
  };

  return (
    <div className="space-y-10">
      <header>
        <h1 className={`text-4xl font-serif mb-2 ${isDarkMode ? 'text-white' : 'text-[#5A5A40]'}`}>Mood Tracker</h1>
        <p className={isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/60'}>How are you feeling today?</p>
      </header>

      <section className={`p-8 rounded-[2.5rem] shadow-sm border transition-colors ${isDarkMode ? 'bg-[#1E293B] border-white/10' : 'bg-white border-[#5A5A40]/5'}`}>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className={`block text-xs font-bold uppercase tracking-widest mb-6 ${isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/60'}`}>Select your mood</label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {moods.map((m) => (
                <button
                  key={m.label}
                  type="button"
                  onClick={() => setSelectedMood(m.label)}
                  className={`flex flex-col items-center gap-3 p-4 rounded-3xl transition-all ${
                    selectedMood === m.label 
                      ? (isDarkMode ? 'bg-indigo-600 text-white scale-105 shadow-lg' : 'bg-[#5A5A40] text-white scale-105 shadow-lg')
                      : `${m.color} ${isDarkMode ? 'text-slate-300' : 'text-[#5A5A40]'} hover:scale-105`
                  }`}
                >
                  <div className={selectedMood === m.label ? 'text-white' : ''}>
                    {React.cloneElement(m.icon as React.ReactElement, { size: 32 })}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`block text-xs font-bold uppercase tracking-widest mb-4 ${isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/60'}`}>Add a note (optional)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What's influencing your mood?"
              className={`w-full h-32 p-6 border-none rounded-3xl focus:ring-2 transition-all outline-none resize-none ${isDarkMode ? 'bg-[#0F172A] text-white focus:ring-indigo-500/20' : 'bg-[#f5f5f0] text-[#1a1a1a] focus:ring-[#5A5A40]/20'}`}
            />
          </div>

          <button
            type="submit"
            disabled={submitting || !selectedMood}
            className={`w-full py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${isDarkMode ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-[#5A5A40] text-white hover:bg-[#4a4a34]'}`}
          >
            {submitting ? <Loader2 className="animate-spin" /> : <><Plus size={20} /> Log Mood</>}
          </button>
        </form>
      </section>

      <section className="space-y-6">
        <h2 className={`text-2xl font-serif ${isDarkMode ? 'text-white' : 'text-[#5A5A40]'}`}>History</h2>
        
        {indexError ? (
          <div className={`p-8 border rounded-[2rem] ${isDarkMode ? 'bg-amber-900/20 border-amber-900/30 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
            <h3 className="font-bold mb-2 text-lg">Database Index Required</h3>
            <p className="mb-4 text-sm opacity-90">
              To sort your mood history by date, a Firestore index needs to be created. 
              This is a one-time setup step.
            </p>
            <a 
              href={indexError} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-amber-600 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-amber-700 transition-all"
            >
              Click here to create the index
            </a>
            <p className="mt-4 text-xs opacity-60 italic">
              After clicking, wait about 2-3 minutes for Firebase to build the index, then refresh this page.
            </p>
          </div>
        ) : loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className={`animate-spin ${isDarkMode ? 'text-indigo-400' : 'text-[#5A5A40]'}`} />
          </div>
        ) : entries.length === 0 ? (
          <div className={`text-center py-20 rounded-[2.5rem] border border-dashed ${isDarkMode ? 'bg-[#1E293B] border-white/10' : 'bg-white border-[#5A5A40]/20'}`}>
            <Calendar className={`mx-auto mb-4 ${isDarkMode ? 'text-slate-700' : 'text-[#5A5A40]/20'}`} size={48} />
            <p className={isDarkMode ? 'text-slate-500' : 'text-[#5A5A40]/40'}>No mood logs yet.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {entries.map((entry) => {
              const moodInfo = moods.find(m => m.label === entry.mood);
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-6 rounded-[2rem] shadow-sm border flex items-center gap-6 ${isDarkMode ? 'bg-[#1E293B] border-white/10' : 'bg-white border-[#5A5A40]/5'}`}
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${moodInfo?.color || 'bg-gray-50'}`}>
                    {moodInfo ? React.cloneElement(moodInfo.icon as React.ReactElement, { size: 28 }) : <Meh size={28} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-3">
                        <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-[#5A5A40]'}`}>{entry.mood}</h3>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-[#5A5A40]/40'}`}>
                          {entry.createdAt?.toDate().toLocaleDateString()} {entry.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className={`p-2 rounded-full transition-all ${isDarkMode ? 'text-slate-500 hover:bg-white/5 hover:text-red-400' : 'text-[#5A5A40]/30 hover:bg-red-50 hover:text-red-500'}`}
                        title="Delete entry"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    {entry.note && (
                      <p className={`text-sm flex items-start gap-2 ${isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/70'}`}>
                        <MessageSquare size={14} className="mt-1 flex-shrink-0" />
                        {entry.note}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default MoodTracker;
