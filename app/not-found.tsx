"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col w-full">
      <Header />

      <main className="flex-grow pt-32 pb-24 flex items-center justify-center relative">
        {/* Background gradient */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">


          {/* Large Icon */}
          <div className="relative mb-8">
            <h1 className="text-[150px] md:text-[200px] font-bold tracking-tighter text-muted-foreground/10 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="SendComms Logo"
                  width={140}
                  height={140}
                  className="rounded-sm"
                />
            </div>
          </div>

          {/* Message */}
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 tracking-tight">
            Coming Soon
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            We&apos;re building something amazing! This page is currently under construction. Stay tuned for updates.
          </p>

          {/* Actions */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link 
              href="/" 
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium text-sm hover:opacity-90 transition-all shadow-lg flex items-center gap-2"
            >
              <Icon icon="lucide:home" width={16} />
              Back to Home
            </Link>
            <a 
              href="https://docs.sendcomms.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card text-card-foreground border border-border px-6 py-3 rounded-lg font-medium text-sm hover:bg-accent transition-all flex items-center gap-2"
            >
              <Icon icon="lucide:book-open" width={16} />
              View Documentation
            </a>
          </div>

          {/* Helpful Links */}
          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-6">Here are some helpful links:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a href="https://docs.sendcomms.com/docs/quickstart" target="_blank" rel="noopener noreferrer" className="group p-4 rounded-xl bg-muted/50 border border-border hover:border-muted-foreground/20 transition-all">
                <Icon icon="lucide:rocket" width={20} className="text-blue-500 mb-2" />
                <div className="text-sm font-medium text-foreground group-hover:text-blue-500 transition-colors">Quickstart</div>
                <div className="text-xs text-muted-foreground">Get started fast</div>
              </a>
              <a href="https://docs.sendcomms.com/docs" target="_blank" rel="noopener noreferrer" className="group p-4 rounded-xl bg-muted/50 border border-border hover:border-muted-foreground/20 transition-all">
                <Icon icon="lucide:code" width={20} className="text-green-500 mb-2" />
                <div className="text-sm font-medium text-foreground group-hover:text-green-500 transition-colors">API Reference</div>
                <div className="text-xs text-muted-foreground">Explore endpoints</div>
              </a>
              <Link href="/support" className="group p-4 rounded-xl bg-muted/50 border border-border hover:border-muted-foreground/20 transition-all">
                <Icon icon="lucide:headphones" width={20} className="text-purple-500 mb-2" />
                <div className="text-sm font-medium text-foreground group-hover:text-purple-500 transition-colors">Support</div>
                <div className="text-xs text-muted-foreground">Get help</div>
              </Link>
              <Link href="/status" className="group p-4 rounded-xl bg-muted/50 border border-border hover:border-muted-foreground/20 transition-all">
                <Icon icon="lucide:activity" width={20} className="text-orange-500 mb-2" />
                <div className="text-sm font-medium text-foreground group-hover:text-orange-500 transition-colors">Status</div>
                <div className="text-xs text-muted-foreground">System health</div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
