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
  original: "3D collectible toy figurine, full body character, standing pose, chibi proportions, smooth surfaces, physical toy",
  superhero: "3D superhero toy figurine, full body standing, cape, heroic pose, chibi proportions, physical collectible toy",
  fantasy: "3D fantasy creature toy figurine, full body standing, magical wings, chibi proportions, physical collectible toy",
  cartoon: "3D cartoon toy figurine, full body standing, expressive face, chibi proportions, physical collectible toy",
  animal: "3D cute animal toy figurine, full body standing, soft friendly appearance, chibi proportions, physical collectible toy",
  space: "3D astronaut toy figurine, full body standing, space helmet, chibi proportions, physical collectible toy",
  princess: "3D princess toy figurine, full body standing, crown and dress, chibi proportions, physical collectible toy",
  pirate: "3D pirate toy figurine, full body standing, bandana, chibi proportions, physical collectible toy",
};

    const stylePrompt = stylePrompts[styleId] || stylePrompts.original;
    const fullPrompt = childName
      ? `${stylePrompt}, character named ${childName}`
      : stylePrompt;

    // Parse base64 data URI
    let base64Data = imageBase64;
    let mimeType = "image/jpeg";

    if (imageBase64.startsWith("data:")) {
      const match = imageBase64.match(/^data:([^;]+);base64,([\s\S]+)$/);
      if (match) {
        mimeType = match[1];
        base64Data = match[2].replace(/\s/g, "");
      }
    }

    const extMap: Record<string, string> = {
      "image/jpeg": "jpeg",
      "image/jpg": "jpeg",
      "image/png": "png",
      "image/webp": "webp",
    };
    const extension = extMap[mimeType] ?? "jpeg";

    console.log("Image info:", { mimeType, extension, base64Length: base64Data.length });

    // Step 1: Upload image to Tripo to get a real image_token
    // Convert base64 to binary using Buffer (Node.js built-in)
    const imageBuffer = Buffer.from(base64Data, "base64");
    console.log("Buffer size:", imageBuffer.length, "bytes");

    const formData = new FormData();
    const blob = new Blob([imageBuffer], { type: mimeType });
    formData.append("file", blob, `drawing.${extension}`);

    const uploadRes = await fetch("https://api.tripo3d.ai/v2/openapi/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    });

    const uploadText = await uploadRes.text();
    console.log("Upload status:", uploadRes.status, "Body:", uploadText);

    if (!uploadRes.ok) {
      return NextResponse.json(
        { error: "Image upload to Tripo failed", detail: uploadText },
        { status: 502 }
      );
    }

    const uploadData = JSON.parse(uploadText);
    const imageToken = uploadData?.data?.image_token;

    if (!imageToken) {
      console.error("No image_token in upload response:", uploadData);
      return NextResponse.json(
        { error: "No image token returned from upload" },
        { status: 502 }
      );
    }

    console.log("Got image_token:", imageToken);

    // Step 2: Create image-to-model task using the real image token
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
          file_token: imageToken,
        },
        texture: true,
        prompt: fullPrompt,
      }),
    });

    const taskText = await taskRes.text();
    console.log("Task status:", taskRes.status, "Body:", taskText);

    if (!taskRes.ok) {
      return NextResponse.json(
        { error: "3D generation task failed", detail: taskText },
        { status: 502 }
      );
    }

    const taskData = JSON.parse(taskText);
    const taskId = taskData?.data?.task_id;

    if (!taskId) {
      return NextResponse.json({ error: "No task ID returned" }, { status: 502 });
    }

    console.log("Task created:", taskId);
    return NextResponse.json({ taskId, mode: "image_to_model" });

  } catch (err) {
    console.error("generate-3d error:", err);
    return NextResponse.json(
      { error: "Internal server error", detail: String(err) },
      { status: 500 }
    );
  }
}
