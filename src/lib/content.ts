const publicationDateFormatter = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export const formatPublicationDate = (date: Date) => publicationDateFormatter.format(date);

export const toIsoDate = (date: Date) => date.toISOString().slice(0, 10);

export const projectSlug = (path: string) => path.split('/')[1];
