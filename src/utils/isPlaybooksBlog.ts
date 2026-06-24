export function isPlaybooksBlog(permalink: string): boolean {
  return permalink === '/playbooks' || permalink.startsWith('/playbooks/');
}
