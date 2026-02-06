"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { processFile } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleUpload() {
    if (!file) {
      setStatus("error");
      return;
    }

    setStatus("uploading");

    try {
      const data = await processFile(file);
      
      // Store in localStorage for dashboard access (week 4 requirement context)
      localStorage.setItem("dashboard_data", JSON.stringify(data));
      localStorage.setItem("dashboard_filename", file.name);
      
      setStatus("success");
      
      // Short delay to show success state before redirect
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
      
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus(""); // Reset status on new file
    }
  };

  return (
    <main className="flex flex-col h-screen w-full bg-background text-foreground font-sans selection:bg-accent selection:text-primary overflow-hidden">
        
        {/* Header Section - Fixed Height */}
        <motion.header 
          className="flex-none h-16 border-b border-border/40 flex items-center justify-between px-6 md:px-12 bg-background/80 backdrop-blur-md z-10"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-auto aspect-[3/1]">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/GERIRISK WT-SVG.svg" 
                  alt="GeriRisk Logo" 
                  className="h-full w-auto object-contain"
                />
            </div>
            <div className="h-6 w-px bg-border hidden md:block"></div>
             <p className="hidden md:block text-xs text-muted-foreground uppercase tracking-widest font-medium">
                Analytics Module
            </p>
          </div>
          
          <div className="flex items-center gap-6 text-sm font-medium">
             <span className="text-primary cursor-pointer hover:underline underline-offset-4 decoration-2">Import Data</span>
             <span className="text-muted-foreground cursor-not-allowed">Dashboard</span>
             <span className="text-muted-foreground cursor-not-allowed">Settings</span>
             <div className="h-8 w-8 rounded-full bg-accent/20 text-primary flex items-center justify-center font-bold text-xs ring-2 ring-background shadow-sm">
                AI
             </div>
          </div>
        </motion.header>

        {/* Main Content - Flex Grow */}
        <div className="flex-1 flex overflow-hidden">
            
            {/* Sidebar / Info Column */}
            <motion.aside 
              className="w-1/3 bg-sidebar/80 backdrop-blur-md border-r border-sidebar-border/50 p-12 overflow-y-auto hidden lg:block"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
                 <div className="border-l-4 border-primary pl-6 mb-12">
                    <h1 className="text-4xl font-light tracking-tight text-sidebar-foreground uppercase">
                        Data Import
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground uppercase tracking-widest">
                        Secure Wearable CSV Upload
                    </p>
                </div>

                <div className="space-y-8">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                    <h3 className="text-sm font-bold uppercase tracking-wider text-sidebar-foreground mb-3">
                        Protocol
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                        Please ensure the wearable data is in the standard CSV format. 
                        All files are processed through our secure medical-grade pipeline 
                        before analysis.
                    </p>
                    </motion.div>
                    
                    <motion.div 
                      className="border border-sidebar-border/50 p-6 bg-background/40 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                        System Status
                    </h3>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium text-sidebar-foreground">Ready for Import</span>
                    </div>
                    </motion.div>
                </div>
            </motion.aside>

            {/* Main Interactive Area */}
            <section className="flex-1 p-8 md:p-12 lg:p-24 overflow-y-auto flex flex-col justify-center bg-background/60 backdrop-blur-sm">
                <div className="max-w-2xl w-full mx-auto">
                     <motion.div 
                       className="border border-border p-12 hover:border-primary transition-colors duration-300 shadow-sm hover:shadow-lg rounded-lg"
                       initial={{ scale: 0.95, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
                     >
              
                        {/* File Drop Area Visual */}
                        <motion.div 
                            onClick={() => fileInputRef.current?.click()}
                            className="group cursor-pointer border-2 border-dashed border-border bg-muted/20 py-24 text-center hover:border-primary hover:bg-accent/10 transition-all duration-300 rounded-lg"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                        >
                            <input
                            ref={fileInputRef}
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            className="hidden"
                            />
                            
                            <div className="space-y-6">
                            <motion.div 
                              className="mx-auto h-16 w-16 text-muted-foreground group-hover:text-primary transition-colors"
                              animate={status === "uploading" ? { rotate: 360 } : {}}
                              transition={status === "uploading" ? { repeat: Infinity, duration: 1, ease: "linear" } : {}}
                            >
                                {status === "uploading" ? (
                                   <div className="h-full w-full rounded-full border-4 border-primary border-t-transparent" />
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                                  <path strokeLinecap="square" strokeLinejoin="miter" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                  </svg>
                                )}
                            </motion.div>
                            
                            <div className="text-lg text-muted-foreground">
                                {file ? (
                                <motion.span 
                                  key="file-name"
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="font-medium text-primary"
                                >
                                  {file.name}
                                </motion.span>
                                ) : (
                                <span className="font-medium">
                                    <span className="font-semibold underline decoration-primary underline-offset-4 text-primary">Click to upload</span> or drag and drop
                                </span>
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground uppercase tracking-wide">CSV files up to 50MB</p>
                            </div>
                        </motion.div>

                        {/* Action Bar */}
                        <div className="mt-12 flex items-center justify-between">
                            
                            {/* Status Indicator */}
                            <div className="flex-1 pr-6">
                            <AnimatePresence mode="wait">
                            {status === "uploading" && (
                                <motion.div 
                                  key="uploading"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0 }}
                                  className="text-sm text-primary animate-pulse"
                                >Processing data stream...</motion.div>
                            )}
                            {status === "success" && (
                                <motion.div 
                                  key="success"
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="text-sm text-primary font-medium flex items-center gap-2"
                                >
                                    <span className="block h-1.5 w-1.5 bg-primary"></span>
                                    Upload complete
                                </motion.div>
                            )}
                            {status === "error" && (
                                <motion.div 
                                  key="error"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="text-sm text-destructive font-medium flex items-center gap-2"
                                >
                                    <span className="block h-1.5 w-1.5 bg-destructive"></span>
                                    Error processing file
                                </motion.div>
                            )}
                            </AnimatePresence>
                            </div>

                            {/* Primary Action */}
                            <motion.button
                            onClick={handleUpload}
                            disabled={!file || status === "uploading"}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-4 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-widest hover:opacity-90 disabled:opacity-50 disabled:bg-muted disabled:text-muted-foreground transition-all active:scale-[0.98] shadow-sm hover:shadow-md hover:shadow-accent/20 rounded-lg"
                            >
                            {status === "uploading" ? "Analyzing..." : "Analyze Data"}
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>

        {/* Footer */}
        <footer className="h-12 border-t border-border flex items-center justify-between px-12 bg-muted/30 text-xs text-muted-foreground uppercase tracking-widest">
            <span>© 2024 GeriRisk AI</span>
            <div className="flex gap-6">
                <span className="hover:text-primary cursor-pointer">Privacy</span>
                <span className="hover:text-primary cursor-pointer">Terms</span>
                <span className="hover:text-primary cursor-pointer">Support</span>
            </div>
        </footer>
    </main>
  );
}
