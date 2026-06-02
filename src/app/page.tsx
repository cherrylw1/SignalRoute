"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Sparkles, 
  UserCheck, 
  ShieldCheck, 
  AlertTriangle,
  Gauge,
  Workflow,
  Calendar,
  Layers,
  Database,
  X
} from "lucide-react";

// Integration dataset & icons for Marquee
const row1Integrations = [
  { name: "HubSpot", category: "CRM Platform", icon: "hubspot" },
  { name: "Zoho CRM", category: "CRM Platform", icon: "zoho" },
  { name: "Salesforce", category: "CRM Platform", icon: "salesforce" },
  { name: "Google Ads", category: "Ad Platform", icon: "googleads" },
  { name: "LinkedIn Ads", category: "Ad Platform", icon: "linkedin" },
  { name: "Meta Ads", category: "Ad Platform", icon: "meta" },
];

const row2Integrations = [
  { name: "TikTok Ads", category: "Ad Platform", icon: "tiktok" },
  { name: "Calendly", category: "Scheduling", icon: "calendly" },
  { name: "Google Calendar", category: "Calendar", icon: "googlecalendar" },
  { name: "Klenty", category: "Outreach", icon: "klenty" },
  { name: "Apollo", category: "Email Sequence", icon: "apollo" },
  { name: "Mailchimp", category: "Email Marketing", icon: "mailchimp" },
  { name: "Twilio", category: "Voice & SMS", icon: "twilio" },
];

const renderIntegrationIcon = (iconName: string) => {
  switch (iconName) {
    case "hubspot":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#ff7a59]">
          <circle cx="12" cy="12" r="3" fill="currentColor" />
          <line x1="12" y1="9" x2="12" y2="4" />
          <line x1="9.4" y1="13.5" x2="5" y2="16" />
          <line x1="14.6" y1="13.5" x2="19" y2="16" />
          <circle cx="12" cy="3" r="1.5" fill="currentColor" />
          <circle cx="4" cy="17" r="1.5" fill="currentColor" />
          <circle cx="20" cy="17" r="1.5" fill="currentColor" />
        </svg>
      );
    case "salesforce":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#00a1e0]">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
        </svg>
      );
    case "zoho":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <rect x="2" y="2" width="9" height="9" fill="#1f8eed" rx="1" />
          <rect x="13" y="2" width="9" height="9" fill="#e51c23" rx="1" />
          <rect x="2" y="13" width="9" height="9" fill="#4caf50" rx="1" />
          <rect x="13" y="13" width="9" height="9" fill="#ffeb3b" rx="1" />
        </svg>
      );
    case "googleads":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M17.5 3L6 14.5c-.8.8-.8 2 0 2.8l3.2 3.2c.8.8 2 .8 2.8 0L23.5 9c.8-.8.8-2 0-2.8l-3.2-3.2c-.8-.8-2-.8-2.8 0z" fill="#4285F4" />
          <path d="M10 20.5l-6-6c-.8-.8-.8-2 0-2.8L15.5 3.2c.8-.8 2-.8 2.8 0l.5.5L7.2 15.3c-.4.4-.4 1 0 1.4l3.5 3.5.6.6c-.4-.1-1-.4-1.3-.7z" fill="#F4B400" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#0077b5]">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      );
    case "meta":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#0668e1]">
          <path d="M16.5 6c-2.2 0-4.1 1.6-4.5 3.7C11.6 7.6 9.7 6 7.5 6 4.5 6 2 8.5 2 11.5S4.5 17 7.5 17c2.2 0 4.1-1.6 4.5-3.7.4 2.1 2.3 3.7 4.5 3.7 3 0 5.5-2.5 5.5-5.5S19.5 6 16.5 6zm-9 9c-1.9 0-3.5-1.6-3.5-3.5S5.6 8 7.5 8c1.7 0 3.2 1.3 3.5 3-.3 1.7-1.8 3-3.5 3zm9 0c-1.7 0-3.2-1.3-3.5-3 .3-1.7 1.8-3 3.5-3 1.9 0 3.5 1.6 3.5 3.5S18.4 15 16.5 15z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-black">
          <path d="M12.53.02C13.84 0 15 1.01 15 2.31c0 3.69 2.99 6.69 6.69 6.69v3.08c-2.07 0-3.95-.79-5.38-2.08v8.4c0 3.09-2.51 5.6-5.6 5.6S5.1 21.49 5.1 18.4s2.51-5.6 5.6-5.6c.58 0 1.13.09 1.65.25v3.13c-.48-.24-1.04-.38-1.65-.38-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5V.02z" />
        </svg>
      );
    case "calendly":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#006bff]">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
          <path d="M12 8a4 4 0 1 0 4 4" />
        </svg>
      );
    case "googlecalendar":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#4285f4]">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <path d="M9 16l2 2 4-4" />
        </svg>
      );
    case "klenty":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#4f46e5]">
          <path d="M22 2L11 13" />
          <path d="M22 2l-7 20-4-9-9-4 20-7z" />
        </svg>
      );
    case "apollo":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#ff8200]">
          <path d="M4.5 16.5c-1.5 1.25-2.5 3-2.5 5h20c0-2-1-3.75-2.5-5" />
          <path d="M12 2C7.5 2 7 6 7 11c0 3.5 1.5 5.5 5 7.5 3.5-2 5-4 5-7.5 0-5-.5-9-5-9z" />
          <circle cx="12" cy="8" r="1.5" fill="currentColor" />
        </svg>
      );
    case "mailchimp":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#333333]">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      );
    case "twilio":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#f22f46]">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="9" cy="9" r="1.8" />
          <circle cx="15" cy="9" r="1.8" />
          <circle cx="9" cy="15" r="1.8" />
          <circle cx="15" cy="15" r="1.8" />
        </svg>
      );
    default:
      return null;
  }
};

export default function ChurnautHome() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [activeHeroTab, setActiveHeroTab] = useState<"generic" | "vip">("generic");
  const [isScrolled, setIsScrolled] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [activeModal, setActiveModal] = useState<"about" | "privacy" | "terms" | "careers" | null>(null);

  // Track window scroll to make navbar sticky and styled past hero
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Manage logo reveal timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Manage looping hero visualizer demo
  useEffect(() => {
    if (!isRevealed) return;
    const interval = setInterval(() => {
      setActiveHeroTab((prev) => (prev === "generic" ? "vip" : "generic"));
    }, 4500);
    return () => clearInterval(interval);
  }, [isRevealed]);

  // Framer Motion spring transition config
  const springTransition = {
    type: "spring" as const,
    stiffness: 100,
    damping: 15
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemFadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: springTransition }
  };

  return (
    <div className="relative min-h-screen selection:bg-slate-900 selection:text-white overflow-hidden bg-white text-slate-900">
      
      <AnimatePresence>
        {!isRevealed && (
          <motion.div 
            key="reveal-bg"
            className="fixed inset-0 bg-white z-40"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
        {!isRevealed && (
          <motion.div 
            key="logo-overlay"
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <motion.div 
              layoutId="logo-wrapper"
              className="flex items-center gap-3.5 pointer-events-auto"
              transition={springTransition}
            >
              <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center shadow-md p-2">
                <svg viewBox="0 0 100 100" className="w-9 h-9 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 68 18 A 34 34 0 1 0 36 75 L 43 65 A 24 24 0 1 1 68 28 Z" fill="currentColor" />
                  <circle cx="50" cy="46" r="15" stroke="currentColor" strokeWidth="4.5" fill="none" />
                  <rect x="38" y="36.5" width="24" height="15" rx="7.5" fill="currentColor" />
                  <path d="M 57.5 40 L 58.5 43.5 L 62 44.5 L 58.5 45.5 L 57.5 49 L 56.5 45.5 L 53 44.5 L 56.5 43.5 Z" fill="black" />
                  <rect x="33.5" y="42" width="3" height="8" rx="1.5" fill="currentColor" />
                  <rect x="63.5" y="42" width="3" height="8" rx="1.5" fill="currentColor" />
                  <path d="M 37 60 C 37 56, 63 56, 63 60 L 61 63 C 61 63, 50 65, 39 63 Z" fill="currentColor" />
                  <path d="M 42 63.5 C 46 65.5, 54 65.5, 58 63.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 20 70 C 24 85, 48 89, 70 65 L 65 61 C 45 81, 26 79, 23 68 Z" fill="currentColor" />
                  <path d="M 72 63 L 83 52 L 80 49 L 75 56 L 68 53 L 67 59 Z M 71 58 L 65 64 M 76 61 L 70 67" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </div>
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-extrabold text-slate-900 tracking-tight"
              >
                Churnaut
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RENDER HOME PAGE */}
      <div className="w-full flex flex-col min-h-screen">
          
          {/* STICKY FROSTED-GLASS HEADER */}
          <header className={`sticky top-0 z-50 w-full transition-all duration-500 ${
            isRevealed 
              ? isScrolled 
                ? "bg-slate-950/80 border-b border-slate-800/80 text-white backdrop-blur-md shadow-lg"
                : "bg-white/80 border-b border-slate-200 text-slate-900 backdrop-blur-md"
              : "border-b-transparent bg-transparent"
          }`}>
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
              
              {/* Logo (Layout morph target) */}
              {isRevealed ? (
                <motion.div 
                  layoutId="logo-wrapper"
                  className="flex items-center gap-2.5 cursor-pointer relative z-50"
                  transition={springTransition}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shadow-sm p-1.5 transition-all duration-500 ${isScrolled ? "bg-white text-slate-950" : "bg-slate-900 text-white"}`}>
                    <svg viewBox="0 0 100 100" className={`w-6 h-6 transition-colors duration-500 ${isScrolled ? "text-slate-950" : "text-white"}`} fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M 68 18 A 34 34 0 1 0 36 75 L 43 65 A 24 24 0 1 1 68 28 Z" fill="currentColor" />
                      <circle cx="50" cy="46" r="15" stroke="currentColor" strokeWidth="4.5" fill="none" />
                      <rect x="38" y="36.5" width="24" height="15" rx="7.5" fill="currentColor" />
                      <path d="M 57.5 40 L 58.5 43.5 L 62 44.5 L 58.5 45.5 L 57.5 49 L 56.5 45.5 L 53 44.5 L 56.5 43.5 Z" fill="black" />
                      <rect x="33.5" y="42" width="3" height="8" rx="1.5" fill="currentColor" />
                      <rect x="63.5" y="42" width="3" height="8" rx="1.5" fill="currentColor" />
                      <path d="M 37 60 C 37 56, 63 56, 63 60 L 61 63 C 61 63, 50 65, 39 63 Z" fill="currentColor" />
                      <path d="M 42 63.5 C 46 65.5, 54 65.5, 58 63.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      <path d="M 20 70 C 24 85, 48 89, 70 65 L 65 61 C 45 81, 26 79, 23 68 Z" fill="currentColor" />
                      <path d="M 72 63 L 83 52 L 80 49 L 75 56 L 68 53 L 67 59 Z M 71 58 L 65 64 M 76 61 L 70 67" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className={`text-xl font-extrabold tracking-tight transition-colors duration-500 ${isScrolled ? "text-white" : "text-slate-900"}`}>
                    Churnaut
                  </span>
                </motion.div>
              ) : (
                <div className="w-28" />
              )}

              {/* Navigation Links */}
              <nav className={`hidden md:flex items-center gap-8 text-sm font-medium transition-opacity duration-500 ${isRevealed ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <a href="#features" className={`transition-colors duration-500 ${isScrolled ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}>Product</a>
                <a href="#integrations" className={`transition-colors duration-500 ${isScrolled ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}>Integrations</a>
                <a href="#pricing" className={`transition-colors duration-500 ${isScrolled ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}>Pricing</a>
              </nav>

              {/* Header CTA */}
              <div className={`flex items-center gap-4 transition-opacity duration-500 ${isRevealed ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <button className={`hidden sm:inline-block text-sm font-medium transition-colors duration-500 ${isScrolled ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}>
                  Sign In
                </button>
                <a 
                  href="https://cal.com/sharath.mb/demo" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all duration-500 ${
                    isScrolled 
                      ? "bg-white text-slate-950 hover:bg-slate-100" 
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  Book a Demo
                </a>
              </div>

            </div>
          </header>

          {/* PAGE CONTENT CONTAINER */}
          <main className={`flex-grow w-full transition-opacity duration-1000 ease-in-out ${isRevealed ? "opacity-100" : "opacity-0"}`}>
            
            {/* 1. THE HERO SECTION */}
            <section className="relative py-20 md:py-28 overflow-hidden">
              <div className="absolute inset-0 grid-bg-overlay opacity-[0.4] pointer-events-none z-0"></div>
              
              {/* Decorative Auxia-style ambient gradient glow */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-purple-100/40 via-sky-100/40 to-peach-100/30 rounded-full blur-[100px] pointer-events-none z-0"></div>

              <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center gap-6">
                
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 tracking-wide uppercase"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500 fill-indigo-500" />
                  REVENUE PERSONALIZATION PLATFORM
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, ...springTransition }}
                  className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900"
                >
                  Your CRM knows <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-fill-transparent text-transparent">who they are.</span> Your website should too.
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, ...springTransition }}
                  className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl"
                >
                  More pipeline meetings. Faster deal cycles. Your website finally works as hard as your sales team.
                </motion.p>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm md:text-base text-slate-500 font-normal max-w-xl italic"
                >
                  {"\"Instantly book qualified meetings, shorten sales cycles, and eliminate friction for your VIP buyers. Assembled invisibly in under 400 milliseconds.\""}
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <a 
                    href="https://cal.com/sharath.mb/demo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-7 py-4 text-base font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-lg hover:shadow-indigo-100 hover:shadow-2xl transition-all duration-300"
                  >
                    Book a Demo
                  </a>
                  <a 
                    href="#features"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center justify-center px-7 py-4 text-base font-bold text-slate-700 bg-transparent hover:bg-slate-100 border border-slate-300 hover:border-slate-400 rounded-xl transition-all duration-300"
                  >
                    See How It Works &rarr;
                  </a>
                </motion.div>

                {/* HERO VISUAL: Split-Screen Form Mockup */}
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, ...springTransition }}
                  className="mt-16 w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-100/80 overflow-hidden"
                >
                  
                  {/* Mockup Header tab switcher */}
                  <div className="bg-slate-50/80 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-slate-200"></span>
                      <span className="w-3 h-3 rounded-full bg-slate-200"></span>
                      <span className="w-3 h-3 rounded-full bg-slate-200"></span>
                    </div>
                    
                    {/* Visualizer Selector tabs */}
                    <div className="flex bg-slate-200/60 border border-slate-300/40 p-0.5 rounded-lg">
                      <button 
                        onClick={() => setActiveHeroTab("generic")}
                        className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${activeHeroTab === "generic" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                      >
                        Generic Visitor
                      </button>
                      <button 
                        onClick={() => setActiveHeroTab("vip")}
                        className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${activeHeroTab === "vip" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                      >
                        Resolved VIP Inbound
                      </button>
                    </div>

                    <div className="text-xs font-mono text-slate-400">
                      route_mode.bin
                    </div>
                  </div>

                  {/* Mockup Main Body Area */}
                  <div className="p-8 min-h-[300px] flex items-center justify-center transition-all bg-gradient-to-b from-white to-slate-50/50">
                    <AnimatePresence mode="wait">
                      {activeHeroTab === "generic" ? (
                        
                        /* Cold Lead side: Boring Form */
                        <motion.div 
                          key="form-static"
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.96 }}
                          transition={{ duration: 0.3 }}
                          className="w-full max-w-md flex flex-col gap-4 text-left border border-slate-200/80 p-6 rounded-xl bg-white shadow-sm"
                        >
                          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Unidentified Visitor</span>
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-100 text-[10px] font-semibold text-slate-500">
                              No active signal
                            </span>
                          </div>
                          
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Work Email</label>
                            <input 
                              type="text" 
                              disabled 
                              placeholder="e.g. name@company.com" 
                              className="px-3.5 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-400 cursor-not-allowed"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Company Size</label>
                            <select 
                              disabled 
                              className="px-3.5 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-400 cursor-not-allowed"
                            >
                              <option>Select company size...</option>
                            </select>
                          </div>

                          <button 
                            disabled 
                            className="mt-2 w-full py-2.5 text-sm font-bold text-white bg-slate-400 rounded-lg cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            Book a Demo
                          </button>
                          
                          <p className="text-[11px] text-center text-slate-400 mt-1">
                            A representative will contact you in 24-48 business hours.
                          </p>
                        </motion.div>

                      ) : (
                        
                        /* Known VIP side: Instant Calendar Embed */
                        <motion.div 
                          key="form-vip"
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.96 }}
                          transition={{ duration: 0.3 }}
                          className="w-full max-w-lg flex flex-col gap-4 text-left border border-slate-200/80 p-6 rounded-xl bg-white shadow-md relative overflow-hidden"
                        >
                          {/* Ambient cyan/indigo corner glow */}
                          <div className="absolute -top-12 -right-12 w-28 h-28 bg-indigo-200/30 rounded-full blur-2xl"></div>

                          <div className="flex items-center justify-between pb-2 border-b border-slate-100 relative z-10">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-400 animate-pulse"></span>
                              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Identified VIP: Stripe.com</span>
                            </div>
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-600 shadow-sm">
                              <UserCheck className="w-3 h-3" />
                              100% Deterministic Match
                            </span>
                          </div>

                          <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between gap-4 relative z-10">
                            <div>
                              <h4 className="text-sm font-bold text-slate-900">Welcome, Stripe Outbound Lead</h4>
                              <p className="text-xs text-slate-500 mt-0.5">Matched CRM Stage: Outbound Sequence #12 (Active)</p>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] font-mono bg-slate-200/80 text-slate-700 px-1.5 py-0.5 rounded">
                                AE: Sarah Jenkins
                              </span>
                            </div>
                          </div>

                          {/* Interactive calendar grid mockup */}
                          <div className="flex flex-col gap-2 relative z-10">
                            <span className="text-xs font-bold text-slate-700">Select a Time with Sarah Jenkins:</span>
                            <div className="grid grid-cols-3 gap-2">
                              {["10:00 AM", "1:30 PM", "3:00 PM"].map((time, idx) => (
                                <button 
                                  key={idx}
                                  className={`py-2 text-xs font-semibold border rounded-lg transition-all ${idx === 1 ? "bg-slate-900 border-slate-900 text-white shadow-sm" : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"}`}
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          </div>

                          <button 
                            className="mt-2 w-full py-2.5 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all"
                          >
                            <Calendar className="w-4.5 h-4.5" />
                            Confirm Demo Instantly
                          </button>
                        </motion.div>

                      )}
                    </AnimatePresence>
                  </div>

                </motion.div>

              </div>
            </section>

            {/* PART 1 - PARTNER LOGOS MARQUEE */}
            <section className="py-12 bg-white overflow-hidden border-b border-slate-100">
              <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-6">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-center block">
                  Trusted by revenue teams at
                </span>
                
                <div 
                  className="relative flex overflow-hidden w-full py-4 animate-marquee-container"
                  style={{
                    maskImage: "linear-gradient(to right, transparent, white 15%, white 85%, transparent)",
                    WebkitMaskImage: "linear-gradient(to right, transparent, white 15%, white 85%, transparent)"
                  }}
                >
                  <div className="flex animate-marquee">
                    {[
                      { name: "Velox", tag: "SALES AUTOMATION" },
                      { name: "Driftmark", tag: "B2B SAAS" },
                      { name: "Stackpilot", tag: "REVOPS" },
                      { name: "Novathread", tag: "OUTBOUND" },
                      { name: "Clarix", tag: "PIPELINE INTELLIGENCE" },
                      { name: "Mergepoint", tag: "GTM PLATFORM" }
                    ].map((logo, idx) => (
                      <div 
                        key={`logo-1-${idx}`} 
                        className="flex flex-col items-center justify-center mx-12 shrink-0 opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-pointer select-none"
                      >
                        <span className="text-lg md:text-xl font-black text-slate-950 tracking-tight">{logo.name}</span>
                        <span className="text-[8px] md:text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{logo.tag}</span>
                      </div>
                    ))}
                    {[
                      { name: "Velox", tag: "SALES AUTOMATION" },
                      { name: "Driftmark", tag: "B2B SAAS" },
                      { name: "Stackpilot", tag: "REVOPS" },
                      { name: "Novathread", tag: "OUTBOUND" },
                      { name: "Clarix", tag: "PIPELINE INTELLIGENCE" },
                      { name: "Mergepoint", tag: "GTM PLATFORM" }
                    ].map((logo, idx) => (
                      <div 
                        key={`logo-2-${idx}`} 
                        className="flex flex-col items-center justify-center mx-12 shrink-0 opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-pointer select-none"
                      >
                        <span className="text-lg md:text-xl font-black text-slate-950 tracking-tight">{logo.name}</span>
                        <span className="text-[8px] md:text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{logo.tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>


            {/* 2. THE AGITATION SECTION (THE 4 FAILURES) */}
            <motion.section 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="py-24 bg-slate-50 border-y border-slate-200"
            >
              <div className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-12">
                
                <div className="text-center flex flex-col gap-3 max-w-2xl">
                  <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-xs font-bold text-slate-700 tracking-wide uppercase self-center">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    The Funnel Bottleneck
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                    The 4 failures of a blind inbound funnel.
                  </h2>
                  <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                    You spend tens of thousands driving traffic, but when prospects land, every visitor sees the exact same generic page.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  
                  {/* Card 1 */}
                  <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm flex flex-col gap-3">
                    <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                      VIP Buyers Wait
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      High-intent VIP buyers fill the same generic demo request form as everyone else and wait 24 hours for a reply. Then they bounce to a competitor who picks up the phone.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm flex flex-col gap-3">
                    <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                      Wasted Outbound
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Cold email prospects land on a homepage with zero personalization, despite your rep knowing exactly who they are and what pain they need to solve.
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm flex flex-col gap-3">
                    <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                      Customer Confusion
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Existing customers see &apos;Book a Demo&apos; CTAs designed for strangers, signalling that you don&apos;t know who they are.
                    </p>
                  </div>

                  {/* Card 4 */}
                  <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm flex flex-col gap-3">
                    <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                      SDR Burnout
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      SDRs waste hours every week triaging low-quality inbound leads that could have been filtered out at the website level.
                    </p>
                  </div>

                </div>

              </div>
            </motion.section>

            {/* 3. WHAT WE ARE NOT (THE DIFFERENTIATOR) */}
            <motion.section 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="py-24 max-w-4xl mx-auto px-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* Left block */}
                <div className="md:col-span-5 flex flex-col gap-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 tracking-wide uppercase self-start">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    Our Philosophy
                  </span>
                  <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
                    100% Deterministic. Zero Guesswork.
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    We act only on verified data. If the signal fires, the identity and intent data is 100% accurate. If we don&apos;t know them, we show the default page.
                  </p>
                </div>

                {/* Right block: Clean typographic bullet points */}
                <div className="md:col-span-7 bg-white border border-slate-200/80 p-8 rounded-2xl shadow-sm flex flex-col gap-5">
                  {[
                    "NOT an IP deanonymization tool — we do not guess who visitors are from their IP address.",
                    "NOT a chatbot or popup tool — we do not intercept visitors with annoying chat windows.",
                    "NOT an A/B testing platform — we do not randomly vary experiences.",
                    "NOT a data platform — we do not build visitor profiles over time for ad targeting."
                  ].map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0 mt-0.5">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-rose-500">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-slate-700">{bullet}</span>
                    </div>
                  ))}
                </div>

              </div>
            </motion.section>

            {/* 4. THE "HOW IT WORKS" BENTO BOX */}
            <motion.section 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="py-24 max-w-6xl mx-auto px-6" 
              id="features"
            >
              <div className="text-center mb-16 flex flex-col gap-3">
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                  How it works: The Simple Version
                </h2>
                <p className="text-slate-500 max-w-lg mx-auto text-sm md:text-base">
                  Ditch the complexity. Install once, configure your routing rules, and watch visitor pages morph instantly.
                </p>
              </div>

              {/* Bento Grid */}
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                
                {/* Card 1: The Trigger */}
                <motion.div 
                  variants={itemFadeInUp}
                  className="bento-card bg-white border border-slate-200 rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="flex flex-col gap-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shadow-sm group-hover:bg-slate-900 group-hover:border-slate-900 transition-colors">
                      <Layers className="w-6 h-6 text-slate-700 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-bold text-slate-950">1. The Lightweight Snippet</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Install an ultra-lightweight (&lt;10kb) vanilla JavaScript snippet on your site once. It sits silently, never blocks page load, and watches for verified signals.
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 pt-4 border-t border-slate-100 text-xs font-mono text-slate-400">
                    snippet.min.js
                  </div>
                </motion.div>

                {/* Card 2: The Routing */}
                <motion.div 
                  variants={itemFadeInUp}
                  className="bento-card bg-white border border-slate-200 rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="flex flex-col gap-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shadow-sm group-hover:bg-slate-900 group-hover:border-slate-900 transition-colors">
                      <Workflow className="w-6 h-6 text-slate-700 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-bold text-slate-950">2. The Instant API Call</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        When a recognized signal fires (a tracked link, ad click, or CRM webhook), the snippet calls our API and receives routing instructions.
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 pt-4 border-t border-slate-100 text-xs font-mono text-slate-400">
                    route_api.bin
                  </div>
                </motion.div>

                {/* Card 3: The Action */}
                <motion.div 
                  variants={itemFadeInUp}
                  className="bento-card bg-white border border-slate-200 rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="flex flex-col gap-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shadow-sm group-hover:bg-slate-900 group-hover:border-slate-900 transition-colors">
                      <Gauge className="w-6 h-6 text-slate-700 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-bold text-slate-950">3. Under-400ms DOM Swap</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        We silently edit the page DOM before the visitor sees anything. The right CTA, the right rep&apos;s calendar, the right case study—injected invisibly.
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 pt-4 border-t border-slate-100 text-xs font-mono text-slate-400">
                    dom_swapper.go
                  </div>
                </motion.div>

              </motion.div>
            </motion.section>

            {/* 5. THE COMPLETE SIGNAL LIBRARY */}
            <motion.section 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="py-24 bg-slate-50 border-y border-slate-200"
            >
              <div className="max-w-6xl mx-auto px-6">
                
                <div className="text-center mb-16 flex flex-col gap-3">
                  <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-xs font-bold text-slate-700 tracking-wide uppercase self-center">
                    <Database className="w-3.5 h-3.5 text-indigo-600" />
                    Signals Library
                  </span>
                  <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                    If you can track it, we can route it.
                  </h2>
                  <p className="text-slate-500 max-w-lg mx-auto text-sm md:text-base">
                    Plug in any source. If a user triggers a signal, Churnaut catches it and adapts the experience.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                  
                  {/* Column 1 */}
                  <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm flex flex-col gap-6 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-inner text-indigo-600">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-bold text-slate-950">Email & Outbound</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Identify from tracked cold email links, sales sequence clicks (Apollo/Klenty), newsletter engagement, and webinar follow-ups.
                      </p>
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm flex flex-col gap-6 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-inner text-indigo-600">
                      <Sparkles className="w-5 h-5 text-purple-500 fill-purple-500" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-bold text-slate-950">Ads & CRM</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Route based on LinkedIn Lead Gen forms, Google Ads GCLID search intent, Deal Stage-aware visits, and returning churned customers.
                      </p>
                    </div>
                  </div>

                  {/* Column 3 */}
                  <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm flex flex-col gap-6 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-inner text-indigo-600">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-bold text-slate-950">Product-Led & Partner</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Adapt the page for free trial users hitting usage limits, incomplete onboarding users, partner referral links, and G2 profile clicks.
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </motion.section>

            {/* 6. CORE FEATURES DEEP DIVE */}
            <motion.section 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="py-24 max-w-5xl mx-auto px-6 flex flex-col gap-20"
            >
              <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                  Built for modern growth teams.
                </h2>
                <p className="text-slate-500 text-sm md:text-base">
                  Power your outbound operations and inbound routing with a complete control suite.
                </p>
              </div>

              {/* Block 1: Tracked Link Generator (Text left, Image right) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col gap-4">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Feature 01</span>
                  <h3 className="text-2xl font-bold text-slate-950">Tracked Link Generator</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    The foundation of Churnaut. Create unique tracked URLs for every email, campaign, or event. Assign reps, set expiry dates, and bulk-generate via CSV. One click, and identity is locked to the link.
                  </p>
                </div>
                
                {/* Visual Mockup for Tracked Link Generator */}
                <div className="w-full bg-slate-50 rounded-2xl border border-slate-200/80 shadow-md shadow-slate-100/30 p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-500 font-mono">link_generator.sh</span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Destination URL</span>
                        <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-700 truncate">
                          churnaut.com/pricing
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Assign Representative</span>
                        <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 flex items-center gap-1.5">
                          <div className="w-4 h-4 rounded-full bg-indigo-500 text-[8px] text-white flex items-center justify-center font-bold">SJ</div>
                          Sarah Jenkins (AE)
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Signal Trigger Parameters</span>
                      <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-600 flex justify-between items-center">
                        <span>?cid=stripe_2026&amp;outbound=apollo</span>
                        <span className="text-[9px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded font-sans font-bold">Identified</span>
                      </div>
                    </div>

                    <div className="mt-1.5 p-3 bg-slate-900 text-white rounded-xl flex items-center justify-between gap-3 shadow-inner">
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Generated Route Link</span>
                        <span className="text-xs font-mono truncate text-indigo-200">
                          https://curn.at/r/sjenk_stripe
                        </span>
                      </div>
                      <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold rounded-lg text-white shrink-0 shadow transition-colors">
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Block 2: Visual Rules Engine & Variant Editor (Image left, Text right) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Visual Mockup for Rules Engine */}
                <div className="order-2 md:order-1 w-full bg-slate-50 rounded-2xl border border-slate-200/80 shadow-md shadow-slate-100/30 p-6 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-600 shadow-sm shadow-indigo-400 animate-pulse"></span>
                      Routing Rule: VIP Inbound
                    </span>
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ACTIVE
                    </span>
                  </div>

                  <div className="my-2.5 flex flex-col gap-3 relative">
                    <div className="absolute left-[17px] top-4 bottom-4 w-0.5 bg-slate-200"></div>

                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm text-indigo-600 text-xs font-bold shrink-0">
                        IF
                      </div>
                      <div className="flex-grow bg-white border border-slate-200/80 p-2.5 rounded-xl shadow-sm min-w-0">
                        <p className="text-xs font-bold text-slate-900 leading-tight">Visitor is Outbound Target</p>
                        <p className="text-[10px] text-slate-500 mt-0.5 leading-none">Match: Sequence Email Click</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm text-purple-600 text-xs font-bold shrink-0">
                        AND
                      </div>
                      <div className="flex-grow bg-white border border-slate-200/80 p-2.5 rounded-xl shadow-sm min-w-0">
                        <p className="text-xs font-bold text-slate-900 leading-tight">Deal Stage equals &apos;Contracting&apos;</p>
                        <p className="text-[10px] text-slate-500 mt-0.5 leading-none">HubSpot CRM Sync: Updated 2m ago</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-9 h-9 rounded-xl bg-indigo-900 text-white flex items-center justify-center shadow-sm text-xs font-bold shrink-0">
                        THEN
                      </div>
                      <div className="flex-grow bg-slate-900 border border-slate-800 p-2.5 rounded-xl shadow-md text-white min-w-0">
                        <p className="text-xs font-bold leading-tight">Swap Page Variant</p>
                        <p className="text-[10px] text-indigo-300 mt-0.5 leading-none">Inject Variant B (Sarah&apos;s Calendly)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="order-1 md:order-2 flex flex-col gap-4">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Feature 02</span>
                  <h3 className="text-2xl font-bold text-slate-950">Visual Rules Engine & Variant Editor</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    If X, then Y. Map inbound traffic to custom experiences without writing code. Pre-build page variants by simply pasting your website&apos;s CSS selectors. Swap text, inject HTML, or embed Calendly directly.
                  </p>
                </div>
              </div>

              {/* Block 3: Universal Webhooks & Analytics (Text left, Image right) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col gap-4">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Feature 03</span>
                  <h3 className="text-2xl font-bold text-slate-950">Universal Webhooks & Analytics</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    A single POST endpoint connects to Zapier, Make, HubSpot, and Zoho. Track total clicks, personalization trigger rates, and rep performance in a clean revenue intelligence dashboard.
                  </p>
                </div>
                
                {/* Visual Mockup for Webhooks & Analytics */}
                <div className="w-full bg-slate-50 rounded-2xl border border-slate-200/80 shadow-md shadow-slate-100/30 p-5 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                      Webhook Response Payload
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">status: 200 OK</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-3">
                    <div className="bg-slate-900 rounded-xl p-3 text-[10px] font-mono text-indigo-200 overflow-x-auto shadow-inner leading-relaxed">
                      <div><span className="text-pink-400">&quot;event&quot;</span>: <span className="text-teal-400">&quot;route.resolved&quot;</span>,</div>
                      <div><span className="text-pink-400">&quot;identity&quot;</span>: &#123;</div>
                      <div className="pl-3"><span className="text-pink-400">&quot;company&quot;</span>: <span className="text-yellow-400">&quot;Stripe&quot;</span>,</div>
                      <div className="pl-3"><span className="text-pink-400">&quot;owner&quot;</span>: <span className="text-yellow-400">&quot;Sarah Jenkins&quot;</span></div>
                      <div>&#125;,</div>
                      <div><span className="text-pink-400">&quot;latency_ms&quot;</span>: <span className="text-teal-400">342</span></div>
                    </div>

                    <div className="flex flex-col justify-between gap-2.5">
                      <div className="bg-white border border-slate-200 p-2.5 rounded-xl shadow-sm">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Total Clicks</span>
                        <div className="flex items-baseline gap-1.5 mt-0.5">
                          <span className="text-base font-extrabold text-slate-900">12,482</span>
                          <span className="text-[9px] font-bold text-emerald-600">+14.2%</span>
                        </div>
                      </div>

                      <div className="bg-white border border-slate-200 p-2.5 rounded-xl shadow-sm">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Trigger Rate</span>
                        <div className="flex items-baseline gap-1.5 mt-0.5">
                          <span className="text-base font-extrabold text-slate-900">94.2%</span>
                          <span className="text-[9px] font-bold text-indigo-600">Deterministic</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-slate-200/80 flex items-center justify-between">
                    <span className="text-[9px] font-semibold text-slate-400">Piped to HubSpot, Make, &amp; Zapier</span>
                    <div className="flex gap-1.5">
                      <span className="w-5 h-5 rounded-md bg-white border border-slate-200 flex items-center justify-center text-[9px] font-extrabold text-slate-500 shadow-sm select-none">HS</span>
                      <span className="w-5 h-5 rounded-md bg-white border border-slate-200 flex items-center justify-center text-[9px] font-extrabold text-slate-500 shadow-sm select-none">ZP</span>
                      <span className="w-5 h-5 rounded-md bg-white border border-slate-200 flex items-center justify-center text-[9px] font-extrabold text-slate-500 shadow-sm select-none">MK</span>
                    </div>
                  </div>
                </div>
              </div>

            </motion.section>

            {/* SCOUT AI SECTION */}
            <motion.section 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="py-24 max-w-6xl mx-auto px-6 border-t border-slate-200" 
              id="scout"
            >
              <div className="text-center mb-16 flex flex-col items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-xs font-bold text-slate-700 tracking-wide uppercase self-center">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600" />
                  SCOUT AI — PIPELINE INTELLIGENCE
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mt-2">
                  Your AI sales manager. Always watching. Never sleeping.
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
                  While you personalize the inbound, Scout monitors every deal in your pipeline and tells your reps exactly what to do next.
                </p>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                
                {/* Card 1 */}
                <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm flex flex-col gap-6 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-inner">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm shadow-red-400"></span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold text-slate-950">Know which deals are dying</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Scout scores every deal RED, AMBER, or GREEN based on activity, close date, and deal value. No more surprises at end of quarter.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm flex flex-col gap-6 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-inner text-indigo-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold text-slate-950">Reps get told exactly what to do</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      When a deal goes cold, Scout writes the outreach email and sends it directly to the rep. One click to send — no thinking required.
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm flex flex-col gap-6 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-inner text-indigo-600">
                    <Workflow className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold text-slate-950">Learn from every loss</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Scout analyses every closed-lost deal and tells you exactly why you lost and what pattern to avoid next time.
                    </p>
                  </div>
                </div>

              </div>

              {/* Centered CTA */}
              <div className="mt-12 flex justify-center">
                <a 
                  href="https://cal.com/sharath.mb/demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-lg transition-all duration-300"
                >
                  See Scout in action &rarr;
                </a>
              </div>
            </motion.section>

            {/* 8. INTEGRATIONS & STACK */}
            <motion.section 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="py-20 bg-slate-50 border-y border-slate-200 overflow-hidden" 
              id="integrations"
            >
              <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                
                <div className="flex flex-col gap-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-xs font-bold text-slate-700 tracking-wide uppercase self-start">
                    <Database className="w-3.5 h-3.5 text-indigo-600" />
                    Connect integrations
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                    Plugs into your existing stack.
                  </h2>
                  <p className="text-base text-slate-600 leading-relaxed">
                    Churnaut connects seamlessly with your CRM, engagement platforms, and favorite no-code automation platforms via API. Build custom workflows and vibe-code your own logic in minutes.
                  </p>
                  
                  <div className="flex gap-6 mt-2">
                    <div className="flex flex-col">
                      <span className="text-2xl font-extrabold text-slate-900">20+</span>
                      <span className="text-xs font-semibold text-slate-500">Native Connectors</span>
                    </div>
                    <div className="w-px bg-slate-300"></div>
                    <div className="flex flex-col">
                      <span className="text-2xl font-extrabold text-slate-900">&lt; 10min</span>
                      <span className="text-xs font-semibold text-slate-500">Standard Setup</span>
                    </div>
                  </div>
                </div>

                {/* Component Update: Continuous Flow Integration Marquee */}
                <div 
                  className="relative flex flex-col gap-6 py-6 overflow-hidden w-full max-w-lg mx-auto"
                  style={{
                    maskImage: "linear-gradient(to right, transparent, white 15%, white 85%, transparent)",
                    WebkitMaskImage: "linear-gradient(to right, transparent, white 15%, white 85%, transparent)"
                  }}
                >
                  
                  {/* Row 1: Right to Left */}
                  <div className="flex w-full overflow-hidden">
                    <motion.div
                      animate={{ x: ["0%", "-50%"] }}
                      transition={{
                        ease: "linear",
                        duration: 25,
                        repeat: Infinity,
                      }}
                      className="flex flex-row flex-nowrap w-max"
                    >
                      {/* Set 1 */}
                      {row1Integrations.map((item, idx) => (
                        <div key={`r1-${idx}`} className="mr-4 flex items-center gap-3 bg-white border border-slate-200/60 shadow-sm rounded-xl px-4 py-3 shrink-0">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 shadow-inner">
                            {renderIntegrationIcon(item.icon)}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800 leading-none">{item.name}</span>
                            <span className="text-[10px] font-semibold text-slate-400 mt-1.5 uppercase tracking-wide leading-none">{item.category}</span>
                          </div>
                        </div>
                      ))}
                      {/* Set 2 (Duplicate for loop) */}
                      {row1Integrations.map((item, idx) => (
                        <div key={`r1-dup-${idx}`} className="mr-4 flex items-center gap-3 bg-white border border-slate-200/60 shadow-sm rounded-xl px-4 py-3 shrink-0">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 shadow-inner">
                            {renderIntegrationIcon(item.icon)}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800 leading-none">{item.name}</span>
                            <span className="text-[10px] font-semibold text-slate-400 mt-1.5 uppercase tracking-wide leading-none">{item.category}</span>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Row 2: Left to Right */}
                  <div className="flex w-full overflow-hidden">
                    <motion.div
                      animate={{ x: ["-50%", "0%"] }}
                      transition={{
                        ease: "linear",
                        duration: 28,
                        repeat: Infinity,
                      }}
                      className="flex flex-row flex-nowrap w-max"
                    >
                      {/* Set 1 */}
                      {row2Integrations.map((item, idx) => (
                        <div key={`r2-${idx}`} className="mr-4 flex items-center gap-3 bg-white border border-slate-200/60 shadow-sm rounded-xl px-4 py-3 shrink-0">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 shadow-inner">
                            {renderIntegrationIcon(item.icon)}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800 leading-none">{item.name}</span>
                            <span className="text-[10px] font-semibold text-slate-400 mt-1.5 uppercase tracking-wide leading-none">{item.category}</span>
                          </div>
                        </div>
                      ))}
                      {/* Set 2 (Duplicate for loop) */}
                      {row2Integrations.map((item, idx) => (
                        <div key={`r2-dup-${idx}`} className="mr-4 flex items-center gap-3 bg-white border border-slate-200/60 shadow-sm rounded-xl px-4 py-3 shrink-0">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 shadow-inner">
                            {renderIntegrationIcon(item.icon)}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800 leading-none">{item.name}</span>
                            <span className="text-[10px] font-semibold text-slate-400 mt-1.5 uppercase tracking-wide leading-none">{item.category}</span>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </div>

                </div>

              </div>
            </motion.section>

            {/* PART 2 - TESTIMONIALS SECTION */}
            <section className="py-24 bg-[#09090f] w-full overflow-hidden border-y border-slate-900">
              <div className="max-w-6xl mx-auto px-6 flex flex-col gap-16 items-center">
                
                <div className="text-center flex flex-col items-center gap-3">
                  <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-slate-900 text-[10px] md:text-xs font-bold text-slate-200 tracking-wide uppercase self-center border border-slate-800">
                    WHAT TEAMS ARE SAYING
                  </span>
                  <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mt-2">
                    Pipeline results. Not promises.
                  </h2>
                </div>

                {/* Cards Grid with Staggered Scroll Animation */}
                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
                >
                  
                  {/* Testimonial Card 1 */}
                  <motion.div 
                    variants={itemFadeInUp}
                    className="bg-[#12121a] border border-white/5 p-8 rounded-2xl flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-950/20 hover:border-white/10 transition-all duration-300 group"
                  >
                    <div className="flex flex-col gap-4">
                      <span className="text-5xl font-serif text-purple-500 leading-none select-none -mb-2">&ldquo;</span>
                      <p className="text-sm md:text-base text-slate-200 leading-relaxed font-medium">
                        Our cold email click-to-meeting rate went from 6% to 22% in 6 weeks. Churnaut just works.
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3.5 mt-8 border-t border-white/5 pt-5">
                      <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm select-none shrink-0 shadow-inner">
                        RC
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-white leading-tight">Ryan Callahan</span>
                        <span className="text-xs text-slate-400 leading-tight mt-0.5">Head of Growth, Velox</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Testimonial Card 2 */}
                  <motion.div 
                    variants={itemFadeInUp}
                    className="bg-[#12121a] border border-white/5 p-8 rounded-2xl flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-950/20 hover:border-white/10 transition-all duration-300 group"
                  >
                    <div className="flex flex-col gap-4">
                      <span className="text-5xl font-serif text-purple-500 leading-none select-none -mb-2">&ldquo;</span>
                      <p className="text-sm md:text-base text-slate-200 leading-relaxed font-medium">
                        We used to lose deals silently. Scout tells us exactly which deals are dying and why — before it&apos;s too late.
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3.5 mt-8 border-t border-white/5 pt-5">
                      <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm select-none shrink-0 shadow-inner">
                        PN
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-white leading-tight">Priya Nair</span>
                        <span className="text-xs text-slate-400 leading-tight mt-0.5">VP Sales, Stackpilot</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Testimonial Card 3 */}
                  <motion.div 
                    variants={itemFadeInUp}
                    className="bg-[#12121a] border border-white/5 p-8 rounded-2xl flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-950/20 hover:border-white/10 transition-all duration-300 group"
                  >
                    <div className="flex flex-col gap-4">
                      <span className="text-5xl font-serif text-purple-500 leading-none select-none -mb-2">&ldquo;</span>
                      <p className="text-sm md:text-base text-slate-200 leading-relaxed font-medium">
                        Every prospect that clicks our outbound links lands on a page that knows who they are. Pipeline velocity is up 40%.
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3.5 mt-8 border-t border-white/5 pt-5">
                      <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm select-none shrink-0 shadow-inner">
                        MO
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-white leading-tight">Marcus Obi</span>
                        <span className="text-xs text-slate-400 leading-tight mt-0.5">Founder, Driftmark</span>
                      </div>
                    </div>
                  </motion.div>

                </motion.div>

              </div>
            </section>


            {/* 9. TRANSPARENT PRICING */}
            <motion.section 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="py-24 max-w-6xl mx-auto px-6" 
              id="pricing"
            >
              <div className="text-center mb-16 flex flex-col gap-3">
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                  Transparent, value-led pricing.
                </h2>
                <p className="text-slate-500 max-w-lg mx-auto text-sm md:text-base">
                  Choose a subscription plan that matches your pipeline volume. Scale up at any time.
                </p>
              </div>

              {/* Monthly/Yearly Toggle */}
              <div className="flex justify-center mb-12">
                <div className="inline-flex items-center gap-1 p-1 bg-slate-100 border border-slate-200/80 rounded-xl">
                  <button
                    onClick={() => setBillingPeriod("monthly")}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                      billingPeriod === "monthly"
                        ? "bg-white text-slate-950 shadow-sm"
                        : "text-slate-500 hover:text-slate-850"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingPeriod("yearly")}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                      billingPeriod === "yearly"
                        ? "bg-white text-slate-950 shadow-sm"
                        : "text-slate-500 hover:text-slate-855"
                    }`}
                  >
                    Yearly (2 months free)
                  </button>
                </div>
              </div>

              {/* Pricing Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                
                {/* Plan 1: Starter */}
                <div className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900">Starter</h3>
                        {billingPeriod === "yearly" && (
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                            2 months free
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">For small teams testing validation</p>
                    </div>
                    
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-slate-900">
                        {billingPeriod === "monthly" ? "$199" : "$1,990"}
                      </span>
                      <span className="text-sm font-medium text-slate-500">
                        {billingPeriod === "monthly" ? "/mo" : "/yr"}
                      </span>
                    </div>

                    <ul className="flex flex-col gap-3 text-xs font-semibold text-slate-600 border-t border-slate-100 pt-6">
                      <li className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" /> 1 Domain
                      </li>
                      <li className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" /> 5 Routing Rules
                      </li>
                      <li className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" /> Core CRM Integrations
                      </li>
                    </ul>
                  </div>

                  <a 
                    href="#"
                    className="mt-8 w-full py-3 text-center text-sm font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all block"
                  >
                    Start Free
                  </a>
                </div>

                {/* Plan 2: Growth (Highlighted) */}
                <div className="bg-white border-2 border-indigo-600 rounded-2xl p-8 flex flex-col justify-between shadow-xl shadow-indigo-50/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-bl-xl">
                    Most Popular
                  </div>
                  
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between mr-24">
                        <h3 className="text-lg font-bold text-slate-900">Growth</h3>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-slate-500">For scaling organizations routing traffic</p>
                        {billingPeriod === "yearly" && (
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                            2 months free
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-slate-900">
                        {billingPeriod === "monthly" ? "$399" : "$3,990"}
                      </span>
                      <span className="text-sm font-medium text-slate-500">
                        {billingPeriod === "monthly" ? "/mo" : "/yr"}
                      </span>
                    </div>

                    <ul className="flex flex-col gap-3 text-xs font-semibold text-slate-600 border-t border-slate-100 pt-6">
                      <li className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" /> 3 Domains
                      </li>
                      <li className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" /> Unlimited Rules
                      </li>
                      <li className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" /> Full Ad & Outbound Integrations
                      </li>
                      <li className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" /> Premium SLA Agreement
                      </li>
                    </ul>
                  </div>

                  <a 
                    href="#"
                    className="mt-8 w-full py-3 text-center text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-md shadow-indigo-200 block"
                  >
                    Start Free
                  </a>
                </div>

                {/* Plan 3: Pro */}
                <div className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900">Pro</h3>
                        {billingPeriod === "yearly" && (
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                            2 months free
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">For enterprise-grade logic operations</p>
                    </div>
                    
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-slate-900">
                        {billingPeriod === "monthly" ? "$799" : "$7,990"}
                      </span>
                      <span className="text-sm font-medium text-slate-500">
                        {billingPeriod === "monthly" ? "/mo" : "/yr"}
                      </span>
                    </div>

                    <ul className="flex flex-col gap-3 text-xs font-semibold text-slate-600 border-t border-slate-100 pt-6">
                      <li className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" /> 10 Domains
                      </li>
                      <li className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" /> API Access & Webhooks
                      </li>
                      <li className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" /> Custom Inbound Signals
                      </li>
                      <li className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" /> Priority Support Rep
                      </li>
                    </ul>
                  </div>

                  <a 
                    href="#"
                    className="mt-8 w-full py-3 text-center text-sm font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all block"
                  >
                    Contact Us
                  </a>
                </div>

              </div>
            </motion.section>

          </main>

          {/* 7. THE FOOTER (DEEP CHARCOAL ANCHOR) */}
          <footer className={`bg-slate-950 text-slate-400 py-16 border-t border-slate-800 transition-opacity duration-1000 ease-in-out ${isRevealed ? "opacity-100" : "opacity-0"}`}>
            <div className="max-w-6xl mx-auto px-6 flex flex-col gap-12">
              
              {/* Footer Banner CTA */}
              <div className="flex flex-col items-center text-center gap-8 pb-12 border-b border-slate-900 w-full">
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                    See what your prospects would see — in 20 minutes.
                  </h3>
                  <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
                    We&apos;ll show you a live demo on your actual website. No slides. No fluff. Just results.
                  </p>
                </div>
                
                <div className="flex flex-col items-center gap-4">
                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a 
                      href="https://cal.com/sharath.mb/demo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl shadow-lg transition-all duration-300"
                    >
                      Book a Demo &rarr;
                    </a>
                    <a 
                      href="#pricing"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold text-slate-300 bg-transparent hover:bg-slate-900/50 hover:text-white border border-white/40 hover:border-white/60 rounded-xl transition-all duration-300"
                    >
                      See Pricing &darr;
                    </a>
                  </div>

                  {/* Trust Signals */}
                  <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-slate-200 font-semibold mt-1">
                    <span className="flex items-center gap-1.5"><span className="text-[#22c55e] font-bold">✓</span> No credit card required</span>
                    <span className="text-slate-500 hidden sm:inline">•</span>
                    <span className="flex items-center gap-1.5"><span className="text-[#22c55e] font-bold">✓</span> 20-minute founder-led demo</span>
                    <span className="text-slate-500 hidden sm:inline">•</span>
                    <span className="flex items-center gap-1.5"><span className="text-[#22c55e] font-bold">✓</span> Live on your website same day</span>
                  </div>

                  {/* Urgency Line */}
                  <p className="text-xs italic text-slate-300 mt-0.5">
                    We personally onboard every new customer. Spots are limited.
                  </p>
                </div>
              </div>

              {/* Sitemap Links */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-white">
                    <svg viewBox="0 0 100 100" className="w-6 h-6 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M 68 18 A 34 34 0 1 0 36 75 L 43 65 A 24 24 0 1 1 68 28 Z" fill="currentColor" />
                      <circle cx="50" cy="46" r="15" stroke="currentColor" strokeWidth="4.5" fill="none" />
                      <rect x="38" y="36.5" width="24" height="15" rx="7.5" fill="currentColor" />
                      <path d="M 57.5 40 L 58.5 43.5 L 62 44.5 L 58.5 45.5 L 57.5 49 L 56.5 45.5 L 53 44.5 L 56.5 43.5 Z" fill="black" />
                      <rect x="33.5" y="42" width="3" height="8" rx="1.5" fill="currentColor" />
                      <rect x="63.5" y="42" width="3" height="8" rx="1.5" fill="currentColor" />
                      <path d="M 37 60 C 37 56, 63 56, 63 60 L 61 63 C 61 63, 50 65, 39 63 Z" fill="currentColor" />
                      <path d="M 42 63.5 C 46 65.5, 54 65.5, 58 63.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      <path d="M 20 70 C 24 85, 48 89, 70 65 L 65 61 C 45 81, 26 79, 23 68 Z" fill="currentColor" />
                      <path d="M 72 63 L 83 52 L 80 49 L 75 56 L 68 53 L 67 59 Z M 71 58 L 65 64 M 76 61 L 70 67" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                    <span className="font-bold">Churnaut</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">
                    Empowering sales pipelines with 100% deterministic intent signals and instant page morphing.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Product</span>
                  <a href="#features" className="text-xs hover:text-white transition-colors">Features</a>
                  <a href="#integrations" className="text-xs hover:text-white transition-colors">Integrations</a>
                  <a href="#pricing" className="text-xs hover:text-white transition-colors">Pricing Plans</a>
                </div>

                <div className="flex flex-col gap-3">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Company</span>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveModal("about"); }} className="text-xs hover:text-white transition-colors">About Us</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveModal("careers"); }} className="text-xs hover:text-white transition-colors">Careers</a>
                  <a href="mailto:support@churnaut.com?subject=Churnaut Support Request" className="text-xs hover:text-white transition-colors">Contact Support</a>
                </div>

                <div className="flex flex-col gap-3">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Legal</span>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveModal("privacy"); }} className="text-xs hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveModal("terms"); }} className="text-xs hover:text-white transition-colors">Terms of Service</a>
                </div>

              </div>

              {/* Bottom Copyright bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-900 text-[11px] text-slate-500">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  <span>&copy; {new Date().getFullYear()} Churnaut Technologies Private Limited. All rights reserved.</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-400 animate-pulse"></span>
                    <span>Personalization Edge: 100% Nominal</span>
                  </div>
                </div>
                {/* Social Links */}
                <div className="flex items-center gap-4">
                  <a href="#" className="text-slate-500 hover:text-white transition-colors" aria-label="X (formerly Twitter)">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-slate-500 hover:text-white transition-colors" aria-label="LinkedIn">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-slate-500 hover:text-white transition-colors" aria-label="Instagram">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </footer>

          {/* Mobile Floating CTA Button */}
          <div className="fixed bottom-6 left-0 right-0 px-6 flex justify-center z-50 md:hidden pointer-events-none">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, type: "spring", stiffness: 100, damping: 15 }}
              className="pointer-events-auto"
            >
              <a
                href="https://cal.com/sharath.mb/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold text-white bg-[#7c3aed] rounded-full shadow-lg shadow-purple-500/30 hover:bg-[#6d28d9] transition-all"
              >
                Book a Demo
              </a>
            </motion.div>
          </div>

          {/* Footer Modals Overlay */}
          <AnimatePresence>
            {activeModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 md:p-6 backdrop-blur-sm"
                onClick={() => setActiveModal(null)}
              >
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.95 }}
                  transition={springTransition}
                  className="max-w-2xl w-full bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-2xl relative flex flex-col max-h-[85vh] outline-none"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button (X) */}
                  <button
                    onClick={() => setActiveModal(null)}
                    className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-950 flex items-center justify-center transition-colors shadow-sm z-50"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Modal Body */}
                  <div className="w-full h-full overflow-y-auto pr-1 custom-modal-scrollbar">
                    {activeModal === "about" && (
                      <div className="flex flex-col gap-6 text-left">
                        <div className="flex flex-col gap-1 border-b border-slate-200 pb-5">
                          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">About Churnaut</h2>
                          <p className="text-sm md:text-base text-[#7c3aed] font-semibold mt-1">
                            Making every B2B website as smart as the sales team behind it.
                          </p>
                        </div>
                        
                        <div className="flex flex-col gap-4 text-sm md:text-base text-slate-900 leading-relaxed">
                          <p>
                            Churnaut Technologies Private Limited is a B2B SaaS company founded in 2026 and headquartered in Bengaluru, India.
                          </p>
                          <p>
                            We build revenue personalization infrastructure for modern B2B sales and marketing teams. Our platform connects your CRM to your website — so every prospect that clicks a tracked link lands on a page that already knows who they are, what stage they&apos;re at, and what they need to see next.
                          </p>
                          
                          <p className="font-bold text-slate-900 mt-2">Churnaut is built on two pillars:</p>
                          
                          <div className="flex flex-col gap-4 pl-3 border-l-2 border-indigo-500/50">
                            <div className="flex flex-col gap-1">
                              <span className="font-bold text-slate-900 text-sm md:text-base">Website Personalization</span>
                              <span className="text-slate-900">
                                deterministic, signal-based DOM personalization that fires in under 400ms. No guesswork. No IP deanonymization. Only verified signals.
                              </span>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="font-bold text-slate-900 text-sm md:text-base">Scout AI</span>
                              <span className="text-slate-900">
                                an AI pipeline intelligence layer that scores every deal in your HubSpot pipeline, flags at-risk deals before they go cold, writes rep outreach automatically, and learns from every closed-lost deal.
                              </span>
                            </div>
                          </div>
                          
                          <p className="mt-2">
                            We are a small, focused team that ships fast and stays close to our customers. Every new customer gets a founder-led onboarding session.
                          </p>
                          <p>
                            Our mission is simple: your website should work as hard as your sales team.
                          </p>
                        </div>
                        
                        <div className="border-t border-slate-200 pt-5 text-xs text-slate-500 text-center font-medium mt-auto">
                          Churnaut Technologies Private Limited &middot; Bengaluru, India &middot; hello@churnaut.com
                        </div>
                      </div>
                    )}

                    {activeModal === "privacy" && (
                      <div className="flex flex-col gap-6 text-left">
                        <div className="flex flex-col gap-1 border-b border-slate-200 pb-5">
                          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Privacy Policy</h2>
                          <p className="text-xs text-slate-500 mt-1">Last updated: June 2026</p>
                        </div>
                        
                        <div className="flex flex-col gap-5 text-xs md:text-sm text-slate-900 leading-relaxed">
                          {[
                            {
                              num: "1",
                              title: "What We Collect",
                              content: "We collect information you provide directly (name, email, company) when you sign up or book a demo. We also collect visitor tracking data through our JavaScript snippet installed on customer websites — this includes session IDs, UTM parameters, and ad click identifiers. We do not collect personally identifiable information from website visitors without a verified signal."
                            },
                            {
                              num: "2",
                              title: "How We Use Your Data",
                              content: "We use your data to provide and improve the Churnaut platform, send product updates and support communications, and generate pipeline intelligence through Scout AI. We never sell your data to third parties. Ever."
                            },
                            {
                              num: "3",
                              title: "Data Storage & Security",
                              content: "All data is stored in Supabase (PostgreSQL) with row-level security enabled. Data in transit is encrypted via TLS. Our CDN is served through Cloudflare. OAuth tokens are encrypted at rest."
                            },
                            {
                              num: "4",
                              title: "Cookies",
                              content: "We use a single first-party cookie (_sr_visitor) to identify returning visitors for personalization purposes. This cookie expires after 30 days. We do not use third-party advertising cookies."
                            },
                            {
                              num: "5",
                              title: "Your Rights",
                              content: "You can request deletion of your data at any time by emailing support@churnaut.com. We will process all deletion requests within 14 business days."
                            },
                            {
                              num: "6",
                              title: "Contact",
                              content: "For privacy-related questions: support@churnaut.com"
                            }
                          ].map((sec) => (
                            <div key={sec.num} className="flex flex-col gap-1.5">
                              <h3 className="font-bold text-slate-900 text-sm md:text-base flex items-center gap-2">
                                <span className="text-[10px] bg-slate-100 border border-slate-200 text-indigo-600 w-5 h-5 rounded-md flex items-center justify-center font-bold">{sec.num}</span>
                                {sec.title}
                              </h3>
                              <p className="text-slate-900 pl-7 text-xs md:text-sm">{sec.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeModal === "terms" && (
                      <div className="flex flex-col gap-6 text-left">
                        <div className="flex flex-col gap-1 border-b border-slate-200 pb-5">
                          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Terms of Service</h2>
                          <p className="text-xs text-slate-500 mt-1">Last updated: June 2026</p>
                        </div>
                        
                        <div className="flex flex-col gap-5 text-xs md:text-sm text-slate-900 leading-relaxed">
                          {[
                            {
                              num: "1",
                              title: "Acceptance",
                              content: "By accessing or using Churnaut, you agree to these Terms. If you do not agree, do not use the platform."
                            },
                            {
                              num: "2",
                              title: "Use of the Platform",
                              content: "Churnaut is a B2B SaaS platform. You may use it only for lawful business purposes. You may not resell, reverse engineer, or attempt to extract the underlying source code of the platform."
                            },
                            {
                              num: "3",
                              title: "Your Data",
                              content: "You retain ownership of all data you bring into Churnaut — including CRM data, visitor data, and routing rules. We process this data on your behalf to provide the service."
                            },
                            {
                              num: "4",
                              title: "Payment & Cancellation",
                              content: "Subscription fees are billed monthly or annually. You may cancel at any time. No refunds are issued for partial billing periods. Annual plans are non-refundable after 14 days."
                            },
                            {
                              num: "5",
                              title: "Limitation of Liability",
                              content: "Churnaut is provided as-is. We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform. Our total liability shall not exceed the amount you paid us in the last 3 months."
                            },
                            {
                              num: "6",
                              title: "Changes to Terms",
                              content: "We may update these Terms at any time. We will notify you by email at least 14 days before material changes take effect."
                            },
                            {
                              num: "7",
                              title: "Governing Law",
                              content: "These Terms are governed by the laws of India. Any disputes shall be resolved in the courts of Bengaluru, Karnataka."
                            },
                            {
                              num: "8",
                              title: "Contact",
                              content: "For legal inquiries: support@churnaut.com"
                            }
                          ].map((sec) => (
                            <div key={sec.num} className="flex flex-col gap-1.5">
                              <h3 className="font-bold text-slate-900 text-sm md:text-base flex items-center gap-2">
                                <span className="text-[10px] bg-slate-100 border border-slate-200 text-indigo-600 w-5 h-5 rounded-md flex items-center justify-center font-bold">{sec.num}</span>
                                {sec.title}
                              </h3>
                              <p className="text-slate-900 pl-7 text-xs md:text-sm">{sec.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeModal === "careers" && (
                      <div className="flex flex-col gap-6 text-left">
                        <div className="flex flex-col gap-2.5 border-b border-slate-200 pb-5">
                          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Join Churnaut</h2>
                          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                            We&apos;re a small team building something genuinely new in B2B sales tech. We move fast, stay close to customers, and give everyone real ownership of their work. Both roles are fully remote.
                          </p>
                        </div>
                        
                        <div className="flex flex-col gap-6">
                          {/* Job Card 1 */}
                          <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                              <div className="flex flex-col">
                                <h3 className="text-base md:text-lg font-bold text-slate-900">Sales Development Representative (SDR)</h3>
                                <span className="text-xs text-[#7c3aed] font-semibold mt-0.5">India (Any City)</span>
                              </div>
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full self-start">
                                Full-Time &middot; Remote
                              </span>
                            </div>
                            
                            <div className="flex flex-col gap-3 text-xs md:text-sm text-slate-905">
                              <div className="flex flex-col gap-1">
                                <span className="font-bold text-slate-900">About the role:</span>
                                <p className="leading-relaxed text-slate-605">
                                  As our first SDR, you&apos;ll own the top of our outbound pipeline. You&apos;ll research and prospect B2B SaaS companies, run cold email and LinkedIn sequences, qualify inbound demo requests, and hand off warm opportunities to the founder. You&apos;ll be working directly with the founding team — no layers, no bureaucracy.
                                </p>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="font-bold text-slate-900">What you&apos;ll do:</span>
                                <ul className="list-disc list-inside flex flex-col gap-1 pl-1 leading-relaxed text-slate-605">
                                  <li>Research and build targeted prospect lists of B2B SaaS companies (50-500 employees)</li>
                                  <li>Write and send personalized cold email and LinkedIn outreach sequences</li>
                                  <li>Qualify inbound leads and book discovery calls</li>
                                  <li>Maintain clean CRM records and track outreach performance</li>
                                  <li>Collaborate directly with the founder on messaging and ICP refinement</li>
                                </ul>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="font-bold text-slate-900">What we&apos;re looking for:</span>
                                <ul className="list-disc list-inside flex flex-col gap-1 pl-1 leading-relaxed text-slate-605">
                                  <li>0-1 years of experience (freshers welcome)</li>
                                  <li>Strong written English — clear, concise, human</li>
                                  <li>Genuine curiosity about B2B SaaS and sales</li>
                                  <li>Self-starter who doesn&apos;t need to be micromanaged</li>
                                  <li>Bonus: experience with Apollo, Instantly, or any outbound tool</li>
                                </ul>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="font-bold text-slate-900">What you get:</span>
                                <ul className="list-disc list-inside flex flex-col gap-1 pl-1 leading-relaxed text-slate-605">
                                  <li>Fully remote — work from anywhere in India</li>
                                  <li>Competitive fresher stipend + performance bonus</li>
                                  <li>Direct mentorship from the founder</li>
                                  <li>Ground floor opportunity at an early-stage SaaS company</li>
                                </ul>
                              </div>
                            </div>
                            
                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 mt-2 flex flex-col gap-1.5">
                              <span className="text-xs font-bold text-slate-900">To apply:</span>
                              <p className="text-xs text-slate-600 leading-relaxed">
                                Send your resume and a 3-line note on why you want this role to <a href="mailto:careers@churnaut.com" className="text-indigo-600 hover:underline">careers@churnaut.com</a> with subject line <code className="bg-slate-100 border border-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-mono text-[10px]">SDR Application — [Your Name]</code>
                              </p>
                            </div>
                          </div>

                          {/* Divider */}
                          <div className="border-t border-slate-200 my-2"></div>

                          {/* Job Card 2 */}
                          <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                              <div className="flex flex-col">
                                <h3 className="text-base md:text-lg font-bold text-slate-900">Customer Success Manager (CSM)</h3>
                                <span className="text-xs text-[#7c3aed] font-semibold mt-0.5">India (Any City)</span>
                              </div>
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full self-start">
                                Full-Time &middot; Remote
                              </span>
                            </div>
                            
                            <div className="flex flex-col gap-3 text-xs md:text-sm text-slate-905">
                              <div className="flex flex-col gap-1">
                                <span className="font-bold text-slate-900">About the role:</span>
                                <p className="leading-relaxed text-slate-605">
                                  As our first CSM, you&apos;ll own the post-sale experience for every Churnaut customer. You&apos;ll onboard new customers, help them get their first personalization rules live, monitor their usage, and make sure they&apos;re seeing results. You&apos;ll be the person customers trust — and the internal voice that makes our product better.
                                </p>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="font-bold text-slate-900">What you&apos;ll do:</span>
                                <ul className="list-disc list-inside flex flex-col gap-1 pl-1 leading-relaxed text-slate-605">
                                  <li>Own onboarding for all new customers — from signup to first rule live</li>
                                  <li>Run check-in calls and help customers expand their use of the platform</li>
                                  <li>Monitor customer health metrics and flag at-risk accounts early</li>
                                  <li>Gather product feedback and relay it to the founding team</li>
                                  <li>Build onboarding resources, guides, and templates</li>
                                </ul>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="font-bold text-slate-900">What we&apos;re looking for:</span>
                                <ul className="list-disc list-inside flex flex-col gap-1 pl-1 leading-relaxed text-slate-605">
                                  <li>0-1 years of experience (freshers welcome)</li>
                                  <li>Strong communication skills — written and verbal</li>
                                  <li>Patient, empathetic, and detail-oriented</li>
                                  <li>Comfortable learning a technical SaaS product quickly</li>
                                  <li>Bonus: background in sales, marketing, or RevOps</li>
                                </ul>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="font-bold text-slate-900">What you get:</span>
                                <ul className="list-disc list-inside flex flex-col gap-1 pl-1 leading-relaxed text-slate-605">
                                  <li>Fully remote — work from anywhere in India</li>
                                  <li>Competitive fresher stipend + performance bonus</li>
                                  <li>Direct mentorship from the founder</li>
                                  <li>Real ownership of the customer experience from day one</li>
                                </ul>
                              </div>
                            </div>
                            
                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 mt-2 flex flex-col gap-1.5">
                              <span className="text-xs font-bold text-slate-900">To apply:</span>
                              <p className="text-xs text-slate-600 leading-relaxed">
                                Send your resume and a 3-line note on why you want this role to <a href="mailto:careers@churnaut.com" className="text-indigo-600 hover:underline">careers@churnaut.com</a> with subject line <code className="bg-slate-100 border border-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-mono text-[10px]">CSM Application — [Your Name]</code>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
  );
}
