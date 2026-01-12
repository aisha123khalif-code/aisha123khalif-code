// Example: Creating a User and Generating a Video

const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:3000/api';

async function example() {
  try {
    console.log('🎬 AI Video Studio API Example\n');

    // Step 1: Create a user
    console.log('1️⃣  Creating a new user...');
    const userResponse = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'demo_user',
        email: 'demo@example.com'
      })
    });
    const user = await userResponse.json();
    console.log('✅ User created:', user);
    console.log('');

    // Step 2: Save a customized icon
    console.log('2️⃣  Saving a customized icon...');
    const iconResponse = await fetch(`${API_BASE_URL}/icons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user.id,
        icon_name: 'rocket',
        icon_class: 'fa-solid fa-rocket',
        color: '#3498db',
        size: 'large',
        style: 'solid'
      })
    });
    const icon = await iconResponse.json();
    console.log('✅ Icon saved:', icon);
    console.log('');

    // Step 3: Generate a video
    console.log('3️⃣  Generating a video...');
    const videoResponse = await fetch(`${API_BASE_URL}/videos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user.id,
        title: 'Demo Video',
        prompt: 'Create an amazing video about space exploration and the future of humanity'
      })
    });
    const video = await videoResponse.json();
    console.log('✅ Video generation started:', video);
    console.log('');

    // Step 4: Check video status
    console.log('4️⃣  Checking video status (waiting 10 seconds)...');
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    const statusResponse = await fetch(`${API_BASE_URL}/videos/${video.id}`);
    const videoStatus = await statusResponse.json();
    console.log('✅ Video status:', videoStatus);
    console.log('');

    // Step 5: Get user's content
    console.log('5️⃣  Fetching user content...');
    const userVideosResponse = await fetch(`${API_BASE_URL}/videos/user/${user.id}`);
    const userVideos = await userVideosResponse.json();
    console.log(`✅ User has ${userVideos.length} video(s)`);

    const userIconsResponse = await fetch(`${API_BASE_URL}/icons/user/${user.id}`);
    const userIcons = await userIconsResponse.json();
    console.log(`✅ User has ${userIcons.length} icon(s)`);
    console.log('');

    // Step 6: Track analytics event
    console.log('6️⃣  Tracking analytics event...');
    await fetch(`${API_BASE_URL}/analytics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user.id,
        event_type: 'example_completed',
        event_data: { example: 'API usage example' }
      })
    });
    console.log('✅ Analytics event tracked');
    console.log('');

    console.log('🎉 Example completed successfully!');
    console.log('');
    console.log('💡 Try these next:');
    console.log('   - Update the user theme preference');
    console.log('   - Customize more icons');
    console.log('   - Check analytics summary endpoint');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('');
    console.log('Make sure:');
    console.log('   1. The server is running (npm start)');
    console.log('   2. Database is set up (npm run install-db)');
    console.log('   3. Environment variables are configured (.env)');
  }
}

// Run the example
if (require.main === module) {
  example();
}

module.exports = example;
