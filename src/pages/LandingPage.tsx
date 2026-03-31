import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Wind, Sparkles, ArrowRight, Shield, Brain, MessageSquare, Lock, Mail, Smile } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const Section = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <section className={`w-full py-24 px-8 md:px-12 relative ${className}`}>
      <div className="w-full max-w-7xl mx-auto z-10">
        {children}
      </div>
    </section>
  );
};

const LandingPage = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`relative min-h-screen font-sans selection:bg-[#5A5A40] selection:text-white overflow-x-hidden ${isDarkMode ? 'bg-[#0f172a]' : 'bg-[#f5f5f0]'}`}>
      {/* Navigation */}
      <nav className={`absolute top-0 left-0 right-0 z-50 border-b backdrop-blur-lg transition-all duration-300 ${isDarkMode ? 'bg-[#0f172a]/90 border-white/5' : 'bg-[#f5f5f0]/90 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm shrink-0 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
              <Brain size={20} />
            </div>
            <span className={`text-2xl font-serif font-bold tracking-tight leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>AI Therapy Companion</span>
          </div>
          <div className="flex items-center gap-10 text-sm font-bold uppercase tracking-widest leading-none">
            <Link to="/help" className={`hover:opacity-70 transition-opacity ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Help</Link>
            <Link to="/login" className={`px-10 py-3.5 rounded-full hover:scale-105 transition-all shadow-xl ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>Login</Link>
          </div>
        </div>
      </nav>

      {/* Content Sections */}
      <div className="relative z-10">
        {/* Section 1: Hero */}
        <Section className="min-h-screen flex items-center pt-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
            <div className="text-left relative z-20">
              <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 bg-[#5A5A40] rounded-full blur-2xl opacity-20" />
                <div className={`absolute inset-0 rounded-full shadow-xl flex items-center justify-center ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
                  <Sparkles className="text-[#5A5A40]" size={32} />
                </div>
              </div>
              <p className="text-[#5A5A40] font-bold uppercase tracking-[0.2em] text-sm mb-6">Your 24/7 Mental Wellness Partner</p>
              <h1 className={`text-6xl md:text-8xl font-serif tracking-tight mb-8 leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Find Peace in <br /> <span className="italic font-light text-[#5A5A40]">Your Journey</span>
              </h1>
              <p className={`text-xl md:text-2xl max-w-xl font-light leading-relaxed mb-12 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                A compassionate, non-judgmental space designed to support your mental journey. We combine AI empathy with proven therapeutic frameworks to help you thrive.
              </p>
              <div className="flex flex-wrap items-center gap-8">
                <Link to="/signup" className="bg-[#5A5A40] text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-[#5A5A40]/20">
                  Start Your Journey
                </Link>
                <button className={`text-lg font-bold hover:opacity-70 transition-opacity flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  View Demo <ArrowRight size={20} />
                </button>
              </div>
              <div className="mt-16 flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-[#f5f5f0] bg-slate-200 overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                    </div>
                  ))}
                </div>
                <p className={`text-sm font-bold tracking-wide ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  <span className="text-[#5A5A40]">10,000+</span> people finding calm today
                </p>
              </div>
            </div>
            <div className="relative">
              <div className={`aspect-[4/3] max-w-2xl w-full mx-auto rounded-[3rem] overflow-hidden shadow-2xl relative group border-[12px] ${isDarkMode ? 'border-slate-800' : 'border-white'}`}>
                <img 
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000" 
                  alt="Yoga at Sunset" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 bg-white p-6 rounded-[2rem] shadow-2xl border border-slate-100 max-w-[320px] transform -translate-x-8 translate-y-8">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                      <Smile size={24} />
                    </div>
                    <span className="font-bold text-slate-900 text-xl tracking-tight">Mood Improved</span>
                  </div>
                  <p className="text-slate-500 text-base leading-relaxed font-medium">
                    "I feel much more centered after our chat today. Thank you for listening."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 2: Why Choose AI Therapy */}
        <Section className={isDarkMode ? 'bg-slate-900/50' : 'bg-white/50'}>
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-[#5A5A40]/10 rounded-[4rem] rotate-6 scale-105" />
                <img 
                  src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1000" 
                  alt="Serene Landscape" 
                  className="absolute inset-0 w-full h-full object-cover rounded-[4rem] shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className={`text-6xl md:text-7xl font-serif mb-8 leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Why Choose <br />
                <span className="italic font-light text-[#5A5A40]">AI Therapy?</span>
              </h2>
              <p className={`text-xl leading-relaxed font-light mb-12 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Traditional therapy is invaluable, but it's not always accessible. We bridge the gap by providing immediate, affordable, and high-quality support whenever you need it.
              </p>
              <div className="grid sm:grid-cols-2 gap-10">
                {[
                  { title: "100% Private", desc: "Your data never leaves our secure platform." },
                  { title: "Zero Judgment", desc: "Speak your truth without fear." },
                  { title: "24/7 Availability", desc: "We're here for you at 3 AM or mid-afternoon." },
                  { title: "Affordable Care", desc: "Quality support shouldn't be a luxury." }
                ].map((item, i) => (
                  <div key={i} className="space-y-3">
                    <div className="w-2 h-2 bg-[#5A5A40] rounded-full" />
                    <h4 className={`font-bold text-xl ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
                    <p className={`leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Section 3: Features */}
        <Section>
          <div className="text-center mb-20">
            <h2 className={`text-6xl md:text-7xl font-serif mb-8 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Designed for Your Well-being</h2>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto font-light ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Every feature is crafted to provide you with the tools you need to navigate life's challenges.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "AI Therapist", desc: "Empathetic conversations powered by advanced AI.", icon: <MessageSquare /> },
              { title: "Mood Tracking", desc: "Visualize your emotional journey over time.", icon: <Heart /> },
              { title: "Smart Journal", desc: "Safe space for your thoughts with AI insights.", icon: <Sparkles /> },
              { title: "Wellness Exercises", desc: "Guided meditations and breathing techniques.", icon: <Wind /> },
              { title: "Panic Support", desc: "Immediate tools for moments of high anxiety.", icon: <Shield /> },
              { title: "Private & Secure", desc: "Military-grade encryption for your peace of mind.", icon: <Lock /> }
            ].map((feature, i) => (
              <div key={i} className={`p-10 rounded-[3rem] border transition-all duration-500 ${isDarkMode ? 'bg-slate-800/50 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-[#5A5A40]/10 text-[#5A5A40]'}`}>
                  {React.cloneElement(feature.icon as React.ReactElement, { size: 32 })}
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{feature.title}</h3>
                <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Section 4: Science */}
        <Section className={isDarkMode ? 'bg-slate-900/50' : 'bg-slate-100/50'}>
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative aspect-[4/3] rounded-[4rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000" 
                alt="Science and AI" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-12">
              <h2 className={`text-6xl font-serif leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Science-Backed <br />
                <span className="italic font-light text-[#5A5A40]">Support System</span>
              </h2>
              <div className="space-y-10">
                {[
                  { title: "CBT Framework", desc: "Our AI is trained on Cognitive Behavioral Therapy principles to help you reframe negative thoughts." },
                  { title: "Empathetic AI", desc: "Advanced natural language processing that recognizes and responds to emotional nuances." },
                  { title: "Instant Access", desc: "No waiting lists or appointments. Get the support you need the moment you need it." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8">
                    <div className="w-14 h-14 rounded-2xl bg-[#5A5A40] text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-lg shadow-[#5A5A40]/20">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className={`font-bold text-2xl mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
                      <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Section 5: Testimonials */}
        <Section>
          <div className="text-center mb-20">
            <h2 className={`text-6xl md:text-7xl font-serif mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Real Stories of Calm</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah J.", role: "Marketing Executive", text: "I was skeptical about AI therapy, but AI Therapy Companion has become my go-to for daily stress management. It's like having a wise friend in my pocket." },
              { name: "Michael R.", role: "Student", text: "The panic support feature literally saved me during finals week. The breathing exercises and immediate response helped me stay grounded." },
              { name: "Elena K.", role: "New Parent", text: "Finding time for myself is hard. Being able to chat for 5 minutes at 2 AM when I'm feeling overwhelmed has made a huge difference." }
            ].map((story, i) => (
              <div key={i} className={`p-12 rounded-[3rem] ${isDarkMode ? 'bg-slate-800/30' : 'bg-white shadow-sm border border-slate-100'}`}>
                <p className={`text-xl italic mb-10 leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>"{story.text}"</p>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#5A5A40]/20 flex items-center justify-center text-[#5A5A40] font-bold text-xl">
                    {story.name[0]}
                  </div>
                  <div>
                    <p className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{story.name}</p>
                    <p className="text-sm uppercase tracking-widest text-[#5A5A40] font-bold">{story.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Section 6: Mission */}
        <Section className={isDarkMode ? 'bg-slate-900/50' : 'bg-[#5A5A40]/5'}>
          <div className="max-w-4xl mx-auto text-center py-12">
            <h2 className={`text-6xl md:text-7xl font-serif mb-10 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Our Mission</h2>
            <p className={`text-2xl md:text-3xl font-light leading-relaxed mb-12 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Democratizing Mental Wellness. We believe that quality mental health support is a fundamental human right, not a privilege. Our goal is to make high-quality care accessible to everyone, everywhere.
            </p>
            <div className="w-32 h-1.5 bg-[#5A5A40] mx-auto rounded-full opacity-30" />
          </div>
        </Section>

        {/* Section 7: Final CTA */}
        <Section>
          <div className="text-center py-20">
            <h2 className={`text-7xl md:text-8xl font-serif mb-10 leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Ready to find <br />
              <span className="italic font-light text-[#5A5A40]">your calm?</span>
            </h2>
            <p className={`text-2xl md:text-3xl max-w-3xl mx-auto font-light mb-16 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Join thousands of others who are taking control of their mental well-being with AI Therapy Companion.
            </p>
            <Link to="/signup" className="group relative inline-flex items-center gap-4 bg-[#5A5A40] text-white px-16 py-8 rounded-full text-3xl font-medium hover:scale-105 transition-transform overflow-hidden shadow-2xl shadow-[#5A5A40]/30">
              <div className="absolute inset-0 bg-gradient-to-r from-[#5A5A40] to-[#4a4a34] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10">Get Started for Free</span>
              <ArrowRight className="relative z-10 group-hover:translate-x-3 transition-transform" size={32} />
            </Link>
          </div>
        </Section>
      </div>

      {/* Footer */}
      <footer className={`w-full py-24 px-8 border-t ${isDarkMode ? 'bg-[#0f172a] border-white/5' : 'bg-white border-slate-100'}`}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-16">
          <div className="md:col-span-2 space-y-10">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                <Brain size={20} />
              </div>
              <span className={`text-2xl font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>AI Therapy Companion</span>
            </div>
            <p className={`text-lg leading-relaxed max-w-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Your companion for mental well-being. Providing support, one conversation at a time. Empowering you to find peace in the digital age.
            </p>
            <div className="flex gap-5">
              {[MessageSquare, Mail, Shield].map((Icon, i) => (
                <a key={i} href="#" className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${isDarkMode ? 'border-slate-800 text-slate-400 hover:bg-slate-800' : 'border-slate-100 text-slate-400 hover:bg-slate-50'}`}>
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-8 uppercase tracking-widest text-xs text-[#5A5A40]">Product</h4>
            <ul className={`space-y-5 text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              <li><Link to="/chat" className="hover:text-[#5A5A40] transition-colors">AI Chat</Link></li>
              <li><Link to="/journal" className="hover:text-[#5A5A40] transition-colors">Journal</Link></li>
              <li><Link to="/mood-tracker" className="hover:text-[#5A5A40] transition-colors">Mood Tracker</Link></li>
              <li><Link to="/wellness" className="hover:text-[#5A5A40] transition-colors">Wellness Hub</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-8 uppercase tracking-widest text-xs text-[#5A5A40]">Company</h4>
            <ul className={`space-y-5 text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              <li><Link to="/about" className="hover:text-[#5A5A40] transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-[#5A5A40] transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-[#5A5A40] transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-[#5A5A40] transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-8 uppercase tracking-widest text-xs text-[#5A5A40]">Legal</h4>
            <ul className={`space-y-5 text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              <li><Link to="/privacy" className="hover:text-[#5A5A40] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[#5A5A40] transition-colors">Terms of Service</Link></li>
              <li><Link to="/security" className="hover:text-[#5A5A40] transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm font-medium text-slate-400">© 2026 AI Therapy Companion. Created by Shyam Sundhr Karne. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <span className="text-sm font-bold italic text-slate-300 tracking-tighter">Companion</span>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm font-bold uppercase tracking-widest hover:text-[#5A5A40] transition-colors flex items-center gap-2 text-slate-400">
              Back to top <ArrowRight className="-rotate-90" size={16} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
