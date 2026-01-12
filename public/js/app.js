// API Configuration
const API_BASE_URL = '/api';

// Current user ID (in production, this would come from authentication)
let currentUserId = 1;

// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.className = `${savedTheme}-theme`;
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fa-solid fa-sun';
    } else {
        icon.className = 'fa-solid fa-moon';
    }
}

themeToggle.addEventListener('click', () => {
    const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.className = `${newTheme}-theme`;
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Track theme change
    trackEvent('theme_changed', { theme: newTheme });
});

// Onboarding Wizard
const wizard = document.getElementById('onboarding-wizard');
const closeWizard = document.getElementById('close-wizard');
const wizardNext = document.getElementById('wizard-next');
const wizardPrev = document.getElementById('wizard-prev');
let currentStep = 1;
const totalSteps = 4;

function initOnboarding() {
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    if (!onboardingCompleted) {
        wizard.classList.remove('hidden');
    } else {
        wizard.classList.add('hidden');
    }
}

function updateWizardStep(step) {
    // Update steps
    document.querySelectorAll('.wizard-step').forEach(s => s.classList.remove('active'));
    document.querySelector(`.wizard-step[data-step="${step}"]`).classList.add('active');
    
    // Update dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
        if (index + 1 === step) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    
    // Update buttons
    wizardPrev.disabled = step === 1;
    wizardNext.textContent = step === totalSteps ? 'Get Started' : 'Next';
}

wizardNext.addEventListener('click', () => {
    if (currentStep < totalSteps) {
        currentStep++;
        updateWizardStep(currentStep);
    } else {
        completeOnboarding();
    }
});

wizardPrev.addEventListener('click', () => {
    if (currentStep > 1) {
        currentStep--;
        updateWizardStep(currentStep);
    }
});

closeWizard.addEventListener('click', completeOnboarding);

function completeOnboarding() {
    wizard.classList.add('hidden');
    localStorage.setItem('onboardingCompleted', 'true');
    trackEvent('onboarding_completed', {});
}

// Tab Management
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;
        
        // Update active tab button
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update active tab pane
        tabPanes.forEach(pane => pane.classList.remove('active'));
        document.getElementById(targetTab).classList.add('active');
        
        // Track tab change
        trackEvent('tab_changed', { tab: targetTab });
        
        // Load content if needed
        if (targetTab === 'my-content') {
            loadUserContent();
        }
    });
});

// Video Generation
const videoForm = document.getElementById('video-form');
const videoStatus = document.getElementById('video-status');

videoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('video-title').value;
    const prompt = document.getElementById('video-prompt').value;
    
    try {
        videoStatus.className = 'status-message info';
        videoStatus.textContent = 'Generating video... This may take a moment.';
        
        const response = await fetch(`${API_BASE_URL}/videos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: currentUserId,
                title,
                prompt
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            videoStatus.className = 'status-message success';
            videoStatus.textContent = 'Video generation started! Check "My Content" tab to see the status.';
            videoForm.reset();
            
            // Track video generation
            trackEvent('video_generated', { title, prompt });
            
            // Check status periodically
            setTimeout(() => checkVideoStatus(data.id), 5000);
        } else {
            throw new Error(data.error || 'Failed to generate video');
        }
    } catch (error) {
        videoStatus.className = 'status-message error';
        videoStatus.textContent = `Error: ${error.message}`;
    }
});

async function checkVideoStatus(videoId) {
    try {
        const response = await fetch(`${API_BASE_URL}/videos/${videoId}`);
        const video = await response.json();
        
        if (video.status === 'completed') {
            videoStatus.className = 'status-message success';
            videoStatus.textContent = 'Video generated successfully!';
        } else if (video.status === 'failed') {
            videoStatus.className = 'status-message error';
            videoStatus.textContent = 'Video generation failed. Please try again.';
        } else {
            // Still processing, check again
            setTimeout(() => checkVideoStatus(videoId), 5000);
        }
    } catch (error) {
        console.error('Error checking video status:', error);
    }
}

// Icon Customization
const iconName = document.getElementById('icon-name');
const iconStyle = document.getElementById('icon-style');
const iconColor = document.getElementById('icon-color');
const iconSize = document.getElementById('icon-size');
const previewIcon = document.getElementById('preview-icon');
const saveIconBtn = document.getElementById('save-icon');
const exportSvgBtn = document.getElementById('export-svg');
const exportPngBtn = document.getElementById('export-png');

// Size mapping
const sizeMap = {
    small: '2rem',
    medium: '3rem',
    large: '5rem',
    xlarge: '7rem'
};

function updateIconPreview() {
    const name = iconName.value || 'heart';
    const style = iconStyle.value;
    const color = iconColor.value;
    const size = iconSize.value;
    
    previewIcon.innerHTML = `<i class="fa-${style} fa-${name}" style="color: ${color}; font-size: ${sizeMap[size]};"></i>`;
}

iconName.addEventListener('input', updateIconPreview);
iconStyle.addEventListener('change', updateIconPreview);
iconColor.addEventListener('input', updateIconPreview);
iconSize.addEventListener('change', updateIconPreview);

saveIconBtn.addEventListener('click', async () => {
    const name = iconName.value || 'heart';
    const style = iconStyle.value;
    const color = iconColor.value;
    const size = iconSize.value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/icons`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: currentUserId,
                icon_name: name,
                icon_class: `fa-${style} fa-${name}`,
                color,
                size,
                style
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('Icon saved successfully!');
            trackEvent('icon_saved', { name, style, color, size });
        } else {
            throw new Error(data.error || 'Failed to save icon');
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});

exportSvgBtn.addEventListener('click', () => {
    const iconElement = previewIcon.querySelector('i');
    const svg = createSvgFromIcon(iconElement);
    downloadFile(svg, 'icon.svg', 'image/svg+xml');
    trackEvent('icon_exported', { format: 'svg' });
});

exportPngBtn.addEventListener('click', () => {
    const iconElement = previewIcon.querySelector('i');
    const canvas = createCanvasFromIcon(iconElement);
    canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'icon.png';
        a.click();
        URL.revokeObjectURL(url);
        trackEvent('icon_exported', { format: 'png' });
    });
});

function createSvgFromIcon(iconElement) {
    const color = iconElement.style.color;
    const fontSize = iconElement.style.fontSize;
    const iconClass = iconElement.className;
    
    return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
        <text x="100" y="100" font-size="${fontSize}" fill="${color}" text-anchor="middle" dominant-baseline="middle" font-family="Font Awesome 6 Free">
            ${iconElement.textContent}
        </text>
    </svg>`;
}

function createCanvasFromIcon(iconElement) {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = iconElement.style.color;
    ctx.font = `${iconElement.style.fontSize} "Font Awesome 6 Free"`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(iconElement.textContent, 100, 100);
    
    return canvas;
}

function downloadFile(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

// Load User Content
async function loadUserContent() {
    try {
        // Load videos
        const videosResponse = await fetch(`${API_BASE_URL}/videos/user/${currentUserId}`);
        const videos = await videosResponse.json();
        displayVideos(videos);
        
        // Load icons
        const iconsResponse = await fetch(`${API_BASE_URL}/icons/user/${currentUserId}`);
        const icons = await iconsResponse.json();
        displayIcons(icons);
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

function displayVideos(videos) {
    const videosList = document.getElementById('videos-list');
    
    if (videos.length === 0) {
        videosList.innerHTML = '<p class="empty-state">No videos yet. Generate your first video!</p>';
        return;
    }
    
    videosList.innerHTML = videos.map(video => `
        <div class="content-item">
            <h3>${video.title}</h3>
            <p>Status: <strong>${video.status}</strong></p>
            <p>${new Date(video.created_at).toLocaleDateString()}</p>
            ${video.status === 'completed' && video.video_url ? 
                `<button class="btn btn-primary" onclick="downloadVideo('${video.video_url}', '${video.title}')">
                    <i class="fa-solid fa-download"></i> Download
                </button>` : ''}
        </div>
    `).join('');
}

function displayIcons(icons) {
    const iconsList = document.getElementById('icons-list');
    
    if (icons.length === 0) {
        iconsList.innerHTML = '<p class="empty-state">No icons saved yet. Customize your first icon!</p>';
        return;
    }
    
    iconsList.innerHTML = icons.map(icon => `
        <div class="content-item">
            <div style="text-align: center; padding: 1rem;">
                <i class="${icon.icon_class}" style="color: ${icon.color}; font-size: ${sizeMap[icon.size]};"></i>
            </div>
            <h3>${icon.icon_name}</h3>
            <p>${icon.style} - ${icon.size}</p>
            <p>${new Date(icon.created_at).toLocaleDateString()}</p>
        </div>
    `).join('');
}

function downloadVideo(url, title) {
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.mp4`;
    a.click();
    trackEvent('video_downloaded', { title });
}

// Analytics tracking function
function trackEvent(eventType, eventData) {
    fetch(`${API_BASE_URL}/analytics`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: currentUserId,
            event_type: eventType,
            event_data: eventData
        })
    }).catch(error => console.error('Analytics error:', error));
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initOnboarding();
    updateIconPreview();
});
