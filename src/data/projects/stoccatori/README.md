---
title: Stoccatori
description: Document workflow for agricultural storage partners and administrative teams.
path: projects/stoccatori/README.md
publishedAt: 2026-08-15
---

# Stoccatori

![Agricultural storage partners sending documents through a secure review workflow](/images/projects/stoccatori-document-workflow.webp)

Stoccatori is a web platform developed to collect and manage the documentation that agricultural storage partners send to the Barilla administrative team.

Each storage partner works with a defined set of companies and prepares a structured submission for each one. The workflow covers company documentation, crop records, privacy forms and supporting files, keeping the material organised throughout the collection and review process.

Administrators can manage users and company assignments, review submissions, retrieve documents, distribute reports and monitor completion statistics. The application separates operational and administrative responsibilities so that every participant sees the actions and information relevant to their role.

## Technology

The project is a containerised full-stack web application built with React and TypeScript on the frontend and Python and FastAPI on the backend. Relational data and uploaded documents are managed through cloud database and object-storage services.

The implementation lives in [opertifelipe/barilla](https://github.com/opertifelipe/barilla). The repository is private, so this overview intentionally excludes source code and internal architectural or operational details.
