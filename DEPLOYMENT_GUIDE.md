# Deployment Guide - MMS Swimming Academy

## Overview

This guide provides step-by-step instructions for deploying the MMS Swimming Academy Management System to various hosting platforms.

## Prerequisites

- Node.js 18+ installed locally
- Git installed
- Access to a PostgreSQL database (or use in-memory storage for testing)
- Domain name (optional but recommended)

## Environment Configuration

### Required Environment Variables

Create a `.env` file in your production environment with:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@host:port/database_name

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here

# Application Configuration
NODE_ENV=production
PORT=5000

# Optional: Custom domain
DOMAIN=yourdomain.com
```

### JWT Secret Generation

Generate a secure JWT secret:

```bash
# Using Node.js crypto
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Using OpenSSL
openssl rand -hex 64
```

## Database Setup

### Option 1: PostgreSQL (Recommended)

1. **Create Database**
   ```sql
   CREATE DATABASE mms_swimming_academy;
   ```

2. **Set DATABASE_URL**
   ```env
   DATABASE_URL=postgresql://username:password@host:port/mms_swimming_academy
   ```

3. **Run Migrations** (if using Drizzle migrations)
   ```bash
   npx drizzle-kit push:pg
   ```

### Option 2: In-Memory Storage (Development Only)

If you don't have PostgreSQL available, the application will use in-memory storage automatically. This is suitable for testing but not recommended for production.

## Platform-Specific Deployment

### 1. Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Configure vercel.json**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server/index.ts",
         "use": "@vercel/node"
       },
       {
         "src": "client/vite.config.ts",
         "use": "@vercel/static-build"
       }
     ],
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "server/index.ts"
       },
       {
         "src": "/(.*)",
         "dest": "client/dist/index.html"
       }
     ],
     "env": {
       "NODE_ENV": "production"
     }
   }
   ```

4. **Deploy**
   ```bash
   vercel --prod
   ```

### 2. Heroku Deployment

1. **Install Heroku CLI**
   ```bash
   # macOS
   brew install heroku/brew/heroku
   
   # Windows
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   heroku create mms-swimming-academy
   ```

4. **Add PostgreSQL**
   ```bash
   heroku addons:create heroku-postgresql:hobby-dev
   ```

5. **Set Environment Variables**
   ```bash
   heroku config:set JWT_SECRET=your-jwt-secret
   heroku config:set NODE_ENV=production
   ```

6. **Create Procfile**
   ```
   web: npm start
   ```

7. **Deploy**
   ```bash
   git push heroku main
   ```

### 3. DigitalOcean App Platform

1. **Connect Repository**
   - Link your Git repository to DigitalOcean

2. **Configure App Spec**
   ```yaml
   name: mms-swimming-academy
   services:
   - name: web
     source_dir: /
     github:
       repo: your-username/mms-swimming-academy
       branch: main
     run_command: npm start
     build_command: npm run build
     environment_slug: node-js
     instance_count: 1
     instance_size_slug: basic-xxs
     env:
     - key: NODE_ENV
       value: production
     - key: JWT_SECRET
       value: your-jwt-secret
     - key: DATABASE_URL
       value: your-database-url
   ```

3. **Deploy**
   - Follow DigitalOcean's deployment process

### 4. AWS EC2 Deployment

1. **Launch EC2 Instance**
   - Ubuntu 22.04 LTS recommended
   - t2.micro or larger

2. **Connect to Instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-instance-ip
   ```

3. **Install Dependencies**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2
   sudo npm install -g pm2
   
   # Install Nginx
   sudo apt install nginx -y
   ```

4. **Clone and Setup Project**
   ```bash
   git clone https://github.com/your-username/mms-swimming-academy.git
   cd mms-swimming-academy
   npm install
   npm run build
   ```

5. **Configure PM2**
   ```bash
   # Create ecosystem.config.js
   module.exports = {
     apps: [{
       name: 'mms-swimming-academy',
       script: 'dist/index.js',
       instances: 'max',
       exec_mode: 'cluster',
       env: {
         NODE_ENV: 'production',
         PORT: 5000,
         JWT_SECRET: 'your-jwt-secret',
         DATABASE_URL: 'your-database-url'
       }
     }]
   };
   
   # Start application
   pm2 start ecosystem.config.js
   pm2 startup
   pm2 save
   ```

6. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

7. **Enable SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

## Docker Deployment

### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

USER nextjs

EXPOSE 5000

CMD ["npm", "start"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - JWT_SECRET=your-jwt-secret
      - DATABASE_URL=postgresql://postgres:password@db:5432/mms_swimming_academy
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=mms_swimming_academy
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

### Deploy with Docker

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

## Security Checklist

### Pre-Deployment Security

- [ ] JWT_SECRET is cryptographically secure (64+ characters)
- [ ] Database credentials are secure and not default
- [ ] All environment variables are properly set
- [ ] HTTPS is enabled (SSL certificate)
- [ ] Database is not publicly accessible
- [ ] Regular security updates are scheduled

### Post-Deployment Security

- [ ] Change default admin password
- [ ] Enable database backups
- [ ] Set up monitoring and logging
- [ ] Configure firewall rules
- [ ] Enable rate limiting
- [ ] Set up error tracking (Sentry, etc.)

## Monitoring and Maintenance

### Health Checks

Create a health check endpoint:

```javascript
// Add to server/routes.ts
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

### Logging

Configure proper logging:

```javascript
// Add to server/index.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### Backup Strategy

1. **Database Backups**
   ```bash
   # PostgreSQL backup
   pg_dump -h hostname -U username -d database_name > backup.sql
   
   # Automated backup script
   #!/bin/bash
   DATE=$(date +%Y%m%d_%H%M%S)
   pg_dump -h hostname -U username -d database_name > backup_$DATE.sql
   ```

2. **File Backups**
   - Back up uploaded files and logs
   - Store backups in separate location

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Find and kill process
   lsof -ti:5000 | xargs kill -9
   ```

2. **Database Connection Issues**
   - Check DATABASE_URL format
   - Verify database credentials
   - Ensure database is running

3. **Build Failures**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility

4. **Memory Issues**
   - Increase server memory allocation
   - Optimize database queries
   - Enable compression

### Performance Optimization

1. **Enable Gzip Compression**
   ```javascript
   import compression from 'compression';
   app.use(compression());
   ```

2. **Add Caching Headers**
   ```javascript
   app.use('/static', express.static('public', {
     maxAge: '1y',
     etag: false
   }));
   ```

3. **Database Optimization**
   - Add proper indexes
   - Use connection pooling
   - Optimize queries

## Support

For deployment issues:

1. Check application logs
2. Verify environment variables
3. Test database connectivity
4. Review security settings
5. Contact support if needed

---

This deployment guide ensures a secure, scalable, and maintainable production deployment of the MMS Swimming Academy Management System.