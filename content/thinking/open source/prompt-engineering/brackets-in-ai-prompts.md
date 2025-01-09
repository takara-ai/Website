---
title: Why Do AI Prompts Use Brackets?
date: "2024-09-03T13:33:32+01:00"
draft: false
group: true
description:
  Discover the purpose of brackets in AI prompts and how they enhance text-to-image
  models. Learn how varying bracket types affect emphasis and image generation in
  our latest guide.
type: prompt-engineering
tags:
  industry:
    - Technology
  modality:
    - Text-to-Image
    - Image Generation
    - Multimodal
  difficultyLevel:
    - Intermediate
  technique:
    - Prompt Optimisation
    - Prompt Tuning
    - Contextual Prompting
    - Chain-of-Thought Prompting
    - Role-Based Prompting
    - Multistep Prompting
    - Error Analysis and Iteration
  specialisedTopics:
    - Explainable AI (XAI)
    - Bias Mitigation
---

## Introduction

In the world of AI-generated content, particularly with **text-to-image** models, using _brackets_ in prompts is a powerful technique. This article explores their use, focusing specifically on **Stable Diffusion** models.

## The Core Purpose of Brackets in AI Prompts

Brackets in AI prompts are a form of prompt engineering used to direct the model's attention to specific elements. This technique, commonly applied in diffusion models like **Stable Diffusion** developed by **Stability AI**[^1], helps users emphasise or de-emphasise different aspects of the generated image.

### How It Works: The Technical Details

Brackets ({}, []) and numerical attention (e.g., (word:1.3)) are custom features in interfaces such as **Automatic1111**[^8] and **InvokeAI**[^9], which extend the functionality of **Stable Diffusion**. Here’s how they work:

1. **Tokenization**: The prompt is broken into tokens, each mapped to an integer ID.
2. **Embedding**: Tokens are converted into vectors (e.g., 768 dimensions for CLIP[^7]) to represent their meanings.
3. **Positional Embedding**: Sequence information is added to maintain context.
4. **Transformer Processing**: Token and positional embeddings are combined to capture relationships between words.
5. **Attention Weighting**:

   - **Brackets**: Modify attention; for instance, ((word)) increases influence, while [[word]] reduces it.
   - **Numerical Attention**: (word:1.3) applies a specific multiplication factor to the attention weight.

   Note: These features are custom to tools like **Automatic1111**[^8] and **InvokeAI**[^9] and are not part of the original CLIP[^7] or baseline Stable Diffusion models.

### Types of Brackets and Their Effects

Different bracket types can be used to apply varying levels of emphasis to words or phrases in your prompts:

| Bracket Type    | Example    | Emphasis Level    |
| --------------- | ---------- | ----------------- |
| Single brackets | (word)     | Slight emphasis   |
| Double brackets | ((word))   | Moderate emphasis |
| Triple brackets | (((word))) | Strong emphasis   |
| Square brackets | [word]     | Reduced emphasis  |

### Numerical Attention

For fine-tuned control, you can use (word:weight):

- (word:1.5) increases the attention weight by a factor of 1.5 (50%).
- (word:0.25) decreases the attention weight by a factor of 1.75 (75%).

Example: "I want to see a (beautiful:1.5) (scary:0.5) [haunted:0.25] forest." Here, "beautiful" is highlighted, "scary" is downplayed, and "haunted" is diminished due to the square brackets.

## Why Word Weighting Matters

Word weighting allows for precise control over the final image, helping you to:

- Highlight key elements
- Downplay less important aspects
- Achieve more intentional results

This level of control is crucial for creative projects that require precise visual balance.

## A Practical Guide to Using Brackets in AI Prompts

With the theory of bracket usage covered, let's see it in action. The following examples demonstrate the impact of brackets on prompts and their resulting images.

### Basic Bracket Usage

#### Specs for the examples:

- **Model:** SDXL-Lightning 4 Step[^6]
- **Seed:** 141119621523812

#### Example 1: Emphasising a Single Element

- Without brackets: A red apple on a wooden table
- With brackets: A ((red apple)) on a wooden table

{{< image-comparison
image1="/images/prompt-engineering/brackets-ai-prompts/red-apple_00001_.png"
image2="/images/prompt-engineering/brackets-ai-prompts/red-apple_00002_.png"
caption1="A red apple on a wooden table"
caption2="A ((red apple)) on a wooden table" >}}

In the bracketed version, the apple appears more vibrant and becomes the central focus of the image.

#### Example 2: De-emphasising an Element

- Without brackets: A bustling cityscape with a bright sun
- With brackets: A bustling cityscape with a [bright sun]

{{< image-comparison
image1="/images/prompt-engineering/brackets-ai-prompts/sun_00001_.png"
image2="/images/prompt-engineering/brackets-ai-prompts/cityscape-brackets.png"
caption1="A bustling cityscape with a bright sun"
caption2="A bustling cityscape with a [bright sun]" >}}

Here, the square brackets around "bright sun" result in a more subdued sun, allowing the cityscape to become more prominent.

### Advanced Bracket Techniques

#### Example 3: Multiple Emphasis Levels

- Base prompt: A forest with a river and mountains
- With varied emphasis: A ((forest)) with a (river) and [mountains]

{{< image-comparison
image2="/images/prompt-engineering/brackets-ai-prompts/brackets-comparison00001.png"
image1="/images/prompt-engineering/brackets-ai-prompts/brackets-comparison.png"
caption1="A forest with a river and mountains"
caption2="A ((forest)) with a (river) and [mountains]" >}}

This example shows how different levels of bracketing can create a hierarchy of focus within the image.

#### Example 4: Combining Positive and Negative Emphasis

- Without brackets: A vintage car in front of a modern building
- With brackets: A ((vintage car)) in front of a [modern building]

{{< image-comparison
image1="/images/prompt-engineering/brackets-ai-prompts/vintage-car-modern-building_00001_.png"
image2="/images/prompt-engineering/brackets-ai-prompts/vintage-car-modern-building_00002_.png"
caption1="A vintage car in front of a modern building"
caption2="A ((vintage car)) in front of a [modern building]" >}}

This combination results in a more prominent and detailed vintage car, while the modern building recedes into the background.

### Tips for Effective Bracket Usage

1. **Start subtle**: Begin with single brackets and gradually increase emphasis as needed.
2. **Balance is key**: Overusing brackets can lead to unnatural-looking images.
3. **Experiment**: Different models may interpret brackets slightly differently, so don't be afraid to experiment.
4. **Combine with other techniques**: Brackets can be used alongside other prompt engineering techniques for even more control.

Remember, the goal is to guide the AI toward your vision, not to force it. With practice, you'll develop an intuition for how to use brackets most effectively in your prompts.

## ComfyUI vs Other Tools

ComfyUI[^10] offers greater sensitivity in handling prompt strengths by not normalizing them. For example, a prompt like (masterpiece:1.2) (best:1.3) (quality:1.4) girl is applied exactly as specified, allowing for precise control over each element. In contrast, interfaces like a1111[^8] UI normalize prompt strengths by averaging them across all tokens, resulting in weights such as (masterpiece:0.98) (best:1.06) (quality:1.14) (girl:0.81). This normalization leads to less sensitive and more balanced weighting of each prompt component. The direct application in ComfyUI makes it ideal for users seeking detailed adjustments in their image generation.

## Advanced Models and Techniques

Recent advancements in AI models have further refined the process of prompt interpretation and image generation:

- **Stable Diffusion XL (SDXL)**: This model, introduced in the paper "SDXL: Improving Latent Diffusion Models for High-Resolution Image Synthesis"[^2], offers enhanced capabilities in generating high-quality images from prompts.
- **Stable Diffusion 3 (SD3)**: The latest iteration, detailed in "Stable Diffusion 3: Delivering Unprecedented Performance, Quality, and Adaptability in Image Generation"[^3], introduces a novel architecture that improves prompt processing and image quality.
- **Direct Preference Optimisation (DPO)**: This fine-tuning technique, explained in "Direct Preference Optimisation: Your Language Model is Secretly a Reward Model"[^4], has been applied to models like SD3 to enhance prompt understanding and image aesthetics.
- **Takara.ai Image Datasets**: We applied the bracket prompt engineering technique to create stunning artwork in our Open Source datasets, demonstrating the practical application of these techniques in large-scale image generation projects. View them in our [Art Gallery](/open-source/gallery/).

Other companies are also making significant strides in this field. For example, **Black Forest Labs' Flux.1**[^5] model shows similar architectural advancements and performance to SD3[^3]. Although not a Stable Diffusion model, many prompt engineering techniques, including bracket use, might also apply to Flux.1.

## Conclusion

Brackets in AI prompts offer precise control over image generation. Though not part of the base Stable Diffusion model, they are widely used in popular interfaces. Experiment with different combinations to see their effects and stay updated with the latest model documentation.

If you're interested in another advanced technique, this time for LLM's, see our [Mega Prompts guide](/open-source/prompt-engineering/mega-prompts/).

[^1]: [Stability AI, _Generative AI Models Overview_](https://stability.ai/)
[^2]: [Rombach et al., 2023, _SDXL: A Scalable Latent Diffusion Model for High-Resolution Image Synthesis_](https://huggingface.co/papers/2307.01952)
[^3]: [Research on Scaled Rectified Flow Transformers for Enhanced Image Synthesis, 2024](https://huggingface.co/papers/2403.03206)
[^4]: [Research Paper on Advancements in Diffusion Models, 2023](https://huggingface.co/papers/2305.18290)
[^5]: [Black Forest Labs, _AI Research and Technology Solutions_](https://blackforestlabs.ai/)
[^6]: [Research on Innovative Techniques in Generative Modeling, 2024](https://huggingface.co/papers/2402.13929)
[^7]: [Research Paper on Diffusion Models and Their Applications, 2021](https://huggingface.co/papers/2103.00020)
[^8]: [GitHub Repository for the Stable Diffusion Web UI by AUTOMATIC1111](https://github.com/AUTOMATIC1111/stable-diffusion-webui)
[^9]: [GitHub Repository for InvokeAI, an Open-Source Toolkit for Generative AI](https://github.com/invoke-ai/InvokeAI)
[^10]: [Why do I get different images from the a1111 UI even when I use the same seed?](https://comfyanonymous.github.io/ComfyUI_examples/faq/#why-do-i-get-different-images-from-the-a1111-ui-even-when-i-use-the-same-seed)
