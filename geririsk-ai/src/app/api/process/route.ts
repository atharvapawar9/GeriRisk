export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";
import { supabase } from "@/lib/supabaseClient";
import { parseCSVString } from "@/lib/csvParser";
import { preprocessData } from "@/lib/preprocess";
import { calculateDatasetAggregates } from "@/lib/features";

export async function GET() {
  try {
    // Get latest uploaded file
    const { data: uploads, error } = await supabase
      .from("uploads")
      .select("*")
      .order("uploaded_at", { ascending: false })
      .limit(1);

    if (error || !uploads || uploads.length === 0) {
      return NextResponse.json({ error: "No uploads found" }, { status: 400 });
    }

    const filePath = uploads[0].file_path;

    // Download CSV from Supabase Storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from("wearable-uploads")
      .download(filePath);

    if (downloadError || !fileData) {
      return NextResponse.json(
        { error: "Failed to download file" },
        { status: 500 }
      );
    }

    // Convert blob to string
    const csvString = await fileData.text();

    // Parse CSV string
    const parseResult = parseCSVString(csvString);

    if (parseResult.errors.length > 0) {
      return NextResponse.json(
        { error: "CSV parsing errors", details: parseResult.errors },
        { status: 400 }
      );
    }

    // Preprocess data
    const preprocessResult = preprocessData(parseResult.data, {
      removeNulls: true,
      trimStrings: true,
      normalizeKeys: true,
    });

    // Calculate dataset-level aggregates
    const aggregates = calculateDatasetAggregates(preprocessResult.data);

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
          // Log stderr warnings but don't fail
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
    console.error("API /process error:", err);
    const errorMessage =
      err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

