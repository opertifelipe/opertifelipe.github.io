# opertifelipe.github.io

Felipe Operti's personal website, built with Astro and published on GitHub Pages.

The site has a single interface: a black-and-white, Bash-like CLI running as `felipe@galileo`. Visitors can type commands or click the names printed by the terminal. Markdown documents are rendered inline by `cat`, including full-colour images, and can be downloaded directly from the rendered view.

## Virtual filesystem

~~~text
~
├── about.md
├── cv/
│   ├── README.md
│   └── Felipe_Operti_CV.pdf
├── projects/
│   └── honai/
│       ├── README.md
│       └── images/
├── blog/
│   ├── README.md
│   └── YYYY-MM-DD-article-title.md
├── contacts.md
└── why.md
~~~

The home directory is listed in this deliberate order: About, CV, projects, blog, contacts and Why.

The main commands are `help`, `ls`, `cd`, `pwd`, `cat`, `open`, `tree`, `file`, `download`, `history` and `clear`.

- `cat file.md` renders Markdown and its images inside the terminal.
- `download file.md` downloads the Markdown source; the same action is available as a clickable button in the rendered document.
- `download Felipe_Operti_CV.pdf` downloads the CV.
- `cd path` changes directory without resetting the output. Bare `cd` and `clear` restore the landing screen.
- Tab completes commands and paths; arrow keys recall command history.

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

All site content lives under `src/data`. About, Why and contacts are top-level Markdown files, while CV, projects and blog content retain the same directory structure shown by the Explorer and Terminal.

To publish an article, create `src/data/blog/YYYY/MM/DD-article-title.md`, using the publication year and month as directories and the two-digit day in the filename:

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

Published articles automatically appear as `.md` files inside `~/blog`. They can be read with `cat YYYY-MM-DD-article-title.md` or downloaded with `download YYYY-MM-DD-article-title.md`.

## Deployment

`.github/workflows/deploy.yml` builds and deploys the static site through GitHub Actions whenever `main` is updated. GitHub Pages must use **GitHub Actions** as its source.

The production URL is https://opertifelipe.github.io.

© Felipe Operti. All rights reserved.
