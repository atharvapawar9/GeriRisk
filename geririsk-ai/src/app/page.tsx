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
  BellRing,
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
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

/* ───────────────────────── animation variants ───────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ───────────────────────── data ───────────────────────── */
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Dashboard", href: "#dashboard" },
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
    icon: BellRing,
    title: "AI Alerts",
    desc: "Receive intelligent notifications when risk thresholds are breached with contextual explanations.",
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
    offset: ["start end", "end start"],   // track from entering to leaving viewport
  });
  // scale: 1 → 1.05 at midpoint → back to 1
  const heroImgScale = useTransform(heroScroll, [0, 0.5, 1], [1, 1.25, 1]);

  return (
    <main className="min-h-screen bg-white font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* ───────────── NAVBAR ───────────── */}
      <motion.header
        className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-white/5"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Image
            src="/GERIRISK WT-SVG.svg"
            alt="GeriRisk Logo"
            width={130}
            height={40}
            className="h-8 w-auto"
            priority
          />
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <Link href="/login">
            <button className="bg-[#0000c9] hover:bg-[#0000a0] text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-lg cursor-pointer">
              Sign In
            </button>
          </Link>
        </div>
      </motion.header>

      {/* ═══════════════════ 1 · HERO ═══════════════════ */}
      <section
        id="home"
        className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0000c9 0%, #000080 40%, #0f172a 100%)",
        }}
      >
        {/* subtle radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-[#a8bcff]/20 blur-[120px] pointer-events-none" />

        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center px-6"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#a8bcff] text-xs font-semibold tracking-wide uppercase mb-8 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a8bcff] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a8bcff]" />
            </span>
            AI-Powered Health Monitoring
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6"
          >
            Predict Vital Risks
            <br />
            <span className="text-[#a8bcff]">Before They Even Happen</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            AI-powered monitoring for elderly patients using wearable health
            data. Detect anomalies, prevent emergencies, and support clinical
            decisions all from one dashboard.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="/login">
              <button className="group flex items-center gap-2 bg-[#0000c9] hover:bg-[#0000a0] text-white px-8 py-3.5 rounded-full text-base font-semibold shadow-lg shadow-blue-900/30 hover:shadow-blue-900/40 transition-all cursor-pointer">
                Get Started Free
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <a href="#dashboard">
              <button className="flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur-sm text-white px-8 py-3.5 rounded-full text-base font-semibold border border-white/20 transition-all cursor-pointer">
                View Dashboard
              </button>
            </a>
          </motion.div>

          {/* floating dashboard card */}
          <motion.div
            ref={heroImgRef}
            variants={fadeUp}
            custom={4}
            className="relative max-w-5xl mx-auto"
          >
            <motion.div
              style={{ scale: heroImgScale }}
              className="rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10 bg-white will-change-transform"
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
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-[#a8bcff]/20 blur-3xl rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════ 2 · TRUST STRIP ═══════════════════ */}
      <section className="py-12 bg-[#f8fafc] border-b border-gray-100">
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

      {/* ═══════════════════ 3 · PRODUCT OVERVIEW ═══════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              One Platform.{" "}
              <span className="text-[#0000c9]">
                Complete Cardiac Risk Monitoring.
              </span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Everything clinicians need to monitor, predict, and prevent
              cardiac events in elderly patients.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* left – text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <ul className="space-y-5">
                {[
                  "Real-time cardiac monitoring from wearable data",
                  "AI-based risk scoring across three domains",
                  "Early anomaly detection with smart alerts",
                  "Long-term patient tracking and trend analysis",
                ].map((txt) => (
                  <li key={txt} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#0000c9] mt-0.5 shrink-0" />
                    <span className="text-gray-600 text-base">{txt}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* right – screenshot */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white"
            >
              <Image
                src="/Dashboard M.png"
                alt="GeriRisk Dashboard"
                width={800}
                height={450}
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ 4 · FEATURES GRID ═══════════════════ */}
      <section id="features" className="py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything Clinicians Need
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              A comprehensive toolkit built for modern geriatric care.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                custom={i}
                className="group bg-white rounded-2xl p-7 border border-gray-100 hover:border-[#0000c9]/30 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-xl bg-[#0000c9]/10 text-[#0000c9] flex items-center justify-center mb-5 group-hover:bg-[#0000c9] group-hover:text-white transition-colors duration-300">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ 5 · VISUAL PRODUCT ═══════════════════ */}
      <section id="dashboard" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              See GeriRisk <span className="text-[#0000c9]">in Action</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              A real-time snapshot of the monitoring dashboard built for
              clinical clarity.
            </p>
          </motion.div>

          <motion.div
            className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src="/Dashboard M.png"
              alt="GeriRisk Dashboard Full View"
              width={1200}
              height={680}
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ 6 · HOW IT WORKS ═══════════════════ */}
      <section id="how-it-works" className="py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Three simple steps from raw wearable data to actionable cardiac
              risk insights.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center group hover:shadow-lg transition-all duration-300"
              >
                <div className="text-5xl font-black text-[#0000c9]/10 absolute top-4 right-6 select-none">
                  {s.num}
                </div>
                <div className="h-14 w-14 mx-auto rounded-2xl bg-[#0000c9]/10 text-[#0000c9] flex items-center justify-center mb-6 group-hover:bg-[#0000c9] group-hover:text-white transition-colors duration-300">
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {s.desc}
                </p>
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 text-gray-200">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ 7 · BENEFITS ═══════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            {/* left – image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden shadow-xl border border-gray-100"
            >
              <Image
                src="/Dashboard M.png"
                alt="GeriRisk Dashboard Benefits"
                width={800}
                height={450}
                className="w-full h-auto"
              />
            </motion.div>

            {/* right – text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Why Clinicians{" "}
                <span className="text-[#0000c9]">Choose GeriRisk</span>
              </h2>
              <div className="space-y-6">
                {BENEFITS.map((b) => (
                  <div
                    key={b.title}
                    className="flex items-start gap-4 group"
                  >
                    <div className="h-10 w-10 rounded-xl bg-[#0000c9]/10 text-[#0000c9] flex items-center justify-center shrink-0 group-hover:bg-[#0000c9] group-hover:text-white transition-colors duration-300">
                      <b.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">
                        {b.title}
                      </h4>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {b.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ 8 · FAQ ═══════════════════ */}
      <section id="faq" className="py-24 bg-[#f8fafc]">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500">
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

      {/* ═══════════════════ 9 · CTA ═══════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="rounded-3xl p-12 md:p-16 text-center"
            style={{
              background:
                "linear-gradient(135deg, #0000c9 0%, #000080 50%, #0f172a 100%)",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start Monitoring Cardiac Risk Today
            </h2>
            <p className="text-gray-300 max-w-xl mx-auto mb-8">
              Join clinicians already using AI-driven insights to protect
              elderly patients. Get started in minutes.
            </p>
            <Link href="/login">
              <button className="group inline-flex items-center gap-2 bg-white text-[#0000c9] hover:bg-gray-50 px-8 py-3.5 rounded-full text-base font-bold shadow-lg transition-all cursor-pointer">
                Get Started Free
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ 10 · FOOTER ═══════════════════ */}
      <footer className="bg-[#0f172a] text-gray-400 py-16 px-6">
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
            <p className="text-sm leading-relaxed">
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
                  href="#dashboard"
                  className="hover:text-white transition-colors"
                >
                  Dashboard
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

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} GeriRisk AI. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Not a medical device. For clinical decision support only.
          </p>
        </div>
      </footer>
    </main>
  );
}
