import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, ArrowLeft, Brain, Zap, MessageSquare, 
  BarChart2, Shield, Clock, CheckCircle, AlertTriangle, 
  ChevronDown, ChevronUp, Mic, Wifi, WifiOff, X, Send,
  Target, TrendingUp, Users, Smartphone, Monitor, BookOpen,
  Anchor, Activity, Lock, Layers, Eye, ThumbsUp, Mail,
  Battery, BatteryCharging, Network, 
  GitMerge, GitPullRequest, Edit3, HelpCircle, UserCheck,
  FileText, Calendar, PenTool, Phone
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

// --- Theme & Constants ---
const COLORS = {
  cream: '#f3f0df',
  navy: '#005088',
  amber: '#f59e0b',
  slate: '#334155',
  white: '#ffffff',
  red: '#ef4444',
  green: '#10b981',
  blueLight: '#e0f2fe'
};

const BLIBLI_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Blibli_%282023%29.svg/2560px-Blibli_%282023%29.svg.png";

const SEGMENTS = ["Intro", "The Why", "The What", "The How", "Next Steps"];

// --- Data Sets ---
const PREP_STEPS = [
  { letter: 'P', title: 'Point', desc: 'Bottom Line Up Front (BLUF). State your main idea immediately.', icon: Target },
  { letter: 'R', title: 'Reason', desc: 'Why does this matter? Link to business metrics (Revenue, Risk, Time).', icon: Brain },
  { letter: 'E', title: 'Evidence', desc: 'Data, charts, or precedents to vaccine against objection.', icon: Shield },
  { letter: 'P', title: 'Point', desc: 'Reiterate the main point as a specific Call to Action.', icon: Anchor },
];

const DIGITAL_RULE_DATA = [
  { name: 'Words', value: 7, fill: COLORS.slate },
  { name: 'Tone/Voice', value: 38, fill: COLORS.amber },
  { name: 'Structure', value: 55, fill: COLORS.navy },
];

const CHAT_SCENARIOS = {
  intro: {
    sender: 'Boss (VP)',
    text: 'Payment gateway down 10 menit lalu! Kenapa belum ada update?? Customer complain numpuk di Twitter!',
    options: [
      { id: 'A', text: 'Waduh, maaf pak. Kami juga panik ini sedang dicek sama tim IT. Sabar ya.', score: 'bad' },
      { id: 'B', text: 'Gateway down sejak 10:05. Tim Tech sedang rerouting traffic ke backup server. ETA fix 15 menit. Kami akan update tiap 5 menit.', score: 'good' }
    ]
  },
  goodResponse: {
    sender: 'You',
    text: 'Gateway down sejak 10:05. Tim Tech sedang rerouting traffic ke backup server. ETA fix 15 menit. Kami akan update tiap 5 menit.',
    reply: 'Oke, good. Pastikan CS pegang template jawaban ini. Update saya 15 menit lagi.'
  },
  badResponse: {
    sender: 'You',
    text: 'Waduh, maaf pak. Kami juga panik ini sedang dicek sama tim IT. Sabar ya.',
    reply: 'Saya butuh solusi, bukan panik! Escalation matrix jalan gak??'
  }
};

const SBIA_STEPS = [
  { step: 'S', title: 'Situation', desc: 'Anchor in time/place. "In yesterday\'s meeting..."' },
  { step: 'B', title: 'Behavior', desc: 'Observable facts only. "You interrupted the client twice..."' },
  { step: 'I', title: 'Impact', desc: 'Effect on the business. "It made us look unprepared..."' },
  { step: 'A', title: 'Action', desc: 'Future request. "Next time, please wait until Q&A."' }
];

// --- Helper Components ---
const Card = ({ children, className = "", onClick, style }) => (
  <div 
    onClick={onClick}
    style={style}
    className={`bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 p-6 transition-all duration-300 hover:shadow-xl ${className}`}
  >
    {children}
  </div>
);

const Button = ({ children, onClick, className = "", variant = "primary", disabled = false }) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className={`px-6 py-2 rounded-lg font-bold transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
      variant === "primary" 
      ? "bg-[#005088] text-white hover:bg-[#003d66] shadow-md" 
      : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
    } ${className}`}
  >
    {children}
  </button>
);

// --- Layout Component ---
const SlideLayout = ({ children, title, subtitle, slideIndex, totalSlides, notes, onNext, onPrev, theme = 'light', segment }) => {
  const [showNotes, setShowNotes] = useState(false);
  const progress = ((slideIndex + 1) / totalSlides) * 100;

  return (
    <div className={`h-screen w-full flex flex-col font-sans transition-colors duration-500 overflow-hidden relative
      ${theme === 'dark' ? 'bg-[#005088] text-white' : 'bg-[#f3f0df] text-[#334155]'}`}>
      
      {/* Top Bar */}
      <div className="w-full h-1.5 bg-gray-200/30">
        <div 
          className="h-full bg-[#f59e0b] transition-all duration-500 ease-out shadow-[0_0_10px_rgba(245,158,11,0.7)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <header className="px-6 py-3 flex justify-between items-center z-10 bg-white/5 backdrop-blur-md border-b border-white/10 shrink-0">
        <div className="flex items-center gap-6">
           <img src={BLIBLI_LOGO} alt="Blibli" className="h-6 object-contain" style={{ filter: theme === 'dark' ? 'brightness(0) invert(1)' : 'none' }} />
           
           {/* Segment Indicator */}
           <div className="hidden md:flex items-center gap-1 bg-black/5 rounded-full p-1">
             {SEGMENTS.map((seg, i) => (
               <div key={seg} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                 segment === seg 
                 ? (theme === 'dark' ? 'bg-[#f59e0b] text-white' : 'bg-[#005088] text-white') 
                 : 'text-slate-400'
               }`}>
                 {seg}
               </div>
             ))}
           </div>
        </div>

        <div className="text-right">
          <h1 className="text-lg font-bold font-serif">{title}</h1>
          <p className="text-xs opacity-70 uppercase tracking-wide">{subtitle}</p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative px-4 md:px-8 lg:px-12 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-300">
        <div className="flex-1 flex items-center justify-center w-full max-w-7xl mx-auto py-8">
          {children}
        </div>
      </main>

      {/* Navigation & Notes */}
      <footer className="px-8 py-6 flex justify-between items-center z-10 bg-white/5 backdrop-blur-md border-t border-white/10 shrink-0">
        <button 
          onClick={() => setShowNotes(!showNotes)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
            ${showNotes ? 'bg-[#f59e0b] text-white shadow-lg' : 'bg-black/5 hover:bg-black/10'}`}
        >
          <BookOpen size={16} />
          {showNotes ? 'Hide Guide' : 'Trainer Notes'}
        </button>

        <div className="flex items-center gap-4">
          <span className="text-xs opacity-50 font-mono hidden md:block">Slide {slideIndex + 1} / {totalSlides}</span>
          <div className="flex gap-2">
            <button 
              onClick={onPrev} 
              disabled={slideIndex === 0}
              className="p-3 rounded-full border border-current opacity-50 hover:opacity-100 disabled:opacity-20 transition-all hover:bg-white/10"
            >
              <ArrowLeft size={20} />
            </button>
            <button 
              onClick={onNext}
              disabled={slideIndex === totalSlides - 1}
              className="p-3 rounded-full text-white hover:scale-105 disabled:bg-gray-400 disabled:scale-100 transition-all shadow-xl"
              style={{ backgroundColor: theme === 'dark' ? '#f59e0b' : '#005088' }}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </footer>

      {/* Trainer Notes Panel */}
      <div 
        className={`absolute bottom-24 left-8 w-96 max-h-[60vh] overflow-y-auto bg-white/95 backdrop-blur-xl text-slate-800 p-6 rounded-xl shadow-2xl transform transition-all duration-300 border-l-4 border-[#f59e0b] z-50
        ${showNotes ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}
      >
        <h4 className="font-bold text-[#005088] mb-2 flex items-center gap-2 border-b pb-2">
          <Mic size={16} /> Facilitator Guide
        </h4>
        <p className="text-sm leading-relaxed whitespace-pre-line text-slate-600">{notes}</p>
      </div>
    </div>
  );
};

// --- Slide Components ---

// 1. Cover
const CoverSlide = () => (
  <div className="text-center space-y-8 animate-[fadeInUp_1s_ease-out]">
    <div className="inline-block px-4 py-1 border border-[#005088] rounded-full text-[#005088] text-sm tracking-widest font-bold mb-4 bg-blue-50/50 backdrop-blur-sm">
      STRATEGIC COMMUNICATION MASTERY
    </div>
    <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#005088] leading-tight drop-shadow-sm">
      Strategic Impact <br /> Begins with <span className="text-[#f59e0b] underline decoration-4 decoration-[#f59e0b]/30">Clarity</span>
    </h1>
    <p className="text-xl md:text-2xl text-[#334155] max-w-2xl mx-auto font-light leading-relaxed">
      Converting Digital Fluidity into Operational Precision.
    </p>
    <div className="pt-8">
       <button className="px-8 py-3 bg-[#005088] text-white rounded shadow-lg hover:shadow-[#005088]/30 hover:-translate-y-1 transition-all duration-300 font-medium tracking-wide">
         Initialize Session
       </button>
    </div>
  </div>
);

// 2. Friction
const FrictionSlide = () => {
  const [fixed, setFixed] = useState(false);
  return (
    <div className="w-full max-w-4xl flex flex-col items-center gap-12">
      <div 
        className={`cursor-pointer group relative p-12 rounded-3xl border-2 transition-all duration-500 w-full text-center
        ${fixed ? 'bg-green-50/50 border-green-500 shadow-[0_0_30px_rgba(16,185,129,0.2)]' : 'bg-white/50 border-dashed border-red-300 hover:border-red-400'}`}
        onClick={() => setFixed(true)}
      >
        {!fixed ? (
          <div className="animate-pulse">
            <WifiOff size={80} className="text-red-500 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-slate-700">Communication Breakdown</h3>
            <p className="text-slate-500 mt-2">Click to Restore Operational Flow</p>
          </div>
        ) : (
          <div className="animate-[bounceIn_0.5s_ease-out]">
            <Wifi size={80} className="text-[#10b981] mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-[#005088]">Operational Flow Restored</h3>
            <p className="text-slate-500 mt-2">Signal Clear • Latency Removed</p>
          </div>
        )}
      </div>
      <div className="w-full grid grid-cols-2 gap-8">
        <Card className="text-center border-t-4 border-t-red-500">
          <p className="text-slate-500 uppercase text-xs font-bold tracking-wider mb-2">Operational Lag</p>
          <div className={`text-5xl font-bold transition-all duration-1000 ${fixed ? 'text-green-600' : 'text-red-500'}`}>
            {fixed ? '5%' : '85%'}
          </div>
        </Card>
        <Card className="text-center border-t-4 border-t-[#005088]">
          <p className="text-slate-500 uppercase text-xs font-bold tracking-wider mb-2">Team Alignment</p>
          <div className={`text-5xl font-bold transition-all duration-1000 ${fixed ? 'text-[#005088]' : 'text-slate-400'}`}>
            {fixed ? '98%' : '20%'}
          </div>
        </Card>
      </div>
    </div>
  );
};

// 3. Signal Loss
const SignalLossSlide = () => {
  return (
    <div className="w-full max-w-5xl flex flex-col items-center">
      <h3 className="text-3xl font-bold text-[#005088] mb-8">The "Telephone Game" Effect</h3>
      <p className="mb-8 text-slate-600">Strategy degrades as it moves down the hierarchy without clarity.</p>
      <div className="w-full space-y-4">
        {[
          { role: 'CEO / VP Strategy', text: "We need to optimize the checkout flow to reduce drop-off by 10%.", clarity: 100, color: 'bg-[#005088] text-white' },
          { role: 'Senior Manager', text: "We need to fix the checkout page to get more sales.", clarity: 80, color: 'bg-blue-600 text-white' },
          { role: 'Team Lead', text: "Guys, checkout is broken. We need to change the buttons.", clarity: 50, color: 'bg-blue-400 text-white' },
          { role: 'Staff / Executor', text: "Just make the button bigger? I think that's what they want.", clarity: 20, color: 'bg-blue-200 text-slate-700' }
        ].map((layer, i) => (
          <div key={i} className={`flex items-center gap-6 p-4 rounded-xl transition-all hover:scale-[1.02] shadow-md ${layer.color}`} style={{ opacity: 1 - (i * 0.1) }}>
             <div className="w-48 font-bold text-sm uppercase tracking-wider border-r border-white/20 pr-4">{layer.role}</div>
             <div className="flex-1 font-serif text-lg" style={{ filter: `blur(${i * 0.5}px)` }}>"{layer.text}"</div>
             <div className="font-bold">{layer.clarity}% Clarity</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 4. Context Collapse
const ContextCollapseSlide = () => {
  const [isWork, setIsWork] = useState(false);
  return (
    <div className="w-full max-w-5xl flex flex-col md:flex-row gap-12 items-center justify-center">
      <div className="flex-1 space-y-8">
        <div>
          <h3 className="text-4xl font-serif font-bold text-[#005088] mb-4">Context Collapse</h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            In <span className="font-bold text-[#005088]">High Context</span> (Social), ambiguity is efficient.<br/>
            In <span className="font-bold text-red-500">Low Context</span> (Work), ambiguity is dangerous.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white p-2 rounded-full w-fit shadow-md border border-slate-100">
          <span className={`px-6 py-2 rounded-full text-sm font-bold transition-colors ${!isWork ? 'bg-[#f59e0b] text-white shadow' : 'text-slate-400'}`}>Social Mode</span>
          <button onClick={() => setIsWork(!isWork)} className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 flex items-center ${isWork ? 'bg-[#005088]' : 'bg-slate-200'}`}>
            <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isWork ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
          <span className={`px-6 py-2 rounded-full text-sm font-bold transition-colors ${isWork ? 'bg-[#005088] text-white shadow' : 'text-slate-400'}`}>Work Mode</span>
        </div>
      </div>
      <div className="flex-1">
        <div className="mockup-phone border-slate-800 rounded-[2.5rem] border-[10px] overflow-hidden shadow-2xl bg-white w-80 mx-auto h-[500px] relative">
          <div className="bg-slate-50 h-full flex flex-col">
            <div className="bg-white px-6 py-4 shadow-sm text-center font-bold text-xs flex justify-between items-center z-10">
              <span className="text-slate-400">9:41</span>
              <span>{isWork ? 'Slack' : 'WhatsApp'}</span>
              <span className="text-slate-400"><Wifi size={12}/></span>
            </div>
            <div className="p-4 space-y-4 flex-1 overflow-y-auto">
               <div className={`p-4 rounded-2xl rounded-tl-none max-w-[85%] shadow-sm ${isWork ? 'bg-blue-100 text-blue-900' : 'bg-green-100 text-green-900'}`}>
                 <p className="text-xs font-bold mb-1 opacity-50">Boss</p>
                 {isWork ? "Could you please provide the status update for Q3?" : "Gmn? Aman?"}
               </div>
               <div className={`ml-auto p-4 rounded-2xl rounded-tr-none max-w-[85%] shadow-sm text-white ${isWork ? 'bg-[#005088]' : 'bg-[#10b981]'}`}>
                 {isWork ? "On it. Sending the deck in 5 mins." : "Aman gan 👍"}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 5. Skull Case
const SkullCaseSlide = () => (
  <div className="w-full max-w-5xl">
     <h3 className="text-3xl font-serif font-bold text-[#005088] text-center mb-4">The 12.12 Skull Case 💀</h3>
     <p className="text-center text-slate-500 mb-12">Generational Syntax Error during a Critical Event.</p>
     <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
        <div className="flex-1 bg-white p-8 rounded-2xl shadow-xl border-t-8 border-red-500 relative group hover:-translate-y-2 transition-transform">
          <div className="absolute top-4 right-4 bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-500">GEN X / BOOMER</div>
          <div className="text-8xl mb-6 text-center transform group-hover:scale-110 transition-transform">💀</div>
          <h4 className="text-2xl font-bold text-slate-800 mb-2">Interpretation:</h4>
          <p className="text-slate-600 italic">"Death. Danger. Fatal Error. The system is dead."</p>
        </div>
        <div className="flex-1 bg-white p-8 rounded-2xl shadow-xl border-t-8 border-green-500 relative group hover:-translate-y-2 transition-transform">
          <div className="absolute top-4 right-4 bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-500">GEN Z</div>
          <div className="text-8xl mb-6 text-center transform group-hover:scale-110 transition-transform">💀</div>
          <h4 className="text-2xl font-bold text-slate-800 mb-2">Interpretation:</h4>
          <p className="text-slate-600 italic">"I'm dead (laughing). That was hilarious."</p>
        </div>
     </div>
  </div>
);

// 6. Amygdala
const AmygdalaSlide = () => {
  const [value, setValue] = useState(20);
  const r = Math.min(255, value * 5); 
  const g = Math.min(255, (100 - value) * 5);
  const color = `rgb(${r}, ${g}, 100)`;

  return (
    <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <div className="relative flex justify-center group">
         <div className="absolute inset-0 bg-white/50 blur-3xl rounded-full transform scale-75 group-hover:scale-100 transition-transform duration-700"></div>
         <Brain size={300} style={{ color: color, transition: 'color 0.5s ease' }} strokeWidth={1} className="drop-shadow-2xl relative z-10" />
      </div>
      <div className="space-y-8">
        <div>
          <h3 className="text-3xl font-bold text-[#005088] mb-2">SCARF Model: Certainty</h3>
          <p className="text-slate-600 text-lg">Ambiguity triggers the brain's threat response just like physical pain.</p>
        </div>
        <Card className="border-t-4 border-t-[#005088]">
          <label className="block text-sm font-bold text-slate-500 mb-6 uppercase tracking-wide flex justify-between">
            <span>Clear Message</span><span>Vague Message</span>
          </label>
          <input type="range" min="0" max="100" value={value} onChange={(e) => setValue(Number(e.target.value))} className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#005088]" />
        </Card>
        <div className="p-6 rounded-xl text-lg italic border-l-8 shadow-sm transition-colors duration-500" style={{borderColor: color, backgroundColor: `rgba(${r},${g},100,0.1)`}}>
          "{value < 50 ? 'Team: I will have the report ready by 2 PM strictly.' : 'Team: I might need that thing we talked about soon-ish.'}"
        </div>
      </div>
    </div>
  );
};

// 7. Cognitive Battery
const CognitiveBatterySlide = () => {
  const [words, setWords] = useState(20);
  const batteryLevel = Math.max(0, 100 - (words / 2));
  
  return (
    <div className="w-full max-w-4xl flex flex-col items-center">
      <h3 className="text-3xl font-bold text-[#005088] mb-8">Cognitive Load Theory</h3>
      <p className="text-slate-600 mb-8 text-center">Every unnecessary word drains your executive's "Decision Battery".</p>
      
      <div className="flex gap-12 w-full items-center">
         <div className="flex-1">
            <label className="block font-bold text-slate-700 mb-2">Email Word Count: {words}</label>
            <input 
              type="range" min="10" max="200" value={words} 
              onChange={(e) => setWords(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg accent-[#f59e0b] cursor-pointer" 
            />
            <div className="mt-6 p-4 bg-white rounded-lg border border-slate-200 shadow-inner h-40 overflow-y-auto text-sm text-slate-500 leading-relaxed">
               {Array(Math.floor(words/10)).fill("Lorem ipsum dolor sit amet, consectetur adipiscing elit. ").join("")}
               <span className="text-[#005088] font-bold">... [Point is hidden here]</span>
            </div>
         </div>
         <div className="flex flex-col items-center justify-center w-48">
             <div className="relative w-24 h-48 border-4 border-slate-700 rounded-2xl p-1 bg-white">
                 <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-8 h-4 bg-slate-700 rounded-t-md"></div>
                 <div className={`w-full rounded-xl transition-all duration-300 absolute bottom-1 left-1 right-1 ${batteryLevel > 50 ? 'bg-green-500' : batteryLevel > 20 ? 'bg-amber-500' : 'bg-red-600 animate-pulse'}`} style={{ height: `${batteryLevel}%`, width: 'calc(100% - 8px)' }}></div>
                 <div className="absolute inset-0 flex items-center justify-center font-bold text-slate-800 z-10 mix-blend-overlay text-xl">{Math.round(batteryLevel)}%</div>
             </div>
             <p className="mt-4 font-bold text-slate-700">Executive Energy</p>
         </div>
      </div>
    </div>
  );
};

// 8. Trust Equation
const TrustEquationSlide = () => {
  const [cred, setCred] = useState(5);
  const [rel, setRel] = useState(5);
  const [int, setInt] = useState(5);
  const [self, setSelf] = useState(5);
  
  const trustScore = ((cred + rel + int) / self).toFixed(1);

  return (
    <div className="w-full max-w-5xl">
       <h3 className="text-3xl font-bold text-[#005088] mb-2 text-center">The Trust Equation</h3>
       <p className="text-center text-slate-500 mb-8">Trust = (Credibility + Reliability + Intimacy) / Self-Orientation</p>
       
       <div className="flex gap-8">
          <div className="flex-1 space-y-6">
             {[
               { label: 'Credibility (Words)', val: cred, set: setCred, color: 'accent-blue-600' },
               { label: 'Reliability (Actions)', val: rel, set: setRel, color: 'accent-green-600' },
               { label: 'Intimacy (Safety)', val: int, set: setInt, color: 'accent-purple-600' },
               { label: 'Self-Orientation (Ego)', val: self, set: setSelf, color: 'accent-red-600' }
             ].map((item, i) => (
               <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                  <div className="flex justify-between font-bold text-slate-700 mb-2"><span>{item.label}</span><span>{item.val}</span></div>
                  <input type="range" min="1" max="10" value={item.val} onChange={(e) => item.set(Number(e.target.value))} className={`w-full h-2 bg-slate-100 rounded-lg cursor-pointer ${item.color}`} />
               </div>
             ))}
          </div>
          <div className="w-1/3 flex flex-col items-center justify-center">
             <div className="relative w-64 h-64 flex items-center justify-center">
                <div className={`absolute inset-0 rounded-full border-[12px] opacity-20 ${trustScore > 4 ? 'border-green-500' : 'border-red-500'}`}></div>
                <div className="text-center">
                   <div className="text-6xl font-black text-slate-800">{trustScore}</div>
                   <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-2">Trust Score</div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

// 9. PREP
const PREPSlide = () => {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <div className="w-full max-w-6xl">
       <h3 className="text-4xl font-serif font-bold text-[#005088] text-center mb-4">The P.R.E.P Architecture</h3>
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {PREP_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx <= activeStep;
            return (
              <div key={idx} onClick={() => setActiveStep(idx)}
                className={`cursor-pointer transition-all duration-700 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-40 blur-sm'}
                  bg-white p-8 rounded-2xl shadow-xl border-t-8 hover:-translate-y-2 flex flex-col items-center text-center group`}
                style={{ borderColor: idx === 0 || idx === 3 ? COLORS.navy : COLORS.amber }}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 text-white shadow-lg ${idx === 0 || idx === 3 ? 'bg-[#005088]' : 'bg-[#f59e0b]'}`}>
                  <Icon size={32} />
                </div>
                <h4 className="font-bold text-2xl text-slate-800 mb-4">{step.title}</h4>
                <p className="text-sm text-slate-600">{step.desc}</p>
              </div>
            )
          })}
       </div>
       <div className="mt-16 text-center">
         <button onClick={() => setActiveStep(prev => Math.min(prev + 1, 3))} className={`px-8 py-3 rounded-full font-bold shadow-lg transition-all mx-auto ${activeStep === 3 ? 'bg-green-500 text-white' : 'bg-[#005088] text-white'}`} disabled={activeStep === 3}>
           {activeStep === 3 ? 'Architecture Complete' : 'Reveal Next Pillar'} 
         </button>
       </div>
    </div>
  );
};

// 10. Pyramid Principle (FIXED - SVG Based)
const PyramidSlide = () => {
  const [level, setLevel] = useState(0);

  return (
    <div className="w-full max-w-4xl flex flex-col items-center">
      <h3 className="text-3xl font-bold text-[#005088] mb-2">The Pyramid Principle (Minto)</h3>
      <p className="text-slate-500 mb-12">Top-Down Thinking: Answer first, arguments second, data last.</p>
      
      <div className="relative w-[600px] h-[400px]">
        <svg viewBox="0 0 600 400" className="w-full h-full drop-shadow-2xl">
           {/* Level 3: Data (Bottom) */}
           <g 
             onClick={() => setLevel(3)} 
             className={`cursor-pointer transition-all duration-500 ${level >= 3 ? 'opacity-100' : 'opacity-30'}`}
           >
             <path d="M0,400 L600,400 L510,280 L90,280 Z" fill="#334155" />
             <text x="300" y="360" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">Data / Facts / Evidence</text>
           </g>

           {/* Level 2: Arguments (Middle) */}
           <g 
             onClick={() => setLevel(2)} 
             className={`cursor-pointer transition-all duration-500 ${level >= 2 ? 'opacity-100' : 'opacity-30'}`}
           >
             <path d="M90,275 L510,275 L420,150 L180,150 Z" fill="#f59e0b" />
             <text x="300" y="230" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">Key Arguments</text>
           </g>

           {/* Level 1: Answer (Top) */}
           <g 
             onClick={() => setLevel(1)} 
             className={`cursor-pointer transition-all duration-500 ${level >= 1 ? 'opacity-100' : 'opacity-50'}`}
           >
             <path d="M180,145 L420,145 L300,0 Z" fill="#005088" />
             <text x="300" y="100" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold">Main Answer</text>
           </g>
        </svg>
      </div>
      <p className="mt-8 italic text-slate-500 text-sm animate-pulse">Click the pyramid layers from top to bottom.</p>
    </div>
  );
};

// 11. "So What?" Drill
const SoWhatSlide = () => {
  const [depth, setDepth] = useState(0);
  const steps = ["We launched a new feature.", "Users can now filter by color.", "This reduces search time by 30%.", "Conversion rate will increase by 5%.", "Revenue increases by IDR 2B / month."];

  return (
    <div className="w-full max-w-2xl flex flex-col items-center">
      <h3 className="text-3xl font-bold text-[#005088] mb-8">The "So What?" Drill</h3>
      <div className="w-full space-y-4">
        {steps.map((text, i) => (
           <div key={i} className={`flex flex-col items-center transition-all duration-500 ${i <= depth ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              <Card className={`w-full text-center font-bold ${i === 4 ? 'bg-green-50 border-green-500 text-green-700' : ''}`}>{text}</Card>
              {i < 4 && i < depth && <div className="h-8 w-0.5 bg-slate-300 my-1"></div>}
           </div>
        ))}
      </div>
      <div className="mt-8">
        <Button onClick={() => setDepth(d => Math.min(d+1, 4))} disabled={depth === 4}>{depth === 4 ? 'Value Found!' : 'Ask "So What?"'}</Button>
      </div>
    </div>
  );
};

// 12. Digital Rule
const DigitalRuleSlide = () => (
    <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-16">
      <div className="flex-1 space-y-6">
        <h3 className="text-4xl font-bold text-[#005088] mb-2">The 7-38-55 Digital Rule</h3>
        <p className="text-xl text-slate-600">In text, <span className="font-bold text-[#005088] bg-blue-50 px-2 rounded">Structure</span> becomes your body language.</p>
        <Card className="mt-8 border-l-8 border-l-[#005088]">
          <ul className="space-y-6">
            <li className="flex items-center gap-4"><div className="w-12 h-12 rounded-xl bg-[#334155] text-white flex items-center justify-center font-bold text-xl">7%</div><span>Words (Content)</span></li>
            <li className="flex items-center gap-4"><div className="w-12 h-12 rounded-xl bg-[#f59e0b] text-white flex items-center justify-center font-bold text-xl">38%</div><span>Tone (Emoji/Punctuation)</span></li>
            <li className="flex items-center gap-4"><div className="w-12 h-12 rounded-xl bg-[#005088] text-white flex items-center justify-center font-bold text-xl">55%</div><span>Visual Structure</span></li>
          </ul>
        </Card>
      </div>
      <div className="flex-1 h-96 w-full bg-white p-6 rounded-3xl shadow-2xl">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={DIGITAL_RULE_DATA} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12, fill: '#334155', fontWeight: 'bold'}} />
            <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={60} label={{ position: 'right', fill: '#334155', fontWeight: 'bold' }}>
                {DIGITAL_RULE_DATA.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
);

// 13. Code Switch
const CodeSwitchSlide = () => {
  const [fixed, setFixed] = useState(false);
  return (
    <div className="w-full max-w-5xl text-center">
      <h3 className="text-3xl font-bold text-[#005088] mb-12">Code Switching Lab</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
         <div className={`p-8 rounded-3xl border-2 transition-all duration-500 text-left relative ${fixed ? 'opacity-40 border-gray-200 grayscale' : 'border-red-400 bg-red-50 shadow-xl scale-105'}`}>
            <div className="uppercase text-xs font-bold text-red-500 mb-4 tracking-widest">Casual</div>
            <p className="font-mono text-xl text-slate-700">"Bro, file yg kemarin mana? Gue butuh ASAP nih buat meeting."</p>
         </div>
         <div className="hidden md:flex justify-center text-[#005088]"><ArrowRight size={32} /></div>
         <div onClick={() => setFixed(true)} className={`cursor-pointer p-8 rounded-3xl border-2 transition-all duration-500 text-left relative group ${fixed ? 'border-[#005088] bg-white shadow-2xl scale-105' : 'border-dashed border-slate-300 bg-slate-50'}`}>
            <div className="uppercase text-xs font-bold text-[#005088] mb-4 tracking-widest">Executive</div>
            {fixed ? <p className="font-serif text-xl text-[#334155] animate-[fadeIn_0.5s_ease-out]">"Halo [Name], mohon update data Q3. Saya perlu review pukul 14.00 untuk bahan meeting VP."</p> : <div className="h-24 flex items-center justify-center text-slate-400 gap-2"><Zap size={24} /> Click to Fix</div>}
         </div>
      </div>
    </div>
  );
};

// 14. Crisis Sim
const ChatSimSlide = () => {
  const [step, setStep] = useState('intro');
  const chatEndRef = useRef(null);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [step]);

  const handleOption = (optionId) => {
    if (optionId === 'B') setStep('goodResponse');
    else setStep('badResponse');
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-slate-800 h-[600px] flex flex-col relative">
      <div className="bg-[#005088] p-6 pt-10 text-white text-center font-bold flex justify-between items-center shadow-md z-10">
          <div className="text-left"><div className="text-sm font-bold">Boss (VP)</div><div className="text-[10px] opacity-80">Online</div></div>
          <span className="text-[10px] bg-red-500 px-2 py-1 rounded-full animate-pulse font-bold tracking-wider">CRITICAL</span>
      </div>
      <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-[#e5e5f7]">
         {(step === 'intro' || step === 'goodResponse' || step === 'badResponse') && (
            <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm text-sm border border-slate-200 text-slate-700 animate-[fadeInLeft_0.3s_ease-out]">{CHAT_SCENARIOS.intro.text}</div>
         )}
         {step !== 'intro' && (
            <div className={`ml-auto p-4 rounded-2xl rounded-tr-none shadow-md text-sm text-white max-w-[90%] animate-[fadeInRight_0.3s_ease-out] ${step === 'goodResponse' ? 'bg-[#005088]' : 'bg-slate-500'}`}>{CHAT_SCENARIOS[step].text}</div>
         )}
         {step !== 'intro' && (
            <div className={`p-4 rounded-2xl rounded-tl-none shadow-sm text-sm border font-medium animate-[fadeInLeft_0.3s_ease-out] delay-300 ${step === 'goodResponse' ? 'bg-green-50 border-green-200 text-green-900' : 'bg-red-50 border-red-200 text-red-900'}`}>{CHAT_SCENARIOS[step].reply}</div>
         )}
         <div ref={chatEndRef} />
      </div>
      <div className="p-4 bg-white border-t border-gray-200 z-10">
        {step === 'intro' ? (
          <div className="space-y-3">
            {CHAT_SCENARIOS.intro.options.map((opt) => (
              <button key={opt.id} onClick={() => handleOption(opt.id)} className="w-full text-left p-3 text-xs border rounded-xl hover:bg-slate-50 hover:border-[#005088] transition-all group">
                <span className="font-bold mr-2 text-white bg-slate-300 group-hover:bg-[#005088] px-2 py-1 rounded">{opt.id}</span>
                <span className="text-slate-600">{opt.text}</span>
              </button>
            ))}
          </div>
        ) : (
          <button onClick={() => setStep('intro')} className="w-full py-3 bg-[#f59e0b] text-white rounded-xl font-bold shadow-md hover:bg-[#d97706]">Reset Simulation</button>
        )}
      </div>
    </div>
  );
};

// 15. Channel Decision Tree (IMPROVED - Visual Flowchart)
const ChannelDecisionSlide = () => {
  const [activeNodes, setActiveNodes] = useState(['start']);
  
  const toggleNode = (node) => {
    // Logic to reset path if clicking back
    setActiveNodes(prev => {
       const index = prev.indexOf(node);
       if (index !== -1) return prev.slice(0, index + 1); // Truncate path if clicking existing
       return [...prev, node];
    });
  };

  const FlowNode = ({ id, label, options, next, isEnd }) => {
    const isActive = activeNodes.includes(id);
    const isVisible = activeNodes.includes(options?.parent || 'start'); // Simplified logic
    
    // Actually simpler: just hardcode path rendering
    return null; 
  };

  return (
    <div className="w-full max-w-5xl h-[600px] relative bg-slate-50 rounded-xl shadow-inner border border-slate-200 overflow-hidden p-8 flex flex-col items-center">
       <h3 className="text-2xl font-bold text-[#005088] mb-8 absolute top-8 left-8">Channel Matrix</h3>
       
       <div className="flex flex-col items-center w-full h-full justify-start gap-12 pt-12">
          
          {/* Level 1: Start */}
          <div className="relative z-10">
             <div className="bg-[#005088] text-white px-8 py-4 rounded-full font-bold shadow-lg">Is it URGENT?</div>
             <div className="absolute top-full left-1/2 -translate-x-1/2 h-12 w-0.5 bg-slate-300"></div>
          </div>

          {/* Level 2: Decision */}
          <div className="flex gap-32 relative z-10">
             {/* YES Branch */}
             <div className="flex flex-col items-center">
                <button 
                  onClick={() => setActiveNodes(['start', 'urgent'])}
                  className={`px-6 py-3 rounded-xl border-2 font-bold transition-all ${activeNodes.includes('urgent') ? 'bg-red-500 text-white border-red-500' : 'bg-white border-slate-200 hover:border-red-300'}`}
                >YES</button>
                {activeNodes.includes('urgent') && (
                   <div className="animate-[fadeIn_0.5s] mt-8 flex flex-col items-center">
                      <div className="h-8 w-0.5 bg-red-400 mb-2"></div>
                      <div className="bg-red-50 border-2 border-red-500 p-6 rounded-2xl shadow-xl text-center">
                         <div className="text-red-600 font-bold text-xl mb-2">Complex?</div>
                         <div className="flex gap-4 mt-4">
                            <button onClick={() => setActiveNodes(['start', 'urgent', 'call'])} className="px-4 py-2 bg-white border border-red-200 rounded hover:bg-red-100">Yes</button>
                            <button onClick={() => setActiveNodes(['start', 'urgent', 'chat'])} className="px-4 py-2 bg-white border border-red-200 rounded hover:bg-red-100">No</button>
                         </div>
                      </div>
                   </div>
                )}
             </div>

             {/* NO Branch */}
             <div className="flex flex-col items-center">
                <button 
                  onClick={() => setActiveNodes(['start', 'not_urgent'])}
                  className={`px-6 py-3 rounded-xl border-2 font-bold transition-all ${activeNodes.includes('not_urgent') ? 'bg-[#005088] text-white border-[#005088]' : 'bg-white border-slate-200 hover:border-blue-300'}`}
                >NO</button>
                 {activeNodes.includes('not_urgent') && (
                   <div className="animate-[fadeIn_0.5s] mt-8 flex flex-col items-center">
                      <div className="h-8 w-0.5 bg-blue-400 mb-2"></div>
                      <div className="bg-blue-50 border-2 border-[#005088] p-6 rounded-2xl shadow-xl text-center">
                         <div className="text-[#005088] font-bold text-xl mb-2">Discuss?</div>
                         <div className="flex gap-4 mt-4">
                            <button onClick={() => setActiveNodes(['start', 'not_urgent', 'meet'])} className="px-4 py-2 bg-white border border-blue-200 rounded hover:bg-blue-100">Yes</button>
                            <button onClick={() => setActiveNodes(['start', 'not_urgent', 'email'])} className="px-4 py-2 bg-white border border-blue-200 rounded hover:bg-blue-100">No</button>
                         </div>
                      </div>
                   </div>
                )}
             </div>
          </div>

          {/* Level 3: Outcome */}
          <div className="mt-4">
             {activeNodes.includes('call') && <ResultCard icon={Phone} title="CALL / F2F" desc="Too complex to type." color="bg-red-600" />}
             {activeNodes.includes('chat') && <ResultCard icon={MessageSquare} title="CHAT" desc="Quick sync." color="bg-amber-500" />}
             {activeNodes.includes('meet') && <ResultCard icon={Calendar} title="SCHEDULE MEETING" desc="Needs dedicated time." color="bg-[#005088]" />}
             {activeNodes.includes('email') && <ResultCard icon={Mail} title="EMAIL" desc="Asynchronous update." color="bg-slate-500" />}
          </div>

       </div>
    </div>
  );
};

const ResultCard = ({ icon: Icon, title, desc, color }) => (
   <div className={`animate-[bounceIn_0.5s] ${color} text-white p-6 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[300px]`}>
      <div className="p-3 bg-white/20 rounded-full"><Icon size={32} /></div>
      <div>
         <div className="text-2xl font-black">{title}</div>
         <div className="opacity-90">{desc}</div>
      </div>
   </div>
);


// 16. Email Doctor
const EmailDoctorSlide = () => (
    <div className="w-full max-w-6xl">
        <h3 className="text-3xl font-bold text-[#005088] text-center mb-8">The Email Doctor 🩺</h3>
        <div className="flex flex-col md:flex-row gap-8">
            <Card className="flex-1 bg-red-50/50 border-red-200 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-2 bg-red-400"></div>
                <h4 className="font-bold text-red-800 text-xl mb-4">Before (The Patient)</h4>
                <div className="bg-white p-6 rounded-lg border border-red-100 shadow-sm font-serif italic text-slate-500 leading-relaxed mb-6">
                    "Hi team, just wanted to check in on the update for the thing we discussed last week? Also I think maybe we should look at the budget again..."
                </div>
                <div className="text-xs font-bold text-red-500 uppercase">Diagnosis: Passive, Vague.</div>
            </Card>
            <div className="flex items-center justify-center text-[#005088]"><ArrowRight size={48} /></div>
            <Card className="flex-1 bg-green-50/50 border-green-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
                <h4 className="font-bold text-green-800 text-xl mb-4">After (The Cure)</h4>
                <div className="bg-white p-6 rounded-lg border border-green-100 shadow-sm font-sans font-medium text-slate-800 leading-relaxed mb-6">
                    "Team, please provide the <span className="bg-blue-100 px-1">Q3 Status Update</span> by <span className="bg-blue-100 px-1">5 PM today</span>.<br/>Approval needed by Friday."
                </div>
                <div className="text-xs font-bold text-green-600 uppercase">Result: Actionable, Specific.</div>
            </Card>
        </div>
    </div>
);

// 17. Subject Line A/B
const SubjectLineSlide = () => {
  const data = [
    { subject: "Update", openRate: 20 },
    { subject: "Project Phoenix Update", openRate: 50 },
    { subject: "ACTION REQUIRED: Phoenix Approval by 5PM", openRate: 90 }
  ];

  return (
    <div className="w-full max-w-5xl flex flex-col items-center">
       <h3 className="text-3xl font-bold text-[#005088] mb-8">Subject Line A/B Testing</h3>
       <div className="w-full space-y-6">
         {data.map((item, i) => (
           <div key={i} className="bg-white p-4 rounded-xl shadow-md border border-slate-100">
              <div className="font-mono text-sm text-slate-500 mb-2">Subject: <span className="text-slate-800 font-bold">"{item.subject}"</span></div>
              <div className="w-full bg-slate-100 h-8 rounded-full overflow-hidden relative">
                 <div 
                   className="h-full bg-[#f59e0b] transition-all duration-1000 flex items-center justify-end px-3 text-white text-xs font-bold"
                   style={{ width: `${item.openRate}%` }}
                 >
                    {item.openRate}% Open Rate
                 </div>
              </div>
           </div>
         ))}
       </div>
    </div>
  );
};

// 18. Meeting Hygiene (Checklist)
const ChecklistSlide = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Eye Level Camera', checked: false },
    { id: 2, text: '2-Second Delay Buffer', checked: false },
    { id: 3, text: 'Clean Background', checked: false },
    { id: 4, text: 'Audio Checked', checked: false }
  ]);
  const toggle = (id) => setItems(items.map(i => i.id === id ? { ...i, checked: !i.checked } : i));

  return (
    <div className="w-full max-w-2xl bg-white p-10 rounded-3xl shadow-2xl border-t-[12px] border-[#005088]">
      <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
        <h3 className="text-3xl font-bold text-[#005088]">The Digital Handshake</h3>
        {items.every(i => i.checked) && <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-bold animate-pulse flex items-center gap-2"><ThumbsUp size={16}/> READY</div>}
      </div>
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} onClick={() => toggle(item.id)} className={`flex items-center p-5 rounded-2xl cursor-pointer transition-all border-2 ${item.checked ? 'bg-[#f3f0df] border-[#f59e0b] shadow-inner scale-[0.98]' : 'bg-slate-50 border-transparent hover:bg-white hover:border-slate-200'}`}>
            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-5 transition-colors ${item.checked ? 'bg-[#f59e0b] border-[#f59e0b]' : 'border-slate-300 bg-white'}`}>
              {item.checked && <CheckCircle size={18} className="text-white" />}
            </div>
            <span className={`font-medium text-lg ${item.checked ? 'text-[#005088] line-through opacity-70' : 'text-slate-600'}`}>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 19. SBIA Feedback
const SBIASlide = () => {
  const [reveal, setReveal] = useState(-1);
  return (
    <div className="w-full max-w-6xl">
       <h3 className="text-3xl font-bold text-[#005088] text-center mb-8">The SBIA Feedback Model</h3>
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {SBIA_STEPS.map((step, i) => (
             <div 
               key={i} 
               onClick={() => setReveal(i)}
               className={`h-80 rounded-xl p-6 border-2 cursor-pointer transition-all duration-500 relative overflow-hidden group
               ${i <= reveal ? 'bg-white border-[#005088] shadow-xl' : 'bg-slate-100 border-dashed border-slate-300 hover:bg-slate-200'}`}
             >
                <div className={`text-6xl font-black mb-4 ${i <= reveal ? 'text-[#005088]' : 'text-slate-300'}`}>{step.step}</div>
                {i <= reveal && (
                  <div className="animate-[fadeInUp_0.3s]">
                     <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                     <p className="text-sm text-slate-600">{step.desc}</p>
                  </div>
                )}
             </div>
          ))}
       </div>
    </div>
  );
};

// 20. Roadmap
const RoadmapSlide = () => (
    <div className="w-full max-w-6xl">
       <h3 className="text-4xl font-serif font-bold text-[#005088] mb-16 text-center">B-Ready Ecosystem: The 70:20:10</h3>
       <div className="flex flex-col md:flex-row gap-8 items-end justify-center h-96">
          <div className="flex-1 h-[20%] bg-slate-200 rounded-t-3xl p-6 relative group hover:h-[25%] transition-all duration-300">
             <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-4xl font-bold text-slate-300">10%</div>
             <div className="text-center"><h4 className="font-bold text-slate-600">Formal Learning</h4><p className="text-xs text-slate-400 mt-2">This Session</p></div>
          </div>
          <div className="flex-1 h-[40%] bg-[#f59e0b] rounded-t-3xl p-6 relative group hover:h-[45%] transition-all duration-300 shadow-lg z-10">
             <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-4xl font-bold text-[#f59e0b]">20%</div>
             <div className="text-center text-white"><h4 className="font-bold">Social Learning</h4><p className="text-xs text-white/80 mt-2">Squad Feedback</p></div>
          </div>
          <div className="flex-1 h-[100%] bg-[#005088] rounded-t-3xl p-6 relative group hover:h-[105%] transition-all duration-300 shadow-2xl z-20">
             <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-4xl font-bold text-[#005088]">70%</div>
             <div className="text-center text-white flex flex-col h-full justify-between">
                <div><h4 className="font-bold text-xl">Experiential</h4><p className="text-sm text-blue-200 mt-2">Capstone Project</p></div>
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md"><Target className="mx-auto mb-2 text-[#f59e0b]" /><p className="text-xs leading-tight">Lead one major meeting using PREP methodology within 7 days.</p></div>
             </div>
          </div>
       </div>
    </div>
);

// 21. Commitment
const CommitmentSlide = () => {
  const [signed, setSigned] = useState(false);
  const [name, setName] = useState("");

  return (
    <div className="w-full max-w-3xl flex flex-col items-center">
       {!signed ? (
         <div className="bg-white p-12 rounded-2xl shadow-2xl border-4 border-[#005088] text-center w-full">
            <h3 className="text-3xl font-serif font-bold text-[#005088] mb-6">Commitment Contract</h3>
            <p className="text-slate-600 mb-8 italic">"I commit to prioritizing clarity over comfort. I will use the PREP method to respect my colleagues' time and drive operational excellence."</p>
            <input 
              type="text" 
              placeholder="Type your name here" 
              className="w-full p-4 border-b-2 border-slate-300 text-center text-2xl font-serif mb-8 focus:outline-none focus:border-[#f59e0b]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button onClick={() => setSigned(true)} disabled={!name} className="w-full py-4 text-xl">Sign & Commit</Button>
         </div>
       ) : (
         <div className="text-center animate-[bounceIn_0.5s]">
            <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-2xl">
               <CheckCircle size={64} />
            </div>
            <h1 className="text-5xl font-bold text-[#005088] mb-4">Welcome to B-Ready.</h1>
            <p className="text-2xl text-slate-600">Thank you, <span className="font-serif italic text-[#f59e0b]">{name}</span>.</p>
         </div>
       )}
    </div>
  );
};


// --- Main App Logic ---

const Page3 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const SLIDES = [
    {
      id: 'cover',
      segment: 'Intro',
      title: "",
      subtitle: "",
      component: <CoverSlide />,
      notes: "OPENING: Welcome. Communication at Blibli isn't just talk; it's our operating system. Today we upgrade that OS."
    },
    {
      id: 'friction',
      segment: 'The Why',
      title: "The Cost of Friction",
      subtitle: "Why clear communication is operational.",
      component: <FrictionSlide />,
      notes: "INTERACTION: Ask 'How much time do you waste clarifying tasks?'. Click the broken cable to fix it."
    },
    {
      id: 'signal-loss',
      segment: 'The Why',
      title: "The Telephone Game",
      subtitle: "Strategy degradation.",
      component: <SignalLossSlide />,
      notes: "CONTEXT: Show how the 'Why' gets lost as it moves down the org chart. Clarity prevents this."
    },
    {
      id: 'cognitive-battery',
      segment: 'The Why',
      title: "Cognitive Load",
      subtitle: "Respecting Executive Energy.",
      component: <CognitiveBatterySlide />,
      notes: "INTERACTION: Drag the slider. Show how long emails drain the battery. Leaders have 'Decision Fatigue'. Don't add to it."
    },
    {
      id: 'context',
      segment: 'The Why',
      title: "Context Collapse",
      subtitle: "High vs Low Context.",
      component: <ContextCollapseSlide />,
      notes: "DEMO: Toggle between Social and Work modes. Explain why 'Gmn?' is toxic in professional settings."
    },
    {
      id: 'skull',
      segment: 'The Why',
      title: "The Skull Case",
      subtitle: "Semantic Divergence.",
      component: <SkullCaseSlide />,
      notes: "STORY: The 12.12 outage. Gen Z emoji usage vs Gen X panic. A real lesson in clarity."
    },
    {
      id: 'amygdala',
      segment: 'The Why',
      title: "Neuroscience",
      subtitle: "SCARF Model - Certainty.",
      component: <AmygdalaSlide />,
      notes: "SCIENCE: Ambiguity triggers the Amygdala. A threatened brain cannot innovate. Clarity creates psychological safety."
    },
    {
      id: 'trust',
      segment: 'The Why',
      title: "Trust Equation",
      subtitle: "The Math of Relationships.",
      component: <TrustEquationSlide />,
      notes: "FRAMEWORK: Trust isn't magic. It's math. High self-orientation (ego) destroys trust. Reliability builds it."
    },
    {
      id: 'prep',
      segment: 'The What',
      title: "PREP Architecture",
      subtitle: "The Executive Standard.",
      component: <PREPSlide />,
      notes: "TOOL: Point, Reason, Evidence, Point. Drill this. It is the core takeaway of today."
    },
    {
      id: 'pyramid',
      segment: 'The What',
      title: "Pyramid Principle",
      subtitle: "Top-Down Thinking.",
      component: <PyramidSlide />,
      notes: "MCKINSEY METHOD: Don't bury the lead. Start with the answer. Then support it."
    },
    {
      id: 'sowhat',
      segment: 'The What',
      title: "The So What Drill",
      subtitle: "Finding Business Value.",
      component: <SoWhatSlide />,
      notes: "DRILL: Keep asking 'So What?' until you find the money (Revenue/Cost/Risk)."
    },
    {
      id: 'digital-rule',
      segment: 'The What',
      title: "7-38-55 Digital",
      subtitle: "Visual Structure.",
      component: <DigitalRuleSlide />,
      notes: "DATA: In text, formatting is your body language. Use bolding and bullets."
    },
    {
      id: 'code-switch',
      segment: 'The How',
      title: "Code Switching",
      subtitle: "Tone Calibration.",
      component: <CodeSwitchSlide />,
      notes: "LAB: Translate casual thought to professional execution without being robotic."
    },
    {
      id: 'crisis',
      segment: 'The How',
      title: "Crisis Simulation",
      subtitle: "Pressure Test.",
      component: <ChatSimSlide />,
      notes: "SIMULATION: A/B testing a crisis response. Calmness is contagious."
    },
    {
      id: 'channel',
      segment: 'The How',
      title: "Channel Matrix",
      subtitle: "Decision Making.",
      component: <ChannelDecisionSlide />,
      notes: "TOOL: Stop emailing about urgent issues. Stop calling about FYI items."
    },
    {
      id: 'email-doctor',
      segment: 'The How',
      title: "Email Doctor",
      subtitle: "Before & After.",
      component: <EmailDoctorSlide />,
      notes: "CASE STUDY: Diagnose the patient. Prescribe the cure (PREP)."
    },
    {
      id: 'subject-line',
      segment: 'The How',
      title: "Subject Line Lab",
      subtitle: "Open Rates.",
      component: <SubjectLineSlide />,
      notes: "DATA: The subject line determines if your email is read or archived. Make it count."
    },
    {
      id: 'checklist',
      segment: 'The How',
      title: "Meeting Hygiene",
      subtitle: "Digital Handshake.",
      component: <ChecklistSlide />,
      notes: "PROTOCOL: Basic professional standards for video calls."
    },
    {
      id: 'sbia',
      segment: 'The How',
      title: "Feedback Model",
      subtitle: "SBIA.",
      component: <SBIASlide />,
      notes: "FRAMEWORK: How to give feedback without making enemies. Focus on Behavior and Impact, not Personality."
    },
    {
      id: 'roadmap',
      segment: 'Next Steps',
      title: "Ecosystem",
      subtitle: "70:20:10.",
      component: <RoadmapSlide />,
      notes: "NEXT STEPS: Today was just 10%. The project is 70%."
    },
    {
      id: 'commit',
      segment: 'Next Steps',
      title: "Commitment",
      subtitle: "Sign Off.",
      component: <CommitmentSlide />,
      notes: "CLOSING: Ask them to sign. Commitment drives behavior change."
    }
  ];

  const next = () => setCurrentSlide(prev => Math.min(prev + 1, SLIDES.length - 1));
  const prev = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

  // Key navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const activeSlide = SLIDES[currentSlide];

  return (
    <SlideLayout
      title={activeSlide.title}
      subtitle={activeSlide.subtitle}
      segment={activeSlide.segment}
      slideIndex={currentSlide}
      totalSlides={SLIDES.length}
      onNext={next}
      onPrev={prev}
      notes={activeSlide.notes}
      theme={activeSlide.id === 'cover' ? 'light' : 'light'}
    >
      <div key={activeSlide.id} className="w-full h-full flex items-center justify-center animate-[fadeIn_0.5s_ease-out]">
        {activeSlide.component}
      </div>
    </SlideLayout>
  );
};

export default Page3;