"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const getPrice = (monthly: number, yearly: number) => {
    return billingCycle === "monthly" ? monthly : Math.round(yearly / 12);
  };

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col w-full selection:bg-brand-100 selection:text-brand-900 overflow-x-hidden">
      <Header />

      {/* Main Content */}
      <main className="flex-grow pt-32 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-stone-100 to-transparent dark:from-stone-900/20 dark:to-transparent -z-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
              Predictable pricing,{" "}
              <span className="text-stone-500 dark:text-stone-400">
                designed for scale.
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Start for free, scale as you grow. No hidden fees or surprise overages.
            </p>

            {/* Billing Toggle */}
            <div className="flex justify-center">
              <div className="bg-muted p-1 rounded-full inline-flex border border-border">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    billingCycle === "monthly"
                      ? "bg-card shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle("annual")}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    billingCycle === "annual"
                      ? "bg-card shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Annual
                  <span className="text-[10px] bg-green-100 dark:bg-green-900/50 px-1.5 py-0.5 rounded text-green-700 dark:text-green-300 font-semibold">
                    SAVE 20%
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Cards Grid - 5 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
            {/* Free Tier Card */}
            <div className="bg-card border border-border rounded-[20px] p-5 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full">
              <div className="flex items-center gap-2 text-foreground mb-3">
                <Icon icon="lucide:gift" width={18} />
                <span className="text-base font-semibold tracking-tight">FREE</span>
              </div>

              <div className="mb-3">
                <span className="text-3xl font-bold text-foreground">$0</span>
                <span className="text-muted-foreground text-sm">/mo</span>
              </div>

              <p className="text-xs text-muted-foreground mb-4">
                Perfect for testing and small projects.
              </p>

              <div className="space-y-2.5 flex-grow text-xs">
                <div className="flex items-start gap-2 text-muted-foreground">
                  <Icon icon="lucide:check" width={14} className="text-green-500 mt-0.5 shrink-0" />
                  <span>50 SMS, 500 emails/mo</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <Icon icon="lucide:check" width={14} className="text-green-500 mt-0.5 shrink-0" />
                  <span>1GB data, GHS 10 airtime</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <Icon icon="lucide:check" width={14} className="text-green-500 mt-0.5 shrink-0" />
                  <span>Unlimited sandbox</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <Icon icon="lucide:check" width={14} className="text-green-500 mt-0.5 shrink-0" />
                  <span>Community support</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <Icon icon="lucide:minus" width={14} className="text-muted-foreground/50 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground/70">SendComms branding</span>
                </div>
              </div>

              <div className="mt-5">
                <a
                  href="https://console.sendcomms.com/dashboard/billing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-full border border-border text-xs font-medium text-foreground hover:bg-accent transition-all text-center block"
                >
                  Get Started Free
                </a>
              </div>
            </div>

            {/* Starter Card */}
            <div className="bg-[#282623] text-[#f2f0ed] rounded-[20px] p-5 shadow-xl shadow-stone-900/20 border border-white/5 flex flex-col h-full relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-2 text-white mb-3">
                  <Icon icon="lucide:sparkles" width={18} />
                  <span className="text-base font-semibold tracking-tight">STARTER</span>
                </div>

                <div className="mb-1">
                  <span className="text-3xl font-bold text-white">
                    ${getPrice(29, 279)}
                  </span>
                  <span className="text-white/60 text-sm">/mo</span>
                </div>
                {billingCycle === "annual" && (
                  <p className="text-[10px] text-green-400 mb-2">$279/year - save 20%</p>
                )}

                <p className="text-xs text-white/70 mb-4">
                  Ideal for startups launching their services.
                </p>

                <div className="space-y-2.5 flex-grow text-xs">
                  <div className="flex items-start gap-2 text-white/90">
                    <Icon icon="lucide:check" width={14} className="text-green-400 mt-0.5 shrink-0" />
                    <span>300 SMS, 2,000 emails/mo</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/90">
                    <Icon icon="lucide:check" width={14} className="text-green-400 mt-0.5 shrink-0" />
                    <span>5GB data, GHS 30 airtime</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/90">
                    <Icon icon="lucide:check" width={14} className="text-green-400 mt-0.5 shrink-0" />
                    <span>Unlimited sandbox</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/90">
                    <Icon icon="lucide:check" width={14} className="text-green-400 mt-0.5 shrink-0" />
                    <span>Email support</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/90">
                    <Icon icon="lucide:check" width={14} className="text-green-400 mt-0.5 shrink-0" />
                    <span>Remove branding</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/90">
                    <Icon icon="lucide:check" width={14} className="text-green-400 mt-0.5 shrink-0" />
                    <span>99.9% uptime SLA</span>
                  </div>
                </div>

                <div className="mt-5">
                  <a
                    href="https://console.sendcomms.com/dashboard/billing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-full bg-white text-[#282623] text-xs font-medium hover:bg-white/90 transition-all text-center block"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>

            {/* Pro Card (Popular) */}
            <div className="bg-[#787266] text-white rounded-[20px] p-5 shadow-xl shadow-stone-900/20 border border-white/10 flex flex-col h-full relative overflow-hidden ring-2 ring-blue-500">
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500"></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-white">
                    <Icon icon="lucide:zap" width={18} />
                    <span className="text-base font-semibold tracking-tight">PRO</span>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-blue-500 text-white px-2 py-0.5 rounded">
                    Popular
                  </span>
                </div>

                <div className="mb-1">
                  <span className="text-3xl font-bold text-white">
                    ${getPrice(99, 950)}
                  </span>
                  <span className="text-white/60 text-sm">/mo</span>
                </div>
                {billingCycle === "annual" && (
                  <p className="text-[10px] text-green-400 mb-2">$950/year - save 20%</p>
                )}

                <p className="text-xs text-white/80 mb-4">
                  Perfect for growing businesses.
                </p>

                <div className="space-y-2.5 flex-grow text-xs">
                  <div className="flex items-start gap-2 text-white/90">
                    <Icon icon="lucide:check" width={14} className="text-green-400 mt-0.5 shrink-0" />
                    <span>1,500 SMS, 10,000 emails/mo</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/90">
                    <Icon icon="lucide:check" width={14} className="text-green-400 mt-0.5 shrink-0" />
                    <span>30GB data, GHS 150 airtime</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/90">
                    <Icon icon="lucide:check" width={14} className="text-green-400 mt-0.5 shrink-0" />
                    <span>Everything in Starter</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/90">
                    <Icon icon="lucide:check" width={14} className="text-green-400 mt-0.5 shrink-0" />
                    <span>Priority support</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/90">
                    <Icon icon="lucide:check" width={14} className="text-green-400 mt-0.5 shrink-0" />
                    <span>Webhooks</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/90">
                    <Icon icon="lucide:check" width={14} className="text-green-400 mt-0.5 shrink-0" />
                    <span>Dedicated Slack channel</span>
                  </div>
                </div>

                <div className="mt-5">
                  <a
                    href="https://console.sendcomms.com/dashboard/billing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-full bg-white text-[#787266] text-xs font-semibold hover:bg-white/90 transition-all text-center block"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>

            {/* Business Card */}
            <div className="bg-[#f0ece3] text-[#282623] rounded-[20px] p-5 shadow-xl shadow-stone-200/50 dark:shadow-none border border-stone-200 dark:border-stone-300 flex flex-col h-full relative overflow-hidden">
              <div className="opacity-[0.4] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')] absolute inset-0"></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-2 text-[#282623] mb-3">
                  <Icon icon="lucide:building-2" width={18} />
                  <span className="text-base font-semibold tracking-tight">BUSINESS</span>
                </div>

                <div className="mb-1">
                  <span className="text-3xl font-bold text-[#282623]">
                    ${getPrice(299, 2870)}
                  </span>
                  <span className="text-[#282623]/60 text-sm">/mo</span>
                </div>
                {billingCycle === "annual" && (
                  <p className="text-[10px] text-green-600 mb-2">$2,870/year - save 20%</p>
                )}

                <p className="text-xs text-[#282623]/80 mb-4">
                  High-volume for established businesses.
                </p>

                <div className="space-y-2.5 flex-grow text-xs">
                  <div className="flex items-start gap-2 text-[#282623]">
                    <Icon icon="lucide:check" width={14} className="text-green-600 mt-0.5 shrink-0" />
                    <span>6,000 SMS, 40,000 emails/mo</span>
                  </div>
                  <div className="flex items-start gap-2 text-[#282623]">
                    <Icon icon="lucide:check" width={14} className="text-green-600 mt-0.5 shrink-0" />
                    <span>150GB data, GHS 600 airtime</span>
                  </div>
                  <div className="flex items-start gap-2 text-[#282623]">
                    <Icon icon="lucide:check" width={14} className="text-green-600 mt-0.5 shrink-0" />
                    <span>Everything in Pro</span>
                  </div>
                  <div className="flex items-start gap-2 text-[#282623]">
                    <Icon icon="lucide:check" width={14} className="text-green-600 mt-0.5 shrink-0" />
                    <span>Phone support</span>
                  </div>
                  <div className="flex items-start gap-2 text-[#282623]">
                    <Icon icon="lucide:check" width={14} className="text-green-600 mt-0.5 shrink-0" />
                    <span>Dedicated account manager</span>
                  </div>
                  <div className="flex items-start gap-2 text-[#282623]">
                    <Icon icon="lucide:check" width={14} className="text-green-600 mt-0.5 shrink-0" />
                    <span>Custom SLA</span>
                  </div>
                  <div className="flex items-start gap-2 text-[#282623]">
                    <Icon icon="lucide:check" width={14} className="text-green-600 mt-0.5 shrink-0" />
                    <span>Quarterly business reviews</span>
                  </div>
                </div>

                <div className="mt-5">
                  <a
                    href="https://console.sendcomms.com/dashboard/billing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-full bg-[#282623] text-white text-xs font-medium hover:bg-[#282623]/90 transition-all text-center block"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>

            {/* Enterprise Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-[20px] p-5 shadow-xl shadow-slate-900/30 border border-slate-700 flex flex-col h-full relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-2 text-white mb-3">
                  <Icon icon="lucide:crown" width={18} className="text-amber-400" />
                  <span className="text-base font-semibold tracking-tight">ENTERPRISE</span>
                </div>

                <div className="mb-1">
                  <span className="text-3xl font-bold text-white">Custom</span>
                </div>
                <p className="text-[10px] text-cyan-400 mb-2">Contact for pricing</p>

                <p className="text-xs text-white/80 mb-4">
                  Tailored for large organizations.
                </p>

                <div className="space-y-2.5 flex-grow text-xs">
                  <div className="flex items-start gap-2 text-white/90">
                    <Icon icon="lucide:check" width={14} className="text-cyan-400 mt-0.5 shrink-0" />
                    <span>Custom volume</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/90">
                    <Icon icon="lucide:check" width={14} className="text-cyan-400 mt-0.5 shrink-0" />
                    <span>Dedicated infrastructure</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/90">
                    <Icon icon="lucide:check" width={14} className="text-cyan-400 mt-0.5 shrink-0" />
                    <span>99.99% uptime SLA</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/90">
                    <Icon icon="lucide:check" width={14} className="text-cyan-400 mt-0.5 shrink-0" />
                    <span>Legal review assistance</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/90">
                    <Icon icon="lucide:check" width={14} className="text-cyan-400 mt-0.5 shrink-0" />
                    <span>Everything in Business</span>
                  </div>
                </div>

                <div className="mt-5">
                  <a
                    href="mailto:sales@sendcomms.com"
                    className="w-full py-2.5 rounded-full bg-white text-slate-900 text-xs font-medium hover:bg-white/90 transition-all text-center block"
                  >
                    Contact Sales
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Section */}
        <section className="py-24 bg-card border-t border-border mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-3 block">
                Comparison
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
                Compare plans and find the{" "}
                <span className="text-blue-500 italic">right fit</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                From startups to enterprises, SendComms offers flexible pricing with powerful features that scale with your business.
              </p>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto pb-4">
              <div className="min-w-[1100px] grid grid-cols-6 bg-border gap-[1px] border border-border rounded-2xl overflow-hidden">
                {/* Headers Row */}
                <div className="bg-card p-6 flex flex-col justify-end">
                  <p className="text-sm text-muted-foreground font-medium">Features</p>
                </div>

                {/* Free Header */}
                <div className="bg-card p-4 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon icon="lucide:gift" width={16} className="text-muted-foreground" />
                    <h3 className="text-sm font-semibold text-foreground">Free</h3>
                  </div>
                  <div className="text-lg font-bold text-foreground">$0<span className="text-xs font-normal text-muted-foreground">/mo</span></div>
                </div>

                {/* Starter Header */}
                <div className="bg-[#282623] p-4 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon icon="lucide:sparkles" width={16} className="text-white/80" />
                    <h3 className="text-sm font-semibold text-white">Starter</h3>
                  </div>
                  <div className="text-lg font-bold text-white">${getPrice(29, 279)}<span className="text-xs font-normal text-white/60">/mo</span></div>
                </div>

                {/* Pro Header */}
                <div className="bg-[#787266] p-4 flex flex-col h-full relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500"></div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon icon="lucide:zap" width={16} className="text-white/80" />
                    <h3 className="text-sm font-semibold text-white">Pro</h3>
                    <span className="text-[8px] font-bold uppercase tracking-wider bg-blue-500 text-white px-1.5 py-0.5 rounded">Popular</span>
                  </div>
                  <div className="text-lg font-bold text-white">${getPrice(99, 950)}<span className="text-xs font-normal text-white/60">/mo</span></div>
                </div>

                {/* Business Header */}
                <div className="bg-[#f0ece3] p-4 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon icon="lucide:building-2" width={16} className="text-[#282623]/80" />
                    <h3 className="text-sm font-semibold text-[#282623]">Business</h3>
                  </div>
                  <div className="text-lg font-bold text-[#282623]">${getPrice(299, 2870)}<span className="text-xs font-normal text-[#282623]/60">/mo</span></div>
                </div>

                {/* Enterprise Header */}
                <div className="bg-slate-900 p-4 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon icon="lucide:crown" width={16} className="text-amber-400" />
                    <h3 className="text-sm font-semibold text-white">Enterprise</h3>
                  </div>
                  <div className="text-lg font-bold text-white">Custom</div>
                </div>

                {/* Feature Rows */}
                {[
                  { feature: "SMS per month", free: "50", starter: "300", pro: "1,500", business: "6,000", enterprise: "Custom" },
                  { feature: "Emails per month", free: "500", starter: "2,000", pro: "10,000", business: "40,000", enterprise: "Custom" },
                  { feature: "Data", free: "1GB", starter: "5GB", pro: "30GB", business: "150GB", enterprise: "Custom" },
                  { feature: "Airtime", free: "GHS 10", starter: "GHS 30", pro: "GHS 150", business: "GHS 600", enterprise: "Custom" },
                  { feature: "Sandbox", free: "Unlimited", starter: "Unlimited", pro: "Unlimited", business: "Unlimited", enterprise: "Unlimited" },
                  { feature: "Support", free: "Community", starter: "Email", pro: "Priority", business: "Phone", enterprise: "Dedicated" },
                  { feature: "Remove branding", free: false, starter: true, pro: true, business: true, enterprise: true },
                  { feature: "Webhooks", free: false, starter: false, pro: true, business: true, enterprise: true },
                  { feature: "Slack channel", free: false, starter: false, pro: true, business: true, enterprise: true },
                  { feature: "Account manager", free: false, starter: false, pro: false, business: true, enterprise: true },
                  { feature: "Custom SLA", free: false, starter: false, pro: false, business: true, enterprise: true },
                  { feature: "Business reviews", free: false, starter: false, pro: false, business: "Quarterly", enterprise: "Monthly" },
                  { feature: "Uptime SLA", free: "—", starter: "99.9%", pro: "99.9%", business: "Custom", enterprise: "99.99%" },
                  { feature: "Dedicated infrastructure", free: false, starter: false, pro: false, business: false, enterprise: true },
                ].map((row, index) => (
                  <div key={index} className="contents">
                    <div className="bg-card p-4 text-sm font-medium text-muted-foreground flex items-center">
                      {row.feature}
                    </div>
                    <div className="bg-card p-4 flex items-center">
                      {typeof row.free === "boolean" ? (
                        row.free ? (
                          <Icon icon="lucide:check" width={16} className="text-green-500" />
                        ) : (
                          <Icon icon="lucide:x" width={16} className="text-muted-foreground/40" />
                        )
                      ) : (
                        <span className="text-xs text-muted-foreground">{row.free}</span>
                      )}
                    </div>
                    <div className="bg-[#282623] p-4 flex items-center">
                      {typeof row.starter === "boolean" ? (
                        row.starter ? (
                          <Icon icon="lucide:check" width={16} className="text-green-400" />
                        ) : (
                          <Icon icon="lucide:x" width={16} className="text-white/20" />
                        )
                      ) : (
                        <span className="text-xs text-white/80">{row.starter}</span>
                      )}
                    </div>
                    <div className="bg-[#787266] p-4 flex items-center">
                      {typeof row.pro === "boolean" ? (
                        row.pro ? (
                          <Icon icon="lucide:check" width={16} className="text-green-400" />
                        ) : (
                          <Icon icon="lucide:x" width={16} className="text-white/20" />
                        )
                      ) : (
                        <span className="text-xs text-white/80">{row.pro}</span>
                      )}
                    </div>
                    <div className="bg-[#f0ece3] p-4 flex items-center">
                      {typeof row.business === "boolean" ? (
                        row.business ? (
                          <Icon icon="lucide:check" width={16} className="text-green-600" />
                        ) : (
                          <Icon icon="lucide:x" width={16} className="text-[#282623]/20" />
                        )
                      ) : (
                        <span className="text-xs text-[#282623]/80">{row.business}</span>
                      )}
                    </div>
                    <div className="bg-slate-900 p-4 flex items-center">
                      {typeof row.enterprise === "boolean" ? (
                        row.enterprise ? (
                          <Icon icon="lucide:check" width={16} className="text-cyan-400" />
                        ) : (
                          <Icon icon="lucide:x" width={16} className="text-white/20" />
                        )
                      ) : (
                        <span className="text-xs text-white/80">{row.enterprise}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know about our pricing
            </p>
          </div>

          <div className="divide-y divide-border border-t border-b border-border">
            {[
              {
                q: "What happens if I exceed my plan limits?",
                a: "You'll be charged overage rates based on your plan. We'll notify you when you reach 80% and 100% of your limits. You can also set hard limits to prevent overages.",
              },
              {
                q: "Can I switch plans at any time?",
                a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate your billing accordingly.",
              },
              {
                q: "Is there a free trial for paid plans?",
                a: "Yes, all paid plans come with a 14-day free trial. You also get access to our Sandbox mode for unlimited testing without charges.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, mobile money (MTN, Vodafone, AirtelTigo), and bank transfers for Business and Enterprise plans.",
              },
              {
                q: "Do you offer custom enterprise pricing?",
                a: "Absolutely! Contact our sales team for custom pricing, dedicated infrastructure, and tailored SLAs for high-volume needs.",
              },
              {
                q: "How does the Free plan work?",
                a: "The Free plan gives you 50 SMS, 500 emails, 1GB data, and GHS 10 airtime per month at no cost. It includes SendComms branding but is perfect for testing.",
              },
              {
                q: "What's included in the annual discount?",
                a: "Annual plans save you 20% compared to monthly billing. Starter: $279/year, Pro: $950/year, Business: $2,870/year.",
              },
            ].map((faq, index) => (
              <div key={index} className="py-4">
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between py-2 text-left font-medium text-foreground hover:underline transition-all"
                >
                  <span className="text-sm md:text-base">{faq.q}</span>
                  <Icon 
                    icon="lucide:chevron-down" 
                    width={18} 
                    className={`shrink-0 text-muted-foreground transition-transform duration-200 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="pt-2 pb-4 text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
