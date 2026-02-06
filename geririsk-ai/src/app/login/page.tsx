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
    <main className="flex min-h-screen items-center justify-center bg-background bg-[radial-gradient(var(--border)_1px,transparent_1px)] [bg-size:16px_16px]">
      <motion.div 
        className="w-full max-w-md p-8"
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, duration: 0.5 }}
      >
        <div className="relative overflow-hidden rounded-lg bg-card/70 backdrop-blur-xl shadow-lg border border-border p-8 sm:p-10">
          
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
              className="text-2xl font-semibold tracking-tight text-foreground"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              GeriRisk Analytics
            </motion.h1>
            <motion.p 
              className="mt-2 text-sm text-muted-foreground"
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
              <label htmlFor="email" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Email Address
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                id="email"
                type="email"
                placeholder="doctor@clinic.com"
                className="w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-sm text-foreground outline-none transition-all focus:ring-1 focus:ring-primary focus:border-primary"
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
                <label htmlFor="password" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Password
                </label>
               </div>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-sm text-foreground outline-none transition-all focus:ring-1 focus:ring-primary focus:border-primary"
                defaultValue="password"
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="group relative w-full overflow-hidden rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all disabled:opacity-70 shadow-sm"
            >
              <span className={`flex items-center justify-center gap-2 ${isLoading ? "invisible" : ""}`}>
                Sign In
              </span>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground"></div>
                </div>
              )}
            </motion.button>
          </form>

          <motion.div 
            className="mt-8 text-center text-xs text-muted-foreground"
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
