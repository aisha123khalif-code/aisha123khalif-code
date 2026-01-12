# API Documentation

## AI Video Studio API Reference

Base URL: `http://localhost:3000/api`

---

## Authentication

Currently, the API does not require authentication. In production, implement JWT-based authentication.

---

## Users API

### Create User
**POST** `/users`

Creates a new user account.

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "message": "User created successfully"
}
```

### Get All Users
**GET** `/users`

Retrieves all users.

**Response:**
```json
[
  {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "theme_preference": "light",
    "onboarding_completed": true,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### Get User by ID
**GET** `/users/:id`

Retrieves a specific user by ID.

**Response:**
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "theme_preference": "light",
  "onboarding_completed": true,
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

### Update User
**PUT** `/users/:id`

Updates user information.

**Request Body:**
```json
{
  "username": "john_doe_updated",
  "email": "john.updated@example.com",
  "theme_preference": "dark",
  "onboarding_completed": true
}
```

**Response:**
```json
{
  "message": "User updated successfully"
}
```

### Delete User
**DELETE** `/users/:id`

Deletes a user account.

**Response:**
```json
{
  "message": "User deleted successfully"
}
```

---

## Icons API

### Create Icon
**POST** `/icons`

Saves a customized icon.

**Request Body:**
```json
{
  "user_id": 1,
  "icon_name": "heart",
  "icon_class": "fa-solid fa-heart",
  "color": "#e74c3c",
  "size": "large",
  "style": "solid"
}
```

**Response:**
```json
{
  "id": 1,
  "user_id": 1,
  "icon_name": "heart",
  "icon_class": "fa-solid fa-heart",
  "color": "#e74c3c",
  "size": "large",
  "style": "solid",
  "message": "Icon created successfully"
}
```

### Get Icon by ID
**GET** `/icons/:id`

Retrieves a specific icon.

### Get Icons by User
**GET** `/icons/user/:userId`

Retrieves all icons for a specific user.

**Response:**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "icon_name": "heart",
    "icon_class": "fa-solid fa-heart",
    "color": "#e74c3c",
    "size": "large",
    "style": "solid",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### Update Icon
**PUT** `/icons/:id`

Updates icon properties.

**Request Body:**
```json
{
  "icon_name": "star",
  "icon_class": "fa-solid fa-star",
  "color": "#f39c12",
  "size": "medium",
  "style": "solid"
}
```

### Delete Icon
**DELETE** `/icons/:id`

Deletes an icon.

---

## Videos API

### Generate Video
**POST** `/videos`

Starts AI video generation.

**Request Body:**
```json
{
  "user_id": 1,
  "title": "My Awesome Video",
  "prompt": "Create a video about nature and wildlife"
}
```

**Response:**
```json
{
  "id": 1,
  "user_id": 1,
  "title": "My Awesome Video",
  "prompt": "Create a video about nature and wildlife",
  "status": "pending",
  "message": "Video generation started"
}
```

**Status Values:**
- `pending`: Video generation queued
- `processing`: AI is generating the video
- `completed`: Video is ready
- `failed`: Generation failed

### Get Video by ID
**GET** `/videos/:id`

Retrieves video details and status.

**Response:**
```json
{
  "id": 1,
  "user_id": 1,
  "title": "My Awesome Video",
  "prompt": "Create a video about nature and wildlife",
  "video_url": "/videos/1_generated.mp4",
  "status": "completed",
  "duration": 30,
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

### Get Videos by User
**GET** `/videos/user/:userId`

Retrieves all videos for a specific user.

### Update Video
**PUT** `/videos/:id`

Updates video information.

### Delete Video
**DELETE** `/videos/:id`

Deletes a video.

---

## Analytics API

### Track Event
**POST** `/analytics`

Records an analytics event.

**Request Body:**
```json
{
  "user_id": 1,
  "event_type": "video_generated",
  "event_data": {
    "title": "My Video",
    "prompt": "Create a video..."
  }
}
```

**Response:**
```json
{
  "id": 1,
  "message": "Event tracked successfully"
}
```

**Common Event Types:**
- `page_view`
- `video_generated`
- `icon_saved`
- `icon_exported`
- `video_downloaded`
- `theme_changed`
- `tab_changed`
- `onboarding_completed`

### Get User Analytics
**GET** `/analytics/user/:userId`

Retrieves analytics for a specific user.

### Get Analytics Summary
**GET** `/analytics/summary`

Retrieves aggregated analytics summary.

**Response:**
```json
[
  {
    "event_type": "video_generated",
    "count": 45
  },
  {
    "event_type": "icon_saved",
    "count": 32
  }
]
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Invalid request parameters"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Something went wrong!"
}
```

---

## Rate Limiting

Currently, no rate limiting is implemented. In production, implement rate limiting to prevent abuse.

---

## CORS

CORS is enabled for all origins in development. In production, restrict to specific domains.

---

## Examples

### cURL Examples

**Create a user:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"john_doe","email":"john@example.com"}'
```

**Generate a video:**
```bash
curl -X POST http://localhost:3000/api/videos \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "title": "Nature Video",
    "prompt": "Create a beautiful video about nature"
  }'
```

**Save an icon:**
```bash
curl -X POST http://localhost:3000/api/icons \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "icon_name": "heart",
    "icon_class": "fa-solid fa-heart",
    "color": "#e74c3c",
    "size": "large",
    "style": "solid"
  }'
```

### JavaScript Examples

**Using Fetch API:**
```javascript
// Generate a video
const generateVideo = async () => {
  const response = await fetch('http://localhost:3000/api/videos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: 1,
      title: 'My Video',
      prompt: 'Create a video about...'
    })
  });
  
  const data = await response.json();
  console.log(data);
};

// Track an event
const trackEvent = async (eventType, eventData) => {
  await fetch('http://localhost:3000/api/analytics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: 1,
      event_type: eventType,
      event_data: eventData
    })
  });
};
```

---

For more information, see the [README.md](README.md).
