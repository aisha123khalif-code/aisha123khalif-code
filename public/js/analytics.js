// Analytics Module for AI Video Studio

class Analytics {
    constructor() {
        this.events = [];
        this.sessionId = this.generateSessionId();
        this.initTracking();
    }

    generateSessionId() {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    initTracking() {
        // Track page views
        this.trackPageView();

        // Track time on page
        this.startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.floor((Date.now() - this.startTime) / 1000);
            this.track('session_end', { duration_seconds: timeSpent });
        });

        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercentage = Math.floor(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );
            if (scrollPercentage > maxScroll) {
                maxScroll = scrollPercentage;
                if (maxScroll % 25 === 0) {
                    this.track('scroll_depth', { percentage: maxScroll });
                }
            }
        });

        // Track click events on important elements
        document.addEventListener('click', (e) => {
            const target = e.target.closest('button, a');
            if (target) {
                this.track('element_clicked', {
                    element: target.tagName,
                    text: target.textContent.trim().substring(0, 50),
                    class: target.className
                });
            }
        });
    }

    trackPageView() {
        this.track('page_view', {
            url: window.location.href,
            title: document.title,
            referrer: document.referrer
        });
    }

    track(eventType, eventData = {}) {
        const event = {
            type: eventType,
            data: eventData,
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            userAgent: navigator.userAgent,
            screenResolution: `${window.screen.width}x${window.screen.height}`
        };

        this.events.push(event);

        // Send to backend
        this.sendToBackend(eventType, eventData);

        // Store locally for backup
        this.storeLocally(event);
    }

    async sendToBackend(eventType, eventData) {
        try {
            await fetch('/api/analytics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: window.currentUserId || null,
                    event_type: eventType,
                    event_data: {
                        ...eventData,
                        session_id: this.sessionId
                    }
                })
            });
        } catch (error) {
            console.error('Failed to send analytics:', error);
        }
    }

    storeLocally(event) {
        try {
            const stored = JSON.parse(localStorage.getItem('analytics_events') || '[]');
            stored.push(event);
            
            // Keep only last 100 events
            if (stored.length > 100) {
                stored.shift();
            }
            
            localStorage.setItem('analytics_events', JSON.stringify(stored));
        } catch (error) {
            console.error('Failed to store analytics locally:', error);
        }
    }

    getEvents() {
        return this.events;
    }

    getStoredEvents() {
        try {
            return JSON.parse(localStorage.getItem('analytics_events') || '[]');
        } catch (error) {
            return [];
        }
    }

    clearStoredEvents() {
        localStorage.removeItem('analytics_events');
    }
}

// Initialize analytics
const analytics = new Analytics();

// Export for use in other modules
window.analytics = analytics;

// Track custom events
window.trackEvent = (eventType, eventData) => {
    analytics.track(eventType, eventData);
};
