const db = require('../db/connection');
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Create Video
const createVideo = async (req, res) => {
  try {
    const { user_id, title, prompt } = req.body;
    const [result] = await db.query(
      'INSERT INTO videos (user_id, title, prompt, status) VALUES (?, ?, ?, ?)',
      [user_id, title, prompt, 'pending']
    );
    
    // Start video generation asynchronously (fire-and-forget pattern)
    // Errors are handled within generateVideoAsync and logged
    const videoId = result.insertId;
    generateVideoAsync(videoId, prompt).catch(error => {
      console.error('Unhandled error in video generation:', error);
    });
    
    res.status(201).json({ 
      id: videoId, 
      user_id,
      title,
      prompt,
      status: 'pending',
      message: 'Video generation started' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Async video generation function
async function generateVideoAsync(videoId, prompt) {
  try {
    // Update status to processing
    await db.query(
      'UPDATE videos SET status = ? WHERE id = ?',
      ['processing', videoId]
    );

    // In a real implementation, this would call a video generation API
    // For now, we simulate the process with OpenAI text generation
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a video generation assistant. Generate a description for a video based on the user's prompt."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500
    });

    // Simulate video URL (in production, this would be the actual video URL)
    const videoUrl = `/videos/${videoId}_generated.mp4`;
    const duration = 30; // seconds

    // Update video with generated content
    await db.query(
      'UPDATE videos SET status = ?, video_url = ?, duration = ? WHERE id = ?',
      ['completed', videoUrl, duration, videoId]
    );

  } catch (error) {
    console.error('Video generation error:', error);
    await db.query(
      'UPDATE videos SET status = ? WHERE id = ?',
      ['failed', videoId]
    );
  }
}

// Get Video by ID
const getVideoById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM videos WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Videos by User ID
const getVideosByUserId = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM videos WHERE user_id = ? ORDER BY created_at DESC',
      [req.params.userId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Video
const updateVideo = async (req, res) => {
  try {
    const { title, prompt, status, video_url } = req.body;
    const [result] = await db.query(
      'UPDATE videos SET title = ?, prompt = ?, status = ?, video_url = ? WHERE id = ?',
      [title, prompt, status, video_url, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.json({ message: 'Video updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Video
const deleteVideo = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM videos WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createVideo,
  getVideoById,
  getVideosByUserId,
  updateVideo,
  deleteVideo
};
