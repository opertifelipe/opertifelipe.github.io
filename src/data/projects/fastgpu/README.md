---
title: fastgpu
description: Your remote GPU, in your local workflow. A Rust CLI for persistent RunPod workspaces, remote development and model inference.
image: /images/projects/fastgpu-logo.svg
path: projects/fastgpu/README.md
publishedAt: 2026-11-19
---

<h1><img class="product-logo" src="/images/projects/fastgpu-logo.svg" alt="fastgpu" width="852" height="260" /></h1>

**Your remote GPU, in your local workflow.**

I built fastgpu to make a cloud GPU feel like an extension of my computer. It brings RunPod compute, persistent storage, SSH, local VS Code and model inference into one command-line workflow. Keep using your own tools and training scripts; fastgpu handles the environment around them.

[Get started on GitHub](https://github.com/opertifelipe/fastgpu) · [Read the CLI manual](https://github.com/opertifelipe/fastgpu/blob/main/docs/CLI.md)

## Keep your workspace. Choose your compute.

- **Return to your work.** Projects, datasets, checkpoints and model caches live on a RunPod Network Volume and remain available when you recreate the GPU Pod.
- **Work from your computer.** Open a remote terminal or a project in local VS Code with Remote - SSH. Move files with explicit push and pull commands backed by rsync.
- **Serve your models locally.** Deploy compatible models with llama.cpp, Ollama or vLLM, then reach the remote inference API through an SSH tunnel on localhost.
- **Control the lifecycle.** Preview startup with a dry run, set an hourly compute price cap and explicitly terminate the Pod when you finish.

GPU selection considers availability in the volume's data center, memory and CUDA requirements, the selected size band and the configured price cap. Storage is billed separately from compute. Closing a terminal or VS Code leaves the Pod running; `fastgpu down` terminates it while retaining the Network Volume.

## From a workspace to an experiment

The current target is Linux x86-64. You need a RunPod account, API credentials, a Network Volume, OpenSSH and rsync. Building from source also requires Rust 1.91 or later, Cargo, a C toolchain and make.

Build and install from a source checkout:

```sh
make install
export PATH="$HOME/.local/bin:$PATH"
```

After [configuring credentials](https://github.com/opertifelipe/fastgpu/blob/main/docs/CLI.md#credentials-and-first-setup), select your volume and start a workspace:

```sh
fastgpu volumes list
fastgpu init --volume ID_OR_NAME
fastgpu up --small --skip-model --dry-run
fastgpu up --small --skip-model --max-price 1.50
fastgpu shell
fastgpu code
```

Replace `ID_OR_NAME` with your volume's ID or unique name. Run training with your preferred framework and save outputs on persistent storage. A saved GGUF can then be served with `fastgpu deploy`; compatible checkpoints can use vLLM. Model format, context length and GPU memory determine which deployments fit. One managed inference service runs at a time.

## How it is built

A Rust executable provides both the local CLI and the remote worker. Clap defines the command interface, Serde handles configuration and deployment manifests, Reqwest with rustls talks to RunPod, and Tokio coordinates asynchronous work. OpenSSH and rsync provide connections, tunnels and transfers.

The Docker image packages the worker and inference tools on Ubuntu with CUDA. Software lives in the image; the persistent home directory, repositories, weights and caches live on the attached volume. This separation lets a replacement Pod reuse the workspace. Model deployment passes configuration to the remote worker, which manages inference through Supervisor and checks readiness before the local client opens its tunnel.

## Verification and source

The repository includes Rust tests for GPU selection, dry runs, lifecycle and storage protections, deployment validation, model verification and SSH workflows, using local API and process fixtures. `make test` runs formatting checks, Rust tests and Clippy; separate npm tests exercise the launcher and offline archive installation. GPU validation and its limits are documented in the [CLI manual](https://github.com/opertifelipe/fastgpu/blob/main/docs/CLI.md#validation-and-current-limits).

fastgpu is my personal open-source project, licensed under GPL-3.0-only. Explore the [source repository](https://github.com/opertifelipe/fastgpu) and [design decisions](https://github.com/opertifelipe/fastgpu/blob/main/DESIGN.md).
