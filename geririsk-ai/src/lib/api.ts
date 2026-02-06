export interface ProcessResponse {
  file: string;
  recordCount: number;
  skipped: number;
  aggregates: {
    avgHeartRate: number;
    maxHeartRate: number;
    minHeartRate: number;
    minSpO2: number;
    totalSteps: number;
    recordCount: number;
    cardiacEvents: number;
    spo2Events: number;
  };
  predictions: {
    cardiacRisk: { score: number; level: "High" | "Moderate" | "Low" };
    fallRisk: { score: number; level: "High" | "Moderate" | "Low" };
    respiratoryRisk: { score: number; level: "High" | "Moderate" | "Low" };
  };
}

export async function processFile(file: File): Promise<ProcessResponse> {
  // Real API call
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to process file");
  }

  return res.json();
}
