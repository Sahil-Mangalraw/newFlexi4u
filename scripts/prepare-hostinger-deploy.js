import { copyFileSync, mkdirSync, readdirSync, rmSync, existsSync } from 'fs';
import { join, resolve } from 'path';

const sourceDir = resolve('./public_html_backend');
const buildDir = resolve('./dist');
const deployDir = resolve('./public_html');
const apiDir = join(deployDir, 'api');

// Create api directory if it doesn't exist
if (!existsSync(apiDir)) {
  mkdirSync(apiDir, { recursive: true });
}

// Copy PHP files to api directory
const phpFiles = readdirSync(sourceDir).filter(file => file.endsWith('.php'));
phpFiles.forEach(file => {
  copyFileSync(join(sourceDir, file), join(apiDir, file));
});

// Copy build files to public_html
const buildFiles = readdirSync(buildDir);
buildFiles.forEach(file => {
  const sourcePath = join(buildDir, file);
  const targetPath = join(deployDir, file);
  
  if (file === 'assets') {
    // Handle assets directory separately to preserve structure
    if (!existsSync(join(deployDir, 'assets'))) {
      mkdirSync(join(deployDir, 'assets'), { recursive: true });
    }
    const assetFiles = readdirSync(sourcePath);
    assetFiles.forEach(assetFile => {
      copyFileSync(
        join(sourcePath, assetFile), 
        join(deployDir, 'assets', assetFile)
      );
    });
  } else {
    copyFileSync(sourcePath, targetPath);
  }
});

// Create .htaccess if it doesn't exist
const htaccessContent = `RewriteEngine On
RewriteBase /
RewriteRule ^index\\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]`;

if (!existsSync(join(deployDir, '.htaccess'))) {
  const htaccessPath = join(deployDir, '.htaccess');
  writeFileSync(htaccessPath, htaccessContent);
}

console.log('Deployment package prepared in public_html directory');
