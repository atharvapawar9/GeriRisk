"use client";

import React, { useMemo } from "react";
import type { SleepSession } from "@/lib/features";

// ─── Types ───────────────────────────────────────────────────────────────────

interface SleepTimelineProps {
  sessions?: SleepSession[];
}

// ─── Constants ───────────────────────────────────────────────────────────────

const STAGE_CONFIG: Record<
  string,
  { color: string; label: string; y: number; height: number }
> = {
  Awake: { color: "#F59E0B", label: "Awake", y: 0,  height: 10 },
  REM:   { color: "#38BDF8", label: "REM",   y: 10, height: 12 },
  Light: { color: "#60A5FA", label: "Light", y: 22, height: 14 },
  Deep:  { color: "#1D4ED8", label: "Deep",  y: 36, height: 16 },
};

const LEGEND_ORDER = ["Awake", "REM", "Light", "Deep"];
const SVG_W = 620;
const SVG_H = 52;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmtDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function buildTimeTicks(
  totalMin: number,
  bedtime: string
): { label: string; pct: number }[] {
  // Generate ~5 evenly-spaced time labels across the session
  const [startH, startM] = bedtime.split(":").map(Number);
  const startTotalMin = startH * 60 + startM;
  const count = 5;
  const step = totalMin / (count - 1);

  return Array.from({ length: count }, (_, i) => {
    const offsetMin = Math.round(i * step);
    const absMin = (startTotalMin + offsetMin) % (24 * 60);
    const h = Math.floor(absMin / 60).toString().padStart(2, "0");
    const m = (absMin % 60).toString().padStart(2, "0");
    return { label: `${h}:${m}`, pct: (offsetMin / totalMin) * 100 };
  });
}

// ─── Single session chart ─────────────────────────────────────────────────────

function SessionChart({ session }: { session: SleepSession }) {
  const ticks = useMemo(
    () => buildTimeTicks(session.totalMinutes, session.bedtime),
    [session.totalMinutes, session.bedtime]
  );

  return (
    <div className="mb-4 last:mb-0">
      {/* Session header */}
      <div className="flex items-baseline justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground font-mono">
            {session.bedtime} → {session.wakeTime}
          </span>
        </div>
        <span className="text-sm font-medium text-foreground">
          {fmtDuration(session.totalMinutes)}
        </span>
      </div>

      {/* SVG timeline */}
      <svg
        width="100%"
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        preserveAspectRatio="none"
        style={{ display: "block", overflow: "visible" }}
        aria-label={`Sleep timeline for ${session.date}`}
      >
        {/* Subtle horizontal gridlines for each stage lane */}
        {LEGEND_ORDER.map((stage) => {
          const cfg = STAGE_CONFIG[stage];
          const midY = cfg.y + cfg.height / 2;
          return (
            <line
              key={`grid-${stage}`}
              x1={0}
              y1={midY}
              x2={SVG_W}
              y2={midY}
              stroke="#e5e7eb"
              strokeWidth={0.5}
              strokeDasharray="4 3"
              opacity={0.7}
            />
          );
        })}
        {session.segments.map((seg, i) => {
          const cfg = STAGE_CONFIG[seg.stage];
          if (!cfg) return null;
          const next = session.segments[i + 1];
          const x = (seg.start_min / session.totalMinutes) * SVG_W;
          const endMin = next ? next.start_min : session.totalMinutes;
          const w = Math.max(
            ((endMin - seg.start_min) / session.totalMinutes) * SVG_W,
            1.5
          );

          // Connector line at stage transition
          const nextCfg = next ? STAGE_CONFIG[next.stage] : null;
          const showConnector = next && nextCfg && next.stage !== seg.stage;
          const connectorX = x + w;
          const y1 = showConnector
            ? cfg.y + cfg.height / 2
            : 0;
          const y2 = showConnector && nextCfg
            ? nextCfg.y + nextCfg.height / 2
            : 0;

          return (
            <g key={i}>
              <rect
                x={x}
                y={cfg.y}
                width={w}
                height={cfg.height}
                rx={1}
                fill={cfg.color}
                opacity={seg.stage === "Awake" ? 0.8 : 1}
              >
                <title>
                  {cfg.label}: {seg.start_ts}–{seg.end_ts}
                </title>
              </rect>
              {showConnector && (
                <line
                  x1={connectorX}
                  y1={y1}
                  x2={connectorX}
                  y2={y2}
                  stroke="#94A3B8"
                  strokeWidth={1}
                  strokeDasharray="2,2"
                  opacity={0.5}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Time axis */}
      <div className="flex justify-between mt-1">
        {ticks.map((t) => (
          <span key={t.label} className="text-[10px] text-muted-foreground font-mono">
            {t.label}
          </span>
        ))}
      </div>

      {/* Per-session stage durations */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
        {LEGEND_ORDER.map((stage) => {
          const pct = session.breakdown[stage.toLowerCase()];
          if (!pct) return null;
          const cfg = STAGE_CONFIG[stage];
          const mins = Math.round((pct / 100) * session.totalMinutes);
          return (
            <div key={stage} className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: cfg.color }}
              />
              <span className="text-xs text-muted-foreground">
                {cfg.label}{" "}
                <span className="font-medium text-foreground">
                  {fmtDuration(mins)}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function SleepTimeline({ sessions }: SleepTimelineProps) {
  // Empty state — matches existing card dimensions so bento grid doesn't shift
  if (!sessions || sessions.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-6 min-h-[160px] flex items-center justify-center">
        <p className="text-muted-foreground text-sm font-medium">
          No sleep data available for this timeframe.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-6">
      {/* Card header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-foreground">Sleep Timeline</h3>
        <div className="flex items-center gap-3">
          {LEGEND_ORDER.map((stage) => (
            <div key={stage} className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: STAGE_CONFIG[stage].color }}
              />
              <span className="text-xs text-muted-foreground">
                {STAGE_CONFIG[stage].label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* One chart per session */}
      <div className="divide-y divide-gray-100">
        {sessions.map((session, i) => (
          <div key={i} className={i > 0 ? "pt-4" : ""}>
            <SessionChart session={session} />
          </div>
        ))}
      </div>
    </div>
  );
}
