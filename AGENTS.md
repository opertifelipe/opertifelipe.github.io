# Blog publishing instructions

Apply these rules whenever creating or editing a blog post.

## File structure

- Store published posts under `src/data/blog/YYYY/MM/`.
- Name each file `DD-title-slug.md`, using only the two-digit publication day followed by the lowercase, hyphen-separated title.
- Keep the filename title consistent with the post title.
- Set `publishedAt` to the same date represented by the year, month and day in the path.
- Set `draft: false` only when the post is ready to publish.

## Writing

- Keep posts short: aim for 150–300 words and do not exceed 400 words unless explicitly requested.
- Use one main title and continuous prose. Do not add subtitles or section headings unless explicitly requested.
- Write in a natural, personal voice that sounds human, avoiding generic introductions, repetition, inflated claims and formulaic AI phrasing.
- Be precise and technically correct. Explain only the details needed to support the main point.
- Verify technical claims and link directly to authoritative sources when appropriate.
- Preserve the language requested by the user or already used by the post.

## Before publishing

- Check that the year, month, day, title and filename agree.
- Check that every link works and that the post has a concise description and relevant tags.
- Run `npm run build` and resolve errors caused by the post before considering it published.

# Project documentation instructions

Apply these rules whenever creating or revising a project page.

## Public repositories

- Inspect the repository before writing and link directly to it.
- Be comprehensive and include relevant technical details such as architecture, data flow, algorithms or models, training and evaluation methodology, infrastructure, deployment and testing.
- Base every claim on the repository and explain the engineering decisions clearly without inventing results or capabilities.

## Private repositories

- Unless the user explicitly asks otherwise, keep the description concise and at a high level.
- Do not publish source code, code snippets, internal file paths, private APIs, configuration values or implementation-specific details.
- Describe the purpose, user-facing capabilities and broad technology areas without exposing detailed architecture or operational information.
- Verify repository visibility before deciding how much detail to include.
