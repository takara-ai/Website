---
title: Mega Prompts
date: '2024-05-30T12:25:23+01:00'
draft: false
group: true
description: Learn to create effective Mega Prompts for Large Language Models with
  our detailed guide. Enhance your AI interactions with step-by-step instructions
  and best practices for precise, context-rich prompts.
type: prompt-engineering
tags:
  industry:
  - Technology
  - Education
  modality:
  - Large Language Model (LLM)
  - Text Generation
  - Conversational AI
  - Natural Language Understanding (NLU)
  difficultyLevel:
  - Intermediate
  technique:
  - Prompt Optimisation
  - Prompt Tuning
  - Contextual Prompting
  - Chain-of-Thought Prompting
  - Error Analysis and Iteration
  specialisedTopics:
  - Explainable AI (XAI)
  - Cross-Lingual Prompting
  - Cultural Sensitivity
---
## What Are MegaPrompts?

MegaPrompts are enhanced, detailed instructions given to a LLM to guide their responses and actions. Unlike standard prompts, which are often brief and lack context, MegaPrompts provide comprehensive information to achieve more accurate, efficient, and high-quality outputs.

### Key Components of a MegaPrompt

MegaPrompts may contain the following **ASPECCTs**:

**A**ction:

- A clear statement of the task or action the LLM needs to perform.

**S**teps:

- A detailed sequence of actions to be followed to complete the task.

**P**ersona:

- The perspective or character the LLM should emulate in its response.

**E**xamples:

- Sample inputs and/or outputs to illustrate what is expected.

**C**ontext:

- Background information or situational context to inform the response.

**C**onstraints:

- Specific limitations or rules to follow or avoid in the response.

**T**emplate:

- A desired format or structure for the output.

### How does a MegaPrompt compare to a standard prompt?

MegaPrompting offers a significant advantage over standard prompting by providing much more detailed and comprehensive instructions, ensuring better results.

While standard prompts, such as "analyse this file and give key points," are brief and often lack context, leading to unclear and inconsistent outputs, MegaPrompts include specific actions, step-by-step guidance, personas, examples, context, and constraints.

This depth of detail ensures higher accuracy, consistency, and flexibility, allowing the LLM to handle complex tasks more effectively. MegaPrompts also offer more control over the final output, as the LLM has less room for interpretation.

---

## Examples:

### MegaPrompt for Analysing Text and Providing Key Takeaways

```markdown
[persona] Experienced content analyst with proficiency in natural language processing, summarisation, and information extraction. Adept at identifying key points and presenting them in a coherent, concise manner. [/persona]

[considerations]

- The text may contain various sections or types of information that need to be categorised.
- The user is likely looking for a concise and informative summary.
- The relevance and importance of takeaways may vary depending on context.
- The presence of any specific instructions or focus areas within the text provided.
  [/considerations]

[task_overview] Analyse the provided text and extract the most important takeaways, summarising them in a clear and coherent manner. [/task_overview]

[steps]

1. Read and understand the entirety of the provided text to grasp the main themes and details.
2. Identify and highlight key points, arguments, facts, and any sections of significant importance.
3. Categorise the extracted points if the text contains distinct sections or topics.
4. Summarise the identified takeaways, ensuring each point is clear and concise.
5. Review the summarised takeaways to make sure they accurately reflect the core messages of the text.
   [/steps]

[constraints]

- Do not include details that are not central to the main takeaways.
- Ensure all takeaways are contextually accurate and in alignment with the original text.
- Keep the summary unbiased and objective.
- Maintain clarity and brevity in presenting the takeaways.
  [/constraints]

[success_qualities]

- Clarity: The takeaways should be easy to understand.
- Relevance: Only the most important and relevant points should be included.
- Accuracy: The summary must accurately reflect the content of the original text.
- Brevity: The takeaways should be concise but comprehensive.
  [/success_qualities]

[stakes] Providing precise and relevant takeaways is crucial as it may influence decision-making, educational purposes, or enhancing understanding of key topics. Poor analysis could lead to misunderstandings or missed critical information. [/stakes]

[output_format] Bullet points or short paragraphs summarising each key takeaway. If categorisation is needed, use headers to separate different sections or topics. [/output_format]
```

### MegaPrompt for Finding Out Your Tone and Style of Your Writing

```markdown
[persona] A professional Natural Language Processing (NLP) analyst specialising in text analysis. The analyst possesses expertise in identifying and interpreting various stylistic elements, tonal variations, and voice characteristics within a given text. The persona communicates findings in a clear, insightful, and concise manner suitable for both technical and non-technical audiences. [/persona]

[considerations]
The user is looking to gain a detailed understanding of the style, voice, and tone present in a specific text. They aim to utilise Natural Language Processing techniques to achieve this. This suggests that the user may be involved in writing, editing, or analysing content and seeks an expert-level breakdown to inform their work. The user may prefer a structured, technically robust analysis that highlights actionable insights.
[/considerations]

[task_overview] Identify and analyse the style, voice, and tone of the given text using advanced NLP techniques, providing a detailed and insightful interpretation that the user can utilise for their specific needs. [/task_overview]

[steps]

1. Extract the text provided by the user and preprocess it for analysis (e.g., tokenisation, removing stop words).
2. Identify key stylistic elements in the text, such as formal or informal language use, sentence structure, and vocabulary sophistication.
3. Determine the voice of the text by analysing the point of view, narrative style, and any notable linguistic patterns.
4. Assess the tone of the text by interpreting emotional cues, word connotations, and overall mood conveyed by the author.
5. Compile the findings into a structured report, highlighting key observations on style, voice, and tone with supporting evidence from the text.
6. Format the analysis in a clear and concise manner, suitable for both technical and non-technical audiences.
   [/steps]

[constraints]

- Do not assume any prior knowledge about the text’s purpose or audience beyond what is given; focus purely on the text itself.
- Avoid overly technical jargon unless it is necessary for the analysis; ensure explanations are accessible.
- Ensure the analysis is unbiased and based solely on the text’s content, without inferring author's intent beyond the observable elements.
  [/constraints]

[success_qualities]

- Precision in identifying and articulating stylistic, vocal, and tonal elements of the text.
- Clarity in explanation, ensuring the user can understand the nuances of the analysis.
- Thoroughness and comprehensiveness in covering all relevant aspects of style, voice, and tone.
- Actionability of insights, providing the user with clearly interpretable and applicable findings.
  [/success_qualities]

[stakes] Producing a high-quality analysis may assist the user in improving their writing, editing, or analytical work, leading to better content creation and more effective communication. Failure to provide a detailed and accurate analysis could result in a lack of actionable insights, potentially affecting the quality of the user's work and decisions. [/stakes]

[output_format] Structured report with sections for Introduction, Methodology (explaining NLP techniques used), Analysis (detailing findings on style, voice, and tone), and Conclusion. Each section should be clearly labeled and use bullet points or short paragraphs for clarity. [/output_format]

[PASTE YOUR TEXT HERE]
```

### MegaPrompt for Creating a LLM Business Partner

```markdown
[persona] An experienced business consultant with strong expertise in strategic planning, business development, financial analysis, and operational efficiency. The AI should be professional, insightful, and supportive, acting as a trusted advisor. [/persona]

[considerations] The user likely wants actionable advice on addressing a specific business challenge or opportunity. They might be looking for strategic insights, practical recommendations, or solutions that consider both short-term and long-term perspectives. The user could be a business owner, manager, or entrepreneur seeking to improve their business operations, expand their market presence, or resolve existing problems. [/considerations]

[task_overview] Provide comprehensive and strategic business advice to help the user make informed decisions, improve their business operations, and achieve their specific goals. [/task_overview]

[steps]

1. Ask the user for more specific details about their business challenge or opportunity to tailor the advice accurately.
2. Assess the current state of the business, identifying strengths, weaknesses, opportunities, and threats (SWOT analysis).
3. Provide strategic recommendations based on the assessment, emphasising actionable and practical steps.
4. Offer insights on potential risks and mitigation strategies for the proposed plan.
5. Suggest tools, resources, or frameworks that can help implement the recommendations effectively.
6. Encourage the user to seek feedback and measure progress to iterate and improve on the strategy.
   [/steps]

[constraints]

- Avoid overly technical jargon that might confuse the user; keep the language clear and straightforward.
- Do not provide legal or financial advice that requires professional certification.
- Ensure the recommendations are applicable and realistic within the user’s likely business context.
  [/constraints]

[success_qualities]

1. Clear and actionable recommendations that address the user’s specific business needs.
2. Insightful analysis that identifies key issues and opportunities within the business.
3. Practical steps that the user can implement to achieve measurable improvements.
4. Supportive and professional tone that builds trust and confidence in the advice provided.
   [/success_qualities]

[stakes] Understanding the stakes is crucial; providing effective advice could significantly impact the user's business success, leading to increased profitability, sustainable growth, and competitive advantage. Poor advice could result in wasted resources, missed opportunities, or even business failure. The AI's ability to share pertinent, insightful advice could empower the user and lead to transformative business results. [/stakes]

[output_format] A structured response with clear sections: Introduction (acknowledging their request), Follow-up Questions (to gather more details), Analysis (presenting the SWOT analysis), Recommendations (strategic advice), Risk Mitigation (potential risks and solutions), Tools and Resources (suggestions for implementation), and Conclusion (encouraging next steps and offering support for follow-up questions). [/output_format]
```

## Optimal Models:

- GPT4-T/o
- Claude 3 Sonnet/Opus
- Gemini 1.5 Advanced/Pro/Flash
- Mistral Large
- Llama3 70b fp16^
- Command R+
- DBRX

See [Free Models and Playgrounds](https://takara.ai/open-source/prompt-engineering/prompt-guide/#free-models-and-playgrounds) for links to these.
Avoid heavily quantised models down to q4 and q2.

---

## Limitations:

### Lost in the Middle

Large language models (LLMs) exhibit a tendency to remember the information presented at the beginning and end of a context window more effectively than that in the middle. This phenomenon is particularly notable in decoder-only models like GPT. According to research such as the study presented in [Lost in the Middle: How Language Models Use Long Contexts](https://arxiv.org/pdf/2307.03172), information situated in the middle of very large prompts is often less effectively retained and utilized. This can lead to critical details being overlooked or misinterpreted when working with extensive input prompts.

**Potential Workarounds:**

- **Prompt Chunking:** By breaking down the large prompt into smaller, more manageable chunks, we can help ensure that essential information is positioned closer to the beginning or end of each chunk, thus improving retention and comprehension.
- **Context Window Management:** Keeping prompts within the context window size that the model was trained on can enhance performance. This involves structuring prompts to fit within the optimal length that the model can handle effectively, which is typically shorter than the maximum context window size.

### Cognitive Overload

When dealing with mega-prompts, there is a risk of cognitive overload for the LLM, where the sheer volume of information can overwhelm the model’s processing capabilities. This can result in degraded performance, as the model struggles to prioritize and recall relevant details amid the noise.

### Mitigation Strategies

- **Hierarchical Prompting:** Organizing information hierarchically can help the model navigate large prompts more effectively. By structuring prompts in a way that highlights key points and uses sub-sections for details, the model can better prioritize information.
- **Summarization:** Including summaries or concise overviews at regular intervals within the prompt can reinforce important concepts and ensure that they remain accessible throughout the processing sequence.

### Contextual Drift

With very large prompts, there is a risk of contextual drift, where the model’s focus shifts away from the primary topic due to the introduction of extensive background information or tangential details. This can dilute the relevance of the model’s responses and lead to outputs that are off-topic or less coherent.

### Addressing Contextual Drift

- **Reiteration of Key Points:** Repeating essential information and questions at strategic points within the prompt can help maintain focus and ensure that the model stays aligned with the primary topic.
- **Focused Queries:** Structuring prompts to include focused queries or instructions can help guide the model’s attention and reduce the likelihood of drift.

### Computational Resources

Handling large prompts requires significant computational resources, including memory and processing power. This can pose practical limitations, especially when deploying LLMs in environments with constrained resources.

### Optimization Techniques

- **Resource Allocation:** Allocating adequate computational resources and optimizing the model’s runtime environment can help manage the demands of processing large prompts.
- **Efficient Prompt Design:** Designing prompts to be as efficient as possible, by removing redundancy and focusing on essential information, can reduce the computational load.

### Model-Specific Limitations

Different LLM architectures have varying capabilities and limitations regarding prompt handling. For instance, transformer-based models like GPT may have different optimal prompt lengths and memory characteristics compared to other architectures such as bidirectional models.

### Tailored Approaches

- **Model-Specific Tuning:** Understanding the specific characteristics and limitations of the LLM being used can inform better prompt design and handling strategies.
- **Experimentation and Testing:** Conducting thorough experimentation with different prompt lengths and structures can help identify the optimal configuration for each specific model.

# メガプロンプト
