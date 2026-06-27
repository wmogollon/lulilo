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

    // Style-aware prompts
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

    // Parse base64 — handle both raw base64 and data URIs
    let base64Data = imageBase64;
    let mimeType = "image/jpeg";

    if (imageBase64.startsWith("data:")) {
      const match = imageBase64.match(/^data:([^;]+);base64,(.+)$/);
      if (!match) {
        return NextResponse.json({ error: "Invalid image format" }, { status: 400 });
      }
      mimeType = match[1];
      base64Data = match[2];
    }

    // Detect extension
    const extMap: Record<string, string> = {
      "image/jpeg": "jpeg",
      "image/jpg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
    };
    const extension = extMap[mimeType] ?? "jpeg";

    console.log("Image info:", {
      mimeType,
      extension,
      base64Length: base64Data.length,
      firstChars: base64Data.substring(0, 30),
    });

    // Convert base64 → binary buffer → Blob
    const binaryBuffer = Buffer.from(base64Data, "base64");
    console.log("Buffer size (bytes):", binaryBuffer.length);

    const blob = new Blob([binaryBuffer], { type: mimeType });
    console.log("Blob size:", blob.size);

    // Build FormData and upload to Tripo
    const formData = new FormData();
    formData.append("file", blob, `drawing.${extension}`);

    console.log("Uploading to Tripo...");

    const uploadRes = await fetch("https://api.tripo3d.ai/v2/openapi/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    });

    const uploadText = await uploadRes.text();
    console.log("Upload response status:", uploadRes.status);
    console.log("Upload response body:", uploadText);

    if (!uploadRes.ok) {
      return NextResponse.json(
        { error: "Image upload failed", detail: uploadText },
        { status: 502 }
      );
    }

    const uploadData = JSON.parse(uploadText);
    const fileToken = uploadData?.data?.image_token;

    if (!fileToken) {
      console.error("No file token in response:", uploadData);
      return NextResponse.json({ error: "No file token returned" }, { status: 502 });
    }

    console.log("Got file token:", fileToken);

    // Submit image-to-3D task
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
          file_token: fileToken,
        },
        texture: true,
        prompt: fullPrompt,
      }),
    });

    const taskText = await taskRes.text();
    console.log("Task response status:", taskRes.status);
    console.log("Task response body:", taskText);

    if (!taskRes.ok) {
      return NextResponse.json(
        { error: "3D generation failed", detail: taskText },
        { status: 502 }
      );
    }

    const taskData = JSON.parse(taskText);
    const taskId = taskData?.data?.task_id;

    if (!taskId) {
      return NextResponse.json({ error: "No task ID returned" }, { status: 502 });
    }

    return NextResponse.json({ taskId });
  } catch (err) {
    console.error("generate-3d error:", err);
    return NextResponse.json(
      { error: "Internal server error", detail: String(err) },
      { status: 500 }
    );
  }
}
