export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";
import { supabase } from "@/lib/supabaseClient";
import { parseCSVString } from "@/lib/csvParser";
import { preprocessData } from "@/lib/preprocess";
import { calculateDatasetAggregates } from "@/lib/features";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!file.name.endsWith(".csv")) {
      return NextResponse.json({ error: "Only CSV files allowed" }, { status: 400 });
    }

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `uploads/${fileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("wearable-uploads")
      .upload(filePath, buffer, {
        contentType: "text/csv",
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Save metadata to DB table
    const { error: dbError } = await supabase.from("uploads").insert([
      {
        file_name: file.name,
        file_path: filePath,
      },
    ]);

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    // ========== PROCESS THE FILE ==========
    // Convert the uploaded file buffer to string for parsing
    const csvString = new TextDecoder().decode(buffer);

    // Parse CSV string
    const parseResult = parseCSVString(csvString);

    if (parseResult.errors.length > 0) {
      console.warn("CSV parsing warnings:", parseResult.errors);
    }

    // Preprocess data (this also normalizes column names to lowercase with underscores)
    const preprocessResult = preprocessData(parseResult.data, {
      removeNulls: true,
      trimStrings: true,
      normalizeKeys: true,
    });

    // Calculate dataset-level aggregates
    const aggregates = calculateDatasetAggregates(preprocessResult.data);

    // Log aggregates for debugging
    console.log("Calculated aggregates:", JSON.stringify(aggregates, null, 2));

    // Run Python ML prediction
    const scriptPath = path.join(process.cwd(), "ml", "predict.py");
    const predictions = await new Promise((resolve, reject) => {
      const py = spawn("python", [scriptPath], {
        cwd: process.cwd(),
      });

      py.stdin.write(JSON.stringify(aggregates));
      py.stdin.end();

      let output = "";
      let errorOutput = "";

      py.stdout.on("data", (data) => {
        output += data.toString();
      });

      py.stderr.on("data", (data) => {
        errorOutput += data.toString();
      });

      py.on("error", (err) => {
        reject(new Error(`Failed to start Python: ${err.message}`));
      });

      py.on("close", (code) => {
        if (code !== 0) {
          reject(new Error(`Python exited with code ${code}: ${errorOutput}`));
        } else if (errorOutput) {
          console.warn("Python stderr:", errorOutput);
          try {
            resolve(JSON.parse(output));
          } catch {
            reject(new Error(`Failed to parse Python output: ${output}`));
          }
        } else {
          try {
            resolve(JSON.parse(output));
          } catch {
            reject(new Error(`Failed to parse Python output: ${output}`));
          }
        }
      });
    });

    return NextResponse.json({
      file: filePath,
      recordCount: preprocessResult.processed,
      skipped: preprocessResult.skipped,
      aggregates,
      predictions,
    });
  } catch (err: unknown) {
    console.error("API /upload error:", err);
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
