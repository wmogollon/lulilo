import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, styleId, childName } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const apiKey = process.env.TRIPO_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const stylePrompts: Record<string, string> = {
      original: "a cute collectible toy figurine based on a child's drawing, playful and charming",
      superhero: "a superhero toy figurine with cape and heroic pose, collectible style",
      fantasy: "a fantasy creature toy figurine with magical elements, collectible",
      cartoon: "a cartoon-style toy figurine with bold outlines and expressive face, collectible",
      animal: "a cute animal toy figurine, soft and friendly, collectible style",
      space: "an astronaut space explorer toy figurine with helmet, collectible style",
      princess: "a princess toy figurine with crown and elegant dress, collectible style",
      pirate: "a pirate toy figurine with bandana and adventurous pose, collectible style",
    };

    const prompt = stylePrompts[styleId] || stylePrompts.original;
    const fullPrompt = childName ? `${prompt}, character named ${childName}` : prompt;

    // Parse the data URI
    let base64Data = imageBase64;
    let mimeType = "image/jpeg";

    if (imageBase64.startsWith("data:")) {
      const match = imageBase64.match(/^data:([^;]+);base64,([\s\S]+)$/);
      if (match) {
        mimeType = match[1];
        base64Data = match[2].replace(/\s/g, ""); // remove any whitespace
      }
    }

    const extMap: Record<string, string> = {
      "image/jpeg": "jpeg",
      "image/jpg": "jpeg",
      "image/png": "png",
      "image/webp": "webp",
    };
    const extension = extMap[mimeType] ?? "jpeg";

    console.log("Sending to Tripo:", {
      mimeType,
      extension,
      base64Length: base64Data.length,
    });

    // Send image as base64 directly in the JSON body — most reliable approach
    const taskRes = await fetch("https://api.tripo3d.ai/v2/openapi/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        type: "image_to_model",
        file: {
          type: extension,
          file_token: base64Data,
        },
        texture: true,
        prompt: fullPrompt,
      }),
    });

    const taskText = await taskRes.text();
    console.log("Task status:", taskRes.status, "Body:", taskText);

    if (!taskRes.ok) {
      // If that also fails, try text-to-3d as fallback
      console.log("image_to_model failed, falling back to text_to_model...");
      
      const fallbackRes = await fetch("https://api.tripo3d.ai/v2/openapi/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          type: "text_to_model",
          prompt: fullPrompt,
        }),
      });

      const fallbackText = await fallbackRes.text();
      console.log("Fallback status:", fallbackRes.status, "Body:", fallbackText);

      if (!fallbackRes.ok) {
        return NextResponse.json(
          { error: "3D generation failed", detail: fallbackText },
          { status: 502 }
        );
      }

      const fallbackData = JSON.parse(fallbackText);
      const fallbackTaskId = fallbackData?.data?.task_id;
      if (!fallbackTaskId) {
        return NextResponse.json({ error: "No task ID from fallback" }, { status: 502 });
      }

      return NextResponse.json({ taskId: fallbackTaskId, mode: "text_fallback" });
    }

    const taskData = JSON.parse(taskText);
    const taskId = taskData?.data?.task_id;

    if (!taskId) {
      return NextResponse.json({ error: "No task ID returned" }, { status: 502 });
    }

    return NextResponse.json({ taskId, mode: "image_to_model" });
  } catch (err) {
    console.error("generate-3d error:", err);
    return NextResponse.json(
      { error: "Internal server error", detail: String(err) },
      { status: 500 }
    );
  }
}
