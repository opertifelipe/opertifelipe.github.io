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

## Machine learning

HonAI predicts the **cumulative change in weight per hive over the following seven days**. The regression features combine calendar seasonality, weight dynamics from the previous seven days, historical temperature, humidity and pressure, and the weather forecast for the prediction window.

The same seven-day feature schema is used during training and daily scoring. In training, the future weather and observed weight change are known and provide the target. During scoring, future environmental features are replaced by the OpenWeather forecast while the preceding seven days still come from real scale measurements.

## Data quality and feature engineering

Raw measurements are normalised by the number of hives so that scales representing different apiary sizes remain comparable. The pipeline deduplicates measurements by scale and timestamp, removes missing or physically implausible weight and weather readings, and derives the rate of weight change between consecutive observations.

Sudden weight changes are filtered through month-specific thresholds because plausible hive dynamics vary strongly across the beekeeping season. A geographic guardrail calculates the distance between consecutive coordinates and rejects a modelling window when a scale has moved more than three kilometres, preventing data from different environmental contexts from being merged into one time series.

Measurements are aggregated daily before the past window is built. The final features summarise minimum, mean, maximum and cumulative weight dynamics together with historical and forecast temperature, humidity and pressure. Training tolerates limited gaps in the past window but requires a complete future target; scoring records a diagnostic reason whenever a scale is excluded.

Model development compares **LightGBM and Random Forest** regressors. Feature importance reports support feature analysis, while Optuna tunes both model families using validation RMSE. Evaluation includes a complete holdout year to test temporal generalisation, with RMSE, MAE and R² recorded before the selected model is retrained on the full dataset. The production pipeline is currently configured for LightGBM.

LightGBM uses early stopping on an internal validation split to choose the number of boosting rounds without consulting the test data. Optuna studies and selected parameters are stored as reproducible artifacts, while the final model and both yearly and full-training metrics are versioned in Azure Blob Storage.

## Production workflow

Daily scoring downloads recent Aspromiele measurements, reuses cached forecasts when available, builds the validated feature matrix and loads the promoted model artifact. Predictions are written idempotently to Azure SQL and exported to Blob Storage, so rerunning the same scoring date replaces rather than duplicates results.

A parallel statistics dataset tracks every scale through weather retrieval, cleaning, feature engineering and prediction. It distinguishes successful predictions from known exclusions such as unavailable forecasts, invalid readings, movement or incomplete data, and flags unclassified failures for investigation. Scheduled reporting also creates seven-day and thirty-day operational views.

## Architecture

The system separates scheduled prediction workloads from the serving API, while Azure SQL acts as the shared operational data layer.

### Batch prediction

![HonAI batch prediction architecture](/images/honai-batch.webp)

Sensor and environmental inputs are processed by machine-learning models running in Azure Container Apps. Forecasts are persisted to Azure SQL for downstream use.

### API and monitoring

![HonAI API and monitoring architecture](/images/honai-api.webp)

A FastAPI service exposes predictions, diagnostics, evaluation views and aggregated reports. A Streamlit dashboard provides daily exploration and comparisons with observed weight changes, while Grafana supports operational visualisation and monitoring. The complete workflow is available through a Typer CLI covering training, hyperparameter search, feature analysis, scoring, reporting, database utilities, API and dashboard execution.

## Stack

- Machine Learning
- LightGBM and Random Forest
- Optuna
- Pandas and PyArrow
- OpenWeather
- Azure Container Apps
- Azure Blob Storage
- Azure SQL
- FastAPI
- Streamlit and Typer
- Docker
- Grafana
- Python

For further information, visit [FraleAnalitica](https://www.fraleanalitica.it/).
