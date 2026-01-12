# Deployment Guide

This guide covers deploying AI Video Studio to production.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Database Configuration](#database-configuration)
- [Deployment Options](#deployment-options)
- [Security Checklist](#security-checklist)
- [Monitoring](#monitoring)

---

## Prerequisites

Before deploying, ensure you have:

- [ ] Production-ready server (VPS, cloud instance, etc.)
- [ ] Domain name (optional but recommended)
- [ ] SSL certificate (for HTTPS)
- [ ] MySQL database (local or managed service)
- [ ] OpenAI API key
- [ ] Node.js v14+ installed on server
- [ ] Git installed on server

---

## Environment Setup

### 1. Server Preparation

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MySQL
sudo apt install mysql-server
sudo mysql_secure_installation

# Install PM2 (process manager)
sudo npm install -g pm2
```

### 2. Clone Repository

```bash
# Clone the repository
git clone https://github.com/aisha123khalif-code/aisha123khalif-code.git
cd aisha123khalif-code

# Install dependencies
npm install --production
```

### 3. Configure Environment Variables

Create a `.env` file with production values:

```env
# Database
DB_HOST=localhost
DB_USER=ai_video_studio_user
DB_PASSWORD=STRONG_PASSWORD_HERE
DB_NAME=ai_video_studio_prod

# OpenAI
OPENAI_API_KEY=sk-your-production-key

# Server
PORT=3000
NODE_ENV=production

# Font Awesome Pro
FONTAWESOME_TOKEN=your-production-token
```

**Security Notes:**
- Use strong, unique passwords
- Never commit `.env` to version control
- Restrict database user permissions
- Use environment-specific API keys

### 4. Setup Database

```bash
# Create database user
sudo mysql -e "CREATE USER 'ai_video_studio_user'@'localhost' IDENTIFIED BY 'STRONG_PASSWORD_HERE';"
sudo mysql -e "CREATE DATABASE ai_video_studio_prod;"
sudo mysql -e "GRANT ALL PRIVILEGES ON ai_video_studio_prod.* TO 'ai_video_studio_user'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"

# Run database setup
npm run install-db
```

---

## Deployment Options

### Option 1: PM2 (Recommended)

PM2 is a production process manager for Node.js applications.

```bash
# Start application with PM2
pm2 start server/index.js --name "ai-video-studio"

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
# Follow the instructions output by the command above

# Monitor application
pm2 monit

# View logs
pm2 logs ai-video-studio

# Restart application
pm2 restart ai-video-studio
```

**PM2 Configuration File** (`ecosystem.config.js`):

```javascript
module.exports = {
  apps: [{
    name: 'ai-video-studio',
    script: './server/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
```

Start with config:
```bash
pm2 start ecosystem.config.js
```

### Option 2: Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "server/index.js"]
```

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
      - DB_USER=root
      - DB_PASSWORD=password
      - DB_NAME=ai_video_studio
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: mysql:8
    environment:
      - MYSQL_ROOT_PASSWORD=password
      - MYSQL_DATABASE=ai_video_studio
    volumes:
      - db-data:/var/lib/mysql
    restart: unless-stopped

volumes:
  db-data:
```

Deploy:
```bash
docker-compose up -d
```

### Option 3: Cloud Platforms

#### Heroku

```bash
# Install Heroku CLI
# Create Heroku app
heroku create ai-video-studio

# Add MySQL addon
heroku addons:create cleardb:ignite

# Set environment variables
heroku config:set OPENAI_API_KEY=your-key
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# Run database setup
heroku run npm run install-db
```

#### AWS EC2

1. Launch EC2 instance (Ubuntu)
2. Configure security group (allow ports 22, 80, 443)
3. Connect via SSH
4. Follow "Server Preparation" steps above
5. Use PM2 for process management
6. Setup Nginx as reverse proxy

#### DigitalOcean

1. Create Droplet (Node.js one-click app)
2. Follow "Server Preparation" steps
3. Use PM2 for process management
4. Setup Nginx as reverse proxy

---

## Nginx Reverse Proxy

Install and configure Nginx:

```bash
# Install Nginx
sudo apt install nginx

# Create configuration
sudo nano /etc/nginx/sites-available/ai-video-studio
```

Configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/ai-video-studio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### SSL/HTTPS with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal (certbot sets this up automatically)
sudo certbot renew --dry-run
```

---

## Security Checklist

- [ ] Use strong passwords for all services
- [ ] Enable firewall (ufw, iptables)
- [ ] Use HTTPS/SSL certificates
- [ ] Keep Node.js and dependencies updated
- [ ] Implement rate limiting
- [ ] Add authentication/authorization
- [ ] Sanitize user inputs
- [ ] Enable CORS restrictions
- [ ] Use environment variables for secrets
- [ ] Regular security audits (`npm audit`)
- [ ] Backup database regularly
- [ ] Monitor application logs
- [ ] Implement error tracking (Sentry, etc.)

### Security Updates

```bash
# Update dependencies
npm update

# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

---

## Monitoring

### Application Monitoring

**PM2 Monitoring:**
```bash
pm2 monit
pm2 logs
```

**Application Health Check:**
```bash
curl http://localhost:3000/api/health
```

### Server Monitoring

Install monitoring tools:

```bash
# htop for process monitoring
sudo apt install htop

# Install monitoring agent (optional)
# New Relic, DataDog, or similar
```

### Database Monitoring

```bash
# MySQL status
sudo systemctl status mysql

# Check database size
mysql -u root -p -e "SELECT table_schema AS 'Database', ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS 'Size (MB)' FROM information_schema.TABLES GROUP BY table_schema;"
```

---

## Backup Strategy

### Database Backups

Create automated backup script:

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/mysql"
DB_NAME="ai_video_studio_prod"
DB_USER="root"

mkdir -p $BACKUP_DIR

mysqldump -u $DB_USER -p $DB_NAME > $BACKUP_DIR/backup_$DATE.sql

# Keep only last 7 days
find $BACKUP_DIR -name "backup_*.sql" -mtime +7 -delete
```

Setup cron job:
```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * /path/to/backup.sh
```

---

## Troubleshooting

### Application Won't Start

1. Check logs: `pm2 logs`
2. Verify environment variables: `pm2 env 0`
3. Check port availability: `sudo lsof -i :3000`
4. Verify database connection

### High Memory Usage

1. Monitor with: `pm2 monit`
2. Restart application: `pm2 restart ai-video-studio`
3. Check for memory leaks
4. Consider increasing server resources

### Database Connection Issues

1. Verify MySQL is running: `sudo systemctl status mysql`
2. Check credentials in `.env`
3. Test connection: `mysql -u user -p`
4. Check firewall rules

---

## Scaling

### Horizontal Scaling

Use PM2 cluster mode:

```bash
pm2 start server/index.js -i max
```

### Load Balancing

Use Nginx for load balancing:

```nginx
upstream backend {
    server localhost:3000;
    server localhost:3001;
    server localhost:3002;
}

server {
    location / {
        proxy_pass http://backend;
    }
}
```

---

## Maintenance

### Regular Tasks

- [ ] Weekly: Check application logs
- [ ] Weekly: Review analytics and usage
- [ ] Monthly: Update dependencies
- [ ] Monthly: Review and optimize database
- [ ] Quarterly: Security audit
- [ ] Quarterly: Performance review

---

For more information, see:
- [README.md](README.md)
- [CONTRIBUTING.md](CONTRIBUTING.md)
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
