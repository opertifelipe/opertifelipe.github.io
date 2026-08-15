---
title: Frontiers Journal Recommendation
description: NLP system that recommends the most suitable Frontiers journals for a paper.
path: projects/frontiers/README.md
---

# Frontiers Journal Recommendation

This project is an end-to-end NLP recommendation system developed for **Frontiers**. Given the text of a scientific paper or an uploaded PDF, it returns the three Frontiers journals most relevant to the manuscript.

## Dataset and preprocessing

The pipeline removes journals represented by fewer than two papers and creates a reproducible, journal-stratified train/test split with one third of the data reserved for evaluation. Text preprocessing normalises case, removes non-alphabetic characters, stop words and very short tokens.

Two parallel representation strategies are evaluated. The first represents the complete manuscript; the second uses the paper's declared keywords and falls back to five keywords extracted with TextRank when the source metadata is incomplete or unusually long.

## Representation and ranking

The experiment crosses both text strategies with three embedding families:

- **Word2Vec**, using spaCy document and token vectors;
- **TF-IDF**, with separate vocabularies for keywords and full documents;
- **Sentence-BERT**, using `all-mpnet-base-v2` and mean pooling across sentences or keywords.

Training creates one centroid for every journal by averaging the embeddings of its papers. At prediction time, the manuscript embedding is compared with every journal centroid using cosine similarity, and the three closest journals become the recommendation.

The six model variants are evaluated against a baseline that always returns the three most frequent journals. The report includes top-three accuracy, mean reciprocal rank and a classification report derived from the ranked recommendations, with precision, recall and F1 score. Sentence-BERT over the complete document produced the best overall results and was selected for deployment; TF-IDF remains a lighter alternative when latency matters more than recommendation quality.

## Delivery

The production path loads the precomputed Sentence-BERT journal centroids, embeds the submitted manuscript and returns the top three results through a FastAPI endpoint. A Streamlit interface accepts pasted text or extracts text from an uploaded PDF before calling the API.

Training all variants and producing the evaluation report completed in under one hour on a Tesla V100 system. Deployment is intentionally lighter: the FastAPI and Streamlit services run separately through Docker Compose and inference can run on a standard laptop without a GPU.

## Stack

- Python, Pandas and scikit-learn
- Sentence-BERT, Word2Vec and TF-IDF
- spaCy, NLTK and TextRank
- FastAPI and Streamlit
- PyMuPDF
- Docker Compose

The complete training, evaluation and deployment code is available in [opertifelipe/frontiers](https://github.com/opertifelipe/frontiers).
