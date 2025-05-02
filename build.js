// Simple build helper
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path'; // Import path module

console.log('🔄 Starting build process');

try {
  // Build client
  console.log('🏗️ Building client...');
  // Ensure dist directory exists
  const distDir = path.resolve('./dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  execSync('npx vite build', { stdio: 'inherit' });

  // Build server
  console.log('🏗️ Building server...');
  execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });

  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}

//This is a minimal vercel.json file.  You likely need a more complex configuration.
//This file needs to be created manually.
//This file tells vercel what to output.
//Place this in the root directory of your project.

// vercel.json
// {
//   "version": 2,
//   "builds": [
//     {
//       "src": "dist/server/index.js",
//       "use": "@vercel/node"
//     }
//   ],
//   "routes": [
//     {
//       "src": "/(.*)",
//       "dest": "dist/server/index.js"
//     }
//   ]
// }