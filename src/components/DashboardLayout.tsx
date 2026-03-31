import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Activity, 
  Settings, 
  HelpCircle, 
  MessageSquare, 
  LogOut, 
  Brain,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../AuthContext';
import { useTheme } from '../ThemeContext';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <MessageSquare size={20} />, label: 'Chat AI', path: '/chat', external: true },
    { icon: <Activity size={20} />, label: 'Mood Tracker', path: '/mood-tracker' },
    { icon: <BookOpen size={20} />, label: 'Journal', path: '/journal' },
    { icon: <Activity size={20} />, label: 'Exercise', path: '/exercise' },
    { icon: <HelpCircle size={20} />, label: 'Help', path: '/help' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  const handleNavClick = (item: any) => {
    if (item.external) {
      window.open('https://shyamsundhrkarne1.retool.com/apps/bbb2d11e-2c50-11f1-a70e-73b21e59fc63/mental-health/page1', '_blank');
    } else {
      navigate(item.path);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-500 ${isDarkMode ? 'bg-[#0F172A] text-[#F8FAFC]' : 'bg-[#f5f5f0] text-[#1a1a1a]'}`}>
      {/* Sidebar - Desktop */}
      <aside className={`hidden md:flex flex-col w-64 border-r p-6 transition-colors duration-500 ${isDarkMode ? 'bg-[#1E293B] border-white/10' : 'bg-white border-[#5A5A40]/10'}`}>
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${isDarkMode ? 'bg-indigo-500' : 'bg-[#5A5A40]'}`}>
            <Brain size={16} />
          </div>
          <span className={`text-xl font-serif font-bold ${isDarkMode ? 'text-indigo-400' : 'text-[#5A5A40]'}`}>AI Therapy Companion</span>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavClick(item)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                location.pathname === item.path 
                  ? (isDarkMode ? 'bg-indigo-600 text-white shadow-lg' : 'bg-[#5A5A40] text-white shadow-md')
                  : (isDarkMode ? 'text-slate-400 hover:bg-white/5 hover:text-white' : 'text-[#5A5A40]/60 hover:bg-[#5A5A40]/5 hover:text-[#5A5A40]')
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className={`mt-auto pt-6 border-t ${isDarkMode ? 'border-white/10' : 'border-[#5A5A40]/10'}`}>
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold ${isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-[#5A5A40]/10 text-[#5A5A40]'}`}>
              {user?.displayName?.[0] || user?.email?.[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-bold truncate ${isDarkMode ? 'text-slate-200' : 'text-[#5A5A40]'}`}>{user?.displayName || 'User'}</p>
              <p className={`text-xs truncate ${isDarkMode ? 'text-slate-500' : 'text-[#5A5A40]/60'}`}>{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className={`md:hidden fixed top-0 left-0 right-0 border-b px-6 py-4 flex items-center justify-between z-50 transition-colors duration-500 ${isDarkMode ? 'bg-[#1E293B] border-white/10' : 'bg-white border-[#5A5A40]/10'}`}>
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${isDarkMode ? 'bg-indigo-500' : 'bg-[#5A5A40]'}`}>
            <Brain size={16} />
          </div>
          <span className={`text-xl font-serif font-bold ${isDarkMode ? 'text-indigo-400' : 'text-[#5A5A40]'}`}>AI Therapy Companion</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={isDarkMode ? 'text-slate-200' : 'text-[#5A5A40]'}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          className={`md:hidden fixed inset-0 z-40 pt-24 p-6 flex flex-col transition-colors duration-500 ${isDarkMode ? 'bg-[#0F172A]' : 'bg-white'}`}
        >
          <nav className="space-y-2 flex-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-lg font-medium ${
                  location.pathname === item.path 
                    ? (isDarkMode ? 'bg-indigo-600 text-white shadow-lg' : 'bg-[#5A5A40] text-white shadow-md')
                    : (isDarkMode ? 'text-slate-400' : 'text-[#5A5A40]/60')
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-lg font-medium text-red-500 mt-auto"
          >
            <LogOut size={24} />
            Logout
          </button>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 pt-24 md:pt-10 overflow-y-auto relative">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
