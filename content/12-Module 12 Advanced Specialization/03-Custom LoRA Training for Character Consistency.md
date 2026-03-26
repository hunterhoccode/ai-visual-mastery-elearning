# Character Consistency Mastery: Building Persistent AI Characters Across Platforms

## Module 3: Stable Diffusion & LoRA Training

### Deep Control Through Custom Models

## Table of Contents

- Introduction to Custom Model Training
- Understanding LoRA Technology
- Setting Up Your Training Environment
- Dataset Preparation: The Foundation of Success
- Training Your First Character LoRA
- Advanced Training Techniques
- Using LoRAs in Production
- Combining Multiple LoRAs and Techniques
- Troubleshooting Training Issues
- Building a Professional Character Pipeline

## Chapter 1: Introduction to Custom Model Training

### Why Custom Models Change Everything

While reference-based methods offer good consistency, custom model training provides absolute control.

- **Reference-Based (e.g., Midjourney):** Achieves 70-85% consistency, depends on prompt precision, and requires a reference image for every generation.
- **Custom LoRA (Stable Diffusion):** Achieves 95-99% consistency, works with simple trigger words, is encoded in model weights, and is portable across platforms.

Custom training becomes essential for commercial productions, long-form content with recurring characters, and projects requiring extreme pose variations or style consistency. The time investment (initially a few hours) yields the return of infinite consistent generations and complete asset ownership.

## Chapter 2: Understanding LoRA Technology

### What LoRA Actually Is

LoRA (Low-Rank Adaptation) is a training technique that creates a small "patch" file (10-150MB) for a large AI model (5GB+). This patch efficiently teaches the model new concepts, like a specific character, style, or object, without altering the base model itself. These LoRA files can be mixed, matched, and weighted to achieve precise results.

### LoRA Compatibility

- **Base Model:** LoRAs trained on a specific base model architecture (e.g., SD 1.5 or SDXL) will only work with models from that same architecture.
- **Cross-Platform Usage:** The same LoRA file can be used across various Stable Diffusion interfaces, including ComfyUI, Automatic1111, Forge, and InvokeAI, as well as in custom pipelines.

## Chapter 3: Setting Up Your Training Environment

### Hardware Requirements

- **Minimum Viable Setup:** GPU with 8GB+ VRAM (e.g., RTX 30-series), 16GB System RAM, 100GB storage.
- **Recommended Setup:** GPU with 12GB+ VRAM (e.g., RTX 40-series), 32GB System RAM, 500GB SSD.
- **Professional Setup:** GPU with 24GB+ VRAM (e.g., RTX 5090 or professional equivalent), 64GB System RAM, 2TB NVMe SSD.

### Software Stack

- **Option 1: Kohya_ss GUI (Recommended for Beginners):** A user-friendly interface with preset configurations and integrated tools, though primarily Windows-focused.
- **Option 2: Automatic1111 with Training Extension:** Integrates training directly into a familiar generation UI, allowing for immediate testing.
- **Option 3: Command Line Training (Advanced):** Offers maximum control and performance but has a steep learning curve and requires manual configuration.

### Environment Configuration

A crucial step is setting up the correct software environment, including the CUDA toolkit and PyTorch. It's essential to install the version of PyTorch that matches your specific, installed CUDA version.

```bash
# Check CUDA availability
nvidia-smi

# Install appropriate PyTorch (example for a CUDA version)
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121
```

For systems with limited VRAM, memory can be optimized by enabling gradient checkpointing, using an 8-bit Adam optimizer, and reducing the training batch size to 1.

## Chapter 4: Dataset Preparation - The Foundation of Success

The 90/10 rule applies here: 90% of LoRA quality comes from the dataset, and 10% comes from training settings. Never rush this phase.

### Image Requirements

- **Quantity:** 20-30 images is recommended for a good balance, with diminishing returns after 50+.
- **Resolution:** Minimum 1024x1024 for SDXL models. Varied aspect ratios are better than all square.
- **Quality:** Images must have a sharp focus on the subject, good lighting, and minimal compression artifacts.

### Dataset Curation Strategies

Ensure variety across angles, expressions, and lighting. Actively avoid including other people, heavily filtered images, extreme crops, or low-resolution sources in your dataset.

### Image Preprocessing & Captioning

- **Preprocessing:** Use tools to remove distracting backgrounds, consistently crop and align your subject, and standardize resolution.
- **Captioning:** This step is critical. Captions teach the AI what to associate with your character. A good strategy is to use a unique trigger word (e.g., `ohwx person`) followed by a simple, descriptive caption of the image content. Automated tools like BLIP can generate base captions, which you can then refine.

## Chapter 5: Training Your First Character LoRA

### Essential Training Parameters

- **Learning Rate:** Controls how quickly the model learns. A standard starting point is `1e-4` or `2e-4`.
- **Network Architecture (Rank/Dim):** Determines the LoRA's capacity for detail. A rank of 128 is a balanced choice.
- **Training Duration:** Calculated in steps. A common configuration is `20 images × 10 repeats × 10 epochs = 2000 steps`.

### Step-by-Step Training Walkthrough

1. **Configure Training Script:** In your chosen tool (e.g., Kohya_ss), set your source model, dataset path, and training parameters.
2. **Initialize Training:** Run a pre-flight check to ensure GPU memory is clear and paths are correct, then launch the training process.
3. **Monitor Progress:** Watch the loss curve (it should decrease smoothly) and VRAM usage.
4. **Test Checkpoints:** Generate test images every 500-1000 steps to monitor for overfitting (where the AI perfectly recreates training images but loses flexibility).

## Chapter 6: Advanced Training Techniques

- **Multi-Resolution Training:** Training on images of various resolutions makes the final LoRA more flexible.
- **Regularization:** Using a folder of generic "class images" (e.g., photos of a "person" or "woman") prevents the model from "forgetting" how to draw generic people, which improves the LoRA's compatibility.
- **Dropout:** Intentionally ignoring some captions or network connections during training prevents overfitting and improves generalization.
- **Token Weighting:** Emphasize important features in your captions, like `(green eyes:1.1)`.

## Chapter 7: Using LoRAs in Production

### Integration with Generation UIs

In interfaces like Automatic1111 or ComfyUI, you can load a LoRA and control its strength. The prompt syntax often looks like this:

`a photo of <lora:character_v1:0.8> in a park`

The number ( `0.8` ) is the weight, controlling the LoRA's influence. A weight of 0.7-0.9 is often the sweet spot.

### Prompt Engineering with LoRAs

Use a unique trigger word to call your character in the prompt. You can also use negative prompts to prevent common LoRA artifacts.

**Negative prompt:** "multiple faces, distorted features, inconsistent appearance, style mixing"

## Chapter 8: Combining Multiple LoRAs and Techniques

You can stack LoRAs to combine effects, such as a character, a style, and an outfit.

`<lora:character:0.8> <lora:art_style:0.6> <lora:uniform:0.7>`

For maximum consistency, combine your LoRA with other tools like ControlNet for pose control and IPAdapter for face similarity. This "triple lock" system can yield 99%+ consistency.

## Chapter 9: Troubleshooting Training Issues

- **Overfitting:** The LoRA only recreates training images. Solution: Reduce training steps, add more dataset variety, or lower the learning rate.
- **Underfitting:** The LoRA has a weak resemblance to the character. Solution: Increase training steps, improve dataset quality, or slightly raise the learning rate.
- **Style Bleeding:** The LoRA learns the background or clothing instead of the face. Solution: Use highly varied backgrounds and clothing in your dataset.

## Chapter 10: Building a Professional Character Pipeline

### Production Standards

A professional pipeline requires strict organization. Create a dedicated folder structure for each character project to manage references, development assets, training files, and final LoRAs.

### Documentation Standards

Create a "Character Bible" for each character. This document should include the trigger word, key features, optimal LoRA weight, known limitations, and example prompts. This is essential for team collaboration and long-term project consistency.

### Automation Workflows

For professional use, automate the pipeline with scripts. You can create scripts to automatically preprocess datasets, launch training with specific configurations, and run a suite of tests on the generated LoRA to verify its quality and consistency.

### Final Project Challenge

A final challenge to solidify these skills involves creating a complete character system from scratch. This includes designing a unique character, preparing a professional dataset of 30+ images, training an optimized LoRA, generating a diverse set of 50 images to test its capabilities, and documenting the entire process in a character bible.
