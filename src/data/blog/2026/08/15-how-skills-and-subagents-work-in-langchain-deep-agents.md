---
title: "How Skills and Subagents Work in LangChain Deep Agents"
description: How Deep Agents combines progressive skill loading with isolated subagents for complex agent workflows.
publishedAt: 2026-08-15
tags:
  - deep-agents
  - langchain
  - agents
  - skills
draft: false
---

# How skills and subagents work in Deep Agents

![Central AI orchestrator delegating work to isolated subagents and modular skills](/images/blog/deep-agents-skills-subagents.webp)

[Deep Agents](https://docs.langchain.com/oss/python/deepagents/overview) is an opinionated agent harness from LangChain, built on LangChain components and the LangGraph runtime. It adds planning, filesystem-backed context management, and delegation to the normal tool-calling loop. Two of its most useful abstractions are skills and subagents, but they solve different problems.

A [skill](https://docs.langchain.com/oss/python/deepagents/skills) packages reusable knowledge and a workflow in a folder centred on `SKILL.md`, with optional scripts, references, and templates. Deep Agents does not place every skill in the model context. It initially exposes their descriptions, matches them against the request, and reads the full instructions only when one is relevant. This progressive disclosure keeps the prompt smaller while still giving the agent precise procedures when they are needed.

A [subagent](https://docs.langchain.com/oss/python/deepagents/subagents) isolates execution. The main agent delegates a focused task through the built-in `task` tool; the subagent works in a fresh context and returns a final report instead of all its intermediate searches, files, and tool results. This is useful for multi-step research or specialised analysis, but unnecessary for a simple operation where delegation only adds overhead.

The interesting part is their composition. A research subagent can receive only research tools and research skills, while another handles validation with a different prompt, model, and permissions. Custom subagents do not automatically inherit the parent's skills, so access must be assigned explicitly; their skill state also remains isolated. The default general-purpose subagent is the exception and inherits the main agent's skills.

Skills define how work should be done. Subagents decide where that work should happen. Used together, they make complex agent systems more modular without filling the supervisor's context with implementation noise.
