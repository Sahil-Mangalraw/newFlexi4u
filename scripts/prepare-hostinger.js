import { copyFileSync, mkdirSync, readdirSync, existsSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

// Define paths
const distDir = resolve('./dist');
const publicHtmlDir = resolve('./public_html');
const apiDir = join(publicHtmlDir, 'api');
const uploadsDir = join(apiDir, 'uploads');
const backendDir = resolve('./public_html_backend');

// Create required directories
[publicHtmlDir, apiDir, uploadsDir].forEach(dir => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
});

// Create uploads subdirectories
['photo', 'aadhaar', 'degree'].forEach(subDir => {
  const dir = join(uploadsDir, subDir);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
});

// Copy build files to public_html
console.log('Copying build files...');
const buildFiles = readdirSync(distDir);
buildFiles.forEach(file => {
  const sourcePath = join(distDir, file);
  const targetPath = join(publicHtmlDir, file);
  
  if (file === 'assets') {
    // Handle assets directory separately
    if (!existsSync(join(publicHtmlDir, 'assets'))) {
      mkdirSync(join(publicHtmlDir, 'assets'), { recursive: true });
    }
    const assetFiles = readdirSync(sourcePath);
    assetFiles.forEach(assetFile => {
      copyFileSync(
        join(sourcePath, assetFile),
        join(publicHtmlDir, 'assets', assetFile)
      );
    });
  } else {
    copyFileSync(sourcePath, targetPath);
  }
});

// Copy PHP files to api directory
console.log('Copying PHP files...');
const phpFiles = readdirSync(backendDir).filter(file => file.endsWith('.php'));
phpFiles.forEach(file => {
  copyFileSync(join(backendDir, file), join(apiDir, file));
});

// Create .htaccess file
console.log('Creating .htaccess...');
const htaccessContent = `RewriteEngine On
RewriteBase /
RewriteRule ^index\\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Ensure correct MIME types
AddType application/javascript .js
AddType text/css .css

# Security headers
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
</IfModule>

# Enable CORS for assets
<FilesMatch "\\.(js|css|svg|jpg|png)$">
    Header set Access-Control-Allow-Origin "*"
</FilesMatch>`;

writeFileSync(join(publicHtmlDir, '.htaccess'), htaccessContent);

console.log('Deployment package prepared in public_html directory');
console.log('Remember to set these permissions on Hostinger:');
console.log('- Directories (755): public_html/, public_html/assets/, public_html/api/, public_html/api/uploads/');
console.log('- Files (644): All .php, .html, .js, .css files');
console.log('- Upload directory (775): public_html/api/uploads/ and its subdirectories');
