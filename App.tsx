import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, AreaChart, Area, Cell, LabelList
} from 'recharts';
import {
  Gamepad2, Store, Users, TrendingUp, Trophy, Target,
  Smartphone, MapPin, BadgeCheck, Zap, ArrowRight, CheckCircle2,
  Clock, Flame, HelpCircle, Gift, ShoppingBag, Box, Ticket, Bell, Menu, Star, PieChart, Timer, Play, Rocket, MousePointerClick, Gem, Sparkles, Apple, Coins, Banknote, Repeat
} from 'lucide-react';

// Enhanced Market Data with more detail
const marketData = [
  { year: '2021', size: 8, label: '8조', growth: 12 },
  { year: '2022', size: 8.4, label: '8.4조', growth: 5 },
  { year: '2023', size: 8.7, label: '8.7조', growth: 4 },
  { year: '2025', size: 9.2, label: '9.2조', growth: 6 },
];

const revenueData = [
  { step: 'Step 1', label: 'User Action', desc: '광고 참여 & 미션 수행', icon: MousePointerClick, color: 'text-blue-500', bg: 'bg-blue-50' },
  { step: 'Step 2', label: 'Ticket Issue', desc: '응모권(Ticket) 획득', icon: Ticket, color: 'text-violet-500', bg: 'bg-violet-50' },
  { step: 'Step 3', label: 'Prize Draw', desc: '실물 경품 응모', icon: Gift, color: 'text-fuchsia-500', bg: 'bg-fuchsia-50' },
  { step: 'Step 4', label: 'Ad Revenue', desc: '광고주 집행비 수익화', icon: Coins, color: 'text-amber-500', bg: 'bg-amber-50' },
];

// Ad Content Data with Optimized Images (w=800, q=80) for Fast Loading
const adProducts = [
  {
    id: 'time-pick',
    title: "Time Pick",
    subTitle: "Time Earning",
    desc: "참가권을 사용하여 광고에 진입 후, 미니게임을 즐기며 '타임(Time)' 자원을 대량으로 획득하는 컨텐츠입니다. 짧은 시간 내 집중적인 사용자 참여를 유도하여 폭발적인 트래픽과 높은 클릭률(CTR)을 보장합니다.",
    tags: ['Mass Traffic', 'Earning', 'High CTR'],
    effect: "1시간 내 평균 참여자 5만 명, 클릭률 15% 이상 달성",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80", // Clock and Money (Alarm clock on coins)
    icon: Target,
    color: "#f59e0b", // Amber
    accentColor: "#fef3c7"
  },
  {
    id: 'time-attack',
    title: "Time Attack",
    subTitle: "Prize Game",
    desc: "획득한 '타임'을 소모하여 제한 시간 내에 고가 경품 획득에 도전하는 긴박감 넘치는 게임입니다. 지속적인 재도전을 자극하여 사용자의 앱 체류 시간을 극대화하고 반복적인 광고 노출 효과를 창출합니다.",
    tags: ['Retention', 'Play', 'Viral'],
    effect: "평균 체류 시간 15분 이상, 재접속률 40% 증가",
    image: "https://images.unsplash.com/photo-1561414927-6d86591d0c4f?auto=format&fit=crop&w=800&q=80", // Money & Time
    icon: Timer,
    color: "#ef4444", // Red
    accentColor: "#fee2e2"
  },
  {
    id: 'quiz-solving',
    title: "Quiz Solving",
    subTitle: "Brand Education",
    desc: "사용자가 브랜드 관련 퀴즈를 풀고 보상을 받는 학습형 광고입니다. 단순 노출을 넘어 브랜드의 핵심 메시지를 자연스럽게 각인시키며, 높은 정답률을 통해 확실한 인지도 상승 효과를 제공합니다.",
    tags: ['Education', 'Awareness', 'Fun'],
    effect: "브랜드 키워드 검색량 300% 증가, 정답률 90% 이상",
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80", // Quiz Concept
    icon: HelpCircle,
    color: "#8b5cf6", // Violet
    accentColor: "#ede9fe"
  },
  {
    id: 'alpha-matching',
    title: "Alpha Matching",
    subTitle: "Instant Win",
    desc: "참가권을 사용해 알파벳 카드를 뒤집고, 짝을 맞추면 즉시 경품을 획득하는 직관적인 매칭 게임입니다. '즉각적인 보상' 심리를 자극하여 가벼운 마음으로 광고에 접속하게 만들고 높은 참여율을 이끌어냅니다.",
    tags: ['Instant Win', 'Matching', 'O2O'],
    effect: "매장 방문 전환율 12%, 쿠폰 사용률 25% 기록",
    image: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=800&q=80", // Slot Machine (Fixed)
    icon: MapPin,
    color: "#10b981", // Emerald
    accentColor: "#d1fae5"
  },
  {
    id: 'double-event',
    title: "Double Event",
    subTitle: "Social Viral",
    desc: "참가권으로 응모번호를 발급받고, 공식 SNS 라이브 방송에서 당첨을 확인하는 팬덤형 이벤트입니다. 참여 조건으로 '구독'과 '좋아요'를 유도하여 브랜드 채널의 팬덤을 확장하고, 자발적인 바이럴 마케팅 효과를 극대화합니다.",
    tags: ['SNS Growth', 'Live Event', 'Fandom'],
    effect: "SNS 구독자 300% 증가, 게시물 도달률 5배 상승",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80", // Gifts
    icon: Gift,
    color: "#db2777", // Pink-600
    accentColor: "#fce7f3"
  },
  {
    id: 'luxury-gallery',
    title: "Luxury Gallery",
    subTitle: "Premium Chance",
    desc: "참가권을 소모하여 명품 가방, 시계 등 하이엔드 경품 획득에 도전하는 프리미엄 전용관(명품관)입니다. 참여 과정에서 고단가 외부 광고(CPC/CPA)를 자연스럽게 노출하여, 사용자에게는 '대박의 기회'를, 플랫폼에는 '고수익 모델'을 동시에 제공합니다.",
    tags: ['High Value', 'Ad Revenue', 'Premium'],
    effect: "외부 광고 수익(CPC) 200% 증대, 고관여 유저 확보",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80", // Luxury
    icon: Gem,
    color: "#0f172a", // Slate-900 (Black/Gold theme)
    accentColor: "#e2e8f0"
  },
  {
    id: 'experience-center',
    title: "Experience Center",
    subTitle: "O2O Marketing",
    desc: "참가권을 사용하여 식음료, 뷰티, 클래스 등 오프라인 매장의 실물 체험권을 획득하는 O2O 특화 체험관입니다. 온라인 사용자의 발길을 실제 오프라인 매장으로 이끄는 'Drive-to-Store' 효과를 통해 광고주에게 확실한 신규 고객 유입을 보장합니다.",
    tags: ['Drive to Store', 'Voucher', 'Local Ad'],
    effect: "오프라인 매장 방문율 40% 증가, 신규 고객 유입 확대",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80", // VR Experience
    icon: Store,
    color: "#f97316", // Orange-500
    accentColor: "#ffedd5"
  }
];

const FeatureCard = ({ icon: Icon, title, sub, description, delay, highlight }: { icon: any, title: string, sub: string, description: string, delay: number, highlight?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay, duration: 0.6, type: "spring" }}
    className="bg-white p-10 lg:p-12 rounded-[2.5rem] shadow-[0_2px_8px_0_rgba(0,0,0,0.04),0_8px_24px_-4px_rgba(0,0,0,0.08),0_16px_48px_-8px_rgba(0,0,0,0.12)] hover:shadow-[0_4px_16px_0_rgba(139,92,246,0.08),0_12px_32px_-4px_rgba(139,92,246,0.16),0_24px_64px_-8px_rgba(139,92,246,0.24)] transition-all duration-700 ease-out hover:-translate-y-4 hover:scale-[1.02] border border-slate-100/50 hover:border-violet-200/60 group relative overflow-hidden h-full backdrop-blur-sm bg-gradient-to-br from-white via-white to-slate-50/30"
  >
    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-700 transform group-hover:scale-110 group-hover:rotate-12 origin-top-right">
      <Icon size={140} className="text-violet-500" />
    </div>
    <div className="relative z-10">
      <div className="h-16 w-16 lg:h-18 lg:w-18 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50/50 rounded-[1.125rem] flex items-center justify-center mb-7 lg:mb-9 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5),0_2px_8px_-2px_rgba(139,92,246,0.1)] group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),0_4px_16px_-2px_rgba(139,92,246,0.2)] transition-all duration-700 border border-violet-100/40 group-hover:border-fuchsia-200/60 group-hover:scale-110 group-hover:rotate-3">
        <Icon className="text-violet-600 group-hover:text-fuchsia-600 w-6 h-6 lg:w-7 lg:h-7 transition-colors duration-300" />
      </div>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] lg:text-[11px] font-bold text-violet-600 uppercase tracking-widest bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100 group-hover:bg-violet-50 group-hover:border-violet-100 transition-colors">{sub}</span>
        {highlight && <span className="text-[10px] font-bold text-amber-500 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100 flex items-center gap-1"><Sparkles size={10} />{highlight}</span>}
      </div>
      <h3 className="text-2xl lg:text-[1.75rem] font-black text-slate-900 mb-4 lg:mb-5 tracking-[-0.01em] leading-[1.3] group-hover:text-transparent bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:via-fuchsia-500 group-hover:to-violet-600 transition-all duration-700" style={{ fontFeatureSettings: '"ss01", "cv05"' }}>{title}</h3>
      <p className="text-slate-600 leading-[1.75] break-keep text-[15px] lg:text-base font-medium text-shadow-sm">{description}</p>
    </div>
  </motion.div>
);

// Enhanced Ad Content Component
const AdContentItem: React.FC<{
  title: string;
  subTitle: string;
  desc: string;
  effect: string;
  tags: string[];
  image: string;
  icon: any;
  color: string;
  delay: number;
  accentColor: string;
  disableAnimation?: boolean;
}> = ({ title, subTitle, desc, effect, tags, image, icon: Icon, color, delay, accentColor, disableAnimation }) => {
  const content = (
    <div
      className="group relative overflow-hidden rounded-[2.5rem] bg-white shadow-[0_15px_40px_-10px_rgba(148,163,184,0.1)] hover:shadow-[0_25px_60px_-12px_rgba(139,92,246,0.15)] border border-slate-100 transition-all duration-500 hover:-translate-y-1 flex flex-col h-full select-none"
    >
      {/* Colorful Accent Glow - Reduced opacity */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-10 transition-all duration-500 group-hover:opacity-30" style={{ backgroundColor: accentColor }}></div>
      <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}></div>

      {/* Image Section - Uniform Height enforced (lg:h-80, h-56 for mobile) */}
      <div className="relative h-56 lg:h-80 w-full overflow-hidden bg-slate-100 order-1 flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-in-out pointer-events-none"
          loading="lazy"
        />
        {/* Smooth Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10"></div>
      </div>

      {/* Content Section - Placed at Bottom */}
      <div className="p-6 lg:p-8 flex flex-col bg-white order-2 flex-1 relative z-20">
        <div className="flex items-center justify-between mb-4 lg:mb-6">
          <div className={`p-2.5 lg:p-3 rounded-2xl shadow-sm transition-transform duration-500 group-hover:scale-110 border border-slate-100 bg-slate-50`} style={{ color: color }}>
            <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
          </div>
          <div className="flex gap-1.5 flex-wrap justify-end">
            {tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="text-[9px] lg:text-[10px] font-bold px-2 lg:px-2.5 py-1 bg-slate-50 text-slate-700 rounded-full uppercase tracking-wide border border-slate-200 group-hover:border-slate-300 transition-colors">{tag}</span>
            ))}
          </div>
        </div>

        <div className="mb-auto">
          <span className="text-[10px] lg:text-xs font-bold tracking-widest uppercase text-slate-500 mb-1.5 lg:mb-2 block">{subTitle}</span>
          <h3 className="text-xl lg:text-2xl font-black text-slate-900 mb-3 lg:mb-4 leading-tight tracking-tight">{title}</h3>
          <p className="text-slate-600 text-sm lg:text-[15px] leading-6 lg:leading-7 font-medium break-keep mb-5 lg:mb-6">
            {desc}
          </p>
        </div>

        <div className="mt-4 lg:mt-6 pt-4 lg:pt-6 border-t border-slate-100">
          <div className="text-[9px] lg:text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 lg:mb-3 flex items-center gap-1">
            <Target size={12} className="text-violet-400" /> Expected Effect
          </div>
          <div className="text-xs lg:text-sm font-bold text-slate-800 break-keep flex items-start gap-2 lg:gap-3 bg-slate-50 p-3 lg:p-4 rounded-2xl border border-slate-100 group-hover:bg-white group-hover:shadow-md transition-all">
            <div className="mt-0.5 flex-shrink-0 p-1 rounded-full text-white shadow-sm" style={{ backgroundColor: accentColor }}>
              <CheckCircle2 size={12} strokeWidth={3} className="lg:w-[14px] lg:h-[14px]" />
            </div>
            {effect}
          </div>
        </div>
      </div>
    </div>
  );

  if (disableAnimation) return content;

  return content;
};

const AppIcon = ({ icon: Icon, label, color = "text-slate-700", bg = "bg-white", border = "border-slate-100" }: { icon: any, label: string, color?: string, bg?: string, border?: string }) => (
  <div className="flex flex-col items-center justify-center gap-1.5 lg:gap-2 group cursor-pointer">
    <div className={`w-[46px] h-[46px] lg:w-[56px] lg:h-[56px] rounded-[18px] lg:rounded-[22px] ${bg} ${border} flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.03)] border group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] group-hover:-translate-y-1 transition-all duration-300 relative overflow-hidden`}>
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
      <Icon className={`w-5 h-5 lg:w-6 lg:h-6 ${color}`} />
    </div>
    <span className="text-[10px] lg:text-[11px] font-bold text-slate-600 tracking-tight group-hover:text-violet-600 transition-colors whitespace-nowrap">{label}</span>
  </div>
);

// Star generation helper
interface StarProps {
  id: number;
  top: number;
  left: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

export default function App() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [graphKey, setGraphKey] = useState(0);
  const graphRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic for Marquee
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        // If scrolled to the end of the first set (approximately half width), reset to 0
        // We add 1px buffer to ensure smooth transition
        if (scrollContainer.scrollLeft >= (scrollContainer.scrollWidth / 2)) {
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += 0.5; // Adjust speed here (0.5 for smooth/slow, 1 for fast)
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  // Graph animation on scroll
  useEffect(() => {
    const graphElement = graphRef.current;
    if (!graphElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger animation by changing key
            setGraphKey((prev) => prev + 1);
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% visible
    );

    observer.observe(graphElement);

    return () => {
      if (graphElement) {
        observer.unobserve(graphElement);
      }
    };
  }, []);


  // Generate random stars once
  // OPTIMIZATION: Reduced star count from 150 to 50 for mobile performance
  const stars = useMemo<StarProps[]>(() => {
    return Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      // Varied star sizes: 1 to 3px
      size: Math.random() < 0.6 ? 1.5 : Math.random() < 0.9 ? 2 : 3,
      opacity: Math.random() * 0.7 + 0.3,
      // Randomize animation duration for twinkle effect
      duration: Math.random() * 2 + 2, // 2s to 4s
      delay: Math.random() * 3,
    }));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 overflow-x-hidden font-sans selection:bg-fuchsia-200 selection:text-fuchsia-900">
      <Navbar />

      {/* Hero Section - Turquoise Galaxy Theme */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-slate-950" id="vision">
        {/* Galaxy/Space Background */}
        <div className="absolute inset-0 pointer-events-none transform-gpu">
          {/* Noise Overlay - Optimized: Removed mix-blend-soft-light for performance */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 z-10"></div>

          {/* Realistic Random Stars - Optimized: Added will-change-opacity */}
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white will-change-opacity shadow-[0_0_4px_rgba(255,255,255,0.8)]"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                // Use the custom 'twinkle' animation defined in index.html/tailwind config
                animation: `twinkle ${star.duration}s ease-in-out infinite ${star.delay}s`,
              }}
            />
          ))}

          {/* Shooting Star Effect */}
          <div className="absolute top-0 right-[20%] w-[2px] h-[100px] bg-gradient-to-b from-transparent via-white to-transparent rotate-45 opacity-0 animate-[blob_5s_infinite]"></div>

          {/* Nebula Gradients - Optimized: Removed heavy filters and mix-blend modes for mobile */}
          <div className="absolute top-[-20%] right-[-10%] w-[800px] lg:w-[1200px] h-[800px] lg:h-[1200px] bg-teal-600/20 rounded-full filter blur-[80px] lg:blur-[120px] animate-blob will-change-transform"></div>
          <div className="absolute bottom-[-10%] left-[-20%] w-[600px] lg:w-[900px] h-[600px] lg:h-[900px] bg-cyan-800/30 rounded-full filter blur-[80px] lg:blur-[100px] animate-blob animation-delay-2000 will-change-transform"></div>
          <div className="absolute top-[40%] left-[30%] w-[500px] lg:w-[700px] h-[500px] lg:h-[700px] bg-violet-900/30 rounded-full filter blur-[80px] lg:blur-[100px] animate-blob animation-delay-4000 will-change-transform"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full pt-28 pb-12 lg:pt-32 lg:pb-20">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 xl:col-span-7 relative z-20"
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-cyan-300 text-xs font-bold mb-8 lg:mb-10 backdrop-blur-md uppercase tracking-widest shadow-sm hover:shadow-md transition-all cursor-default">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                </span>
                Series A Fundraising Open
              </div>

              <h1 className="text-[3rem] sm:text-6xl lg:text-[6rem] font-black text-white leading-[1.05] lg:leading-[1.02] mb-8 lg:mb-10 tracking-[-0.02em] break-keep drop-shadow-2xl">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-violet-300 mb-2 pb-1 drop-shadow-sm">
                  Play, Earn, Spend.
                </span>
                {/* Plain text without highlight */}
                <span className="drop-shadow-md">
                  The Next Gen
                </span>
                <br />
                Ad-Tech Platform.
              </h1>

              <p className="text-lg lg:text-2xl text-slate-200 mb-12 lg:mb-16 max-w-2xl leading-relaxed font-medium pl-6 lg:pl-8 border-l-4 border-teal-400/60 drop-shadow-lg">
                <strong>MONGSTARZ</strong>는 게이미피케이션(Gamification)과 지역 기반(Local) 혜택을 결합하여,
                소비자에게는 <span className="text-white font-bold text-shadow-sm">확실한 보상</span>을,
                파트너에게는 <span className="text-white font-bold text-shadow-sm">실구매 전환</span>을 제공하는 혁신적인 광고 플랫폼입니다.
              </p>

              {/* Mobile Buttons Side-by-Side with Equal Size and Fixed Width for Desktop */}
              <div className="flex flex-row w-full sm:w-auto gap-3 lg:gap-5">
                <a
                  href="https://play.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:w-48 px-5 py-4 rounded-[1.125rem] font-extrabold text-sm lg:text-lg transition-all duration-500 flex items-center justify-center gap-2 lg:gap-3 group hover:-translate-y-2 hover:scale-105 shadow-[0_4px_16px_rgba(45,212,191,0.25),0_8px_32px_rgba(45,212,191,0.15),inset_0_1px_0_rgba(255,255,255,0.4)] hover:shadow-[0_8px_24px_rgba(45,212,191,0.4),0_16px_48px_rgba(45,212,191,0.25),inset_0_1px_0_rgba(255,255,255,0.6)] bg-gradient-to-br from-teal-300 via-emerald-300 to-emerald-400 text-slate-900 border border-teal-200/60 hover:border-teal-100 relative overflow-hidden"
                >
                  <div className="bg-slate-900/10 p-1.5 rounded-full transition-all group-hover:bg-slate-900/15 group-hover:scale-110">
                    <Play size={18} className="fill-current text-slate-900 lg:w-5 lg:h-5" />
                  </div>
                  <span>Android</span>
                </a>
                <a
                  href="https://apps.apple.com/kr"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:w-48 px-5 py-4 rounded-[1.125rem] font-extrabold text-sm lg:text-lg transition-all duration-500 flex items-center justify-center gap-2 lg:gap-3 group hover:-translate-y-2 hover:scale-105 shadow-[0_4px_16px_rgba(99,102,241,0.25),0_8px_32px_rgba(99,102,241,0.15),inset_0_1px_0_rgba(255,255,255,0.15)] hover:shadow-[0_8px_24px_rgba(99,102,241,0.4),0_16px_48px_rgba(99,102,241,0.25),inset_0_1px_0_rgba(255,255,255,0.25)] bg-gradient-to-br from-indigo-500 via-violet-500 to-violet-600 text-white border border-indigo-400/60 hover:border-indigo-300/70 relative overflow-hidden"
                >
                  <div className="bg-white/20 p-1.5 rounded-full transition-all group-hover:bg-white/30 group-hover:scale-110">
                    <Apple size={18} className="fill-current text-white mb-0.5 lg:w-5 lg:h-5" />
                  </div>
                  <span>iOS</span>
                </a>
              </div>

              <div className="mt-14 lg:mt-20 grid grid-cols-3 gap-4 lg:gap-8 border-t border-white/10 pt-8 lg:pt-10 text-white">
                <div className="group cursor-default">
                  <div className="text-2xl lg:text-5xl font-black mb-1 lg:mb-2 text-white group-hover:text-teal-300 transition-colors drop-shadow-md">99<span className="text-lg lg:text-2xl text-teal-400 align-top">%</span></div>
                  <div className="text-[10px] lg:text-sm text-slate-300 font-bold uppercase tracking-wide">Ad Engagement<br />(광고 몰입도)</div>
                </div>
                <div className="group cursor-default">
                  <div className="text-2xl lg:text-5xl font-black mb-1 lg:mb-2 text-white group-hover:text-cyan-300 transition-colors drop-shadow-md">3.5<span className="text-lg lg:text-2xl text-cyan-400 align-top">X</span></div>
                  <div className="text-[10px] lg:text-sm text-slate-300 font-bold uppercase tracking-wide">Higher ROAS<br />(광고 효율)</div>
                </div>
                <div className="group cursor-default">
                  <div className="text-2xl lg:text-5xl font-black mb-1 lg:mb-2 text-white group-hover:text-violet-300 transition-colors drop-shadow-md">Pat.<span className="text-lg lg:text-2xl text-violet-400 align-top">✔</span></div>
                  <div className="text-[10px] lg:text-sm text-slate-300 font-bold uppercase tracking-wide">BM Patent<br />(특허 등록)</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 80, rotate: 5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.2, type: "spring", stiffness: 40 }}
              className="lg:col-span-6 xl:col-span-5 relative block mt-16 lg:mt-0 perspective-1000"
            >
              {/* Phone Mockup - FIXED: Removed hover scales and movement */}
              <div className="relative mx-auto w-[300px] h-[640px] lg:w-[360px] lg:h-[760px] bg-[#1a1a1a] rounded-[3rem] lg:rounded-[3.5rem] border-[6px] lg:border-[8px] border-[#2a2a2a] shadow-[0_0_50px_rgba(45,212,191,0.3)] overflow-hidden z-20">
                {/* Glossy Reflection */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none z-50 rounded-[2.5rem] mix-blend-overlay"></div>

                {/* Dynamic Island */}
                <div className="absolute top-0 w-full h-10 lg:h-12 z-50 flex justify-center pt-3 lg:pt-4 pointer-events-none">
                  <div className="w-28 lg:w-32 h-7 lg:h-8 bg-black rounded-full flex items-center justify-center gap-3 px-3 shadow-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                  </div>
                </div>

                {/* App Screen - FIXED: overflow-hidden to prevent scroll movement */}
                <div className="w-full h-full bg-[#F8FAFC] flex flex-col relative overflow-hidden font-sans text-slate-800 pt-10 lg:pt-12">
                  {/* Header */}
                  <div className="px-5 lg:px-6 py-3 lg:py-4 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-extrabold text-violet-500 uppercase tracking-widest">My Point</span>
                      <div className="flex items-center gap-1">
                        <span className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">12,500</span>
                        <span className="text-xs lg:text-sm font-bold text-amber-500">P</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 cursor-pointer transition-colors relative shadow-sm">
                        <Bell size={16} className="text-slate-600" />
                        <div className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-bounce"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-hidden pb-24 lg:pb-28">
                    {/* Main Event Banner - Time Attack (Vibrant) */}
                    <div className="px-4 lg:px-5 pt-4 lg:pt-5 pb-3">
                      <div className="w-full h-[240px] lg:h-[280px] rounded-[2rem] lg:rounded-[2.5rem] bg-slate-900 relative overflow-hidden shadow-[0_20px_40px_-10px_rgba(239,68,68,0.2)] group cursor-pointer ring-4 ring-white">
                        <img
                          src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600"
                          alt="Coffee"
                          className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                        <div className="absolute top-5 left-5 bg-red-500/90 backdrop-blur-md text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1.5 ring-2 ring-red-400/50">
                          <Clock size={12} className="animate-spin-slow" /> Time Attack
                        </div>
                        <div className="absolute bottom-6 lg:bottom-7 left-6 lg:left-7 right-7 text-white z-10">
                          <div className="text-3xl lg:text-4xl font-black mb-1 leading-[0.9] tracking-tight drop-shadow-lg">Starbucks<br />Americano</div>
                          <div className="flex items-center justify-between mt-4 lg:mt-5">
                            <div className="text-[10px] font-bold text-white/90 bg-white/20 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/20">13:00 Open</div>
                            <button className="bg-white text-red-500 text-[10px] lg:text-xs font-black px-5 py-2.5 lg:px-6 lg:py-3 rounded-full hover:bg-red-50 transition-colors shadow-lg transform active:scale-95 border border-white">참여하기</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Grid - Icons with colorful backgrounds */}
                    <div className="px-4 lg:px-5 py-3 lg:py-4">
                      <div className="bg-white rounded-[2rem] lg:rounded-[2.5rem] p-6 lg:p-7 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.03)] border border-slate-100">
                        <div className="grid grid-cols-4 gap-x-2 lg:gap-x-3 gap-y-5 lg:gap-y-6">
                          <AppIcon icon={Target} label="타임 픽" color="text-amber-600" bg="bg-amber-50" border="border-amber-100" />
                          <AppIcon icon={Timer} label="타임 어택" color="text-rose-600" bg="bg-rose-50" border="border-rose-100" />
                          <AppIcon icon={Trophy} label="타임 킹" color="text-violet-600" bg="bg-violet-50" border="border-violet-100" />
                          <AppIcon icon={HelpCircle} label="퀴즈 풀이" color="text-cyan-600" bg="bg-cyan-50" border="border-cyan-100" />

                          <AppIcon icon={MapPin} label="알파 매칭" />
                          <AppIcon icon={Gift} label="더블 이벤트" />
                          <AppIcon icon={Gem} label="명품관" />
                          <AppIcon icon={Store} label="체험관" />
                        </div>
                      </div>
                    </div>

                    {/* Scrolling Ticker */}
                    <div className="pl-5 lg:pl-6 mb-6 lg:mb-8">
                      <h3 className="font-bold text-slate-800 text-xs lg:text-sm mb-3 lg:mb-4 flex items-center gap-2">
                        <span className="relative flex h-2 lg:h-2.5 w-2 lg:w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-full w-full bg-rose-500"></span>
                        </span>
                        실시간 당첨 현황
                      </h3>
                      <div className="flex gap-3 lg:gap-4 overflow-x-auto pr-6 pb-2 no-scrollbar snap-x">
                        {[1, 2, 3, 4].map((_, i) => (
                          <div key={i} className="flex-shrink-0 w-44 lg:w-48 bg-white rounded-2xl p-3 lg:p-4 border border-slate-100 shadow-[0_4px_12px_rgba(0,0,0,0.03)] flex items-center gap-3 snap-start hover:-translate-y-1 transition-transform cursor-pointer">
                            <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-slate-50 flex-shrink-0 overflow-hidden border border-slate-100">
                              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 50}`} alt="user" className="w-full h-full" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] text-slate-500 font-medium tracking-tight">user***님</span>
                              <span className="text-xs font-bold text-violet-600">치킨세트 당첨!</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Custom Tab Bar */}
                  <div className="absolute bottom-0 w-full h-[90px] lg:h-[100px] bg-white border-t border-slate-100 flex justify-around items-start pt-4 lg:pt-5 px-6 rounded-t-[2.5rem] lg:rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50">
                    <div className="flex flex-col items-center gap-1.5 w-16 group cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
                      <Store className="w-6 h-6 text-slate-800" />
                    </div>
                    <div className="flex flex-col items-center gap-1.5 w-16 relative -top-8 lg:-top-9 cursor-pointer group">
                      <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-tr from-violet-600 to-fuchsia-500 rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(139,92,246,0.4)] border-[5px] lg:border-[6px] border-[#F8FAFC] group-hover:scale-110 transition-transform group-hover:shadow-fuchsia-500/50">
                        <Gamepad2 className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 w-16 group cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
                      <Users className="w-6 h-6 text-slate-800" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Social Proof Widgets with Glassmorphism */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute top-28 lg:top-40 right-0 lg:-right-8 bg-white/80 backdrop-blur-xl p-3 lg:p-5 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.05)] flex items-center gap-2.5 lg:gap-4 z-30 border border-white/80 ring-1 ring-white/50 scale-75 lg:scale-100"
              >
                <div className="bg-emerald-50 p-2.5 lg:p-3 rounded-2xl shadow-inner border border-emerald-100"><TrendingUp className="text-emerald-600 w-5 h-5 lg:w-6 lg:h-6" /></div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Retention Rate</div>
                  <div className="text-xl lg:text-2xl font-black text-slate-800 tracking-tight">Day 7 <span className="text-emerald-500">68%</span></div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-28 lg:bottom-40 left-0 lg:-left-12 bg-white/80 backdrop-blur-xl p-3 lg:p-5 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.05)] flex items-center gap-2.5 lg:gap-4 z-30 border border-white/80 ring-1 ring-white/50 scale-75 lg:scale-100"
              >
                <div className="bg-amber-50 p-2.5 lg:p-3 rounded-2xl shadow-inner border border-amber-100"><Star className="text-amber-500 w-5 h-5 lg:w-6 lg:h-6 fill-amber-500" /></div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">App Store Rating</div>
                  <div className="text-xl lg:text-2xl font-black text-slate-800 tracking-tight">4.8 <span className="text-xs lg:text-sm text-slate-500 font-medium">/ 5.0</span></div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Market Stats with Enhanced Visuals */}
      <section className="py-24 lg:py-40 bg-white relative" id="market">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <span className="text-violet-600 font-bold tracking-widest text-xs uppercase bg-violet-50 px-4 py-1.5 rounded-full border border-violet-100">Market Insight</span>
            <h2 className="text-4xl lg:text-6xl font-black mt-8 mb-8 lg:mb-10 text-slate-900 leading-[1.1] tracking-[-0.01em]">
              '보상'이 곧 '마케팅'이 되는<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500">차세대 광고 시장</span>의 도래
            </h2>
            <p className="text-slate-600 text-lg lg:text-xl break-keep font-medium leading-relaxed">
              전통적인 디스플레이 광고(DA)의 효율 저하로 인해,<br className="hidden md:block" /> 사용자가 능동적으로 참여하고 보상을 획득하는 <strong>Reward-based Ad Tech</strong>가 유일한 대안으로 떠오르고 있습니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
            <div className="p-10 lg:p-12 bg-gradient-to-br from-white via-white to-violet-50/20 rounded-[2.5rem] border border-violet-100/60 hover:border-violet-300/60 transition-all duration-700 shadow-[0_2px_8px_0_rgba(0,0,0,0.04),0_8px_24px_-4px_rgba(139,92,246,0.08),0_16px_48px_-8px_rgba(139,92,246,0.12)] hover:shadow-[0_4px_12px_0_rgba(139,92,246,0.1),0_12px_32px_-4px_rgba(139,92,246,0.2),0_24px_64px_-8px_rgba(139,92,246,0.3)] hover:-translate-y-4 hover:scale-[1.02] group backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6 lg:mb-8">
                <div className="p-4 lg:p-5 bg-gradient-to-br from-violet-50 to-violet-100/60 rounded-2xl shadow-[0_2px_8px_-2px_rgba(139,92,246,0.15),inset_0_1px_0_rgba(255,255,255,0.5)] group-hover:shadow-[0_4px_12px_-2px_rgba(139,92,246,0.25),inset_0_1px_0_rgba(255,255,255,0.7)] transition-all duration-700 group-hover:scale-110 group-hover:rotate-3 border border-violet-200/40"><Users className="text-violet-600 w-6 h-6 lg:w-7 lg:h-7" /></div>
                <div className="text-[10px] lg:text-xs font-bold text-violet-600 bg-violet-50 px-3 py-1.5 rounded-lg border border-violet-100">MAU Growth</div>
              </div>
              <div className="text-5xl lg:text-6xl font-black text-slate-900 mb-5 tracking-[-0.02em] leading-none">1,022<span className="text-2xl lg:text-3xl text-slate-400 font-bold ml-2" style={{ fontFeatureSettings: '"tnum"' }}>만</span></div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden my-5">
                <div className="h-full bg-violet-500 w-[80%] rounded-full"></div>
              </div>
              <p className="text-sm text-slate-600 font-bold">국내 리워드 앱 실사용자 수 (2024)</p>
            </div>

            <div className="p-10 lg:p-12 bg-gradient-to-br from-white via-white to-fuchsia-50/20 rounded-[2.5rem] border border-fuchsia-100/60 hover:border-fuchsia-300/60 transition-all duration-700 shadow-[0_2px_8px_0_rgba(0,0,0,0.04),0_8px_24px_-4px_rgba(232,121,249,0.08),0_16px_48px_-8px_rgba(232,121,249,0.12)] hover:shadow-[0_4px_12px_0_rgba(232,121,249,0.1),0_12px_32px_-4px_rgba(232,121,249,0.2),0_24px_64px_-8px_rgba(232,121,249,0.3)] hover:-translate-y-4 hover:scale-[1.02] group backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6 lg:mb-8">
                <div className="p-4 lg:p-5 bg-gradient-to-br from-fuchsia-50 to-fuchsia-100/60 rounded-2xl shadow-[0_2px_8px_-2px_rgba(232,121,249,0.15),inset_0_1px_0_rgba(255,255,255,0.5)] group-hover:shadow-[0_4px_12px_-2px_rgba(232,121,249,0.25),inset_0_1px_0_rgba(255,255,255,0.7)] transition-all duration-700 group-hover:scale-110 group-hover:rotate-3 border border-fuchsia-200/40"><TrendingUp className="text-fuchsia-600 w-6 h-6 lg:w-7 lg:h-7" /></div>
                <div className="text-[10px] lg:text-xs font-bold text-fuchsia-600 bg-fuchsia-50 px-3 py-1.5 rounded-lg border border-fuchsia-100">CAGR</div>
              </div>
              <div className="text-5xl lg:text-6xl font-black text-slate-900 mb-5 tracking-[-0.02em] leading-none">21.5<span className="text-2xl lg:text-3xl text-slate-400 font-bold ml-2" style={{ fontFeatureSettings: '"tnum"' }}>%</span></div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden my-5">
                <div className="h-full bg-fuchsia-500 w-[60%] rounded-full"></div>
              </div>
              <p className="text-sm text-slate-600 font-bold">연평균 시장 성장률 (2021-2025)</p>
            </div>

            <div className="p-10 lg:p-12 bg-gradient-to-br from-white via-white to-amber-50/20 rounded-[2.5rem] border border-amber-100/60 hover:border-amber-300/60 transition-all duration-700 shadow-[0_2px_8px_0_rgba(0,0,0,0.04),0_8px_24px_-4px_rgba(251,191,36,0.08),0_16px_48px_-8px_rgba(251,191,36,0.12)] hover:shadow-[0_4px_12px_0_rgba(251,191,36,0.1),0_12px_32px_-4px_rgba(251,191,36,0.2),0_24px_64px_-8px_rgba(251,191,36,0.3)] hover:-translate-y-4 hover:scale-[1.02] group backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6 lg:mb-8">
                <div className="p-4 lg:p-5 bg-gradient-to-br from-amber-50 to-amber-100/60 rounded-2xl shadow-[0_2px_8px_-2px_rgba(251,191,36,0.15),inset_0_1px_0_rgba(255,255,255,0.5)] group-hover:shadow-[0_4px_12px_-2px_rgba(251,191,36,0.25),inset_0_1px_0_rgba(255,255,255,0.7)] transition-all duration-700 group-hover:scale-110 group-hover:rotate-3 border border-amber-200/40"><PieChart className="text-amber-600 w-6 h-6 lg:w-7 lg:h-7" /></div>
                <div className="text-[10px] lg:text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">Total Market</div>
              </div>
              <div className="text-5xl lg:text-6xl font-black text-slate-900 mb-5 tracking-[-0.02em] leading-none">9.2<span className="text-2xl lg:text-3xl text-slate-400 font-bold ml-2" style={{ fontFeatureSettings: '"tnum"' }}>조</span></div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden my-5">
                <div className="h-full bg-amber-500 w-[90%] rounded-full"></div>
              </div>
              <p className="text-sm text-slate-600 font-bold">2025년 예상 전체 시장 규모</p>
            </div>
          </div>

          <motion.div
            ref={graphRef}
            className="bg-white rounded-[3rem] p-6 lg:p-12 border border-slate-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-50/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div className="relative z-10">
              <h3 className="text-2xl lg:text-3xl font-black text-slate-900 mb-2 text-center">Market Size Forecast</h3>
              <p className="text-slate-500 text-center mb-10 font-medium text-sm lg:text-base">지속적인 성장이 예측되는 리워드 광고 시장</p>

              <div className="h-[320px] lg:h-[450px] w-full flex justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart key={graphKey} data={marketData} margin={{ top: 40, right: 10, left: -20, bottom: 20 }} barSize={50}>
                    <defs>
                      <filter id="barShadow" height="130%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
                        <feOffset dx="0" dy="4" result="offsetblur" />
                        <feFlood floodColor="rgba(139, 92, 246, 0.3)" />
                        <feComposite in2="offsetblur" operator="in" />
                        <feMerge>
                          <feMergeNode />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <linearGradient id="barGradient2021" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#818cf8" stopOpacity={1} />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity={1} />
                      </linearGradient>
                      <linearGradient id="barGradient2022" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#a78bfa" stopOpacity={1} />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity={1} />
                      </linearGradient>
                      <linearGradient id="barGradient2023" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#c084fc" stopOpacity={1} />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity={1} />
                      </linearGradient>
                      <linearGradient id="barGradient2025" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#e879f9" stopOpacity={1} />
                        <stop offset="100%" stopColor="#d946ef" stopOpacity={1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="year"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748b', fontSize: 13, fontWeight: 700 }}
                      dy={15}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                      tickFormatter={(value) => `${value}조`}
                      width={40}
                    />
                    <Tooltip
                      cursor={{ fill: '#f8fafc', opacity: 0.5 }}
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: '16px',
                        border: '1px solid rgba(255,255,255,0.5)',
                        boxShadow: '0 10px 30px -5px rgba(0,0,0,0.1)',
                        padding: '12px 16px'
                      }}
                      itemStyle={{ color: '#1e293b', fontWeight: '700', fontSize: '14px' }}
                      labelStyle={{ color: '#64748b', fontWeight: '600', marginBottom: '4px', fontSize: '12px' }}
                      formatter={(value: any) => [`${value}조 원`, '시장 규모']}
                    />
                    <Bar
                      dataKey="size"
                      radius={[12, 12, 12, 12]}
                      animationDuration={1500}
                      animationEasing="ease-out"
                    >
                      {marketData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`url(#barGradient${entry.year})`} filter="url(#barShadow)" />
                      ))}
                      <LabelList
                        dataKey="label"
                        position="top"
                        style={{
                          fill: '#334155',
                          fontWeight: 800,
                          fontSize: '14px',
                        }}
                        offset={10}
                      />
                      <LabelList
                        dataKey="growth"
                        position="top"
                        content={(props: any) => {
                          const { x, y, width, value } = props;
                          return (
                            <g>
                              <rect x={x + width / 2 - 24} y={y - 32} width="48" height="20" rx="10" fill="#ecfdf5" stroke="#a7f3d0" />
                              <text
                                x={x + width / 2}
                                y={y - 18}
                                fill="#059669"
                                fontSize="11px"
                                fontWeight="800"
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                ▲ {value}%
                              </text>
                            </g>
                          );
                        }}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </div>
      </section >

      {/* Advertising Contents - Draggable Marquee Layout */}
      < section className="py-20 lg:py-32 bg-slate-50 relative overflow-hidden" id="contents" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 lg:mb-24">
            <span className="text-fuchsia-600 font-bold tracking-widest text-xs uppercase bg-fuchsia-50 px-4 py-1.5 rounded-full border border-fuchsia-100">Advertising Contents</span>
            <h2 className="text-3xl lg:text-5xl font-black mt-6 mb-6 text-slate-900">
              몰입도 높은<br className="lg:hidden" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">광고 상품 라인업</span>
            </h2>
          </div>
        </div>

        {/* Marquee Container with Drag Support */}
        <div className="relative w-full overflow-hidden pb-10">
          {/* Gradient Masks - Opacity reduced by ~30% (from 100% to 70% using /70 modifier) */}
          <div className="absolute left-0 top-0 bottom-0 w-12 lg:w-40 bg-gradient-to-r from-slate-50/70 to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 lg:w-40 bg-gradient-to-l from-slate-50/70 to-transparent z-20 pointer-events-none"></div>

          {/* Scrolling Track - Using JS ref for scroll control to allow dragging */}
          <div
            ref={scrollRef}
            className="flex w-full overflow-x-auto no-scrollbar gap-6 lg:gap-10 px-4 lg:px-10"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            style={{ scrollBehavior: 'auto' }} // Disable smooth scroll for JS animation to work properly
          >
            {/* Duplicate items for infinite loop */}
            {[...adProducts, ...adProducts].map((product, index) => (
              <div key={`${product.id}-${index}`} className="w-[280px] sm:w-[340px] lg:w-[400px] flex-shrink-0">
                <AdContentItem
                  disableAnimation={true}
                  delay={0}
                  title={product.title}
                  subTitle={product.subTitle}
                  desc={product.desc}
                  tags={product.tags}
                  effect={product.effect}
                  image={product.image}
                  icon={product.icon}
                  color={product.color}
                  accentColor={product.accentColor}
                />
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* Core Features */}
      < section className="py-20 lg:py-32 bg-white" id="features" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-24">
            <span className="text-cyan-600 font-bold tracking-widest text-xs uppercase bg-cyan-50 px-4 py-1.5 rounded-full border border-cyan-100">Why MONGSTARZ?</span>
            <h2 className="text-3xl lg:text-5xl font-black mt-6 mb-6 text-slate-900">
              플랫폼 경쟁력
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            <FeatureCard
              delay={0.1}
              icon={Target}
              title="Hyper-Local 타겟팅"
              sub="Precision"
              highlight="Hit!"
              description="반경 500m 이내 사용자를 정밀 타겟팅하여 낭비 없는 광고 집행이 가능합니다. 지역 소상공인부터 대기업 프랜차이즈까지 최적화된 효율을 제공합니다."
            />
            <FeatureCard
              delay={0.2}
              icon={Gamepad2}
              title="몰입형 게이미피케이션"
              sub="Fun Factor"
              highlight="Play"
              description="단순 노출을 넘어, 게임/퀴즈/미션을 통해 사용자가 자발적으로 광고에 참여하게 만듭니다. 광고를 콘텐츠로 소비하는 새로운 경험을 선사합니다."
            />
            <FeatureCard
              delay={0.3}
              icon={TrendingUp}
              title="데이터 기반 성과 분석"
              sub="Analytics"
              highlight="Grow"
              description="클릭, 체류, 구매 전환 등 사용자 행동 데이터를 실시간으로 분석하여 광고주에게 투명한 리포트와 인사이트를 제공합니다."
            />
          </div>
        </div>
      </section >

      {/* Business Model & Revenue (Redesigned Layout) */}
      < section className="py-20 lg:py-32 bg-slate-50 relative overflow-hidden" id="revenue" >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-violet-200/30 rounded-full blur-[100px]"></div>
          <div className="absolute top-40 -left-20 w-[400px] h-[400px] bg-cyan-200/30 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 lg:mb-24">
            <span className="text-violet-600 font-bold tracking-widest text-xs uppercase bg-violet-50 px-4 py-1.5 rounded-full border border-violet-100">Business Model</span>
            <h2 className="text-3xl lg:text-5xl font-black mt-6 mb-8 text-slate-900 leading-tight">
              선순환 수익 구조:<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">Ticket Economy</span>
            </h2>
            <p className="text-slate-700 text-lg leading-relaxed mb-10 font-medium break-keep max-w-3xl mx-auto">
              사용자는 광고 소비를 통해 '응모권(Ticket)'을 얻고, 이를 통해 고가의 경품에 도전합니다.<br className="hidden md:block" />
              이 과정에서 발생하는 트래픽과 전환이 광고 수익으로 직결되며, 보상 재원으로 재투자됩니다.
            </p>
          </div>

          {/* Ticket Economy Visual Summary */}
          <div className="mb-16">
            <div className="bg-white rounded-[3rem] p-8 lg:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-5">
                <Ticket size={200} />
              </div>

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-4 lg:gap-16">
                {/* Visible on Mobile now */}
                <div className="flex-1 text-center md:text-right">
                  <h4 className="text-xl font-bold text-slate-900">User Traffic</h4>
                  <p className="text-slate-500 font-medium">Voluntary Participation</p>
                </div>

                <div className="relative my-4 md:my-0">
                  <div className="inline-flex p-6 rounded-full bg-violet-50 ring-8 ring-violet-50/50 relative z-10">
                    <Ticket className="w-16 h-16 text-violet-600" />
                  </div>
                  <div className="absolute top-1/2 left-full w-20 h-0.5 bg-slate-200 hidden md:block"></div>
                  <div className="absolute top-1/2 right-full w-20 h-0.5 bg-slate-200 hidden md:block"></div>
                </div>

                {/* Visible on Mobile now */}
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-xl font-bold text-slate-900">Ad Revenue</h4>
                  <p className="text-slate-500 font-medium">Sustainable Growth</p>
                </div>
              </div>
            </div>
          </div>

          {/* Steps Grid - Aligned like Platform Competitiveness */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {revenueData.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-[2rem] p-8 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative group overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 ${item.bg} rounded-bl-[4rem] opacity-50 transition-transform group-hover:scale-110 origin-top-right`}></div>

                  <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-6 relative z-10 shadow-sm`}>
                    <Icon className={`w-6 h-6 lg:w-7 lg:h-7 ${item.color}`} />
                  </div>

                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{item.step}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.label}</h3>
                  <p className="text-slate-600 font-medium leading-relaxed text-sm break-keep">{item.desc}</p>

                  {/* Connector Arrow for Desktop */}
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-5 z-20 text-slate-300">
                      <ArrowRight size={20} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section >

      {/* Footer / Contact */}
      < section className="py-20 bg-slate-50 border-t border-slate-200" id="investment" >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-[3rem] p-10 lg:p-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden"
          >
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-400"></div>

            {/* Reduced Title Size by ~10% (3xl->2xl, 4xl->3xl ish) */}
            <h2 className="text-[1.7rem] lg:text-[2.25rem] font-black text-slate-900 mb-6">
              파트너십 및 광고문의
            </h2>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed font-medium">
              MONGSTARZ와 함께 새로운 모바일 광고 시장을 선도할<br />
              파트너 여러분을 기다립니다.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <div className="flex-1 bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-violet-200 transition-colors">
                <div className="text-xs font-bold text-violet-500 uppercase tracking-widest mb-2">Contact Person</div>
                <div className="text-xl font-bold text-slate-800">담당자</div>
                <div className="text-slate-500 font-medium mt-1">010-8825-1279</div>
              </div>
              <div className="flex-1 bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-fuchsia-200 transition-colors">
                <div className="text-xs font-bold text-fuchsia-500 uppercase tracking-widest mb-2">Email</div>
                <div className="text-xl font-bold text-slate-800">sasking@naver.com</div>
                <div className="text-slate-500 font-medium mt-1">Response within 24h</div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100 flex justify-center">
              <div className="flex items-center gap-2 opacity-50">
                <span className="font-black text-slate-400">MONGSTARZ</span>
                <span className="text-slate-300">© 2024 All Rights Reserved.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section >

      {/* Footer */}
      < Footer />
    </div >
  );
}