/**
 * Apply no-em-dash-content rule to docs MDX files only.
 * Skips slug and non-LLM frontmatter fields.
 * Skips fenced code blocks.
 * Run: node scripts/fix-em-dashes-docs.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const docsDir = path.join(root, 'docs');

const LLM_FRONTMATTER_KEYS = new Set(['title', 'description']);
const SKIP_FRONTMATTER_PREFIXES = ['slug:', 'tags:', 'authors:', 'image:', 'draft:', 'sidebar_'];

function walkMdx(dir, files = []) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkMdx(full, files);
    else if (entry.name.endsWith('.mdx')) files.push(full);
  }
  return files;
}

function quoteYamlValue(value) {
  const escaped = value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  return `"${escaped}"`;
}

function fixEmAndEn(text, {titleStyle = false} = {}) {
  let s = text;

  s = s.replace(/\*\*([A-D])\s—\s/g, '**$1: ');
  s = s.replace(
    /([①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳])–([①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳])/g,
    '$1-$2',
  );
  s = s.replace(/(\d+)–(\d+)/g, '$1-$2');
  s = s.replace(/(\d{4})\s–\s/g, '$1 - ');
  s = s.replace(/\s–\sPresent/g, ' - Present');
  s = s.replace(/–/g, '-');

  if (titleStyle) {
    s = s.replace(/\s—\s/g, ': ');
  } else {
    s = s.replace(/(\b(?:Section|Part|Phase)\s+\d+)\s—\s/gi, '$1: ');
    s = s.replace(/^(#{1,6}\s.+)$/gm, (line) => line.replace(/\s—\s/g, ': '));
    s = s.replace(/summary="([^"]+)"/g, (_, inner) =>
      `summary="${inner.replace(/\s—\s/g, ': ')}"`,
    );
    s = s.replace(/\s—\s/g, ', ');
  }

  s = s.replace(/—/g, titleStyle ? ': ' : ', ');
  return s;
}

function fixFrontmatter(frontmatter) {
  return frontmatter
    .split('\n')
    .map((line) => {
      if (SKIP_FRONTMATTER_PREFIXES.some((p) => line.startsWith(p))) return line;

      const match = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
      if (!match) return line;

      const [, key, rawVal] = match;
      if (!LLM_FRONTMATTER_KEYS.has(key)) return line;

      const unquoted = rawVal.replace(/^["']|["']$/g, '');
  const fixed = fixEmAndEn(unquoted, {titleStyle: key === 'title'});
  const needsQuotes =
    fixed.includes(':') ||
    fixed.includes('#') ||
    fixed.includes(',') ||
    /[[\]{}|>&*!?@`]/.test(fixed);
  return `${key}: ${needsQuotes ? quoteYamlValue(fixed) : fixed}`;
    })
    .join('\n');
}

function fixBody(body) {
  const parts = body.split(/(```[\s\S]*?```)/g);
  return parts.map((part, i) => (i % 2 === 1 ? part : fixEmAndEn(part))).join('');
}

let changedFiles = 0;
let removed = 0;

for (const file of walkMdx(docsDir)) {
  const before = fs.readFileSync(file, 'utf8');
  const match = before.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) continue;

  const frontmatter = fixFrontmatter(match[1]);
  const body = before.slice(match[0].length);
  const after = `---\n${frontmatter}\n---${fixBody(body)}`;

  if (after === before) continue;

  const countBefore = (before.match(/[—–]/g) || []).length;
  const countAfter = (after.match(/[—–]/g) || []).length;
  removed += countBefore - countAfter;
  fs.writeFileSync(file, after);
  changedFiles += 1;
  console.log(`${path.relative(root, file)}: ${countBefore - countAfter} removed, ${countAfter} left`);
}

console.log(`\nDone. ${changedFiles} files updated, ${removed} dashes replaced.`);
