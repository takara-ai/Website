---
sys:
  id: "3cuONluIAC5PywA8cXk9j7"
  updatedAt: "2025-01-23T17:52:10.761Z"
  createdAt: "2025-02-03T09:20:16.588Z"
  revision: 6
  space: "hmvebmrbwhsg"
  contentType: "blogPost"
date: "2025-01-23T17:52:10.761Z"
title: "SwarmFormer: Rethinking Efficient AI"
layout: "post"
menu: false
group: true
author:
  - id: "2pgo5PRjiuln3huH3DI1sb"
    contentType: "teamMember"
slug: "swarmformer"
publicationDate: "2025-01-23T00:00:00.000Z"
summary: "Takara.ai introduces SwarmFormer, a transformer architecture inspired by insect swarms that reduces model parameters by 94% while maintaining performance. Using local-global processing, it achieves 89% accuracy with just 6.7M parameters compared to BERT's 108M. This efficiency enables broader AI accessibility and applications across various domains, from edge devices to massive document processing."
featuredImage:
  assetType: "image/jpeg"
  url: "//images.ctfassets.net/hmvebmrbwhsg/5blATS3HaNAvMLJ8z6HbLl/403c1d795069401474ba69bf67d82071/crane-swarm-former.jpeg"
  title: "Cranes Forming a Swarm"
  description: "Cranes Forming a Swarm"
  size: 152889
  width: 1024
  height: 1024
---

We&#39;re proud to announce our first innovation of 2025 from the research team at Takara.ai: **SwarmFormer**, a new transformer architecture that fundamentally rethinks how we process information in AI models.

## A Different Approach to AI

The core idea behind SwarmFormer came from observing how nature handles complex problems. Just as swarms of bees or ants can solve sophisticated tasks through simple local interactions, we wondered: could we apply similar principles to make AI models more efficient?

Traditional transformer models process all information globally, which becomes computationally expensive as sequences get longer. SwarmFormer takes a different approach by combining _local processing_ with strategic _global communication_. This seemingly simple change has profound implications - our models use **up to 94% fewer parameters** while matching or exceeding traditional performance metrics.

## The Technical Innovation

The magic happens through what we call "hierarchical local-global processing", think of it like swarm-routing. Rather than having every part of the model interact with every other part, we organise information into clusters that can efficiently share information both locally and globally. This approach drastically reduces computational requirements while preserving model capabilities.

{{< contentful-hugo/embedded-asset title="Swarm Aggregation" description="Swarm Aggregation for the SwarmFormer blog." url="//images.ctfassets.net/hmvebmrbwhsg/1NDH1wsuRNIHmZvux9HKw9/6cac7955fda3baa4bfb19c00cd4e0f0c/swarm-aggregation.png" filename="swarm-aggregation.png" assetType="image/png" size="155053" width="1980" height="1038" parentContentType="blogPost" >}}

Our experiments show remarkable results. SwarmFormer-Base achieves **89% accuracy** on standard benchmarks using just 6.7M parameters - compared to BERT&#39;s 108M parameters for similar performance. This represents a 94% reduction in model size without sacrificing accuracy. Even our smaller 4.3M parameter model achieves 86% accuracy, demonstrating the architecture&#39;s efficiency at various scales.

## Real-World Impact

What excites us most is what this means for AI accessibility. The models train quickly on consumer hardware and can run on a wide range of devices. This efficiency translates directly to reduced infrastructure costs - **up to 70% in our initial testing**.

We&#39;re seeing promising applications across several areas:
- Processing large document collections efficiently
- Enabling sophisticated models on edge devices
- Making advanced AI capabilities accessible to organisations of all sizes
- Democratising AI research by enabling breakthroughs on consumer hardware, shifting innovation from large tech companies to broader scientific communities

The architecture&#39;s efficiency could make these applications accessible to underserved communities, aligning with our goal of transforming humanity. Furthermore SwarmFormer&#39;s reduced parameter count and computational efficiency translate to significant energy savings in AI deployments. By requiring less compute power and memory, these models can help organisations reduce their environmental impact while scaling AI capabilities. This architectural efficiency represents a step toward more sustainable AI development.

## Breaking New Ground

The efficiency gains from SwarmFormer&#39;s architecture have enabled some remarkable achievements. We&#39;ve successfully tested models with context windows spanning **tens of millions of tokens** - far beyond what&#39;s currently possible with traditional architectures. This opens up **new possibilities for processing and understanding massive documents** in their entirety.

In **computer vision**, our SwarmFormer-based models have already achieved **state-of-the-art results** on standard benchmarks while using significantly fewer parameters than existing approaches. Additionally, we&#39;re developing **breakthrough text-to-speech models** that require just a fraction of the compute and memory resources compared to current solutions.

These early results are encouraging, but we see them as just the beginning. SwarmFormer&#39;s **efficient and versatile architecture** is proving to be remarkably versatile across different domains, and we&#39;re excited to explore what else is possible.

We believe AI innovation should push the boundaries of what&#39;s possible while making the technology more accessible. SwarmFormer represents our first step toward that vision.

For those interested in the technical details, our research paper "[SwarmFormer: Local-Global Hierarchical Attention via Clustered Token Representations](https://takara.ai/papers/SwarmFormer-Local-Global-Hierarchical-Attention-via-Swarming-Token-Representations.pdf)" provides complete implementation details and mathematical foundations. We welcome collaboration and look forward to seeing how the community builds upon these ideas.

We also provide the model checkpoints and inference code so you can try it out and see how it works.

- Github: [Code](https://github.com/takara-ai/SwarmFormer)
- HuggingFace: [Models](https://huggingface.co/collections/takara-ai/swarmformer-678f8d9baec74b46f9aa3024)

Feel free to reach out to us at [research@takara.ai](mailto:research@takara.ai) for questions or potential collaborations.

---

### Citation

If you use SwarmFormer in your research, please cite:

```bibtex
@article{legg2025swarmformer,
  title={SwarmFormer: Local-Global Hierarchical Attention via Swarming Token Representations},
  author={Legg, Jordan and Sturmanis, Mikus and {Takara.ai}},
  journal={Takara.ai Research},
  year={2025},
  url={https://takara.ai/papers/SwarmFormer-Local-Global-Hierarchical-Attention-via-Swarming-Token-Representations.pdf}
}
```

