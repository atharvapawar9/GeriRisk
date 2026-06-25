"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Mail, CalendarCheck, X } from "lucide-react";

interface Doctor {
  name: string;
  specialty: string;
  bio: string;
  email: string;
}

const doctors: Doctor[] = [
  {
    name: "Dr. Alicia Hartwell",
    specialty: "General Practitioner",
    bio: "With over 15 years of experience in family medicine, Dr. Hartwell specializes in comprehensive geriatric care and preventative health strategies for elderly patients.",
    email: "a.hartwell@geririsk.com",
  },
  {
    name: "Dr. Maya Prasetyo",
    specialty: "Cardiologist",
    bio: "Board-certified cardiologist focused on age-related cardiovascular conditions. Dr. Prasetyo leads research in wearable-based cardiac monitoring for seniors.",
    email: "m.prasetyo@geririsk.com",
  },
  {
    name: "Dr. Ramon Silviano",
    specialty: "Pulmonologist",
    bio: "Specializing in respiratory disorders and sleep-related breathing conditions, Dr. Silviano works closely with patients on SpO2 management and COPD care.",
    email: "r.silviano@geririsk.com",
  },
  {
    name: "Dr. Ethan Kaldwin",
    specialty: "Neurologist",
    bio: "Expert in neurodegenerative conditions and cognitive decline in elderly patients. Dr. Kaldwin integrates wearable data to track neurological health indicators.",
    email: "e.kaldwin@geririsk.com",
  },
  {
    name: "Dr. Banaken Basoken",
    specialty: "General Practitioner",
    bio: "Focused on holistic primary care for aging populations, Dr. Basoken combines modern diagnostic tools with personalized treatment plans.",
    email: "b.basoken@geririsk.com",
  },
  {
    name: "Dr. Boakay Eddie Foday",
    specialty: "Pulmonologist",
    bio: "Dr. Foday is a pulmonary specialist with expertise in managing chronic respiratory conditions and optimizing oxygen therapy for older adults.",
    email: "b.foday@geririsk.com",
  },
  {
    name: "Dr. Serena Whitfield",
    specialty: "Cardiologist",
    bio: "Dr. Whitfield brings a decade of cardiac care experience, specializing in arrhythmia detection and heart failure prevention using AI-powered monitoring.",
    email: "s.whitfield@geririsk.com",
  },
];

// Deterministic hash so availability changes per doctor per date
function hashStatus(doctorIndex: number, date: Date): "Available" | "Full Book" {
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  const hash = ((seed * 31 + doctorIndex * 17) * 2654435761) >>> 0;
  return hash % 3 === 0 ? "Full Book" : "Available";
}

function getWeekDays(selectedDate: Date) {
  const day = selectedDate.getDay();
  const startOfWeek = new Date(selectedDate);
  startOfWeek.setDate(selectedDate.getDate() - day);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });
}

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function BookAppointment() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const weekDays = getWeekDays(selectedDate);

  const doctorStatuses = doctors.map((_, idx) => hashStatus(idx, selectedDate));

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date) => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-6 transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Calendar className="h-4 w-4 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground text-[15px]">Book Appointment</h3>
        </div>
      </div>

        {/* Week Calendar Strip */}
        <div className="grid grid-cols-7 gap-1 mb-6">
          {weekDays.map((date, idx) => {
            const selected = isSelected(date);
            const today = isToday(date);
            return (
              <button
                key={idx}
                onClick={() => setSelectedDate(new Date(date))}
                className="flex flex-col items-center gap-1 py-2 rounded-xl transition-all duration-200 group"
              >
                <span
                  className={`text-[11px] font-medium transition-colors ${
                    selected
                      ? "text-foreground"
                      : "text-muted-foreground group-hover:text-foreground/70"
                  }`}
                >
                  {dayLabels[idx]}
                </span>
                <span
                  className={`
                    w-9 h-9 flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200
                    ${
                      selected
                        ? "bg-gray-800 text-white shadow-md"
                        : today
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/70 group-hover:bg-gray-50"
                    }
                  `}
                >
                  {date.getDate()}
                </span>
              </button>
            );
          })}
        </div>

        {/* Doctors List */}
        <div className="space-y-1">
          <AnimatePresence>
            {doctors.map((doctor, idx) => {
              const status = doctorStatuses[idx];
              return (
                <motion.div
                  key={doctor.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  onClick={() => setSelectedDoctor(doctor)}
                  className="flex items-center gap-3 py-3 px-2 rounded-xl hover:bg-gray-50/80 transition-colors cursor-pointer group border-b border-gray-50 last:border-0"
                >
                  {/* Doctor Avatar */}
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-100 group-hover:ring-primary/20 transition-all">
                      <Image
                        src="/prfl.png"
                        alt={doctor.name}
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate leading-tight">
                      {doctor.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                      {doctor.specialty}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div className="shrink-0">
                    <motion.span
                      key={`${doctor.name}-${status}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25 }}
                      className={`
                        inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full
                        ${
                          status === "Available"
                            ? "text-emerald-600 bg-emerald-50"
                            : "text-orange-500 bg-orange-50"
                        }
                      `}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          status === "Available"
                            ? "bg-emerald-500"
                            : "bg-orange-400"
                        }`}
                      />
                      {status}
                    </motion.span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── Doctor Profile Modal ── */}
      <AnimatePresence>
        {selectedDoctor && (
          <motion.div
            className="fixed inset-0 z-100 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Blurred backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDoctor(null)}
            />

            {/* Card */}
            <motion.div
              className="relative z-10 bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-sm overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedDoctor(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors z-10"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Header gradient */}
              <div className="h-20 bg-linear-to-br from-primary/80 to-primary/40" />

              {/* Profile section */}
              <div className="px-6 pb-6 -mt-10">
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-white shadow-lg mb-4">
                  <Image
                    src="/prfl.png"
                    alt={selectedDoctor.name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Name & Specialty */}
                <h4 className="text-lg font-bold text-foreground leading-tight">
                  {selectedDoctor.name}
                </h4>
                <p className="text-sm text-primary font-medium mt-0.5">
                  {selectedDoctor.specialty}
                </p>

                {/* Bio */}
                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                  {selectedDoctor.bio}
                </p>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(selectedDoctor.email)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </a>
                  <a
                    href="https://cal.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors shadow-sm"
                  >
                    <CalendarCheck className="h-4 w-4" />
                    Schedule via Cal.com
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
