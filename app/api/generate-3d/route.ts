import { NextRequest, NextResponse } from "next/server";

const styleDescriptions: Record<string, string> = {
  original: "Keep the character exactly as drawn, translate faithfully into a 3D collectible toy figurine",
  superhero: "Transform the character into a superhero version with cape, mask, and heroic pose",
  fantasy: "Transform the character into a fantasy version with magical wings, sparkles, and enchanted elements",
  cartoon: "Transform the character into an expressive cartoon version with bold outlines and exaggerated features",
  animal: "Transform the character into a cute anthropomorphic animal version, soft and huggable",
  space: "Transform the character into a space explorer version wearing an astronaut helmet and suit",
  princess: "Transform the character into a royal princess version with crown, elegant dress, and regal pose",
  pirate: "Transform the character into a pirate adventure version with bandana, eye patch, and adventurous pose",
};

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, styleId, childName } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const tripoKey = process.env.TRIPO_API_KEY;
    const anthropicKey = process.env.ANTHROPIC_API_KEY;

    if (!tripoKey) {
      return NextResponse.json({ error: "Tripo API key not configured" }, { status: 500 });
    }

    // ─── Step 1: Use Claude Vision to analyze the drawing ───────────────────
    let characterDescription = "";

    if (anthropicKey) {
      console.log("Analyzing drawing with Claude Vision...");

      // Strip data URI prefix for Anthropic
      const base64Image = imageBase64.includes(",")
        ? imageBase64.split(",")[1]
        : imageBase64;
      const mimeMatch = imageBase64.match(/^data:([^;]+);base64,/);
      const mediaType = (mimeMatch?.[1] ?? "image/jpeg") as
        | "image/jpeg"
        | "image/png"
        | "image/webp"
        | "image/gif";

      const styleInstruction = styleDescriptions[styleId] || styleDescriptions.original;
      const nameInstruction = childName ? ` The character's name is ${childName}.` : "";

      const claudeRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": anthropicKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-opus-4-6",
          max_tokens: 400,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image",
                  source: {
                    type: "base64",
                    media_type: mediaType,
                    data: base64Image,
                  },
                },
                {
                  type: "text",
                  text: `You are helping create a 3D collectible toy figurine from a child's drawing.

Analyze this drawing carefully and describe the main character in detail for a 3D model generator. Focus on:
- Body shape and proportions
- Head shape, facial features (eyes, nose, mouth, ears)
- Any distinctive markings or patterns (like panda markings)
- Clothing or accessories
- Overall pose and style

Style instruction: ${styleInstruction}.${nameInstruction}

Write a single detailed prompt (max 150 words) for generating a 3D toy figurine. 
Start with the most important visual features. 
Format: "3D collectible toy figurine of [description], chibi proportions, full body standing pose, smooth surfaces, physical toy, studio lighting, high quality"

Only output the prompt, nothing else.`,
                },
              ],
            },
          ],
        }),
      });

      if (claudeRes.ok) {
        const claudeData = await claudeRes.json();
        characterDescription = claudeData?.content?.[0]?.text?.trim() ?? "";
        console.log("Claude description:", characterDescription);
      } else {
        const err = await claudeRes.text();
        console.error("Claude Vision failed:", err);
      }
    }

    // Fallback prompt if Claude Vision failed or no key
    if (!characterDescription) {
      const stylePart = styleDescriptions[styleId] || styleDescriptions.original;
      const namePart = childName ? `, character named ${childName}` : "";
      characterDescription = `3D collectible toy figurine, chibi proportions, full body standing pose, ${stylePart}${namePart}, smooth surfaces, physical toy, studio lighting, high quality`;
    }

    console.log("Final prompt for Tripo:", characterDescription);

    // ─── Step 2: Generate 3D model with Tripo text_to_model ─────────────────
    const taskRes = await fetch("https://api.tripo3d.ai/v2/openapi/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tripoKey}`,
      },
      body: JSON.stringify({
        type: "text_to_model",
        prompt: characterDescription,
        negative_prompt: "flat, 2D, card, paper, poster, low quality, blurry",
      }),
    });

    const taskText = await taskRes.text();
    console.log("Tripo task response:", taskRes.status, taskText);

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

    console.log("Task created:", taskId);
    return NextResponse.json({ taskId, prompt: characterDescription });

  } catch (err) {
    console.error("generate-3d error:", err);
    return NextResponse.json(
      { error: "Internal server error", detail: String(err) },
      { status: 500 }
    );
  }
}
