"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

type LogTab = "logs" | "events" | "webhooks";
type UseCase = "schedule" | "batch" | "attachment";

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
    endpoint: "/emails",
    status: "200 OK",
    statusCode: 200,
    id: "email_abc123xyz",
    time: "Dec 31, 2025 • 10:34 AM",
    responseTime: "2ms",
    responseBody: `{
  "id": "email_abc123xyz",
  "from": "hello@sendcomms.com",
  "to": ["user@example.com"],
  "created_at": "2025-12-31T10:34:12.123Z"
}`,
    requestBody: `{
  "from": "hello@sendcomms.com",
  "to": ["user@example.com"],
  "subject": "Welcome to SendComms",
  "html": "<h1>Hello World</h1>"
}`
  },
  events: {
    method: "EVENT",
    endpoint: "email.delivered",
    status: "Delivered",
    statusCode: 200,
    id: "evt_del_789xyz",
    time: "Dec 31, 2025 • 10:34 AM",
    responseTime: "—",
    responseBody: `{
  "created_at": "2025-12-31T10:34:15.456Z",
  "data": {
    "created_at": "2025-12-31T10:34:12.123Z",
    "email_id": "email_abc123xyz",
    "from": "hello@sendcomms.com",
    "to": ["user@example.com"],
    "subject": "Welcome to SendComms"
  },
  "type": "email.delivered"
}`,
    requestBody: `{
  "email_id": "email_abc123xyz",
  "to": "user@example.com",
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
    responseTime: "45ms",
    responseBody: `{
  "id": "wh_endpoint_456",
  "endpoint_url": "https://your-app.com/webhooks",
  "events": [
    "email.sent",
    "email.delivered",
    "email.bounced"
  ]
}`,
    requestBody: `{
  "endpoint_url": "https://your-app.com/webhooks",
  "events": [
    "email.sent",
    "email.delivered",
    "email.bounced"
  ]
}`
  }
};

const useCaseCode: Record<UseCase, string> = {
  schedule: `// Schedule an email to send at a specific time
const response = await fetch(
  'https://api.sendcomms.com/api/v1/email/send',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'hello@company.com',
      to: 'user@example.com',
      subject: 'Scheduled Report',
      html: '<h1>Weekly Summary</h1>',
      scheduledAt: '2025-12-31T09:00:00Z'
    })
  }
);`,
  batch: `// Send batch emails to multiple recipients
const response = await fetch(
  'https://api.sendcomms.com/api/v1/email/batch',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'hello@company.com',
      to: [
        'alice@example.com',
        'bob@example.com',
        'charlie@example.com'
      ],
      subject: 'Team Update',
      html: '<h1>Important Announcement</h1>'
    })
  }
);`,
  attachment: `// Send email with file attachment
const response = await fetch(
  'https://api.sendcomms.com/api/v1/email/send',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'hello@company.com',
      to: 'user@example.com',
      subject: 'Your Invoice',
      html: '<p>Please find attached.</p>',
      attachments: [{
        filename: 'invoice.pdf',
        content: '<base64-encoded-content>'
      }]
    })
  }
);`
};

type Language = "curl" | "nodejs" | "python" | "php";

const languageCodeExamples: Record<Language, { code: string; filename: string }> = {
  curl: {
    filename: "send-email.sh",
    code: `curl -X POST https://api.sendcomms.com/api/v1/email/send \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "user@example.com",
    "from": "hello@yourdomain.com",
    "subject": "Welcome to SendComms",
    "html": "<h1>Hello World</h1>"
  }'`
  },
  nodejs: {
    filename: "index.ts",
    code: `const response = await fetch(
  'https://api.sendcomms.com/api/v1/email/send',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      to: 'user@example.com',
      from: 'hello@yourdomain.com',
      subject: 'Welcome to SendComms',
      html: '<h1>Hello World</h1>'
    })
  }
);`
  },
  python: {
    filename: "send_email.py",
    code: `import requests

response = requests.post(
    'https://api.sendcomms.com/api/v1/email/send',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'to': 'user@example.com',
        'from': 'hello@yourdomain.com',
        'subject': 'Welcome to SendComms',
        'html': '<h1>Hello World</h1>'
    }
)`
  },
  php: {
    filename: "send-email.php",
    code: `<?php
$curl = curl_init();

$data = [
    'to' => 'user@example.com',
    'from' => 'hello@yourdomain.com',
    'subject' => 'Welcome to SendComms',
    'html' => '<h1>Hello World</h1>'
];

curl_setopt_array($curl, [
    CURLOPT_URL => 'https://api.sendcomms.com/api/v1/email/send',
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

export default function EmailApiPage() {
  const [activeLogTab, setActiveLogTab] = useState<LogTab>("logs");
  const [activeUseCase, setActiveUseCase] = useState<UseCase>("schedule");
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* Left - Text */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-medium mb-6">
                  Email API
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-[1.1] mb-6">
                  Email API<br />
                  that <span className="italic text-muted-foreground">just</span> works
                </h1>
                
                <p className="text-lg text-muted-foreground max-w-md mb-8 leading-relaxed">
                  Quickly integrate email into your application with a powerful and easy to use REST API.
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
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl" />
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
                  Send emails with<br />your favorite stack
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  A simple, elegant interface so you can start sending emails in minutes. Use our REST API with any language.
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
                Complete visibility<br />of your API calls
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Troubleshoot with detailed logs including live request headers and response body. Collect and analyze real-time data via our API calls. Fix critical issues before they impact the application.
              </p>
            </div>

            {/* Log Tabs */}
            <div className="flex justify-center gap-2 mb-8">
              {[
                { id: "logs" as LogTab, label: "Log Details", icon: "lucide:file-text" },
                { id: "events" as LogTab, label: "Email Events", icon: "lucide:activity" },
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
            <div className="max-w-4xl mx-auto bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
              <div className="p-5 border-b border-slate-800">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-mono font-medium ${
                    logPreviewData[activeLogTab].method === "POST" ? "bg-green-500/20 text-green-400" : 
                    logPreviewData[activeLogTab].method === "EVENT" ? "bg-blue-500/20 text-blue-400" : "bg-slate-500/20 text-slate-400"
                  }`}>
                    {logPreviewData[activeLogTab].method}
                  </span>
                  <span className="text-sm font-mono text-slate-300">{logPreviewData[activeLogTab].endpoint}</span>
                </div>
                <div className="flex items-center gap-6 text-xs text-slate-500">
                  <span>Status: <span className="text-green-400">{logPreviewData[activeLogTab].status}</span></span>
                  <span>ID: <span className="text-slate-400">{logPreviewData[activeLogTab].id}</span></span>
                  <span>{logPreviewData[activeLogTab].time}</span>
                  <span>{logPreviewData[activeLogTab].responseTime}</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
                <div className="p-5">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Response Body</h4>
                  <pre className="text-xs text-slate-400 font-mono whitespace-pre leading-relaxed">
                    {logPreviewData[activeLogTab].responseBody}
                  </pre>
                </div>
                <div className="p-5">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Request Body</h4>
                  <pre className="text-xs text-slate-400 font-mono whitespace-pre leading-relaxed">
                    {logPreviewData[activeLogTab].requestBody}
                  </pre>
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
                Do more with your emails using flexible API endpoints. Send attachments, schedule emails or trigger batch emails with ease.
              </p>
              
              <div className="flex items-center justify-center gap-3">
                <a 
                  href="https://docs.sendcomms.com/docs/api/email"
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
                  { id: "schedule" as UseCase, icon: "lucide:calendar", title: "Schedule email", desc: "Send emails at a specific time in the future." },
                  { id: "batch" as UseCase, icon: "lucide:layers", title: "Batch emails", desc: "Trigger a batch of emails via a single request at once or using a delay." },
                  { id: "attachment" as UseCase, icon: "lucide:paperclip", title: "Send attachment", desc: "Attach files using base64 encoding or external URLs." },
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
                        activeUseCase === item.id ? "bg-blue-500/20 text-blue-500" : "bg-muted text-muted-foreground"
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
              &ldquo;The API strikes the perfect balance between simplicity and ease of implementation, enabling us to replace our existing email mechanism in under an hour.&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                T
              </div>
              <div className="text-left">
                <div className="text-foreground font-medium text-sm">Thomas Russell</div>
                <div className="text-muted-foreground text-sm">Co-founder, FinTech</div>
              </div>
            </div>
          </div>
        </section>

        {/* Idempotency Section */}
        <section className="py-24 border-t border-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left - Code */}
              <div className="order-2 lg:order-1">
                <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800">
                    <span className="text-xs text-slate-500">POST</span>
                    <span className="text-xs text-slate-400 font-mono">/api.sendcomms.com/v1/emails</span>
                  </div>
                  <pre className="p-5 text-xs leading-relaxed">
                    <code className="text-slate-300 font-mono">
                      <span className="text-slate-500">// Header</span>{"\n"}
                      <span className="text-cyan-400">Idempotency-Key</span>: <span className="text-green-400">&quot;unique-request-id-12345&quot;</span>{"\n\n"}
                      <span className="text-slate-500">// Duplicate requests with the same key</span>{"\n"}
                      <span className="text-slate-500">// won&apos;t trigger additional emails</span>
                    </code>
                  </pre>
                </div>
              </div>

              {/* Right - Content */}
              <div className="order-1 lg:order-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Reliability</p>
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-6">
                  Idempotency Keys
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Include an idempotency key in any email request to ensure that the same email request is processed only once when a duplicate request is submitted or retry is legal without triggering multiple sends.
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
                The support that your business needs. The reliability that your team needs. The security that your mission-critical application needs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <div className="text-3xl font-semibold text-foreground mb-1">99.9% uptime</div>
                <p className="text-sm text-muted-foreground mt-3">With our service-level SLA, we guarantee at least 99.9% uptime. Scaled on demand.</p>
              </div>
              <div className="p-6 rounded-xl border border-border bg-card">
                <div className="text-3xl font-semibold text-foreground mb-1">Secure & compliant</div>
                <p className="text-sm text-muted-foreground mt-3">We implement the latest security standards for DKIM, DMARC and TLS encryption.</p>
              </div>
              <div className="p-6 rounded-xl border border-border bg-card">
                <div className="text-3xl font-semibold text-foreground mb-1">Premium support</div>
                <p className="text-sm text-muted-foreground mt-3">Get help from our team with advanced features and dedicated support channels.</p>
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
              Start sending this morning
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
              SendComms delivers millions of emails every week for some of the fastest growing teams.
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
