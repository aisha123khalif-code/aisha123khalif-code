# 🎬 AI Video Studio

A cutting-edge AI-powered video creation and editing platform that leverages machine learning to streamline video production workflows.

## ✨ Features

### 1. **AI Video Generator**
- Generate videos using OpenAI APIs
- Text-to-video conversion
- Customizable prompts
- Real-time status tracking
- MP4 export functionality

### 2. **Icon Customization**
- Font Awesome Pro integration
- Customize colors, sizes, and styles
- Real-time preview
- Export as SVG or PNG
- Save favorite icons

### 3. **Light/Dark Theme Support**
- Seamless theme switching
- System preference detection
- LocalStorage persistence
- Smooth transitions

### 4. **User Onboarding Wizard**
- Multi-step introduction
- Feature showcase
- Interactive walkthrough
- First-time user experience

### 5. **Export Features**
- Icons: SVG and PNG formats
- Videos: MP4 format
- One-click downloads
- High-quality exports

### 6. **Analytics Tracking**
- User behavior monitoring
- Event tracking (downloads, generations)
- Session analytics
- Performance metrics

### 7. **SQL Database**
- User management
- Icon storage
- Video tracking
- Analytics data
- Full CRUD operations

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- OpenAI API Key
- Font Awesome Pro Token (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aisha123khalif-code/aisha123khalif-code.git
   cd aisha123khalif-code
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=ai_video_studio
   OPENAI_API_KEY=your_openai_api_key
   PORT=3000
   FONTAWESOME_TOKEN=your_fontawesome_token
   ```

4. **Setup database**
   ```bash
   npm run install-db
   ```

5. **Start the server**
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

6. **Access the application**
   Open your browser and navigate to: `http://localhost:3000`

## 📁 Project Structure

```
aisha123khalif-code/
├── database/
│   ├── schema.sql          # Database schema
│   └── queries.sql         # CRUD queries reference
├── server/
│   ├── controllers/        # Business logic
│   │   ├── userController.js
│   │   ├── iconController.js
│   │   ├── videoController.js
│   │   └── analyticsController.js
│   ├── routes/            # API routes
│   │   ├── users.js
│   │   ├── icons.js
│   │   ├── videos.js
│   │   └── analytics.js
│   ├── db/                # Database connection
│   │   ├── connection.js
│   │   └── setup.js
│   └── index.js           # Express server
├── public/
│   ├── index.html         # Main HTML file
│   ├── css/
│   │   └── styles.css     # Application styles
│   └── js/
│       ├── app.js         # Main application logic
│       └── analytics.js   # Analytics module
├── package.json
├── .env.example
└── README.md
```

## 🔌 API Endpoints

### Users
- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Icons
- `POST /api/icons` - Create a new icon
- `GET /api/icons/:id` - Get icon by ID
- `GET /api/icons/user/:userId` - Get icons by user
- `PUT /api/icons/:id` - Update icon
- `DELETE /api/icons/:id` - Delete icon

### Videos
- `POST /api/videos` - Generate a new video
- `GET /api/videos/:id` - Get video by ID
- `GET /api/videos/user/:userId` - Get videos by user
- `PUT /api/videos/:id` - Update video
- `DELETE /api/videos/:id` - Delete video

### Analytics
- `POST /api/analytics` - Track an event
- `GET /api/analytics/user/:userId` - Get user analytics
- `GET /api/analytics/summary` - Get analytics summary

## 🗄️ Database Schema

### Users Table
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- username (VARCHAR)
- email (VARCHAR, UNIQUE)
- theme_preference (VARCHAR)
- onboarding_completed (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Icons Table
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- user_id (INT, FOREIGN KEY)
- icon_name (VARCHAR)
- icon_class (VARCHAR)
- color (VARCHAR)
- size (VARCHAR)
- style (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Videos Table
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- user_id (INT, FOREIGN KEY)
- title (VARCHAR)
- prompt (TEXT)
- video_url (VARCHAR)
- status (VARCHAR)
- duration (INT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Analytics Table
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- user_id (INT, FOREIGN KEY)
- event_type (VARCHAR)
- event_data (JSON)
- created_at (TIMESTAMP)
```

## 🎨 Features in Detail

### AI Video Generation
The platform uses OpenAI's API to generate video descriptions and metadata. In a production environment, this would integrate with actual video generation services like:
- Runway ML
- Synthesia
- Pictory AI

### Icon Customization
Powered by Font Awesome Pro, users can:
- Choose from thousands of icons
- Customize colors with a color picker
- Select from multiple styles (solid, regular, light, duotone)
- Choose from various sizes
- Export in SVG or PNG format

### Theme System
The application supports both light and dark themes:
- Automatic theme detection
- Manual toggle
- Persistent storage
- Smooth transitions
- All UI elements adapt

### Analytics
Comprehensive tracking includes:
- Page views
- User interactions
- Video generations
- Icon customizations
- Downloads and exports
- Session duration
- Scroll depth

## 🛠️ Development

### Running in Development Mode
```bash
npm run dev
```

This starts the server with nodemon for automatic reloading.

### Database Maintenance
To reset the database:
```bash
npm run install-db
```

## 📊 Future Enhancements

- [ ] User authentication and authorization
- [ ] Real video generation integration
- [ ] Cloud storage for generated content
- [ ] Social sharing features
- [ ] Collaborative editing
- [ ] Template library
- [ ] Advanced analytics dashboard
- [ ] Payment integration
- [ ] API rate limiting
- [ ] Caching layer

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- OpenAI for AI capabilities
- Font Awesome Pro for icon library
- Express.js for backend framework
- MySQL for database

---

**Built with ❤️ for content creators**
