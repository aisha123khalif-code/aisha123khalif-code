-- CRUD Queries for AI Video Studio

-- ============================================
-- USERS CRUD OPERATIONS
-- ============================================

-- Create User
-- INSERT INTO users (username, email) VALUES (?, ?);

-- Read User by ID
-- SELECT * FROM users WHERE id = ?;

-- Read User by Email
-- SELECT * FROM users WHERE email = ?;

-- Update User
-- UPDATE users SET username = ?, email = ?, theme_preference = ?, onboarding_completed = ? WHERE id = ?;

-- Delete User
-- DELETE FROM users WHERE id = ?;

-- Get All Users
-- SELECT * FROM users ORDER BY created_at DESC;

-- ============================================
-- ICONS CRUD OPERATIONS
-- ============================================

-- Create Icon
-- INSERT INTO icons (user_id, icon_name, icon_class, color, size, style) VALUES (?, ?, ?, ?, ?, ?);

-- Read Icon by ID
-- SELECT * FROM icons WHERE id = ?;

-- Read All Icons for User
-- SELECT * FROM icons WHERE user_id = ? ORDER BY created_at DESC;

-- Update Icon
-- UPDATE icons SET icon_name = ?, icon_class = ?, color = ?, size = ?, style = ? WHERE id = ? AND user_id = ?;

-- Delete Icon
-- DELETE FROM icons WHERE id = ? AND user_id = ?;

-- Get Icon with User Info
-- SELECT i.*, u.username, u.email FROM icons i JOIN users u ON i.user_id = u.id WHERE i.id = ?;

-- ============================================
-- VIDEOS CRUD OPERATIONS
-- ============================================

-- Create Video
-- INSERT INTO videos (user_id, title, prompt, status) VALUES (?, ?, ?, 'pending');

-- Read Video by ID
-- SELECT * FROM videos WHERE id = ?;

-- Read All Videos for User
-- SELECT * FROM videos WHERE user_id = ? ORDER BY created_at DESC;

-- Update Video Status and URL
-- UPDATE videos SET status = ?, video_url = ?, duration = ? WHERE id = ?;

-- Update Video
-- UPDATE videos SET title = ?, prompt = ?, status = ?, video_url = ? WHERE id = ? AND user_id = ?;

-- Delete Video
-- DELETE FROM videos WHERE id = ? AND user_id = ?;

-- Get Video with User Info
-- SELECT v.*, u.username, u.email FROM videos v JOIN users u ON v.user_id = u.id WHERE v.id = ?;

-- Get Recent Videos
-- SELECT * FROM videos ORDER BY created_at DESC LIMIT ?;

-- ============================================
-- ANALYTICS OPERATIONS
-- ============================================

-- Track Event
-- INSERT INTO analytics (user_id, event_type, event_data) VALUES (?, ?, ?);

-- Get Analytics by User
-- SELECT * FROM analytics WHERE user_id = ? ORDER BY created_at DESC;

-- Get Analytics by Event Type
-- SELECT * FROM analytics WHERE event_type = ? ORDER BY created_at DESC;

-- Get Analytics Summary
-- SELECT event_type, COUNT(*) as count FROM analytics GROUP BY event_type ORDER BY count DESC;

-- Get User Activity Stats
-- SELECT u.id, u.username, COUNT(DISTINCT v.id) as video_count, COUNT(DISTINCT i.id) as icon_count 
-- FROM users u 
-- LEFT JOIN videos v ON u.id = v.user_id 
-- LEFT JOIN icons i ON u.id = i.user_id 
-- GROUP BY u.id, u.username;
