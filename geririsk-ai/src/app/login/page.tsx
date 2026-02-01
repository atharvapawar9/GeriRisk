"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

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
    <main className="flex min-h-screen items-center justify-center bg-[#f8f9fa] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="w-full max-w-md p-8">
        <div className="relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 p-8 sm:p-10">
          
          <div className="mb-10 text-center">
            <div className="mx-auto mb-6 flex items-center justify-center">
               <Image 
                 src="/GERIRISK MAIN-SVG.svg" 
                 alt="GeriRisk Logo" 
                 width={180} 
                 height={60} 
                 className="h-16 w-auto"
                 priority
               />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              GeriRisk Analytics
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Sign in to access the medical risk dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="doctor@clinic.com"
                className="w-full rounded-lg border border-gray-200 bg-white/50 px-4 py-3 text-sm text-gray-900 outline-none transition-all focus:border-[#0000c9] focus:ring-1 focus:ring-[#0000c9]"
                defaultValue="doctor@clinic.com"
              />
            </div>
            
            <div className="space-y-2">
               <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Password
                </label>
               </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-200 bg-white/50 px-4 py-3 text-sm text-gray-900 outline-none transition-all focus:border-[#0000c9] focus:ring-1 focus:ring-[#0000c9]"
                defaultValue="password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full overflow-hidden rounded-lg bg-[#0000c9] py-3 text-sm font-semibold text-white transition-all hover:bg-[#0000a0] hover:shadow-lg hover:shadow-blue-900/20 disabled:opacity-70"
            >
              <span className={`flex items-center justify-center gap-2 ${isLoading ? "invisible" : ""}`}>
                Sign In
              </span>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                </div>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-gray-400">
            Protected by HIPAA-compliant encryption
          </div>
        </div>
      </div>
    </main>
  );
}
