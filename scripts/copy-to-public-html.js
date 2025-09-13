import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const distDir = path.join(projectRoot, 'dist');
const publicHtmlDir = path.join(projectRoot, 'public_html');
const apiDir = path.join(publicHtmlDir, 'api');

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

// NOTE: We will copy backend after dist to avoid deletion during dist copy

// Copy dist to public_html (Vite outputs index.html + assets)
copyDir(distDir, publicHtmlDir);

// Copy PHP files from public_html_backend to public_html/api (after dist copy)
const backendDir = path.join(projectRoot, 'public_html_backend');
if (fs.existsSync(backendDir)) {
  if (fs.existsSync(apiDir)) {
    fs.rmSync(apiDir, { recursive: true, force: true });
  }
  fs.mkdirSync(apiDir, { recursive: true });
  const entries = fs.readdirSync(backendDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(backendDir, entry.name);
    const destPath = path.join(apiDir, entry.name);
    if (entry.isDirectory()) {
      // Mirror directories such as uploads
      fs.mkdirSync(destPath, { recursive: true });
      const inner = fs.readdirSync(srcPath, { withFileTypes: true });
      for (const ent of inner) {
        const s = path.join(srcPath, ent.name);
        const d = path.join(destPath, ent.name);
        if (ent.isDirectory()) {
          fs.mkdirSync(d, { recursive: true });
        } else {
          fs.copyFileSync(s, d);
        }
      }
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Write .htaccess for SPA routing (React Router fix)
const htaccessPath = path.join(publicHtmlDir, '.htaccess');
const htaccessContent = `RewriteEngine On\nRewriteBase /\nRewriteRule ^index\\.html$ - [L]\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteRule . /index.html [L]\n`;
fs.writeFileSync(htaccessPath, htaccessContent, 'utf8');

console.log('✅ Build copied to public_html successfully!');
console.log('📁 PHP API placed in public_html/api');
console.log('🛡️  .htaccess written for React Router');
console.log('📁 Upload the contents of public_html/ to your Hostinger public_html folder');

