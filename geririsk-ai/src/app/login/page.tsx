"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock authentication delay
    setTimeout(() => {
      router.push("/upload");
    }, 800);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f9fa] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [bg-size:16px_16px]">
      <motion.div 
        className="w-full max-w-md p-8"
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, duration: 0.5 }}
      >
        <div className="relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 p-8 sm:p-10">
          
          <div className="mb-10 text-center">
            <motion.div 
              className="mx-auto mb-6 flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
               <Image 
                 src="/GERIRISK MAIN-SVG.svg" 
                 alt="GeriRisk Logo" 
                 width={180} 
                 height={60} 
                 className="h-16 w-auto"
                 priority
               />
            </motion.div>
            <motion.h1 
              className="text-2xl font-semibold tracking-tight text-gray-900"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              GeriRisk Analytics
            </motion.h1>
            <motion.p 
              className="mt-2 text-sm text-gray-500"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Sign in to access the medical risk dashboard
            </motion.p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <motion.div 
              className="space-y-2"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label htmlFor="email" className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Email Address
              </label>
              <motion.input
                whileFocus={{ scale: 1.01, borderColor: "#0000c9" }}
                id="email"
                type="email"
                placeholder="doctor@clinic.com"
                className="w-full rounded-lg border border-gray-200 bg-white/50 px-4 py-3 text-sm text-gray-900 outline-none transition-all focus:ring-1 focus:ring-[#0000c9]"
                defaultValue="doctor@clinic.com"
              />
            </motion.div>
            
            <motion.div 
              className="space-y-2"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
               <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Password
                </label>
               </div>
              <motion.input
                whileFocus={{ scale: 1.01, borderColor: "#0000c9" }}
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-200 bg-white/50 px-4 py-3 text-sm text-gray-900 outline-none transition-all focus:ring-1 focus:ring-[#0000c9]"
                defaultValue="password"
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0, 0, 201, 0.2)" }}
              whileTap={{ scale: 0.98 }}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="group relative w-full overflow-hidden rounded-lg bg-[#0000c9] py-3 text-sm font-semibold text-white transition-all disabled:opacity-70"
            >
              <span className={`flex items-center justify-center gap-2 ${isLoading ? "invisible" : ""}`}>
                Sign In
              </span>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                </div>
              )}
            </motion.button>
          </form>

          <motion.div 
            className="mt-8 text-center text-xs text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Protected by HIPAA-compliant encryption
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
