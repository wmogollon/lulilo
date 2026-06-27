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
      }
    );

    if (!tripoResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch status" }, { status: 502 });
    }

    const data = await tripoResponse.json();
    const task = data?.data;

    if (!task) {
      return NextResponse.json({ error: "No task data" }, { status: 502 });
    }

    // Map Tripo status to our own status
    // Tripo statuses: queued, running, success, failed, cancelled
    const status = task.status as string;

    if (status === "success") {
      return NextResponse.json({
        status: "success",
        progress: 100,
        glbUrl: task.output?.model ?? null,
        renderedImage: task.output?.rendered_image ?? null,
      });
    }

    if (status === "failed" || status === "cancelled") {
      return NextResponse.json({
        status: "failed",
        progress: 0,
      });
    }

    // queued or running
    const progress = task.progress ?? (status === "running" ? 50 : 10);
    return NextResponse.json({
      status: "processing",
      progress,
    });
  } catch (err) {
    console.error("generation-status error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
