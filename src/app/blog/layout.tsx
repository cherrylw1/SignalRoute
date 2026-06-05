"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const springTransition = { type: "spring" as const, stiffness: 300, damping: 30 };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      {/* Dynamic Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass-blur-header border-b border-slate-200/80 shadow-sm py-4"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <svg viewBox="0 0 100 100" className="w-8 h-8 text-indigo-600" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              Churnaut
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/#features" className="text-slate-600 hover:text-slate-900 transition-colors">
              Product
            </Link>
            <Link href="/#integrations" className="text-slate-600 hover:text-slate-900 transition-colors">
              Integrations
            </Link>
            <Link href="/#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">
              Pricing
            </Link>
            <Link href="/blog" className="text-indigo-600 font-semibold transition-colors">
              Blog
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://app.churnaut.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors"
            >
              Sign In
            </a>
            <a
              href="https://cal.com/sharath.mb/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all bg-slate-900 text-white hover:bg-slate-800"
            >
              Book a Demo
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-4 text-sm font-semibold">
                <Link
                  href="/#features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-700 hover:text-slate-950 py-2 border-b border-slate-50"
                >
                  Product
                </Link>
                <Link
                  href="/#integrations"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-700 hover:text-slate-955 py-2 border-b border-slate-50"
                >
                  Integrations
                </Link>
                <Link
                  href="/#pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-700 hover:text-slate-955 py-2 border-b border-slate-50"
                >
                  Pricing
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-indigo-600 py-2 border-b border-slate-50"
                >
                  Blog
                </Link>
                <div className="flex items-center justify-between pt-2">
                  <a
                    href="https://app.churnaut.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 hover:text-slate-955"
                  >
                    Sign In
                  </a>
                  <a
                    href="https://cal.com/sharath.mb/demo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold"
                  >
                    Book a Demo
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area */}
      <div className="flex-grow pt-24">{children}</div>

      {/* Dynamic Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800">
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
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://cal.com/sharath.mb/demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl shadow-lg transition-all duration-300"
                >
                  Book a Demo &rarr;
                </a>
                <Link
                  href="/#pricing"
                  className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold text-slate-300 bg-transparent hover:bg-slate-900/50 hover:text-white border border-white/40 hover:border-white/60 rounded-xl transition-all duration-300"
                >
                  See Pricing &darr;
                </Link>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-slate-200 font-semibold mt-1">
                <span className="flex items-center gap-1.5">
                  <span className="text-[#22c55e] font-bold">✓</span> No credit card required
                </span>
                <span className="text-slate-500 hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#22c55e] font-bold">✓</span> 20-minute founder-led demo
                </span>
                <span className="text-slate-500 hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#22c55e] font-bold">✓</span> Live on your website same day
                </span>
              </div>

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
              <Link href="/#features" className="text-xs hover:text-white transition-colors">Features</Link>
              <Link href="/#integrations" className="text-xs hover:text-white transition-colors">Integrations</Link>
              <Link href="/#pricing" className="text-xs hover:text-white transition-colors">Pricing Plans</Link>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Company</span>
              <button onClick={() => setActiveModal("about")} className="text-xs text-left hover:text-white transition-colors">About Us</button>
              <button onClick={() => setActiveModal("careers")} className="text-xs text-left hover:text-white transition-colors">Careers</button>
              <a href="mailto:support@churnaut.com?subject=Churnaut Support Request" className="text-xs hover:text-white transition-colors">Contact Support</a>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Legal</span>
              <button onClick={() => setActiveModal("privacy")} className="text-xs text-left hover:text-white transition-colors">Privacy Policy</button>
              <button onClick={() => setActiveModal("terms")} className="text-xs text-left hover:text-white transition-colors">Terms of Service</button>
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
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-950 flex items-center justify-center transition-colors shadow-sm z-50"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

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
                      <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col gap-4 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                          <div className="flex flex-col">
                            <h3 className="text-base md:text-lg font-bold text-slate-900">Sales Development Representative (SDR)</h3>
                            <span className="text-xs text-[#7c3aed] font-semibold mt-0.5">India (Any City)</span>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full self-start">
                            Full-Time &middot; Remote
                          </span>
                        </div>
                        <div className="flex flex-col gap-3 text-xs md:text-sm text-slate-900">
                          <span className="font-bold text-slate-900">About the role:</span>
                          <p className="leading-relaxed text-slate-700">
                            As our first SDR, you&apos;ll own the top of our outbound pipeline. You&apos;ll research and prospect B2B SaaS companies, run cold email and LinkedIn sequences, qualify inbound demo requests, and hand off warm opportunities to the founder.
                          </p>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 mt-2 flex flex-col gap-1.5">
                          <span className="text-xs font-bold text-slate-900">To apply:</span>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            Send your resume and a 3-line note to <a href="mailto:careers@churnaut.com" className="text-indigo-600 hover:underline">careers@churnaut.com</a>
                          </p>
                        </div>
                      </div>

                      <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col gap-4 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                          <div className="flex flex-col">
                            <h3 className="text-base md:text-lg font-bold text-slate-900">Customer Success Manager (CSM)</h3>
                            <span className="text-xs text-[#7c3aed] font-semibold mt-0.5">India (Any City)</span>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full self-start">
                            Full-Time &middot; Remote
                          </span>
                        </div>
                        <div className="flex flex-col gap-3 text-xs md:text-sm text-slate-900">
                          <span className="font-bold text-slate-900">About the role:</span>
                          <p className="leading-relaxed text-slate-700">
                            As our first CSM, you&apos;ll own the post-sale experience for every Churnaut customer. You&apos;ll onboard new customers, help them get their first personalization rules live, monitor their usage, and make sure they&apos;re seeing results.
                          </p>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 mt-2 flex flex-col gap-1.5">
                          <span className="text-xs font-bold text-slate-900">To apply:</span>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            Send your resume and a 3-line note to <a href="mailto:careers@churnaut.com" className="text-indigo-600 hover:underline">careers@churnaut.com</a>
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
  );
}
