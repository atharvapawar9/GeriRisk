import { ProcessResponse } from "./api";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Alert {
  time: string;
  category: string;
  message: string;
  level: "Critical" | "Warning" | "Info";
}

type RiskType = "cardiac" | "fall" | "respiratory";

// ─── Clinical Thresholds (Geriatric Context) ─────────────────────────────────

const THRESHOLDS = {
  avgHR:       { moderate: 80,  high: 100 },
  maxHR:       { moderate: 110, high: 130 },
  minHR:       { low: 50 },
  minSpO2:     { moderate: 95,  critical: 92 },
  totalSteps:  { veryLow: 500,  low: 2000 },
  cardiacEvents: { moderate: 1, high: 4 },
  spo2Events:  { moderate: 1,   high: 3 },
} as const;

// ─── Alert Panel Alerts ──────────────────────────────────────────────────────

export function generateAlerts(data: ProcessResponse): Alert[] {
  const alerts: Alert[] = [];
  const agg = data.aggregates;
  const pred = data.predictions;

  // ── Cardiac Alerts ──
  const avgHR = Math.round(agg.avgHeartRate || 0);
  const maxHR = Math.round(agg.maxHeartRate || 0);
  const cardiacEvents = agg.cardiacEvents || 0;
  const cardiacScore = pred.cardiacRisk?.score ?? 0;
  const cardiacLevel = pred.cardiacRisk?.level ?? "Low";

  if (cardiacLevel === "High") {
    const parts: string[] = [];
    if (avgHR > THRESHOLDS.avgHR.high) parts.push(`avg HR ${avgHR} bpm exceeds safe range`);
    if (maxHR > THRESHOLDS.maxHR.high) parts.push(`peak HR reached ${maxHR} bpm`);
    if (cardiacEvents >= THRESHOLDS.cardiacEvents.high) parts.push(`${cardiacEvents} cardiac events logged`);

    alerts.push({
      time: "Ongoing",
      category: "Cardiac",
      message: parts.length > 0
        ? `High cardiac risk (${Math.round(cardiacScore * 100)}%): ${parts.join("; ")}.`
        : `High cardiac risk detected (${Math.round(cardiacScore * 100)}% score) with ${cardiacEvents} event${cardiacEvents !== 1 ? "s" : ""}.`,
      level: "Critical",
    });
  } else if (cardiacLevel === "Moderate" || cardiacEvents >= THRESHOLDS.cardiacEvents.moderate) {
    alerts.push({
      time: "Monitoring",
      category: "Cardiac",
      message: `Moderate cardiac risk (${Math.round(cardiacScore * 100)}%): avg HR ${avgHR} bpm with ${cardiacEvents} event${cardiacEvents !== 1 ? "s" : ""}.`,
      level: "Warning",
    });
  }

  // ── SpO2 / Respiratory Alerts ──
  const minSpO2 = Math.round(agg.minSpO2 || 0);
  const spo2Events = agg.spo2Events || 0;
  const respScore = pred.respiratoryRisk?.score ?? 0;
  const respLevel = pred.respiratoryRisk?.level ?? "Low";

  if (minSpO2 < THRESHOLDS.minSpO2.critical) {
    alerts.push({
      time: "During Sleep",
      category: "SpO2",
      message: `Critical SpO2 drop to ${minSpO2}% — well below the 92% safety threshold. ${spo2Events} desaturation event${spo2Events !== 1 ? "s" : ""} recorded.`,
      level: "Critical",
    });
  } else if (minSpO2 < THRESHOLDS.minSpO2.moderate || respLevel === "High") {
    alerts.push({
      time: "During Sleep",
      category: "SpO2",
      message: `SpO2 dipped to ${minSpO2}% (${Math.round(respScore * 100)}% respiratory risk). ${spo2Events} event${spo2Events !== 1 ? "s" : ""} detected.`,
      level: respLevel === "High" ? "Critical" : "Warning",
    });
  } else if (respLevel === "Moderate" || spo2Events >= THRESHOLDS.spo2Events.moderate) {
    alerts.push({
      time: "Monitoring",
      category: "SpO2",
      message: `Respiratory risk at ${Math.round(respScore * 100)}% — min SpO2 ${minSpO2}% with ${spo2Events} minor event${spo2Events !== 1 ? "s" : ""}.`,
      level: "Warning",
    });
  }

  // ── Fall Risk Alerts ──
  const totalSteps = Math.round(agg.totalSteps || 0);
  const fallScore = pred.fallRisk?.score ?? 0;
  const fallLevel = pred.fallRisk?.level ?? "Low";

  if (fallLevel === "High") {
    const details: string[] = [];
    if (totalSteps < THRESHOLDS.totalSteps.veryLow) details.push(`very low activity (${totalSteps} steps)`);
    else if (totalSteps < THRESHOLDS.totalSteps.low) details.push(`reduced mobility (${totalSteps} steps)`);

    alerts.push({
      time: "Ongoing",
      category: "Fall Risk",
      message: details.length > 0
        ? `High fall risk (${Math.round(fallScore * 100)}%): ${details.join("; ")}. Gait assessment recommended.`
        : `High fall risk detected at ${Math.round(fallScore * 100)}%. Preventive measures recommended.`,
      level: "Critical",
    });
  } else if (fallLevel === "Moderate") {
    alerts.push({
      time: "Monitoring",
      category: "Fall Risk",
      message: `Moderate fall risk (${Math.round(fallScore * 100)}%) — ${totalSteps} steps recorded. Monitor mobility patterns.`,
      level: "Warning",
    });
  }

  return alerts;
}

// ─── RiskCard Subtexts ───────────────────────────────────────────────────────

export function generateSubtext(type: RiskType, data: ProcessResponse): string {
  const agg = data.aggregates;
  const pred = data.predictions;

  switch (type) {
    case "cardiac": {
      const avgHR = Math.round(agg.avgHeartRate || 0);
      const events = agg.cardiacEvents || 0;
      const level = pred.cardiacRisk?.level ?? "Low";

      if (level === "High") {
        return `Avg HR ${avgHR} bpm · ${events} event${events !== 1 ? "s" : ""} detected`;
      }
      if (level === "Moderate") {
        return events > 0
          ? `Avg HR ${avgHR} bpm · ${events} minor event${events !== 1 ? "s" : ""}`
          : `Avg HR ${avgHR} bpm · Elevated patterns noted`;
      }
      return events > 0
        ? `Avg HR ${avgHR} bpm · ${events} event${events !== 1 ? "s" : ""} (within range)`
        : `Avg HR ${avgHR} bpm · No events`;
    }

    case "fall": {
      const steps = Math.round(agg.totalSteps || 0);
      const level = pred.fallRisk?.level ?? "Low";

      if (level === "High") {
        return steps < THRESHOLDS.totalSteps.veryLow
          ? `Very low activity (${steps} steps) · Gait concern`
          : `${steps} steps · Gait irregularity detected`;
      }
      if (level === "Moderate") {
        return `${steps} steps · Mild gait variation observed`;
      }
      return `${steps} steps · Stability within normal range`;
    }

    case "respiratory": {
      const minSpO2 = Math.round(agg.minSpO2 || 0);
      const events = agg.spo2Events || 0;
      const level = pred.respiratoryRisk?.level ?? "Low";

      if (level === "High") {
        return `Min SpO2 ${minSpO2}% · ${events} desaturation event${events !== 1 ? "s" : ""}`;
      }
      if (level === "Moderate") {
        return events > 0
          ? `Min SpO2 ${minSpO2}% · ${events} dip${events !== 1 ? "s" : ""} noted`
          : `Min SpO2 ${minSpO2}% · Borderline oxygen levels`;
      }
      return events > 0
        ? `Min SpO2 ${minSpO2}% · ${events} minor dip${events !== 1 ? "s" : ""}`
        : `Min SpO2 ${minSpO2}% · Oxygen levels stable`;
    }

    default:
      return "";
  }
}
