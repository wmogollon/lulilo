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

    // Build a style-aware prompt for better results
    const stylePrompts: Record<string, string> = {
      original: "a cute collectible toy figurine based on a child's drawing, playful and charming",
      superhero: "a superhero toy figurine with cape and heroic pose, collectible style",
      fantasy: "a fantasy creature toy figurine with magical elements, wings and sparkles, collectible",
      cartoon: "a cartoon-style toy figurine with bold outlines and expressive face, collectible",
      animal: "a cute animal toy figurine, soft and friendly, collectible style",
      space: "an astronaut space explorer toy figurine with helmet, collectible style",
      princess: "a princess toy figurine with crown and elegant dress, collectible style",
      pirate: "a pirate toy figurine with bandana and adventurous pose, collectible style",
    };

    const prompt = stylePrompts[styleId] || stylePrompts.original;
    const fullPrompt = childName
      ? `${prompt}, character named ${childName}`
      : prompt;

    // Submit to Tripo3D image-to-3D API
    const tripoResponse = await fetch("https://api.tripo3d.ai/v2/openapi/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        type: "image_to_model",
        file: {
          type: "png",
          file_token: imageBase64.split(",")[1] ?? imageBase64,
        },
        model_version: "v2.5-20250123",
        texture: true,
        pbr: false,
        prompt: fullPrompt,
      }),
    });

    if (!tripoResponse.ok) {
      const err = await tripoResponse.text();
      console.error("Tripo3D error:", err);
      return NextResponse.json(
        { error: "3D generation failed", detail: err },
        { status: 502 }
      );
    }

    const data = await tripoResponse.json();
    const taskId = data?.data?.task_id;

    if (!taskId) {
      return NextResponse.json({ error: "No task ID returned" }, { status: 502 });
    }

    return NextResponse.json({ taskId });
  } catch (err) {
    console.error("generate-3d error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
