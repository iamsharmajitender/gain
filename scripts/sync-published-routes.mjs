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
const HOMEPAGE_INSIGHTS_LIMIT = 8;

const OUTPUT = path.join(root, 'src/data/publishedRoutes.generated.ts');
const LATEST_INSIGHTS_OUTPUT = path.join(root, 'src/data/latestInsights.generated.ts');
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

function scanLatestInsights() {
  const posts = [];

  for (const filePath of readMdxFiles('docs/insights')) {
    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatter = parseFrontmatter(content);
    if (!includeDrafts && isDraft(frontmatter)) {
      continue;
    }

    const slug = parseSlug(frontmatter, filePath);
    if (!slug || slug === '/') {
      continue;
    }

    posts.push({
      title: parseYamlValue(frontmatter, 'title'),
      date: parseInsightDate(filePath, frontmatter),
      readTime: estimateReadingTime(content),
      description: parseYamlValue(frontmatter, 'description'),
      typeTag: findTypeTag(parseTags(frontmatter)),
      to: `/insights/${slug}`,
    });
  }

  return posts
    .sort((left, right) => {
      const byDate = right.date.localeCompare(left.date);
      if (byDate !== 0) {
        return byDate;
      }

      return left.title.localeCompare(right.title);
    })
    .slice(0, HOMEPAGE_INSIGHTS_LIMIT);
}

function writeLatestInsights(latestInsights) {
  const body = `/* eslint-disable */
/* AUTO-GENERATED by scripts/sync-published-routes.mjs — do not edit manually */

import type {TypeTagId} from '@site/src/data/insightTags';

export interface LatestInsight {
  title: string;
  date: string;
  readTime: number;
  description: string;
  typeTag: TypeTagId;
  to: string;
}

export const latestInsights: readonly LatestInsight[] = ${JSON.stringify(latestInsights, null, 2)};
`;

  fs.writeFileSync(LATEST_INSIGHTS_OUTPUT, body);
  console.log(`[sync-published-routes] Wrote ${path.relative(root, LATEST_INSIGHTS_OUTPUT)}`);
  console.log(
    `  homepage insights: ${latestInsights.length} ${includeDrafts ? '(including drafts)' : 'published'}`,
  );
}

function writeGenerated({frameworkSlugs, insightTags, insightTypeTags}) {
  const body = `/* eslint-disable */
/* AUTO-GENERATED by scripts/sync-published-routes.mjs — do not edit manually */

export const publishedFrameworkSlugs: readonly string[] = ${JSON.stringify(frameworkSlugs, null, 2)};

export const publishedInsightTags = ${JSON.stringify(insightTags, null, 2)} as const;

export const publishedInsightTypeTags = ${JSON.stringify(insightTypeTags, null, 2)} as const;
`;

  fs.writeFileSync(OUTPUT, body);
  console.log(`[sync-published-routes] Wrote ${path.relative(root, OUTPUT)}`);
  console.log(`  frameworks: ${frameworkSlugs.length} published slugs`);
  console.log(`  insights: ${insightTags.length} published domain tags`);
  console.log(`  insight voice tags: ${insightTypeTags.length} published`);
}

const latestInsights = scanLatestInsights();

writeGenerated({
  frameworkSlugs: scanFrameworks(),
  insightTags: scanInsightTags(),
  insightTypeTags: scanInsightTypeTags(),
});
writeLatestInsights(latestInsights);
