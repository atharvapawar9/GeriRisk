# GeriRisk Project Explanation

## Presentation Opening

Good morning everyone. Today I am presenting **GeriRisk**, an AI-powered elderly health risk monitoring platform designed to transform raw wearable health data into early, actionable clinical insight.

The core idea behind GeriRisk is simple but powerful: elderly patients already generate valuable health signals every day through wearable devices, but those signals are often trapped inside CSV exports, scattered dashboards, or passive fitness apps. GeriRisk takes that data, processes it through a structured analytics pipeline, applies machine learning models, and presents the result as a clear risk dashboard for caregivers, clinicians, and senior care teams.

Our system focuses on three high-impact health risk areas for older adults: **cardiac stress**, **fall likelihood**, and **respiratory irregularity**. These are not random categories. They represent some of the most urgent and costly health challenges in geriatric care. A sudden cardiac event, a preventable fall, or an overnight oxygen desaturation episode can quickly escalate into hospitalization. GeriRisk is built to identify these warning patterns earlier, before the situation becomes an emergency.

## The Problem We Are Facing

The elderly care ecosystem is under increasing pressure. Populations are aging, hospitals are overloaded, families are geographically distributed, and caregivers are expected to make fast decisions with incomplete information. In many cases, healthcare still operates reactively. A patient feels unwell, a symptom becomes severe, a fall occurs, or a breathing issue becomes obvious only after the patient is already in distress. By the time action is taken, the risk has already converted into an incident.

This is the central problem GeriRisk is built around: in elderly care, the most dangerous events often do not begin as sudden emergencies. They begin as small changes in daily patterns. A slightly elevated resting heart rate, a lower oxygen reading during sleep, a reduction in steps, or fragmented sleep may not look urgent in isolation. But when these signals appear together, they can indicate that the patient is moving toward a higher-risk state. Traditional care systems often miss these early signals because they are not designed to continuously connect weak patterns across time.

For elderly patients, this delay matters. A fall may lead to fractures, loss of mobility, fear of walking, and long-term decline. Cardiac stress may become visible only after a serious episode. Respiratory irregularities during sleep may go unnoticed until fatigue, breathlessness, or hospitalization occurs. These are not only medical problems; they are operational and economic problems. Every late intervention increases stress on families, burden on caregivers, and cost for the healthcare system.

At the same time, wearable devices have become common. Smartwatches, fitness bands, and medical wearables can continuously capture heart rate, blood oxygen saturation, sleep stages, movement, and step count. These signals are extremely valuable because they describe how the patient is behaving and recovering in real life, not only during a short clinic visit. However, the existence of data does not automatically create better care. The problem is that most wearable data is noisy, fragmented, and difficult to interpret clinically.

For example, a caregiver may see a long CSV file containing thousands of timestamped records. That file may include heart rate values, SpO2 readings, steps, sleep phases, and timestamps, but the caregiver still has to answer the real question: is this patient safe today? Are they trending toward cardiac stress? Did their oxygen level drop during sleep? Is reduced movement indicating a fall risk? Raw data by itself does not answer those questions. It needs preprocessing, feature extraction, prediction, and clear visualization.

Another problem is alert fatigue and dashboard fatigue. Many systems show graphs, but they do not tell the user what the graph means. A heart rate chart may look impressive, but if the caregiver does not know whether the pattern is safe, concerning, or urgent, the chart has limited value. In healthcare, especially elderly care, insight must be prioritized. Users do not need more raw numbers; they need the system to identify which numbers matter, why they matter, and what level of attention they require.

Clinical teams also often lack a single operating view. Heart data may live in one app, sleep data in another, activity data somewhere else, and appointment scheduling in a completely separate workflow. This creates friction. If a risk is detected but the next step is unclear, the system has failed at the moment where intervention matters most.

The final challenge is accessibility. Many advanced healthcare analytics systems are expensive, complex, and designed for institutional environments. Senior care homes, small clinics, family caregivers, and early-stage remote patient monitoring programs need something more lightweight. They need a system that can accept common wearable exports, analyze them quickly, and communicate risk in a way that is understandable without requiring a data science team.

## The Problem We Are Solving

GeriRisk solves the gap between **raw wearable data** and **actionable geriatric care decisions**.

Instead of asking caregivers to manually inspect CSV files or interpret isolated charts, GeriRisk provides an end-to-end pipeline. A user uploads a wearable CSV file. The application parses the file, cleans the data, normalizes the column names, computes medically relevant aggregates, extracts trends, runs machine learning models, generates risk scores, creates contextual alerts, and finally displays everything in a structured clinical dashboard.

The key difference is that GeriRisk does not stop at monitoring. Monitoring tells us what has already happened. Prediction helps us understand what may happen next. That shift from observation to prediction is the core USP of the project. We are not simply building another health dashboard. We are building a preventive decision-support system that turns everyday wearable signals into early warnings for cardiac stress, fall risk, and respiratory risk.

This matters because elderly care is a timing problem. If caregivers discover risk only after an event, the opportunity for prevention has already been lost. If the system can detect that a patient is trending toward moderate or high risk earlier, the care team can intervene sooner. That intervention might be as simple as scheduling a check-up, reviewing medication, increasing supervision, checking oxygen levels, adjusting activity plans, or contacting a specialist. The value of prediction is that it creates time. It gives families and clinicians a window to act before the situation escalates.

The platform answers four critical questions:

1. **What is happening with the patient right now?**

   The dashboard shows key vitals such as average heart rate, minimum SpO2, total steps, and cardiac event count. These are displayed immediately at the top of the interface so the audience can understand the patient's current condition at a glance.

2. **What risks are emerging from the data?**

   GeriRisk predicts cardiac risk, fall risk, and respiratory risk. Each prediction is converted into a score and a human-readable level: Low, Moderate, or High. This makes the output easier to interpret than a raw machine learning probability.

3. **Why is the system raising concern?**

   The alert engine does not simply say "risk detected." It explains the contributing factors. For example, it can report that average heart rate is elevated, peak heart rate crossed a threshold, SpO2 dropped during sleep, or activity was unusually low.

4. **What should happen next?**

   The system includes an appointment booking component. This connects insight with action by giving caregivers and clinicians a path to follow up with specialists such as cardiologists, pulmonologists, neurologists, and general practitioners.

In short, GeriRisk is solving the operational challenge of turning continuous elderly health data into early warning, triage support, and faster care coordination.

## Why Prediction Is the USP

The strongest unique selling point of GeriRisk is prediction. Many healthcare tools are descriptive. They show what the heart rate was, how many steps were taken, or what the oxygen level looked like. That is useful, but it is not enough. The real opportunity is to move from descriptive analytics to predictive intelligence.

Prediction is important because elderly health decline is often gradual before it becomes visible. A patient may not complain immediately. A caregiver may not observe the issue during a short visit. A clinician may only see the patient after symptoms become severe. Wearable data can fill that gap, but only if the system can interpret it intelligently. GeriRisk uses machine learning models to evaluate combinations of signals rather than relying on a single metric in isolation.

For example, a slightly elevated average heart rate may not be alarming by itself. But if it appears together with high peak heart rate, reduced activity, lower SpO2, and repeated event counts, the overall pattern may suggest increased cardiac stress. Similarly, low steps alone may simply mean the patient had a quiet day, but low activity combined with age-related health patterns and abnormal vitals can indicate fall vulnerability. A single SpO2 reading may be dismissed as noise, but repeated oxygen dips during sleep can point toward respiratory concern.

This is where prediction creates business and clinical value. It reduces the burden on humans to manually connect every pattern. It gives the user a risk score and severity level. It makes the data actionable. Most importantly, it supports preventive care, which is far more valuable than reactive care. Preventing one fall, one hospitalization, or one delayed respiratory intervention can have enormous human and financial impact.

GeriRisk's prediction layer is also explainable at the product level. The system does not only return a model score. It translates the score into Low, Moderate, or High risk and then uses the alert engine to explain why the score matters. This is critical for trust. A caregiver or clinician is more likely to act on a prediction when the dashboard also shows the contributing signals, such as elevated heart rate, oxygen dips, low activity, or multiple cardiac events.

That combination of **prediction plus explanation plus action** is the USP. GeriRisk predicts risk, explains the reason behind the warning, and connects the user to follow-up through the appointment component. This creates a complete care loop rather than a passive reporting tool.

## Data Storage and Security Through Supabase

Because GeriRisk works with health-related wearable files, data handling is a major part of the product story. The project uses Supabase to create a more professional backend foundation for storing uploaded files and tracking them with structured metadata.

When a user uploads a CSV, the file does not simply remain inside the browser. The frontend sends it to the backend, and the backend attempts to place it into Supabase Storage. Supabase Storage acts like a managed file storage system where uploaded CSVs can be organized inside buckets. In this project, the bucket is named `wearable-uploads`, and files are stored under generated `uploads/` paths so each file receives a unique location.

At the same time, the project records file metadata in a Supabase database table called `uploads`. This table can store the original file name and the file path in storage. The reason this matters is that production systems need more than raw files. They need traceability. They need to know when a file was uploaded, which user or patient it belongs to, whether it was processed successfully, and which prediction result came from which dataset. Supabase gives GeriRisk the foundation to build that traceable data lifecycle.

This is industry-level architecture because it follows the same separation used in scalable software systems: object storage for files, relational database tables for metadata, backend APIs for controlled processing, and policy-based access control for security. Rather than keeping sensitive patient files scattered on local machines or inside temporary browser state, GeriRisk moves toward centralized, governed storage.

Supabase also enhances the security direction of the project. In a production setup, Supabase authentication can identify the user, database row-level security can restrict which records each user can access, and storage policies can control who can read or write files in the bucket. This means the platform can evolve toward role-based access: caregivers see assigned patients, doctors see clinical cases relevant to them, and administrators manage the system without exposing unnecessary patient data.

For a VC audience, this is important because it shows that GeriRisk is not only an AI model wrapped in a dashboard. It is being structured like a real health technology platform. Prediction is the intelligence layer, but Supabase is part of the trust layer. It supports persistence, access control, auditability, and future scalability.

## Project Vision

The long-term vision of GeriRisk is to become a decision-support layer for elderly care. It is not positioned as a replacement for doctors, and it is not presented as a diagnostic medical device. Instead, it acts as an intelligent monitoring assistant that helps care teams notice patterns sooner.

For a VC audience, the larger opportunity is clear. Remote patient monitoring is growing, aging populations are increasing, and healthcare systems are looking for ways to reduce avoidable hospitalizations. A product like GeriRisk sits at the intersection of three strong trends: wearable adoption, AI-assisted healthcare analytics, and preventive geriatric care.

The platform can start with CSV uploads, which makes it easy to demonstrate and deploy, and later evolve toward direct wearable API integrations, patient history tracking, clinician workflows, caregiver notifications, and enterprise dashboards for senior living facilities.

## High-Level System Overview

GeriRisk is built as a full-stack application with a modern web frontend, server-side processing routes, Supabase storage, and a Python machine learning inference module.

At a high level, the system works like this:

1. The user opens the GeriRisk web application.
2. The user uploads a wearable health CSV file.
3. The frontend sends the file to the `/api/upload` endpoint.
4. The backend optionally stores the uploaded CSV in Supabase Storage and records metadata in a Supabase table.
5. The backend parses the CSV using PapaParse.
6. The preprocessing layer removes null values, trims strings, and normalizes column names.
7. The feature engineering layer calculates aggregates such as average heart rate, maximum heart rate, minimum heart rate, minimum SpO2, total steps, cardiac events, SpO2 events, sleep breakdown, and time-series trends.
8. The Next.js backend spawns the Python prediction script.
9. The Python script loads pre-trained scikit-learn models and scalers using Joblib.
10. The models produce risk probabilities for cardiac, fall, and respiratory categories.
11. Each probability is converted into a Low, Moderate, or High risk level.
12. The frontend stores the response in local storage and redirects the user to the dashboard.
13. The dashboard visualizes risk scores, metrics, charts, sleep sessions, alerts, and appointment options.

This gives GeriRisk a clean product story: **upload, analyze, predict, explain, act**.

## Technology Stack Explanation

### Next.js 16

Next.js is the main application framework. It gives the project both frontend pages and backend API routes inside one codebase. This is important because GeriRisk is not only a static dashboard. It needs a user interface for uploads, API endpoints for file processing, server-side execution for Python inference, and routing between pages like home, login, upload, and dashboard.

The project uses the Next.js App Router structure under `geririsk-ai/src/app`. This keeps pages organized by route. For example, the landing page lives in `src/app/page.tsx`, the upload page lives in `src/app/upload/page.tsx`, the dashboard lives in `src/app/dashboard/page.tsx`, and server APIs live under `src/app/api`.

Next.js is a strong choice here because it allows the product to feel like a polished SaaS application while still giving the backend enough power to handle health data processing.

### React 19

React powers the interactive interface. Components such as the risk cards, metric cards, alert panel, upload module, appointment scheduler, charts, and sleep timeline are all built as reusable React components.

This component-based structure is important because the dashboard contains multiple different views of the same patient data. Instead of writing one large page, the project separates responsibilities. A `RiskCard` knows how to display a risk level. A `MetricCard` knows how to display a vital sign. `AlertPanel` knows how to list generated warnings. `BookAppointment` knows how to show doctors and availability. This makes the code easier to maintain and makes the product easier to expand later.

### TypeScript

TypeScript adds type safety to the application. This matters especially in GeriRisk because the data being passed around has a meaningful structure. The API response includes file information, record counts, aggregates, predictions, and trends. The `ProcessResponse` interface in `src/lib/api.ts` defines that structure.

By typing the response, the frontend can safely access fields like `predictions.cardiacRisk.score`, `aggregates.minSpO2`, and `trends.heartRate`. This reduces the chance of runtime mistakes and makes the project easier to present as a serious engineering effort.

### Tailwind CSS

Tailwind CSS is used for styling. It allows the application to use utility classes directly in components, which helps build a clean dashboard quickly. The visual direction is modern, minimal, and healthcare-oriented, using white cards, subtle shadows, soft borders, and a strong primary brand color.

For this project, Tailwind is not just cosmetic. It supports the usability of the system. Elderly care dashboards must be easy to scan. Important information should be visually separated. Risk states should stand out. The use of cards, spacing, color, and typography helps the audience understand which numbers matter most.

### Framer Motion

Framer Motion provides smooth animations. It is used on the landing page, upload page, dashboard header, dashboard cards, and appointment modal. These animations make the product feel polished and investor-ready. More importantly, they guide attention. For example, upload states animate while processing, dashboard elements appear smoothly, and interactions like opening doctor profiles feel responsive.

### Recharts

Recharts is used for data visualization, especially the sparkline-style area charts. In GeriRisk, charts are used to show heart rate trends and SpO2 trends. These charts help convert time-series data into a visual pattern.

For a clinician or caregiver, a trend often communicates more than a single value. A minimum SpO2 value is useful, but seeing a drop over time tells a stronger story. The chart components support that pattern recognition.

### Lucide React

Lucide React provides the icon system. Icons are used throughout the application to visually distinguish cardiac risk, fall risk, respiratory risk, upload actions, calendar interactions, activity, heart rate, steps, and alerts. This improves dashboard scanability.

### PapaParse

PapaParse is used to parse CSV data. Since the project begins with wearable exports, CSV parsing is a core capability. PapaParse reads the uploaded CSV string and converts it into structured JavaScript objects. The project uses header parsing, dynamic typing, and empty-line skipping so values like heart rate and steps can become numbers instead of remaining plain strings.

### Supabase

Supabase is used as the cloud data persistence layer for GeriRisk. In the current project, when a user uploads a wearable CSV file, the backend creates a unique file path and attempts to store the file inside a Supabase Storage bucket named `wearable-uploads`. After the file is stored, the system inserts a metadata record into an `uploads` database table. That metadata includes information such as the original file name and the storage path where the uploaded CSV is located.

This separation between file storage and metadata is important. The uploaded CSV itself is treated as a file object and stored in Supabase Storage. The database does not need to hold the entire file contents. Instead, the database stores a reference to the file, which is a more scalable and maintainable architecture. In a production healthcare system, this pattern can later support patient IDs, upload history, clinician ownership, timestamps, processing status, audit trails, and links between uploaded files and prediction results.

Supabase is an industry-level backend technology because it is built around managed PostgreSQL, storage, authentication, access policies, and API generation. PostgreSQL is a mature relational database used widely in production systems. By using Supabase, GeriRisk avoids building a fragile custom file server and database layer from scratch. Instead, the project uses a managed backend foundation that can scale into a real product architecture.

From a security perspective, Supabase strengthens the project in several ways. First, uploaded files are not casually stored inside the frontend or exposed as plain local files. They are sent through a backend API route and stored in a controlled storage bucket. Second, Supabase supports access-control rules and storage policies, which means production versions of GeriRisk can restrict who can upload, read, or delete patient files. Third, Supabase integrates with authentication, allowing future versions to separate patients, caregivers, doctors, and administrators into different permission levels. Fourth, because metadata lives in a structured database table, the system can maintain traceability: who uploaded a file, when it was uploaded, where it is stored, and how it was processed.

This is especially important for a healthcare-oriented product because wearable health files may contain sensitive patient information. A simple demo could process a file locally and then lose all history. GeriRisk is designed with a stronger path: files can be centrally stored, metadata can be tracked, and access can be governed through backend policies. That makes the architecture more credible for clinics, senior care facilities, and enterprise deployments.

The upload route is also designed gracefully. If Supabase is unreachable, the system logs a warning and continues processing the file locally. This is helpful for development and demos because the prediction flow can still work even if the cloud storage layer is not configured. In production, the same architecture can be tightened so that storage, authentication, and access policies are mandatory before patient data is accepted.

### Python

Python is used for machine learning inference. The file `geririsk-ai/ml/predict.py` loads serialized models and scalers, receives aggregate features through standard input, runs predictions, and returns JSON.

This separation is practical. The web application is written in TypeScript and React, while the machine learning ecosystem is strongest in Python. By letting Next.js handle the application and Python handle inference, GeriRisk uses the right tool for each job.

### scikit-learn, NumPy, and Joblib

The project uses scikit-learn models saved as `.pkl` files. Joblib loads these models and their corresponding scalers from the `ml/models` directory. NumPy is used to create the feature arrays that are passed into the models.

There are three separate prediction pipelines:

1. Cardiac risk model and cardiac scaler.
2. Fall risk model and fall scaler.
3. Respiratory risk model and respiratory scaler.

This modular setup is important because each risk category depends on different features. Cardiac risk uses heart rate, oxygen saturation, activity, and record count. Fall risk focuses more on activity and record density. Respiratory risk focuses on SpO2, heart rate, and record count.

## Detailed Component Explanation

### Landing Page

The landing page is the first product-facing experience. It introduces GeriRisk as an AI-powered health monitoring system for elderly patients. It communicates the core value proposition: predicting vital risks before they happen.

The landing page includes several sections:

- A fixed navigation bar with branding and sign-in access.
- A hero section that positions the product around early risk prediction.
- A dashboard preview image that visually proves the product exists.
- A trust strip highlighting AI analytics, precise monitoring, clinical insights, and secure data.
- A product overview explaining real-time cardiac monitoring, AI risk scoring, anomaly detection, and long-term tracking.
- A features section covering cardiac risk prediction, wearable data analysis, SpO2 monitoring, heart rate trends, appointment booking, and patient dashboard.
- A "How It Works" section that explains the three-step flow: upload wearable data, analyze health signals, and receive risk prediction.
- FAQ content that clarifies data requirements, medical positioning, prediction accuracy, and data security.

From a presentation perspective, the landing page frames GeriRisk as a complete product, not just an algorithm. It tells investors and users what the system does, who it helps, and why it matters.

### Upload Page

The upload page is where the analytical workflow begins. It is designed as a focused data import screen. The user selects a CSV file, sees the chosen file name, clicks "Analyze Data," and receives status feedback while the system processes the file.

The upload page manages three main pieces of state:

- `file`, which stores the selected CSV file.
- `status`, which tracks whether the system is idle, uploading, successful, or in error.
- `fileInputRef`, which allows the custom upload area to open the hidden file input.

When the user clicks the analysis button, the page calls `processFile(file)` from `src/lib/api.ts`. If the request succeeds, the API response is saved in `localStorage` under `dashboard_data`, and the filename is saved under `dashboard_filename`. The app then redirects to `/dashboard`.

This design keeps the user experience simple. The user does not need to understand the backend pipeline. They only need to upload a file and wait for the dashboard.

### API Helper Layer

The file `src/lib/api.ts` defines the client-side contract for communicating with the backend. The most important function is `processFile(file)`.

This function creates a `FormData` object, attaches the CSV file under the key `file`, and sends a POST request to `/api/upload`. If the backend returns an error, the function throws an exception. If the backend succeeds, the function returns the parsed JSON response.

The same file defines the `ProcessResponse` interface. This interface describes exactly what the dashboard expects:

- `file`: the uploaded file path.
- `recordCount`: how many records were processed.
- `skipped`: how many records were skipped during preprocessing.
- `aggregates`: patient-level summary metrics.
- `predictions`: risk outputs for cardiac, fall, and respiratory categories.
- `trends`: time-series data for heart rate and SpO2 charts.

This layer is small, but strategically important because it creates a clean boundary between the UI and backend.

### Upload API Route

The `/api/upload` route is the main processing endpoint. It runs in the Node.js runtime because it needs access to server-side APIs and child process execution.

The route performs the following work:

1. Reads the incoming `FormData`.
2. Extracts the uploaded file.
3. Validates that a file exists.
4. Validates that the file name ends with `.csv`.
5. Converts the uploaded file into a byte buffer.
6. Attempts to upload that buffer to Supabase Storage.
7. Attempts to insert file metadata into the Supabase database.
8. Converts the buffer into a CSV string.
9. Parses the CSV string using PapaParse.
10. Preprocesses the parsed records.
11. Calculates aggregates.
12. Calculates trends.
13. Spawns the Python prediction script.
14. Sends aggregate features into Python through standard input.
15. Reads JSON predictions from Python standard output.
16. Returns the complete response to the frontend.

The important architectural point is that `/api/upload` is not only an upload endpoint. It is the orchestration layer for the entire risk analysis pipeline.

### Process API Route

The `/api/process` route supports a second processing path. Instead of receiving a new uploaded file from the user, it retrieves the latest upload metadata from Supabase, downloads that file from storage, parses it, preprocesses it, calculates aggregates, and runs the same Python prediction script.

This route is useful because it shows how the product can evolve from single-session CSV upload toward persistent patient data processing. In a production version, this could support scheduled reprocessing, clinician review of past uploads, or automated analysis of newly received wearable files.

### CSV Parser

The CSV parser lives in `src/lib/csvParser.ts`. It uses PapaParse to transform CSV text into JavaScript objects.

The parser is configured with:

- `header: true`, so the first row becomes field names.
- `dynamicTyping: true`, so numeric values become actual numbers.
- `skipEmptyLines: true`, so blank rows do not pollute the dataset.

This matters because downstream functions expect numeric fields like `heart_rate`, `spo2`, and `steps`. Without dynamic typing, every value would arrive as text, and the aggregation logic would not work correctly.

### Preprocessing Module

The preprocessing module lives in `src/lib/preprocess.ts`. Its job is to make incoming data more reliable before feature extraction.

It contains functions for:

- Removing null and undefined values from a record.
- Trimming extra whitespace from string values.
- Normalizing object keys by lowercasing them, replacing spaces with underscores, and removing unsupported characters.
- Applying these transformations across an entire dataset.
- Tracking how many records were processed and how many were skipped.

This is essential because wearable CSV exports are not always clean. One file might use `Heart Rate`, another might use `heart_rate`, and another might contain trailing spaces. Normalizing keys means the rest of the application can rely on consistent names like `heart_rate`, `spo2`, `steps`, and `timestamp`.

### Feature Engineering Module

The feature engineering module lives in `src/lib/features.ts`. This is one of the most important parts of the project because it translates raw records into clinically meaningful summaries.

The function `calculateDatasetAggregates` produces:

- Average heart rate.
- Maximum heart rate.
- Minimum heart rate.
- Minimum SpO2.
- Total steps.
- Total record count.
- Cardiac event count.
- SpO2 event count.
- Sleep stage breakdown.
- Sleep sessions.

Cardiac events are counted when heart rate values exceed 100 bpm. SpO2 events are counted when oxygen saturation values fall below 95 percent. These event counts help bridge the gap between raw time-series readings and interpretable patient risk.

The module also includes sleep session extraction. It detects sleep stage columns, groups repeated sleep stages into blocks, separates sessions using long awake gaps, calculates total sleep duration, and computes stage breakdown percentages. This allows the dashboard to show a sleep timeline with Awake, REM, Light, and Deep segments.

Finally, `calculateTrends` creates chart-ready time-series data for heart rate and SpO2. It limits each chart to around 24 points using decimation, which keeps the dashboard readable even when the uploaded CSV contains many rows.

### Python Prediction Module

The Python prediction module lives in `ml/predict.py`. It is the bridge between the web application and machine learning inference.

When the script starts, it loads six files:

- `cardiac_risk_model.pkl`
- `cardiac_scaler.pkl`
- `fall_risk_model.pkl`
- `fall_scaler.pkl`
- `respiratory_risk_model.pkl`
- `respiratory_scaler.pkl`

Each model has a corresponding scaler. The scaler transforms incoming features into the same numerical scale used during model training. This is important because many machine learning models are sensitive to feature ranges. For example, total steps may be in the thousands, while SpO2 may be around 90 to 100. Scaling prevents one feature from overpowering another simply because its numeric range is larger.

The script reads JSON from standard input. It safely extracts values such as average heart rate, maximum heart rate, minimum heart rate, minimum SpO2, total steps, and record count. If a value is missing, null, invalid, or NaN, the script falls back to reasonable defaults. This improves robustness during demos and protects the prediction flow from malformed data.

The cardiac model receives:

- Average heart rate.
- Maximum heart rate.
- Minimum heart rate.
- Minimum SpO2.
- Total steps.
- Record count.

The fall model receives:

- Average heart rate.
- Total steps.
- Record count.

The respiratory model receives:

- Minimum SpO2.
- Average heart rate.
- Record count.

Each model returns a probability. The script converts each probability into a risk level using the following logic:

- A score of 0.75 or above becomes High risk.
- A score from 0.40 to below 0.75 becomes Moderate risk.
- A score below 0.40 becomes Low risk.

The output is returned as JSON with three objects: `cardiacRisk`, `fallRisk`, and `respiratoryRisk`. Each object contains a `score` and a `level`.

### Dashboard Page

The dashboard is the main command center of GeriRisk. It loads the processed response from local storage and uses that data to populate every visual module.

If no processed data is available, the dashboard redirects the user back to the upload page. This prevents the dashboard from showing empty or misleading information.

The dashboard is arranged into a main left column and a right-side action column. The left side focuses on patient data, risk, trends, sleep, and detailed metrics. The right side focuses on alerts and appointment scheduling. This layout mirrors a real workflow: first understand the patient, then respond to the risk.

### Metric Cards

The metric cards show the most important patient vitals immediately:

- Average heart rate.
- Minimum SpO2.
- Total steps.
- Cardiac events.

Each card includes a label, a large value, a unit, and an icon. These cards act as the executive summary of the patient file. They are intentionally placed at the top because a clinician or investor should understand the patient's state within seconds.

### Risk Cards

The risk cards are the central predictive output of the system. There are three risk cards:

- Cardiac Stress.
- Fall Risk.
- Respiratory / SpO2.

Each card displays the prediction score as a percentage and the level as Low, Moderate, or High. The card colors change depending on severity. High risk uses destructive styling, Moderate risk uses amber styling, and Low risk uses primary brand styling.

Each card also includes generated subtext. This is important because the card does not only show a number. It explains the signal behind the number, such as average heart rate, number of events, total steps, oxygen dips, or stability status.

### Alert Panel

The alert panel converts predictions and aggregates into readable messages. It is powered by the `generateAlerts` function in `src/lib/generateAlerts.ts`.

The alert engine uses geriatric-context thresholds:

- Average heart rate above 80 is treated as moderate concern, and above 100 as high concern.
- Maximum heart rate above 110 is treated as moderate concern, and above 130 as high concern.
- Minimum SpO2 below 95 is treated as moderate concern, and below 92 as critical.
- Very low activity below 500 steps and low activity below 2000 steps contribute to fall-risk messaging.
- Cardiac event and SpO2 event counts influence alert severity.

The value of this component is explainability. Machine learning systems can fail to build trust if they only output abstract scores. GeriRisk adds contextual alert messages so a clinician or caregiver can understand what the model is responding to.

### Activity Ring

The activity ring visualizes daily steps against a goal of 5,000 steps. It calculates progress as a percentage and estimates calories burned using a simple multiplier of 0.04 calories per step.

This component is useful for fall-risk interpretation. Low mobility can indicate frailty, reduced confidence, illness, or increased fall vulnerability. By making activity progress visible, the dashboard connects lifestyle data to clinical risk.

### Sparkline Charts

The sparkline charts display heart rate and SpO2 trends. They use Recharts area charts with a gradient fill, axes, grid lines, and tooltip support.

These charts are important because they help detect patterns over time. A single heart rate value may not tell the full story, but a trend can reveal spikes, sustained elevation, or instability. Similarly, SpO2 trends can reveal oxygen dips, especially around sleep periods.

### Sleep Timeline

The sleep timeline shows the structure of sleep sessions. It visualizes sleep stages such as Awake, REM, Light, and Deep sleep across time.

The system builds sleep sessions from timestamped sleep-stage records. It groups consecutive records into stage blocks, separates sessions when long awake gaps occur, calculates duration, and generates a visual timeline. This is particularly relevant because respiratory risk can appear during sleep. Overnight SpO2 dips can be associated with sleep-related breathing issues, and sleep fragmentation can provide useful context for care decisions.

### Data Table

The data table gives a more detailed view of calculated metrics. It shows:

- Average heart rate.
- Maximum heart rate.
- Minimum heart rate.
- Minimum SpO2.
- Total steps.
- Record count.

Each row includes a status label such as Normal, High, Low, Warning, Excellent, Good, Fair, or Info. This makes the data table more than a static list. It interprets each metric into a readable category.

### Book Appointment Component

The appointment component connects risk detection with follow-up action. It displays a weekly calendar strip and a list of doctors with specialties, bios, email addresses, and availability status.

The specialties include:

- General Practitioner.
- Cardiologist.
- Pulmonologist.
- Neurologist.

The component calculates deterministic availability based on doctor index and selected date. When a doctor is selected, a modal opens with their profile and actions to email or schedule via Cal.com.

This is strategically important for the product narrative. Many health dashboards stop at showing data. GeriRisk goes further by giving users a practical next step.

## Extremely Detailed Working of the Entire Project

### Step 1: User Enters the Platform

The user begins at the GeriRisk landing page. This page introduces the product, explains its value, and gives the user a path to sign in or begin. The landing page is designed to communicate trust, especially because the product deals with health data. It uses professional branding, dashboard imagery, healthcare-focused messaging, and clear feature descriptions.

In a presentation, this is the point where we explain that GeriRisk is not merely a technical prototype. It is packaged as a product experience. The user can understand what it does before seeing the code or model.

### Step 2: User Uploads Wearable Data

After entering the product flow, the user reaches the upload page. The upload page asks for a CSV file. This CSV represents exported wearable data from a patient. It may include timestamped values such as heart rate, SpO2, steps, and sleep stage.

When the user selects the file, the interface updates to show the filename. When the user clicks "Analyze Data," the frontend begins the processing flow. The status changes to indicate that the system is working.

This step is intentionally simple. The complexity is hidden behind the upload interaction. For the user, it feels like uploading a document. For the system, this is the start of a full analytics pipeline.

### Step 3: Frontend Sends File to Backend

The upload page calls `processFile(file)`. This function builds a `FormData` payload and sends a POST request to `/api/upload`.

The use of `FormData` matters because browser file uploads are naturally represented this way. The backend receives the request, extracts the file, and begins validation.

If no file exists, the backend returns a 400 error. If the file does not end with `.csv`, the backend also returns a 400 error. This protects the pipeline from unsupported input.

### Step 4: Backend Stores File Metadata

After validating the file, the backend creates a unique file name using the current timestamp and original filename. It places the file under an `uploads/` path.

The backend then attempts to upload the file to Supabase Storage under the `wearable-uploads` bucket. If the storage upload succeeds, the backend inserts a metadata record into the `uploads` table with the original file name and file path.

This means the system separates the physical file from its searchable record. The CSV file is stored as an object in the storage bucket, while the database table stores the information needed to find and manage that object. This is a common industry architecture because large files are better handled by object storage, while structured metadata is better handled by a database.

For example, the storage bucket may contain the actual uploaded wearable file at a path like `uploads/1718700000000-patient-data.csv`. The database table can then store the original file name, the generated file path, and the upload timestamp. Later, when the system needs to reprocess the latest file, the `/api/process` route can query the `uploads` table, find the most recent file path, download that file from Supabase Storage, and run the same parsing, preprocessing, and prediction pipeline again.

This gives the system a persistence foundation. In the current flow, the dashboard uses local storage for session transfer, but Supabase storage and metadata create the base for future patient history, audit logs, and multi-session review. For a production version, this same foundation can be extended so every patient has a record of uploaded wearable files, every file has a processing status, and every prediction can be traced back to the exact dataset that generated it.

This also enhances security because sensitive files are no longer treated as temporary frontend-only artifacts. They are routed through a backend endpoint and placed into a managed storage layer where access can be controlled through Supabase policies. In a healthcare setting, that control is crucial. A caregiver should only see patients assigned to them. A doctor should only access files relevant to their cases. An administrator should be able to audit uploads without casually exposing private health data. Supabase gives the project the backend primitives needed to build those permission boundaries.

### Step 5: Backend Converts File to Text

The uploaded file arrives as binary data. The backend reads it as an array buffer, converts it into a `Uint8Array`, and then uses `TextDecoder` to convert it into a CSV string.

This is an important bridge between file upload and data processing. Machine learning models cannot use a raw CSV file directly. The file must first become structured rows.

### Step 6: CSV Parsing

The CSV string is sent to `parseCSVString`. PapaParse reads the content and returns:

- Parsed data rows.
- Parsing errors.
- Metadata about the CSV.

The parser treats the first row as headers, uses dynamic typing, and skips empty lines. Dynamic typing is especially important because it turns numeric-looking values into real numbers. For example, `"78"` becomes `78`, which can then be used in arithmetic.

If PapaParse reports warnings, the upload route logs them. The pipeline can still continue if the parsed data is usable.

### Step 7: Data Preprocessing

The parsed records are then passed into `preprocessData`. The route enables:

- `removeNulls: true`
- `trimStrings: true`
- `normalizeKeys: true`

This means each record is cleaned before feature extraction. Null and undefined values are removed. String values are trimmed. Column names are normalized to lowercase and underscores.

For example:

- `Heart Rate` becomes `heart_rate`.
- `Sleep Stage` becomes `sleep_stage`.
- ` SpO2 ` becomes `spo2`.

This makes the rest of the system more robust. Without this step, the feature engineering code would have to support many possible column formats directly.

### Step 8: Aggregate Feature Calculation

The cleaned data is sent to `calculateDatasetAggregates`.

This function extracts all valid heart rate values, SpO2 values, and step values. It then calculates patient-level statistics:

- Average heart rate gives an overall cardiovascular load signal.
- Maximum heart rate identifies high peaks that may indicate stress.
- Minimum heart rate identifies low heart rate patterns.
- Minimum SpO2 identifies the worst oxygen saturation reading.
- Total steps summarizes activity and mobility.
- Record count indicates how much data was available.
- Cardiac events count how many heart rate readings exceeded 100 bpm.
- SpO2 events count how many oxygen readings fell below 95 percent.

These aggregates are exactly what the machine learning models need. They compress many rows of wearable data into a concise feature vector.

### Step 9: Sleep Session Extraction

The same feature module also extracts sleep sessions. It searches for a sleep stage column by looking for names that include sleep and stage or phase. It pairs sleep stages with timestamps, groups consecutive identical stages, splits sessions around long awake gaps, and discards very short noise sessions.

For each valid sleep session, the system calculates:

- Date.
- Bedtime.
- Wake time.
- Total minutes.
- Stage segments.
- Stage breakdown percentages.

This allows the frontend to show a timeline rather than a generic sleep number. The timeline is more informative because it shows when the patient was awake, in REM, in light sleep, or in deep sleep.

### Step 10: Trend Calculation

The backend also calls `calculateTrends`. This creates chart-ready arrays for heart rate and SpO2.

Each trend point contains:

- A formatted time label.
- A numeric value.

If the dataset is large, the function decimates the data to a maximum of around 24 points. This keeps charts readable and prevents the dashboard from becoming cluttered.

### Step 11: Backend Calls Python ML Script

After calculating aggregates and trends, the Next.js backend starts the Python script using Node's `child_process.spawn`.

The backend runs:

```text
python ml/predict.py
```

Then it writes the aggregate JSON into the Python process through standard input. This is a clean and simple integration pattern. The TypeScript backend does not need to import Python directly, and the Python script does not need to run as a separate web server. The two processes communicate through JSON.

### Step 12: Python Loads Models and Scalers

Inside `predict.py`, the script loads three models and three scalers from the `ml/models` directory.

The models are loaded once when the script starts:

- Cardiac model and scaler.
- Fall model and scaler.
- Respiratory model and scaler.

The use of separate scalers is important. Each model expects input features in the same scaled format used during training. Scaling makes the model more reliable because it standardizes feature ranges.

### Step 13: Python Builds Feature Vectors

The Python script reads the JSON input and safely extracts feature values. If values are missing or invalid, fallback defaults are used.

For cardiac prediction, the script creates a feature vector using:

- Average heart rate.
- Maximum heart rate.
- Minimum heart rate.
- Minimum SpO2.
- Total steps.
- Record count.

For fall prediction, it uses:

- Average heart rate.
- Total steps.
- Record count.

For respiratory prediction, it uses:

- Minimum SpO2.
- Average heart rate.
- Record count.

Each vector is transformed by its scaler and passed into the corresponding model.

### Step 14: Models Produce Risk Scores

Each scikit-learn model returns a probability using `predict_proba`. The script takes the probability of the positive risk class.

For example, if the cardiac model returns 0.651, the system interprets that as a 65.1 percent cardiac risk score. The score is rounded to three decimal places in the API response and later displayed as a percentage on the dashboard.

The risk level is calculated using a consistent rule:

- 75 percent or higher is High.
- 40 percent to 74.9 percent is Moderate.
- Below 40 percent is Low.

This makes the output easy to understand for non-technical users.

### Step 15: Backend Returns Full Analysis Result

The Python script prints JSON to standard output. The Node.js backend reads that output, parses it, and returns a combined response to the frontend.

The final response contains:

- File path.
- Number of processed records.
- Number of skipped records.
- Aggregates.
- Trends.
- Predictions.

This response becomes the single source of truth for the dashboard.

### Step 16: Frontend Saves Result and Redirects

The upload page receives the response. It stores it in local storage as `dashboard_data` and stores the file name as `dashboard_filename`. Then it redirects the user to `/dashboard`.

This is a lightweight session handoff. It allows the dashboard to load instantly without requiring a full authentication or database query flow during the demo.

### Step 17: Dashboard Loads and Interprets Data

When the dashboard opens, it reads `dashboard_data` from local storage. If the data is missing or invalid, the user is redirected back to `/upload`.

If the data exists, the dashboard parses it and sends it into components. The same processed response powers:

- Top metric cards.
- Risk cards.
- Heart rate chart.
- SpO2 chart.
- Activity ring.
- Sleep timeline.
- Data table.
- Alert panel.

This is efficient because every component reads from the same structured response.

### Step 18: Alerts Are Generated

The dashboard calls `generateAlerts(data)`. This function looks at both aggregates and predictions.

For example:

- If cardiac risk is High, the alert checks whether average heart rate, maximum heart rate, or cardiac event count contributed to concern.
- If SpO2 dropped below 92, the alert becomes Critical.
- If respiratory risk is Moderate and oxygen dips occurred, the alert becomes a Warning.
- If fall risk is High and total steps are very low, the alert recommends preventive attention.

This step makes the system more explainable. Instead of presenting a black-box score, GeriRisk gives a reasoned message.

### Step 19: User Reviews Trends and Details

The user can then review the detailed dashboard. The risk cards provide prediction summaries. The charts show trends. The data table shows numeric details. The sleep timeline shows overnight structure. The alert panel highlights urgent issues.

This layered design is important. Different users need different levels of detail. A family caregiver may only need the risk cards and alerts. A clinician may want the data table and trends. An investor may want to see that the product can support both simple and advanced views.

### Step 20: User Takes Action

Finally, the user can use the appointment module to select a date, review doctors, open a doctor profile, email the doctor, or schedule through Cal.com.

This closes the loop. The system does not stop at detection. It supports the next step toward care.

## Business and Clinical Value

GeriRisk creates value in several ways.

First, it supports early detection. By continuously analyzing wearable data, the system can surface risk patterns before they become emergencies.

Second, it reduces cognitive load for caregivers. Instead of manually reviewing rows of CSV data, users receive summarized metrics, risk scores, and contextual alerts.

Third, it improves care coordination. The appointment module helps connect detected risk with specialist follow-up.

Fourth, it creates a foundation for longitudinal monitoring. Supabase storage and the processing API can evolve into patient history, repeated uploads, trend comparison, and population-level dashboards.

Fifth, it is accessible. Because the current version accepts CSV exports, it can work with data from many wearable sources without requiring immediate hardware partnerships.

The deeper value is that GeriRisk changes the care model from reactive to preventive. In a reactive model, the system waits until a patient falls, experiences severe cardiac symptoms, or shows clear respiratory distress. In a predictive model, the system watches for the patterns that come before those events. This gives caregivers time to intervene while the situation is still manageable.

For families, this means peace of mind. For clinicians, it means better prioritization. For senior care facilities, it means more scalable monitoring. For payers and healthcare systems, it means potential reduction in avoidable emergency visits, hospitalization, and long-term complications. That is why prediction is not just a technical feature in this project. It is the economic and clinical engine of the product.

## Why This Project Is Strong for a VC Presentation

GeriRisk has a strong venture narrative because it addresses a real, growing market need. Elderly care is expensive, risk-heavy, and increasingly data-rich. Wearables are producing more health data than care teams can manually interpret. AI can help, but only if the output is presented in a workflow that clinicians and caregivers can actually use.

This project demonstrates:

- A clear user problem.
- A meaningful healthcare use case.
- A full-stack product, not only a model.
- A working data pipeline from upload to inference.
- Multiple risk domains.
- Explainable alerts.
- Visual dashboards.
- Care coordination through appointment booking.
- A technology foundation that can scale into a larger platform.

The product starts with CSV analysis, but the architecture naturally extends to direct wearable integrations, automated alerts, patient profiles, caregiver accounts, clinician review queues, and enterprise senior-care deployments.

## Current Scope and Responsible Positioning

It is important to present GeriRisk responsibly. The current system should be described as a clinical decision-support and risk-monitoring platform, not as a final diagnostic medical device.

The product helps identify patterns and prioritize attention. It does not replace medical judgment. Any high-risk output should be interpreted by qualified healthcare professionals. This responsible positioning is important for trust, compliance, and long-term product credibility.

## Closing Presentation Statement

To close, GeriRisk is built around a simple but urgent idea: elderly patients should not have to wait for a crisis before their risk becomes visible.

By combining wearable data, preprocessing, feature engineering, machine learning, explainable alerts, and a clinician-friendly dashboard, GeriRisk turns passive health data into proactive care intelligence.

The product gives caregivers and clinicians a clearer picture of cardiac stress, fall likelihood, and respiratory risk. It shortens the distance between signal and action. And most importantly, it creates a foundation for a future where elderly care is more preventive, more connected, and more data-informed.
