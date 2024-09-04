---
title: "Why Do AI Prompts Use Brackets?"
date: "2024-09-03T13:33:32+01:00"
draft: false
description: ""
type: "prompt-engineering"
---

## Introduction

In the sea of AI-generated content, particularly with **text-to-image** models, you may have noticed an intriguing technique: _the use of brackets in prompts_. But why are these brackets employed, and what purpose do they serve?

## The Core Purpose of Brackets in AI Prompts

At its heart, the use of brackets in AI prompts is a clever bit of prompt engineering. When you enclose a word or phrase in brackets within your prompt, you're essentially telling the AI model to pay more attention to that particular element. This technique is especially prevalent in diffusion models like **Stable Diffusion**, developed by Stability AI[^1], where it allows users to guide the emphasis of different aspects of the generated image.

### How It Works

When you submit a prompt with brackets, here's what happens:

1. The diffusion model processes your prompt.
2. It interprets the brackets as instructions to adjust the weighting of specific words or phrases.
3. During the image generation process, the model places more emphasis on the bracketed elements.

### Types of Brackets and Their Effects

| Bracket Type    | Usage Example | Emphasis Level                    |
| --------------- | ------------- | --------------------------------- |
| Single brackets | (word)        | Slight emphasis                   |
| Double brackets | ((word))      | Moderate emphasis                 |
| Triple brackets | (((word)))    | Strong emphasis                   |
| Square brackets | [word]        | Reduced emphasis (in some models) |

> It's worth noting that the exact interpretation can vary between different AI models and versions.

## Why Word Weighting Matters

The ability to weight words in your prompts offers a significant advantage: nuanced control over the final image. Whether you're an artist seeking to highlight specific elements in your creation or a designer aiming for a particular visual balance, this technique allows you to communicate your vision more effectively to the AI.

By understanding and utilising this feature, you can:

- Enhance certain aspects of your generated image
- Subdue elements that should be less prominent
- Create more precise and intentional outputs

This level of control is particularly valuable in creative projects where the balance of visual elements can dramatically affect the final outcome.

## A Practical Guide to Using Brackets in AI Prompts

Now that we understand the theory behind bracket usage, let's explore how to apply this knowledge in practice. The following examples will demonstrate the impact of brackets through a series of prompts, showing results before and after their application.

### Basic Bracket Usage

#### Specs for the examples:

- **Model:** SDXL-Lighning 4 Step
- **Seed:** `141119621523812`

#### Example 1: Emphasizing a Single Element

- Without brackets: `A red apple on a wooden table`

- With brackets: `A ((red apple)) on a wooden table`

{{< image-comparison
image1="/images/prompt-engineering/brackets-ai-prompts/red-apple_00001_.png"
image2="/images/prompt-engineering/brackets-ai-prompts/red-apple_00002_.png"
caption1="A red apple on a wooden table"
caption2="A ((red apple)) on a wooden table" >}}

In the bracketed version, you should notice that the apple appears more vibrant and takes a more central focus in the image.

#### Example 2: De-emphasizing an Element

- Without brackets: `A bustling cityscape with a bright sun`

- With brackets: `A bustling cityscape with a [bright sun]`

{{< image-comparison
image1="/images/prompt-engineering/brackets-ai-prompts/sun_00001_.png"
image2="/images/prompt-engineering/brackets-ai-prompts/cityscape brackets_00001_.png"
caption1="A bustling cityscape with a bright sun"
caption2="A bustling cityscape with a [bright sun]" >}}

Here, the square brackets around "bright sun" should result in a more subdued sun, allowing the cityscape to become more prominent.

### Advanced Bracket Techniques

#### Example 3: Multiple Emphasis Levels

- Base prompt: `A forest with a river and mountains`

- With varied emphasis: `A ((forest)) with a (river) and [mountains]`

{{< image-comparison
image2="/images/prompt-engineering/brackets-ai-prompts/brackets-comparison00001.png"
image1="/images/prompt-engineering/brackets-ai-prompts/brackets-comparison.png"
caption1="A forest with a river and mountains"
caption2="A ((forest)) with a (river) and [mountains]" >}}

This example showcases how different levels of bracketing can create a hierarchy of focus within the image.

#### Example 4: Combining Positive and Negative Emphasis

- Without brackets: `A vintage car in front of a modern building`

- With brackets: `A ((vintage car)) in front of a [modern building]`

{{< image-comparison
image2="/images/prompt-engineering/brackets-ai-prompts/vintage-car-modern-building_00002_.png"
image1="/images/prompt-engineering/brackets-ai-prompts/vintage-car-modern-building_00001_.png"
caption1="A vintage car in front of a modern building"
caption2="A ((vintage car)) in front of a [modern building]" >}}

This combination should result in a more prominent and detailed vintage car, while the modern building becomes a less detailed background element.

### Tips for Effective Bracket Usage

1. **Start subtle**: Begin with single brackets and gradually increase emphasis as needed.
2. **Balance is key**: Overusing brackets can lead to unnatural-looking images.
3. **Experiment**: Different models may interpret brackets slightly differently, so don't be afraid to experiment.
4. **Combine with other techniques**: Brackets can be used alongside other prompt engineering techniques for even more control.

Remember, the goal is to guide the AI towards your vision, not to force it. With practice, you'll develop an intuition for how to use brackets most effectively in your prompts.

## Advanced Models and Techniques

Recent advancements in AI models have further refined the process of prompt interpretation and image generation:

- **Stable Diffusion XL (SDXL)**: This model, introduced in the paper "SDXL: Improving Latent Diffusion Models for High-Resolution Image Synthesis"[^2], offers enhanced capabilities in generating high-quality images from prompts.

- **Stable Diffusion 3 (SD3)**: The latest iteration, detailed in "Stable Diffusion 3: Delivering Unprecedented Performance, Quality, and Adaptability in Image Generation"[^3], introduces a novel architecture that improves prompt processing and image quality.

- **Direct Preference Optimization (DPO)**: This fine-tuning technique, explained in "Direct Preference Optimization: Your Language Model is Secretly a Reward Model"[^4], has been applied to models like SD3 to enhance prompt understanding and image aesthetics.

It's worth noting that other companies are also making significant strides in this field. For instance, Black Forest Labs' Flux.1 model[^5] demonstrates similar architectural advancements and state-of-the-art performance.

## Conclusion

The use of brackets in AI prompts is a powerful tool that allows for fine-tuned control over image generation. By understanding the theory behind this technique and practicing with various examples, you can significantly enhance your ability to create precise, intentional AI-generated images. As AI technology continues to evolve, techniques like this will become increasingly sophisticated, offering creators unprecedented control over their content.

[^1]: https://stability.ai/
[^2]: https://huggingface.co/papers/2307.01952
[^3]: https://huggingface.co/papers/2403.03206
[^4]: https://huggingface.co/papers/2305.18290
[^5]: https://blackforestlabs.ai/
