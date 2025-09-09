import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const distDir = path.join(projectRoot, 'dist');
const publicHtmlDir = path.join(projectRoot, 'public_html');

// Ensure public_html exists
if (!fs.existsSync(publicHtmlDir)) {
  fs.mkdirSync(publicHtmlDir, { recursive: true });
}

// Copy dist contents to public_html
function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.error(`Source directory ${src} does not exist. Run 'npm run build' first.`);
    process.exit(1);
  }

  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
  fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy PHP files from public_html_backend to public_html
const backendDir = path.join(projectRoot, 'public_html_backend');
if (fs.existsSync(backendDir)) {
  const entries = fs.readdirSync(backendDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isFile()) {
      const srcPath = path.join(backendDir, entry.name);
      const destPath = path.join(publicHtmlDir, entry.name);
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy dist to public_html
copyDir(distDir, publicHtmlDir);

console.log('✅ Build copied to public_html successfully!');
console.log('📁 Upload the contents of public_html/ to your Hostinger public_html folder');

