import React from 'react';
import { motion } from 'motion/react';
import { HelpCircle, Phone, Mail, MessageSquare, ExternalLink } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const Help = () => {
  const { isDarkMode } = useTheme();
  const faqs = [
    { q: "What is Serenity AI?", a: "Serenity AI is a mental health companion designed to provide emotional support, journaling tools, and wellness exercises." },
    { q: "Is my data secure?", a: "Yes, we use Firebase's secure authentication and database to ensure your personal information and journal entries are private." },
    { q: "How do I use the AI Chat?", a: "Simply click on 'Chat AI' in the sidebar. It will connect you to our specialized mental health support interface." },
    { q: "Is this a replacement for therapy?", a: "No, Serenity AI is a support tool. If you are in a crisis, please contact professional emergency services immediately." }
  ];

  return (
    <div className="space-y-10">
      <header>
        <h1 className={`text-4xl font-serif mb-2 ${isDarkMode ? 'text-white' : 'text-[#5A5A40]'}`}>Help & Support</h1>
        <p className={isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/60'}>We're here to support your journey.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <div className={`p-8 rounded-[2rem] shadow-sm border text-center transition-all ${isDarkMode ? 'bg-[#1E293B] border-white/5' : 'bg-white border-[#5A5A40]/5'}`}>
          <Phone className={`mx-auto mb-4 ${isDarkMode ? 'text-indigo-400' : 'text-[#5A5A40]'}`} size={32} />
          <h3 className={`font-serif text-xl mb-2 ${isDarkMode ? 'text-white' : ''}`}>Crisis Hotline</h3>
          <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/60'}`}>Available 24/7 for immediate support.</p>
          <a href="tel:988" className={`font-bold text-lg ${isDarkMode ? 'text-indigo-400' : 'text-[#5A5A40]'}`}>988</a>
        </div>
        <div className={`p-8 rounded-[2rem] shadow-sm border text-center transition-all ${isDarkMode ? 'bg-[#1E293B] border-white/5' : 'bg-white border-[#5A5A40]/5'}`}>
          <Mail className={`mx-auto mb-4 ${isDarkMode ? 'text-indigo-400' : 'text-[#5A5A40]'}`} size={32} />
          <h3 className={`font-serif text-xl mb-2 ${isDarkMode ? 'text-white' : ''}`}>Email Support</h3>
          <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/60'}`}>We'll get back to you within 24 hours.</p>
          <a href="mailto:support@serenity.ai" className={`font-bold ${isDarkMode ? 'text-indigo-400' : 'text-[#5A5A40]'}`}>support@serenity.ai</a>
        </div>
        <div className={`p-8 rounded-[2rem] shadow-sm border text-center transition-all ${isDarkMode ? 'bg-[#1E293B] border-white/5' : 'bg-white border-[#5A5A40]/5'}`}>
          <MessageSquare className={`mx-auto mb-4 ${isDarkMode ? 'text-indigo-400' : 'text-[#5A5A40]'}`} size={32} />
          <h3 className={`font-serif text-xl mb-2 ${isDarkMode ? 'text-white' : ''}`}>Community</h3>
          <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/60'}`}>Join our mindful community forum.</p>
          <button className={`font-bold flex items-center gap-1 mx-auto ${isDarkMode ? 'text-indigo-400' : 'text-[#5A5A40]'}`}>
            Join Now <ExternalLink size={14} />
          </button>
        </div>
      </div>

      <section className={`p-10 rounded-[2.5rem] border transition-all ${isDarkMode ? 'bg-[#1E293B] border-white/5' : 'bg-white border-[#5A5A40]/5'}`}>
        <h2 className={`text-2xl font-serif mb-8 ${isDarkMode ? 'text-white' : 'text-[#5A5A40]'}`}>Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`pb-6 last:border-0 border-b ${isDarkMode ? 'border-white/10' : 'border-[#5A5A40]/10'}`}
            >
              <h4 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#5A5A40]'}`}>{faq.q}</h4>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/60'}`}>{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Help;
