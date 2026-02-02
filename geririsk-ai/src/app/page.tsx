"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Activity, ShieldCheck, Wind } from "lucide-react";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* HEADER */}
      <motion.header 
        className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
           <div className="flex items-center gap-2">
             <Image 
               src="/GERIRISK WT-SVG.svg" 
               alt="GeriRisk Logo" 
               width={120} 
               height={40} 
               className="h-8 w-auto"
               priority
             />
           </div>
           
           <div className="flex items-center gap-4">
             <Link href="/login">
               <span className="text-sm font-medium text-gray-500 hover:text-[#0000c9] transition-colors cursor-pointer">
                 Log In
               </span>
             </Link>
             <Link href="/login">
               <button className="bg-[#0000c9] hover:bg-[#0000a0] text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-md">
                 Start Analysis
               </button>
             </Link>
           </div>
        </div>
      </motion.header>

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-6 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] bg-gray-50/50">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Clinical Grade AI
          </motion.div>
          
          <motion.h1 variants={item} className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
            Wearable Risk Monitoring <br/>
            <span className="text-gray-400">for Geriatric Care</span>
          </motion.h1>
          
          <motion.p variants={item} className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            GeriRisk transforms everyday wearable data into clear, interpretable risk indicators for cardiac stress, fall likelihood, and respiratory health.
          </motion.p>
          
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center justify-center gap-2 bg-[#0000c9] text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg shadow-blue-900/10 hover:shadow-blue-900/20 transition-all"
              >
                Upload Wearable CSV
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>

          </motion.div>
        </motion.div>
      </section>

      {/* FEATURES / WHAT GERIRISK DOES */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What GeriRisk Does</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Our system processes raw wearable data to provide actionable insights for caregivers and medical professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Cardiac */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all"
            >
              <div className="h-12 w-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-6">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Cardiac Risk</h3>
              <p className="text-gray-500 leading-relaxed">
                Identifies elevated cardiac stress patterns using heart rate trends and activity context analysis.
              </p>
            </motion.div>

            {/* Fall */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all"
            >
               <div className="h-12 w-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-6">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fall Assessment</h3>
              <p className="text-gray-500 leading-relaxed">
                Evaluates movement patterns and physiological signals to highlight potential fall risk and gait instability.
              </p>
            </motion.div>

            {/* Respiratory */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all"
            >
               <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <Wind className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Respiratory Health</h3>
              <p className="text-gray-500 leading-relaxed">
                Detects low oxygen saturation (SpO₂) trends and breathing irregularities, especially during rest periods.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6 bg-gray-900 text-white">
        <div className="max-w-[1000px] mx-auto">
          <div className="md:flex items-center gap-16">
            <div className="md:w-1/2 mb-12 md:mb-0">
               <h2 className="text-3xl font-bold mb-6">How It Works</h2>
               <div className="space-y-8">
                 <div className="flex gap-4">
                   <div className="flex-none h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm">1</div>
                   <div>
                     <h4 className="font-bold text-lg">Upload Data</h4>
                     <p className="text-gray-400 mt-1">Upload a standard CSV file from any supported medical wearable device.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="flex-none h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm">2</div>
                   <div>
                     <h4 className="font-bold text-lg">AI Processing</h4>
                     <p className="text-gray-400 mt-1">Our system automatically cleans the data and runs risk prediction models.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="flex-none h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm">3</div>
                   <div>
                     <h4 className="font-bold text-lg">Visual Insights</h4>
                     <p className="text-gray-400 mt-1">View comprehensive risk dashboards designed for quick clinical interpretation.</p>
                   </div>
                 </div>
               </div>
            </div>
            
             <motion.div 
               className="md:w-1/2 relative"
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
             >
                <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 p-6 shadow-2xl">
                    <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
                        <div className="h-3 w-3 rounded-full bg-red-400"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                        <div className="h-3 w-3 rounded-full bg-green-400"></div>
                        <div className="ml-auto text-xs text-gray-400 font-mono">dashboard_preview.tsx</div>
                    </div>
                    {/* Abstract Representation of Dashboard */}
                    <div className="space-y-3">
                        <div className="flex gap-3">
                            <div className="h-24 w-1/3 bg-white/5 rounded-lg"></div>
                            <div className="h-24 w-1/3 bg-white/5 rounded-lg"></div>
                            <div className="h-24 w-1/3 bg-white/5 rounded-lg"></div>
                        </div>
                        <div className="h-32 w-full bg-white/5 rounded-lg"></div>
                        <div className="h-8 w-full bg-white/5 rounded-lg"></div>
                    </div>
                </div>
                {/* Decorative blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-600/20 blur-3xl -z-10 rounded-full"></div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* DESIGN PHILOSOPHY */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[800px] mx-auto text-center">
            <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">Design Philosophy</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-3 mb-8">Designed for Calm Technology</h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-12">
                We purposefully avoid alarmist visuals. GeriRisk uses semantic colors and clear hierarchy to reduce cognitive load, helping professionals make informed, non-reactive decisions.
            </p>
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100 inline-block text-left">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-blue-600" />
                    Important Notice
                </h4>
                <p className="text-sm text-gray-600 max-w-md">
                    GeriRisk provides risk monitoring and pattern analysis only. It does not diagnose medical conditions and is not a medical device. All insights should be interpreted alongside professional clinical judgment.
                </p>
            </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-50 border-t border-gray-100 py-12 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all">
                 <Image 
                   src="/GERIRISK MAIN-SVG.svg" 
                   alt="GeriRisk Logo" 
                   width={120} 
                   height={40} 
                   className="h-8 w-auto"
                 />
            </div>
            <div className="text-sm text-gray-400">
                © 2024 GeriRisk AI. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-gray-500">
                <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
            </div>
        </div>
      </footer>

    </main>
  );
}
