"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RiskCard from "@/components/RiskCard";
import SparklineChart from "@/components/SparklineChart";
import AlertPanel from "@/components/AlertPanel";
import BookAppointment from "@/components/BookAppointment";
import SleepTimeline from "@/components/SleepTimeline";
import DataTable from "@/components/DataTable";
import MetricCard from "@/components/MetricCard";
import ActivityRing from "@/components/ActivityRing";
import { ProcessResponse } from "@/lib/api";
import { RefreshCw, Heart, Activity, Footprints, Droplets } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<ProcessResponse | null>(null);
  const [filename, setFilename] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load data from storage (simulate session)
    const storedData = localStorage.getItem("dashboard_data");
    const storedFilename = localStorage.getItem("dashboard_filename");

    if (!storedData) {
      router.push("/upload");
      return;
    }

    try {
      setData(JSON.parse(storedData));
      setFilename(storedFilename || "data.csv");
    } catch (e) {
      console.error("Failed to parse data", e);
      router.push("/upload");
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5]">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  // Trends data from API
  const heartRateData = data?.trends?.heartRate || [];
  const spo2Data = data?.trends?.spo2 || [];

  // Generating alerts based on rules
  const alerts = [];
  if (data?.predictions?.cardiacRisk?.level === "High") {
    alerts.push({ time: "10:45 PM", category: "Cardiac", message: "High HR spikes detected with low activity.", level: "Critical" });
  }
  if ((data?.aggregates?.minSpO2 ?? 100) < 92) {
    alerts.push({ time: "3:20 AM", category: "SpO2", message: `SpO2 dipped to ${Math.round(data?.aggregates?.minSpO2)}% during sleep.`, level: "Critical" });
  }
  if (data?.predictions?.fallRisk?.level && data.predictions.fallRisk.level !== "Low") {
    alerts.push({ time: "1:10 PM", category: "Fall Risk", message: "Gait irregularity detected.", level: "Warning" });
  }

  // Fallback defaults if API is empty
  const cardiacLevel = data?.predictions?.cardiacRisk?.level || "Low";
  const fallLevel = data?.predictions?.fallRisk?.level || "Low"; 
  const respLevel = data?.predictions?.respiratoryRisk?.level || "Low";

  // Animation variants
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
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen font-sans text-foreground pb-12">
      {/* Header */}

      <motion.header 
        className="bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60 text-foreground px-8 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50 border-b border-border/40"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
             <Image 
               src="/GERIRISK WT-SVG.svg" 
               alt="GeriRisk Logo" 
               width={150} 
               height={40} 
               className="h-10 w-auto"
               priority
             />
        </Link>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/upload')}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          Upload CSV
        </motion.button>
      </motion.header>

      {/* Subheader / Context */}
      <motion.div 
        className="bg-card/40 backdrop-blur-sm border-b border-border/40 px-8 py-3 flex items-center justify-between text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 text-foreground/80 font-medium">
            <span className="bg-primary/10 text-primary p-1 rounded-full"><RefreshCw className="h-3 w-3" /></span>
            {filename}
        </div>
        <div className="text-muted-foreground font-mono text-xs">
            Last Updated: {new Date().toLocaleString()}
        </div>
      </motion.div>

      <motion.main 
        className="max-w-[1400px] mx-auto p-8 grid grid-cols-12 gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        
        {/* LEFT COLUMN - MAIN DASHBOARD */}
        <div className="col-span-12 lg:col-span-9 space-y-12">
            {/* 0. Key Vitals Banner */}
            <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard title="Avg Heart Rate" value={Math.round(data?.aggregates?.avgHeartRate || 0)} unit="bpm" icon={<Heart className="h-5 w-5" />} />
              <MetricCard title="Min SpO2" value={Math.round(data?.aggregates?.minSpO2 || 0)} unit="%" icon={<Droplets className="h-5 w-5" />} />
              <MetricCard title="Total Steps" value={Math.round(data?.aggregates?.totalSteps || 0)} unit="steps" icon={<Footprints className="h-5 w-5" />} />
              <MetricCard title="Cardiac Events" value={data?.aggregates?.cardiacEvents || 0} unit="events" icon={<Activity className="h-5 w-5" />} />
            </motion.div>

            {/* 1. Risk Summary Cards */}
            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div className="h-full" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <RiskCard 
                      type="cardiac" 
                      label="Cardiac Stress" 
                      score={Math.round(Number(data?.predictions?.cardiacRisk?.score) * 100) || 0} 
                      level={cardiacLevel} 
                      events={data?.aggregates?.cardiacEvents || 0}
                      subtext={(data?.aggregates?.cardiacEvents || 0) > 0 ? "High HR spikes detected" : "Heart rate within normal range"}
                  />
                </motion.div>
                <motion.div className="h-full" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <RiskCard 
                      type="fall" 
                      label="Fall Risk" 
                      score={Math.round(Number(data?.predictions?.fallRisk?.score) * 100) || 0} 
                      level={fallLevel} 
                      events={0}
                      subtext={fallLevel === 'High' ? "Gait irregularity detected" : "Stability within normal range"}
                  />
                </motion.div>
                <motion.div className="h-full" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <RiskCard 
                      type="respiratory" 
                      label="Respiratory / SpO2" 
                      score={Math.round(Number(data?.predictions?.respiratoryRisk?.score) * 100) || 0} 
                      level={respLevel} 
                      events={data?.aggregates?.spo2Events || 0}
                      subtext={(data?.aggregates?.spo2Events || 0) > 0 ? "SpO2 dips during sleep" : "Oxygen levels stable"}
                  />
                </motion.div>
            </motion.div>

            {/* 2. Trends / Charts */}
            <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[320px]">
                <div className="h-full">
                  <ActivityRing steps={data?.aggregates?.totalSteps || 0} goal={5000} />
                </div>
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                  <div className="h-[320px] lg:h-full bg-white rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-6">
                       <SparklineChart 
                          label="Heart Rate vs Steps (Last 24h)" 
                          data={heartRateData} 
                          dataKey="value" 
                          color="var(--primary)" 
                      />
                  </div>
                  <div className="h-[320px] lg:h-full bg-white rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-6">
                      <SparklineChart 
                          label="SpO2 Trend" 
                          data={spo2Data} 
                          dataKey="value" 
                          color="var(--primary)" 
                      />
                  </div>
                </div>
            </motion.div>

            {/* 3. Sleep Section */}
            <motion.div variants={item} className="w-full">
                <SleepTimeline data={data?.aggregates?.sleepBreakdown} />
            </motion.div>
            
             {/* 4. Data Table */}
            <motion.div variants={item}>
              <DataTable data={data} />
            </motion.div>

        </div>

        {/* RIGHT COLUMN - ALERTS + APPOINTMENTS */}
        <motion.div variants={item} className="col-span-12 lg:col-span-3">
          <div className="lg:sticky lg:top-24 space-y-6">
             <AlertPanel alerts={alerts} />
             <BookAppointment />
          </div>
        </motion.div>

      </motion.main>
    </div>
  );
}
