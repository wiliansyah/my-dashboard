import React, { useState, useEffect, useRef } from 'react';

import {

  BookOpen, Users, Target, TrendingUp, Award, MessageCircle,

  CheckCircle, Play, Brain, Zap, ArrowRight, ChevronRight,

  Star, Menu, Home, LogOut, Bell, X, Check, AlertCircle,

  PlayCircle, Lock, RefreshCw, MousePointer, ChevronLeft,

  Lightbulb, Search, MessageSquare, Video, Mic, Headphones,

  FileText, Download, Share2, AlertTriangle, UserCheck,

  ThumbsUp, Calendar, Briefcase, ExternalLink, Clock,

  BarChart2, Send, Plus, Trash2, Camera, MicOff, Sun,

  MoreHorizontal, Edit2, Save, Gauge, LayoutTemplate,

  Loader, ChevronDown, ChevronUp

} from 'lucide-react';

import {

  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie

} from 'recharts';



// --- 1. GLOBAL STYLES ---

const GlobalStyles = () => (

  <style>{`

    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

   

    body { font-family: 'Inter', sans-serif; background-color: #f8fafc; color: #334155; }

   

    @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }

    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

    @keyframes pop { 0% { transform: scale(0.9); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }

    @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }

    @keyframes slideUpFade { from { opacity: 0; transform: translate(-50%, 20px); } to { opacity: 1; transform: translate(-50%, 0); } }

    @keyframes dash { from { stroke-dashoffset: 283; } to { stroke-dashoffset: 0; } }



    .animate-slideIn { animation: slideIn 0.4s ease-out forwards; }

    .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }

    .animate-pop { animation: pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }

    .animate-shake { animation: shake 0.4s ease-in-out; }

    .animate-toast { animation: slideUpFade 0.3s ease-out forwards; }

   

    .circular-chart { display: block; margin: 0 auto; max-width: 100%; max-height: 250px; }

    .circle-bg { fill: none; stroke: #e2e8f0; stroke-width: 2.5; }

    .circle { fill: none; stroke-width: 2.5; stroke-linecap: round; animation: progress 1s ease-out forwards; }

    @keyframes progress { 0% { stroke-dasharray: 0 100; } }



    .btn-primary {

      background: #0095DA;

      color: white;

      transition: all 0.2s;

    }

    .btn-primary:hover {

      background: #0077ae;

      transform: translateY(-1px);

      box-shadow: 0 4px 12px rgba(0, 149, 218, 0.2);

    }

   

    .nav-item-active {

      background: linear-gradient(135deg, #0095DA 0%, #0077ae 100%);

      color: white;

      box-shadow: 0 4px 12px rgba(0, 149, 218, 0.3);

    }



    input:focus, textarea:focus {

      outline: none;

      border-color: #0095DA;

      ring: 2px solid #0095DA;

    }



    /* Custom Scrollbar */

    ::-webkit-scrollbar { width: 6px; }

    ::-webkit-scrollbar-track { background: transparent; }

    ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }

    ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

  `}</style>

);



// --- 2. DATA CONSTANTS ---



const BLIBLI_LOGO = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY7Roibcc_c1cdJkazW6VIByMtKqPagq44Jg&s";



const INITIAL_WEEKLY_TASKS = [

  { id: 1, title: "Apply PREP in 1 Meeting", xp: 50, done: false },

  { id: 2, title: "Give 3C Feedback to Peer", xp: 50, done: false },

  { id: 3, title: "No-Slang Email Day", xp: 100, done: false }

];



const INITIAL_USER_DATA = {

  name: "Budi",

  role: "Content Specialist",

  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi",

  level: 4,

  xp: 1450,

  streak: 12,

  checkedIn: false,

  badges: ["Strategic Thinker", "Onboarding Hero"],

  completedModules: [],

  capstoneStatus: 'inactive',

  capstoneData: null,

  preTestScore: 0,

  postTestScore: 0,

  satisfaction: null,

  weeklyTasks: INITIAL_WEEKLY_TASKS,

  kpis: [

    { id: 1, metric: "Meeting Duration (Avg)", current: 60, target: 45, unit: "mins" },

    { id: 2, metric: "Email Revisions / Doc", current: 3, target: 0, unit: "rounds" }

  ]

};



const INITIAL_POSTS = [

  {

    id: 1,

    user: "Sarah J.",

    role: "Product",

    content: "Just used the PREP framework for my budget approval. Approved in 5 mins! 🚀",

    likes: 12,

    likedByMe: false,

    time: "2h ago",

    commentsList: [

      { id: 101, user: "Budi", text: "That's awesome Sarah! Which part of PREP helped most?" },

      { id: 102, user: "Sarah J.", text: "Definitely the 'Evidence' part. The data chart sealed it." }

    ]

  },

  {

    id: 2,

    user: "Dimas R.",

    role: "Marketing",

    content: "Anyone want to practice their 'Digital Handshake' check before the Townhall?",

    likes: 8,

    likedByMe: false,

    time: "4h ago",

    commentsList: []

  },

  {

    id: 3,

    user: "System",

    role: "B-Ready Bot",

    content: "New Challenge: 'The No-Emoji Tuesday'. Can you survive?",

    likes: 45,

    likedByMe: true,

    time: "1d ago",

    commentsList: []

  }

];



const COURSE_META = {

  id: "c1",

  title: "Strategic Communication: From 'Chat' to 'Impact'",

  description: "Master clarity, confidence, and context to elevate your career.",

  totalXp: 2000,

  duration: "3 Weeks (Self-Paced)",

};



const LOCKED_COURSES = [

  { id: "c2", title: "Productivity: Deep Work", description: "Master the Eisenhower Matrix.", duration: "2 Weeks", modules: 4, color: "red" },

  { id: "c3", title: "Leadership: Emotional Intelligence", description: "Understand yourself to lead others.", duration: "4 Weeks", modules: 6, color: "purple" }

];



const MODULES_LIST = [

  { id: "m0", title: "Baseline: Pre-Test Assessment", type: "pre_test", duration: "5:00", category: "Evaluation", desc: "Kirkpatrick L2: Establish your baseline.", xp: 50 },

  { id: "m1", title: "The Art of Communication", type: "video", duration: "13:00", category: "10% Formal", desc: "Why clarity beats charisma.", xp: 100 },

  { id: "m2", title: "Framework: The Executive Pitch (PREP)", type: "theory", duration: "15:00", category: "10% Formal", desc: "Structure ideas for leaders.", xp: 150 },

  { id: "m3", title: "Ritual: The 'Digital Handshake'", type: "checklist", duration: "8:00", category: "70% Practice", desc: "Virtual meeting preparation.", xp: 50 },

  { id: "m4", title: "Lab: Crisis Communication Sim", type: "simulation", duration: "15:00", category: "70% Practice", desc: "Reporting issues under pressure.", xp: 200 },

  { id: "m5", title: "Squad: Peer Review Challenge", type: "peer_review", duration: "10:00", category: "20% Social", desc: "Critique and grade a colleague's draft.", xp: 150 },

  { id: "m6", title: "Certification: Situational Judgement", type: "quiz", duration: "10:00", category: "Evaluation", desc: "Kirkpatrick L2: Final Knowledge Validation.", xp: 300 },

  { id: "m7", title: "Capstone: 90-Day Transformation", type: "capstone", duration: "3 Months", category: "70% Real Work", desc: "Apply PREP to 3 major stakeholder meetings.", xp: 500 },

];



const MENTORS = [

  { id: 1, name: "Siska (VP Ops)", role: "Expert in Stakeholder Mgmt", availability: "Tue/Thu", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siska" },

  { id: 2, name: "Andi (Head of Prod)", role: "Expert in Concise Pitching", availability: "Fri AM", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andi" },

];



const PREP_CARDS = [

  { id: 'p1', step: 'P', title: 'POINT', desc: 'Start with the bottom line.', example: 'Recommend postponing launch by 24h.' },

  { id: 'r', step: 'R', title: 'REASON', desc: 'Explain "Why" concisely.', example: 'Critical bug found in payment gateway.' },

  { id: 'e', step: 'E', title: 'EVIDENCE', desc: 'Provide data.', example: '15% transaction failure rate in staging.' },

  { id: 'p2', step: 'P', title: 'POINT', desc: 'Restate proposal.', example: 'Delay ensures smooth user experience.' }

];



const MOCK_PEER_DRAFT = {

  author: "Rina (Junior Assoc)",

  subject: "campaign stuff",

  body: "Hi all, the influencers are asking for more money idk what to do?? Budget is tight. Help."

};



// --- 3. HELPER COMPONENTS ---



const LevelBar = ({ xp, level }) => {

  const nextLevelXp = (level + 1) * 500;

  const progress = ((xp % 500) / 500) * 100;

 

  return (

    <div className="w-full">

      <div className="flex justify-between text-xs mb-1">

        <span className="font-bold text-[#0095DA]">Lvl {level}</span>

        <span className="text-slate-400">{xp} / {nextLevelXp} XP</span>

      </div>

      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">

        <div className="h-full bg-gradient-to-r from-[#0095DA] to-cyan-400 transition-all duration-1000" style={{ width: `${Math.min(progress, 100)}%` }}></div>

      </div>

    </div>

  );

};



const CircularProgress = ({ percentage }) => {

  const radius = 30;

  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset = circumference - (percentage / 100) * circumference;



  return (

    <div className="relative w-24 h-24 flex items-center justify-center">

      <svg className="w-full h-full transform -rotate-90">

        <circle className="text-slate-100" strokeWidth="6" stroke="currentColor" fill="transparent" r={radius} cx="48" cy="48" />

        <circle className="text-[#0095DA] transition-all duration-1000 ease-out" strokeWidth="6" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" stroke="currentColor" fill="transparent" r={radius} cx="48" cy="48" />

      </svg>

      <div className="absolute flex flex-col items-center">

        <span className="text-xl font-bold text-slate-800">{percentage}%</span>

        <span className="text-[9px] text-slate-400 uppercase font-bold">Complete</span>

      </div>

    </div>

  );

};



const StreakDisplay = ({ days }) => (

  <div className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-bold border border-red-100 shadow-sm">

    <Zap size={14} fill="#dc2626" className="animate-pulse" />

    <span>{days} Day Streak</span>

  </div>

);



// --- 4. MODULE COMPONENTS (Interactive) ---



// MODULE 0: PRE-TEST

const PreTestLesson = ({ onComplete, updateUser }) => {

  const [score, setScore] = useState(0);

  const [submitted, setSubmitted] = useState(false);

  const [answers, setAnswers] = useState({});



  const questions = [

    { id: 1, q: "What does PREP stand for?", options: ["Point, Reason, Example, Point", "Plan, Review, Execute, Publish"], correct: 0 },

    { id: 2, q: "What is the 7-38-55 rule about?", options: ["Time Management", "Non-Verbal Communication"], correct: 1 },

    { id: 3, q: "High Context communication relies heavily on:", options: ["Explicit Words", "Implicit Understanding"], correct: 1 }

  ];



  const handleSubmit = () => {

    let s = 0;

    questions.forEach((q, i) => { if (answers[i] === q.correct) s++; });

    const finalScore = Math.round((s / questions.length) * 100);

    setScore(finalScore);

    setSubmitted(true);

    updateUser({ preTestScore: finalScore });

  };



  return (

    <div className="max-w-2xl mx-auto animate-fadeIn">

      <div className="text-center mb-8">

        <div className="inline-block p-3 bg-purple-100 text-purple-700 rounded-full mb-3"><BarChart2 size={24}/></div>

        <h2 className="text-2xl font-bold text-slate-800">Baseline Assessment</h2>

        <p className="text-slate-500">Let's check your starting knowledge (Kirkpatrick Level 2).</p>

      </div>

      {!submitted ? (

        <div className="space-y-6">

          {questions.map((q, i) => (

            <div key={q.id} className="bg-white p-5 rounded-xl border border-slate-200">

              <p className="font-bold text-slate-800 mb-3">{q.q}</p>

              <div className="space-y-2">

                {q.options.map((opt, optIdx) => (

                  <button key={optIdx} onClick={() => setAnswers({...answers, [i]: optIdx})} className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${answers[i] === optIdx ? 'bg-[#0095DA] text-white border-[#0095DA]' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}>{opt}</button>

                ))}

              </div>

            </div>

          ))}

          <button onClick={handleSubmit} disabled={Object.keys(answers).length < questions.length} className="btn-primary w-full py-3 rounded-xl font-bold">Submit Baseline</button>

        </div>

      ) : (

        <div className="text-center animate-pop">

          <h3 className="text-xl font-bold text-slate-800 mb-2">Baseline Recorded: {score}%</h3>

          <p className="text-slate-500 mb-6">Don't worry if it's low. That's why you're here!</p>

          <button onClick={onComplete} className="btn-primary px-8 py-3 rounded-xl font-bold">Start Learning</button>

        </div>

      )}

    </div>

  );

};



// MODULE 1: VIDEO

const VideoLesson = ({ onComplete }) => {

  const [videoError, setVideoError] = useState(false);

  const [quizAnswers, setQuizAnswers] = useState({ q1: null, q2: null });

  const [feedback, setFeedback] = useState(null);



  const checkAnswers = () => {

    if (quizAnswers.q1 === 'a' && quizAnswers.q2 === 'b') setFeedback('correct');

    else setFeedback('incorrect');

  };



  return (

    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">

      <div className="flex gap-6 flex-col md:flex-row">

        <div className="flex-1 space-y-4">

          <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl relative group">

            <div className="aspect-video w-full relative">

              <iframe

                width="100%" height="100%"

                src="https://www.youtube.com/embed/lg48Bi9DA54?modestbranding=1&rel=0"

                title="Communication Skills Video"

                frameBorder="0" allowFullScreen

                onError={() => setVideoError(true)}

                className="w-full h-full"

              ></iframe>

              <div className="absolute top-4 right-4 z-20">

                 <a href="https://www.youtube.com/watch?v=lg48Bi9DA54" target="_blank" rel="noreferrer" className="text-xs text-white bg-black/60 hover:bg-[#0095DA] px-3 py-1.5 rounded-lg backdrop-blur-sm flex items-center gap-2 transition-colors">

                   Video issue? Watch on YouTube <ExternalLink size={12}/>

                 </a>

              </div>

            </div>

          </div>

         

          <div className="bg-white p-6 rounded-2xl border border-slate-200">

            <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2 mb-4"><Headphones size={20} className="text-[#0095DA]"/> Listening Check</h4>

            <div className="space-y-4">

              <div>

                <p className="text-sm font-bold text-slate-700 mb-2">1. The 7-38-55 rule says most impact comes from:</p>

                <div className="space-y-2">

                  <button onClick={() => { setQuizAnswers({...quizAnswers, q1: 'a'}); setFeedback(null); }} className={`w-full text-left p-3 rounded-lg text-sm border transition-all ${quizAnswers.q1 === 'a' ? 'bg-[#0095DA] text-white' : 'bg-slate-50'}`}>A. Body Language (55%)</button>

                  <button onClick={() => { setQuizAnswers({...quizAnswers, q1: 'b'}); setFeedback(null); }} className={`w-full text-left p-3 rounded-lg text-sm border transition-all ${quizAnswers.q1 === 'b' ? 'bg-[#0095DA] text-white' : 'bg-slate-50'}`}>B. Words (7%)</button>

                </div>

              </div>

              <div>

                <p className="text-sm font-bold text-slate-700 mb-2">2. Brevity signals:</p>

                <div className="space-y-2">

                  <button onClick={() => { setQuizAnswers({...quizAnswers, q2: 'a'}); setFeedback(null); }} className={`w-full text-left p-3 rounded-lg text-sm border transition-all ${quizAnswers.q2 === 'a' ? 'bg-[#0095DA] text-white' : 'bg-slate-50'}`}>A. Unpreparedness</button>

                  <button onClick={() => { setQuizAnswers({...quizAnswers, q2: 'b'}); setFeedback(null); }} className={`w-full text-left p-3 rounded-lg text-sm border transition-all ${quizAnswers.q2 === 'b' ? 'bg-[#0095DA] text-white' : 'bg-slate-50'}`}>B. Confidence</button>

                </div>

              </div>

            </div>

           

            {feedback === 'incorrect' && <div className="mt-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm flex items-center gap-2 animate-shake"><AlertTriangle size={16}/> Incorrect. Hint: Non-verbal communication is dominant (93%).</div>}

            {feedback === 'correct' && <div className="mt-4 p-3 bg-green-50 text-green-600 border border-green-200 rounded-xl text-sm flex items-center gap-2 animate-slideIn"><CheckCircle size={16}/> Correct! You nailed the key concepts.</div>}



            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">

              {feedback !== 'correct' ? (

                <button onClick={checkAnswers} disabled={!quizAnswers.q1 || !quizAnswers.q2} className="px-6 py-2 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-700 disabled:opacity-50">Verify Answers</button>

              ) : (

                <button onClick={onComplete} className="btn-primary px-8 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 animate-pop">Complete Module <CheckCircle size={18}/></button>

              )}

            </div>

          </div>

        </div>



        <div className="w-full md:w-80 bg-white border border-slate-200 rounded-2xl p-4 flex flex-col h-[500px]">

          <div className="flex justify-between items-center mb-4 border-b pb-2">

            <h4 className="font-bold text-slate-800">Transcript</h4>

            <span className="text-xs bg-blue-50 text-[#0095DA] px-2 py-1 rounded">Key Points</span>

          </div>

          <div className="flex-1 overflow-y-auto space-y-4 text-sm text-slate-600 pr-2">

            <p><strong className="text-slate-800">0:00</strong> - The problem of "High Context" chat in "Low Context" work.</p>

            <div className="bg-amber-50 p-2 rounded border border-amber-100 text-xs">

              <Lightbulb size={12} className="inline mr-1 text-amber-500"/>

              <strong>Insight:</strong> Slang isn't "bad", it's just the wrong "frequency".

            </div>

            <p><strong className="text-slate-800">2:15</strong> - The 7-38-55 Rule explained.</p>

            <p><strong className="text-slate-800">5:30</strong> - Why managers panic when you are vague.</p>

            <p><strong className="text-slate-800">8:00</strong> - The solution: Code Switching.</p>

          </div>

        </div>

      </div>

    </div>

  );

};



// MODULE 2: PREP BUILDER

const TheoryLesson = ({ onComplete }) => {

  const [step, setStep] = useState(0);

  const [errorMsg, setErrorMsg] = useState(null);



  const steps = [

    { title: "POINT", task: "Your boss asks 'What's the status?'. Choose the best opening:", options: [{txt: "So, about the campaign, well...", correct: false, why: "Too vague. Start with the headline."}, {txt: "I recommend delaying launch by 24h.", correct: true}] },

    { title: "REASON", task: "They ask 'Why?'. Give the business reason:", options: [{txt: "Because the vendor is slow.", correct: false, why: "Blaming. Focus on the objective issue."}, {txt: "We found a critical bug in payment.", correct: true}] },

    { title: "EVIDENCE", task: "Back it up with data:", options: [{txt: "It feels risky.", correct: false, why: "Feelings aren't facts. Use data."}, {txt: "15% failure rate in staging.", correct: true}] },

    { title: "POINT", task: "Close the deal with a next step:", options: [{txt: "What do you think?", correct: false, why: "Passes the burden back. Propose a solution."}, {txt: "Delaying ensures user trust.", correct: true}] }

  ];



  const handleSelect = (option) => {

    if (option.correct) {

      setErrorMsg(null);

      if(step < 3) setStep(s => s + 1);

      else onComplete();

    } else {

      setErrorMsg(option.why);

    }

  };



  return (

    <div className="max-w-2xl mx-auto h-full flex flex-col justify-center animate-fadeIn text-center">

      <h2 className="text-3xl font-black text-slate-900 mb-2">Build Your Pitch</h2>

      <p className="text-slate-500 mb-8">Assemble the perfect PREP statement. Wrong answers teach you <strong>why</strong>.</p>

     

      <div className="flex justify-center gap-2 mb-8">

        {['P','R','E','P'].map((l, i) => (

          <div key={i} className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-2 ${i === step ? 'bg-[#0095DA] text-white border-[#0095DA] scale-110' : i < step ? 'bg-green-500 text-white border-green-500' : 'bg-slate-100 text-slate-300'}`}>{l}</div>

        ))}

      </div>



      <div className="bg-white p-8 rounded-2xl border shadow-lg relative">

        <h3 className="text-xl font-bold text-slate-800 mb-4">{steps[step].title}</h3>

        <p className="mb-6 text-slate-600">{steps[step].task}</p>

        <div className="space-y-3">

          {steps[step].options.map((opt, i) => (

            <button key={i} onClick={() => handleSelect(opt)} className="w-full p-4 rounded-xl border-2 border-slate-100 hover:border-[#0095DA] hover:bg-blue-50 font-medium text-left transition-all">

              {opt.txt}

            </button>

          ))}

        </div>

        {errorMsg && (

          <div className="mt-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm flex items-center gap-2 animate-shake">

            <AlertTriangle size={16}/> {errorMsg}

          </div>

        )}

      </div>

    </div>

  );

};



// MODULE 3: DIGITAL HANDSHAKE

const ConfidenceLesson = ({ onComplete }) => {

  const [checks, setChecks] = useState({ cam: false, mic: false, light: false });



  return (

    <div className="max-w-2xl mx-auto animate-fadeIn">

      <div className="bg-slate-900 text-white p-6 rounded-t-2xl flex justify-between items-center">

        <h3 className="font-bold">Webcam Pre-Flight Check</h3>

        <div className="flex gap-2">

          <div className={`w-3 h-3 rounded-full ${checks.cam ? 'bg-green-500' : 'bg-red-500'}`}></div>

          <div className={`w-3 h-3 rounded-full ${checks.mic ? 'bg-green-500' : 'bg-red-500'}`}></div>

        </div>

      </div>

      <div className="bg-slate-800 h-64 flex items-center justify-center relative border-b-4 border-slate-700">

        {checks.cam ? (

          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" alt="Webcam" className="h-full object-cover w-full opacity-80"/>

        ) : (

          <p className="text-slate-500">Camera Off</p>

        )}

        <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded text-white text-xs backdrop-blur-md">

          {checks.mic ? "Mic: ON (Good Levels)" : "Mic: Muted"}

        </div>

      </div>

     

      <div className="bg-white p-6 rounded-b-2xl border shadow-sm space-y-4">

        <div className="flex justify-between items-center p-3 border rounded-xl hover:bg-slate-50 cursor-pointer" onClick={() => setChecks(c => ({...c, cam: !c.cam}))}>

          <div className="flex items-center gap-3">

            <div className={`p-2 rounded-full ${checks.cam ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}><Camera size={20}/></div>

            <div><div className="font-bold text-sm">Eye Contact Check</div><div className="text-xs text-slate-500">Camera at eye level?</div></div>

          </div>

          {checks.cam && <CheckCircle size={20} className="text-green-500"/>}

        </div>



        <div className="flex justify-between items-center p-3 border rounded-xl hover:bg-slate-50 cursor-pointer" onClick={() => setChecks(c => ({...c, mic: !c.mic}))}>

          <div className="flex items-center gap-3">

            <div className={`p-2 rounded-full ${checks.mic ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}><Mic size={20}/></div>

            <div><div className="font-bold text-sm">Audio Isolation</div><div className="text-xs text-slate-500">Headset connected? No noise?</div></div>

          </div>

          {checks.mic && <CheckCircle size={20} className="text-green-500"/>}

        </div>



        <div className="flex justify-between items-center p-3 border rounded-xl hover:bg-slate-50 cursor-pointer" onClick={() => setChecks(c => ({...c, light: !c.light}))}>

          <div className="flex items-center gap-3">

            <div className={`p-2 rounded-full ${checks.light ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}><Sun size={20}/></div>

            <div><div className="font-bold text-sm">Lighting Check</div><div className="text-xs text-slate-500">Light source in front of you?</div></div>

          </div>

          {checks.light && <CheckCircle size={20} className="text-green-500"/>}

        </div>



        <button

          disabled={!checks.cam || !checks.mic || !checks.light}

          onClick={onComplete}

          className="btn-primary w-full py-3 rounded-xl font-bold mt-4 disabled:opacity-50"

        >

          Join Meeting (Simulated)

        </button>

      </div>

    </div>

  );

};



// MODULE 4: CRISIS SIM

const SimulationLesson = ({ onComplete }) => {

  const [msgs, setMsgs] = useState([{ sender: 'boss', text: 'Update on 12.12 launch? Are we good?' }]);

  const [step, setStep] = useState(0);

  const [trust, setTrust] = useState(50); // Trust meter



  const choices = [

    [

      { txt: "All good boss 👍", correct: false, reply: "Really? I heard rumors of a vendor delay. Be honest.", trustDelta: -20 },

      { txt: "Delay due to vendor. New ETA 2pm.", correct: true, reply: "Ok. Why the delay? And is 2pm confirmed?", trustDelta: 10 }

    ],

    [

      { txt: "Vendor is slow. Idk why.", correct: false, reply: "That's not an answer. Find out.", trustDelta: -10 },

      { txt: "Reason: Vendor file corruption. Solution: Re-exporting now.", correct: true, reply: "Understood. Keep me posted.", trustDelta: 20 }

    ]

  ];



  const handleChoice = (choice) => {

    setMsgs([...msgs, { sender: 'me', text: choice.txt }, { sender: 'boss', text: choice.reply }]);

    setTrust(t => Math.max(0, Math.min(100, t + choice.trustDelta)));

   

    if (choice.correct) {

      if (step < 1) setStep(s => s + 1);

      else setTimeout(onComplete, 1500);

    }

  };



  return (

    <div className="max-w-md mx-auto h-full flex flex-col bg-slate-50 rounded-2xl border shadow-lg overflow-hidden animate-fadeIn">

      <div className="bg-[#0095DA] p-4 text-white flex justify-between items-center">

        <div className="font-bold flex items-center gap-2"><Users size={20}/> VP of Operations</div>

        <div className="flex items-center gap-2 text-xs font-bold bg-black/20 px-2 py-1 rounded">

          <Gauge size={14}/> Trust: {trust}%

        </div>

      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">

        {msgs.map((m, i) => (

          <div key={i} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>

            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.sender === 'me' ? 'bg-[#0095DA] text-white rounded-br-none' : 'bg-white border text-slate-700 rounded-bl-none'}`}>

              {m.text}

            </div>

          </div>

        ))}

      </div>

      <div className="p-4 bg-white border-t space-y-2">

        {step < 2 ? choices[step].map((c, i) => (

          <button key={i} onClick={() => handleChoice(c)} className="w-full p-3 border rounded-xl text-sm text-left hover:bg-slate-50 transition-colors">

            {c.txt}

          </button>

        )) : <div className="text-center text-green-600 font-bold">Scenario Complete!</div>}

      </div>

    </div>

  );

};



// MODULE 5: PEER REVIEW

const PeerReviewLesson = ({ onComplete }) => {

  const [submitted, setSubmitted] = useState(false);

  const [feedback, setFeedback] = useState("");

  const tags = ["Professional Tone", "Clear Ask", "Too Vague", "Good PREP"];



  const addTag = (tag) => {

    setFeedback(prev => prev + (prev ? " " : "") + tag + ".");

  };



  return (

    <div className="max-w-3xl mx-auto animate-fadeIn">

      <div className="mb-6"><span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded">20% Social</span></div>

      {!submitted ? (

        <div className="bg-white p-6 rounded-2xl border shadow-sm">

          <h3 className="font-bold text-lg mb-4">Review Rina's Draft</h3>

          <p className="bg-slate-50 p-4 rounded mb-4 font-mono text-sm text-slate-600">"Hi all, budget is tight idk what to do. Help."</p>

          <div className="space-y-4">

             <div className="flex gap-2 flex-wrap">

               {tags.map(tag => <button key={tag} onClick={() => addTag(tag)} className="text-xs bg-slate-100 px-3 py-1 rounded-full hover:bg-[#0095DA] hover:text-white transition-colors">+ {tag}</button>)}

             </div>

             <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} className="w-full p-3 border rounded-xl text-sm h-24" placeholder="Or type your own feedback..."></textarea>

             <button onClick={() => setSubmitted(true)} className="btn-primary w-full py-2 rounded-xl font-bold">Submit Review</button>

          </div>

        </div>

      ) : (

        <div className="bg-green-50 p-8 rounded-2xl border border-green-200 text-center animate-pop">

          <h3 className="text-xl font-bold text-green-800 mb-2">Feedback Sent!</h3>

          <p className="text-sm text-green-600 mb-4">You helped a peer improve.</p>

          <button onClick={onComplete} className="bg-green-600 text-white px-8 py-2 rounded-xl font-bold">Finish Module</button>

        </div>

      )}

    </div>

  );

};



// MODULE 6: POST-TEST

const QuizLesson = ({ onComplete, updateUser, onDownloadCert }) => {

  const [score, setScore] = useState(0);

  const [done, setDone] = useState(false);

  const [answers, setAnswers] = useState({});



  const questions = [

    { q: "What is the primary goal of the PREP framework?", options: ["To speak longer", "To structure ideas clearly"], correct: 1 },

    { q: "When should you use High Context slang?", options: ["In social settings", "In formal emails"], correct: 0 },

    { q: "What is the 1-Scroll Rule?", options: ["Keep emails short enough to fit one screen", "Scroll once before reading"], correct: 0 },

    { q: "How do you handle a mistake?", options: ["Hide it", "Own it + Solution"], correct: 1 },

    { q: "Camera eye contact means looking at:", options: ["The Screen", "The Lens"], correct: 1 }

  ];



  const handleSubmit = () => {

    let s = 0;

    questions.forEach((q, i) => { if (answers[i] === q.correct) s++; });

    const finalScore = Math.round((s / questions.length) * 100);

    setScore(finalScore);

    setDone(true);

    updateUser({ postTestScore: finalScore });

  };



  if(done) return (

    <div className="text-center animate-pop pt-10 max-w-2xl mx-auto">

      {score >= 80 ? (

        <div className="bg-white p-10 rounded-2xl border shadow-2xl certificate-bg relative text-center">

          <div className="absolute top-0 left-0 w-full h-2 bg-[#0095DA]"></div>

          <img src={BLIBLI_LOGO} alt="Blibli" className="h-10 mx-auto mb-6"/>

          <Award size={80} className="mx-auto text-[#0095DA] mb-4"/>

          <h2 className="text-4xl font-serif font-bold text-slate-800 mb-2">Certificate of Excellence</h2>

          <p className="text-slate-500 mb-8 font-serif italic">This is to certify that</p>

          <h3 className="text-3xl font-bold text-slate-900 border-b-2 border-slate-300 pb-4 mb-8 inline-block min-w-[400px]">Budi (Content Specialist)</h3>

          <p className="text-slate-600 mb-8">Has successfully completed the<br/><strong>Strategic Communication Masterclass</strong></p>

          <div className="flex justify-center gap-4">

            <button onClick={() => onDownloadCert("Communication_Certificate.pdf")} className="flex items-center gap-2 px-6 py-3 border rounded-xl hover:bg-slate-50 font-bold"><Download size={18}/> Download PDF</button>

            <button onClick={onComplete} className="btn-primary px-8 py-3 rounded-xl font-bold shadow-lg">Return to Dashboard</button>

          </div>

        </div>

      ) : (

        <div className="bg-white p-8 rounded-2xl border max-w-md mx-auto">

          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><X size={40} className="text-red-500"/></div>

          <h2 className="text-2xl font-bold text-red-500 mb-2">Score: {score}%</h2>

          <p className="mb-6 text-slate-500">You need 80% to pass. Please review the PREP framework and try again.</p>

          <button onClick={() => { setDone(false); setAnswers({}); }} className="btn-primary px-8 py-3 rounded-xl font-bold w-full">Retry Exam</button>

        </div>

      )}

    </div>

  );



  return (

    <div className="max-w-xl mx-auto animate-fadeIn">

      <h3 className="text-xl font-bold mb-6 text-center">Final Certification Exam</h3>

      <div className="space-y-6 mb-8">

        {questions.map((q, i) => (

          <div key={i} className="bg-white p-4 rounded-xl border hover:border-[#0095DA] transition-colors">

            <p className="font-bold mb-3 text-slate-800">{i+1}. {q.q}</p>

            <div className="space-y-2">

              {q.options.map((opt, optIdx) => (

                <button key={optIdx} onClick={() => setAnswers({...answers, [i]: optIdx})} className={`w-full text-left p-3 rounded-lg text-sm border transition-all ${answers[i] === optIdx ? 'bg-[#0095DA] text-white border-[#0095DA]' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}>{opt}</button>

              ))}

            </div>

          </div>

        ))}

      </div>

      <button onClick={handleSubmit} disabled={Object.keys(answers).length < questions.length} className="btn-primary w-full py-3 rounded-xl font-bold disabled:opacity-50">Submit Exam</button>

    </div>

  );

};



// MODULE 7: CAPSTONE

const CapstoneProject = ({ onComplete, updateUser }) => {

  const [goal, setGoal] = useState("");

  const [date, setDate] = useState("");



  const handleSubmit = () => {

    updateUser({ capstoneStatus: 'active', capstoneData: { goal, date } });

    onComplete();

  };



  return (

    <div className="max-w-2xl mx-auto animate-fadeIn">

      <div className="bg-white p-8 rounded-2xl border shadow-sm">

        <h2 className="text-2xl font-bold mb-4">90-Day Transformation Project</h2>

        <p className="text-slate-500 mb-6">Identify a high-stakes meeting to apply PREP. This will appear on your Dashboard.</p>

        <div className="space-y-4 mb-6">

          <input placeholder="Stakeholder Name / Meeting Goal" className="w-full p-3 border rounded-xl" onChange={e => setGoal(e.target.value)}/>

          <input type="date" className="w-full p-3 border rounded-xl" onChange={e => setDate(e.target.value)}/>

        </div>

        <button disabled={!goal || !date} onClick={handleSubmit} className="btn-primary w-full py-3 rounded-xl font-bold">Lock In Project</button>

      </div>

    </div>

  );

};



// --- 5. DASHBOARD ---



const Dashboard = ({ user, setView, courseMeta, onCheckIn, updateUser, onDownload }) => {

  const completedCount = user.completedModules.length;

  const progress = Math.round((completedCount / MODULES_LIST.length) * 100);

  const isCourseFinished = progress === 100;



  const [showSurvey, setShowSurvey] = useState(isCourseFinished && !user.satisfaction);

  const [editingKpi, setEditingKpi] = useState(null);

  const [kpiVal, setKpiVal] = useState({ metric: '', current: '', target: '', unit: '' });



  const toggleWeeklyTask = (id) => {

    if(!isCourseFinished) return;

    const updatedTasks = user.weeklyTasks.map(t => {

      if (t.id === id && !t.done) {

        updateUser({ xp: user.xp + t.xp });

        return { ...t, done: true };

      }

      return t;

    });

    updateUser({ weeklyTasks: updatedTasks });

  };



  const startEditKpi = (kpi) => {

    setEditingKpi(kpi.id);

    setKpiVal({ metric: kpi.metric, current: kpi.current, target: kpi.target, unit: kpi.unit });

  };



  const saveKpi = (id) => {

    const updatedKpis = user.kpis.map(k => k.id === id ? { ...k, metric: kpiVal.metric, current: kpiVal.current, target: kpiVal.target, unit: kpiVal.unit } : k);

    updateUser({ kpis: updatedKpis });

    setEditingKpi(null);

  };



  const knowledgeData = [

    { name: 'Pre-Test', score: user.preTestScore },

    { name: 'Post-Test', score: user.postTestScore || user.preTestScore },

  ];



  return (

    <div className="space-y-8 animate-slideIn">

      {/* Hero */}

      <div className="relative bg-white rounded-3xl p-8 border border-slate-200 shadow-sm overflow-hidden">

        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">

          <div>

            <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome back, {user.name}! 👋</h2>

            <p className="text-slate-500 mb-6">{isCourseFinished ? "You are in Maintenance Mode (Level 3)." : "Focus: Strategic Communication."}</p>

            <button onClick={() => setView('course')} className="btn-primary px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2">

              <PlayCircle size={18} /> {isCourseFinished ? 'Review Course' : (progress > 0 ? 'Continue Learning' : 'Start Course')}

            </button>

          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">

            <LevelBar xp={user.xp} level={user.level} />

            <div className="mt-4 flex gap-4 text-xs text-slate-500">

              <div className="flex items-center gap-1"><Zap size={14} className="text-red-500"/> {user.streak} Day Streak</div>

              <div className="flex items-center gap-1"><Award size={14} className="text-amber-500"/> {user.badges.length} Badges</div>

            </div>

          </div>

        </div>

      </div>



      {/* Kirkpatrick L4: Fully Editable KPI Tracker */}

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">

        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><TrendingUp className="text-green-500"/> Impact KPI Tracker (Level 4)</h3>

        <div className="grid md:grid-cols-2 gap-4">

          {user.kpis.map(k => (

            <div key={k.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200">

              {editingKpi === k.id ? (

                <div className="space-y-2">

                  <input className="w-full text-sm font-bold p-1 rounded" value={kpiVal.metric} onChange={e => setKpiVal({...kpiVal, metric: e.target.value})}/>

                  <div className="flex gap-2 items-center text-sm">

                    <input type="number" value={kpiVal.current} onChange={e => setKpiVal({...kpiVal, current: e.target.value})} className="w-16 p-1 border rounded"/>

                    <span>to</span>

                    <input type="number" value={kpiVal.target} onChange={e => setKpiVal({...kpiVal, target: e.target.value})} className="w-16 p-1 border rounded"/>

                    <input className="w-16 p-1 border rounded" value={kpiVal.unit} onChange={e => setKpiVal({...kpiVal, unit: e.target.value})}/>

                    <button onClick={() => saveKpi(k.id)} className="ml-auto text-green-600"><Save size={16}/></button>

                  </div>

                </div>

              ) : (

                <>

                  <div className="flex justify-between items-start mb-2">

                    <span className="font-bold text-sm text-slate-700">{k.metric}</span>

                    <button onClick={() => startEditKpi(k)} className="text-slate-400 hover:text-[#0095DA]"><Edit2 size={16}/></button>

                  </div>

                  <div className="flex justify-between text-xs text-slate-500 mb-2">

                    <span>Current: {k.current} {k.unit}</span>

                    <span>Goal: {k.target} {k.unit}</span>

                  </div>

                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">

                    <div className="h-full bg-green-500" style={{width: `${Math.min(100, (k.current/k.target)*100)}%`}}></div>

                  </div>

                </>

              )}

            </div>

          ))}

        </div>

      </div>



      <div className="grid md:grid-cols-3 gap-8">

        <div className="md:col-span-2 space-y-6">

         

          {/* Active Course Card */}

          <div className="space-y-4">

            <h3 className="font-bold text-lg text-slate-800">My Learning Journey</h3>

           

            {/* Active with Circular Progress */}

            <div onClick={() => setView('course')} className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden flex items-center justify-between">

                <div className="flex gap-5 items-center z-10">

                  <div className="w-20 h-20 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0 text-amber-500 group-hover:scale-105 transition-transform shadow-sm">

                    <MessageCircle size={32} />

                  </div>

                  <div>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-1 rounded">Active</span>

                    <h4 className="font-bold text-xl text-slate-900 mt-2 mb-1 group-hover:text-[#0095DA] transition-colors">{courseMeta.title}</h4>

                    <div className="flex items-center gap-4 text-xs text-slate-400">

                      <div className="flex items-center gap-1"><Play size={12} /> {completedCount}/{MODULES_LIST.length} Modules</div>

                      <div className="flex items-center gap-1"><Clock size={12} /> 2h Left</div>

                    </div>

                  </div>

                </div>

               

                {/* Circular Progress */}

                <CircularProgress percentage={progress} />

            </div>



            {/* Locked Paths */}

            <div className="grid md:grid-cols-2 gap-4">

              {LOCKED_COURSES.map(c => (

                <div key={c.id} className="bg-slate-50 rounded-2xl border border-slate-200 p-5 opacity-70 grayscale hover:grayscale-0 transition-all cursor-not-allowed group">

                  <div className="flex justify-between mb-3">

                    <div className={`p-2 rounded-lg bg-white text-${c.color}-500 shadow-sm`}><Lock size={16}/></div>

                    <span className="text-[10px] font-bold uppercase bg-slate-200 text-slate-500 px-2 py-1 rounded h-fit">Locked</span>

                  </div>

                  <h4 className="font-bold text-slate-800 mb-1 group-hover:text-[#0095DA]">{c.title}</h4>

                  <p className="text-xs text-slate-500 mb-3 line-clamp-2">{c.description}</p>

                  <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold">

                    <span className="flex items-center gap-1"><PlayCircle size={10}/> {c.modules} Modules</span>

                    <span className="flex items-center gap-1"><Clock size={10}/> {c.duration}</span>

                  </div>

                </div>

              ))}

            </div>

          </div>



          {/* Kirkpatrick L2 Analytics (Visible after Pre-Test) */}

          {user.preTestScore > 0 && (

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">

              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><BarChart2 size={18} className="text-purple-500"/> Knowledge Growth (Level 2)</h3>

              <div className="h-48 w-full">

                <ResponsiveContainer width="100%" height="100%">

                  <BarChart data={knowledgeData}>

                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />

                    <YAxis stroke="#94a3b8" fontSize={12} />

                    <Tooltip cursor={{fill: 'transparent'}} />

                    <Bar dataKey="score" fill="#0095DA" radius={[4, 4, 0, 0]} barSize={40}>

                      {knowledgeData.map((entry, index) => (

                        <Cell key={`cell-${index}`} fill={index === 0 ? '#94a3b8' : '#0095DA'} />

                      ))}

                    </Bar>

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>

          )}

        </div>

       

        {/* Right Sidebar */}

        <div className="space-y-6">

          {/* Active Capstone */}

          {user.capstoneStatus === 'active' && (

            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 shadow-sm animate-slideIn">

              <div className="flex items-center gap-2 mb-2"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div><span className="text-xs font-bold text-green-700 uppercase">Active Project</span></div>

              <h3 className="font-bold text-slate-800 mb-1">Meeting: {user.capstoneData?.goal}</h3>

              <p className="text-xs text-slate-600 mb-3">Due: {user.capstoneData?.date}</p>

              <button className="w-full bg-white text-green-700 px-4 py-2 rounded-lg text-xs font-bold border border-green-200 hover:bg-green-100">Update Progress</button>

            </div>

          )}



          {/* Continuous Learning (Unlocked after course) */}

          {isCourseFinished ? (

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">

              <h3 className="font-bold text-slate-800 text-sm mb-4">Weekly Maintenance (Level 3)</h3>

              <div className="space-y-3">

                {user.weeklyTasks.map(task => (

                  <button

                    key={task.id}

                    onClick={() => toggleWeeklyTask(task.id)}

                    disabled={task.done}

                    className={`w-full p-3 rounded-xl border flex justify-between items-center text-left transition-all ${task.done ? 'bg-green-50 border-green-200 opacity-70' : 'bg-white hover:bg-slate-50 border-slate-200'}`}

                  >

                    <div className="flex items-center gap-2">

                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${task.done ? 'bg-green-500 border-green-500' : 'border-slate-300'}`}>{task.done && <Check size={10} className="text-white"/>}</div>

                      <span className={`text-xs font-medium ${task.done ? 'line-through text-slate-400' : 'text-slate-700'}`}>{task.title}</span>

                    </div>

                    <span className="text-[10px] font-bold text-amber-500">+{task.xp}</span>

                  </button>

                ))}

              </div>

            </div>

          ) : (

            /* Daily Quest (Pre-Completion) */

            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg">

              <div className="flex justify-between items-start mb-2"><Target className="text-indigo-200" /><span className="text-[10px] font-bold uppercase bg-white/20 px-2 py-0.5 rounded">Daily Goal</span></div>

              <h4 className="font-bold text-lg leading-tight mb-2">Use PREP Once</h4>

              <button onClick={onCheckIn} disabled={user.checkedIn} className={`w-full py-2 rounded-lg text-xs font-bold mt-4 ${user.checkedIn ? 'bg-green-500 text-white cursor-default' : 'bg-white text-indigo-600 hover:bg-indigo-50'}`}>{user.checkedIn ? 'Completed!' : 'Check In'}</button>

            </div>

          )}



          {/* Quick Wins (Resources) */}

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">

            <h3 className="font-bold text-slate-800 text-sm mb-3">Quick Wins</h3>

            <div className="space-y-2">

              <button onClick={() => onDownload("PREP_Cheat_Sheet.pdf")} className="w-full flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg group">

                <div className="flex items-center gap-2 text-xs text-slate-600"><FileText size={14} className="text-[#0095DA]"/> PREP Cheatsheet</div>

                <Download size={14} className="text-slate-300 group-hover:text-[#0095DA]"/>

              </button>

              <button onClick={() => onDownload("Virtual_Backgrounds.zip")} className="w-full flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg group">

                <div className="flex items-center gap-2 text-xs text-slate-600"><Video size={14} className="text-[#0095DA]"/> Best Meeting Backgrounds</div>

                <Download size={14} className="text-slate-300 group-hover:text-[#0095DA]"/>

              </button>

            </div>

          </div>



          {/* Kirkpatrick L1: Satisfaction Survey Modal */}

          {showSurvey && (

            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

              <div className="bg-white rounded-2xl p-6 max-w-md w-full animate-pop text-center">

                <h3 className="text-xl font-bold mb-4">Course Feedback (Level 1)</h3>

                <p className="text-sm text-slate-500 mb-6">How relevant was this training to your job?</p>

                <div className="flex justify-center gap-4 mb-6">

                  {[1, 2, 3, 4, 5].map(s => (

                    <button key={s} onClick={() => { updateUser({ satisfaction: { rating: s } }); setShowSurvey(false); }} className="w-12 h-12 rounded-full bg-slate-100 hover:bg-[#0095DA] hover:text-white font-bold transition-all text-lg">{s}</button>

                  ))}

                </div>

                <div className="flex justify-between text-xs text-slate-400 px-4">

                  <span>Not Useful</span>

                  <span>Extremely Useful</span>

                </div>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>

  );

};



// --- 6. COMMUNITY & PLAYER ---



const Community = ({ onNewPost, posts, setPosts }) => {

  const [newPostContent, setNewPostContent] = useState("");

  const [isPosting, setIsPosting] = useState(false);

  const [activeCommentId, setActiveCommentId] = useState(null);

  const [commentText, setCommentText] = useState("");



  const handlePost = () => {

    if(!newPostContent) return;

    const newPost = { id: Date.now(), user: "You", role: "Content Specialist", content: newPostContent, likes: 0, likedByMe: false, comments: 0, time: "Just now", commentsList: [] };

    setPosts([newPost, ...posts]);

    setNewPostContent("");

    setIsPosting(false);

  };



  const handleLike = (id) => {

    setPosts(posts.map(p => {

      if(p.id === id) {

        return { ...p, likes: p.likedByMe ? p.likes - 1 : p.likes + 1, likedByMe: !p.likedByMe };

      }

      return p;

    }));

  };



  const submitComment = (postId) => {

    if(!commentText.trim()) return;

    const newComment = { id: Date.now(), user: "You", text: commentText };

    setPosts(posts.map(p => p.id === postId ? { ...p, commentsList: [...(p.commentsList || []), newComment], comments: p.comments + 1 } : p));

    setCommentText("");

  };



  const toggleComments = (id) => {

    setActiveCommentId(activeCommentId === id ? null : id);

  };



  return (

    <div className="max-w-2xl mx-auto py-8 animate-fadeIn">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-slate-800">Squad Feed</h2>

        <button onClick={() => setIsPosting(!isPosting)} className="text-sm font-bold text-white bg-[#0095DA] px-4 py-2 rounded-xl hover:bg-[#0077ae] flex items-center gap-2"><Send size={14}/> New Post</button>

      </div>

     

      {isPosting && (

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 animate-slideIn">

          <textarea value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} className="w-full p-3 border rounded-xl mb-2" placeholder="Share your learning..."></textarea>

          <button onClick={handlePost} className="btn-primary px-4 py-2 rounded-lg text-sm font-bold">Publish</button>

        </div>

      )}



      <div className="space-y-4">

        {posts.map(post => (

          <div key={post.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">

            <div className="flex items-center gap-3 mb-3">

              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500">{post.user[0]}</div>

              <div><div className="text-sm font-bold text-slate-800">{post.user}</div><div className="text-xs text-slate-400">{post.role} • {post.time}</div></div>

            </div>

            <p className="text-sm text-slate-600 mb-4">{post.content}</p>

            <div className="flex gap-4 text-xs text-slate-400 font-bold border-t border-slate-50 pt-3">

              <button onClick={() => handleLike(post.id)} className={`flex items-center gap-1 transition-colors ${post.likedByMe ? 'text-[#0095DA]' : 'hover:text-[#0095DA]'}`}><ThumbsUp size={14}/> {post.likes}</button>

              <button onClick={() => toggleComments(post.id)} className="flex items-center gap-1 hover:text-[#0095DA]"><MessageCircle size={14}/> {post.comments}</button>

            </div>

           

            {/* Comments Section */}

            {activeCommentId === post.id && (

              <div className="mt-4 pt-4 border-t border-slate-100 animate-slideIn">

                <div className="space-y-3 mb-4">

                  {post.commentsList && post.commentsList.map(c => (

                    <div key={c.id} className="bg-slate-50 p-3 rounded-xl text-xs">

                      <span className="font-bold text-slate-700 block mb-1">{c.user}</span>

                      <span className="text-slate-600">{c.text}</span>

                    </div>

                  ))}

                </div>

                <div className="flex gap-2">

                  <input

                    value={commentText}

                    onChange={(e) => setCommentText(e.target.value)}

                    onKeyDown={(e) => e.key === 'Enter' && submitComment(post.id)}

                    className="flex-1 bg-slate-50 px-3 py-2 rounded-lg text-xs border border-slate-200"

                    placeholder="Write a comment..."

                  />

                  <button onClick={() => submitComment(post.id)} className="p-2 bg-[#0095DA] text-white rounded-lg"><Send size={14}/></button>

                </div>

              </div>

            )}

          </div>

        ))}

      </div>

    </div>

  );

};



const CoursePlayer = ({ user, updateUser, onBack, onCompleteCourse, onDownload }) => {

  const [activeModuleId, setActiveModuleId] = useState("m0");

  const activeModule = MODULES_LIST.find(m => m.id === activeModuleId);



  const handleModuleComplete = () => {

    if (!user.completedModules.includes(activeModuleId)) {

      updateUser({

        completedModules: [...user.completedModules, activeModuleId],

        xp: user.xp + (activeModule ? activeModule.xp : 100)

      });

    }

    const currentIndex = MODULES_LIST.findIndex(m => m.id === activeModuleId);

    if (currentIndex < MODULES_LIST.length - 1) {

      setTimeout(() => {

        setActiveModuleId(MODULES_LIST[currentIndex + 1].id);

      }, 500);

    } else {

      setTimeout(() => {

        onCompleteCourse();

      }, 500);

    }

  };



  if (!activeModule) return null;



  return (

    <div className="h-[calc(100vh-100px)] flex flex-col lg:flex-row gap-6 animate-fadeIn relative">

      <div className="lg:w-80 bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col shrink-0 h-full shadow-sm">

        <div className="p-5 border-b border-slate-100">

          <button onClick={onBack} className="text-xs font-bold text-slate-500 flex items-center gap-1 mb-3 hover:text-[#0095DA]"><ChevronLeft size={12}/> Back</button>

          <h2 className="font-bold text-slate-900 leading-tight">{COURSE_META.title}</h2>

        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">

          {MODULES_LIST.map((module, index) => (

            <button key={module.id} onClick={() => setActiveModuleId(module.id)} className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors ${activeModuleId === module.id ? 'bg-blue-50 border border-blue-100' : 'hover:bg-slate-50 border border-transparent'}`}>

              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${user.completedModules.includes(module.id) ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-500'}`}>{user.completedModules.includes(module.id) ? <Check size={14} /> : index + 1}</div>

              <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{module.title}</p><span className="text-[9px] text-slate-400">{module.category}</span></div>

            </button>

          ))}

        </div>

      </div>

      <div className="flex-1 bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col h-full shadow-sm relative">

        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30">

          {activeModule.type === 'pre_test' && <PreTestLesson onComplete={handleModuleComplete} updateUser={updateUser} />}

          {activeModule.type === 'video' && <VideoLesson onComplete={handleModuleComplete} />}

          {activeModule.type === 'theory' && <TheoryLesson onComplete={handleModuleComplete} />}

          {activeModule.type === 'checklist' && <ConfidenceLesson onComplete={handleModuleComplete} />}

          {activeModule.type === 'simulation' && <SimulationLesson onComplete={handleModuleComplete} />}

          {activeModule.type === 'peer_review' && <PeerReviewLesson onComplete={handleModuleComplete} />}

          {activeModule.type === 'quiz' && <QuizLesson onComplete={handleModuleComplete} updateUser={updateUser} onDownloadCert={onDownload} />}

          {activeModule.type === 'capstone' && <CapstoneProject onComplete={handleModuleComplete} updateUser={updateUser} />}

        </div>

      </div>

    </div>

  );

};



// --- 7. APP SHELL ---



const LoginScreen = ({ onLogin }) => (

  <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">

    <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl relative z-10 animate-fadeIn text-center">

      <img src={BLIBLI_LOGO} alt="Blibli" className="h-12 mx-auto mb-6 bg-white rounded p-1"/>

      <h1 className="text-3xl font-bold text-white mb-2">B-READY Academy</h1>

      <p className="text-slate-400 mb-8">Gen Z Upskilling Platform</p>

      <button onClick={onLogin} className="w-full btn-primary py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2">Enter Learning Space <ArrowRight size={20}/></button>

    </div>

  </div>

);



const Page2 = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [currentView, setCurrentView] = useState('dashboard');

  const [user, setUser] = useState(INITIAL_USER_DATA);

  const [posts, setPosts] = useState(INITIAL_POSTS);

  const [toast, setToast] = useState(null); // { msg, type }



  useEffect(() => {

    const newLevel = Math.floor(user.xp / 500) + 1;

    if (newLevel > user.level) setUser(prev => ({ ...prev, level: newLevel }));

  }, [user.xp]);



  const showToast = (msg) => {

    setToast(msg);

    setTimeout(() => setToast(null), 3000);

  };



  const handleCheckIn = () => {

    if (!user.checkedIn) {

      setUser(prev => ({ ...prev, xp: prev.xp + 50, streak: prev.streak + 1, checkedIn: true }));

      showToast("Check-In Complete! +50 XP");

    }

  };



  const simulateDownload = (filename) => {

    showToast(`Downloading ${filename}...`);

    // In real app, this triggers file download

  };



  const updateUser = (newData) => setUser(prev => ({ ...prev, ...newData }));



  if (!isAuthenticated) return <><GlobalStyles /><LoginScreen onLogin={() => setIsAuthenticated(true)} /></>;



  return (

    <div className="flex min-h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">

      <GlobalStyles />

      <aside className="fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col">

        <div className="p-6 flex flex-col h-full">

          <div className="flex items-center gap-2 mb-10"><img src={BLIBLI_LOGO} alt="Blibli" className="h-8"/><span className="text-xs font-bold text-[#0095DA] uppercase mt-1">Academy</span></div>

          <nav className="flex-1 space-y-2">

            {[{ id: 'dashboard', icon: Home, label: 'Dashboard' }, { id: 'course', icon: PlayCircle, label: 'My Courses' }, { id: 'community', icon: Users, label: 'Squad' }].map(item => (

              <button key={item.id} onClick={() => setCurrentView(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${currentView === item.id ? 'nav-item-active' : 'text-slate-500 hover:bg-slate-50'}`}><item.icon size={18} /> {item.label}</button>

            ))}

          </nav>

          <div className="mt-auto pt-6 border-t border-slate-100 flex items-center gap-3">

             <img src={user.avatar} alt="User" className="w-10 h-10 rounded-full bg-slate-100" />

             <div><p className="text-sm font-bold text-slate-800">{user.name}</p><p className="text-xs text-slate-500">{user.role}</p></div>

          </div>

        </div>

      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">

        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-30">

          <h2 className="font-bold text-slate-700 capitalize">{currentView}</h2>

          <div className="flex items-center gap-4"><div className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-bold border border-red-100 shadow-sm"><Zap size={14} fill="#dc2626" /><span>{user.streak} Day Streak</span></div><div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-amber-200"><Star size={12} fill="#b45309" /> {user.xp} XP</div><button className="text-slate-400 hover:text-slate-600"><Bell size={20} /></button></div>

        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">

          <div className="max-w-6xl mx-auto">

            {currentView === 'dashboard' && <Dashboard user={user} setView={setCurrentView} courseMeta={COURSE_META} onCheckIn={handleCheckIn} updateUser={updateUser} onDownload={simulateDownload} />}

            {currentView === 'course' && <CoursePlayer user={user} updateUser={updateUser} onBack={() => setCurrentView('dashboard')} onCompleteCourse={() => { setCurrentView('dashboard'); showToast("Course Completed!"); }} onDownload={simulateDownload} />}

            {currentView === 'community' && <Community onNewPost={() => {}} posts={posts} setPosts={setPosts}/>}

          </div>

        </main>

       

        {/* Global Toast */}

        {toast && (

          <div className="absolute bottom-8 right-8 bg-slate-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-toast z-50">

            <CheckCircle size={20} className="text-green-400"/> {toast}

          </div>

        )}

      </div>

    </div>

  );

};



export default Page2;