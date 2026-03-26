# Why JSON Makes Sense (Sometimes)

In certain visual styles—especially illustration, 3D rendering, or highly stylized game art—you'll often want your prompt structure to stay as clean and consistent as possible. This is where using **JSON formatting** can give you a real advantage.

Unlike in photography (where flexibility and nuance are key), styles like **vector art**, **isometric design**, **toon shading**, or **stylized 3D** benefit from rigid, clearly defined input.

In JSON, you can cleanly break down a style into exact parameters like:

- Color palette
- Line thickness
- Shading style
- Background behavior
- Composition rules
- Detail level
- Animation frame rules (if later used for video)

This structure makes it much easier to get reproducible results—and to swap in new content while keeping the visual identity intact.

## Example: JSON Prompt Block for a 3D Stylized Character

```json
{
  "style_name": "Toon 3D Adventure",
  "camera": {
    "angle": "front three-quarter view",
    "lens": "35mm",
    "depth_of_field": "none"
  },
  "lighting": {
    "type": "studio three-point",
    "shadow_style": "soft cell-shaded"
  },
  "color_palette": ["#F4D03F", "#2980B9", "#E74C3C", "#2C3E50"],
  "outline": {
    "enabled": true,
    "stroke_thickness": "3px",
    "stroke_color": "#000000"
  },
  "materials": {
    "skin": "matte",
    "clothing": "plastic gloss",
    "accessories": "metallic"
  },
  "character_pose": "dynamic running mid-stride",
  "background": {
    "style": "flat color",
    "color": "#E5E7E9"
  },
  "render_quality": "ultra",
  "format": "portrait",
  "notes": "inspired by retro Nintendo character art"
}
```

This approach not only improves visual consistency but also makes the prompt reusable. You can change the `character_pose` or `color_palette` and still get results in the same visual system.

## When Not To Use JSON (Photography)

In photorealistic image generation, JSON usually hurts more than it helps. Real-world photography involves nuance, imperfection, light gradients, and ambiguity that JSON formatting can't express well.

For this reason, it's generally not recommended for:

- Studio or natural light portraits
- Cinematic environment shots
- Analog-style or editorial photography

For these styles, it's better to stick with a well-written Alpha Prompt and simply refine it through iterative prompting.

## Workflow Suggestion

Here's a suggested workflow:

1. Start with a normal Alpha Prompt and generate 1–3 solid image results.
2. Identify the best outputs (the "Master Prompts").
3. Instruct your AI: "Based on the current chat and the good Master Prompts, write a reusable JSON prompt structure for this style."
4. The AI will then structure all the recurring elements into a clean JSON template.
5. Use that template to generate future images with new subjects, poses, or scenes—without losing the look.

## Key Insight:

**JSON is powerful when your style needs precision and repetition.** Use it for illustration, 3D, and structured visual systems. But in photography, rely on rich natural language instead. Only generate JSON after you've nailed a visual result—never as a starting point.
