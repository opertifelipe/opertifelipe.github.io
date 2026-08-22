# opertifelipe.github.io

Felipe Operti's personal website, built with Astro and published on GitHub Pages.

The site uses separate pages for Home, About, CV, Projects, Blog and Contacts, connected by a shared navigation. Projects and published articles have index and detail pages; both indexes support title search.

## Local development

Requires Node.js 22.12 or newer and npm.

~~~sh
npm install
npm run dev
~~~

Run the production checks with:

~~~sh
npm run build
npm run preview
~~~

## Content

Content lives under `src/data` and is divided into three Astro collections:

- `pages`: About, Contacts and CV;
- `projects`: one `README.md` for each project;
- `blog`: articles organised by publication year and month.

To publish an article, create `src/data/blog/YYYY/MM/DD-article-title.md`:

~~~md
---
title: A descriptive article title
description: A short summary.
publishedAt: 2026-08-14
tags:
  - artificial-intelligence
draft: false
---

Article content starts here.
~~~

Published articles automatically appear on the Blog page and can be searched by title.

A project lives in `src/data/projects/project-slug/README.md` and requires a title, description, path and publication date. Projects automatically appear on the Projects page.

## Deployment

`.github/workflows/deploy.yml` builds and deploys the static site through GitHub Actions whenever `main` is updated. GitHub Pages must use **GitHub Actions** as its source.

The production URL is https://opertifelipe.github.io.

© Felipe Operti. All rights reserved.
