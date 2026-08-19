---
title: "How Quantization-Aware Training Works with TorchAO and Gemma 4"
description: How QAT exposes a model to low-bit numerical error before producing a compact quantized checkpoint.
publishedAt: 2026-08-15
tags:
  - quantization
  - qat
  - torchao
  - gemma
draft: false
---

# How quantization-aware training works

![Neural network adapting from high-precision signals to compact quantized weights](/images/blog/qat-torchao-gemma-4.webp)

Quantization reduces the precision of model weights and activations, often from BF16 or FP32 to INT8 or INT4. This lowers storage, memory bandwidth and inference cost, but rounding many values onto a much smaller numerical grid can also reduce model quality.

Post-training quantization applies that transformation after training. The model never sees the error introduced by rounding and clipping. Quantization-aware training, or QAT, brings an approximation of the same error into the forward pass. The parameters remain trainable in high precision, but *fake quantization* makes the model operate as if selected tensors had already been quantized. Backpropagation can then adapt the weights to values that will survive the final low-bit representation.

[TorchAO](https://docs.pytorch.org/ao/stable/workflows/qat.html) exposes this lifecycle through `torchao.quantization.qat.QATConfig`:

```python
config = Int4WeightOnlyConfig(group_size=32)
quantize_(model, QATConfig(config, step="prepare"))
train(model)
quantize_(model, QATConfig(config, step="convert"))
```

`prepare` replaces eligible layers with fake-quantized versions. After training, `convert` produces the actual INT4 representation. QAT therefore improves deployment quality; it does not automatically provide the memory savings of INT4 during training because the trainable weights and gradients remain in high precision.

[Google's Gemma 4 QAT release](https://blog.google/innovation-and-ai/technology/developers-tools/quantization-aware-training-gemma-4/) is a useful real-world example. Google estimates that loading the 12B model requires approximately 26.7 GB in BF16 and 6.7 GB in Q4_0. The official [Gemma 4 12B instruction-tuned QAT checkpoint](https://huggingface.co/google/gemma-4-12B-it-qat-q4_0-gguf) is distributed as a 4-bit GGUF model for local runtimes such as llama.cpp. It shows the real purpose of QAT: make aggressive compression part of the optimisation problem instead of accepting its quality loss only at the end.
