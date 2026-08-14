---
title: HonAI
description: Machine learning for honey production.
path: projects/honai/README.md
---

# HonAI

![Bee collecting pollen from a yellow flower](/images/honai-cover.webp)

HonAI is a cloud-native machine-learning system designed to predict honey production from historical, environmental and hive data.

Honey production depends on a complex interaction between climate, location, weather conditions and hive health. Beekeepers have traditionally estimated yields through observation and experience, but these signals are difficult to combine consistently.

HonAI turns historical production and environmental variables into actionable predictions. Its goal is to support planning, optimise production and protect colony wellbeing without replacing the beekeeper's expertise.

## Architecture

The system separates scheduled prediction workloads from the serving API, while Azure SQL acts as the shared operational data layer.

### Batch prediction

![HonAI batch prediction architecture](/images/honai-batch.webp)

Sensor and environmental inputs are processed by machine-learning models running in Azure Container Apps. Forecasts are persisted to Azure SQL for downstream use.

### API and monitoring

![HonAI API and monitoring architecture](/images/honai-api.webp)

A FastAPI service exposes predictions and operational data, while Grafana provides visualisation and monitoring.

## Stack

- Machine Learning
- Azure Container Apps
- Azure SQL
- FastAPI
- Docker
- Grafana
- Python

For further information, visit [FraleAnalitica](https://www.fraleanalitica.it/).
