---
title: TRL — TorchAO INT4 QAT
description: Open-source contribution adding TorchAO quantization-aware training to TRL.
path: projects/trl/README.md
---

# TRL — TorchAO INT4 QAT

This proposed open-source contribution adds opt-in **TorchAO INT4 weight-only quantization-aware training (QAT)** to Hugging Face TRL's `SFTTrainer`. The work is currently available as a draft pull request and follows the upstream TRL contribution requirements.

QAT simulates the rounding and clipping of the final low-bit model during training. The optimiser can therefore adapt the weights to their future INT4 representation, reducing the quality loss that can occur with post-training quantisation while retaining the deployment benefits of a compact model.

## Contribution

The public API introduces `use_torchao_qat=True` in `SFTConfig` and keeps TorchAO as an optional dependency. Existing TRL users see no behavioural or installation change unless they explicitly enable QAT.

When enabled, the trainer validates the model and transforms compatible linear layers into fake-quantized modules before Trainer and Accelerate wrap it. The forward pass simulates the rounding behaviour of INT4 weights, but parameters and gradients remain trainable in BF16. This lets the optimiser adapt the weights to their future low-bit representation while preserving the normal optimiser and checkpoint lifecycle.

Conversion is deliberately separated from training. Checkpoints retain reusable floating-point weights for resume, while a later TorchAO conversion replaces the fake-quantized modules and packs the weights for INT4 inference. Keeping preparation and conversion explicit also makes it possible to validate the final packing format and kernels on the target hardware.

## Supported contract

The initial scope supports full-parameter BF16 training with INT4 groups of 128 weights. It checks that TorchAO is installed, that the model has not already been quantised, and that every linear input dimension is compatible with the group size. PEFT, LoRA and QLoRA are rejected rather than silently producing an unsupported training configuration.

The group size follows TorchAO's backend default for the supported release and must remain consistent between fake quantisation and deployment conversion. Changing it after training would expose the deployed model to a different rounding pattern from the one it learned to compensate for.

## Verification

The contribution adds ten focused tests built around a real, locally constructed Qwen2 causal language model rather than mocked layers. They cover optional dependency behaviour, invalid dtype and dimensions, model preparation, finite forward and backward passes, parameter updates, checkpoint resume, INT4 conversion and inference on supported NVIDIA hardware. User documentation includes installation, training, resume and deployment examples, and the repository's pre-commit checks pass on the contribution branch.

## Stack

- Python and PyTorch
- Hugging Face TRL and Transformers
- TorchAO
- Accelerate
- pytest

See the proposed contribution in [opertifelipe/trl#1](https://github.com/opertifelipe/trl/pull/1).
