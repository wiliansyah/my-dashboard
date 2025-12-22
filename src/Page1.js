import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Users, Target, TrendingUp, Award, MessageCircle, 
  Cpu, CheckCircle, Play, FileText, Brain, Layout, Zap, 
  BarChart, ArrowRight, Lock, Key, ChevronDown, ChevronRight,
  PieChart, Activity, Layers, ShieldCheck, User, AlertTriangle, 
  Briefcase, DollarSign, Clock, Rocket, Settings, Search, 
  Download, Menu, Star, Sidebar, Home, HelpCircle, 
  Calculator, MousePointer, Info, Lightbulb, Microscope,
  GraduationCap, ClipboardCheck, Anchor, ZapOff, Link, Share2,
  X, Quote, Compass, GitMerge, Hexagon, Crosshair,
  Book, Globe, ArrowUpRight, Grid, Database, Scale, AlertOctagon,
  CheckSquare, ZapIcon, ChevronsUp, FileCheck, Eye, ThumbsUp,
  Filter, PlayCircle, Smartphone, Video, Unlock, PenTool, LayoutTemplate,
  MousePointer2, SmartphoneNfc, Laptop, AlertCircle, Check, Timer, Map, MessagesSquare,
  Calendar, Flag, UserCheck, Coffee, Sunrise, Sunset, Moon, Coins, BarChart4,
  TrendingDown, Percent, Repeat, RefreshCw, Radio
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart as RePieChart, Pie, Cell,
  AreaChart, Area, CartesianGrid, ReferenceLine
} from 'recharts';

// --- GLOBAL STYLES ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    
    :root {
      --blibli-blue: #0095DA;
      --blibli-dark: #0077ae;
      --slate-50: #f8fafc;
      --slate-100: #f1f5f9;
      --slate-900: #0f172a;
    }

    body { font-family: 'Inter', sans-serif; background-color: #f8fafc; color: #334155; }
    
    /* Animations */
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes pulse-soft { 0% { box-shadow: 0 0 0 0 rgba(0, 149, 218, 0.2); } 70% { box-shadow: 0 0 0 10px rgba(0, 149, 218, 0); } 100% { box-shadow: 0 0 0 0 rgba(0, 149, 218, 0); } }
    @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-5px); } 100% { transform: translateY(0px); } }

    .animate-fadeIn { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-pulse-soft { animation: pulse-soft 2s infinite; }
    .animate-float { animation: float 4s ease-in-out infinite; }
    
    /* Components */
    .glass-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(226, 232, 240, 0.8);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
    }
    
    .glass-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      border-color: rgba(0, 149, 218, 0.3);
    }
    
    .glass-dark {
      background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    /* Architecture Pyramid Styling */
    .arch-level {
      position: relative;
      transition: all 0.3s ease;
    }
    .arch-level::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      border-radius: 4px 0 0 4px;
    }
    .arch-level:hover {
      transform: scale(1.01);
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
    }

    /* Custom Range Slider */
    input[type=range] { -webkit-appearance: none; background: transparent; width: 100%; }
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none; height: 18px; width: 18px; border-radius: 50%;
      background: white; border: 2px solid #0095DA; cursor: pointer; margin-top: -7px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.1s;
    }
    input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.2); }
    input[type=range]::-webkit-slider-runnable-track {
      width: 100%; height: 4px; cursor: pointer; background: #cbd5e1; border-radius: 2px;
    }
    
    /* BEM Grid */
    .bem-grid {
      display: grid;
      grid-template-columns: 80px 1fr 1fr 1fr;
      gap: 1px;
      background: #cbd5e1;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #cbd5e1;
    }
    .bem-header {
      background: #f8fafc;
      padding: 10px;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      color: #64748b;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      letter-spacing: 0.05em;
    }
    .bem-row-header {
      background: #f1f5f9;
      padding: 4px;
      font-size: 9px;
      font-weight: 800;
      color: #0095DA;
      writing-mode: vertical-rl;
      transform: rotate(180deg);
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      letter-spacing: 0.1em;
      border-right: 2px solid #e2e8f0;
    }
    .bem-cell {
      background: white;
      padding: 12px;
      font-size: 11px;
      transition: background 0.2s;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      min-height: 140px;
      word-wrap: break-word;
    }
    .bem-cell:hover {
      background: #f8fafc;
    }
    
    /* Timeline Stepper */
    .stepper-node {
      width: 24px;
      height: 24px;
      background: white;
      border: 3px solid #cbd5e1;
      border-radius: 50%;
      position: absolute;
      left: -13px;
      top: 0;
      transition: all 0.3s ease;
      z-index: 10;
    }
    .stepper-item:hover .stepper-node {
      border-color: #0095DA;
      background: #0095DA;
      transform: scale(1.1);
    }
    
    /* Scrollbar */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
  `}</style>
);

// --- HELPER COMPONENTS ---

const formatIDR = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);

const SectionHeader = ({ title, subtitle, icon: Icon }) => (
  <div className="mb-8 border-b border-slate-200 pb-6 animate-fadeIn">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2.5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl text-[#0095DA] shadow-sm">
        {Icon && <Icon size={28} />}
      </div>
      <h2 className="text-3xl font-black text-slate-900 tracking-tight">{title}</h2>
    </div>
    <p className="text-lg text-slate-500 max-w-3xl ml-1 leading-relaxed">{subtitle}</p>
  </div>
);

const Badge = ({ children, color = "blue", size = "sm" }) => {
  const styles = {
    blue: "bg-blue-50 text-[#0095DA] border border-blue-200",
    red: "bg-red-50 text-red-600 border border-red-200",
    green: "bg-green-50 text-green-600 border border-green-200",
    purple: "bg-purple-50 text-purple-600 border border-purple-200",
    amber: "bg-amber-50 text-amber-600 border border-amber-200",
    slate: "bg-slate-100 text-slate-600 border border-slate-200",
    dark: "bg-slate-800 text-white border border-slate-700"
  };
  const sizes = {
    xs: "text-[10px] px-2 py-0.5",
    sm: "text-xs px-2.5 py-1",
    md: "text-sm px-4 py-1.5"
  };
  return (
    <span className={`rounded-full font-bold uppercase tracking-wider shadow-sm ${styles[color]} ${sizes[size]}`}>
      {children}
    </span>
  );
};

const Card = ({ title, children, className = "" }) => (
  <div className={`glass-card rounded-2xl p-6 ${className}`}>
    {title && <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">{title}</h3>}
    {children}
  </div>
);

// --- DASHBOARD DATA ---
const radarData = [
  { subject: 'Focus (Deep Work)', A: 40, B: 85, fullMark: 100 },
  { subject: 'Communication', A: 50, B: 90, fullMark: 100 },
  { subject: 'Collaboration', A: 30, B: 80, fullMark: 100 },
  { subject: 'Emotional Intel', A: 20, B: 75, fullMark: 100 },
  { subject: 'Tech Agility', A: 95, B: 95, fullMark: 100 },
];

const COLORS = ['#f59e0b', '#ef4444', '#10b981', '#0095DA'];

// 1. DASHBOARD
const Dashboard = ({ navigate }) => {
  return (
    <div className="space-y-12 animate-fadeIn pb-12">
      {/* 1. Hero: Strategic Mandate */}
      <div className="relative bg-slate-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden shadow-2xl group">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0095DA] opacity-20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500 opacity-5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-widest mb-6 shadow-lg">
               Strategic Content Dev Proposal 2025
            </div>
            
            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
                B-READY <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0095DA] to-blue-400">ACADEMY</span>
              </h1>
              <p className="text-xl text-slate-300 font-light leading-relaxed">
                Transforming Gen Z's <span className="text-white font-semibold">Digital Fluidity</span> into <span className="text-white font-semibold">Operational Precision</span>.
              </p>
            </div>

            <p className="text-sm text-slate-400 max-w-xl border-l-2 border-[#0095DA] pl-4 py-1">
              A scientifically integrated ecosystem that addresses the root cause: The clash between high-speed digital habits and corporate structural requirements.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button onClick={() => navigate('diagnosis')} className="px-6 py-3.5 bg-[#0095DA] text-white rounded-xl font-bold hover:bg-[#0077ae] hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all flex items-center gap-2">
                Analyze The Root Cause <ArrowRight size={18}/>
              </button>
            </div>
          </div>
          
          {/* Executive Pulse: Capability Gap Radar */}
          <div className="lg:col-span-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl relative animate-float">
             <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-widest">Capability Gap Analysis</div>
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="flex items-center gap-1 text-red-400"><div className="w-2 h-2 bg-red-500 rounded-full"></div> Current Risk</span>
                  <span className="flex items-center gap-1 text-[#0095DA]"><div className="w-2 h-2 bg-[#0095DA] rounded-full"></div> Target State</span>
                </div>
             </div>
             
             <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                    <PolarGrid stroke="#334155" strokeOpacity={0.5} />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="Current (Gen Z)" dataKey="A" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                    <Radar name="Target (B-Ready)" dataKey="B" stroke="#0095DA" fill="#0095DA" fillOpacity={0.5} />
                    <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '12px'}} itemStyle={{color: '#fff'}}/>
                  </RadarChart>
                </ResponsiveContainer>
             </div>
             
             <div className="mt-2 text-[9px] text-slate-500 flex items-start gap-2">
               <Database size={10} className="mt-0.5 shrink-0"/>
               <span>
                 <strong>Source:</strong> Current data derived from Internal TNA (Cases 1-4). Target data benchmarked against <em>WEF Future of Jobs 2023</em> (Resilience & Analytical Thinking).
               </span>
             </div>
          </div>
        </div>
      </div>

      {/* 2. THE DIAGNOSIS: Strategic Transformation Engine */}
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Crosshair className="text-[#0095DA]"/> Strategic Diagnosis: The Transformation Engine
        </h3>
        
        {/* Visual Engine Flow */}
        <div className="grid md:grid-cols-3 gap-0 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Step 1: The Root Problem */}
          <div className="p-8 border-b md:border-b-0 md:border-r border-slate-100 bg-red-50/30 relative group hover:bg-red-50/50 transition-colors">
            <div className="absolute top-4 right-4 text-red-200 group-hover:text-red-300 transition-colors"><ZapOff size={40}/></div>
            <div className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">The Common Thread</div>
            <h4 className="text-lg font-black text-slate-900 mb-3">Contextual Dissonance</h4>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              The friction isn't incompetence; it's a <strong>mismatch of Operating Systems</strong> between Social Habits and Corporate Rigor.
            </p>
            <ul className="space-y-2 text-xs text-slate-500">
              <li className="flex items-center gap-2"><X size={12} className="text-red-500"/> High-Context Social Speed</li>
              <li className="flex items-center gap-2"><X size={12} className="text-red-500"/> Low-Context Corporate Rigor</li>
            </ul>
          </div>

          {/* Step 2: Blibli's Leverage */}
          <div className="p-8 border-b md:border-b-0 md:border-r border-slate-100 bg-blue-50/30 relative group hover:bg-blue-50/50 transition-colors">
            <div className="absolute top-4 right-4 text-blue-200 group-hover:text-blue-300 transition-colors"><Anchor size={40}/></div>
            <div className="text-xs font-bold text-[#0095DA] uppercase tracking-wider mb-2">Blibli's Leverage</div>
            <h4 className="text-lg font-black text-slate-900 mb-3">The Digital Athlete</h4>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              We don't suppress their speed; we <strong>channel it</strong>. Their natural ability to process streams is an asset if structured.
            </p>
            <div className="bg-white p-3 rounded border border-blue-100 shadow-sm">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 line-through">Multitasking</span>
                <ArrowRight size={12} className="text-[#0095DA]"/>
                <span className="font-bold text-[#0095DA]">Agile Response</span>
              </div>
            </div>
          </div>

          {/* Step 3: The Outcome */}
          <div className="p-8 bg-green-50/30 relative group hover:bg-green-50/50 transition-colors">
            <div className="absolute top-4 right-4 text-green-200 group-hover:text-green-300 transition-colors"><Rocket size={40}/></div>
            <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">The Goal</div>
            <h4 className="text-lg font-black text-slate-900 mb-3">Omnichannel Performance</h4>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              A workforce that retains Gen Z speed but operates with high emotional intelligence and structural clarity.
            </p>
            <ul className="space-y-2 text-xs text-slate-500">
              <li className="flex items-center gap-2"><CheckCircle size={12} className="text-green-500"/> Faster SLAs (Comm)</li>
              <li className="flex items-center gap-2"><CheckCircle size={12} className="text-green-500"/> Deep Innovation (Focus)</li>
            </ul>
          </div>

        </div>
      </div>

      {/* 3. INTEGRATED ARCHITECTURE: The Pyramid */}
      <div id="architecture">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Layers className="text-[#0095DA]" size={28}/>
            <h3 className="text-xl font-black text-slate-900">Integrated Program Architecture</h3>
          </div>
          <div className="hidden md:block text-xs text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-200">
            Hierarchy of Competence Model
          </div>
        </div>
        
        <div className="relative space-y-4 max-w-4xl mx-auto">
           {/* Connecting Line */}
           <div className="absolute left-10 top-6 bottom-6 w-0.5 bg-slate-200 -z-10 dashed"></div>

           {/* LEVEL 3: CULTURE (Apex) */}
           <div className="flex gap-6 arch-level group">
              <div className="w-20 h-20 rounded-2xl bg-white border-b-4 border-r-4 border-green-500 text-green-600 flex flex-col items-center justify-center shrink-0 shadow-lg z-10 group-hover:-translate-y-1 transition-transform">
                <Activity size={28}/>
                <span className="text-[9px] font-extrabold mt-1 tracking-widest">CULTURE</span>
              </div>
              <div className="flex-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group-hover:border-green-400 transition-colors">
                 <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
                   <div>
                     <h4 className="text-lg font-bold text-slate-900">Level 3: Psychological Safety</h4>
                     <p className="text-xs text-slate-500">Targeting <strong>Case 4 (Emotional Intelligence)</strong></p>
                   </div>
                   <Badge color="green">Sustainability Layer</Badge>
                 </div>
                 <div className="flex gap-4 items-center">
                   <p className="text-sm text-slate-600 flex-1">
                     <strong>Why here?</strong> High performance generates friction. EQ is the "Cooling System" that prevents burnout.
                   </p>
                   <div className="hidden md:flex flex-col gap-1 text-[10px] text-slate-400 text-right">
                     <span>Input: High Trust</span>
                     <span>Output: Low Turnover</span>
                   </div>
                 </div>
              </div>
           </div>

           {/* LEVEL 2: TEAM (Bridge) */}
           <div className="flex gap-6 arch-level group">
              <div className="w-20 h-20 rounded-2xl bg-white border-b-4 border-r-4 border-purple-500 text-purple-600 flex flex-col items-center justify-center shrink-0 shadow-lg z-10 group-hover:-translate-y-1 transition-transform">
                <GitMerge size={28}/>
                <span className="text-[9px] font-extrabold mt-1 tracking-widest">TEAM</span>
              </div>
              <div className="flex-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group-hover:border-purple-400 transition-colors">
                 <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
                   <div>
                     <h4 className="text-lg font-bold text-slate-900">Level 2: Social Mechanics</h4>
                     <p className="text-xs text-slate-500">Targeting <strong>Case 3 (Collaboration & Silos)</strong></p>
                   </div>
                   <Badge color="purple">Connectivity Layer</Badge>
                 </div>
                 <div className="flex gap-4 items-center">
                   <p className="text-sm text-slate-600 flex-1">
                     <strong>Why here?</strong> Connecting efficient individuals. Silos break when we establish "Shared Mental Models."
                   </p>
                   <div className="hidden md:flex flex-col gap-1 text-[10px] text-slate-400 text-right">
                     <span>Input: Shared Goals</span>
                     <span>Output: Innovation</span>
                   </div>
                 </div>
              </div>
           </div>

           {/* LEVEL 1: SELF (Base) */}
           <div className="flex gap-6 arch-level group">
              <div className="w-20 h-20 rounded-2xl bg-white border-b-4 border-r-4 border-slate-800 text-slate-800 flex flex-col items-center justify-center shrink-0 shadow-lg z-10 group-hover:-translate-y-1 transition-transform">
                <Layout size={28}/>
                <span className="text-[9px] font-extrabold mt-1 tracking-widest">SELF</span>
              </div>
              <div className="flex-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group-hover:border-slate-400 transition-colors">
                 <div className="absolute top-0 left-0 w-1 h-full bg-slate-800"></div>
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
                   <div>
                     <h4 className="text-lg font-bold text-slate-900">Level 1: Personal Effectiveness</h4>
                     <p className="text-xs text-slate-500">Targeting <strong>Case 1 (Comm) & Case 2 (Focus)</strong></p>
                   </div>
                   <div className="flex gap-2">
                     <Badge color="amber">Clarity</Badge>
                     <Badge color="red">Focus</Badge>
                   </div>
                 </div>
                 <div className="flex gap-4 items-center">
                   <p className="text-sm text-slate-600 flex-1">
                     <strong>Why here?</strong> The Foundation. You cannot collaborate if you are chaotic. We must first fix individual output.
                   </p>
                   <div className="hidden md:flex flex-col gap-1 text-[10px] text-slate-400 text-right">
                     <span>Input: Protocols</span>
                     <span>Output: Velocity</span>
                   </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// 2. DIAGNOSIS (OPERATIONAL FRICTION)
const DiagnosisView = () => {
  const [activeTab, setActiveTab] = useState('bem');
  // Simulator State
  const [headcount, setHeadcount] = useState(200);
  const [salary, setSalary] = useState(8); // million
  
  // -- RESEARCH-BACKED CALCULATION LOGIC --
  const AMBIGUITY_FACTOR = 0.10; 
  const SWITCHING_FACTOR = 0.20;
  const TURNOVER_RISK_PCT = 0.15;
  const REPLACEMENT_COST_FACTOR = 0.5;

  // -- CALCULATIONS --
  const annualSalary = salary * 1000000 * 12; // Annual salary per person
  const totalPayroll = headcount * annualSalary;
  
  const commLoss = totalPayroll * AMBIGUITY_FACTOR; // Annual waste on ambiguity
  const prodLoss = totalPayroll * SWITCHING_FACTOR; // Annual waste on distraction
  const turnoverLoss = (headcount * TURNOVER_RISK_PCT) * (annualSalary * REPLACEMENT_COST_FACTOR);
  
  const totalLoss = commLoss + prodLoss + turnoverLoss;
  
  const pieData = [
    { name: 'Ambiguity Drag (Case 1)', value: commLoss, color: '#f59e0b' },
    { name: 'Cognitive Switching (Case 2)', value: prodLoss, color: '#ef4444' },
    { name: 'Turnover & Silos (Case 3/4)', value: turnoverLoss, color: '#10b981' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      <SectionHeader 
        title="Diagnostic Deep Dive" 
        subtitle="Rigorous root cause analysis using evidence-based frameworks to validate the proposed solutions."
        icon={Microscope}
      />

      {/* TABS */}
      <div className="flex gap-2 mb-6 border-b border-slate-200">
        {[
          {id: 'bem', label: "Systemic Root Cause (BEM)"},
          {id: 'neuro', label: "Behavioral Neuroscience (SCARF)"},
          {id: 'cynefin', label: "Strategic Response (Cynefin)"}
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)} 
            className={`px-4 py-3 text-sm font-bold border-b-2 transition-all ${activeTab === tab.id ? 'text-[#0095DA] border-[#0095DA] bg-blue-50/50 rounded-t-lg' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Col: The Framework Visuals */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* TAB 1: GILBERT'S BEM */}
          {activeTab === 'bem' && (
            <div className="space-y-4 animate-fadeIn">
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2"><Grid size={18} className="text-blue-500"/> Gilbert's Behavior Engineering Model</h4>
                  <Badge color="slate" size="xs">Root Cause</Badge>
                </div>
                
                <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r text-sm text-slate-700 leading-relaxed">
                  <strong>First Leisurely Theorem:</strong> 75% of performance gaps are Environmental (Systemic), only 25% are Individual. We must prioritize "fixing the tools" before "training the people".
                </div>

                <div className="overflow-x-auto">
                  <div className="bem-grid min-w-[600px]">
                    {/* Headers */}
                    <div className="bem-header bg-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Level</span>
                    </div>
                    <div className="bem-header">
                      <div className="bem-header-title">Information</div>
                      <div className="bem-header-sub">Data & Expectations</div>
                    </div>
                    <div className="bem-header">
                      <div className="bem-header-title">Instrumentation</div>
                      <div className="bem-header-sub">Tools & Resources</div>
                    </div>
                    <div className="bem-header">
                      <div className="bem-header-title">Motivation</div>
                      <div className="bem-header-sub">Incentives & Consequences</div>
                    </div>

                    {/* Row 1: Environment */}
                    <div className="bem-row-header text-[#0095DA] bg-blue-50/50">
                      <span className="text-[9px] uppercase tracking-widest text-[#0095DA]">Environment</span>
                      <div className="flex items-center gap-1 mt-1 bg-white/80 px-1 py-0.5 rounded text-[8px] font-bold shadow-sm">
                        <ChevronsUp size={10}/> 75% Impact
                      </div>
                    </div>
                    
                    {/* ENV - INFO */}
                    <div className="bem-cell border-b border-r bg-red-50/20">
                      <div className="flex justify-between items-start mb-2">
                        <strong className="text-red-600 uppercase text-[10px]">Gap Found</strong>
                        <AlertTriangle size={14} className="text-red-400"/>
                      </div>
                      <div className="space-y-1 mb-2">
                          <div className="text-[10px] text-slate-600"><strong>Case 1:</strong> Ambiguous chat protocols.</div>
                          <div className="text-[10px] text-slate-600"><strong>Case 3:</strong> Unclear role definitions (Silos).</div>
                      </div>
                      <div className="mt-auto pt-2 border-t border-red-100 text-[10px] font-bold text-red-600 flex items-center gap-1">
                        <ZapIcon size={10}/> Fix: Playbooks & Charters
                      </div>
                    </div>

                    {/* ENV - INSTRUMENT */}
                    <div className="bem-cell border-b border-r bg-red-50/20">
                      <div className="flex justify-between items-start mb-2">
                        <strong className="text-red-600 uppercase text-[10px]">Gap Found</strong>
                        <AlertTriangle size={14} className="text-red-400"/>
                      </div>
                      <div className="space-y-1 mb-2">
                          <div className="text-[10px] text-slate-600"><strong>Case 2:</strong> Notification overload.</div>
                          <div className="text-[10px] text-slate-600"><strong>Case 4:</strong> Lack of feedback channels.</div>
                      </div>
                      <div className="mt-auto pt-2 border-t border-red-100 text-[10px] font-bold text-red-600 flex items-center gap-1">
                        <ZapIcon size={10}/> Fix: Deep Work Tools
                      </div>
                    </div>

                    {/* ENV - MOTIVATION */}
                    <div className="bem-cell border-b bg-slate-50/50 grayscale opacity-60">
                      <div className="flex justify-between items-start mb-2">
                        <strong className="text-slate-400 uppercase text-[10px]">Gap Minor</strong>
                        <CheckCircle size={14} className="text-slate-300"/>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Incentives generally aligned, though may reward speed over quality.
                      </div>
                      <div className="mt-auto pt-2 border-t border-slate-200 text-[10px] font-bold text-slate-400">
                        Fix: Team KPIs
                      </div>
                    </div>

                    {/* Row 2: Individual */}
                    <div className="bem-row-header text-amber-600 bg-amber-50/50">
                      <span className="text-[9px] uppercase tracking-widest text-amber-600">Individual</span>
                      <div className="flex items-center gap-1 mt-1 bg-white/80 px-1 py-0.5 rounded text-[8px] font-bold shadow-sm">
                          25% Impact
                      </div>
                    </div>

                    {/* IND - KNOWLEDGE */}
                    <div className="bem-cell border-r bg-amber-50/20">
                      <div className="flex justify-between items-start mb-2">
                        <strong className="text-amber-600 uppercase text-[10px]">Gap Found</strong>
                        <Book size={14} className="text-amber-400"/>
                      </div>
                      <div className="text-[10px] text-slate-600 mb-2">
                          <strong>Case 1:</strong> Lack of "Corporate Context" & professional etiquette.
                      </div>
                      <div className="mt-auto pt-2 border-t border-amber-100 text-[10px] font-bold text-amber-600 flex items-center gap-1">
                        <ZapIcon size={10}/> Fix: Micro-Learning
                      </div>
                    </div>

                    {/* IND - CAPACITY */}
                    <div className="bem-cell border-r bg-amber-50/20">
                      <div className="flex justify-between items-start mb-2">
                        <strong className="text-amber-600 uppercase text-[10px]">Gap Found</strong>
                        <Clock size={14} className="text-amber-400"/>
                      </div>
                      <div className="space-y-1 mb-2">
                          <div className="text-[10px] text-slate-600"><strong>Case 2:</strong> Focus stamina deficit.</div>
                          <div className="text-[10px] text-slate-600"><strong>Case 4:</strong> Emotional regulation.</div>
                      </div>
                      <div className="mt-auto pt-2 border-t border-amber-100 text-[10px] font-bold text-amber-600 flex items-center gap-1">
                        <ZapIcon size={10}/> Fix: Attention Training
                      </div>
                    </div>

                    {/* IND - MOTIVES */}
                    <div className="bem-cell bg-amber-50/20">
                      <div className="flex justify-between items-start mb-2">
                        <strong className="text-amber-600 uppercase text-[10px]">Gap Found</strong>
                        <Activity size={14} className="text-amber-400"/>
                      </div>
                      <div className="space-y-1 mb-2">
                          <div className="text-[10px] text-slate-600"><strong>Case 3:</strong> Preference for isolation.</div>
                          <div className="text-[10px] text-slate-600"><strong>Case 4:</strong> Fear of feedback.</div>
                      </div>
                      <div className="mt-auto pt-2 border-t border-amber-100 text-[10px] font-bold text-amber-600 flex items-center gap-1">
                        <ZapIcon size={10}/> Fix: Psych Safety
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center gap-2 text-[10px] text-slate-400 italic">
                  <Book size={12}/> Cited: Thomas F. Gilbert, "Human Competence: Engineering Worthy Performance" (1978).
                </div>
              </Card>
            </div>
          )}

          {/* TAB 2: SCARF & COGNITIVE LOAD */}
          {activeTab === 'neuro' && (
            <div className="space-y-4 animate-fadeIn">
              <Card>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2"><Brain size={18} className="text-green-500"/> The SCARF Model (Neuroscience)</h4>
                  <Badge color="green" size="xs">Case 4 Diagnosis</Badge>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  Why Gen Z reacts defensively to feedback. It triggers a <strong>Status Threat</strong> response in the brain (Amygdala Hijack), reducing cognitive function.
                </p>
                
                <div className="space-y-3">
                  {[
                    { label: "Status", score: 90, desc: "Feedback attacks 'Self-Worth'. (High Threat)", color: "red" },
                    { label: "Certainty", score: 80, desc: "Ambiguous chats create anxiety. (High Threat)", color: "red" },
                    { label: "Autonomy", score: 20, desc: "Micro-management is low.", color: "blue" },
                    { label: "Relatedness", score: 70, desc: "Silos reduce 'Tribe' feeling. (Med Threat)", color: "amber" },
                    { label: "Fairness", score: 30, desc: "Process seems generally fair.", color: "blue" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-24 text-xs font-bold text-slate-700 uppercase text-right">{item.label}</div>
                      <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full bg-${item.color}-500`} style={{width: `${item.score}%`}}></div>
                      </div>
                      <div className="text-[10px] text-slate-500 w-48">{item.desc}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-[10px] text-slate-400 italic">
                  <Book size={12}/> Cited: David Rock, "SCARF: A Brain-Based Model for Collaborating" (2008).
                </div>
              </Card>
            </div>
          )}

          {/* TAB 3: CYNEFIN */}
          {activeTab === 'cynefin' && (
            <div className="space-y-4 animate-fadeIn">
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2"><Compass size={18} className="text-purple-500"/> The Cynefin Strategic Compass</h4>
                  <Badge color="purple" size="xs">Strategic Response</Badge>
                </div>
                <p className="text-xs text-slate-600 mb-4">
                  We don't use a "One Size Fits All" approach. We categorize each case by complexity to apply the correct management response.
                </p>
                
                <div className="grid grid-cols-2 gap-3 text-[10px]">
                  
                  {/* COMPLEX */}
                  <div className="bg-purple-50 p-4 rounded-tl-2xl border-l-4 border-t-4 border-purple-200 h-36 relative group hover:bg-purple-100 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-black text-purple-700 uppercase tracking-widest">COMPLEX</div>
                      <GitMerge size={16} className="text-purple-400"/>
                    </div>
                    <div className="text-xs text-slate-700 font-bold mb-1">Case 3: Silos</div>
                    <p className="text-slate-500 leading-tight mb-2">Unknown Unknowns.</p>
                    <div className="space-y-1">
                      <div className="bg-white px-2 py-1 rounded border border-purple-100 font-mono text-[9px] text-purple-600">
                        Protocol: PROBE-SENSE-RESPOND
                      </div>
                      <div className="text-slate-600"><strong>Action:</strong> "Emergent Practice" (e.g., Shadowing).</div>
                    </div>
                  </div>

                  {/* COMPLICATED */}
                  <div className="bg-red-50 p-4 rounded-tr-2xl border-r-4 border-t-4 border-red-200 h-36 relative group hover:bg-red-100 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-black text-red-700 uppercase tracking-widest">COMPLICATED</div>
                      <Zap size={16} className="text-red-400"/>
                    </div>
                    <div className="text-xs text-slate-700 font-bold mb-1">Case 2: Productivity</div>
                    <p className="text-slate-500 leading-tight mb-2">Known Unknowns.</p>
                    <div className="space-y-1">
                      <div className="bg-white px-2 py-1 rounded border border-red-100 font-mono text-[9px] text-red-600">
                        Protocol: SENSE-ANALYZE-RESPOND
                      </div>
                      <div className="text-slate-600"><strong>Action:</strong> "Good Practice" (e.g., Eisenhower Matrix).</div>
                    </div>
                  </div>

                  {/* CHAOTIC */}
                  <div className="bg-green-50 p-4 rounded-bl-2xl border-l-4 border-b-4 border-green-200 h-36 relative group hover:bg-green-100 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-black text-green-700 uppercase tracking-widest">CHAOTIC</div>
                      <Activity size={16} className="text-green-400"/>
                    </div>
                    <div className="text-xs text-slate-700 font-bold mb-1">Case 4: EQ Crisis</div>
                    <p className="text-slate-500 leading-tight mb-2">Unknowables.</p>
                    <div className="space-y-1">
                      <div className="bg-white px-2 py-1 rounded border border-green-100 font-mono text-[9px] text-green-600">
                        Protocol: ACT-SENSE-RESPOND
                      </div>
                      <div className="text-slate-600"><strong>Action:</strong> "Novel Practice" (e.g., Stabilize via Safe Space).</div>
                    </div>
                  </div>

                  {/* SIMPLE */}
                  <div className="bg-amber-50 p-4 rounded-br-2xl border-r-4 border-b-4 border-amber-200 h-36 relative group hover:bg-amber-100 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-black text-amber-700 uppercase tracking-widest">SIMPLE</div>
                      <MessageCircle size={16} className="text-amber-400"/>
                    </div>
                    <div className="text-xs text-slate-700 font-bold mb-1">Case 1: Ambiguity</div>
                    <p className="text-slate-500 leading-tight mb-2">Knowns.</p>
                    <div className="space-y-1">
                      <div className="bg-white px-2 py-1 rounded border border-amber-100 font-mono text-[9px] text-amber-600">
                        Protocol: SENSE-CATEGORIZE-RESPOND
                      </div>
                      <div className="text-slate-600"><strong>Action:</strong> "Best Practice" (e.g., Standard Templates).</div>
                    </div>
                  </div>

                </div>
                <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-400 italic">
                  <Book size={12}/> Cited: Snowden & Boone, "A Leader's Framework for Decision Making" (HBR 2007).
                </div>
              </Card>
            </div>
          )}

        </div>

        {/* Right Col: Cost Simulator (Contextual) */}
        <div>
           <div className="glass-dark text-white rounded-3xl p-6 sticky top-6 shadow-2xl border border-white/10">
             <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
               <div className="p-2 bg-[#0095DA] rounded-lg text-white shadow-lg shadow-blue-500/20"><Calculator size={20}/></div>
               <div>
                 <h3 className="font-bold text-lg">Financial Impact of Friction</h3>
                 <p className="text-xs text-slate-400">Estimated Annual Loss (Data-Driven)</p>
               </div>
             </div>

             <div className="space-y-6">
               <div>
                 <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-3 text-slate-400">
                   Gen Z Headcount
                   <span className="text-white bg-white/10 px-2 py-0.5 rounded">{headcount}</span>
                 </div>
                 <input type="range" min="50" max="1000" step="10" value={headcount} onChange={(e) => setHeadcount(e.target.value)} />
               </div>
               <div>
                 <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-3 text-slate-400">
                   Avg Salary (Juta/Mo)
                   <span className="text-white bg-white/10 px-2 py-0.5 rounded">{salary}</span>
                 </div>
                 <input type="range" min="5" max="20" step="1" value={salary} onChange={(e) => setSalary(e.target.value)} />
               </div>
             </div>

             {/* Chart Breakdown */}
             <div className="mt-8">
               <div className="h-40 relative">
                 <ResponsiveContainer width="100%" height="100%">
                   <RePieChart>
                     <Pie
                       data={pieData}
                       cx="50%"
                       cy="50%"
                       innerRadius={40}
                       outerRadius={60}
                       paddingAngle={5}
                       dataKey="value"
                     >
                       {pieData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                     </Pie>
                     <Tooltip 
                        formatter={(value) => formatIDR(value)}
                        contentStyle={{backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px'}}
                     />
                   </RePieChart>
                 </ResponsiveContainer>
                 {/* Center Text */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                   <div className="text-[10px] text-slate-400 uppercase">Total Waste</div>
                   <div className="text-sm font-bold text-white">{formatIDR(totalLoss).slice(0,4)}...</div>
                 </div>
               </div>

               {/* Legend & Research Citations */}
               <div className="space-y-3 mt-4 bg-white/5 p-3 rounded-lg border border-white/5">
                 <div className="flex justify-between items-center text-[10px]">
                   <span className="flex items-center gap-2 text-amber-400"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Ambiguity (10%)</span>
                   <span className="text-white">{formatIDR(commLoss)}</span>
                 </div>
                 <p className="text-[9px] text-slate-500 mb-2 border-b border-white/5 pb-1">
                   *Based on IDC: Knowledge workers waste ~15% time on clarification.
                 </p>

                 <div className="flex justify-between items-center text-[10px]">
                   <span className="flex items-center gap-2 text-red-400"><div className="w-2 h-2 rounded-full bg-red-500"></div> Switching (20%)</span>
                   <span className="text-white">{formatIDR(prodLoss)}</span>
                 </div>
                 <p className="text-[9px] text-slate-500 mb-2 border-b border-white/5 pb-1">
                   *Based on APA: 40% efficiency loss from multitasking.
                 </p>

                 <div className="flex justify-between items-center text-[10px]">
                   <span className="flex items-center gap-2 text-green-400"><div className="w-2 h-2 rounded-full bg-green-500"></div> Turnover (Risk)</span>
                   <span className="text-white">{formatIDR(turnoverLoss)}</span>
                 </div>
                 <p className="text-[9px] text-slate-500">
                   *Based on SHRM: Replacement cost = 50% of annual salary.
                 </p>
               </div>
             </div>

             <div className="mt-6 pt-4 border-t border-white/10 text-center">
               <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Annual Opportunity Cost</div>
               <div className="text-2xl font-black text-white drop-shadow-lg">{formatIDR(totalLoss)}</div>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

// 3. SOLUTIONS (STRATEGY & PEDAGOGY)
const SolutionView = () => {
  const [activeTab, setActiveTab] = useState('hybrid');

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      <SectionHeader 
        title="Solution Architecture" 
        subtitle="Moving from 'Training Events' to a 'Performance Ecosystem'. Integrated methods that blend formal instruction with autonomous growth."
        icon={Brain}
      />

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-200 overflow-x-auto">
        {[
          {id: 'hybrid', label: "The Hybrid Model (Training vs Self-Learning)"},
          {id: 'sdt', label: "Psychological Strategy (SDT)"},
          {id: 'gov', label: "Content Governance & QA"},
          {id: 'pedagogy', label: "Pedagogy & Modules"}
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)} 
            className={`px-4 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id ? 'text-[#0095DA] border-[#0095DA] bg-blue-50/50 rounded-t-lg' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* VIEW: HYBRID MODEL (NEW) */}
      {activeTab === 'hybrid' && (
        <div className="animate-fadeIn space-y-8">
           <div className="grid md:grid-cols-12 gap-6">
              {/* Left Side: The Comparison */}
              <div className="md:col-span-5 space-y-4">
                  <div className="bg-slate-900 text-white p-6 rounded-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-10"><GraduationCap size={100}/></div>
                      <h4 className="text-xl font-bold mb-2 flex items-center gap-2"><GraduationCap className="text-blue-400"/> Formal Training</h4>
                      <Badge color="blue">The "Push" Method</Badge>
                      <p className="text-sm text-slate-300 mt-4 leading-relaxed">
                        <strong>Synchronous & Guided.</strong> Best for establishing a common baseline, introducing new concepts (e.g., The 3C Framework), and ensuring compliance.
                      </p>
                      <div className="mt-4 pt-4 border-t border-white/10 text-xs space-y-2">
                        <div className="flex items-center gap-2"><Check size={12} className="text-blue-400"/> Instructor-Led Workshops</div>
                        <div className="flex items-center gap-2"><Check size={12} className="text-blue-400"/> Cohort-based Bootcamps</div>
                        <div className="flex items-center gap-2"><Check size={12} className="text-blue-400"/> Role-Play Simulations</div>
                      </div>
                  </div>

                  <div className="bg-white border border-slate-200 text-slate-800 p-6 rounded-2xl relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
                      <div className="absolute top-0 right-0 p-4 opacity-5"><Laptop size={100}/></div>
                      <h4 className="text-xl font-bold mb-2 flex items-center gap-2"><Laptop className="text-green-500"/> Self-Learning</h4>
                      <Badge color="green">The "Pull" Method</Badge>
                      <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                        <strong>Asynchronous & Autonomous.</strong> Best for deep diving, referencing specific tools in the flow of work, and sustaining knowledge over time.
                      </p>
                      <div className="mt-4 pt-4 border-t border-slate-100 text-xs space-y-2">
                        <div className="flex items-center gap-2"><Check size={12} className="text-green-500"/> On-Demand LXP Modules</div>
                        <div className="flex items-center gap-2"><Check size={12} className="text-green-500"/> Digital Playbooks & Wikis</div>
                        <div className="flex items-center gap-2"><Check size={12} className="text-green-500"/> Micro-Learning Quizzes</div>
                      </div>
                  </div>
              </div>

              {/* Center: The Collaboration Bridge */}
              <div className="md:col-span-2 flex flex-col items-center justify-center relative">
                 <div className="hidden md:block absolute top-0 bottom-0 w-0.5 bg-slate-200 border-l border-dashed border-slate-300"></div>
                 
                 <div className="bg-white p-4 rounded-xl border-2 border-[#0095DA] shadow-lg z-10 text-center w-full my-4">
                    <div className="flex justify-center text-[#0095DA] mb-2"><RefreshCw size={24} className="animate-spin-slow"/></div>
                    <h5 className="font-bold text-sm text-slate-800">The Feedback Loop</h5>
                    <p className="text-[10px] text-slate-500 mt-1">Data from Self-Learning informs future Training focus.</p>
                 </div>
              </div>

              {/* Right Side: The Outcome */}
              <div className="md:col-span-5 flex flex-col h-full">
                 <div className="bg-gradient-to-br from-blue-50 to-slate-50 border border-blue-100 p-8 rounded-2xl h-full flex flex-col justify-center text-center">
                    <h4 className="text-xl font-black text-slate-800 mb-2">The "Sweet Spot"</h4>
                    <p className="text-sm text-slate-600 mb-6">
                      True capability building happens when these two collide. Training ignites the spark; Self-learning keeps the fire burning.
                    </p>
                    
                    <div className="space-y-3 text-left">
                       <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-100 flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded text-blue-600 font-bold text-xs">1</div>
                          <div className="text-xs text-slate-600"><strong>Trigger:</strong> User attends a workshop (Training).</div>
                       </div>
                       <div className="flex justify-center"><ArrowRight size={16} className="text-slate-300 rotate-90 md:rotate-0"/></div>
                       <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-100 flex items-center gap-3">
                          <div className="bg-green-100 p-2 rounded text-green-600 font-bold text-xs">2</div>
                          <div className="text-xs text-slate-600"><strong>Application:</strong> User applies tool via LXP (Self-Learning).</div>
                       </div>
                       <div className="flex justify-center"><ArrowRight size={16} className="text-slate-300 rotate-90 md:rotate-0"/></div>
                       <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-100 flex items-center gap-3">
                          <div className="bg-purple-100 p-2 rounded text-purple-600 font-bold text-xs">3</div>
                          <div className="text-xs text-slate-600"><strong>Review:</strong> Peers review application (Collaboration).</div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* VIEW: SDT STRATEGY */}
      {activeTab === 'sdt' && (
        <div className="animate-fadeIn">
          <div className="mb-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg shadow-sm">
             <h4 className="text-sm font-bold text-blue-800 mb-1">Strategic Shift: Self-Determination Theory (Ryan & Deci)</h4>
             <p className="text-xs text-blue-700">
               Traditional training relies on "Extrinsic" motivation (Mandates). To engage Gen Z, we must trigger "Intrinsic" motivation by satisfying 3 psychological needs: <strong>Autonomy, Competence, and Relatedness</strong>.
             </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* AUTONOMY COLUMN */}
            <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow group">
              <div className="bg-gradient-to-br from-blue-50 to-white p-6 border-b border-blue-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><User size={60} className="text-blue-500"/></div>
                <h3 className="font-bold text-xl text-blue-700 mb-1">Autonomy</h3>
                <p className="text-xs text-blue-500 font-medium uppercase tracking-wider">The Need for Choice</p>
              </div>
              <div className="p-6 flex-1 space-y-6">
                 <div>
                   <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Gen Z Translation</div>
                   <div className="text-sm font-medium text-slate-800 italic">"Don't force feed me content. Let me choose my path."</div>
                 </div>
                 
                 <div className="space-y-4">
                   <div className="relative pl-4 border-l-2 border-blue-200">
                     <div className="text-xs font-bold text-slate-700 mb-1 flex items-center gap-2">
                       <LayoutTemplate size={14} className="text-blue-500"/> Netflix-Style Paths
                     </div>
                     <p className="text-[11px] text-slate-500 leading-snug">
                       Curated "Playlists" based on persona (e.g., "The Negotiator" vs "The Influencer") rather than generic course lists.
                     </p>
                   </div>
                   <div className="relative pl-4 border-l-2 border-blue-200">
                     <div className="text-xs font-bold text-slate-700 mb-1 flex items-center gap-2">
                       <Unlock size={14} className="text-blue-500"/> "Test-Out" Diagnostics
                     </div>
                     <p className="text-[11px] text-slate-500 leading-snug">
                       Pre-assessments allow users to skip basic modules they already know. Respects their time.
                     </p>
                   </div>
                 </div>
              </div>
            </div>

            {/* COMPETENCE COLUMN */}
            <div className="bg-white rounded-2xl border border-amber-100 shadow-sm overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow group">
              <div className="bg-gradient-to-br from-amber-50 to-white p-6 border-b border-amber-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Target size={60} className="text-amber-500"/></div>
                <h3 className="font-bold text-xl text-amber-700 mb-1">Competence</h3>
                <p className="text-xs text-amber-500 font-medium uppercase tracking-wider">The Need for Mastery</p>
              </div>
              <div className="p-6 flex-1 space-y-6">
                 <div>
                   <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Gen Z Translation</div>
                   <div className="text-sm font-medium text-slate-800 italic">"Show me I'm leveling up. Give me instant feedback."</div>
                 </div>
                 
                 <div className="space-y-4">
                   <div className="relative pl-4 border-l-2 border-amber-200">
                     <div className="text-xs font-bold text-slate-700 mb-1 flex items-center gap-2">
                       <Award size={14} className="text-amber-500"/> Micro-Badging
                     </div>
                     <p className="text-[11px] text-slate-500 leading-snug">
                       Digital badges (e.g., "Deep Work Pro") linked to internal profiles (Workday/Slack) to signal status.
                     </p>
                   </div>
                   <div className="relative pl-4 border-l-2 border-amber-200">
                     <div className="text-xs font-bold text-slate-700 mb-1 flex items-center gap-2">
                       <TrendingUp size={14} className="text-amber-500"/> Progress Streaks
                     </div>
                     <p className="text-[11px] text-slate-500 leading-snug">
                       Duolingo-style streak mechanics and "XP" points for consistent daily engagement.
                     </p>
                   </div>
                 </div>
              </div>
            </div>

            {/* RELATEDNESS COLUMN */}
            <div className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow group">
              <div className="bg-gradient-to-br from-purple-50 to-white p-6 border-b border-purple-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Users size={60} className="text-purple-500"/></div>
                <h3 className="font-bold text-xl text-purple-700 mb-1">Relatedness</h3>
                <p className="text-xs text-purple-500 font-medium uppercase tracking-wider">The Need for Connection</p>
              </div>
              <div className="p-6 flex-1 space-y-6">
                 <div>
                   <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Gen Z Translation</div>
                   <div className="text-sm font-medium text-slate-800 italic">"Learning is social. Let's do this together."</div>
                 </div>
                 
                 <div className="space-y-4">
                   <div className="relative pl-4 border-l-2 border-purple-200">
                     <div className="text-xs font-bold text-slate-700 mb-1 flex items-center gap-2">
                       <GitMerge size={14} className="text-purple-500"/> Squad Quests
                     </div>
                     <p className="text-[11px] text-slate-500 leading-snug">
                       Group learners into cross-functional teams (Case 3 fix) to solve a mock crisis.
                     </p>
                   </div>
                   <div className="relative pl-4 border-l-2 border-purple-200">
                     <div className="text-xs font-bold text-slate-700 mb-1 flex items-center gap-2">
                       <MessageCircle size={14} className="text-purple-500"/> Peer Review
                     </div>
                     <p className="text-[11px] text-slate-500 leading-snug">
                       Submission of "Practice Videos" reviewed by peers, normalizing feedback (Case 4 fix).
                     </p>
                   </div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* VIEW: CONTENT GOV */}
      {activeTab === 'gov' && (
        <div className="animate-fadeIn">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-slate-100 pb-6">
               <div className="flex items-center gap-4">
                 <div className="p-3 bg-slate-900 text-white rounded-xl shadow-lg"><ShieldCheck size={32}/></div>
                 <div>
                   <h3 className="font-bold text-2xl text-slate-900">The "Quality Factory" Pipeline</h3>
                   <p className="text-xs text-slate-500 mt-1">
                     A Stage-Gate process built on <strong>ADDIE Model</strong> & <strong>Cognitive Load Theory</strong> standards.
                   </p>
                 </div>
               </div>
               <div className="mt-4 md:mt-0 flex gap-2">
                 <Badge color="slate" size="xs">Standards: WCAG 2.1</Badge>
                 <Badge color="slate" size="xs">Brand: Blibli Voice</Badge>
               </div>
            </div>

            <div className="flex flex-col gap-6 relative">
               {/* Vertical Connecting Line */}
               <div className="absolute top-4 bottom-4 left-[22px] w-0.5 bg-slate-200 -z-0"></div>

               {/* GATE 1: ANALYSIS */}
               <div className="relative z-10 pl-16 group">
                 <div className="absolute left-0 top-0 w-12 h-12 bg-white rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10">
                   <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold group-hover:bg-slate-900 group-hover:text-white transition-colors">1</div>
                 </div>
                 <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-slate-900">Relevance Gate (Analysis)</h4>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Theory: TNA Alignment</p>
                      </div>
                      <Badge color="slate" size="xs">Step 1</Badge>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mt-3">
                      <div className="text-[11px] text-slate-600 bg-white p-3 rounded border border-slate-100">
                        <strong className="text-green-600 flex items-center gap-1 mb-1"><Check size={10}/> Pass Criteria</strong>
                        <ul className="list-disc list-inside mt-1 space-y-1 text-slate-500">
                          <li>Solves specific TNA gap (e.g., Ambiguity).</li>
                          <li>Validated by Business Owner (SME).</li>
                        </ul>
                      </div>
                      <div className="text-[11px] text-red-600 bg-red-50 p-3 rounded border border-red-100">
                        <strong className="flex items-center gap-1 mb-1"><AlertCircle size={10}/> KILL CRITERIA</strong>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          <li>Generic/Theory-only content.</li>
                          <li>No measurable outcome defined.</li>
                        </ul>
                      </div>
                    </div>
                 </div>
               </div>

               {/* GATE 2: DESIGN */}
               <div className="relative z-10 pl-16 group">
                 <div className="absolute left-0 top-0 w-12 h-12 bg-white rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10">
                   <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold group-hover:bg-slate-900 group-hover:text-white transition-colors">2</div>
                 </div>
                 <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-slate-900">Cognitive Gate (Design)</h4>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Theory: Mayer's Principles</p>
                      </div>
                      <Badge color="slate" size="xs">Step 2</Badge>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mt-3">
                      <div className="text-[11px] text-slate-600 bg-white p-3 rounded border border-slate-100">
                        <strong className="text-green-600 flex items-center gap-1 mb-1"><Check size={10}/> Pass Criteria</strong>
                        <ul className="list-disc list-inside mt-1 space-y-1 text-slate-500">
                          <li>Micro-chunked (Max 4 mins).</li>
                          <li>Uses "Dual Coding" (Visual + Audio).</li>
                        </ul>
                      </div>
                      <div className="text-[11px] text-red-600 bg-red-50 p-3 rounded border border-red-100">
                        <strong className="flex items-center gap-1 mb-1"><AlertCircle size={10}/> KILL CRITERIA</strong>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          <li>"Wall of Text" slides (Cognitive Overload).</li>
                          <li>Extraneous graphics (Coherence Principle).</li>
                        </ul>
                      </div>
                    </div>
                 </div>
               </div>

               {/* GATE 3: DEVELOPMENT */}
               <div className="relative z-10 pl-16 group">
                 <div className="absolute left-0 top-0 w-12 h-12 bg-white rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10">
                   <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold group-hover:bg-[#0095DA] group-hover:text-white transition-colors">3</div>
                 </div>
                 <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-[#0095DA] hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-slate-900">Brand Gate (Development)</h4>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Theory: Organizational Identity</p>
                      </div>
                      <Badge color="blue" size="xs">Step 3</Badge>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mt-3">
                      <div className="text-[11px] text-slate-600 bg-white p-3 rounded border border-slate-100">
                        <strong className="text-green-600 flex items-center gap-1 mb-1"><Check size={10}/> Pass Criteria</strong>
                        <ul className="list-disc list-inside mt-1 space-y-1 text-slate-500">
                          <li>Blibli Tone: "Customer Obsessed".</li>
                          <li>Visuals align with design system.</li>
                        </ul>
                      </div>
                      <div className="text-[11px] text-red-600 bg-red-50 p-3 rounded border border-red-100">
                        <strong className="flex items-center gap-1 mb-1"><AlertCircle size={10}/> KILL CRITERIA</strong>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          <li>Generic stock photography.</li>
                          <li>Bureaucratic or "scolding" tone.</li>
                        </ul>
                      </div>
                    </div>
                 </div>
               </div>

               {/* GATE 4: IMPLEMENTATION */}
               <div className="relative z-10 pl-16 group">
                 <div className="absolute left-0 top-0 w-12 h-12 bg-white rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10">
                   <div className="w-full h-full bg-[#0095DA] rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">
                     <CheckCircle size={16}/>
                   </div>
                 </div>
                 <div className="bg-[#0095DA]/5 p-5 rounded-2xl border border-[#0095DA]/20 hover:bg-[#0095DA]/10 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-[#0095DA]">Tech Gate (Implementation)</h4>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Theory: UX Heuristics</p>
                      </div>
                      <Badge color="green" size="xs">Final</Badge>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mt-3">
                      <div className="text-[11px] text-slate-600 bg-white p-3 rounded border border-slate-100">
                        <strong className="text-green-600 flex items-center gap-1 mb-1"><Check size={10}/> Pass Criteria</strong>
                        <ul className="list-disc list-inside mt-1 space-y-1 text-slate-500">
                          <li>Mobile Responsive (100%).</li>
                          <li>Active Recall points trigger correctly.</li>
                        </ul>
                      </div>
                      <div className="text-[11px] text-red-600 bg-red-50 p-3 rounded border border-red-100">
                        <strong className="flex items-center gap-1 mb-1"><AlertCircle size={10}/> KILL CRITERIA</strong>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          <li>Load time &gt; 2 seconds.</li>
                          <li>Navigation dead-ends.</li>
                        </ul>
                      </div>
                    </div>
                 </div>
               </div>

            </div>
          </div>
        </div>
      )}

      {/* VIEW: PEDAGOGY (LXP MOCKUPS) */}
      {activeTab === 'pedagogy' && (
        <div className="animate-fadeIn">
          
          <div className="mb-8">
            <div className="flex justify-between items-end mb-4">
               <div>
                  <h3 className="text-xl font-bold text-slate-800">The "Atomic Learning" Design System</h3>
                  <p className="text-xs text-slate-500">Every module is built from these 4 micro-components.</p>
               </div>
               <Badge color="purple" size="xs">Gagne's 9 Events (Adapted)</Badge>
            </div>
            
            <div className="grid grid-cols-4 gap-2 mb-6">
              <div className="bg-slate-900 text-white p-3 rounded-lg text-center relative overflow-hidden group hover:-translate-y-1 transition-transform">
                <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Atom 1</div>
                <div className="font-bold text-sm text-yellow-400">The Hook</div>
                <div className="text-[9px] text-slate-400 mt-1">15s Viral Intro</div>
              </div>
              <div className="bg-white border border-slate-200 p-3 rounded-lg text-center relative group hover:-translate-y-1 transition-transform">
                <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Atom 2</div>
                <div className="font-bold text-sm text-slate-800">The Concept</div>
                <div className="text-[9px] text-slate-500 mt-1">2m Interactive Theory</div>
              </div>
              <div className="bg-white border border-slate-200 p-3 rounded-lg text-center relative group hover:-translate-y-1 transition-transform">
                <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Atom 3</div>
                <div className="font-bold text-sm text-slate-800">The Action</div>
                <div className="text-[9px] text-slate-500 mt-1">45s Gamified Task</div>
              </div>
              <div className="bg-white border border-slate-200 p-3 rounded-lg text-center relative group hover:-translate-y-1 transition-transform">
                <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Atom 4</div>
                <div className="font-bold text-sm text-slate-800">The Bridge</div>
                <div className="text-[9px] text-slate-500 mt-1">Real World Link</div>
              </div>
            </div>
          </div>

          <div className="mb-6 flex flex-col md:flex-row justify-between items-end gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Module Library (Mockups)</h3>
              <p className="text-xs text-slate-500 max-w-2xl">
                High-fidelity course cards designed to look like premium streaming content.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="text-[10px] font-bold px-3 py-1.5 bg-slate-100 rounded-full text-slate-500 flex items-center gap-1"><Filter size={10}/> Filter: All</span>
              <span className="text-[10px] font-bold px-3 py-1.5 bg-[#0095DA] text-white rounded-full shadow-md flex items-center gap-1"><Check size={10}/> Recommended</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Module 1 */}
            <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer relative">
              <div className="h-40 bg-amber-500 relative flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                 <PlayCircle size={48} className="text-white opacity-90 group-hover:scale-110 transition-transform relative z-10 drop-shadow-lg"/>
                 <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded font-bold border border-white/20">15:00 MIN</div>
                 <div className="absolute top-3 left-3 bg-amber-600/90 text-white text-[9px] px-2 py-1 rounded font-bold uppercase tracking-wider shadow-sm">Communication</div>
              </div>
              <div className="p-4">
                 <h4 className="font-bold text-sm text-slate-900 leading-tight mb-2 group-hover:text-[#0095DA] transition-colors">The 3C Framework: Clear, Concise, Concrete</h4>
                 
                 <div className="space-y-2 mb-4">
                   <div className="flex items-center gap-2 text-[10px] text-slate-500 bg-slate-50 p-1.5 rounded">
                     <Target size={12} className="text-amber-500"/> <span><strong>Goal:</strong> Reduce ambiguity (Case 1)</span>
                   </div>
                   <div className="flex items-center gap-2 text-[10px] text-slate-500 bg-slate-50 p-1.5 rounded">
                     <PenTool size={12} className="text-amber-500"/> <span><strong>Action:</strong> Rewrite 1 Email</span>
                   </div>
                 </div>

                 <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                   <div className="text-[9px] font-bold text-slate-400">RESUME</div>
                   <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-amber-500 w-1/3"></div></div>
                 </div>
              </div>
              
              {/* UX Rationale Tooltip */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-slate-900/90 text-white text-[9px] p-2 rounded max-w-[120px] backdrop-blur-md shadow-xl border border-white/10">
                   <strong>UX Rationale:</strong> "Dark Mode" thumbnail reduces eye strain. Progress bar triggers "Zeigarnik Effect" (desire to finish).
                </div>
              </div>
            </div>

            {/* Module 2 */}
            <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer relative">
              <div className="h-40 bg-red-500 relative flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                 <MousePointer2 size={48} className="text-white opacity-90 group-hover:scale-110 transition-transform relative z-10 drop-shadow-lg"/>
                 <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded font-bold border border-white/20">20:00 MIN</div>
                 <div className="absolute top-3 left-3 bg-red-600/90 text-white text-[9px] px-2 py-1 rounded font-bold uppercase tracking-wider shadow-sm">Productivity</div>
              </div>
              <div className="p-4">
                 <h4 className="font-bold text-sm text-slate-900 leading-tight mb-2 group-hover:text-[#0095DA] transition-colors">Eisenhower Matrix for Digital Natives</h4>
                 
                 <div className="space-y-2 mb-4">
                   <div className="flex items-center gap-2 text-[10px] text-slate-500 bg-slate-50 p-1.5 rounded">
                     <Target size={12} className="text-red-500"/> <span><strong>Goal:</strong> Stop multitasking (Case 2)</span>
                   </div>
                   <div className="flex items-center gap-2 text-[10px] text-slate-500 bg-slate-50 p-1.5 rounded">
                     <Smartphone size={12} className="text-red-500"/> <span><strong>Action:</strong> Sorting Game</span>
                   </div>
                 </div>

                 <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                   <div className="text-[9px] font-bold text-[#0095DA]">START NOW</div>
                   <ArrowRight size={12} className="text-[#0095DA]"/>
                 </div>
              </div>
            </div>

            {/* Module 3 */}
            <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer relative">
              <div className="h-40 bg-purple-500 relative flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                 <Users size={48} className="text-white opacity-90 group-hover:scale-110 transition-transform relative z-10 drop-shadow-lg"/>
                 <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded font-bold border border-white/20">25:00 MIN</div>
                 <div className="absolute top-3 left-3 bg-purple-600/90 text-white text-[9px] px-2 py-1 rounded font-bold uppercase tracking-wider shadow-sm">Collaboration</div>
              </div>
              <div className="p-4">
                 <h4 className="font-bold text-sm text-slate-900 leading-tight mb-2 group-hover:text-[#0095DA] transition-colors">Squad Charter: Defining Team Roles</h4>
                 
                 <div className="space-y-2 mb-4">
                   <div className="flex items-center gap-2 text-[10px] text-slate-500 bg-slate-50 p-1.5 rounded">
                     <Target size={12} className="text-purple-500"/> <span><strong>Goal:</strong> Break silos (Case 3)</span>
                   </div>
                   <div className="flex items-center gap-2 text-[10px] text-slate-500 bg-slate-50 p-1.5 rounded">
                     <FileText size={12} className="text-purple-500"/> <span><strong>Action:</strong> Fill & Share PDF</span>
                   </div>
                 </div>

                 <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                   <div className="text-[9px] font-bold text-[#0095DA]">DOWNLOAD</div>
                   <Download size={12} className="text-[#0095DA]"/>
                 </div>
              </div>
            </div>

            {/* Module 4 */}
            <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer relative">
              <div className="h-40 bg-green-500 relative flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                 <Activity size={48} className="text-white opacity-90 group-hover:scale-110 transition-transform relative z-10 drop-shadow-lg"/>
                 <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded font-bold border border-white/20">20:00 MIN</div>
                 <div className="absolute top-3 left-3 bg-green-600/90 text-white text-[9px] px-2 py-1 rounded font-bold uppercase tracking-wider shadow-sm">EQ & Resilience</div>
              </div>
              <div className="p-4">
                 <h4 className="font-bold text-sm text-slate-900 leading-tight mb-2 group-hover:text-[#0095DA] transition-colors">Feedback as Fuel: Growth Mindset</h4>
                 
                 <div className="space-y-2 mb-4">
                   <div className="flex items-center gap-2 text-[10px] text-slate-500 bg-slate-50 p-1.5 rounded">
                     <Target size={12} className="text-green-500"/> <span><strong>Goal:</strong> Lower turnover (Case 4)</span>
                   </div>
                   <div className="flex items-center gap-2 text-[10px] text-slate-500 bg-slate-50 p-1.5 rounded">
                     <SmartphoneNfc size={12} className="text-green-500"/> <span><strong>Action:</strong> Voice Note Journal</span>
                   </div>
                 </div>

                 <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                   <div className="text-[9px] font-bold text-[#0095DA]">START NOW</div>
                   <ArrowRight size={12} className="text-[#0095DA]"/>
                 </div>
              </div>
            </div>

          </div>
          
          <div className="mt-8 flex items-center justify-center p-4 bg-slate-900/5 border border-dashed border-slate-300 rounded-xl">
             <div className="text-center">
               <div className="flex justify-center mb-2 text-[#0095DA]"><Laptop size={24}/></div>
               <p className="text-xs font-bold text-slate-600">Interactive LXP Trials Available</p>
               <p className="text-[10px] text-slate-500 mt-1">Fully interactive prototypes (Function 2) can be accessed in the <strong>LXP Trial</strong> phase of this proposal.</p>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 4. EXECUTION (TIMELINE & 70:20:10)
const ExecutionView = () => {
  const [activeTab, setActiveTab] = useState('comm');

  const caseData = {
    comm: {
      id: 'comm',
      label: 'Case 1: Communication',
      color: 'amber',
      icon: MessageCircle,
      r70: { 
        title: "Daily & Weekly Missions", 
        tasks: [
          "Rewrite 3 emails using '3C Framework' (Clear, Concise, Concrete) before sending.",
          "Lead the Weekly Huddle once this month.",
          "Observe a senior leader's presentation and note 3 non-verbal cues."
        ] 
      },
      r20: { 
        title: "Peer Feedback Loops", 
        tasks: [
          "'Feedback Triads': Review weekly updates with 2 peers every Friday.",
          "'Comm-Clinic': 15-min open door with manager to review high-stakes decks."
        ] 
      },
      r10: { 
        title: "Micro-Learning Assets", 
        tasks: [
          "Video: 'Code-Switching: Social vs. Professional' (3 min).",
          "PDF Guide: 'The 3C Checklist for Emails'.",
          "Interactive: 'Spot the Ambiguity' Quiz."
        ] 
      }
    },
    prod: {
      id: 'prod',
      label: 'Case 2: Productivity',
      color: 'red',
      icon: Zap,
      r70: { 
        title: "Deep Work Protocols", 
        tasks: [
          "Activate 'Do Not Disturb' for 90 mins daily (10:00-11:30).",
          "Apply Eisenhower Matrix to daily to-do list every morning.",
          "Audit screen time weekly and reduce non-work browsing by 10%."
        ]
      },
      r20: { 
        title: "Accountability Structure", 
        tasks: [
          "Share 'One Big Thing' goal in squad channel daily.",
          "Productivity Buddy check-in: 'Did you hit your deep work target?'"
        ]
      },
      r10: { 
        title: "Tool Mastery", 
        tasks: [
          "Interactive Tool: 'Eisenhower Matrix Generator' (5 min).",
          "Video: 'The Cost of Context Switching' (4 min)."
        ] 
      }
    },
    collab: {
      id: 'collab',
      label: 'Case 3: Collaboration',
      color: 'purple',
      icon: Users,
      r70: { 
        title: "Silo-Breaking Acts", 
        tasks: [
          "Shadow a colleague from a different division for 4 hours (Monthly).",
          "Co-author one project document with a cross-functional peer.",
          "Host a 'Lunch & Learn' about your department's role."
        ]
      },
      r20: { 
        title: "Squad Dynamics", 
        tasks: [
          "Weekly 'Start, Stop, Continue' retro focused on team friction.",
          "Cross-functional 'Coffee Roulette' (Random matching)."
        ]
      },
      r10: { 
        title: "Systems Thinking", 
        tasks: [
          "Simulation: 'The Silo Breaker' RPG (Gamified scenario).",
          "Video: 'Understanding the Value Chain' (3 min)."
        ] 
      }
    },
    eq: {
      id: 'eq',
      label: 'Case 4: EQ & Resilience',
      color: 'green',
      icon: Activity,
      r70: { 
        title: "Emotional Regulation", 
        tasks: [
          "Pause 5 mins before replying to 'triggering' feedback.",
          "Journal: Write down 'Fact vs Story' after a conflict.",
          "Practice 'Active Listening' summary in next 3 meetings."
        ]
      },
      r20: { 
        title: "Safe Space Rituals", 
        tasks: [
          "'Fail-Forward Friday': Share one mistake and what you learned.",
          "Mentor Session: Discuss a time you handled difficult feedback."
        ]
      },
      r10: { 
        title: "Self-Awareness", 
        tasks: [
          "Video: 'The SCARF Model: Why Feedback Hurts' (3 min).",
          "Assessment: 'Trigger Identification' Self-Test."
        ] 
      }
    }
  };

  const activeData = caseData[activeTab];

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      <SectionHeader 
        title="Execution Engine" 
        subtitle="A tactical 70:20:10 implementation roadmap. Transforming theory into daily rituals and measurable actions."
        icon={Rocket}
      />
      
      {/* Alert Note */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-8 flex items-start gap-3">
         <Info className="text-amber-600 mt-0.5" size={18}/>
         <div>
           <p className="text-sm text-amber-800 font-bold">LXP Access Note</p>
           <p className="text-xs text-amber-700">Detailed interactive prototypes are currently available for the <strong>Communication Case</strong>. Other modules follow the same 70:20:10 structure shown below.</p>
         </div>
      </div>

      {/* 1. CASE-SPECIFIC 70:20:10 MATRIX */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 p-2 flex overflow-x-auto gap-2">
          {Object.values(caseData).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === item.id ? `bg-white text-${item.color}-600 shadow-md ring-1 ring-${item.color}-100` : 'text-slate-500 hover:bg-white/50'}`}
            >
              <item.icon size={16}/> {item.label}
            </button>
          ))}
        </div>

        <div className="p-8 grid lg:grid-cols-3 gap-6">
          {/* 70% */}
          <div className="relative group">
             <div className="absolute -top-4 -left-4 text-6xl font-black text-slate-100 -z-10 group-hover:text-[#0095DA]/10 transition-colors">70</div>
             <div className={`h-full p-6 rounded-2xl border-l-4 border-[#0095DA] bg-blue-50/30 hover:bg-blue-50 transition-colors`}>
               <div className="flex justify-between items-start mb-4">
                 <div>
                   <h4 className="font-bold text-[#0095DA] text-lg">Experiential</h4>
                   <p className="text-[10px] text-slate-500 uppercase tracking-wider">Job Assignments</p>
                 </div>
                 <Briefcase size={20} className="text-[#0095DA]"/>
               </div>
               <h5 className="font-bold text-slate-900 mb-3">{activeData.r70.title}</h5>
               <ul className="space-y-2">
                 {Array.isArray(activeData.r70.tasks) ? activeData.r70.tasks.map((t, i) => (
                   <li key={i} className="flex gap-2 text-sm text-slate-600 leading-snug">
                     <CheckCircle size={14} className="text-[#0095DA] shrink-0 mt-0.5"/> {t}
                   </li>
                 )) : <p className="text-sm text-slate-600">{activeData.r70.task}</p>}
               </ul>
             </div>
          </div>

          {/* 20% */}
          <div className="relative group">
             <div className="absolute -top-4 -left-4 text-6xl font-black text-slate-100 -z-10 group-hover:text-purple-100 transition-colors">20</div>
             <div className={`h-full p-6 rounded-2xl border-l-4 border-purple-500 bg-purple-50/30 hover:bg-purple-50 transition-colors`}>
               <div className="flex justify-between items-start mb-4">
                 <div>
                   <h4 className="font-bold text-purple-600 text-lg">Social</h4>
                   <p className="text-[10px] text-slate-500 uppercase tracking-wider">Peer & Mentor Loops</p>
                 </div>
                 <Users size={20} className="text-purple-500"/>
               </div>
               <h5 className="font-bold text-slate-900 mb-3">{activeData.r20.title}</h5>
               <ul className="space-y-2">
                 {Array.isArray(activeData.r20.tasks) ? activeData.r20.tasks.map((t, i) => (
                   <li key={i} className="flex gap-2 text-sm text-slate-600 leading-snug">
                     <Users size={14} className="text-purple-500 shrink-0 mt-0.5"/> {t}
                   </li>
                 )) : <p className="text-sm text-slate-600">{activeData.r20.task}</p>}
               </ul>
             </div>
          </div>

          {/* 10% */}
          <div className="relative group">
             <div className="absolute -top-4 -left-4 text-6xl font-black text-slate-100 -z-10 group-hover:text-amber-100 transition-colors">10</div>
             <div className={`h-full p-6 rounded-2xl border-l-4 border-amber-500 bg-amber-50/30 hover:bg-amber-50 transition-colors`}>
               <div className="flex justify-between items-start mb-4">
                 <div>
                   <h4 className="font-bold text-amber-600 text-lg">Formal</h4>
                   <p className="text-[10px] text-slate-500 uppercase tracking-wider">Coursework & Content</p>
                 </div>
                 <BookOpen size={20} className="text-amber-500"/>
               </div>
               <h5 className="font-bold text-slate-900 mb-3">{activeData.r10.title}</h5>
               <ul className="space-y-2">
                 {Array.isArray(activeData.r10.tasks) ? activeData.r10.tasks.map((t, i) => (
                   <li key={i} className="flex gap-2 text-sm text-slate-600 leading-snug">
                     <PlayCircle size={14} className="text-amber-500 shrink-0 mt-0.5"/> {t}
                   </li>
                 )) : <p className="text-sm text-slate-600">{activeData.r10.task}</p>}
               </ul>
             </div>
          </div>
        </div>

        {/* NEW SECTION: THE PUSH-PULL CADENCE */}
        <div className="bg-slate-900 text-white p-6 border-t border-slate-700">
           <div className="flex items-center gap-2 mb-4">
              <RefreshCw className="text-[#0095DA]"/>
              <h4 className="font-bold text-lg">The "Push-Pull" Cadence</h4>
           </div>
           <p className="text-xs text-slate-400 mb-6 max-w-2xl">
              Execution is not a one-time event. We use <strong>Formal Training (Push)</strong> to trigger <strong>Self-Learning (Pull)</strong>.
           </p>

           <div className="flex flex-col md:flex-row items-center gap-2 text-sm">
              <div className="flex-1 w-full bg-slate-800 p-3 rounded-lg border border-slate-700 relative">
                 <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1">Week 1: The Push</div>
                 <div className="font-bold">Workshop: "Deep Work Basics"</div>
                 <div className="text-xs text-slate-500 mt-1">Instructor-Led • Sync</div>
                 <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 hidden md:block"><ArrowRight size={20} className="text-slate-600"/></div>
                 <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10 md:hidden"><ArrowRight size={20} className="text-slate-600 rotate-90"/></div>
              </div>
              
              <div className="flex-1 w-full bg-slate-800 p-3 rounded-lg border border-slate-700 relative">
                 <div className="text-[10px] font-bold text-green-400 uppercase tracking-wider mb-1">Week 2: The Pull</div>
                 <div className="font-bold">LXP: "5-min Refresher"</div>
                 <div className="text-xs text-slate-500 mt-1">On-Demand • Async</div>
                 <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 hidden md:block"><ArrowRight size={20} className="text-slate-600"/></div>
                 <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10 md:hidden"><ArrowRight size={20} className="text-slate-600 rotate-90"/></div>
              </div>

              <div className="flex-1 w-full bg-slate-800 p-3 rounded-lg border border-slate-700 relative">
                 <div className="text-[10px] font-bold text-green-400 uppercase tracking-wider mb-1">Week 3: The Pull</div>
                 <div className="font-bold">Tool: "Matrix Generator"</div>
                 <div className="text-xs text-slate-500 mt-1">Application • Async</div>
                 <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 hidden md:block"><ArrowRight size={20} className="text-slate-600"/></div>
                 <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10 md:hidden"><ArrowRight size={20} className="text-slate-600 rotate-90"/></div>
              </div>

              <div className="flex-1 w-full bg-slate-800 p-3 rounded-lg border border-slate-700">
                 <div className="text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-1">Week 4: The Loop</div>
                 <div className="font-bold">Retro: "Squad Review"</div>
                 <div className="text-xs text-slate-500 mt-1">Peer Feedback • Sync</div>
              </div>
           </div>
        </div>
      </div>

      {/* 2. SUSTAINABLE RITUAL MAP */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Calendar className="text-[#0095DA]"/> The "Digital Athlete" Rhythm (Sustainable Pace)
        </h3>
        <div className="relative bg-white rounded-3xl border border-slate-200 shadow-sm p-8 overflow-hidden">
           {/* Timeline Line */}
           <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-0 -translate-y-1/2 hidden md:block"></div>

           <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
             {/* Monday */}
             <div className="flex flex-col items-center text-center group">
                 <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-4 border-4 border-white shadow-sm group-hover:scale-110 transition-transform">
                   <Sunrise size={20}/>
                 </div>
                 <div className="text-xs font-bold text-slate-400 mb-1">MONDAY</div>
                 <h4 className="font-bold text-slate-800 text-sm">Kickoff & Planning</h4>
                 <Badge color="amber" size="xs">Comm (Case 1)</Badge>
                 <p className="text-[10px] text-slate-500 mt-2">Team Huddle using 3C Framework. Set weekly goals.</p>
             </div>

             {/* Tuesday */}
             <div className="flex flex-col items-center text-center group">
                 <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4 border-4 border-white shadow-sm group-hover:scale-110 transition-transform">
                   <Zap size={20}/>
                 </div>
                 <div className="text-xs font-bold text-slate-400 mb-1">TUESDAY</div>
                 <h4 className="font-bold text-slate-800 text-sm">Deep Work Block</h4>
                 <Badge color="red" size="xs">Prod (Case 2)</Badge>
                 <p className="text-[10px] text-slate-500 mt-2">90m Notification-free sprint. Focus on complex tasks.</p>
             </div>

             {/* Wednesday */}
             <div className="flex flex-col items-center text-center group">
                 <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-4 border-4 border-white shadow-sm group-hover:scale-110 transition-transform">
                   <Users size={20}/>
                 </div>
                 <div className="text-xs font-bold text-slate-400 mb-1">WEDNESDAY</div>
                 <h4 className="font-bold text-slate-800 text-sm">Squad Sync</h4>
                 <Badge color="purple" size="xs">Collab (Case 3)</Badge>
                 <p className="text-[10px] text-slate-500 mt-2">Cross-functional problem solving lunch or meeting.</p>
             </div>

             {/* Thursday */}
             <div className="flex flex-col items-center text-center group">
                 <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4 border-4 border-white shadow-sm group-hover:scale-110 transition-transform">
                   <Smartphone size={20}/>
                 </div>
                 <div className="text-xs font-bold text-slate-400 mb-1">THURSDAY</div>
                 <h4 className="font-bold text-slate-800 text-sm">Micro-Upskill</h4>
                 <Badge color="blue" size="xs">Formal (10%)</Badge>
                 <p className="text-[10px] text-slate-500 mt-2">5-10m Mobile module learning or reading.</p>
             </div>

             {/* Friday */}
             <div className="flex flex-col items-center text-center group">
                 <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4 border-4 border-white shadow-sm group-hover:scale-110 transition-transform">
                   <Sunset size={20}/>
                 </div>
                 <div className="text-xs font-bold text-slate-400 mb-1">FRIDAY</div>
                 <h4 className="font-bold text-slate-800 text-sm">Fail-Forward Retro</h4>
                 <Badge color="green" size="xs">EQ (Case 4)</Badge>
                 <p className="text-[10px] text-slate-500 mt-2">Team reflection. Sharing mistakes safely.</p>
             </div>
           </div>
           
           <div className="mt-8 text-center border-t border-slate-100 pt-4">
             <div className="inline-flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full text-xs font-bold text-slate-500 border border-slate-200">
               <Calendar size={12}/> Monthly Ritual: "Shadowing Day" (Cross-Division Exchange)
             </div>
           </div>
        </div>
      </div>

      {/* 3. 90-DAY ROADMAP (KOTTER) */}
      <div className="mt-12 grid lg:grid-cols-2 gap-8">
        
        {/* Left: Roadmap Steps */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Map className="text-[#0095DA]"/> 90-Day Rollout Strategy (Kotter)
          </h3>
          
          <div className="relative pl-8 border-l-2 border-slate-200 space-y-8">
             {/* Phase 1 */}
             <div className="relative">
               <div className="absolute -left-[41px] top-0 w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-xs">M1</div>
               <h4 className="font-bold text-slate-900">Phase 1: Urgency & Pilot (Weeks 1-4)</h4>
               <p className="text-xs text-slate-500 mb-2 max-w-sm">
                 <strong>Goal:</strong> Create the "Guiding Coalition". Identify Gen Z influencers and early adopters to validate content relevance.
               </p>
               <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm space-y-2">
                 <div className="flex justify-between text-xs">
                   <span className="text-slate-600"><strong>Deliverable:</strong> 5 "Hero" Modules (Comm & Prod focus)</span>
                   <span className="text-green-600 font-bold">Done</span>
                 </div>
                 <div className="flex justify-between text-xs">
                   <span className="text-slate-600"><strong>Metric:</strong> 80% Pilot Group Adoption / NPS {'>'} 9</span>
                   <span className="text-slate-400">Pending</span>
                 </div>
               </div>
             </div>

             {/* Phase 2 */}
             <div className="relative">
               <div className="absolute -left-[41px] top-0 w-8 h-8 bg-[#0095DA] rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-blue-200">M2</div>
               <h4 className="font-bold text-[#0095DA]">Phase 2: Broad Launch & Wins (Weeks 5-8)</h4>
               <p className="text-xs text-slate-500 mb-2 max-w-sm">
                 <strong>Goal:</strong> Generate Short-term Wins. Launch LXP to all Gen Z staff with a gamified campaign to drive initial engagement.
               </p>
               <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 shadow-sm space-y-2">
                 <div className="flex justify-between text-xs">
                   <span className="text-slate-600"><strong>Deliverable:</strong> Full LXP Access & Leaderboards</span>
                   <span className="text-slate-400">Pending</span>
                 </div>
                 <div className="flex justify-between text-xs">
                   <span className="text-slate-600"><strong>Metric:</strong> 50% Active Weekly Users (WAU)</span>
                   <span className="text-slate-400">Pending</span>
                 </div>
               </div>
             </div>

             {/* Phase 3 */}
             <div className="relative">
               <div className="absolute -left-[41px] top-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs">M3</div>
               <h4 className="font-bold text-slate-900">Phase 3: Scale & Sustain (Weeks 9-12)</h4>
               <p className="text-xs text-slate-500 mb-2 max-w-sm">
                 <strong>Goal:</strong> Anchor in Culture. Shift focus from "Content Consumption" to "Behavior Change" via Manager support.
               </p>
               <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm space-y-2">
                 <div className="flex justify-between text-xs">
                   <span className="text-slate-600"><strong>Deliverable:</strong> Manager Coaching Playbooks</span>
                   <span className="text-slate-400">Pending</span>
                 </div>
                 <div className="flex justify-between text-xs">
                   <span className="text-slate-600"><strong>Metric:</strong> -10% Error Rate & +15% CSAT</span>
                   <span className="text-slate-400">Pending</span>
                 </div>
               </div>
             </div>
          </div>
        </div>

        {/* Right: Manager's Toolkit */}
        <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col justify-between">
           <div>
             <div className="flex items-center gap-3 mb-6">
               <div className="p-2 bg-[#0095DA] rounded-lg"><UserCheck size={24}/></div>
               <h3 className="font-bold text-xl">The Manager's Role</h3>
             </div>
             <p className="text-sm text-slate-400 mb-6 leading-relaxed">
               Execution fails without manager buy-in. We provide specific tools to help managers support the 70:20:10 model.
             </p>

             <div className="space-y-4">
               <div className="bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-colors">
                 <h4 className="font-bold text-sm text-[#0095DA] mb-1">Weekly 1:1 Protocol</h4>
                 <p className="text-xs text-slate-300">
                   Shift focus from "Status Update" to "Barrier Removal". <br/>
                   <em>"What distracted you this week?" (Case 2 Check)</em>
                 </p>
               </div>
               
               <div className="bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-colors">
                 <h4 className="font-bold text-sm text-amber-400 mb-1">"Context" Card Deck</h4>
                 <p className="text-xs text-slate-300">
                   Physical cards for managers to explain the "Why" behind tasks, reducing ambiguity (Case 1 Fix).
                 </p>
               </div>

               <div className="bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-colors">
                 <h4 className="font-bold text-sm text-green-400 mb-1">Psych Safety Pulse</h4>
                 <p className="text-xs text-slate-300">
                   Anonymous 2-question weekly survey: "Did you feel safe to speak up today?" (Case 4 Monitor).
                 </p>
               </div>
             </div>
           </div>
           
           <div className="mt-8 pt-6 border-t border-white/10">
             <div className="flex items-center gap-2 text-xs text-slate-400">
               <Info size={14}/>
               <span>Managers receive <strong>"Train-the-Trainer"</strong> certification in Week 3.</span>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

// 5. IMPACT & ROI
const ImpactView = () => {
  const [activeMode, setActiveMode] = useState('strategy'); // 'strategy' or 'simulator'
  
  // ROI Simulator State
  const [employees, setEmployees] = useState(500);
  const [efficiency, setEfficiency] = useState(15); 
  const [turnoverRed, setTurnoverRed] = useState(10); 
  const [programCost, setProgramCost] = useState(500); // in millions
  
  // Calculations
  const avgSalary = 8; // in millions
  const annualPayroll = employees * avgSalary * 12; // millions
  
  // Benefits
  const efficiencyBenefit = annualPayroll * (efficiency / 100);
  const hiringCostPerHead = avgSalary * 3; // 3 months salary
  const retainedEmployees = employees * (turnoverRed / 100);
  const turnoverBenefit = retainedEmployees * hiringCostPerHead;
  const totalBenefit = efficiencyBenefit + turnoverBenefit;
  const netBenefit = totalBenefit - programCost;
  const roi = (netBenefit / programCost) * 100;
  const paybackMonths = (programCost / (totalBenefit / 12));

  // Chart Data
  const chartData = [
    { name: 'Investment', value: programCost, fill: '#334155' }, // Slate-700
    { name: 'Return', value: totalBenefit, fill: '#10b981' } // Green-500
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      <SectionHeader 
        title="Impact & ROI Methodology" 
        subtitle="Evaluating success beyond 'Attendance'. Using the Phillips ROI Methodology to measure business impact and financial return."
        icon={TrendingUp}
      />

      {/* Mode Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-slate-100 p-1 rounded-xl flex gap-1">
          <button 
            onClick={() => setActiveMode('strategy')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeMode === 'strategy' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Strategic Measurement
          </button>
          <button 
            onClick={() => setActiveMode('simulator')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeMode === 'simulator' ? 'bg-[#0095DA] text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Financial Simulator
          </button>
        </div>
      </div>

      {activeMode === 'strategy' ? (
        <div className="space-y-8 animate-fadeIn">
          {/* Phillips ROI Timeline */}
          <Card>
            <h3 className="font-bold text-lg text-slate-800 mb-6 flex items-center gap-2"><BarChart4 className="text-blue-500"/> The Phillips ROI Implementation Map</h3>
            <div className="relative">
               {/* Line */}
               <div className="absolute top-12 left-0 w-full h-1 bg-slate-100 -z-0"></div>
               
               <div className="grid grid-cols-5 gap-2 text-center">
                 {[
                   { lvl: 1, title: "Reaction", time: "Day 1", tool: "eNPS & Smile Sheets", metric: "Satisfaction > 4.5/5" },
                   { lvl: 2, title: "Learning", time: "Week 2", tool: "Pre/Post Tests", metric: "Knowledge Delta > 25%" },
                   { lvl: 3, title: "Behavior", time: "Month 1-3", tool: "360 Feedback", metric: "Mgr Observation Score" },
                   { lvl: 4, title: "Impact", time: "Month 3-6", tool: "Biz Metrics", metric: "SLA, Error Rate" },
                   { lvl: 5, title: "ROI", time: "Month 12", tool: "Cost-Benefit Analysis", metric: "Financial Return %" }
                 ].map((step, i) => (
                   <div key={i} className="relative z-10 group">
                     <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center font-bold text-xs mb-3 border-4 border-white shadow-sm ${i > 2 ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-500'}`}>{step.lvl}</div>
                     <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm hover:border-blue-400 transition-colors h-32 flex flex-col justify-between">
                       <div>
                         <div className="text-xs font-bold text-slate-800">{step.title}</div>
                         <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">{step.time}</div>
                       </div>
                       <div className="text-[9px] text-left space-y-1">
                         <div className="flex items-center gap-1 text-slate-600"><Settings size={8}/> {step.tool}</div>
                         <div className="flex items-center gap-1 text-blue-600 font-bold"><Target size={8}/> {step.metric}</div>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </Card>

          {/* Instrument Detail */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Settings size={18}/> Measurement Instruments</h4>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="p-2 bg-amber-50 text-amber-600 rounded-lg h-fit"><MessageCircle size={16}/></div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-700">Communication (Case 1)</h5>
                    <p className="text-xs text-slate-500">"Message Clarity Index" via random email audits by managers.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="p-2 bg-red-50 text-red-600 rounded-lg h-fit"><Zap size={16}/></div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-700">Productivity (Case 2)</h5>
                    <p className="text-xs text-slate-500">Jira/Asana "Velocity Trends" & "Rework Rate" analysis.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Activity size={18}/> Behavior Tracking</h4>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-lg h-fit"><Users size={16}/></div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-700">Collaboration (Case 3)</h5>
                    <p className="text-xs text-slate-500">"Cross-Functional Project Count" tracking in quarterly reports.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="p-2 bg-green-50 text-green-600 rounded-lg h-fit"><Award size={16}/></div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-700">EQ & Turnover (Case 4)</h5>
                    <p className="text-xs text-slate-500">Monthly "Psychological Safety Pulse" survey & Voluntary Turnover Rate.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-12 gap-8 animate-fadeIn">
          {/* Simulator Inputs */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-lg">
             <div className="flex items-center gap-2 mb-6 text-slate-800">
               <Settings size={20}/>
               <h3 className="font-bold">Input Variables</h3>
             </div>
             
             <div className="space-y-6">
               <div>
                 <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">Gen Z Headcount</div>
                 <div className="flex items-center gap-2">
                    <input type="range" min="100" max="1000" step="50" value={employees} onChange={(e) => setEmployees(Number(e.target.value))} className="flex-1"/>
                    <span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold w-12 text-center">{employees}</span>
                 </div>
               </div>
               
               <div>
                 <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">Avg Salary (Juta/Mo)</div>
                 <div className="flex items-center gap-2">
                    <input type="range" min="5" max="20" step="1" value={avgSalary} readOnly className="flex-1 opacity-50 cursor-not-allowed"/> 
                    <span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold w-12 text-center">{avgSalary}</span>
                 </div>
                 <p className="text-[10px] text-slate-400 mt-1">*Fixed base for simulation</p>
               </div>

               <div className="pt-4 border-t border-slate-100">
                 <div className="flex justify-between text-xs font-bold text-green-600 mb-2">Efficiency Gain %</div>
                 <div className="flex items-center gap-2">
                    <input type="range" min="5" max="30" step="1" value={efficiency} onChange={(e) => setEfficiency(Number(e.target.value))} className="flex-1"/>
                    <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-bold w-12 text-center">{efficiency}%</span>
                 </div>
               </div>

               <div>
                 <div className="flex justify-between text-xs font-bold text-blue-600 mb-2">Turnover Reduction %</div>
                 <div className="flex items-center gap-2">
                    <input type="range" min="5" max="25" step="1" value={turnoverRed} onChange={(e) => setTurnoverRed(Number(e.target.value))} className="flex-1"/>
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold w-12 text-center">{turnoverRed}%</span>
                 </div>
               </div>
               
               <div className="pt-4 border-t border-slate-100">
                 <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">Program Cost (Juta)</div>
                 <div className="flex items-center gap-2">
                    <input type="range" min="100" max="1000" step="50" value={programCost} onChange={(e) => setProgramCost(Number(e.target.value))} className="flex-1"/>
                    <span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold w-16 text-center">{programCost}</span>
                 </div>
               </div>
             </div>
          </div>

          {/* Simulator Output */}
          <div className="lg:col-span-8 space-y-6">
             {/* Key Metrics */}
             <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                   <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Net Benefit (Annual)</div>
                   <div className="text-2xl font-black text-green-600">{formatIDR(netBenefit)}M</div>
                   <div className="text-[10px] text-slate-400 mt-1">Total Value - Cost</div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                   <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">ROI Percentage</div>
                   <div className="text-2xl font-black text-[#0095DA]">{roi.toFixed(0)}%</div>
                   <div className="text-[10px] text-slate-400 mt-1">Return on Investment</div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                   <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Payback Period</div>
                   <div className="text-2xl font-black text-purple-600">{paybackMonths.toFixed(1)} Months</div>
                   <div className="text-[10px] text-slate-400 mt-1">Time to break even</div>
                </div>
             </div>

             {/* Visualization - Fixed Chart */}
             <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl">
               <div className="flex justify-between items-center mb-6">
                 <h4 className="font-bold flex items-center gap-2"><Coins size={20}/> 1-Year Value Projection</h4>
                 <Badge color="dark">CFO View</Badge>
               </div>
               
               <div className="h-64 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <ReBarChart data={chartData} layout="vertical" margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#475569" horizontal={false}/>
                      <XAxis type="number" tick={{fill: '#94a3b8', fontSize: 10}} stroke="#475569"/>
                      <YAxis dataKey="name" type="category" tick={{fill: '#fff', fontSize: 12, fontWeight: 'bold'}} stroke="#475569" width={80}/>
                      <Tooltip 
                        cursor={{fill: 'rgba(255,255,255,0.05)'}}
                        contentStyle={{backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff'}}
                        formatter={(value) => [`${formatIDR(value)}M`, 'Amount']}
                      />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                   </ReBarChart>
                 </ResponsiveContainer>
               </div>
               
               <div className="flex justify-between text-xs text-slate-400 mt-4 border-t border-white/10 pt-4">
                 <p>Investment: <span className="text-white font-bold">{formatIDR(programCost)}M</span></p>
                 <p>Gross Return: <span className="text-green-400 font-bold">{formatIDR(totalBenefit)}M</span></p>
               </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- MAIN LAYOUT ---

const Page1 = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll Progress Listener
  useEffect(() => {
    const handleScroll = (e) => {
      const totalScroll = e.target.scrollTop;
      const windowHeight = e.target.scrollHeight - e.target.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    }
    const main = document.getElementById('main-content');
    if(main) main.addEventListener('scroll', handleScroll);
    return () => main && main.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const NavItem = ({ id, icon: Icon, label }) => (
    <button 
      onClick={() => { setCurrentView(id); setIsMenuOpen(false); }}
      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 font-medium group ${currentView === id ? 'bg-[#0095DA] text-white shadow-lg shadow-blue-200' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
    >
      <Icon size={20} className={`transition-transform group-hover:scale-110 ${currentView === id ? 'text-white' : 'text-slate-400 group-hover:text-[#0095DA]'}`} />
      <span>{label}</span>
      {currentView === id && <ChevronRight size={16} className="ml-auto opacity-80"/>}
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 font-sans text-slate-800">
      <GlobalStyles />

      {/* Mobile Header */}
      <div className="md:hidden bg-white/80 backdrop-blur-md p-4 flex justify-between items-center border-b border-slate-200 sticky top-0 z-50">
        <div className="flex items-center gap-2">
           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Blibli_%282023%29.svg/2560px-Blibli_%282023%29.svg.png" alt="Blibli Logo" className="h-6"/>
        </div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600"><Menu/></button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-white border-r border-slate-200 p-6 flex flex-col z-40 transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} shadow-2xl md:shadow-none`}>
        <div className="mb-10 px-2 flex flex-col items-start gap-3">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Blibli_%282023%29.svg/2560px-Blibli_%282023%29.svg.png" alt="Blibli Logo" className="h-8 mb-1"/>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">B-READY Academy</div>
          {isMenuOpen && <button onClick={() => setIsMenuOpen(false)} className="ml-auto md:hidden"><X size={20}/></button>}
        </div>

        <nav className="space-y-1.5 flex-1 overflow-y-auto pr-2">
          <div className="px-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">Strategic Overview</div>
          <NavItem id="dashboard" icon={Home} label="Executive Dashboard" />
          
          <div className="pt-8 px-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">Deep Dive Modules</div>
          <NavItem id="diagnosis" icon={Microscope} label="Diagnosis & Theory" />
          <NavItem id="solution" icon={Brain} label="Solution Architecture" />
          <NavItem id="execution" icon={Rocket} label="Execution Roadmap" />
          <NavItem id="impact" icon={TrendingUp} label="Impact & ROI" />
        </nav>

        <div className="pt-6 border-t border-slate-100">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 border border-slate-200 shadow-sm"><User size={20}/></div>
            <div>
              <div className="text-sm font-bold text-slate-700">Ilham</div>
              <div className="text-xs text-slate-400 font-medium">Content Dev Sr. Officer</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 relative overflow-y-auto scroll-smooth h-screen">
        {/* Scroll Progress Bar */}
        <div className="sticky top-0 left-0 w-full h-1 bg-slate-200 z-50">
          <div className="h-full bg-[#0095DA] transition-all duration-100 ease-out" style={{ width: `${scrollProgress * 100}%` }}></div>
        </div>
        
        <div className="p-6 md:p-10 max-w-6xl mx-auto">
          {currentView === 'dashboard' && <Dashboard navigate={setCurrentView} />}
          {currentView === 'diagnosis' && <DiagnosisView />}
          {currentView === 'solution' && <SolutionView />}
          {currentView === 'execution' && <ExecutionView />}
          {currentView === 'impact' && <ImpactView />}
        </div>
      </main>
    </div>
  );
};

export default Page1;