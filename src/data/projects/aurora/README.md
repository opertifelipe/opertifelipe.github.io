---
title: Aurora
description: AI agent for personal finance and behavioral coaching.
path: projects/aurora/README.md
---

# Aurora

![Aurora personal finance assistant](/images/aurora-cover.png)

Aurora is an AI-powered personal finance assistant that combines transaction analysis with behavioral coaching. It was created for the **DevPunks hackathon at OGR in Turin**.

It turns raw financial data into a conversational view of spending habits. Users can import bank statements and receipts, add transactions in natural language, review and correct their history, compare spending across different periods, track budgets and goals, and receive practical insights inspired by the 70/20/10 approach.

## Data and user workflow

Aurora accepts bank statement PDFs, receipt images and free-form transaction descriptions. The ingestion layer extracts dates, descriptions and amounts, enriches them with categories and macro-categories, and persists the resulting movements so they remain available to both the dashboard and future conversations.

Users can correct imported records through a transaction-history interface, filter activity by year, month or week, and maintain a financial profile containing salary, essential expenses, available budget and saving goals. Weekly and monthly views then combine those persisted inputs with behavioural insights rather than treating every chat as an isolated exchange.

## How the agent works

Aurora is built with a **DeepAgents and LangGraph** architecture powered by OpenAI models. A root agent receives the conversation together with the authenticated user, financial profile and current frontend context. It can inspect attachments, invoke domain tools for persistence and analysis, update the profile, or delegate a broader analytical task.

For deeper analysis, the root agent coordinates three specialised subagents:

- a **category analyst** for spending patterns, recurring costs and subscriptions;
- a **period analyst** for weekly, monthly and full-history comparisons;
- a **goal and insights analyst** for financial goals, progress and actionable next steps.

The agents work on data stored by the application rather than relying only on conversation context. This lets Aurora connect each answer to transaction history, budgets and the user's financial profile.

Simple requests remain in the root agent and use the minimum required tool calls. Longer analyses are delegated with a focused objective and returned to the root for the final response. LangGraph streams both normal responses and delegated work to the web interface, avoiding a long blocking request while an analysis is running.

## Architecture

The product combines a React and Vite single-page application with a FastAPI backend and SQLModel persistence. The API manages authentication, user-scoped transactions, profiles, spending summaries, generated insights and streaming agent conversations. A dedicated statement-import flow handles PDFs, while image and conversational inputs enter through the agent runtime.

SQLite supports local development and demos, while Azure SQL can provide shared persistence. Azure AI Document Intelligence can assist document extraction, and ElevenLabs can turn generated insights into audio. A multi-stage Docker build compiles the frontend and serves it together with the API as a single deployable application.

## Stack

- DeepAgents, LangGraph and LangChain
- OpenAI
- Python, FastAPI and SQLModel
- React, TypeScript and Vite
- SQLite and Azure SQL
- Azure AI Document Intelligence
- ElevenLabs
- Docker and Typer

The complete implementation, tests and technical documentation are available in [opertifelipe/punkathon-agent](https://github.com/opertifelipe/punkathon-agent).
