# GeriRisk – Week 4 Autonomous Frontend Implementation Specification

---

## PROJECT CONTEXT

**GeriRisk** is a medical SaaS application that processes wearable CSV data and produces:

- Aggregated physiological metrics
- ML-based risk predictions (Cardiac, Fall, Respiratory)

Weeks 1–3 (Backend + ML) are **fully complete and stable**.

This document defines **Week 4**, which is strictly focused on:

- Frontend
- UX
- Visualization
- User journey

---

## ABSOLUTE CONSTRAINTS (NON-NEGOTIABLE)

- Do NOT modify backend logic
- Do NOT modify `/api/process`
- Do NOT change ML models or Python code
- Do NOT change API response structure
- Do NOT introduce new backend endpoints
- Do NOT refactor Weeks 1–3 code

The backend must be treated as a **black-box service**.

---

## BACKEND API CONTRACT (LOCKED)

The endpoint `/api/process` returns the following JSON and **must be consumed exactly as-is**:

```json
{
  "file": "uploads/....csv",
  "recordCount": 7,
  "skipped": 0,
  "aggregates": {
    "avgHeartRate": number,
    "maxHeartRate": number,
    "minHeartRate": number,
    "minSpO2": number,
    "totalSteps": number,
    "recordCount": number
  },
  "predictions": {
    "cardiacRisk": { "score": number, "level": "High|Moderate|Low" },
    "fallRisk": { "score": number, "level": "High|Moderate|Low" },
    "respiratoryRisk": { "score": number, "level": "High|Moderate|Low" }
  }
}

WEEK 4 OBJECTIVE

Transform backend output into a calm, clinical, premium dashboard that:

Clearly communicates health risk

Avoids alarmist or “consumer app” UI

Matches a professional medical SaaS aesthetic

Is demo-ready and explainable to non-technical stakeholders

DESIGN ROLE & PHILOSOPHY

You are acting as a:

Lead UI/UX Designer specialized in Calm Technology and high-end Medical SaaS

BRAND & DESIGN SYSTEM (MANDATORY)
Brand Colors

Primary Brand: #0000c9

Accent: #a8bcff

Semantic Alert Colors (STRICT)

Low / Normal: Brand or Accent tones

Warning: Soft Amber (muted yellow)

Critical: Muted Crimson (non-neon red)

⚠️ Never use brand blue for critical alerts.

TYPOGRAPHY

Font: Inter or SF Pro

Bold → insights, key numbers

Light → labels, metadata

Avoid decorative fonts

LAYOUT PRINCIPLES

Desktop-first design

Grid-based Bento Box layout

Border radius: 8–12px

Soft, subtle shadows

No bubbly, rounded “mobile-app” visuals

Clean, clinical, precise

## Site Map

Level 1: Entry
- Login / Auth
- File Upload

Level 2: Processing
- File Validation
- Data Cleaning
- Risk Scoring

Level 3: Visualization
- Summary Dashboard
- Cardiac Analysis Detail
- Fall Risk Detail
- Sleep & Recovery Detail

REFERENCE DASHBOARD (MANDATORY)

A probable dashboard image has been provided separately.

Instructions:

Follow the layout, hierarchy, and sectioning of the image closely

Visual parity is more important than exact data accuracy

All sections shown in the image must be present:

Risk summary cards

Charts

Alerts

Timeline / trends

Action buttons

Do not simplify or omit sections.

SER JOURNEY (STEP-BY-STEP)
LEVEL 1 — ENTRY
Auth Screen

Create:

src/app/login/page.tsx


Design requirements:

Centered glassmorphism card

Neutral off-white background

Minimal login form

Mock authentication is acceptable

No backend auth logic

LEVEL 2 — PROCESSING
Upload Screen (Gateway)

Create:

src/app/upload/page.tsx


Design requirements:

Large drag-and-drop CSV upload zone

Subtle dashed border

Label: “Drop CSV to Analyze”

Thin progress bar with states:

Uploading

Analyzing Patterns

Complete ✔

Behavior:

Upload CSV

Call /api/process

Store response in frontend state

Redirect user to /dashboard

LEVEL 3 — VISUALIZATION
Dashboard Page

Create:

src/app/dashboard/page.tsx


Use a Bento Grid layout.

DASHBOARD STRUCTURE (MANDATORY)
TOP SECTION — Risk Status Cards

Create three cards:

Cardiac Risk

Fall Risk

Sleep / Respiratory Risk

Each card must show:

Large numeric percentage

Risk level text

Color-coded indicator:

Low → Brand / Accent

Moderate → Amber

High → Crimson

Data source:

predictions

MIDDLE SECTION — Trend Visualizations

Use sparklines / minimal charts:

Heart Rate trend (avg vs max)

SpO₂ trend

Rules:

No heavy axes

Minimal grid

Calm, non-alarmist visuals

Charts are indicative only

Data source:

aggregates

BOTTOM SECTION — Data Feed Table

Design requirements:

High row padding

Low-contrast borders

Clean typography

Columns:

Metric

Value

Status

ALERTS PANEL (RULE-BASED)

Alerts must be rule-based, not ML-based.

Examples:

cardiacRisk.level === "High" → Critical alert

minSpO2 < 92 → Warning alert

Rules:

Red = Critical

Amber = Warning

Avoid alert overload

PERSISTENT NAVIGATION

Top-right button: “New Upload”

Always visible

Non-intrusive

Does not distract from data

FILE & FOLDER STRUCTURE (EXPLICIT)

You are allowed to create frontend-only files:

src/
 ├─ app/
 │   ├─ login/
 │   │   └─ page.tsx
 │   ├─ upload/
 │   │   └─ page.tsx
 │   └─ dashboard/
 │       └─ page.tsx
 ├─ components/
 │   ├─ RiskCard.tsx
 │   ├─ AlertPanel.tsx
 │   ├─ SparklineChart.tsx
 │   └─ DataTable.tsx
 ├─ lib/
 │   └─ api.ts
 └─ styles/
     └─ dashboard.css (optional)


You must NOT modify:

src/app/api/*
ml/*

TECH STACK RULES

React + Next.js (App Router)

Tailwind CSS allowed

Use reusable components

Clean, readable code

All data must come from /api/process

QUALITY BAR

The final output must:

Look premium and clinical

Match the provided dashboard reference image

Be demo-ready

Be explainable to non-technical stakeholders

Preserve backend integrity

DELIVERY EXPECTATIONS

Implement step-by-step

Do not skip stages

Ask before altering assumptions

Prioritize clarity over complexity
```
