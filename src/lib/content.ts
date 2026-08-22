const publicationDateFormatter = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export const formatPublicationDate = (date: Date) => publicationDateFormatter.format(date);

export const toIsoDate = (date: Date) => date.toISOString().slice(0, 10);

export const blogSlug = (id: string) =>
  id.split('/').at(-1)?.replace(/^\d{2}-/, '') ?? id;

export const projectSlug = (path: string) => path.split('/')[1];

export const excerptFromMarkdown = (markdown: string, wordLimit = 42) => {
  const words = markdown
    .replace(/^#{1,6}\s+.*$/gm, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/[`*_>#|~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ');

  const excerpt = words.slice(0, wordLimit).join(' ');
  return words.length > wordLimit ? `${excerpt}…` : excerpt;
};
