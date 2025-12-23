"use client";

import { Icon } from "@iconify/react";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="SendComms Logo"
            width={28}
            height={28}
            className="rounded-sm"
          />
          <span className="text-base font-semibold tracking-tight">SendComms</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <a href="https://docs.sendcomms.com/docs" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Documentation</a>
          <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          <Link href="/support" className="hover:text-foreground transition-colors">Support</Link>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a href="https://console.sendcomms.com" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-muted-foreground hover:text-foreground hidden sm:block">
            Sign in
          </a>
          <a href="https://console.sendcomms.com" target="_blank" rel="noopener noreferrer" className="bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-all shadow-lg hidden sm:block">
            Get API Key
          </a>
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            <Icon icon={mobileMenuOpen ? "lucide:x" : "lucide:menu"} width={20} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-6 py-4 space-y-4">
            <Link 
              href="/" 
              className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <a 
              href="https://docs.sendcomms.com/docs" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Documentation
            </a>
            <Link 
              href="/pricing" 
              className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              href="/support" 
              className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Support
            </Link>
            <div className="pt-4 border-t border-border space-y-3">
              <a 
                href="https://console.sendcomms.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign in
              </a>
              <a 
                href="https://console.sendcomms.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block bg-primary text-primary-foreground text-sm font-medium px-4 py-2.5 rounded-lg hover:opacity-90 transition-all text-center"
              >
                Get API Key
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
