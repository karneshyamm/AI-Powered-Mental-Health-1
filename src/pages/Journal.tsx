import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../AuthContext';
import { auth, db } from '../firebase';
import { collection, addDoc, query, where, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { Plus, BookOpen, Calendar, Loader2 } from 'lucide-react';
import { useTheme } from '../ThemeContext';

interface JournalEntry {
  id: string;
  content: string;
  mood: string;
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

const Journal = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [mood, setMood] = useState('Neutral');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [indexError, setIndexError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const path = 'journals';
    setIndexError(null);
    const q = query(
      collection(db, path),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as JournalEntry[];
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
    if (!newEntry.trim() || !user) return;

    const path = 'journals';
    setSubmitting(true);
    try {
      await addDoc(collection(db, path), {
        userId: user.uid,
        content: newEntry,
        mood,
        createdAt: Timestamp.now()
      });
      setNewEntry('');
      setMood('Neutral');
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, path);
    } finally {
      setSubmitting(false);
    }
  };

  const moods = ['Happy', 'Calm', 'Neutral', 'Sad', 'Anxious', 'Angry'];

  return (
    <div className="space-y-10">
      <header>
        <h1 className={`text-4xl font-serif mb-2 ${isDarkMode ? 'text-white' : 'text-[#5A5A40]'}`}>Your Journal</h1>
        <p className={isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/60'}>A safe space for your thoughts.</p>
      </header>

      {/* New Entry Form */}
      <section className={`p-8 rounded-[2.5rem] shadow-sm border transition-all ${isDarkMode ? 'bg-[#1E293B] border-white/5' : 'bg-white border-[#5A5A40]/5'}`}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-xs font-bold uppercase tracking-widest mb-4 ${isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/60'}`}>How are you feeling?</label>
            <div className="flex flex-wrap gap-2">
              {moods.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMood(m)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    mood === m 
                      ? (isDarkMode ? 'bg-indigo-600 text-white' : 'bg-[#5A5A40] text-white') 
                      : (isDarkMode ? 'bg-white/5 text-slate-400 hover:bg-white/10' : 'bg-[#f5f5f0] text-[#5A5A40] hover:bg-[#5A5A40]/10')
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`block text-xs font-bold uppercase tracking-widest mb-4 ${isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/60'}`}>What's on your mind?</label>
            <textarea
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              placeholder="Write freely..."
              className={`w-full h-40 p-6 border-none rounded-3xl transition-all outline-none resize-none ${isDarkMode ? 'bg-white/5 text-white focus:ring-indigo-500/20' : 'bg-[#f5f5f0] text-[#5A5A40] focus:ring-[#5A5A40]/20'}`}
            />
          </div>

          <button
            type="submit"
            disabled={submitting || !newEntry.trim()}
            className={`w-full py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${isDarkMode ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-[#5A5A40] text-white hover:bg-[#4a4a34]'}`}
          >
            {submitting ? <Loader2 className="animate-spin" /> : <><Plus size={20} /> Save Entry</>}
          </button>
        </form>
      </section>

      {/* Entries List */}
      <section className="space-y-6">
        <h2 className={`text-2xl font-serif ${isDarkMode ? 'text-white' : 'text-[#5A5A40]'}`}>Previous Entries</h2>
        
        {indexError ? (
          <div className={`p-8 border rounded-[2rem] ${isDarkMode ? 'bg-amber-900/20 border-amber-900/30 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
            <h3 className="font-bold mb-2 text-lg">Database Index Required</h3>
            <p className="mb-4 text-sm opacity-90">
              To sort your entries by date, a Firestore index needs to be created. 
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
            <Loader2 className={`animate-spin ${isDarkMode ? 'text-indigo-500' : 'text-[#5A5A40]'}`} />
          </div>
        ) : entries.length === 0 ? (
          <div className={`text-center py-20 rounded-[2.5rem] border border-dashed ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-[#5A5A40]/20'}`}>
            <BookOpen className={`mx-auto mb-4 ${isDarkMode ? 'text-slate-700' : 'text-[#5A5A40]/20'}`} size={48} />
            <p className={isDarkMode ? 'text-slate-500' : 'text-[#5A5A40]/40'}>No entries yet. Start writing today.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {entries.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-8 rounded-[2rem] shadow-sm border transition-all ${isDarkMode ? 'bg-[#1E293B] border-white/5' : 'bg-white border-[#5A5A40]/5'}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-[#5A5A40]/60'}`}>
                    <Calendar size={14} />
                    {entry.createdAt?.toDate().toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'bg-white/5 text-slate-400' : 'bg-[#5A5A40]/10 text-[#5A5A40]'}`}>
                    {entry.mood}
                  </span>
                </div>
                <p className={`leading-relaxed whitespace-pre-wrap ${isDarkMode ? 'text-slate-300' : 'text-[#5A5A40]'}`}>
                  {entry.content}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Journal;
