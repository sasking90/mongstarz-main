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
    { step: 'Step 2', label: 'Special Issue', desc: '참가권 사용 후 아이템 획득', icon: Ticket, color: 'text-violet-500', bg: 'bg-violet-50' },
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
        image: "/assets/time_pick_v2.png",
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
        image: "/assets/time_attack_v2.png",
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
        image: "/assets/solving.png",
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
        image: "/assets/alpha_matching.png",
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
        image: "/assets/double_event.png",
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
        image: "/assets/luxury_gallery.png",
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
        image: "/assets/experience_center.png",
        icon: Store,
        color: "#f97316", // Orange-500
        accentColor: "#ffedd5"
    }
];
