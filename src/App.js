import React, { useState, useEffect } from 'react';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import { BarChart3, BookOpen, Monitor, ArrowLeft, ChevronRight, LayoutGrid, Lock, CheckCircle, User } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState('loading'); // loading, login, menu, page1, page2, page3
  const [username, setUsername] = useState('');

  // 1. SYSTEM CHECK: On load, check if this is a "New Tab" request
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');

    if (pageParam) {
      // If URL has ?page=1, skip login and go straight to page
      setCurrentView(`page${pageParam}`);
    } else {
      // Otherwise, show the Login Screen
      setTimeout(() => setCurrentView('login'), 800);
    }
  }, []);

  // 2. OPEN NEW TAB LOGIC
  const openInNewTab = (pageId) => {
    // Opens current URL + ?page=X in a new tab
    const url = `${window.location.origin}${window.location.pathname}?page=${pageId}`;
    window.open(url, '_blank');
  };

  // 3. RENDER THE PAGES (If in separate tab)
  if (currentView === 'page1') return <div className="animate-in fade-in duration-700"><Page1 /></div>;
  if (currentView === 'page2') return <div className="animate-in fade-in duration-700"><Page2 /></div>;
  if (currentView === 'page3') return <div className="animate-in fade-in duration-700"><Page3 /></div>;

  // 4. LOADING SCREEN
  if (currentView === 'loading') {
    return (
      <div className="min-h-screen bg-[#0095DA] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-white font-bold tracking-widest text-sm animate-pulse">INITIALIZING B-READY...</div>
      </div>
    );
  }

  // 5. LOGIN SCREEN
  if (currentView === 'login') {
    return (
      <LoginScreen onLogin={(name) => {
        setUsername(name);
        setCurrentView('menu');
      }} />
    );
  }

  // 6. MAIN DASHBOARD (The Menu)
  return (
    <div className="min-h-screen bg-[#0095DA] flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center animate-in zoom-in duration-500">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-blue-50 text-xs font-bold uppercase tracking-widest mb-6 shadow-lg">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> System Online • Welcome, {username || 'Guest'}
          </div>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Blibli_%282023%29.svg/2560px-Blibli_%282023%29.svg.png" 
            alt="Blibli Logo" 
            className="h-16 md:h-20 mx-auto mb-6 drop-shadow-xl brightness-0 invert hover:scale-105 transition-transform duration-500" 
          />
          <h1 className="text-white text-5xl md:text-7xl font-black tracking-tight mb-2 drop-shadow-lg">
            B-READY <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-white">PORTAL</span>
          </h1>
          <p className="text-blue-50 text-lg font-light max-w-xl mx-auto">
            Select a module to launch securely in a new workspace.
          </p>
        </div>

        {/* The 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <MenuCard 
            title="Strategic Proposal" 
            desc="Executive Dashboard & ROI Simulator"
            icon={<BarChart3 size={32}/>}
            delay="0"
            onClick={() => openInNewTab('1')}
          />

          <MenuCard 
            title="Learning Platform" 
            desc="Interactive LXP & Simulation Engine"
            icon={<BookOpen size={32}/>}
            delay="100"
            onClick={() => openInNewTab('2')}
          />

          <MenuCard 
            title="Facilitator Deck" 
            desc="Trainer Notes & Visual Slides"
            icon={<Monitor size={32}/>}
            delay="200"
            onClick={() => openInNewTab('3')}
          />
        </div>

        {/* Footer */}
        <div className="mt-16 flex items-center gap-2 text-blue-100/40 text-[10px] font-bold tracking-[0.2em] uppercase">
          <LayoutGrid size={12}/> OD Strategy & Content Proposal • 2025
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

// 1. The Menu Card (With Hover Glow)
function MenuCard({ title, desc, icon, onClick, delay }) {
  return (
    <button 
      onClick={onClick}
      className="group text-left relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2.5rem] hover:bg-white/20 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/30 transition-all duration-300 ease-out h-full flex flex-col overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Glossy Reflection Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      <div className="bg-white text-[#0095DA] p-5 rounded-2xl w-fit mb-6 shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 relative z-10">
        {icon}
      </div>
      <h2 className="text-white text-2xl font-bold mb-2 flex items-center justify-between w-full relative z-10">
        {title} 
        <div className="bg-white/20 p-1 rounded-full opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
          <ChevronRight size={20} />
        </div>
      </h2>
      <p className="text-blue-50/80 leading-relaxed text-sm font-medium relative z-10">
        {desc}
      </p>
    </button>
  );
}

// 2. The Login Screen (Simulated)
function LoginScreen({ onLogin }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEnter = () => {
    if(!input) return;
    setLoading(true);
    setTimeout(() => onLogin(input), 1500); // Fake network delay
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 font-sans relative">
      <div className="absolute inset-0 bg-[#0095DA]/20 blur-[150px]"></div>
      
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl w-full max-w-md shadow-2xl relative z-10 animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#0095DA] rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
            <Lock className="text-white" size={32}/>
          </div>
          <h2 className="text-white text-2xl font-bold">Username: Pilot</h2>
          <p className="text-slate-400 text-sm">B-Ready Transformation Portal</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1 mb-2 block">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 text-slate-400" size={18}/>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0095DA] transition-all"
                placeholder="Enter your name..."
                onKeyDown={(e) => e.key === 'Enter' && handleEnter()}
              />
            </div>
          </div>

          <button 
            onClick={handleEnter}
            disabled={!input || loading}
            className="w-full bg-[#0095DA] hover:bg-[#007bb5] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>Connecting <span className="animate-pulse">...</span></>
            ) : (
              <>Enter Portal <ArrowLeft className="rotate-180" size={18}/></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;