/**
 * Scans docs for `draft: true` front matter and writes publish state used by nav/footer.
 * Run before `docusaurus start` / `docusaurus build` so links only target live routes.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const DOMAIN_TAG_IDS = [
  'system-architecture',
  'platforms-engineering',
  'ai-intelligence',
  'governance-trust',
];

const TYPE_TAG_IDS = ['pov', 'arch', 'lrn', 'exp'];
const SERIES_TAG_IDS = ['system-design', 'under-the-hood'];
const HOMEPAGE_INSIGHTS_LIMIT = 8;

const OUTPUT = path.join(root, 'src/data/publishedRoutes.generated.ts');
const LATEST_INSIGHTS_OUTPUT = path.join(root, 'src/data/latestInsights.generated.ts');
const DRAFT_INSIGHTS_OUTPUT = path.join(root, 'src/data/draftInsights.generated.ts');
const includeDrafts = process.argv.includes('--include-drafts');

function readMdxFiles(dir) {
  const abs = path.join(root, dir);
  if (!fs.existsSync(abs)) {
    return [];
  }

  const files = [];

  function walk(current) {
    for (const entry of fs.readdirSync(current, {withFileTypes: true})) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
        files.push(full);
      }
    }
  }

  walk(abs);
  return files;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match?.[1] ?? '';
}

function isDraft(frontmatter) {
  return /^(?!\/\/)\s*draft:\s*true\s*$/m.test(frontmatter);
}

/** Opt out of homepage latestInsights cards (`homepage: false`). */
function isHomepageExcluded(frontmatter) {
  return /^(?!\/\/)\s*homepage:\s*false\s*$/m.test(frontmatter);
}

function parseSlug(frontmatter, filePath) {
  const slugMatch = frontmatter.match(/^slug:\s*(.+)$/m);
  if (slugMatch) {
    return slugMatch[1].trim().replace(/^['"]|['"]$/g, '');
  }

  return path.basename(filePath, path.extname(filePath));
}

function parseTags(frontmatter) {
  const tags = new Set();

  const blockMatch = frontmatter.match(/^tags:\s*\n((?:[ \t]+-\s+.+\n?)+)/m);
  if (blockMatch) {
    for (const line of blockMatch[1].split('\n')) {
      const tagMatch = line.match(/-\s+(.+?)\s*$/);
      if (tagMatch) {
        tags.add(tagMatch[1].trim().replace(/^['"]|['"]$/g, ''));
      }
    }
    return tags;
  }

  const inlineMatch = frontmatter.match(/^tags:\s*\[(.+)\]\s*$/m);
  if (inlineMatch) {
    for (const part of inlineMatch[1].split(',')) {
      const tag = part.trim().replace(/^['"]|['"]$/g, '');
      if (tag) {
        tags.add(tag);
      }
    }
  }

  return tags;
}

function scanFrameworks() {
  const slugs = new Set();

  for (const filePath of readMdxFiles('docs/frameworks')) {
    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatter = parseFrontmatter(content);
    if (isDraft(frontmatter)) {
      continue;
    }

    const slug = parseSlug(frontmatter, filePath);
    if (slug && slug !== '/') {
      slugs.add(slug);
    }
  }

  return [...slugs].sort();
}

function scanInsightTags() {
  const tags = new Set();

  for (const filePath of readMdxFiles('docs/insights')) {
    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatter = parseFrontmatter(content);
    if (isDraft(frontmatter)) {
      continue;
    }

    for (const tag of parseTags(frontmatter)) {
      if (DOMAIN_TAG_IDS.includes(tag)) {
        tags.add(tag);
      }
    }
  }

  return [...tags].sort();
}

function scanInsightTypeTags() {
  const tags = new Set();

  for (const filePath of readMdxFiles('docs/insights')) {
    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatter = parseFrontmatter(content);
    if (isDraft(frontmatter)) {
      continue;
    }

    for (const tag of parseTags(frontmatter)) {
      if (TYPE_TAG_IDS.includes(tag)) {
        tags.add(tag);
      }
    }
  }

  return TYPE_TAG_IDS.filter((id) => tags.has(id));
}

function scanInsightSeriesTags() {
  const tags = new Set();

  for (const filePath of readMdxFiles('docs/insights')) {
    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatter = parseFrontmatter(content);
    // Series pills preview drafts in dev (npm start passes --include-drafts);
    // production builds gate them out until a series post is actually published.
    if (isDraft(frontmatter) && !includeDrafts) {
      continue;
    }

    for (const tag of parseTags(frontmatter)) {
      if (SERIES_TAG_IDS.includes(tag)) {
        tags.add(tag);
      }
    }
  }

  return SERIES_TAG_IDS.filter((id) => tags.has(id));
}

function parseYamlValue(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  if (!match) {
    return '';
  }

  return match[1].trim().replace(/^['"]|['"]$/g, '');
}

function parseInsightDate(filePath, frontmatter) {
  const explicitDate = parseYamlValue(frontmatter, 'date');
  if (explicitDate) {
    return explicitDate.slice(0, 10);
  }

  const folderMatch = filePath.match(/[/\\](\d{4}-\d{2}-\d{2})-/);
  if (folderMatch) {
    return folderMatch[1];
  }

  return '1970-01-01';
}

function estimateReadingTime(content) {
  const body = content.replace(/^---[\s\S]*?---/, '');
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function findTypeTag(tags) {
  return TYPE_TAG_IDS.find((id) => tags.has(id)) ?? 'arch';
}

function scanLatestPosts() {
  const posts = [];

  for (const filePath of readMdxFiles('docs/insights')) {
    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatter = parseFrontmatter(content);
    // Homepage cards are production surface: never include drafts, even with --include-drafts.
    if (isDraft(frontmatter)) {
      continue;
    }

    const slug = parseSlug(frontmatter, filePath);
    if (!slug || slug === '/') {
      continue;
    }

    const tags = parseTags(frontmatter);
    posts.push({
      title: parseYamlValue(frontmatter, 'title'),
      date: parseInsightDate(filePath, frontmatter),
      readTime: estimateReadingTime(content),
      description: parseYamlValue(frontmatter, 'description'),
      typeTag: findTypeTag(tags),
      to: `/insights/${slug}`,
      series: SERIES_TAG_IDS.filter((id) => tags.has(id)),
      homepageExcluded: isHomepageExcluded(frontmatter),
    });
  }

  return posts.sort((left, right) => {
    const byDate = right.date.localeCompare(left.date);
    if (byDate !== 0) {
      return byDate;
    }

    return left.title.localeCompare(right.title);
  });
}

/** Drop the scan-only fields so each entry matches the LatestInsight shape. */
function toInsightCard({series, homepageExcluded, ...card}) {
  return card;
}

/**
 * Group homepage cards into tabs.
 * - `all`: curated latest strip. Respects `homepage: false` (unchanged behavior).
 * - series tabs (`system-design`, `under-the-hood`): latest posts with that tag,
 *   INCLUDING `homepage: false` foundations posts (drafts are still excluded above).
 */
function buildLatestInsightsByTab(posts) {
  const byTab = {
    all: posts
      .filter((post) => !post.homepageExcluded)
      .slice(0, HOMEPAGE_INSIGHTS_LIMIT)
      .map(toInsightCard),
  };

  for (const seriesId of SERIES_TAG_IDS) {
    byTab[seriesId] = posts
      .filter((post) => post.series.includes(seriesId))
      .slice(0, HOMEPAGE_INSIGHTS_LIMIT)
      .map(toInsightCard);
  }

  return byTab;
}

function writeLatestInsights(latestInsightsByTab) {
  const body = `/* eslint-disable */
/* AUTO-GENERATED by scripts/sync-published-routes.mjs — do not edit manually */

import type {TypeTagId} from '@site/src/data/insightTags';

export type InsightTabId = 'all' | 'system-design' | 'under-the-hood';

export interface LatestInsight {
  title: string;
  date: string;
  readTime: number;
  description: string;
  typeTag: TypeTagId;
  to: string;
}

export const latestInsightsByTab: Record<InsightTabId, readonly LatestInsight[]> = ${JSON.stringify(latestInsightsByTab, null, 2)};

// Back-compat: the curated "All" strip.
export const latestInsights: readonly LatestInsight[] = latestInsightsByTab.all;
`;

  fs.writeFileSync(LATEST_INSIGHTS_OUTPUT, body);
  console.log(`[sync-published-routes] Wrote ${path.relative(root, LATEST_INSIGHTS_OUTPUT)}`);
  console.log(
    `  homepage insights: all=${latestInsightsByTab.all.length}` +
      SERIES_TAG_IDS.map((id) => `, ${id}=${latestInsightsByTab[id].length}`).join('') +
      ` (drafts excluded; series tabs include homepage: false)`,
  );
}

/**
 * Draft insights for the Sitemap Drafts tab.
 * Links are only emitted when `--include-drafts` (local `npm start`); production
 * builds list titles without hrefs so `onBrokenLinks: throw` stays green.
 */
function scanDraftInsights() {
  const posts = [];

  for (const filePath of readMdxFiles('docs/insights')) {
    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatter = parseFrontmatter(content);
    if (!isDraft(frontmatter)) {
      continue;
    }

    const slug = parseSlug(frontmatter, filePath);
    if (!slug || slug === '/') {
      continue;
    }

    const entry = {
      title: parseYamlValue(frontmatter, 'title'),
      date: parseInsightDate(filePath, frontmatter),
      description: parseYamlValue(frontmatter, 'description'),
      slug,
    };

    if (includeDrafts) {
      entry.href = `/insights/${slug}`;
    }

    posts.push(entry);
  }

  return posts.sort((left, right) => {
    const byDate = right.date.localeCompare(left.date);
    if (byDate !== 0) {
      return byDate;
    }

    return left.title.localeCompare(right.title);
  });
}

function writeDraftInsights(draftInsights) {
  const body = `/* eslint-disable */
/* AUTO-GENERATED by scripts/sync-published-routes.mjs — do not edit manually */

export interface DraftInsightPage {
  title: string;
  date: string;
  description: string;
  slug: string;
  /** Present only when sync ran with \`--include-drafts\` (local preview). */
  href?: string;
}

export const draftInsightPages: readonly DraftInsightPage[] = ${JSON.stringify(draftInsights, null, 2)};

export const draftInsightsLinkable = ${includeDrafts};
`;

  fs.writeFileSync(DRAFT_INSIGHTS_OUTPUT, body);
  console.log(`[sync-published-routes] Wrote ${path.relative(root, DRAFT_INSIGHTS_OUTPUT)}`);
  console.log(
    `  draft insights: ${draftInsights.length}` +
      (includeDrafts ? ' (links included)' : ' (titles only; no hrefs)'),
  );
}

function writeGenerated({frameworkSlugs, insightTags, insightTypeTags, insightSeriesTags}) {
  const body = `/* eslint-disable */
/* AUTO-GENERATED by scripts/sync-published-routes.mjs — do not edit manually */

export const publishedFrameworkSlugs: readonly string[] = ${JSON.stringify(frameworkSlugs, null, 2)};

export const publishedInsightTags = ${JSON.stringify(insightTags, null, 2)} as const;

export const publishedInsightTypeTags = ${JSON.stringify(insightTypeTags, null, 2)} as const;

export const publishedInsightSeriesTags = ${JSON.stringify(insightSeriesTags, null, 2)} as const;
`;

  fs.writeFileSync(OUTPUT, body);
  console.log(`[sync-published-routes] Wrote ${path.relative(root, OUTPUT)}`);
  console.log(`  frameworks: ${frameworkSlugs.length} published slugs`);
  console.log(`  insights: ${insightTags.length} published domain tags`);
  console.log(`  insight voice tags: ${insightTypeTags.length} published`);
  console.log(`  insight series tags: ${insightSeriesTags.length} published`);
}

const latestInsightsByTab = buildLatestInsightsByTab(scanLatestPosts());
const draftInsights = scanDraftInsights();

writeGenerated({
  frameworkSlugs: scanFrameworks(),
  insightTags: scanInsightTags(),
  insightTypeTags: scanInsightTypeTags(),
  insightSeriesTags: scanInsightSeriesTags(),
});
writeLatestInsights(latestInsightsByTab);
writeDraftInsights(draftInsights);
