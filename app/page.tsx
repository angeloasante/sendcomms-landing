"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col w-full selection:bg-brand-100 selection:text-brand-900 overflow-x-hidden">
      <Header />

      {/* Main Content */}
      <main className="flex-grow pt-32 pb-0 relative">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8 relative z-10 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900 text-blue-600 dark:text-blue-400 text-xs font-medium mb-4">
            <Icon icon="lucide:sparkles" width={12} />
            <span>New: Next.js 16 Support & Sandbox Mode</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-foreground leading-[1.1]">
            Unified communication <br className="hidden md:block" />
            <span className="text-foreground">infrastructure for Africa</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground font-normal max-w-2xl mx-auto leading-relaxed">
            Integrate Email, SMS, Data Bundles, and Airtime into your applications with a single, powerful API. Comprehensive guides and multi-language support included.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4 flex-wrap">
            <a href="https://docs.sendcomms.com/docs" target="_blank" rel="noopener noreferrer" className="bg-primary text-primary-foreground px-6 py-3.5 rounded-lg font-medium text-sm hover:opacity-90 transition-all shadow-xl flex items-center gap-2">
              <Icon icon="lucide:book-open" width={16} />
              Read Documentation
            </a>
            <a href="https://console.sendcomms.com" target="_blank" rel="noopener noreferrer" className="bg-card text-card-foreground border border-border px-6 py-3.5 rounded-lg font-medium text-sm hover:bg-accent transition-all flex items-center gap-2">
              Get started
            </a>
          </div>
        </div>

        {/* Interactive Diagram Section */}
        <div className="mb-24 max-w-7xl mx-auto px-4 relative h-[500px] hidden lg:block">
          {/* SVG Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 text-slate-300 dark:text-slate-700" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: "currentColor", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "currentColor", stopOpacity: 0.6 }} />
              </linearGradient>
            </defs>

            {/* Paths */}
            <path d="M 250 250 C 350 250, 400 250, 520 250" stroke="url(#lineGradient)" strokeWidth="1.5" fill="none" />
            <path d="M 760 250 C 850 250, 850 120, 1050 120" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M 760 250 C 850 250, 850 250, 1050 250" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M 760 250 C 850 250, 850 380, 1050 380" stroke="currentColor" strokeWidth="1.5" fill="none" />

            {/* Incoming Dot (Left to Center) */}
            <circle r="3" fill="#3b82f6">
              <animateMotion dur="3s" repeatCount="indefinite" path="M 250 250 C 350 250, 400 250, 520 250" keyTimes="0;0.5;1" keyPoints="0;1;1" calcMode="linear" />
              <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.45;0.5;1" dur="3s" repeatCount="indefinite" />
            </circle>

            {/* Outgoing Dots (Center to Right) */}
            <circle r="3" fill="#3b82f6">
              <animateMotion dur="3s" repeatCount="indefinite" path="M 760 250 C 850 250, 850 120, 1050 120" keyTimes="0;0.5;1" keyPoints="0;0;1" calcMode="linear" />
              <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.5;0.51;0.9;1" dur="3s" repeatCount="indefinite" />
            </circle>

            <circle r="3" fill="#3b82f6">
              <animateMotion dur="3s" repeatCount="indefinite" path="M 760 250 C 850 250, 850 250, 1050 250" keyTimes="0;0.5;1" keyPoints="0;0;1" calcMode="linear" />
              <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.5;0.51;0.9;1" dur="3s" repeatCount="indefinite" />
            </circle>

            <circle r="3" fill="#3b82f6">
              <animateMotion dur="3s" repeatCount="indefinite" path="M 760 250 C 850 250, 850 380, 1050 380" keyTimes="0;0.5;1" keyPoints="0;0;1" calcMode="linear" />
              <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.5;0.51;0.9;1" dur="3s" repeatCount="indefinite" />
            </circle>
          </svg>

          {/* Left Node */}
          <div className="absolute left-[5%] top-1/2 -translate-y-1/2 z-10">
            <div className="glass-card p-4 rounded-xl flex items-center gap-3 w-48">
              <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                <Icon icon="lucide:terminal" width={20} />
              </div>
              <div>
                <div className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Your App</div>
                <div className="text-xs text-muted-foreground">Node, Python, PHP</div>
              </div>
            </div>
          </div>

          {/* Center Node */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[240px]">
            <div className="glass-card p-6 rounded-2xl shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center shadow-lg overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="SendComms Logo"
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <div className="text-base font-semibold" style={{ color: 'var(--foreground)' }}>SendComms API</div>
                  <div className="text-xs text-muted-foreground mt-1">Unified Gateway</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Nodes */}
          <div className="absolute right-[5%] top-[120px] -translate-y-1/2 z-10">
            <div className="glass-card p-3 pr-5 rounded-xl flex items-center gap-3 min-w-[180px]">
              <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Icon icon="lucide:mail" width={18} />
              </div>
              <div>
                <div className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Email API</div>
                <div className="text-[10px] text-muted-foreground">Transactional</div>
              </div>
            </div>
          </div>
          <div className="absolute right-[5%] top-1/2 -translate-y-1/2 z-10">
            <div className="glass-card p-3 pr-5 rounded-xl flex items-center gap-3 min-w-[180px]">
              <div className="w-9 h-9 rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800 flex items-center justify-center text-green-600 dark:text-green-400">
                <Icon icon="lucide:message-square" width={18} />
              </div>
              <div>
                <div className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>SMS API</div>
                <div className="text-[10px] text-muted-foreground">180+ Countries</div>
              </div>
            </div>
          </div>
          <div className="absolute right-[5%] top-[380px] -translate-y-1/2 z-10">
            <div className="glass-card p-3 pr-5 rounded-xl flex items-center gap-3 min-w-[180px]">
              <div className="w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-900/30 border border-purple-100 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <Icon icon="lucide:wifi" width={18} />
              </div>
              <div>
                <div className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Data Bundles</div>
                <div className="text-[10px] text-muted-foreground">Ghana Networks</div>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted By Section */}
        <div className="w-full mt-8 mb-24">
          <style jsx>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 40s linear infinite;
            }
          `}</style>
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-10">
            Trusted by ambitious teams
          </p>
          <div className="w-full overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            <div className="flex items-center gap-16 w-max animate-marquee">
              {/* Brand Set 1 */}
              <div className="flex items-center gap-16 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <Image src="/diaspora-ai.png" alt="Diaspora AI" width={28} height={28} className="rounded" />
                  <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Diaspora AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/anon.png" alt="ANON" width={28} height={28} className="rounded" />
                  <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>ANON</span>
                </div>
                <Image src="/biolink.png" alt="Biofolio.link" width={168} height={168} className="rounded" />
                <div className="flex items-center gap-2">
                  <Image src="/TD.png" alt="TD" width={84} height={84} className="rounded" />
                  <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>TD</span>
                </div>
                <Image src="/NDS.png" alt="NDS" width={56} height={56} className="rounded" />
              </div>

              {/* Brand Set 2 */}
              <div className="flex items-center gap-16 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <Image src="/diaspora-ai.png" alt="Diaspora AI" width={28} height={28} className="rounded" />
                  <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Diaspora AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/anon.png" alt="ANON" width={28} height={28} className="rounded" />
                  <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>ANON</span>
                </div>
                <Image src="/biolink.png" alt="Biofolio.link" width={168} height={168} className="rounded" />
                <div className="flex items-center gap-2">
                  <Image src="/TD.png" alt="TD" width={84} height={84} className="rounded" />
                  <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>TD</span>
                </div>
                <Image src="/NDS.png" alt="NDS" width={56} height={56} className="rounded" />
              </div>

              {/* Brand Set 3 */}
              <div className="flex items-center gap-16 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <Image src="/diaspora-ai.png" alt="Diaspora AI" width={28} height={28} className="rounded" />
                  <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Diaspora AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/anon.png" alt="ANON" width={28} height={28} className="rounded" />
                  <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>ANON</span>
                </div>
                <Image src="/biolink.png" alt="Biofolio.link" width={168} height={168} className="rounded" />
                <div className="flex items-center gap-2">
                  <Image src="/TD.png" alt="TD" width={84} height={84} className="rounded" />
                  <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>TD</span>
                </div>
                <Image src="/NDS.png" alt="NDS" width={56} height={56} className="rounded" />
              </div>

              {/* Brand Set 4 */}
              <div className="flex items-center gap-16 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <Image src="/diaspora-ai.png" alt="Diaspora AI" width={28} height={28} className="rounded" />
                  <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Diaspora AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/anon.png" alt="ANON" width={28} height={28} className="rounded" />
                  <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>ANON</span>
                </div>
                <Image src="/biolink.png" alt="Biofolio.link" width={168} height={168} className="rounded" />
                <div className="flex items-center gap-2">
                  <Image src="/TD.png" alt="TD" width={84} height={84} className="rounded" />
                </div>
                <Image src="/NDS.png" alt="NDS" width={56} height={56} className="rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <section className="max-w-7xl mx-auto px-6 py-20 relative overflow-hidden bg-muted/50">
          <div className="text-center mb-16">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">How it works</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-4 tracking-tight">
              One API for all your <br className="hidden md:block" />communication needs
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mb-4">
                <Icon icon="lucide:key" width={20} className="text-muted-foreground" />
              </div>
              <h3 className="font-medium text-foreground mb-2">1. Get Your API Key</h3>
              <p className="text-sm text-muted-foreground">Sign up and get your API key in seconds. Test free with sandbox mode.</p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mb-4">
                <Icon icon="lucide:code" width={20} className="text-muted-foreground" />
              </div>
              <h3 className="font-medium text-foreground mb-2">2. Integrate Once</h3>
              <p className="text-sm text-muted-foreground">One unified API for Email, SMS, Data & Airtime across Africa.</p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mb-4">
                <Icon icon="lucide:rocket" width={20} className="text-muted-foreground" />
              </div>
              <h3 className="font-medium text-foreground mb-2">3. Go Live</h3>
              <p className="text-sm text-muted-foreground">Reach customers across 180+ countries instantly.</p>
            </div>
          </div>
        </section>

        {/* Built for Operations Section */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Why SendComms</span>
            <h2 className="text-3xl md:text-5xl font-semibold text-foreground mt-4 mb-4 tracking-tighter">
              Stop juggling<br />multiple providers
            </h2>
            <p className="text-muted-foreground text-lg">
              One integration. Every channel.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Card 1: Connects to entire stack */}
            <div className="bg-muted/50 border border-border rounded-[2rem] p-8 md:p-12 relative overflow-hidden group hover:border-muted-foreground/20 transition-all h-[400px] flex flex-col justify-end">
              <div className="absolute inset-0 flex items-center justify-center -translate-y-12 scale-90 md:scale-100">
                <div className="relative w-[400px] h-[400px] flex items-center justify-center">
                  <div className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-border animate-spin-slow" style={{ animationDuration: "60s" }}></div>
                  <div className="absolute w-[240px] h-[240px] rounded-full border border-dashed border-border animate-spin-slow" style={{ animationDuration: "40s" }}></div>
                  <div className="absolute w-[120px] h-[120px] rounded-full border border-dashed border-border animate-spin-slow" style={{ animationDuration: "20s" }}></div>
                  
                  <div className="absolute w-16 h-16 bg-card rounded-2xl shadow-lg border border-border flex items-center justify-center z-10">
                    <Icon icon="lucide:zap" width={24} className="text-orange-400" />
                  </div>

                  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-8 h-8 bg-card rounded-full shadow-md border border-border flex items-center justify-center animate-float">
                    <Icon icon="lucide:database" width={14} className="text-blue-500" />
                  </div>
                  <div className="absolute bottom-20 left-10 w-8 h-8 bg-card rounded-full shadow-md border border-border flex items-center justify-center animate-float-delayed">
                    <Icon icon="lucide:webhook" width={14} className="text-green-500" />
                  </div>
                  <div className="absolute bottom-20 right-10 w-8 h-8 bg-card rounded-full shadow-md border border-border flex items-center justify-center animate-float">
                    <Icon icon="lucide:server" width={14} className="text-purple-500" />
                  </div>
                </div>
              </div>
              
              <div className="relative z-10 mt-auto">
                <h3 className="text-xl font-semibold text-foreground mb-2">Unified across providers</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">SendComms routes your messages through the best provider for each destination. Smart failover keeps you delivering.</p>
              </div>
            </div>

            {/* Card 2: Modern controls */}
            <div className="bg-muted/50 border border-border rounded-[2rem] p-8 md:p-12 relative overflow-hidden group hover:border-muted-foreground/20 transition-all h-[400px] flex flex-col justify-end">
              <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-[320px] space-y-4">
                <div className="bg-card rounded-xl p-3 shadow-sm border border-border flex items-center gap-3 transform -rotate-1 hover:rotate-0 transition-transform">
                  <div className="w-8 h-8 bg-orange-50 dark:bg-orange-950/50 rounded-lg flex items-center justify-center text-orange-500">
                    <Icon icon="lucide:git-pull-request" width={16} />
                  </div>
                  <div className="flex-1">
                    <div className="h-2 w-24 bg-muted rounded mb-1.5"></div>
                    <div className="h-1.5 w-12 bg-muted/50 rounded"></div>
                  </div>
                </div>
                <div className="bg-card rounded-xl p-3 shadow-sm border border-border flex items-center gap-3 transform translate-x-4 hover:translate-x-2 transition-transform">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                    <Icon icon="lucide:git-commit" width={16} />
                  </div>
                  <div className="flex-1">
                    <div className="h-2 w-32 bg-muted rounded mb-1.5"></div>
                    <div className="h-1.5 w-20 bg-muted/50 rounded"></div>
                  </div>
                  <div className="px-2 py-0.5 bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400 text-[10px] font-medium rounded-full">v2.4</div>
                </div>
                <div className="bg-card rounded-xl p-3 shadow-sm border border-border flex items-center gap-3 transform -translate-x-2 rotate-1 hover:rotate-0 transition-transform">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                    <Icon icon="lucide:history" width={16} />
                  </div>
                  <div className="flex-1">
                    <div className="h-2 w-20 bg-muted rounded mb-1.5"></div>
                    <div className="h-1.5 w-16 bg-muted/50 rounded"></div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-auto">
                <h3 className="text-xl font-semibold text-foreground mb-2">Test without charges</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">Sandbox mode gives you realistic mock responses. Ship with confidence before going live.</p>
              </div>
            </div>

            {/* Card 3: Less time servicing requests */}
            <div className="bg-muted/50 border border-border rounded-[2rem] p-8 md:p-12 relative overflow-hidden group hover:border-muted-foreground/20 transition-all h-[400px] flex flex-col justify-end">
              <div className="absolute top-8 left-0 w-full p-8 space-y-4">
                <div className="flex justify-end">
                  <div className="bg-card border border-border text-xs text-muted-foreground px-4 py-2.5 rounded-2xl rounded-tr-sm shadow-sm flex items-center gap-2 transform translate-x-4 opacity-60">
                    <Icon icon="lucide:mail" width={12} className="text-blue-400" />
                    Sending welcome email to customer@example.com
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-card border border-border text-xs text-foreground font-medium px-4 py-3 rounded-2xl rounded-tr-sm shadow-md flex items-center gap-2 transform -translate-x-2 z-10">
                    <Icon icon="lucide:message-square" width={14} className="text-green-500" />
                    SMS sent to +233540800994 ✓
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-card border border-border text-xs text-muted-foreground px-4 py-2.5 rounded-2xl rounded-tr-sm shadow-sm flex items-center gap-2 transform translate-x-2 opacity-80">
                    <Icon icon="lucide:wifi" width={12} className="text-purple-400" />
                    1GB data bundle purchased for MTN Ghana
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-auto">
                <h3 className="text-xl font-semibold text-foreground mb-2">Every channel, one API</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">Email, SMS, Data Bundles, Airtime. All with consistent request/response formats.</p>
              </div>
            </div>

            {/* Card 4: Warehouse native */}
            <div className="bg-muted/50 border border-border rounded-[2rem] p-8 md:p-12 relative overflow-hidden group hover:border-muted-foreground/20 transition-all h-[400px] flex flex-col justify-end">
              <div className="absolute inset-0 flex items-center justify-center -translate-y-12">
                <div className="relative w-48 h-32">
                  <svg className="w-full h-full text-card drop-shadow-xl" viewBox="0 0 100 60" fill="currentColor">
                    <path d="M25 50 C10 50 0 40 0 25 C0 10 15 0 30 0 C40 0 45 5 50 10 C55 5 60 0 70 0 C85 0 100 10 100 25 C100 40 90 50 75 50 Z" />
                  </svg>
                  <svg className="absolute inset-0 w-full h-full text-border pointer-events-none" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="0.5">
                    <path d="M25 50 C10 50 0 40 0 25 C0 10 15 0 30 0 C40 0 45 5 50 10 C55 5 60 0 70 0 C85 0 100 10 100 25 C100 40 90 50 75 50 Z" />
                  </svg>
                  <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-blue-50 dark:bg-blue-950/50 rounded-full flex items-center justify-center text-blue-500">
                    <Icon icon="lucide:snowflake" width={16} />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-orange-50 dark:bg-orange-950/50 rounded-full flex items-center justify-center text-orange-500">
                    <Icon icon="lucide:database" width={16} />
                  </div>
                  <div className="absolute top-1/2 left-3/4 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-blue-50 dark:bg-blue-950/50 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Icon icon="lucide:server" width={16} />
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-auto">
                <h3 className="text-xl font-semibold text-foreground mb-2">Built for Everyone</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">SMS coverage across 180+ countries. Local carriers. Local numbers. Regional expertise.</p>
              </div>
            </div>

            {/* Secure by Default Banner */}
            <div className="col-span-1 lg:col-span-2 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-1/2 h-full border-l border-white/20 dark:border-white/5 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-l from-blue-100/20 dark:from-blue-900/20 to-transparent"></div>
              </div>

              <div className="relative z-10 max-w-xl">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">Reliable & Secure</h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  99.9% uptime SLA. End-to-end encryption. Detailed delivery logs and webhook notifications for every message.
                </p>
              </div>

              <div className="relative z-10 flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex flex-col items-center justify-center text-white border-4 border-white/20 p-4 text-center">
                  <div className="text-3xl md:text-4xl font-bold tracking-tight mb-1">99.9%</div>
                  <div className="text-xs opacity-80 uppercase tracking-widest">Uptime SLA</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Developer Experience Section */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="bg-slate-950 rounded-[2.5rem] overflow-hidden relative shadow-2xl shadow-slate-900/20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="relative z-10 px-8 py-20 md:px-20 md:py-24 text-center">
              <div className="flex items-center justify-center gap-2 text-blue-400 text-xs font-medium uppercase tracking-wider mb-6">
                <Icon icon="lucide:code-2" width={14} />
                Developer Experience
              </div>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
                Ship in minutes, not weeks
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed mb-12">
                Clean REST APIs with SDKs for Node.js, Python, and PHP. Comprehensive docs, sandbox mode, and webhook support out of the box.
              </p>
              <div className="max-w-3xl mx-auto text-left">
                <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-4 shadow-lg mb-8 font-mono text-sm">
                  <div className="text-slate-500 mb-2"># Send an SMS in one line</div>
                  <div className="text-slate-200">
                    <span className="text-blue-400">curl</span> -X POST https://api.sendcomms.com/v1/sms/send \
                  </div>
                  <div className="text-slate-200 pl-4">
                    -H <span className="text-green-400">&quot;Authorization: Bearer YOUR_API_KEY&quot;</span> \
                  </div>
                  <div className="text-slate-200 pl-4">
                    -d <span className="text-amber-400">&apos;&#123;&quot;to&quot;: &quot;+233540800994&quot;, &quot;message&quot;: &quot;Hello!&quot;&#125;&apos;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
