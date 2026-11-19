# opertifelipe.github.io

Felipe Operti's personal website, built with Astro and published on GitHub Pages.

The site uses separate pages for Home, About, CV, Projects and Contacts, connected by a shared navigation. Projects have an index with image previews and title search, plus individual detail pages.

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

Content lives under `src/data` and is divided into two Astro collections:

- `pages`: About, Contacts and CV;
- `projects`: one `README.md` for each project.

### Adding a project

Create a lowercase, hyphen-separated directory at `src/data/projects/project-slug/` and add its page as `README.md`:

~~~md
---
title: Project Name
description: A concise description of the project.
image: /images/projects/project-image.webp
path: projects/project-slug/README.md
publishedAt: 2026-08-22
---

# Project Name

Project content starts here.
~~~

The `path` value must match the directory and filename exactly. `publishedAt` controls the date displayed on the Projects page and its ordering.

For a public repository, inspect and link directly to it. Describe the relevant architecture, data flow, algorithms or models, training and evaluation, infrastructure, deployment and testing, but include only claims supported by the repository.

For a private repository, keep the page concise and high-level. Do not expose source code, internal paths, private APIs, configuration values or implementation-specific operational details.

Store project images under `public/images/projects/` and reference them with a path such as `/images/projects/project-image.webp`. The required `image` field selects the preview displayed alongside the project name in the index and the image used in page sharing metadata.

Before publishing:

1. Check the title, description, path and publication date.
2. Check the repository link, other links and images.
3. Run `npm run build`.

Projects automatically appear on the Projects page, are ordered by publication date and can be searched by title.

### Updating the CV PDF

`cv/Felipe_Operti_CV.tex` is versioned in the public repository. To compile it locally, install XeLaTeX with the `moderncv` and Font Awesome packages, then run:

~~~sh
npm run cv:pdf
~~~

The command writes the PDF to `public/Felipe_Operti_CV.pdf`. Run it before committing the CV, then commit both the LaTeX source and the generated PDF. The deployment workflow publishes the committed PDF at `/Felipe_Operti_CV.pdf`, linked from the CV page. The LaTeX source remains visible on GitHub.

## Deployment

`.github/workflows/deploy.yml` builds and deploys the static site through GitHub Actions whenever `main` is updated. GitHub Pages must use **GitHub Actions** as its source.

The production URL is https://opertifelipe.github.io.

© Felipe Operti. All rights reserved.
