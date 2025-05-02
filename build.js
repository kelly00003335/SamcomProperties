
// Simple build helper
import { execSync } from 'child_process';
import fs from 'fs';

console.log('🔄 Starting build process');

try {
  // Build client
  console.log('🏗️ Building client...');
  execSync('vite build', { stdio: 'inherit' });
  
  // Build server
  console.log('🏗️ Building server...');
  execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });
  
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}
