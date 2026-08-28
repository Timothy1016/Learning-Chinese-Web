import { spawnSync } from 'node:child_process';

// Sites uses Vinext/Cloudflare output; Vercel should run the native Next.js build.
const command = process.env.VERCEL ? 'next' : 'vinext';
const result = spawnSync(command, ['build'], { stdio: 'inherit', shell: true });
process.exit(result.status ?? 1);
