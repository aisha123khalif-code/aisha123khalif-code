# Quick Start Guide

Get AI Video Studio up and running in just a few minutes!

## Prerequisites Check

Before you begin, make sure you have:

- [ ] Node.js v14+ installed (`node --version`)
- [ ] MySQL 5.7+ installed and running
- [ ] Git installed
- [ ] A text editor (VS Code, Sublime, etc.)

## 5-Minute Setup

### Step 1: Get the Code (30 seconds)

```bash
git clone https://github.com/aisha123khalif-code/aisha123khalif-code.git
cd aisha123khalif-code
```

### Step 2: Install Dependencies (1-2 minutes)

```bash
npm install
```

### Step 3: Configure Environment (1 minute)

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your favorite editor
nano .env  # or: code .env, vim .env, etc.
```

Update these values in `.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=ai_video_studio
OPENAI_API_KEY=sk-...  # Get from https://platform.openai.com/api-keys
PORT=3000
```

💡 **Don't have an OpenAI API key yet?** You can skip it for now. The app will still work, but video generation won't function.

### Step 4: Setup Database (30 seconds)

```bash
npm run install-db
```

You should see:
```
Database created or already exists
Database schema created successfully
Database setup completed!
```

### Step 5: Start the Server (10 seconds)

```bash
npm start
```

You should see:
```
Server is running on port 3000
Visit http://localhost:3000 to view the application
```

### Step 6: Open in Browser

Navigate to: **http://localhost:3000**

🎉 **You're done!** The onboarding wizard will guide you through the features.

---

## Quick Tour

### Try These Features:

1. **Complete the Onboarding** - Follow the 4-step wizard
2. **Customize an Icon**:
   - Go to "Icon Customizer" tab
   - Try changing the icon name to "rocket"
   - Pick a color
   - Click "Save Icon"
3. **Toggle Dark Mode** - Click the moon icon in the top right
4. **Generate a Video** (requires OpenAI API key):
   - Go to "Video Generator" tab
   - Enter a title and prompt
   - Click "Generate Video"
   - Check "My Content" tab for status

---

## Troubleshooting

### "Cannot connect to database"

**Problem:** MySQL isn't running or credentials are wrong

**Solution:**
```bash
# Check if MySQL is running
mysql --version
mysql -u root -p  # Test login

# If MySQL isn't running:
# macOS: brew services start mysql
# Ubuntu: sudo service mysql start
# Windows: Start MySQL service from Services
```

### "Port 3000 is already in use"

**Problem:** Another app is using port 3000

**Solution:**
```bash
# Option 1: Use a different port
# Edit .env and change PORT=3000 to PORT=3001

# Option 2: Find and stop the process using port 3000
# macOS/Linux:
lsof -ti:3000 | xargs kill
# Windows:
netstat -ano | findstr :3000
taskkill /PID <pid> /F
```

### "Module not found"

**Problem:** Dependencies weren't installed properly

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Video generation doesn't work

**Problem:** Missing or invalid OpenAI API key

**Solution:**
1. Get an API key from https://platform.openai.com/api-keys
2. Add it to `.env`:
   ```env
   OPENAI_API_KEY=sk-your-actual-key-here
   ```
3. Restart the server: `npm start`

---

## Development Mode

For development with auto-reload:

```bash
npm run dev
```

This uses `nodemon` to automatically restart the server when you make changes.

---

## What's Next?

- 📖 Read the [full README](README.md) for detailed documentation
- 🔌 Check out the [API Documentation](API_DOCUMENTATION.md)
- 🤝 Learn how to [contribute](CONTRIBUTING.md)
- 🎨 Customize the UI in `public/css/styles.css`
- 🔧 Add new features in `server/controllers/`

---

## Common Workflows

### Reset the Database
```bash
npm run install-db
```

### Check Server Logs
```bash
# The server outputs logs to console
# Look for errors if something isn't working
```

### Update Dependencies
```bash
npm update
```

### Stop the Server
Press `Ctrl+C` in the terminal where the server is running

---

## Getting Help

- 🐛 **Found a bug?** [Open an issue](https://github.com/aisha123khalif-code/aisha123khalif-code/issues)
- 💡 **Have a question?** Check the README or API docs first
- 🚀 **Want to contribute?** See CONTRIBUTING.md

---

**Happy creating! 🎬✨**
