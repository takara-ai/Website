---
title: "Prompt Guide"
date: "2024-03-28T15:06:55Z"
draft: false
description: "Explore AI learning methods: zero-shot to many-shot, chain of thought, and instruction following, to harness AI's full potential."
type: "prompt-engineering"
---

## Welcome to the World of Prompt Engineering!

This guide is designed to help you navigate the exciting landscape of AI communication with confidence and creativity. By understanding the different learning methods, utilising placeholders effectively, and following the prompt guide format, you'll be well-equipped to unlock the full potential of our tutorials and achieve your goals more efficiently. These guides were handcrafted by our team here at takara.ai (although the structure of these is assisted by AI) completely for free in our spare time, and we hope you enjoy them.

## Free Models and Playgrounds

Our prompt guides are designed to work well with many LLMs and multimodal models. Below is a list of links to various models where you can get started straight away for free.

- [OpenAI](https://chat.openai.com/) | ChatGPT 3.5 Instruct | GPT-4
- [Anthropic](https://claude.ai/) | Claude 3
- [Groq](https://groq.com/) | LLaMA 3, Mixtral 8x7B, Gemma 7B
- [Mistral AI](https://chat.mistral.ai/chat) | Small, Next, Large
- [NVIDIA](https://build.nvidia.com/) | Playground for many models
- [LLAVA](https://llava-vl.github.io/) | LLAVA 7B (Small model that can chat and understand images)
- [Perplexity](https://www.perplexity.ai/) | Multimodal AI search engine
- [Databricks](https://huggingface.co/spaces/databricks/dbrx-instruct) | DBRX-Instruct

## Understanding Learning Methods

Prompt engineering involves various learning methods, each suited to different scenarios based on the availability of examples and the complexity of the task at hand. Let's explore these methods in detail:

### Zero-Shot Learning

> Jordan here! 👋 I find the larger models like Gemini, GPT-4, and Claude 3 are usually the best performers with zero-shot[^1][^2]. Smaller models just don't have enough knowledge to rely on, so just keep this in mind.

- **Concept**: Relying solely on pre-existing knowledge to perform tasks without prior examples.
- **Analogy**: Teaching someone to recognise a banana by describing it, rather than showing it.
- **Application**: Effective when detailed instructions are available, allowing the AI to infer and act without specific examples.

### One-Shot Learning

- **Concept**: Learning from a single example to generalise and apply knowledge to new tasks.
- **Analogy**: Showing someone a single picture of an apple, then expecting them to recognise apples henceforth.
- **Application**: Useful when minimal data is available, but the AI needs to quickly adapt and understand new concepts.

### Few-Shot Learning

- **Concept**: Using a handful of examples to guide the AI in understanding the desired output.
- **Analogy**: Demonstrating with a few pictures of different fruits what each is and how to recognise others.
- **Application**: Ideal when gathering a large dataset is challenging, but more than one example can be provided.

### Many-Shot Learning

- **Concept**: Learning from an extensive collection of examples, enhancing accuracy and generalisation.
- **Analogy**: Teaching through hundreds of pictures of various fruits, ensuring comprehensive understanding.
- **Application**: Best when there's ample data to train the AI, resulting in highly accurate and nuanced understanding.

### Chain of Thought Prompting

> Jordan here! 👋 I find that chain of thought massively increases maths and reasoning accuracy[^3][^4], so I would definitely try this if you find regular prompting isn't working.

- **Concept**: Guiding the AI through a logical, step-by-step reasoning process to solve complex problems.
- **Analogy**: Similar to teaching problem-solving by explaining how to approach and analyse each step.
- **Application**: Useful for complex tasks requiring detailed explanations of the thought process, enhancing transparency and trust.

### Instruction Following Prompts

> Jordan here! 👋 It's important to note that only certain models are designed for following instructions; most public models are already running a fine-tuned **instruct** version, but in the open-source world or with lesser-known models you may have to specifically select the **instruct** version to get the best results[^5].

- **Concept**: Directly instructing the AI on the process to follow or information to consider for completing tasks.
- **Analogy**: Like providing step-by-step instructions to someone on how to make a sandwich.
- **Application**: Effective for tasks that benefit from clear, unambiguous instructions, ensuring the AI performs exactly as intended.

## Utilising Placeholders in Prompts

The prompt guides include placeholders, denoted by square brackets and all-caps text (e.g., [PRODUCT_DESCRIPTION]). These placeholders serve as variables that you should replace with information specific to your use case. When copying and pasting a prompt from the code block, make sure to:

1. Replace all placeholders with relevant information, such as your product name, target audience, or specific metrics.
2. Avoid removing the square brackets, as they indicate where you should input your specific information. Replace only the placeholder text within the brackets, ensuring that the rest of the prompt remains intact.

## Following the Prompt Guide Format

Each prompt guide is structured with a specific learning method in mind and presented in a consistent format:

1. The learning method is clearly stated.
2. A description of the prompt's purpose and expected output is provided.
3. The prompts themselves are presented in code blocks for easy copying and pasting.

By following these guides, you can ensure that your prompts are well-organised, easy to understand, and more likely to generate high-quality, relevant outputs from the AI. Adhering to the prompt guide format can save you time and effort in crafting effective prompts from scratch, as you can simply copy, paste, and modify the provided templates to suit your needs.

## Matching Learning Methods with AI Models

Different AI models may perform better with certain learning methods, depending on their architecture and training data:

- Large language models, such as GPT-4, often perform well with Zero-Shot and Few-Shot learning, as they can draw upon their vast pre-existing knowledge[^1].
- Specialised models, trained on specific domains or tasks, may benefit from Many-Shot learning, as they can leverage large numbers of examples to fine-tune their performance.

Experimentation is key to determining which learning method and AI model combination works best for your specific use case.

## The Importance of Following the Prompt Guides

Consistently using these prompt guides across your projects can lead to significant productivity gains, as you'll be able to generate high-quality AI outputs more efficiently and with less trial and error. By understanding the format of the prompt guides, effectively utilising placeholders, choosing the right learning method, matching learning methods with AI models, and recognising the importance of following these guides, you'll be well-equipped to leverage the power of AI and prompt engineering to achieve your goals more efficiently and effectively.

**Happy prompting from team takara!**

**チームタカラからのハッピープロンプティング!**

[^1]: https://huggingface.co/papers/2005.14165 - Brown et al., 2020, _Language Models are Few-Shot Learners_
[^2]: https://www.anthropic.com/news/claude-3-family - Anthropic, _Claude 3 Family Introduction_
[^3]: https://huggingface.co/papers/2201.11903 - Wei et al., 2022, _Chain-of-Thought Prompting Elicits Reasoning in Large Language Models_
[^4]: https://research.google/blog/language-models-perform-reasoning-via-chain-of-thought/ - Google Research Blog, _Language Models Perform Reasoning via Chain of Thought_
[^5]: https://huggingface.co/papers/2109.01652 - Wei et al., 2021, _Finetuned Language Models Are Zero-Shot Learners_
