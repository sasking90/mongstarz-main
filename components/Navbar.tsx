import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, ChevronRight } from 'lucide-react';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: '비전', href: '#vision' },
  { label: '시장 규모', href: '#market' },
  { label: '광고 컨텐츠', href: '#contents' },
  { label: '핵심 기능', href: '#features' },
  { label: '비즈니스 모델', href: '#revenue' },
  { label: '투자 제안', href: '#investment' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('vision');

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  // ScrollSpy: Update active section based on scroll position
  useEffect(() => {
    const observerOptions = {
      root: null,
      // Fix: Adjusted margin to trigger when the section occupies the central part of the viewport
      // -30% from top and -30% from bottom means the middle 40% is the "active zone"
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    navItems.forEach((item) => {
      const targetId = item.href.substring(1);
      const element = document.getElementById(targetId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Determine text colors based on scroll state
  // Increased contrast for better readability
  const textColorClass = scrolled ? 'text-slate-700' : 'text-slate-100';
  const hoverColorClass = scrolled ? 'hover:text-violet-600' : 'hover:text-white';
  const activeColorClass = scrolled ? 'text-violet-700' : 'text-cyan-300';
  const underlineClass = scrolled ? 'from-violet-600 to-fuchsia-600' : 'from-cyan-400 to-teal-400';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200/50' : 'bg-transparent py-5 lg:py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0 cursor-pointer z-50 relative" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              {/* Logo scaled down by 25% (0.75) and left-aligned to maintain position */}
              <Logo className="scale-[0.75] origin-left" />
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-10">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a 
                    key={item.label} 
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-[17px] font-bold tracking-tight transition-all duration-300 relative group
                      ${isActive ? activeColorClass : `${textColorClass} ${hoverColorClass}`}
                    `}
                    style={{ textShadow: !scrolled ? '0 2px 4px rgba(0,0,0,0.5)' : 'none' }}
                  >
                    {item.label}
                    <span className={`absolute -bottom-1.5 left-0 w-full h-[3px] transform origin-left transition-transform duration-300 rounded-full bg-gradient-to-r ${underlineClass}
                      ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                    `}></span>
                  </a>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden z-50">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className={`p-2 rounded-full transition-colors ${scrolled ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/20'}`}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={26} className={scrolled ? "text-slate-800" : "text-slate-800"} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] 
          ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
      >
        {/* Backdrop - High brightness */}
        <div className={`absolute inset-0 bg-white/95 backdrop-blur-xl transition-opacity duration-500 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
             <div className="absolute top-0 right-0 w-60 h-60 bg-fuchsia-200/40 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-60 h-60 bg-cyan-200/40 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        </div>
        
        {/* Menu Content */}
        <div className="relative h-full flex flex-col justify-center px-8 pt-20 pb-10">
          <div className="space-y-5">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a 
                  key={item.label} 
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`flex items-center justify-between text-[22px] font-bold py-3 border-b border-slate-100 transition-all duration-500 transform
                    ${mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}
                    ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 border-violet-100' : 'text-slate-800 hover:text-violet-600'}
                  `}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {item.label}
                  <ChevronRight size={22} className={`transform transition-transform ${isActive ? 'translate-x-0 text-violet-500' : '-translate-x-2 opacity-0'}`} />
                </a>
              );
            })}
          </div>
          
          <div className={`mt-12 pt-8 transition-all duration-700 delay-300 transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
             <p className="text-xs font-bold text-violet-500 uppercase tracking-widest mb-2">Contact</p>
             <p className="text-xl font-bold text-slate-900">010-8825-1279</p>
             <p className="text-base text-slate-500 mt-1">sasking@naver.com</p>
          </div>
        </div>
      </div>
    </>
  );
};