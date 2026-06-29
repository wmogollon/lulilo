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
        headers: { Authorization: `Bearer ${apiKey}` },
        cache: "no-store",
      }
    );

    if (!tripoResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch status" }, { status: 502 });
    }

    const data = await tripoResponse.json();
    console.log("Tripo poll response:", JSON.stringify(data));

    const task = data?.data;
    if (!task) {
      return NextResponse.json({ error: "No task data" }, { status: 502 });
    }

    const status = task.status as string;
    console.log("Status:", status, "Progress:", task.progress, "Output:", JSON.stringify(task.output));

    if (status === "success") {
      const glbUrl =
        task.output?.model ??
        task.output?.pbr_model ??
        task.output?.base_model ??
        null;

      const renderedImage =
        task.output?.rendered_image ??
        task.output?.thumbnail ??
        null;

      console.log("SUCCESS — glbUrl:", glbUrl, "renderedImage:", renderedImage);

      return NextResponse.json({
        status: "success",
        progress: 100,
        glbUrl,
        renderedImage,
      });
    }

    if (status === "failed" || status === "cancelled") {
      return NextResponse.json({ status: "failed", progress: 0 });
    }

    const progress = task.progress ?? (status === "running" ? 40 : 10);
    return NextResponse.json({ status: "processing", progress });

  } catch (err) {
    console.error("generation-status error:", err);
    return NextResponse.json(
      { error: "Internal server error", detail: String(err) },
      { status: 500 }
    );
  }
}
