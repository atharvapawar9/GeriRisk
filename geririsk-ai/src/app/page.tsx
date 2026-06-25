"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Activity,
  ShieldCheck,
  HeartPulse,
  Brain,
  CalendarCheck,
  LayoutDashboard,
  Watch,
  Droplets,
  TrendingUp,
  Lock,
  BarChart3,
  Zap,
  Eye,
  Upload,
  ChevronDown,
} from "lucide-react";

/* ───────────────────────── animation variants ───────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ───────────────────────── data ───────────────────────── */
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

const TRUST_ITEMS = [
  { icon: Brain, label: "AI Analytics" },
  { icon: Activity, label: "Precise Monitoring" },
  { icon: HeartPulse, label: "Clinical Insights" },
  { icon: Lock, label: "Secure Data" },
];

const FEATURES = [
  {
    icon: HeartPulse,
    title: "Cardiac Risk Prediction",
    desc: "Identify elevated cardiac stress using AI-driven heart-rate pattern analysis and contextual activity data.",
  },
  {
    icon: Watch,
    title: "Wearable Data Analysis",
    desc: "Seamlessly ingest CSV data from popular wearables to extract meaningful health indicators.",
  },
  {
    icon: Droplets,
    title: "SpO2 Monitoring",
    desc: "Track blood oxygen saturation trends and detect dangerous dips, especially during sleep.",
  },
  {
    icon: TrendingUp,
    title: "Heart Rate Trends",
    desc: "Visualize 24-hour heart rate curves against steps and activity to spot anomalies.",
  },
  {
    icon: CalendarCheck,
    title: "Book Appointments",
    desc: "Seamlessly schedule consultations with specialists directly from the platform based on AI recommendations.",
  },
  {
    icon: LayoutDashboard,
    title: "Patient Dashboard",
    desc: "One unified view of all vitals, risk cards, charts, and alerts for quick clinical decisions.",
  },
];

const STEPS = [
  {
    num: "01",
    icon: Upload,
    title: "Upload Wearable Data",
    desc: "Import a standard CSV file from any supported medical wearable device in seconds.",
  },
  {
    num: "02",
    icon: Brain,
    title: "AI Analyzes Health Signals",
    desc: "Our models process heart rate, steps, SpO₂, and sleep data to compute risk scores.",
  },
  {
    num: "03",
    icon: BarChart3,
    title: "Receive Cardiac Risk Prediction",
    desc: "View comprehensive risk dashboards designed for quick clinical interpretation.",
  },
];

const BENEFITS = [
  {
    icon: Zap,
    title: "Early Detection",
    desc: "Catch cardiac anomalies before they escalate into emergencies.",
  },
  {
    icon: ShieldCheck,
    title: "Prevent Emergencies",
    desc: "Proactive alerts give caregivers time to intervene before a crisis.",
  },
  {
    icon: Eye,
    title: "Continuous Monitoring",
    desc: "Round-the-clock tracking of vitals from everyday wearable devices.",
  },
  {
    icon: Brain,
    title: "AI Driven Decisions",
    desc: "Machine-learning models surface the insights that matter most.",
  },
];

const FAQS = [
  {
    q: "What data is required?",
    a: "GeriRisk works with standard CSV exports from popular wearables. The file should contain timestamped heart rate, step count, SpO₂, and optional sleep-stage columns.",
  },
  {
    q: "Is this medically approved?",
    a: "GeriRisk is a risk-monitoring and pattern-analysis tool. It does not diagnose conditions and is not classified as a medical device. All insights should be interpreted alongside professional clinical judgment.",
  },
  {
    q: "How accurate is the prediction?",
    a: "Our models are trained on validated clinical datasets and achieve high sensitivity for detecting elevated risk patterns. Accuracy depends on the quality and completeness of the input data.",
  },
  {
    q: "Is patient data secure?",
    a: "Yes. All data is encrypted in transit and at rest. We follow industry-standard security practices and never share patient data with third parties.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════ */
/*  COMPONENT                                                            */
/* ═══════════════════════════════════════════════════════════════════════ */
export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* scroll-linked zoom for the hero dashboard image */
  const heroImgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroImgRef,
    offset: ["start end", "end start"],
  });
  const heroImgScale = useTransform(heroScroll, [0, 0.5, 1], [1, 1.25, 1]);

  return (
    <main className="min-h-screen bg-[#fbfbfd] font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* ───────────── NAVBAR (Glassmorphism) ───────────── */}
      <motion.header
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-6xl bg-white/70 backdrop-blur-xl rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/50"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Image
            src="/GERIRISK WT-SVG.svg"
            alt="GeriRisk Logo"
            width={130}
            height={40}
            className="h-7 md:h-8 w-auto"
            priority
          />
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[15px] font-bold text-black/80 transition-all hover:bg-white/80 hover:text-black"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <Link href="/login">
            <button className="btn-shimmer bg-[#0000c9] hover:bg-[#0000a0] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer">
              Sign In
            </button>
          </Link>
        </div>
      </motion.header>

      {/* ═══════════════════ 1 · HERO ═══════════════════ */}
      <section
        id="home"
        className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden bg-white"
      >
        {/* Animated gradient mesh background */}
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />

        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center px-6"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0000c9]/10 border border-[#0000c9]/20 text-[#0000c9] text-xs font-semibold tracking-wide uppercase mb-8 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0000c9] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0000c9]" />
            </span>
            AI-Powered Health Monitoring
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 leading-[1.08] tracking-tight mb-6"
          >
            Predict Vital Risks
            <br />
            <span className="text-[#0000c9]">
              Before They Even Happen
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            AI-powered monitoring for elderly patients using wearable health
            data. Detect anomalies, prevent emergencies, and support clinical
            decisions — all from one dashboard.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="/login">
              <button className="btn-shimmer flex items-center gap-2 bg-[#0000c9] hover:bg-[#0000a0] text-white px-8 py-4 rounded-full text-base font-medium shadow-lg shadow-[#0000c9]/20 hover:shadow-[#0000c9]/30 transition-all cursor-pointer">
                Get Started Free
              </button>
            </Link>
            <a href="#features">
              <button className="flex items-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 px-8 py-4 rounded-full text-base font-semibold border border-gray-200/80 transition-all cursor-pointer shadow-sm">
                Explore Features
              </button>
            </a>
          </motion.div>

          {/* Dashboard preview */}
          <motion.div
            ref={heroImgRef}
            variants={fadeUp}
            custom={4}
            className="relative max-w-5xl mx-auto"
          >
            <motion.div
              style={{ scale: heroImgScale }}
              className="rounded-2xl overflow-hidden shadow-2xl shadow-black/10 border border-gray-200/60 bg-white will-change-transform"
            >
              <Image
                src="/Dashboard M.png"
                alt="GeriRisk Dashboard Preview"
                width={1920}
                height={1080}
                unoptimized
                className="w-full h-auto"
                priority
              />
            </motion.div>
            {/* glow underneath */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-20 bg-[#0000c9]/8 blur-[60px] rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════ 2 · TRUST STRIP ═══════════════════ */}
      <section className="py-12 bg-[#f5f5f7] border-y border-gray-200/40">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-8">
            Trusted for AI-powered health monitoring
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {TRUST_ITEMS.map((t) => (
              <div
                key={t.label}
                className="flex items-center gap-3 text-gray-500"
              >
                <t.icon className="h-5 w-5 text-[#0000c9]" />
                <span className="text-sm font-medium">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ 3 · FEATURES — BENTO GRID ═══════════════════ */}
      <section id="features" className="py-24 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold text-[#0000c9] uppercase tracking-wider mb-3">
              Features
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Everything Clinicians{" "}
              <span className="text-[#0000c9]">Need</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              A comprehensive toolkit built for modern geriatric care.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bento-card-glow group rounded-3xl p-8 border border-gray-200/60 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="relative z-10">
                  <div className="h-12 w-12 rounded-2xl bg-[#0000c9]/8 text-[#0000c9] flex items-center justify-center mb-5 group-hover:bg-[#0000c9] group-hover:text-white transition-colors duration-300">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {f.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ 4 · HOW IT WORKS — CONNECTED TIMELINE ═══════════════════ */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold text-[#0000c9] uppercase tracking-wider mb-3">
              How It Works
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Three Steps to{" "}
              <span className="text-[#0000c9]">
                Actionable Insights
              </span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              From raw wearable data to cardiac risk prediction in minutes.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative max-w-5xl mx-auto">
            {/* Connector line (desktop only) */}
            <div className="hidden md:block timeline-connector" />

            <div className="grid md:grid-cols-3 gap-12 md:gap-8">
              {STEPS.map((s, i) => (
                <div key={s.title} className="relative text-center">
                  {/* Step circle */}
                  <div className="relative z-10 mx-auto mb-8">
                    <div className="h-14 w-14 mx-auto rounded-full bg-gradient-to-br from-[#0000c9] to-[#6366f1] text-white flex items-center justify-center shadow-lg shadow-[#0000c9]/20">
                      <s.icon className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {s.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                    {s.desc}
                  </p>


                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ 5 · BENEFITS — DARK GLASSMORPHISM ═══════════════════ */}
      <section
        className="py-24 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #050520 0%, #0a0a3a 30%, #0000c9 100%)",
        }}
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#6366f1]/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#0000c9]/15 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-3">
              Why GeriRisk
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Why Clinicians{" "}
              <span className="text-blue-300">
                Choose GeriRisk
              </span>
            </h2>
            <p className="text-blue-200/60 max-w-2xl mx-auto text-lg">
              Purpose-built for the unique challenges of geriatric cardiac care.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="glass-card rounded-2xl p-7 text-center"
              >
                <div className="h-14 w-14 mx-auto rounded-2xl bg-white/10 text-blue-300 flex items-center justify-center mb-5">
                  <b.icon className="h-7 w-7" />
                </div>
                <h4 className="font-bold text-white text-lg mb-2">
                  {b.title}
                </h4>
                <p className="text-blue-200/60 text-sm leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ 6 · FAQ ═══════════════════ */}
      <section id="faq" className="py-24 bg-[#f5f5f7]">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold text-[#0000c9] uppercase tracking-wider mb-3">
              FAQ
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Frequently Asked{" "}
              <span className="text-[#0000c9]">
                Questions
              </span>
            </h2>
            <p className="text-gray-500 text-lg">
              Common questions about GeriRisk and cardiac risk monitoring.
            </p>
          </motion.div>

          <div className="space-y-4">
            {FAQS.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
                  >
                    <span className="font-semibold text-gray-900">
                      {f.q}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-400 transition-transform duration-300 shrink-0 ml-4 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`px-6 overflow-hidden transition-all duration-300 ${
                      isOpen ? "pb-5 max-h-60" : "max-h-0"
                    }`}
                  >
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {f.a}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════ 7 · CTA ═══════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="cta-glow rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #0000c9 0%, #000080 50%, #000060 100%)",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            {/* Decorative dots */}
            <div className="absolute top-6 left-6 w-2 h-2 rounded-full bg-white/20" />
            <div className="absolute top-12 right-16 w-1.5 h-1.5 rounded-full bg-white/15" />
            <div className="absolute bottom-10 left-20 w-1 h-1 rounded-full bg-white/20" />
            <div className="absolute bottom-8 right-10 w-2.5 h-2.5 rounded-full bg-white/10" />

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start Monitoring Cardiac Risk Today
            </h2>
            <p className="text-blue-200/70 max-w-xl mx-auto mb-8">
              Join clinicians already using AI-driven insights to protect
              elderly patients. Get started in minutes.
            </p>
            <Link href="/login">
              <button className="btn-shimmer inline-flex items-center gap-2 bg-white text-[#0000c9] hover:bg-gray-50 px-8 py-4 rounded-full text-base font-semibold shadow-lg transition-all cursor-pointer mb-6">
                Get Started Free
              </button>
            </Link>
            <p className="text-blue-200/40 text-sm">
              No credit card required · HIPAA compliant · Setup in 2 minutes
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ 8 · FOOTER ═══════════════════ */}
      <footer className="relative bg-[#0a0a1a] text-gray-400 py-16 px-6">
        {/* Gradient top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0000c9]/50 to-transparent" />

        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* brand */}
          <div>
            <Image
              src="/GERIRISK WT-SVG.svg"
              alt="GeriRisk Logo"
              width={120}
              height={40}
              className="h-8 w-auto mb-4"
            />
            <p className="text-sm leading-relaxed text-gray-500">
              AI-powered cardiac risk monitoring for elderly patients.
            </p>
          </div>

          {/* product */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#features"
                  className="hover:text-white transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-white transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* company */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* legal */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} GeriRisk AI. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Not a medical device. For clinical decision support only.
          </p>
        </div>
      </footer>
    </main>
  );
}
