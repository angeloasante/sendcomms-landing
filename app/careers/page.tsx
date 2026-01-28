"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

type FilterType = "all" | "remote" | "department";

const jobListings = [
  {
    id: 1,
    title: "Senior Backend Engineer",
    type: "Full Time",
    location: "Accra / Remote",
    department: "Engineering",
    remote: true,
  },
  {
    id: 2,
    title: "Frontend Developer",
    type: "Full Time",
    location: "Accra / Remote",
    department: "Engineering",
    remote: true,
  },
  {
    id: 3,
    title: "DevOps Engineer",
    type: "Full Time",
    location: "Accra / On-site",
    department: "Engineering",
    remote: false,
  },
  {
    id: 4,
    title: "Product Designer",
    type: "Full Time",
    location: "Remote",
    department: "Design",
    remote: true,
  },
  {
    id: 5,
    title: "Technical Writer",
    type: "Part-time",
    location: "Remote",
    department: "Marketing",
    remote: true,
  },
  {
    id: 6,
    title: "Sales Representative",
    type: "Full Time",
    location: "Lagos / On-site",
    department: "Sales",
    remote: false,
  },
];

const perks = [
  {
    icon: "lucide:clock",
    title: "Flexible Working Hours",
    description: "Our families and lives outside of our jobs are very important to us; our schedules are flexible to reflect and support that.",
  },
  {
    icon: "lucide:globe",
    title: "Remote First",
    description: "Most of our team are based across Africa. We do ask that your workday overlaps with GMT for at least four hours.",
  },
  {
    icon: "lucide:banknote",
    title: "Competitive Compensation",
    description: "We offer competitive salaries benchmarked against the market, with regular reviews and equity options for all team members.",
  },
  {
    icon: "lucide:heart-pulse",
    title: "Premium Healthcare",
    description: "We offer comprehensive health insurance coverage for you and your dependents, including medical, dental, and vision.",
  },
  {
    icon: "lucide:graduation-cap",
    title: "Learning & Development",
    description: "Annual learning budget for courses, conferences, and books. We invest in your growth and career development.",
  },
  {
    icon: "lucide:plane",
    title: "Unlimited PTO",
    description: "Take the time you need to recharge. We trust you to manage your time and deliver great work.",
  },
];

export default function CareersPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");

  const departments = [...new Set(jobListings.map((job) => job.department))];

  const filteredJobs = jobListings.filter((job) => {
    if (activeFilter === "remote" && !job.remote) return false;
    if (selectedDepartment !== "all" && job.department !== selectedDepartment) return false;
    return true;
  });

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col w-full overflow-x-hidden">
      <Header />

      <main className="flex-grow pt-32">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-6 mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-muted border border-border text-muted-foreground text-xs font-medium mb-6">
            Career
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-[1.1] mb-8">
            Work With Us
          </h1>

          {/* Filters - Hidden until we have job listings
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveFilter("all");
                  setSelectedDepartment("all");
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === "all" && selectedDepartment === "all"
                    ? "bg-foreground text-background"
                    : "bg-muted text-foreground border border-border hover:bg-accent"
                }`}
              >
                All Roles
              </button>
              <button
                onClick={() => setActiveFilter(activeFilter === "remote" ? "all" : "remote")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === "remote"
                    ? "bg-foreground text-background"
                    : "bg-muted text-foreground border border-border hover:bg-accent"
                }`}
              >
                Remote
              </button>
              <button
                onClick={() => setActiveFilter("department")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === "department"
                    ? "bg-foreground text-background"
                    : "bg-muted text-foreground border border-border hover:bg-accent"
                }`}
              >
                Department
              </button>
            </div>

            <div className="relative">
              <select
                value={selectedDepartment}
                onChange={(e) => {
                  setSelectedDepartment(e.target.value);
                  setActiveFilter("department");
                }}
                className="appearance-none bg-muted border border-border rounded-lg px-4 py-2 pr-10 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                <option value="all">Filter by</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <Icon
                icon="lucide:chevron-down"
                width={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
            </div>
          </div>
          */}
        </section>

        {/* Job Listings */}
        <section className="max-w-5xl mx-auto px-6 mb-24">
          {/* Coming Soon Message */}
          <div className="text-center py-16 border border-border rounded-2xl bg-muted/30">
            <Icon icon="lucide:briefcase" width={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold text-foreground mb-2">We&apos;ll be hiring soon!</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We&apos;re growing and will have exciting opportunities available shortly. Check back soon or send us your resume.
            </p>
          </div>

          {/* Job listings - Coming soon
          <div className="space-y-3">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <a
                  key={job.id}
                  href={`/careers/${job.id}`}
                  className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-xl border border-border bg-card hover:bg-muted/50 transition-all group"
                >
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-2 md:mb-0">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-8 text-sm text-muted-foreground">
                    <span className="min-w-[100px]">{job.type}</span>
                    <span className="min-w-[150px]">{job.location}</span>
                    <Icon
                      icon="lucide:arrow-right"
                      width={16}
                      className="opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
                    />
                  </div>
                </a>
              ))
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <Icon icon="lucide:briefcase" width={48} className="mx-auto mb-4 opacity-50" />
                <p>No positions found matching your criteria.</p>
              </div>
            )}
          </div>
          */}
        </section>

        {/* Perks and Benefits */}
        <section className="max-w-5xl mx-auto px-6 py-24 border-t border-border">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-16">
            Our Perks and Benefits
          </h2>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {perks.map((perk, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center">
                  <Icon icon={perk.icon} width={20} className="text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">{perk.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{perk.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-5xl mx-auto px-6 py-24 text-center border-t border-border">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Don&apos;t see a role that fits?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
            We&apos;re always looking for talented people to join our team. Send us your resume and we&apos;ll keep you in mind for future opportunities.
          </p>
          <a
            href="mailto:careers@sendcomms.com"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-lg text-sm font-medium hover:opacity-90 transition-all shadow-xl"
          >
            <Icon icon="lucide:mail" width={16} />
            Get in Touch
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
