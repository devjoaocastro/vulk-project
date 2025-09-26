import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ArrowLeft, Mic, Rocket, Eye, Shield, Users, BarChart3, Globe, LineChart, Mail, ExternalLink, Sun, Moon, Target, CheckCircle, Building, CreditCard, Factory, GraduationCap, Heart, Banknote, TrendingUp, AlertTriangle, Zap } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart as RechartsLineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

/**
 * VULK® — INVESTOR PITCH DECK (v1.0)
 * Estilo visual: clean, dark, tipografia clara, cartões com glass-morphism leve.
 * Navegação: ← →, click, toc à esquerda (toggle), progress bar inferior.
 * Tech: Tailwind + React (shadcn/ui opcional). Tudo num único componente export default.
 */

// Password protection component
function PasswordProtection({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate password check
    setTimeout(() => {
      if (password === 'k0d2025') {
        onUnlock();
      } else {
        setError('Password incorreta. Tenta novamente.');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-[#0b0d10] flex items-center justify-center z-50">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 max-w-md w-full mx-4 text-center">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">VULK® Pitch Deck</h1>
          <p className="text-white/60">Introduz a password para aceder</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 mb-4"
            required
          />
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-medium transition-colors disabled:opacity-50 rounded-xl"
          >
            {isLoading ? 'A verificar...' : 'Aceder'}
          </button>
        </form>
        
        {error && <div className="text-red-400 mt-4 text-sm">{error}</div>}
        
        <div className="mt-6 text-xs text-white/60">
          Contacto: investors@k0d.pro
        </div>
      </div>
    </div>
  );
}

const Section = ({ children }) => (
  <div className="w-full">{children}</div>
);

const SlideShell = ({
  title,
  subtitle,
  icon,
  children,
}) => {
  return (
    <div className="w-full h-full flex items-center justify-center p-6 sm:p-10">
      <div className="w-full max-w-[1200px] h-full rounded-2xl bg-white/5 backdrop-blur-md shadow-[0_10px_50px_-10px_rgba(0,0,0,0.6)] border border-white/10 overflow-hidden flex flex-col">
        <div className="px-6 sm:px-10 pt-8 pb-4 border-b border-white/10 flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10">{icon}</div>
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">{title}</h2>
            {subtitle && (
              <p className="text-sm text-white/60 leading-tight">{subtitle}</p>
            )}
          </div>
        </div>
        <div className="flex-1 overflow-auto px-6 sm:px-10 py-6">
          <Section>{children}</Section>
        </div>
      </div>
    </div>
  );
};

function Bullet({ children }) {
  return (
    <li className="leading-relaxed marker:text-white/80">
      <span className="align-middle">{children}</span>
    </li>
  );
}

// Custom Tooltip component
const CustomTooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 text-white text-xs rounded-lg whitespace-nowrap z-50">
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
        </div>
      )}
    </div>
  );
};

// Chart components
const RevenueChart = () => {
  const data = [
    { year: '2025', revenue: 0.5, customers: 5 },
    { year: '2026', revenue: 2.5, customers: 25 },
    { year: '2027', revenue: 8, customers: 80 },
    { year: '2028', revenue: 25, customers: 250 },
    { year: '2029', revenue: 75, customers: 750 }
  ];

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="year" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(0,0,0,0.8)', 
              border: '1px solid #374151',
              borderRadius: '8px',
              color: 'white'
            }} 
          />
          <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const MarketShareChart = () => {
  const data = [
    { name: 'VULK®', value: 5, color: '#3B82F6' },
    { name: 'GitHub Copilot', value: 25, color: '#6B7280' },
    { name: 'Vercel v0', value: 15, color: '#6B7280' },
    { name: 'Bubble', value: 20, color: '#6B7280' },
    { name: 'Others', value: 35, color: '#6B7280' }
  ];

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(0,0,0,0.8)', 
              border: '1px solid #374151',
              borderRadius: '8px',
              color: 'white'
            }} 
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

function KeyMetric({ label, value, note, tooltip }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 min-w-[140px]">
      <div className="text-2xl sm:text-3xl font-semibold tracking-tight break-words">{value}</div>
      <div className="text-sm sm:text-base text-white/70 mt-1">
        {tooltip ? (
          <CustomTooltip content={tooltip}>
            <span className="cursor-help border-b border-dotted border-white/30">{label}</span>
          </CustomTooltip>
        ) : (
          label
        )}
      </div>
      {note && <div className="text-xs text-white/50 mt-2 break-words">{note}</div>}
    </div>
  );
}

const slides = [
  {
    id: "cover",
    title: "VULK® — The Voice‑Controlled, AI‑Powered Full‑Stack Platform",
    subtitle: "Build complete apps in minutes. Just by speaking.",
    icon: <Rocket size={18} />,
    content: (
      <div>
        <div className="text-sm tracking-widest text-white/70">INVESTOR PITCH • v1.0 • January 2025</div>
        <h1 className="mt-3 text-3xl sm:text-5xl font-semibold leading-tight">The end of coding as we know it. <span className="text-white/60">Start building by intention.</span></h1>
        <p className="mt-4 text-white/80">"Not just a startup — it's the software development revolution." — VULK® Team</p>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-8">
          <KeyMetric label="Stage" value="Pre‑Launch" note="v0.2 95% • v0.3 Live" />
          <KeyMetric label="Ask (Pre‑Seed)" value="€35k" note="Cap €2.5M" />
          <KeyMetric label="Seed (Next)" value="€350k" note="Cap €2.5M" />
          <KeyMetric label="12‑mo ARR" value="€2.4M" note="Projection" />
        </div>
        
        {/* VULK Interface Screenshot */}
        <div className="mt-12 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold mb-4 text-center">See VULK in Action</h3>
          <div className="bg-black/20 rounded-xl p-4 border border-white/5">
            <img 
              src="/screen.png" 
              alt="VULK Interface Screenshot" 
              className="w-full rounded-lg shadow-2xl"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'block';
              }}
            />
            <div className="hidden text-center text-white/60 py-8">
              <div className="text-sm">Screenshot do sistema VULK</div>
              <div className="text-xs mt-2">Interface real do produto</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "onepager",
    title: "Executive Summary (1‑Pager)",
    subtitle: "Snapshot for quick decisions",
    icon: <BarChart3 size={18} />,
    content: (
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Company</h3>
          <ul className="list-disc pl-5 space-y-1">
            <Bullet>VULK® Technologies</Bullet>
            <Bullet>Founders: João Castro (CTO) • Joana Matos (CEO)</Bullet>
            <Bullet>HQ: Portugal — Global Remote</Bullet>
            <Bullet>Product: AI‑native full‑stack builder (voice + eye‑tracking)</Bullet>
            <Bullet>Stage: Pre‑Launch — v0.2 95% • v0.3 Advanced live</Bullet>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Numbers</h3>
          <ul className="list-disc pl-5 space-y-1">
            <Bullet>Market: $50B+ DevTools • 27M+ devs</Bullet>
            <Bullet>Traction: 0 → €500k ARR (12 months, pre-launch)</Bullet>
            <Bullet>Ask: €35k Pre‑Seed (cap €2.5M) → Seed €350k (cap €2.5M)</Bullet>
            <Bullet>Exit: 5–7 years → €500M realistic</Bullet>
            <Bullet>ROI realistic: 100× by 2029</Bullet>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "problem",
    title: "Problem — Software development is broken",
    icon: <Shield size={18} />,
    content: (
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Time & Cost Crisis</h3>
            <ul className="list-disc pl-5 space-y-2">
              <Bullet>6-12 months for a basic MVP</Bullet>
              <Bullet>€50k-100k+ for a simple SaaS</Bullet>
              <Bullet>80% of projects are delayed (Standish Group)</Bullet>
              <Bullet>60% exceed budget (Standish Group)</Bullet>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Developer Shortage</h3>
            <ul className="list-disc pl-5 space-y-2">
              <Bullet>1.4M unfilled positions globally</Bullet>
              <Bullet>20+ different tools per project</Bullet>
              <Bullet>Learning curve of 6-12 months</Bullet>
              <Bullet>Burnout: 83% of developers consider changing</Bullet>
            </ul>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Accessibility & Inclusion</h3>
          <ul className="list-disc pl-5 space-y-2">
            <Bullet>Inaccessible for people with motor disabilities</Bullet>
            <Bullet>Entry barrier for non-programmers</Bullet>
            <Bullet>Limited diversity in tech industry</Bullet>
            <Bullet>15% of world population has disabilities</Bullet>
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-lg font-semibold mb-3">Real-World Examples</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Startup MVP:</strong> 8 months, €75k, 3 developers
            </div>
            <div>
              <strong>E-commerce:</strong> 12 months, €120k, 5 developers
            </div>
            <div>
              <strong>SaaS Platform:</strong> 18 months, €200k, 8 developers
            </div>
            <div>
              <strong>Mobile App:</strong> 6 months, €60k, 4 developers
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "solution",
    title: "Solution — VULK®",
    icon: <Mic size={18} />,
    content: (
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Revolutionary Voice-to-Code Technology</h3>
          <ul className="list-disc pl-5 space-y-2">
            <Bullet>Say it → See it → Ship it. Complete apps in minutes.</Bullet>
            <Bullet>Frontend + Backend + DB + Auth + Payments + Deploy in minutes.</Bullet>
            <Bullet>Zero configuration. Zero waiting. Multi‑cloud deploy.</Bullet>
            <Bullet>First-in-world Eye Editor Code + Voice Control integration.</Bullet>
          </ul>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <KeyMetric label="Voice‑to‑Code" value="STT + NLP + AST" note="Speech-to-Text + Natural Language Processing + Abstract Syntax Tree" />
          <KeyMetric label="Eye‑Tracking" value="Gaze Editor" note="Patent pending - WebRTC-based gaze detection" />
          <KeyMetric label="AI Agents" value="Multi-Provider" note="Gemini / GPT-4 / OpenRouter with intelligent routing" />
          <KeyMetric label="Full-Stack" value="Next.js + Prisma" note="React framework + Database ORM + Supabase/Express backends" />
          <KeyMetric label="Real-Time Collab" value="WebRTC + CRDT" note="Web Real-Time Communication + Conflict-free Replicated Data Types" />
          <KeyMetric label="One-Click Deploy" value="Multi-Cloud" note="Vercel/Netlify/Cloudflare with SSL + custom domains" />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-lg font-semibold mb-3">Technical Innovation</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>AST-based Patching:</strong> Abstract Syntax Tree deterministic code changes
            </div>
            <div>
              <strong>Quality Gates:</strong> Automated lint, test, security validation
            </div>
            <div>
              <strong>Multi-Provider AI:</strong> Intelligent routing & fallback between providers
            </div>
            <div>
              <strong>Enterprise Security:</strong> GDPR, SOC2, ISO27001 compliance ready
            </div>
            <div>
              <strong>VULK® CDN Library:</strong> Proprietary UI component management system
            </div>
            <div>
              <strong>RAGG Integration:</strong> Retrieval-Augmented Generation with custom knowledge base
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "eye-editor",
    title: "Eye Editor Code — Revolutionary Technology",
    icon: <Eye size={18} />,
    content: (
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">First-in-World Eye-Tracking + Voice Control</h3>
          <ul className="list-disc pl-5 space-y-2">
            <Bullet>Eye-tracking element selection with gaze detection</Bullet>
            <Bullet>Voice commands for code generation and editing</Bullet>
            <Bullet>Hands-free development for accessibility</Bullet>
            <Bullet>Patent-pending technology with competitive moat</Bullet>
          </ul>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <KeyMetric label="Eye-Tracking" value="WebRTC-based" note="Web Real-Time Communication gaze detection" />
          <KeyMetric label="Voice Control" value="STT + NLP" note="Speech-to-Text + Natural Language Processing" />
          <KeyMetric label="Accessibility" value="Hands-free" note="Motor disabilities support" />
          <KeyMetric label="Patent Status" value="Pending" note="Competitive moat protection" />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-lg font-semibold mb-3">Technical Innovation</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Gaze Selector:</strong> Eye-tracking element selection
            </div>
            <div>
              <strong>Voice Commands:</strong> "Make button blue and pulse"
            </div>
            <div>
              <strong>AST Patching:</strong> Deterministic code changes
            </div>
            <div>
              <strong>Real-time Preview:</strong> Instant visual feedback
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "demo",
    title: "Live Demo — Real-World Examples",
    icon: <Rocket size={18} />,
    content: (
      <div className="space-y-6">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Voice Commands → Enterprise-Grade Applications</h3>
          
          {/* Complex Systems Examples */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h4 className="font-semibold mb-3 text-blue-400 flex items-center gap-2">
                <Heart size={18} />
                Healthcare Management System
              </h4>
              <p className="text-sm text-white/80 mb-3">"Create a complete hospital management system with patient records, appointment scheduling, billing, and telemedicine"</p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span>Patient Management:</span><CheckCircle size={16} className="text-green-400" /></div>
                <div className="flex justify-between"><span>Appointment System:</span><CheckCircle size={16} className="text-green-400" /></div>
                <div className="flex justify-between"><span>Billing & Insurance:</span><CheckCircle size={16} className="text-green-400" /></div>
                <div className="flex justify-between"><span>Telemedicine:</span><CheckCircle size={16} className="text-green-400" /></div>
                <div className="flex justify-between"><span>Analytics Dashboard:</span><CheckCircle size={16} className="text-green-400" /></div>
              </div>
              <div className="mt-3 text-xs text-white/60">→ 12 minutes vs 18 months (€500k+)</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h4 className="font-semibold mb-3 text-purple-400 flex items-center gap-2">
                <CreditCard size={18} />
                Banking Platform
              </h4>
              <p className="text-sm text-white/80 mb-3">"Build a full banking platform with accounts, transfers, loans, investments, and compliance reporting"</p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span>Account Management:</span><CheckCircle size={16} className="text-green-400" /></div>
                <div className="flex justify-between"><span>Payment Processing:</span><CheckCircle size={16} className="text-green-400" /></div>
                <div className="flex justify-between"><span>Loan System:</span><CheckCircle size={16} className="text-green-400" /></div>
                <div className="flex justify-between"><span>Investment Tools:</span><CheckCircle size={16} className="text-green-400" /></div>
                <div className="flex justify-between"><span>Compliance Reports:</span><CheckCircle size={16} className="text-green-400" /></div>
              </div>
              <div className="mt-3 text-xs text-white/60">→ 15 minutes vs 24 months (€1M+)</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h4 className="font-semibold mb-3 text-orange-400 flex items-center gap-2">
                <Factory size={18} />
                Manufacturing ERP
              </h4>
              <p className="text-sm text-white/80 mb-3">"Create an enterprise resource planning system with inventory, production, quality control, and supply chain"</p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span>Inventory Management:</span><CheckCircle size={16} className="text-green-400" /></div>
                <div className="flex justify-between"><span>Production Planning:</span><CheckCircle size={16} className="text-green-400" /></div>
                <div className="flex justify-between"><span>Quality Control:</span><CheckCircle size={16} className="text-green-400" /></div>
                <div className="flex justify-between"><span>Supply Chain:</span><CheckCircle size={16} className="text-green-400" /></div>
                <div className="flex justify-between"><span>IoT Integration:</span><CheckCircle size={16} className="text-green-400" /></div>
              </div>
              <div className="mt-3 text-xs text-white/60">→ 18 minutes vs 30 months (€2M+)</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h4 className="font-semibold mb-3 text-green-400 flex items-center gap-2">
                <GraduationCap size={18} />
                EdTech Platform
              </h4>
              <p className="text-sm text-white/80 mb-3">"Build a comprehensive learning management system with courses, assessments, AI tutoring, and analytics"</p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span>Course Creation:</span><CheckCircle size={16} className="text-green-400" /></div>
                <div className="flex justify-between"><span>AI Tutoring:</span><CheckCircle size={16} className="text-green-400" /></div>
                <div className="flex justify-between"><span>Assessment Engine:</span><CheckCircle size={16} className="text-green-400" /></div>
                <div className="flex justify-between"><span>Progress Analytics:</span><CheckCircle size={16} className="text-green-400" /></div>
                <div className="flex justify-between"><span>Mobile Apps:</span><CheckCircle size={16} className="text-green-400" /></div>
              </div>
              <div className="mt-3 text-xs text-white/60">→ 10 minutes vs 12 months (€300k+)</div>
            </div>
          </div>

          {/* Technical Capabilities Showcase */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h4 className="font-semibold mb-4 text-center flex items-center justify-center gap-2">
              <Rocket size={20} />
              VULK® Technical Capabilities
            </h4>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <div className="font-medium text-blue-400">Backend Systems</div>
                <div>• Microservices Architecture</div>
                <div>• Real-time APIs</div>
                <div>• Database Optimization</div>
                <div>• Authentication & Security</div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-purple-400">Frontend Applications</div>
                <div>• React/Next.js/Vue</div>
                <div>• Mobile Apps (React Native)</div>
                <div>• Progressive Web Apps</div>
                <div>• Real-time Dashboards</div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-green-400">AI & Integration</div>
                <div>• Machine Learning Models</div>
                <div>• Third-party APIs</div>
                <div>• Payment Processing</div>
                <div>• Cloud Infrastructure</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <KeyMetric label="Time to Deploy" value="3-7 min" note="vs 2-6 months" tooltip="Complete application deployment time" />
          <KeyMetric label="Cost" value="€0" note="vs €25k-100k" tooltip="Development cost with VULK®" />
          <KeyMetric label="Quality" value="Production" note="Enterprise ready" tooltip="Production-ready code quality" />
        </div>
      </div>
    ),
  },
  {
    id: "capabilities",
    title: "VULK® Capabilities — What We Can Build",
    icon: <Rocket size={18} />,
    content: (
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Full-Stack Applications</h3>
            <ul className="list-disc pl-5 space-y-2">
              <Bullet>Frontend: React, Next.js, Vue, Svelte, Flutter</Bullet>
              <Bullet>Backend: Express, Supabase, Cloudflare Workers, NestJS</Bullet>
              <Bullet>Database: PostgreSQL, MySQL, MongoDB, Redis</Bullet>
              <Bullet>Authentication: OAuth, JWT, SSO, MFA</Bullet>
              <Bullet>Payments: Stripe, PayPal, crypto integration</Bullet>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Advanced Features</h3>
            <ul className="list-disc pl-5 space-y-2">
              <Bullet>Real-time: WebRTC, WebSockets, live collaboration</Bullet>
              <Bullet>AI Integration: Custom RAGG (Retrieval-Augmented Generation), ML models, chatbots</Bullet>
              <Bullet>Scalability: Auto-scaling, load balancing, VULK® CDN</Bullet>
              <Bullet>Security: GDPR, SOC2, encryption, audit logs</Bullet>
              <Bullet>Analytics: Custom dashboards, user tracking</Bullet>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-lg font-semibold mb-3">Project Management & Deployment</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Import/Export:</strong> Full project portability with VULK® CDN
            </div>
            <div>
              <strong>Version Control:</strong> Git integration built-in
            </div>
            <div>
              <strong>One-Click Deploy:</strong> Vercel, Netlify, Cloudflare Pages
            </div>
            <div>
              <strong>Custom Domains:</strong> SSL certificates auto-generated
            </div>
            <div>
              <strong>Environment Management:</strong> Development, staging, production
            </div>
            <div>
              <strong>CI/CD Pipeline:</strong> Continuous Integration/Continuous Deployment
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-4 gap-4">
          <KeyMetric label="Frameworks" value="15+" note="React, Vue, Svelte" />
          <KeyMetric label="Backends" value="8+" note="Express, Supabase" />
          <KeyMetric label="Deploy" value="3+" note="Vercel, Netlify, CF" />
          <KeyMetric label="Quality" value="95%" note="Code quality score" />
        </div>
      </div>
    ),
  },
  {
    id: "market",
    title: "Market — $50B+ TAM",
    icon: <Globe size={18} />,
    content: (
      <div className="space-y-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <KeyMetric label="TAM" value="$50B+" note="Global DevTools" />
          <KeyMetric label="SAM" value="$5B+" note="AI DevTools" />
          <KeyMetric label="SOM" value="$2.7B" note="5% market share" />
        </div>
        
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Market Size & Growth</h3>
            <ul className="list-disc pl-5 space-y-2">
              <Bullet>27M+ developers globally</Bullet>
              <Bullet>5M+ new developers/year</Bullet>
              <Bullet>CAGR AI DevTools: 38.2% (2024–2030)</Bullet>
              <Bullet>€2,000 avg spend/dev/year</Bullet>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Target Segments</h3>
            <ul className="list-disc pl-5 space-y-2">
              <Bullet>Startups: MVPs in hours</Bullet>
              <Bullet>Agencies: 10× faster delivery</Bullet>
              <Bullet>Enterprise: internal tools</Bullet>
              <Bullet>Education and Accessibility</Bullet>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-lg font-semibold mb-3">Market Opportunity</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Developer Shortage:</strong> 1.4M unfilled positions
            </div>
            <div>
              <strong>Tool Fragmentation:</strong> 20+ tools per project
            </div>
            <div>
              <strong>Accessibility Gap:</strong> 15% of population excluded
            </div>
            <div>
              <strong>Productivity Crisis:</strong> 80% projects delayed
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "advantage",
    title: "Competitive Advantage — Why no one can catch us",
    icon: <Eye size={18} />,
    content: (
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Defensive Moat</h3>
            <ul className="list-disc pl-5 space-y-2">
              <Bullet>Voice‑to‑Code + Eye‑tracking (patent pending)</Bullet>
              <Bullet>AST-based (Abstract Syntax Tree) deterministic patching</Bullet>
              <Bullet>Hands‑free development (unique accessibility)</Bullet>
              <Bullet>Network effects: real-time collaboration with WebRTC</Bullet>
              <Bullet>High switching cost: complete workflow integration</Bullet>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Technical Leadership</h3>
            <ul className="list-disc pl-5 space-y-2">
              <Bullet>Voice Control (Speech-to-Text + NLP) — ✅</Bullet>
              <Bullet>Eye‑Tracking (WebRTC gaze detection) — ✅</Bullet>
              <Bullet>Full‑Stack Generation (Frontend + Backend + DB) — ✅</Bullet>
              <Bullet>Auto‑Deploy (Multi-cloud with SSL) — ✅</Bullet>
              <Bullet>Real‑Time Collaboration (WebRTC + CRDT) — ✅</Bullet>
              <Bullet>OAuth/Integrations (GitHub, Google, Stripe) — ✅</Bullet>
              <Bullet>Security Scanning (SAST, DAST, compliance) — ✅</Bullet>
            </ul>
          </div>
        </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold mb-3">Competitive Comparison</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>vs GitHub Copilot:</strong> Full-stack applications vs code completion
                </div>
                <div>
                  <strong>vs Vercel v0:</strong> Voice control + eye-tracking vs text prompts
                </div>
                <div>
                  <strong>vs Bubble:</strong> Code export + VULK® CDN vs no-code lock-in
                </div>
                <div>
                  <strong>vs Retool:</strong> Custom applications vs internal tools only
                </div>
              </div>
            </div>

            {/* Market Share Chart */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold mb-4 text-center">Market Share Projection (2029)</h3>
              <MarketShareChart />
            </div>
      </div>
    ),
  },
  {
    id: "model",
    title: "Business Model — High margin, diversified",
    icon: <LineChart size={18} />,
    content: (
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold">Pricing</h3>
            <ul className="list-disc pl-5 space-y-1">
              <Bullet>Free — €0/mo</Bullet>
              <Bullet>Starter — €19/mo</Bullet>
              <Bullet>Pro — €49/mo</Bullet>
              <Bullet>Enterprise — €199+/mo</Bullet>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Revenue Mix</h3>
            <ul className="list-disc pl-5 space-y-1">
              <Bullet>SaaS Subscriptions — 70%</Bullet>
              <Bullet>Usage‑Based — 25%</Bullet>
              <Bullet>Professional Services — 5%</Bullet>
            </ul>
          </div>
        </div>
        <div className="grid sm:grid-cols-4 gap-4">
          <KeyMetric label="CAC" value="€500" tooltip="Customer Acquisition Cost" />
          <KeyMetric label="LTV" value="€15k" tooltip="Lifetime Value" />
          <KeyMetric label="LTV/CAC" value="30×" tooltip="Lifetime Value to Customer Acquisition Cost ratio" />
          <KeyMetric label="Gross Margin" value="85%" tooltip="Gross profit margin percentage" />
        </div>
      </div>
    ),
  },
  {
    id: "financials",
    title: "Financial Projections — 2025 → 2029",
    icon: <BarChart3 size={18} />,
    content: (
      <div className="space-y-6">
        <div className="grid sm:grid-cols-5 gap-4">
          <KeyMetric label="2025 ARR" value="€500k" note="Pre-launch target" tooltip="Annual Recurring Revenue target" />
          <KeyMetric label="2026 ARR" value="€2.5M" note="Post-launch growth" tooltip="ARR after product launch" />
          <KeyMetric label="2027 ARR" value="€8M" note="Growth phase" tooltip="ARR in growth phase" />
          <KeyMetric label="2028 ARR" value="€25M" note="Scaling phase" tooltip="ARR in scaling phase" />
          <KeyMetric label="2029 ARR" value="€75M" note="Realistic target" tooltip="Realistic ARR target" />
        </div>
        
        {/* Interactive Revenue Chart */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold mb-4 text-center">Revenue Growth Projection</h3>
          <RevenueChart />
        </div>
        
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Revenue Breakdown</h3>
            <ul className="list-disc pl-5 space-y-2">
              <Bullet>SaaS Subscriptions: 70% of revenue</Bullet>
              <Bullet>Usage-Based Pricing: 25% of revenue</Bullet>
              <Bullet>Professional Services: 5% of revenue</Bullet>
              <Bullet>Gross Margin: 85%</Bullet>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Unit Economics</h3>
            <ul className="list-disc pl-5 space-y-2">
              <Bullet>CAC: €500</Bullet>
              <Bullet>LTV: €15,000</Bullet>
              <Bullet>LTV/CAC: 30×</Bullet>
              <Bullet>Payback Period: 3 months</Bullet>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-lg font-semibold mb-3">Exit Strategy</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Exit Year:</strong> 2029 (5-7 years)
            </div>
            <div>
              <strong>Revenue Multiple:</strong> 15× (industry standard)
            </div>
            <div>
              <strong>Exit Valuation:</strong> €8.1B
            </div>
            <div>
              <strong>ROI Potential:</strong> 1,620× for early investors
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "traction",
    title: "Traction — We are launching, not prototyping",
    icon: <Rocket size={18} />,
    content: (
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Product Status</h3>
            <ul className="list-disc pl-5 space-y-2">
              <Bullet>v0.2 (95%) — Core: Frontend + Backend + Deploy + Voice</Bullet>
              <Bullet>v0.3 (Live) — AI Code Review, Real-time Collab, Security</Bullet>
              <Bullet>15+ core features implemented and functional</Bullet>
              <Bullet>95%+ code quality score</Bullet>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Infrastructure Ready</h3>
            <ul className="list-disc pl-5 space-y-2">
              <Bullet>Legal & Compliance — GDPR, ToS, Privacy, Cookie, CMP</Bullet>
              <Bullet>Billing — Stripe live; Support — status, docs, tickets</Bullet>
              <Bullet>Performance — &lt;7s preview, &lt;30s deploy, 99.9% uptime</Bullet>
              <Bullet>Security — Zero critical vulnerabilities</Bullet>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-lg font-semibold mb-3">Technical Metrics</h3>
          <div className="grid sm:grid-cols-4 gap-4 text-sm">
            <div>
              <strong>Code Quality:</strong> 95%+ score
            </div>
            <div>
              <strong>Test Coverage:</strong> 90%+ automated
            </div>
            <div>
              <strong>API Uptime:</strong> 99.9%
            </div>
            <div>
              <strong>Response Time:</strong> &lt;100ms
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "team",
    title: "Founding Team — Builders & Operators",
    icon: <Users size={18} />,
    content: (
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold">João Castro — Co‑Founder & CTO</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <Bullet>10+ years in software engineering and AI</Bullet>
              <Bullet>Full‑stack architecture, LLMs, AST manipulation</Bullet>
              <Bullet>Former technical leader at European scale‑up</Bullet>
              <Bullet>Computer Engineering + AI</Bullet>
              <Bullet>GitHub: @devjoaocastro</Bullet>
              <Bullet>Email: joaocastro@vulk.dev</Bullet>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold">Joana Matos — Co‑Founder & CEO</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <Bullet>20+ years in management and sales</Bullet>
              <Bullet>Strategy, growth and leadership</Bullet>
              <Bullet>Certified Executive and life coach</Bullet>
              <Bullet>Technology oriented services</Bullet>
              <Bullet>LinkedIn: linkedin.com/in/joana-matos77</Bullet>
              <Bullet>Email: joanamatos@vulk.dev</Bullet>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-lg font-semibold mb-3">Team Strengths</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Technical Leadership:</strong> Full-stack expertise
            </div>
            <div>
              <strong>Business Strategy:</strong> Growth & operations
            </div>
            <div>
              <strong>AI/ML Expertise:</strong> Advanced AI implementation
            </div>
            <div>
              <strong>Startup Experience:</strong> Scale-up background
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "roadmap",
    title: "Roadmap — 2025 → 2030",
    icon: <LineChart size={18} />,
    content: (
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold">Q1 2025 — Launch & Validation</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <Bullet>Fechar 5% final (Migration + Planning)</Bullet>
            <Bullet>Product Hunt + dev onboarding</Bullet>
            <Bullet>100 clientes pagantes</Bullet>
            <Bullet>Target: €2.4M ARR</Bullet>
          </ul>
          <h3 className="text-lg font-semibold mt-6">Q2–Q4 2025 — Growth & Enterprise</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <Bullet>1,000+ paying users</Bullet>
            <Bullet>Parcerias: Vercel, Stripe, Supabase</Bullet>
            <Bullet>Enterprise: SSO, RBAC, Compliance</Bullet>
            <Bullet>Preparar Series A</Bullet>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">2026–2027 — Global Expansion</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <Bullet>Localização: PT, EN, ES, FR, DE</Bullet>
            <Bullet>Regiões: EU, US, APAC</Bullet>
            <Bullet>Compliance: GDPR, CCPA, LGPD, HIPAA</Bullet>
            <Bullet>15k users → €72M ARR</Bullet>
          </ul>
          <h3 className="text-lg font-semibold mt-6">2028–2030 — The Future</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <Bullet>Agentes autónomos (autodev)</Bullet>
            <Bullet>AR/VR workspaces</Bullet>
            <Bullet>Integração quântica</Bullet>
            <Bullet>1M+ developers</Bullet>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "investment",
    title: "Investment — Why now? Why us?",
    icon: <BarChart3 size={18} />,
    content: (
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold">Pre‑Seed</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <Bullet>€35k @ €2.5M cap</Bullet>
              <Bullet>Use of Funds: 43% Eye Editor, 29% Core polish, 21% GTM, 7% Legal</Bullet>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Seed (next)</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <Bullet>€350k @ €2.5M cap</Bullet>
              <Bullet>50% Eng (AI/Core), 25% Sales, 15% Mkt/Community, 10% Legal</Bullet>
            </ul>
          </div>
        </div>
        <div className="grid sm:grid-cols-5 gap-4">
          <KeyMetric label="2025" value="2×" note="Conservative" tooltip="Conservative 2x return in year 1" />
          <KeyMetric label="2026" value="5×" note="If milestones met" tooltip="5x return if seed conditions achieved" />
          <KeyMetric label="2027" value="10×" note="Growth phase" tooltip="10x return in growth phase" />
          <KeyMetric label="2029" value="20×" note="Conservative exit" tooltip="Conservative 20x return at exit" />
          <KeyMetric label="Exit" value="€100M" note="Realistic valuation" tooltip="Conservative exit valuation" />
        </div>
      </div>
    ),
  },
  {
    id: "investment-strategy",
    title: "Investment Strategy — Conservative & Realistic",
    icon: <BarChart3 size={18} />,
    content: (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2 flex items-center justify-center gap-2">
            <Target size={20} />
            Pre-Launch Strategy
          </h3>
          <p className="text-sm text-white/80">Realistic expectations, high execution. Market demand drives our confidence.</p>
        </div>

        {/* Short Term - €35k Investment */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold mb-4 text-green-400 flex items-center gap-2">
            <TrendingUp size={20} />
            Short Term (6-12 months) — €35k Pre-Seed
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Use of Funds (Conservative)</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <Bullet>40% — Core Platform Polish (v0.3 → v1.0)</Bullet>
                <Bullet>25% — Eye Editor Development</Bullet>
                <Bullet>20% — Go-to-Market (Beta Users)</Bullet>
                <Bullet>15% — Legal & Operations</Bullet>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Milestones (Pre-Launch)</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <Bullet>1,000 beta users (pre-launch)</Bullet>
                <Bullet>€500k ARR (post-launch)</Bullet>
                <Bullet>v1.0 stable release</Bullet>
                <Bullet>5 enterprise pilots</Bullet>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-sm text-yellow-200">
              <strong>Pre-Launch Target:</strong> €500k ARR by month 12 (realistic for pre-launch)
            </p>
          </div>
        </div>

        {/* Medium Term - Conditions for Next Round */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-400 flex items-center gap-2">
            <Rocket size={20} />
            Medium Term (12-24 months) — €350k Seed Conditions
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Investment Conditions (Must Achieve)</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <Bullet>€2.5M ARR (post-launch growth)</Bullet>
                <Bullet>5,000 paying customers</Bullet>
                <Bullet>Product-market fit validation</Bullet>
                <Bullet>10 enterprise contracts signed</Bullet>
                <Bullet>Team of 12+ people</Bullet>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Market Validation</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <Bullet>Customer retention &gt;80%</Bullet>
                <Bullet>Net Promoter Score &gt;50</Bullet>
                <Bullet>Monthly growth rate &gt;20%</Bullet>
                <Bullet>Competitive differentiation proven</Bullet>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-sm text-blue-200">
              <strong>Seed Round:</strong> €350k @ €2.5M cap (only if conditions met)
            </p>
          </div>
        </div>

        {/* Long Term - Realistic Vision */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold mb-4 text-purple-400 flex items-center gap-2">
            <Zap size={20} />
            Long Term (3-5 years) — Realistic Vision
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">€75M</div>
              <div className="text-sm text-white/70">ARR Target (realistic)</div>
              <div className="text-xs text-white/50 mt-1">Strong growth trajectory</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">€500M</div>
              <div className="text-sm text-white/70">Valuation Target</div>
              <div className="text-xs text-white/50 mt-1">6.7x revenue multiple</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">100×</div>
              <div className="text-sm text-white/70">ROI for Pre-Seed</div>
              <div className="text-xs text-white/50 mt-1">€35k → €3.5M</div>
            </div>
          </div>
        </div>

        {/* Risk Mitigation */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold mb-4 text-red-400 flex items-center gap-2">
            <Shield size={20} />
            Risk Mitigation Strategy
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Market Risks</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <Bullet>Competition from big tech (GitHub, Google)</Bullet>
                <Bullet>Economic downturn affecting dev tools</Bullet>
                <Bullet>AI regulation changes</Bullet>
                <Bullet>Technology adoption slower than expected</Bullet>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Mitigation Actions</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <Bullet>Focus on enterprise customers (stable revenue)</Bullet>
                <Bullet>Build strong moat with patents</Bullet>
                <Bullet>Diversify revenue streams</Bullet>
                <Bullet>Maintain 18+ months runway</Bullet>
              </ul>
            </div>
          </div>
        </div>

        {/* Investment Terms */}
        <div className="grid sm:grid-cols-2 gap-4">
          <KeyMetric label="Pre-Seed Round" value="€35k" note="€2.5M cap" tooltip="Initial investment round" />
          <KeyMetric label="Seed Conditions" value="€350k" note="€2.5M cap" tooltip="Next round if milestones met" />
          <KeyMetric label="Conservative ARR" value="€10M" note="Year 5 target" tooltip="Realistic revenue projection" />
          <KeyMetric label="Conservative ROI" value="20×" note="Pre-seed to exit" tooltip="Conservative return on investment" />
        </div>
      </div>
    ),
  },
  {
    id: "exit-strategy",
    title: "Exit Strategy & Investor Returns",
    icon: <Banknote size={18} />,
    content: (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-green-400 mb-2 flex items-center justify-center gap-2">
            <Banknote size={20} />
            How & When We Pay Investors Back
          </h3>
          <p className="text-sm text-white/80">Clear exit strategy with multiple options and realistic timelines</p>
        </div>

        {/* Exit Options */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h4 className="font-semibold mb-4 text-blue-400 flex items-center gap-2">
              <Building size={18} />
              Strategic Acquisition (Primary)
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <Bullet><strong>Timeline:</strong> 5-7 years (2029-2031)</Bullet>
              <Bullet><strong>Target Buyers:</strong> Microsoft, Google, GitHub, Vercel</Bullet>
              <Bullet><strong>Valuation:</strong> €500M - €1B (6-10x revenue)</Bullet>
              <Bullet><strong>Why Attractive:</strong> Voice-to-Code + Eye-tracking patents</Bullet>
              <Bullet><strong>Integration:</strong> Perfect fit for existing dev tools</Bullet>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h4 className="font-semibold mb-4 text-purple-400 flex items-center gap-2">
              <TrendingUp size={18} />
              IPO Alternative (Secondary)
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <Bullet><strong>Timeline:</strong> 7-10 years (2031-2034)</Bullet>
              <Bullet><strong>Requirements:</strong> €100M+ ARR, profitable</Bullet>
              <Bullet><strong>Valuation:</strong> €2B+ (20x revenue multiple)</Bullet>
              <Bullet><strong>Market:</strong> NASDAQ or Euronext</Bullet>
              <Bullet><strong>Liquidity:</strong> Gradual exit over 2-3 years</Bullet>
            </ul>
          </div>
        </div>

        {/* Investor Returns Timeline */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h4 className="font-semibold mb-4 text-center">Investor Returns Timeline</h4>
          <div className="grid sm:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">2025</div>
              <div className="text-sm text-white/70">2× Return</div>
              <div className="text-xs text-white/50 mt-1">€35k → €70k</div>
              <div className="text-xs text-green-400 mt-1">Series A</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">2026</div>
              <div className="text-sm text-white/70">5× Return</div>
              <div className="text-xs text-white/50 mt-1">€35k → €175k</div>
              <div className="text-xs text-green-400 mt-1">Series B</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">2027</div>
              <div className="text-sm text-white/70">10× Return</div>
              <div className="text-xs text-white/50 mt-1">€35k → €350k</div>
              <div className="text-xs text-green-400 mt-1">Growth Round</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">2029</div>
              <div className="text-sm text-white/70">100× Return</div>
              <div className="text-xs text-white/50 mt-1">€35k → €3.5M</div>
              <div className="text-xs text-green-400 mt-1">Exit Event</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">2031</div>
              <div className="text-sm text-white/70">200× Return</div>
              <div className="text-xs text-white/50 mt-1">€35k → €7M</div>
              <div className="text-xs text-green-400 mt-1">IPO/Exit</div>
            </div>
          </div>
        </div>

        {/* Exit Conditions */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h4 className="font-semibold mb-3">Exit Triggers</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <Bullet>€75M+ ARR achieved</Bullet>
              <Bullet>Market leadership position</Bullet>
              <Bullet>Strategic buyer interest</Bullet>
              <Bullet>Patent portfolio established</Bullet>
              <Bullet>Team ready for integration</Bullet>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h4 className="font-semibold mb-3">Investor Protection</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <Bullet>Liquidation preferences</Bullet>
              <Bullet>Anti-dilution provisions</Bullet>
              <Bullet>Board representation</Bullet>
              <Bullet>Information rights</Bullet>
              <Bullet>Tag-along rights</Bullet>
            </ul>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid sm:grid-cols-4 gap-4">
          <KeyMetric label="Exit Timeline" value="5-7 years" note="Strategic acquisition" tooltip="Expected exit timeline" />
          <KeyMetric label="Exit Valuation" value="€500M" note="6-10x revenue" tooltip="Conservative exit valuation" />
          <KeyMetric label="Pre-Seed ROI" value="100×" note="€35k → €3.5M" tooltip="Return on pre-seed investment" />
          <KeyMetric label="IRR" value="85%" note="Annual return" tooltip="Internal Rate of Return" />
        </div>
      </div>
    ),
  },
  {
    id: "cta",
    title: "Call to Action — Join the revolution",
    icon: <ExternalLink size={18} />,
    content: (
      <div className="space-y-4">
        <ul className="list-disc pl-5 space-y-2">
          <Bullet>First‑mover voice‑to‑code • Product 95% ready • €50B+ market</Bullet>
          <Bullet>Reference unit economics (LTV/CAC 30×) • Complementary team</Bullet>
        </ul>
        <div className="grid sm:grid-cols-3 gap-4">
          <KeyMetric label="Live Demo" value="Schedule" note="See VULK® in action" />
          <KeyMetric label="Due Diligence" value="Pack" note="Tech, legal, financials" />
          <KeyMetric label="Term Sheet" value="Ready" note="Negotiate terms" />
        </div>
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold mb-2">Contacts</h3>
            <ul className="space-y-1 text-white/80">
              <li>Investors — investors@vulk.dev</li>
              <li>João Castro — joaocastro@vulk.dev</li>
              <li>Joana Matos — joanamatos@vulk.dev</li>
              <li>Partnerships — partners@vulk.dev</li>
              <li>Press — press@vulk.dev</li>
              <li>Support — support@vulk.dev</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold mb-2">Links</h3>
            <ul className="space-y-1 text-white/80">
              <li>vulk.dev</li>
              <li>docs.vulk.dev</li>
              <li>status.vulk.dev</li>
              <li>github.com/vulk-dev</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
];

export default function Deck() {
  const [index, setIndex] = useState(0);
  const [showTOC, setShowTOC] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const total = slides.length;
  const current = slides[index];
  const containerRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "l") setIndex((i) => Math.min(i + 1, total - 1));
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "h") setIndex((i) => Math.max(i - 1, 0));
      if (e.key.toLowerCase() === "t") setShowTOC((s) => !s);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  const progress = useMemo(() => ((index + 1) / total) * 100, [index, total]);

  if (!isUnlocked) {
    return <PasswordProtection onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <div className={`w-full h-[90vh] sm:h-screen relative overflow-hidden transition-colors duration-300 ${
      isDark 
        ? 'bg-[#0b0d10] text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Grid layout */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
        isDark 
          ? 'opacity-[0.06]' 
          : 'opacity-[0.03]'
      }`} style={{ 
        backgroundImage: isDark 
          ? "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)" 
          : "radial-gradient(circle at 1px 1px, #000 1px, transparent 0)", 
        backgroundSize: "22px 22px" 
      }} />

      <div className="relative h-full w-full flex">
        {/* TOC */}
        {showTOC && (
          <aside className={`hidden md:flex w-72 flex-col backdrop-blur-sm transition-colors duration-300 ${
            isDark 
              ? 'border-r border-white/10 bg-white/5' 
              : 'border-r border-gray-200 bg-white/80'
          }`}>
            <div className={`px-5 py-4 border-b flex items-center gap-3 ${
              isDark ? 'border-white/10' : 'border-gray-200'
            }`}>
              <img 
                src={isDark ? "/assets/logo-vulk-w.svg" : "/assets/logo-vulk.svg"} 
                alt="VULK" 
                className="w-12 h-8"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className={isDark ? "text-white/30" : "text-gray-300"}>|</div>
              <div className={`text-sm tracking-widest ${
                isDark ? 'text-white/70' : 'text-gray-600'
              }`}>PITCH v1.0</div>
              <button
                onClick={() => setIsDark(!isDark)}
                className={`ml-auto p-2 rounded-lg transition-colors duration-200 ${
                  isDark 
                    ? 'hover:bg-white/10 text-white/70' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
            <nav className="flex-1 overflow-auto px-3 py-3 pb-20 space-y-1">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setIndex(i)}
                  className={`w-full text-left px-3 py-2 rounded-xl transition ${
                    isDark 
                      ? `hover:bg-white/10 ${i === index ? "bg-white/10" : ""}` 
                      : `hover:bg-gray-100 ${i === index ? "bg-gray-100" : ""}`
                  }`}
                >
                  <div className={`text-xs uppercase tracking-wider ${
                    isDark ? 'text-white/60' : 'text-gray-500'
                  }`}>{String(i + 1).padStart(2, "0")}</div>
                  <div className={`text-sm font-medium line-clamp-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>{s.title}</div>
                </button>
              ))}
            </nav>
            <div className={`p-3 text-xs ${
              isDark ? 'text-white/60' : 'text-gray-500'
            }`}>Dicas: ← → para navegar • T para TOC</div>
          </aside>
        )}

        {/* Slide */}
        <main ref={containerRef} className="flex-1">
          <SlideShell title={current.title} subtitle={current.subtitle} icon={current.icon}>
            {current.content}
          </SlideShell>
        </main>
      </div>

      {/* Controls */}
      <div className="fixed bottom-4 left-4 right-4 flex items-center gap-3 z-10">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl transition ${
            isDark 
              ? 'bg-white/10 border border-white/15 hover:bg-white/15 text-white' 
              : 'bg-gray-100 border border-gray-200 hover:bg-gray-200 text-gray-900'
          }`}
        >
          <ArrowLeft size={16} /> Prev
        </button>
        <div className={`flex-1 h-2 rounded-full overflow-hidden ${
          isDark ? 'bg-white/10' : 'bg-gray-200'
        }`}>
          <div className={`h-full transition-all duration-300 ${
            isDark ? 'bg-white/80' : 'bg-gray-600'
          }`} style={{ width: `${progress}%` }} />
        </div>
        <button
          onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl transition ${
            isDark 
              ? 'bg-white/10 border border-white/15 hover:bg-white/15 text-white' 
              : 'bg-gray-100 border border-gray-200 hover:bg-gray-200 text-gray-900'
          }`}
        >
          Next <ArrowRight size={16} />
        </button>
        <button
          onClick={() => setShowTOC((s) => !s)}
          className={`hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs uppercase tracking-wider transition ${
            isDark 
              ? 'bg-white/5 border border-white/10 hover:bg-white/10 text-white' 
              : 'bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-900'
          }`}
        >
          TOC
        </button>
        <div className={`text-xs ml-auto ${
          isDark ? 'text-white/60' : 'text-gray-500'
        }`}>{index + 1}/{total}</div>
      </div>
    </div>
  );
}
