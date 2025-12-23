"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-12 relative z-10 mt-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="SendComms Logo"
                width={28}
                height={28}
                className="rounded-sm"
              />
              <span className="text-base font-semibold text-foreground">SendComms</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Unified communication infrastructure for Africa. One API for Email, SMS, Data & Airtime.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://twitter.com/sendcomms" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                <Icon icon="lucide:twitter" width={16} />
              </a>
              <a href="https://github.com/sendcomms" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                <Icon icon="lucide:github" width={16} />
              </a>
              <a href="https://linkedin.com/company/sendcomms" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                <Icon icon="lucide:linkedin" width={16} />
              </a>
              <a href="https://discord.gg/sendcomms" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                <Icon icon="simple-icons:discord" width={16} />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/features" className="hover:text-foreground transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link href="/docs/api/email" className="hover:text-foreground transition-colors">Email API</Link></li>
              <li><Link href="/docs/api/sms" className="hover:text-foreground transition-colors">SMS API</Link></li>
              <li><Link href="/docs/api/data" className="hover:text-foreground transition-colors">Data Bundles</Link></li>
              <li><Link href="/docs/api/airtime" className="hover:text-foreground transition-colors">Airtime</Link></li>
            </ul>
          </div>

          {/* Developers Column */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Developers</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="https://docs.sendcomms.com/docs" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="https://docs.sendcomms.com/docs/quickstart" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Quickstart Guide</a></li>
              <li><a href="https://docs.sendcomms.com/docs/sandbox" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Sandbox Mode</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link href="/partners" className="hover:text-foreground transition-colors">Partners</Link></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/support" className="hover:text-foreground transition-colors">Help Center</Link></li>
              <li><Link href="/status" className="hover:text-foreground transition-colors">System Status</Link></li>
              <li><Link href="/security" className="hover:text-foreground transition-colors">Security</Link></li>
              <li><Link href="/compliance" className="hover:text-foreground transition-colors">Compliance</Link></li>
              <li><a href="https://community.sendcomms.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Community</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
              <span className="hidden md:inline text-border">•</span>
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <span className="hidden md:inline text-border">•</span>
              <Link href="/cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link>
              <span className="hidden md:inline text-border">•</span>
              <Link href="/dpa" className="hover:text-foreground transition-colors">DPA</Link>
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} SendComms. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
