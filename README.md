# opertifelipe.github.io

Felipe Operti's personal website, built with Astro and published on GitHub Pages.

The site has a single interface: a monochrome, Bash-like CLI. Visitors can type commands or click the names printed by the terminal. Markdown documents are rendered inline by `less`, including full-colour images.

## Virtual filesystem

~~~text
~
├── about.md
├── blog/
├── contacts.md
├── cv/
├── projects/
│   └── honai/
└── why.md
~~~

The main commands are `help`, `ls`, `cd`, `pwd`, `cat`, `less`, `open`, `tree`, `file`, `download`, `history` and `clear`. Markdown documents and the CV PDF can be downloaded with `download`. Tab completes commands and paths; arrow keys recall command history.

## Local development

Requires Node.js 22.12 or newer and npm.

~~~sh
npm install
npm run dev
~~~

For a production check:

~~~sh
npm run build
npm run preview
~~~

## Content

The terminal documents live in `src/data/terminal`. About, contacts, CV, the HonAI project and the blog introduction are ordinary Markdown files.

To publish an article, create a date-prefixed Markdown file such as `YYYY-MM-DD-article-title.md` in `src/data/blog`:

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

Published articles automatically appear as `.md` files inside `~/blog` and can be read with `less article-name.md`.

## Deployment

`.github/workflows/deploy.yml` builds and deploys the static site through GitHub Actions whenever `main` is updated. GitHub Pages must use **GitHub Actions** as its source.

The production URL is https://opertifelipe.github.io.

© Felipe Operti. All rights reserved.
