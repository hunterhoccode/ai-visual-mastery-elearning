# Module 2: Midjourney v7 Mastery

## Fast Character Consistency with Reference-Based Workflows

## Table of Contents

- Midjourney v7: The Game-Changing Update
- Understanding Reference-Based Consistency
- The Complete Midjourney Character Workflow
- Advanced Prompt Engineering for Characters
- Image Reference Techniques and Weight Control
- Building Comprehensive Character Sheets
- Scene Variation While Maintaining Identity
- Troubleshooting and Recovery Strategies
- Speed Optimization and Batch Workflows
- Case Studies: From Concept to Series

## Chapter 1: Midjourney v7 - The Game-Changing Update

### What Makes v7 Different

Midjourney v7 represents a paradigm shift in AI image generation, specifically engineered for character consistency.

**Core Improvements**

- **Enhanced Facial Recognition Architecture:** Offers 3x better feature retention, consistent facial structure across angles, and improved memory of subtle details.
- **Sophisticated Reference Processing:** Supports multi-image references with weighted influence control and intelligent separation of style versus content.
- **Prompt-Reference Synergy:** References now enhance rather than override prompts, leading to a smoother blend of direction and identity.

**Technical Capabilities**

Reference Modes in v7:

- **Character Reference** ( `--cref` ): Focuses on facial features and identity.
- **Style Reference** ( `--sref` ): Maintains aesthetic without identity.
- **Combined Mode:** Uses both for complete control.

New Parameters:

- `--cref URL` : Character reference
- `--cw 0-100` : Character weight (default 100)
- `--sref URL` : Style reference
- `--sw 0-100` : Style weight (default 100)
- `--sv 1-4` : Style variance

### When to Choose Midjourney v7

**Perfect for:**

- Rapid content creation
- Social media series
- Concept development
- Client presentations
- Story prototyping

**Less ideal for:**

- Pixel-perfect production
- Complex pose requirements
- Technical illustration

## Chapter 2: Understanding Reference-Based Consistency

### The Science Behind It

Midjourney v7 uses a sophisticated embedding system that analyzes reference images for key identity markers, creates a temporary character model in memory, and applies this model to new prompt contexts, blending requirements based on user-defined weights.

### Identity Markers: What Midjourney Sees

The system prioritizes features in this order:

- **Primary Markers (Highest retention):** Facial structure, eye shape and color, nose characteristics.
- **Secondary Markers (Moderate retention):** Hair style and color, skin tone, age indicators.
- **Tertiary Markers (Variable retention):** Expressions, clothing style, accessories.

### Consistency Percentage Explained

- **95-100%:** Near-identical twin
- **85-94%:** Same person, different day
- **75-84%:** Strong family resemblance
- **Below 75%:** Inspired by, not the same

For most projects, aiming for 85-90% consistency is the sweet spot.

## Chapter 3: The Complete Midjourney Character Workflow

### Phase 1: Character Birth (Initial Creation)

**Detailed Prompt Construction:** Build your character with a structured prompt.

**Example:** "Young adult woman, Mediterranean features with striking green eyes, defined cheekbones, and shoulder-length wavy dark hair with subtle red highlights, confident half-smile, soft golden hour lighting, shot at eye level, minimal urban background --ar 2:3 --style raw --v 7"

**Generation and Selection:** Generate an initial batch of images ( `--repeat 4` is useful here), upscale the strongest candidate, create variations, and build an initial reference pool.

**Feature Documentation:** Create a character sheet noting the exact prompt used, the selected image URL, and key features to preserve.

### Phase 2: Character Development (Building Consistency)

**First Reference Test:** Use your hero image in a new prompt to test variations in lighting, angles, and expressions.

`"[Original prompt core] in a different setting --cref [URL] --cw 100 --v 7"`

**Calibrating Character Weight ( `--cw` ):** Find your sweet spot. `--cw 100` attempts an exact clone, while lower values like `--cw 70` allow more variation. Most characters work best at `--cw 75-85`.

**Building a Reference Library:** Systematically generate variations for angles, expressions, and lighting to create a comprehensive library for your character.

### Phase 3: Character Mastery (Production Ready)

**Multi-Reference Workflow:** Combine multiple references ( `--cref URL1 URL2` ) to average features and increase stability.

**Style Separation:** Add style references ( `--sref` ) without affecting the character's core identity.

**Batch Production:** Use prompt templates to efficiently generate content for a series.

## Chapter 4: Advanced Prompt Engineering for Characters

### The Anatomy of a Character-Consistent Prompt

A strong prompt follows the structure: **[Identity Anchor] + [Scene Description] + [Technical Specs] + [References]**.

### Identity Anchors: Your Character's DNA

Use strong identity anchors in your prompt, such as physical descriptions ("The same young woman from before"), named references ("Our hero character Alex"), and callback phrases ("Maintaining all previous features").

### Scene Descriptions That Preserve Identity

**DO:** Focus on the environment and action.

"...standing in a rain-soaked alley, neon lights reflecting off wet pavement, looking over her shoulder with concern."

**DON'T:** Redefine character features, as this will conflict with your reference.

"...beautiful woman with blue eyes and blonde hair in an alley."

### The Power of Negative Prompts

Prevent drift with exclusions:

`"--no different face, altered features, inconsistent appearance, changed hair color, different eye color"`

## Chapter 5: Image Reference Techniques and Weight Control

### Understanding Reference Weight Mathematics

The `--cw` parameter's influence is not linear. A weight of 100 provides about 95% influence, while a weight of 50 provides around 35% influence. The 85 setting is often the sweet spot, providing ~80% influence.

### Multi-Reference Strategies

**The Trinity Method:** Use three references for stability: a hero shot, a profile view, and an expression variant.

**The Evolutionary Chain:** Use each successful generation as a reference for the next to create a natural evolution while maintaining the core identity.

### Reference Image Optimization

For better results, pre-process your reference images by cleaning up backgrounds, standardizing cropping and framing, and normalizing the color and lighting. Creating a single reference sheet with a grid of different angles and expressions can also provide a holistic reference for the AI.

## Chapter 6: Building Comprehensive Character Sheets

A professional character sheet system is crucial for long-term projects.

- **Page 1: Identity Core:** Hero shot, face angles, expression range, and detail callouts.
- **Page 2: Full Figure:** Front/back/side views, proportion references, and clothing/accessory catalogs.
- **Page 3: Context Variations:** The character in different lighting, environments, and action poses.

Use a systematic generation approach, like the **50-Image Method**, to build out these sheets, starting with feature exploration and moving through angle completion, expression libraries, and final polish.

## Chapter 7: Scene Variation While Maintaining Identity

### The Hierarchy of Change

- **Always Preserve (Core Identity):** Facial structure, eye characteristics, distinctive features.
- **Carefully Modify (Contextual Elements):** Expressions, hair styling, clothing.
- **Freely Change (Environmental):** Backgrounds, lighting, camera angles.

### Complex Scene Solutions

**Problem: Extreme Lighting Changes (Day to Night)**

- **Solution:** Reference the daytime shot but describe the new lighting.
- `"Her features illuminated by moonlight, maintaining the distinctive cheekbones... --cref [day reference] --cw 75"`

**Problem: Action vs. Static**

- **Solution:** Lower the character weight ( `--cw 65` ) to allow for more dynamic movement while preserving identity.

**Problem: Age Progression**

- **Solution:** Use an evolutionary chain of references, blending from a younger reference to an older one.

## Chapter 8: Troubleshooting and Recovery Strategies

### Common Consistency Failures

- **Feature Drift (e.g., eyes change color):** Reference weight is too low or the prompt has conflicting descriptors. Solution: Increase `--cw` to 85-90 and remove conflicts.
- **Style Override (character looks right but "feels" wrong):** The style reference is overpowering the character reference. Solution: Reduce `--sw` to 40-50.
- **Context Corruption (e.g., costume affects facial features):** Prompt elements are bleeding into each other. Solution: Use clear prompt separation ( `CHARACTER: ... SCENE: ...` ).

### Recovery Protocols

- **The Reset Method:** When consistency is lost, return to the original hero shot reference and rebuild toward the desired scene.
- **The Frankenstein Fix:** Generate the face and body/scene separately, combine them in an external editor, and feed the composite back as a new, stronger reference.
- **The Anchor Chain:** Instead of making one large jump in context (A → D), create smaller intermediate steps (A → B → C → D).

## Chapter 9: Speed Optimization and Batch Workflows

### Rapid Generation Strategies

- **The Template System:** Create fill-in-the-blank structures for characters, scenes, and actions to generate prompts quickly.
- **Batch Command Construction:** Use your platform's ability to queue multiple prompts to run jobs in parallel.
- **The Variation Matrix:** Use the variation buttons (V1, V2, etc.) and remixing features on a strong base image to efficiently generate a comprehensive set of options.

### Workflow Automation

Organize your workspace with separate channels or folders for character development, scene generation, and reference storage. Build prompt banks with reusable components for characters and scenes that can be combined for quick generation.

## Chapter 10: Case Studies - From Concept to Series

### Case Study 1: The Virtual Influencer

A one-week project to create a fashion-focused virtual influencer resulted in 50 consistent images. The key learning was that certain features, like curly hair, required a higher character weight ( `--cw 85` ) for consistency. The final handoff included a style guide and optimal prompts so the client could continue generating content independently.

### Case Study 2: The Fantasy Series

A 12-part fantasy story illustration was created in three days. The key to success was using the character's unique facial tattoos as a strong consistency anchor, which allowed for more flexibility in clothing and expression as the story progressed.

### Case Study 3: The Brand Avatar System

A tech startup's avatar system with five diverse but cohesive characters was developed in two days. The technique involved using the same style reference ( `--sref` ) for all characters but a different character reference ( `--cref` ) for each, ensuring a unified aesthetic across unique identities.

## Conclusion: Mastering the Midjourney Method

You have now learned how v7's architecture enables consistency, the complete workflow from concept to series, advanced prompt engineering, reference techniques, and troubleshooting methods. The professional edge comes from a systematic approach, reference mastery, and precise weight calibration.

While Midjourney v7 is a powerful tool that can handle 80% of character consistency needs with incredible speed, some projects demand even more control. The next module will explore Stable Diffusion and LoRA training for achieving absolute character consistency.
