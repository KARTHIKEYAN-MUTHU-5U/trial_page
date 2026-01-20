import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Stars } from 'lucide-react';

const stats = [
  { label: 'Projects Delivered', value: '120+' },
  { label: 'Avg Conversion Uplift', value: '38%' },
  { label: 'Countries Served', value: '14' },
];

const services = [
  {
    title: 'Digital Marketing',
    outcomes: ['Full-funnel demand gen', 'Performance creative testing', 'Attribution-ready analytics'],
    timeline: 'Multi-quarter growth programs',
    startingAt: '$3,500/mo',
  },
  {
    title: 'Web & App Development',
    outcomes: ['Product strategy + UX', 'Conversion-optimized builds', 'Performance tuning'],
    timeline: 'Launch in phases with sprint delivery',
    startingAt: '$12,000',
  },
  {
    title: 'WhatsApp Automation',
    outcomes: ['Official API setup', 'Template + workflow design', 'Support inbox enablement'],
    timeline: 'Enablement in weeks, iterate monthly',
    startingAt: '$4,500',
  },
  {
    title: 'AI/LLM Solutions',
    outcomes: ['RAG & copilots', 'Safety + evaluation', 'Production monitoring'],
    timeline: 'Pilot → production roadmap',
    startingAt: '$9,000',
  },
];

const caseStudies = [
  {
    name: 'Velocity Retail',
    problem: 'Stalled ecommerce growth and low repeat purchase rate.',
    approach: 'Built lifecycle automation and personalization across WhatsApp + email.',
    result: '+42% repeat purchases, +18% AOV in 90 days.',
  },
  {
    name: 'Nimbus Health',
    problem: 'Manual patient onboarding and slow support triage.',
    approach: 'AI-powered intake with verified consent + compliant workflows.',
    result: '68% faster response time and 31% higher NPS.',
  },
  {
    name: 'Aurora Finance',
    problem: 'Legacy portal with low conversion and poor analytics.',
    approach: 'Rebuilt product flow with instrumentation and experimentation.',
    result: '2.1x lead-to-demo conversion.',
  },
];

const process = ['Discover', 'Design', 'Build', 'Launch', 'Optimize'];

const testimonials = [
  {
    quote: 'The team turned our growth engine around in six weeks and delivered measurable ROI fast.',
    name: 'Renee Carter',
    role: 'VP Marketing, Velocity Retail',
  },
  {
    quote: 'The WhatsApp automation stack is compliant and incredibly reliable. Our agents love it.',
    name: 'Omar Singh',
    role: 'Head of CX, Nimbus Health',
  },
  {
    quote: 'They shipped a production-grade LLM copilot with clear guardrails and monitoring.',
    name: 'Alicia Perez',
    role: 'CTO, Aurora Finance',
  },
];

export const MarketingHome = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Sparkles className="h-5 w-5 text-violet-400" />
            YOUR_BRAND
          </div>
          <nav className="hidden items-center gap-6 text-sm text-slate-200 md:flex">
            <a className="hover:text-white" href="#services">Services</a>
            <a className="hover:text-white" href="#work">Case Studies</a>
            <a className="hover:text-white" href="#academy">Academy</a>
            <a className="hover:text-white" href="#contact">Contact</a>
          </nav>
          <button className="rounded-full bg-violet-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-violet-400">
            Book a Strategy Call
          </button>
        </div>
      </header>

      <section className="relative overflow-hidden hero-aurora">
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col items-start justify-center gap-8 px-6 py-20">
          <div className="max-w-2xl space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-slate-200">
              AI-first Growth, Products, and Automation
            </span>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
              We build growth engines + products + automation — powered by AI.
            </h1>
            <p className="text-lg text-slate-200">
              Digital marketing, web/app development, and WhatsApp automation for modern businesses — plus an advanced AI/LLM academy.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:translate-y-[-2px]">
                Book a Strategy Call
              </button>
              <button className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-white">
                View Case Studies
              </button>
            </div>
          </div>
          <div className="grid w-full grid-cols-1 gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200 md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-2">
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Services</p>
            <h2 className="text-3xl font-semibold">Interactive growth systems built for scale.</h2>
          </div>
          <button className="inline-flex items-center gap-2 text-sm font-semibold text-violet-200">
            Get Proposal <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <div key={service.title} className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-white/10 p-2 text-violet-300">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-200">
                {service.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    {outcome}
                  </li>
                ))}
              </ul>
              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
                <p>Timeline: {service.timeline}</p>
                <p>Starting at: {service.startingAt}</p>
              </div>
              <button className="mt-4 w-full rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:border-white">
                Get Proposal
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="border-y border-white/10 bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-col gap-3">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Proof</p>
            <h2 className="text-3xl font-semibold">Scrollytelling case studies with measurable outcomes.</h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <div key={study.name} className="rounded-2xl border border-white/10 bg-slate-950/60 p-6">
                <h3 className="text-xl font-semibold">{study.name}</h3>
                <div className="mt-4 space-y-3 text-sm text-slate-200">
                  <p><span className="text-white">Problem:</span> {study.problem}</p>
                  <p><span className="text-white">Approach:</span> {study.approach}</p>
                  <p><span className="text-emerald-300">Result:</span> {study.result}</p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
                  <Stars className="h-4 w-4 text-yellow-400" />
                  <span>Verified metrics & tracked impact</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Process</p>
            <h2 className="mt-3 text-3xl font-semibold">Discover → Design → Build → Launch → Optimize</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {process.map((step) => (
                <div key={step} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-lg font-semibold">{step}</p>
                  <p className="mt-2 text-sm text-slate-300">
                    Deliverables include strategy workshops, prototypes, QA, analytics, and optimization roadmaps.
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-600/30 to-slate-900/60 p-6">
              <h3 className="text-xl font-semibold">WhatsApp Automation Spotlight</h3>
              <p className="mt-3 text-sm text-slate-200">
                Lead capture, segmentation, workflows, templates, CRM sync, and analytics built on official WhatsApp Business API.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-emerald-300">
                <ShieldCheck className="h-4 w-4" /> Opt-in required. Anti-spam controls enforced.
              </div>
            </div>
            <div id="academy" className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
              <h3 className="text-xl font-semibold">Academy Spotlight</h3>
              <p className="mt-3 text-sm text-slate-200">
                Recorded lessons with quizzes after every video, certificates, and analytics for students and teams.
              </p>
              <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet-200">
                Explore Academy <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-col gap-3">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Testimonials</p>
            <h2 className="text-3xl font-semibold">Teams scaling with YOUR_BRAND.</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="rounded-2xl border border-white/10 bg-slate-950/60 p-6">
                <p className="text-sm text-slate-200">“{testimonial.quote}”</p>
                <p className="mt-4 text-sm font-semibold text-white">{testimonial.name}</p>
                <p className="text-xs text-slate-400">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Final CTA</p>
              <h2 className="mt-3 text-3xl font-semibold">Let’s build your growth + automation stack.</h2>
              <p className="mt-4 text-sm text-slate-200">
                Share your goals and we will send a tailored proposal with timeline ranges, pricing tiers, and next steps.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-300">
                <span className="rounded-full border border-white/20 px-4 py-2">Strategy workshop</span>
                <span className="rounded-full border border-white/20 px-4 py-2">AI + LLM readiness</span>
                <span className="rounded-full border border-white/20 px-4 py-2">WhatsApp compliance</span>
              </div>
            </div>
            <form className="space-y-4">
              <input
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400"
                placeholder="Full name"
              />
              <input
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400"
                placeholder="Work email"
              />
              <select className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white">
                <option>Service interest</option>
                <option>Digital Marketing</option>
                <option>Web/App Development</option>
                <option>WhatsApp Automation</option>
                <option>AI/LLM Solutions</option>
              </select>
              <textarea
                className="h-24 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400"
                placeholder="Tell us about your goals"
              />
              <button className="w-full rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-300">
                Request Proposal
              </button>
              <p className="text-xs text-slate-400">
                WhatsApp opt-in required for automation campaigns. All requests are reviewed within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
