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

### Publishing a blog article

Start from `src/data/blog/2026/08/14-draft-article-template.md` or create a new file under `src/data/blog/YYYY/MM/`.

The filename must use the two-digit publication day followed by the lowercase, hyphen-separated title. For example, an article titled “A Descriptive Article Title” published on 22 August 2026 belongs at `src/data/blog/2026/08/22-a-descriptive-article-title.md`:

~~~md
---
title: A Descriptive Article Title
description: A concise summary of the article.
publishedAt: 2026-08-22
tags:
  - artificial-intelligence
draft: false
---

# A Descriptive Article Title

Article content starts here.
~~~

The year, month and day in the path must match `publishedAt`, and the filename slug must match the title. Keep `draft: true` while working and change it to `false` only when the article is ready.

Articles should normally contain 150–300 words and no more than 400 unless a longer format is intentional. Use one main title and continuous prose without additional headings unless they are necessary. Add only relevant tags and keep the description short.

Store article images under `public/images/blog/` and reference them with an absolute site path such as `/images/blog/article-image.webp`.

Before publishing:

1. Check that the path, filename, title and publication date agree.
2. Check every link and image.
3. Set `draft: false`.
4. Run `npm run build`.

Published articles automatically appear on the Blog page, are ordered by publication date and can be searched by title.

### Adding a project

Create a lowercase, hyphen-separated directory at `src/data/projects/project-slug/` and add its page as `README.md`:

~~~md
---
title: Project Name
description: A concise description of the project.
path: projects/project-slug/README.md
publishedAt: 2026-08-22
---

# Project Name

Project content starts here.
~~~

The `path` value must match the directory and filename exactly. `publishedAt` controls the date displayed on the Projects page and its ordering.

For a public repository, inspect and link directly to it. Describe the relevant architecture, data flow, algorithms or models, training and evaluation, infrastructure, deployment and testing, but include only claims supported by the repository.

For a private repository, keep the page concise and high-level. Do not expose source code, internal paths, private APIs, configuration values or implementation-specific operational details.

Store project images under `public/images/projects/` and reference them with a path such as `/images/projects/project-image.webp`.

Before publishing:

1. Check the title, description, path and publication date.
2. Check the repository link, other links and images.
3. Run `npm run build`.

Projects automatically appear on the Projects page, are ordered by publication date and can be searched by title.

## Deployment

`.github/workflows/deploy.yml` builds and deploys the static site through GitHub Actions whenever `main` is updated. GitHub Pages must use **GitHub Actions** as its source.

The production URL is https://opertifelipe.github.io.

© Felipe Operti. All rights reserved.
