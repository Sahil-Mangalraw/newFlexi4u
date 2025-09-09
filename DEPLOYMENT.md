# Hostinger Deployment Guide

## Current Project Structure
```
newflexi/
├── src/                    # React source code
├── public_html_backend/    # PHP backend files
│   ├── db.php
│   ├── doctor-handler.php
│   ├── patient-handler.php
│   ├── uploads/
│   └── .htaccess
├── public_html/            # Deployment folder (created by script)
└── scripts/
    └── copy-to-public-html.js
```

## Deployment Steps

### 1. Build the React App
```bash
# Install dependencies (if not done)
npm install

# Build the project
npm run build
```

### 2. Deploy to Hostinger
```bash
# Run deployment script
npm run deploy
```

### 3. Upload to Hostinger
1. Go to your Hostinger hPanel
2. Open File Manager
3. Navigate to `public_html` folder
4. Upload ALL contents from `newflexi/public_html/` folder
5. Make sure `uploads` folder has 755 permissions

## Manual Deployment (if npm doesn't work)

1. Copy `dist/` contents to `public_html/`
2. Copy `public_html_backend/` contents to `public_html/`
3. Upload `public_html/` contents to Hostinger

## Database Setup
- Database: `u466943558_physio_app`
- User: `u466943558_physio_user`
- Password: `13466777`
- Host: `localhost`

## File Structure After Deployment
```
public_html/ (on Hostinger)
├── index.html
├── assets/
│   ├── [hashed].js
│   ├── [hashed].css
│   └── images/
├── db.php
├── doctor-handler.php
├── patient-handler.php
├── uploads/
└── .htaccess
```

## Troubleshooting

### White Page Issues
1. Check Browser Console (F12):
   - Look for 404 errors on JavaScript/CSS files
   - Verify all asset paths start with "/"
   - Check for any JavaScript errors

2. Verify .htaccess:
   ```apache
   RewriteEngine On
   RewriteBase /
   RewriteRule ^index\.html$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

3. Asset Loading:
   - All paths in index.html should be absolute (start with "/")
   - Verify the assets/ directory contains all files
   - Check file permissions (644 for files, 755 for directories)

4. PHP Backend:
   - Test API endpoints directly (/api/db.php)
   - Check PHP error logs in Hostinger panel
   - Verify database connection
   - Ensure uploads directory is writable (775)
