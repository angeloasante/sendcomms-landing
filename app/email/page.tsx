"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

type Language = "curl" | "nodejs" | "python" | "php";

const codeExamples: Record<Language, string> = {
  curl: `curl -X POST https://api.sendcomms.com/api/v1/email/send \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "user@example.com",
    "from": "hello@yourdomain.com",
    "subject": "Welcome to SendComms",
    "html": "<h1>Hello World</h1>"
  }'`,
  nodejs: `const response = await fetch(
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
);

const data = await response.json();`,
  python: `import requests

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
)

print(response.json())`,
  php: `<?php
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

$response = curl_exec($curl);
curl_close($curl);
echo $response;`,
};

const scheduleExample = `await client.emails.send({
  to: 'user@example.com',
  from: 'hello@yourdomain.com',
  subject: 'Your scheduled report',
  html: '<h1>Weekly Report</h1>',
  scheduledAt: '2025-01-15T09:00:00Z'
});`;

const batchExample = `await client.emails.batch([
  {
    to: 'alice@example.com',
    from: 'hello@yourdomain.com',
    subject: 'Hello Alice',
    html: '<h1>Welcome Alice!</h1>'
  },
  {
    to: 'bob@example.com',
    from: 'hello@yourdomain.com', 
    subject: 'Hello Bob',
    html: '<h1>Welcome Bob!</h1>'
  }
]);`;

type LogTab = "logs" | "events" | "webhooks";

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
    endpoint: "/api/v1/email/send",
    status: "200 OK",
    statusCode: 200,
    id: "email_abc123xyz",
    time: "Dec 31, 2025 • 10:34 AM",
    responseTime: "2ms",
    responseBody: `{
  "success": true,
  "data": {
    "id": "email_abc123xyz",
    "status": "sent",
    "recipients": 1
  }
}`,
    requestBody: `{
  "to": "user@example.com",
  "from": "hello@yourdomain.com",
  "subject": "Welcome!",
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
  "type": "email.delivered",
  "data": {
    "email_id": "email_abc123xyz",
    "to": "user@example.com",
    "delivered_at": "2025-12-31T10:34:15Z"
  }
}`,
    requestBody: `{
  "events": [
    "email.sent",
    "email.delivered",
    "email.bounced",
    "email.complained"
  ]
}`
  },
  webhooks: {
    method: "POST",
    endpoint: "/api/v1/webhooks",
    status: "201 Created",
    statusCode: 201,
    id: "wh_endpoint_456",
    time: "Dec 31, 2025 • 10:30 AM",
    responseTime: "45ms",
    responseBody: `{
  "success": true,
  "data": {
    "id": "wh_endpoint_456",
    "url": "https://your-app.com/webhooks",
    "events": ["email.delivered", "email.bounced"],
    "secret": "whsec_..."
  }
}`,
    requestBody: `{
  "url": "https://your-app.com/webhooks",
  "events": [
    "email.delivered",
    "email.bounced"
  ]
}`
  }
};

export default function EmailApiPage() {
  const [selectedLang, setSelectedLang] = useState<Language>("nodejs");
  const [activeTab, setActiveTab] = useState<LogTab>("logs");

  const languages: { id: Language; name: string; icon: string }[] = [
    { id: "curl", name: "cURL", icon: "mdi:console" },
    { id: "nodejs", name: "Node.js", icon: "logos:nodejs-icon" },
    { id: "python", name: "Python", icon: "logos:python" },
    { id: "php", name: "PHP", icon: "logos:php" },
  ];

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen flex flex-col w-full selection:bg-cyan-500/20 selection:text-cyan-400 overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <main className="flex-grow pt-32 relative">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Hero */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-medium mb-6">
              <Icon icon="lucide:mail" width={14} />
              <span>Email API</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-white leading-[1.05] mb-6">
              Email API that<br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent italic">just works</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Quickly integrate email into your application with a powerful and easy to use REST API. Built for developers.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a 
                href="https://console.sendcomms.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-black px-6 py-3 rounded-lg font-medium text-sm hover:bg-gray-100 transition-all flex items-center gap-2"
              >
                Get Started
                <Icon icon="lucide:arrow-right" width={16} />
              </a>
              <a 
                href="https://docs.sendcomms.com/docs/api/email" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-lg font-medium text-sm hover:bg-white/10 transition-all"
              >
                Documentation
              </a>
            </div>
          </div>

          {/* Code Preview Section */}
          <div className="mb-32">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Developer First</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
                Send emails with<br />your favorite stack
              </h2>
              <p className="text-gray-400 max-w-lg mx-auto">
                A simple, elegant interface so you can start sending emails in minutes. It fits right into your code with SDKs for your favorite programming languages.
              </p>
            </div>

            {/* Language Selector */}
            <div className="flex justify-center gap-2 mb-6">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLang(lang.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                    selectedLang === lang.id 
                      ? "bg-white/10 text-white border border-white/20" 
                      : "bg-transparent text-gray-500 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon icon={lang.icon} width={18} />
                  <span className="hidden sm:inline">{lang.name}</span>
                </button>
              ))}
            </div>

            {/* Code Block */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <span className="text-xs text-gray-500 font-mono">send-email.{selectedLang === "curl" ? "sh" : selectedLang === "nodejs" ? "ts" : selectedLang === "python" ? "py" : "php"}</span>
                  <button 
                    onClick={() => navigator.clipboard.writeText(codeExamples[selectedLang])}
                    className="text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <Icon icon="lucide:copy" width={14} />
                    Copy
                  </button>
                </div>
                <pre className="p-6 overflow-x-auto text-sm">
                  <code className="text-gray-300 font-mono leading-relaxed whitespace-pre">{codeExamples[selectedLang]}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-32">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Complete Visibility</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
                Complete visibility<br />of your API calls
              </h2>
              <p className="text-gray-400 max-w-lg mx-auto">
                Troubleshoot with detailed logs including live request headers and response body. Collect and analyze sent data via our API calls. Fix critical issues before they impact the application.
              </p>
            </div>

            {/* Tabs */}
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-center gap-4 mb-8">
                {[
                  { id: "logs" as LogTab, label: "Log Details", icon: "lucide:file-text" },
                  { id: "events" as LogTab, label: "Email Events", icon: "lucide:activity" },
                  { id: "webhooks" as LogTab, label: "Webhook Endpoints", icon: "lucide:webhook" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                      activeTab === tab.id 
                        ? "bg-white/10 text-white border border-white/20" 
                        : "text-gray-500 hover:text-white"
                    }`}
                  >
                    <Icon icon={tab.icon} width={16} />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Log Preview Card */}
              <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-white/5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${logPreviewData[activeTab].statusCode < 300 ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                      <span className="text-sm font-mono text-gray-300">
                        {logPreviewData[activeTab].method} {logPreviewData[activeTab].endpoint}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{logPreviewData[activeTab].responseTime}</span>
                  </div>
                  <div className="flex items-center gap-6 text-xs text-gray-500">
                    <span>Status: <span className="text-green-400">{logPreviewData[activeTab].status}</span></span>
                    <span>ID: {logPreviewData[activeTab].id}</span>
                    <span>{logPreviewData[activeTab].time}</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 divide-x divide-white/5">
                  <div className="p-6">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Response Body</h4>
                    <pre className="text-xs text-gray-400 font-mono whitespace-pre">
{logPreviewData[activeTab].responseBody}
                    </pre>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Request Body</h4>
                    <pre className="text-xs text-gray-400 font-mono whitespace-pre">
{logPreviewData[activeTab].requestBody}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Use Cases Section */}
          <div className="mb-32">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">API Endpoints</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
                An API endpoint<br />for any use case
              </h2>
              <p className="text-gray-400 max-w-lg mx-auto">
                Go more with your emails using flexible API endpoints. Send attachments via simple endpoints, or trigger batch emails with ease.
              </p>
            </div>

            {/* Use Case Tabs */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <a 
                  href="https://docs.sendcomms.com/docs/api/email" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-white/10 text-white text-sm border border-white/20 hover:bg-white/15 transition-all"
                >
                  See API Docs
                </a>
                <a 
                  href="https://console.sendcomms.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full text-gray-500 text-sm hover:text-white transition-colors"
                >
                  Get API Key →
                </a>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Schedule Card */}
                <div className="bg-[#111111] border border-white/10 rounded-xl p-6 hover:border-cyan-500/30 transition-all group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                      <Icon icon="lucide:calendar" width={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Schedule email</h3>
                      <p className="text-xs text-gray-500">Send emails at a specific time</p>
                    </div>
                  </div>
                  <pre className="text-[11px] text-gray-400 font-mono bg-black/30 rounded-lg p-3 overflow-x-auto">
{`scheduledAt: '2025-01-15T09:00:00Z'`}
                  </pre>
                </div>

                {/* Batch Card */}
                <div className="bg-[#111111] border border-white/10 rounded-xl p-6 hover:border-cyan-500/30 transition-all group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                      <Icon icon="lucide:layers" width={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Batch emails</h3>
                      <p className="text-xs text-gray-500">Send to multiple recipients</p>
                    </div>
                  </div>
                  <pre className="text-[11px] text-gray-400 font-mono bg-black/30 rounded-lg p-3 overflow-x-auto">
{`POST /api/v1/email/batch`}
                  </pre>
                </div>

                {/* Attachments Card */}
                <div className="bg-[#111111] border border-white/10 rounded-xl p-6 hover:border-cyan-500/30 transition-all group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                      <Icon icon="lucide:paperclip" width={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Send attachment</h3>
                      <p className="text-xs text-gray-500">Include files with emails</p>
                    </div>
                  </div>
                  <pre className="text-[11px] text-gray-400 font-mono bg-black/30 rounded-lg p-3 overflow-x-auto">
{`attachments: [{ content, filename }]`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mb-32">
            <div className="max-w-3xl mx-auto text-center">
              <blockquote className="text-2xl md:text-3xl font-medium text-white leading-relaxed mb-8 italic">
                &ldquo;The API strikes the perfect balance between simplicity and ease of implementation, enabling us to replace our existing email mechanism in under an hour.&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                  T
                </div>
                <div className="text-left">
                  <div className="text-white font-medium">Thomas Russell</div>
                  <div className="text-gray-500 text-sm">Co-founder, Diaspora AI</div>
                </div>
              </div>
            </div>
          </div>

          {/* Idempotency Section */}
          <div className="mb-32">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Reliability</p>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6">
                  Idempotency Keys
                </h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Include an idempotency key in any email request to ensure that the same email request is processed only once when a duplicate request is submitted.
                </p>
                <div className="flex items-center gap-4">
                  <a 
                    href="https://console.sendcomms.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white text-black px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-100 transition-all"
                  >
                    Get Started
                  </a>
                  <a 
                    href="https://docs.sendcomms.com/docs" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    Documentation →
                  </a>
                </div>
              </div>
              <div className="bg-[#111111] border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                  <Icon icon="lucide:code-2" width={14} />
                  <span>Request Header</span>
                </div>
                <pre className="text-sm text-gray-300 font-mono">
{`Idempotency-Key: "unique-id-12345"

// Resending with the same key
// won't trigger a new email`}
                </pre>
              </div>
            </div>
          </div>

          {/* Trust Section */}
          <div className="mb-32">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Reliability</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
                The API that<br />you can trust
              </h2>
              <p className="text-gray-400 max-w-lg mx-auto">
                The support that your business needs. The reliability that your team needs. The security that your mission-critical application needs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-[#111111] border border-white/10 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-white mb-2">99.9%</div>
                <div className="text-sm text-gray-400">API uptime</div>
                <p className="text-xs text-gray-500 mt-3">With our service-level SLA, we guarantee at least 99.9% uptime. Scaled on demand.</p>
              </div>
              <div className="bg-[#111111] border border-white/10 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-white mb-2">Secure</div>
                <div className="text-sm text-gray-400">& compliant</div>
                <p className="text-xs text-gray-500 mt-3">We implement the latest security standards including API DKIM-DMARC and TLS encryption.</p>
              </div>
              <div className="bg-[#111111] border border-white/10 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-white mb-2">Premium</div>
                <div className="text-sm text-gray-400">support</div>
                <p className="text-xs text-gray-500 mt-3">Get help from our team when you need advanced features and dedicated Slack channels.</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mb-20 text-center relative">
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none rounded-3xl"></div>
            <div className="relative z-10 py-20">
              <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Icon icon="lucide:mail" width={32} className="text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
                Start sending tonight
              </h2>
              <p className="text-gray-400 max-w-md mx-auto mb-8">
                SendComms delivers millions of emails every week for some of the fastest growing teams.
              </p>
              <a 
                href="https://console.sendcomms.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-lg font-medium text-sm hover:bg-gray-100 transition-all"
              >
                Sign up for free
                <Icon icon="lucide:arrow-right" width={16} />
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
