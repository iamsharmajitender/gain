import fs from 'node:fs';
import path from 'node:path';
import type {Plugin} from '@docusaurus/types';

const CACHE_DIRS = ['.docusaurus', path.join('node_modules', '.cache')];

function clearBuildCaches(siteDir: string): void {
  for (const dir of CACHE_DIRS) {
    const target = path.join(siteDir, dir);
    if (fs.existsSync(target)) {
      fs.rmSync(target, {recursive: true, force: true});
      console.log(`[clear-cache] Removed ${dir}`);
    }
  }
}

export default function clearCacheBeforeStartPlugin(): Plugin {
  return {
    name: 'clear-cache-before-start',
    extendCli(cli, {siteDir}) {
      const startCommand = cli.commands.find((command) => command.name() === 'start');
      startCommand?.hook('preAction', () => {
        console.log('[clear-cache] Clearing Docusaurus and webpack caches before start...');
        clearBuildCaches(siteDir);
      });
    },
  };
}
