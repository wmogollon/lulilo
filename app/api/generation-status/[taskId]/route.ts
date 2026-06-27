import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const { taskId } = params;
    const apiKey = process.env.TRIPO_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const tripoResponse = await fetch(
      `https://api.tripo3d.ai/v2/openapi/task/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        cache: "no-store",
      }
    );

    if (!tripoResponse.ok) {
      const errText = await tripoResponse.text();
      console.error("Tripo status fetch failed:", errText);
      return NextResponse.json({ error: "Failed to fetch status" }, { status: 502 });
    }

    const data = await tripoResponse.json();
    
    // Log the FULL response so we can see exact field names
    console.log("Tripo full response:", JSON.stringify(data));

    const task = data?.data;

    if (!task) {
      console.error("No task data in response:", data);
      return NextResponse.json({ error: "No task data" }, { status: 502 });
    }

    const status = task.status as string;
    console.log("Task status:", status, "Progress:", task.progress);
    console.log("Task output:", JSON.stringify(task.output));

    if (status === "success") {
      // Tripo output fields — try all possible field names
      const glbUrl =
        task.output?.model ??
        task.output?.pbr_model ??
        task.output?.rendered_image ??
        task.output?.base_model ??
        null;

      const renderedImage =
        task.output?.rendered_image ??
        task.output?.thumbnail ??
        null;

      console.log("SUCCESS! glbUrl:", glbUrl, "renderedImage:", renderedImage);

      return NextResponse.json({
        status: "success",
        progress: 100,
        glbUrl,
        renderedImage,
        // Send full output for debugging
        rawOutput: task.output,
      });
    }

    if (status === "failed" || status === "cancelled") {
      console.log("Task failed/cancelled:", task);
      return NextResponse.json({ status: "failed", progress: 0 });
    }

    // queued or running
    const progress = task.progress ?? (status === "running" ? 40 : 10);
    return NextResponse.json({
      status: "processing",
      progress,
    });

  } catch (err) {
    console.error("generation-status error:", err);
    return NextResponse.json({ error: "Internal server error", detail: String(err) }, { status: 500 });
  }
}
