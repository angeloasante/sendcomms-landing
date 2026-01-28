"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

type LogTab = "logs" | "events" | "webhooks";
type UseCase = "otp" | "notification" | "marketing";
type Language = "curl" | "nodejs" | "python" | "php";

const logPreviewData: Record<LogTab, { 
  method: string; 
  endpoint: string; 
  status: string; 
  statusCode: number;
  id: string;
  time: string;
  responseTime: string;
  responseBody: string;
  requestBody: string;
}> = {
  logs: {
    method: "POST",
    endpoint: "/sms",
    status: "200 OK",
    statusCode: 200,
    id: "sms_abc123xyz",
    time: "Dec 31, 2025 • 10:34 AM",
    responseTime: "45ms",
    responseBody: `{
  "id": "sms_abc123xyz",
  "to": "+233540800994",
  "status": "delivered",
  "segments": 1,
  "created_at": "2025-12-31T10:34:12.123Z"
}`,
    requestBody: `{
  "to": "+233540800994",
  "message": "Your verification code is 123456",
  "from": "SendComms"
}`
  },
  events: {
    method: "EVENT",
    endpoint: "sms.delivered",
    status: "Delivered",
    statusCode: 200,
    id: "evt_del_789xyz",
    time: "Dec 31, 2025 • 10:34 AM",
    responseTime: "—",
    responseBody: `{
  "created_at": "2025-12-31T10:34:15.456Z",
  "data": {
    "sms_id": "sms_abc123xyz",
    "to": "+233540800994",
    "status": "delivered",
    "delivered_at": "2025-12-31T10:34:15Z"
  },
  "type": "sms.delivered"
}`,
    requestBody: `{
  "sms_id": "sms_abc123xyz",
  "to": "+233540800994",
  "delivered_at": "2025-12-31T10:34:15Z"
}`
  },
  webhooks: {
    method: "POST",
    endpoint: "https://your-app.com/webhooks",
    status: "200 OK",
    statusCode: 200,
    id: "wh_endpoint_456",
    time: "Dec 31, 2025 • 10:30 AM",
    responseTime: "32ms",
    responseBody: `{
  "id": "wh_endpoint_456",
  "endpoint_url": "https://your-app.com/webhooks",
  "events": [
    "sms.sent",
    "sms.delivered",
    "sms.failed"
  ]
}`,
    requestBody: `{
  "endpoint_url": "https://your-app.com/webhooks",
  "events": [
    "sms.sent",
    "sms.delivered",
    "sms.failed"
  ]
}`
  }
};

const useCaseCode: Record<UseCase, string> = {
  otp: `// Send OTP verification code
const response = await fetch(
  'https://api.sendcomms.com/api/v1/sms/send',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      to: '+233540800994',
      message: 'Your verification code is 123456. Valid for 5 minutes.',
      from: 'SendComms'
    })
  }
);`,
  notification: `// Send order notification
const response = await fetch(
  'https://api.sendcomms.com/api/v1/sms/send',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      to: '+233540800994',
      message: 'Your order #12345 has been shipped! Track at: https://track.me/12345',
      from: 'MyStore'
    })
  }
);`,
  marketing: `// Send promotional SMS
const response = await fetch(
  'https://api.sendcomms.com/api/v1/sms/batch',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      to: ['+233540800994', '+233201234567'],
      message: '🎉 Flash Sale! 50% off all items today only. Shop now at mystore.com',
      from: 'MyStore'
    })
  }
);`
};

const languageCodeExamples: Record<Language, { code: string; filename: string }> = {
  curl: {
    filename: "send-sms.sh",
    code: `curl -X POST https://api.sendcomms.com/api/v1/sms/send \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+233540800994",
    "message": "Your verification code is 123456",
    "from": "SendComms"
  }'`
  },
  nodejs: {
    filename: "index.ts",
    code: `const response = await fetch(
  'https://api.sendcomms.com/api/v1/sms/send',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      to: '+233540800994',
      message: 'Your verification code is 123456',
      from: 'SendComms'
    })
  }
);`
  },
  python: {
    filename: "send_sms.py",
    code: `import requests

response = requests.post(
    'https://api.sendcomms.com/api/v1/sms/send',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'to': '+233540800994',
        'message': 'Your verification code is 123456',
        'from': 'SendComms'
    }
)`
  },
  php: {
    filename: "send-sms.php",
    code: `<?php
$curl = curl_init();

$data = [
    'to' => '+233540800994',
    'message' => 'Your verification code is 123456',
    'from' => 'SendComms'
];

curl_setopt_array($curl, [
    CURLOPT_URL => 'https://api.sendcomms.com/api/v1/sms/send',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($data),
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer YOUR_API_KEY',
        'Content-Type: application/json'
    ]
]);

$response = curl_exec($curl);`
  }
};

const languages: { id: Language; name: string; icon: string }[] = [
  { id: "curl", name: "cURL", icon: "mdi:console" },
  { id: "nodejs", name: "Node.js", icon: "logos:nodejs-icon" },
  { id: "python", name: "Python", icon: "logos:python" },
  { id: "php", name: "PHP", icon: "logos:php" },
];

export default function SmsApiPage() {
  const [activeLogTab, setActiveLogTab] = useState<LogTab>("logs");
  const [activeUseCase, setActiveUseCase] = useState<UseCase>("otp");
  const [selectedLang, setSelectedLang] = useState<Language>("nodejs");
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col w-full overflow-x-hidden">
      <Header />

      <main className="flex-grow pt-32">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* Left - Text */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-medium mb-6">
                  Email API
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-[1.1] mb-6">
                  SMS API<br />
                  <span className="italic text-muted-foreground">built for</span> Africa
                </h1>
                
                <p className="text-lg text-muted-foreground max-w-md mb-8 leading-relaxed">
                  Send transactional and marketing SMS to 180+ countries with a single API call. Smart carrier routing, instant delivery.
                </p>
                
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <a 
                    href="https://console.sendcomms.com"
                    className="bg-primary text-primary-foreground px-6 py-3.5 rounded-lg font-medium text-sm hover:opacity-90 transition-all shadow-xl"
                  >
                    Get Started
                  </a>
                  <a 
                    href="https://docs.sendcomms.com"
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    Documentation
                    <Icon icon="lucide:arrow-right" width={14} />
                  </a>
                </div>
              </div>

              {/* Right - Logo */}
              <div className="flex-shrink-0">
                <div className="relative w-48 h-48 md:w-64 md:h-64">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl blur-2xl" />
                  <div className="relative w-full h-full bg-card rounded-3xl border border-border flex items-center justify-center shadow-2xl">
                    <Image
                      src="/logo.png"
                      alt="SendComms Logo"
                      width={120}
                      height={120}
                      className="rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Developer First Section */}
        <section className="py-24 border-t border-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left - Content */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Developer First</p>
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-6">
                  Send SMS with<br />your favorite stack
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  A simple, elegant interface so you can start sending SMS in minutes. Use our REST API with any language.
                </p>
                
                {/* Language Selector */}
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => setSelectedLang(lang.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-all ${
                        selectedLang === lang.id 
                          ? "bg-primary text-primary-foreground border-primary" 
                          : "border-border hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon icon={lang.icon} width={16} />
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right - Code Preview */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-xs text-slate-500 font-mono">{languageCodeExamples[selectedLang].filename}</span>
                  <button 
                    onClick={() => handleCopy(languageCodeExamples[selectedLang].code)}
                    className="text-xs text-slate-500 hover:text-white transition-colors"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="p-5 text-xs leading-relaxed overflow-x-auto max-h-[350px]">
                  <code className="text-slate-300 font-mono whitespace-pre">{languageCodeExamples[selectedLang].code}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Visibility Section */}
        <section className="py-24 bg-muted/50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Observability</p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-4">
                Complete visibility<br />of your SMS delivery
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Track every message from queue to delivery. Real-time logs, delivery events, and webhook notifications.
              </p>
            </div>

            {/* Log Tabs */}
            <div className="flex justify-center gap-2 mb-8">
              {[
                { id: "logs" as LogTab, label: "Log Details", icon: "lucide:file-text" },
                { id: "events" as LogTab, label: "SMS Events", icon: "lucide:activity" },
                { id: "webhooks" as LogTab, label: "Webhook Endpoints", icon: "lucide:webhook" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveLogTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
                    activeLogTab === tab.id 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon icon={tab.icon} width={14} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Log Preview */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-mono ${
                      logPreviewData[activeLogTab].method === "POST" ? "bg-green-500/20 text-green-400" :
                      logPreviewData[activeLogTab].method === "EVENT" ? "bg-blue-500/20 text-blue-400" :
                      "bg-slate-700 text-slate-300"
                    }`}>
                      {logPreviewData[activeLogTab].method}
                    </span>
                    <span className="text-sm text-slate-400 font-mono">{logPreviewData[activeLogTab].endpoint}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-mono ${
                      logPreviewData[activeLogTab].statusCode === 200 ? "text-green-400" : "text-red-400"
                    }`}>
                      {logPreviewData[activeLogTab].status}
                    </span>
                    <span className="text-xs text-slate-500">{logPreviewData[activeLogTab].responseTime}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="grid md:grid-cols-2 divide-x divide-slate-800">
                  <div className="p-5">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">Request</div>
                    <pre className="text-xs leading-relaxed overflow-x-auto">
                      <code className="text-slate-300 font-mono whitespace-pre">{logPreviewData[activeLogTab].requestBody}</code>
                    </pre>
                  </div>
                  <div className="p-5">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">Response</div>
                    <pre className="text-xs leading-relaxed overflow-x-auto">
                      <code className="text-slate-300 font-mono whitespace-pre">{logPreviewData[activeLogTab].responseBody}</code>
                    </pre>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-5 py-3 border-t border-slate-800 bg-slate-900/50">
                  <span className="text-xs text-slate-500 font-mono">{logPreviewData[activeLogTab].id}</span>
                  <span className="text-xs text-slate-500">{logPreviewData[activeLogTab].time}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-24 border-t border-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Endpoints</p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-4">
                An API endpoint<br />for any use case
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8">
                Send OTP codes, notifications, or marketing campaigns. Our API handles it all with smart routing and delivery optimization.
              </p>
              
              <div className="flex items-center justify-center gap-3">
                <a 
                  href="https://docs.sendcomms.com/docs/api/sms"
                  className="px-4 py-2 rounded-full bg-muted text-foreground text-sm border border-border hover:bg-accent transition-all"
                >
                  See API Docs
                </a>
                <a 
                  href="https://console.sendcomms.com"
                  className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                >
                  Get API Key →
                </a>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Left - Use Case Tabs */}
              <div className="space-y-3">
                {[
                  { id: "otp" as UseCase, icon: "lucide:shield-check", title: "OTP & Verification", desc: "Send secure verification codes with instant delivery." },
                  { id: "notification" as UseCase, icon: "lucide:bell", title: "Notifications", desc: "Order updates, delivery alerts, appointment reminders." },
                  { id: "marketing" as UseCase, icon: "lucide:megaphone", title: "Marketing campaigns", desc: "Promotional messages with batch sending support." },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveUseCase(item.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      activeUseCase === item.id 
                        ? "bg-muted border-border" 
                        : "border-transparent hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        activeUseCase === item.id ? "bg-green-500/20 text-green-500" : "bg-muted text-muted-foreground"
                      }`}>
                        <Icon icon={item.icon} width={16} />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground text-sm mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Right - Code Preview */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
                  <span className="text-xs text-slate-500 font-mono">example.ts</span>
                  <button 
                    onClick={() => handleCopy(useCaseCode[activeUseCase])}
                    className="text-xs text-slate-500 hover:text-white transition-colors"
                  >
                    Copy
                  </button>
                </div>
                <pre className="p-5 text-xs leading-relaxed overflow-x-auto max-h-[300px]">
                  <code className="text-slate-300 font-mono whitespace-pre">{useCaseCode[activeUseCase]}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-24 bg-muted/50">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <Icon icon="lucide:quote" width={32} className="text-muted-foreground/20 mx-auto mb-8" />
            <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-8">
              &ldquo;The SMS API delivers messages faster than any other provider we&apos;ve tested in Africa. OTP codes arrive in seconds.&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-sm font-semibold">
                K
              </div>
              <div className="text-left">
                <div className="text-foreground font-medium text-sm">Kofi Mensah</div>
                <div className="text-muted-foreground text-sm">CTO, PayStack Ghana</div>
              </div>
            </div>
          </div>
        </section>

        {/* Smart Routing Section */}
        <section className="py-24 border-t border-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left - Routing Visual */}
              <div className="order-2 lg:order-1">
                <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl p-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-green-950/30 border border-green-900/50">
                      <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400">
                        <Icon icon="lucide:check" width={16} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white">MTN Ghana</div>
                        <div className="text-xs text-slate-500">Primary • 45ms latency</div>
                      </div>
                      <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">Active</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50 opacity-60">
                      <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-slate-500">
                        <Icon icon="lucide:pause" width={16} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-slate-300">Vodafone Ghana</div>
                        <div className="text-xs text-slate-600">Backup • 120ms latency</div>
                      </div>
                      <span className="px-2 py-0.5 bg-slate-800 text-slate-500 text-xs rounded-full">Standby</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50 opacity-60">
                      <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-slate-500">
                        <Icon icon="lucide:pause" width={16} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-slate-300">AirtelTigo</div>
                        <div className="text-xs text-slate-600">Backup • 95ms latency</div>
                      </div>
                      <span className="px-2 py-0.5 bg-slate-800 text-slate-500 text-xs rounded-full">Standby</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Content */}
              <div className="order-1 lg:order-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Smart Routing</p>
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-6">
                  Automatic carrier<br />failover
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Our smart routing engine automatically selects the best carrier for each destination. If a carrier fails, we instantly switch to backup routes to ensure delivery.
                </p>
                <div className="flex items-center gap-4">
                  <a 
                    href="https://console.sendcomms.com"
                    className="bg-primary text-primary-foreground px-6 py-3.5 rounded-lg text-sm font-medium hover:opacity-90 transition-all shadow-xl"
                  >
                    Get Started
                  </a>
                  <a 
                    href="https://docs.sendcomms.com"
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                  >
                    Documentation →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-24 bg-muted/50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Reliability</p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-4">
                The API that<br />you can trust
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Built for mission-critical applications. High availability, instant delivery, and comprehensive monitoring.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <div className="text-3xl font-semibold text-foreground mb-1">99.9% uptime</div>
                <p className="text-sm text-muted-foreground mt-3">With our service-level SLA, we guarantee at least 99.9% uptime. Scaled on demand.</p>
              </div>
              <div className="p-6 rounded-xl border border-border bg-card">
                <div className="text-3xl font-semibold text-foreground mb-1">180+ countries</div>
                <p className="text-sm text-muted-foreground mt-3">Africa-first optimization with global reach. Smart routing for every destination.</p>
              </div>
              <div className="p-6 rounded-xl border border-border bg-card">
                <div className="text-3xl font-semibold text-foreground mb-1">&lt;3s delivery</div>
                <p className="text-sm text-muted-foreground mt-3">Average delivery time across African carriers. OTP codes arrive instantly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 border-t border-border">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <div className="w-16 h-16 mx-auto mb-8 rounded-xl overflow-hidden">
              <Image
                src="/logo.png"
                alt="SendComms Logo"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-4">
              Start sending today
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
              Get started in minutes. Test free with sandbox mode. First 100 messages on us.
            </p>
            <a 
              href="https://console.sendcomms.com"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-lg text-sm font-medium hover:opacity-90 transition-all shadow-xl"
            >
              Sign up for free
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
