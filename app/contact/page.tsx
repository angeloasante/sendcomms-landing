"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const serviceOptions = [
  "API Integration",
  "Enterprise Solutions",
  "Technical Support",
  "Partnership",
  "Custom Development",
];

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"message" | "call">("message");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterError, setNewsletterError] = useState<string | null>(null);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          services: selectedServices,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          message: "",
        });
        setSelectedServices([]);
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(result.error || result.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterSubmitting(true);
    setNewsletterError(null);
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      const result = await response.json();

      if (result.success) {
        setNewsletterSuccess(true);
        setNewsletterEmail("");
        setTimeout(() => setNewsletterSuccess(false), 5000);
      } else {
        setNewsletterError(result.error || "Failed to subscribe. Please try again.");
      }
    } catch (err) {
      setNewsletterError("Network error. Please check your connection and try again.");
    } finally {
      setNewsletterSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen flex flex-col w-full selection:bg-pink-500/20 selection:text-pink-400 overflow-x-hidden">
      <Header />

      <main className="flex-grow pt-24 relative">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            {/* Tab Switcher */}
            <div className="flex justify-center mb-16">
              <div className="inline-flex bg-[#111] rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("message")}
                  className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                    activeTab === "message"
                      ? "bg-[#1a1a1a] text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Send a Message
                </button>
                {/* <button
                  onClick={() => setActiveTab("call")}
                  className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                    activeTab === "call"
                      ? "bg-[#1a1a1a] text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Schedule a Call
                </button> */}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left Side - Heading & Image */}
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight italic mb-6">
                  Let&apos;s get<br />
                  down to<br />
                  business
                </h1>
                <p className="text-gray-400 text-sm leading-relaxed mb-12 max-w-sm">
                  We&apos;d love to chat! If you fill out the information below, someone from the team will reach out right away!
                </p>
                
                {/* Briefcase Image */}
                <div className="relative w-64 h-64">
                  <Image
                    src="/briefcase.png"
                    alt="Business briefcase"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Right Side - Form */}
              <div>
                {submitted && (
                  <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-center text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <Icon icon="lucide:check-circle" width={18} />
                      <span>Message sent successfully! We&apos;ll get back to you soon.</span>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-center text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <Icon icon="lucide:alert-circle" width={18} />
                      <span>{error}</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                        className="w-full px-0 py-3 bg-transparent border-b border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        className="w-full px-0 py-3 bg-transparent border-b border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Company & Phone Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company"
                        className="w-full px-0 py-3 bg-transparent border-b border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone number"
                        className="w-full px-0 py-3 bg-transparent border-b border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>
                  </div>

                  {/* What are you looking for? */}
                  <div>
                    <p className="text-sm text-gray-400 mb-4">What are you looking for?</p>
                    <div className="flex flex-wrap gap-2">
                      {serviceOptions.map((service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={`px-4 py-2 rounded-full text-sm border transition-all ${
                            selectedServices.includes(service)
                              ? "bg-white text-black border-white"
                              : "bg-transparent text-gray-400 border-white/20 hover:border-white/40 hover:text-white"
                          }`}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* About Your Project */}
                  <div>
                    <p className="text-sm text-gray-400 mb-4">About Your Project</p>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Type your message..."
                      required
                      rows={5}
                      className="w-full px-4 py-4 bg-[#111] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Icon icon="lucide:loader-2" width={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Social & Address Section */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Social */}
                <div>
                  <h3 className="text-black font-semibold mb-4">Social</h3>
                  <div className="flex items-center gap-6">
                    <a 
                      href="https://instagram.com/sendcomms" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
                    >
                      <Icon icon="simple-icons:instagram" width={16} />
                      <span className="text-sm">@SendComms</span>
                    </a>
                    <a 
                      href="https://twitter.com/sendcomms" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
                    >
                      <Icon icon="simple-icons:x" width={16} />
                      <span className="text-sm">@SendComms</span>
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h3 className="text-black font-semibold mb-4">Address</h3>
                  <div className="flex items-start gap-2 text-gray-600">
                    <Icon icon="lucide:map-pin" width={16} className="mt-0.5 flex-shrink-0" />
                    <p className="text-sm">
                      Centrally located in Ghana with talent<br />
                      from Africa and across the world
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Let's Work Together Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-16">
              Let&apos;s work together
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Do It Yourself */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Do It Yourself</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Free resources to level up your API integration. Check out our documentation, guides, and tutorials to get started quickly.
                </p>
                <a 
                  href="https://docs.sendcomms.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-2.5 rounded-lg bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium transition-all"
                >
                  Learn more
                </a>
              </div>

              {/* Do It With You */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Do It With You</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Free resources to level up your integration. Our team will guide you through the setup process and best practices.
                </p>
                <a 
                  href="https://console.sendcomms.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-2.5 rounded-lg bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium transition-all"
                >
                  Learn more
                </a>
              </div>

              {/* Do It For You */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Do It For You</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Enterprise solutions tailored to your needs. We handle everything from integration to ongoing maintenance.
                </p>
                <a 
                  href="mailto:enterprise@sendcomms.com"
                  className="inline-block px-5 py-2.5 rounded-lg bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium transition-all"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
                  Subscribe to our newsletter
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  We&apos;re more than just a click away. Reach out for a personalized consultation or a casual coffee over Zoom. Let&apos;s make your communication infrastructure exceptional.
                </p>
              </div>
              <div>
                <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Email here"
                    required
                    disabled={newsletterSubmitting}
                    className="flex-1 px-4 py-3 bg-transparent border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/40 transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={newsletterSubmitting || !newsletterEmail}
                    className="px-6 py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {newsletterSubmitting ? (
                      <>
                        <Icon icon="lucide:loader-2" className="animate-spin" width={16} />
                        <span>Joining...</span>
                      </>
                    ) : (
                      "Join now"
                    )}
                  </button>
                </form>
                {newsletterSuccess && (
                  <div className="mt-3 flex items-center gap-2 text-green-400 text-sm">
                    <Icon icon="lucide:check-circle" width={16} />
                    <span>You&apos;re subscribed! Check your inbox for a welcome email.</span>
                  </div>
                )}
                {newsletterError && (
                  <div className="mt-3 flex items-center gap-2 text-red-400 text-sm">
                    <Icon icon="lucide:alert-circle" width={16} />
                    <span>{newsletterError}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
