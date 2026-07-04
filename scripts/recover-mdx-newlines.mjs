/**
 * Recover MDX files where newlines were collapsed after frontmatter.
 * Run once after a bad fix-em-dashes run. Target: listed insight drafts.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const FILES = [
  'docs/insights/2026-07-02-langchain-vs-langgraph/langchain-vs-langgraph.mdx',
  'docs/insights/2026-07-02-design-intent-router/design-intent-router.mdx',
  'docs/insights/2026-07-02-what-is-agentic-loop/what-is-agentic-loop.mdx',
  'docs/insights/2026-07-02-what-is-intent-router/what-is-intent-router.mdx',
  'docs/insights/2026-07-04-model-hosting-options-regulated-industries/model-hosting-options-regulated-industries.mdx',
];

function recover(text) {
  text = text.replace(/^---\r?\n([\s\S]*?)\r?\n---(?!\s*\n)/m, '---\n$1\n---\n\n');
  text = text.replace(/^---\r?\n([\s\S]*?)\r?\n---import/m, '---\n$1\n---\n\nimport');

  const inserts = [
    [/(# [^\n]+ Agents) (Teams )/g, '$1\n\n$2'],
    [/(# [^\n]+ Agents) (Enterprise )/g, '$1\n\n$2'],
    [/(# [^\n]+ End) (Demos )/g, '$1\n\n$2'],
    [/(# LLM Hosting[^\n]+) (Enterprise )/g, '$1\n\n$2'],
    [/(# How to Design[^\n]+) (You know)/g, '$1\n\n$2'],
    [/ workflow: (\| Pattern)/g, ' workflow:\n\n$1'],
    [/:::\n\n?/g, ':::'], // dedupe later
    [/; (# )/g, ';\n\n$1'],
    [/\. (# )/g, '.\n\n$1'],
    [/\. (## )/g, '.\n\n$1'],
    [/\. (:::)/g, '.\n\n$1'],
    [/\. (<Details)/g, '.\n\n$1'],
    [/(<\/Details>)(## )/g, '$1\n\n$2'],
    [/(<\/Details>)(---)/g, '$1\n\n$2'],
    [/(\*\*\*)(<!-- )/g, '$1\n\n$2'],
    [/(<!-- truncate -->)(## )/g, '$1\n\n$2'],
    [/!\[([^\]]+)\]\(([^)]+)\)(# )/g, '![$1]($2)\n\n$3'],
  ];

  for (const [re, rep] of inserts) {
    text = text.replace(re, rep);
  }

  return text;
}

for (const rel of FILES) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) continue;
  const before = fs.readFileSync(file, 'utf8');
  const after = recover(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    console.log('recovered', rel);
  }
}
