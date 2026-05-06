document.addEventListener('DOMContentLoaded', () => {
    console.log('Stats script initialized');
    const statsContainer = document.querySelector('.stats-feed');
    const totalCountEl = document.querySelector('.stats-total-count');
    const apiBase = window.portfolioConfig.apiBaseUrl || '';

    // 1. Track this visit
    const trackVisit = async () => {
        try {
            await fetch(`${apiBase}/api/stats/track`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            // After tracking, refresh the insights
            fetchInsights();
        } catch (err) {
            console.error('Tracking failed:', err);
        }
    };

    // 2. Fetch recent insights
    const fetchInsights = async () => {
        try {
            const response = await fetch(`${apiBase}/api/stats/recent`);
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            const data = await response.json();
            
            if (data.recent && statsContainer) {
                renderInsights(data.recent, data.total);
            }
        } catch (err) {
            console.error('Insights fetch failed:', err);
            if (statsContainer) {
                statsContainer.innerHTML = `<div class="stats-loading">Connection Error: ${err.message}. Make sure backend is running on port 3000.</div>`;
            }
        }
    };

    const renderInsights = (visitors, total) => {
        if (totalCountEl) {
            totalCountEl.textContent = total.toLocaleString();
        }

        if (statsContainer) {
            statsContainer.innerHTML = visitors.map(v => `
                <div class="stats-item">
                    <span class="stats-flag">${v.flag || '🌐'}</span>
                    <div class="stats-info">
                        <span class="stats-location">${v.city}, ${v.country}</span>
                        <span class="stats-time">${formatTime(v.createdAt)}</span>
                    </div>
                </div>
            `).join('');
        }
    };

    const formatTime = (dateStr) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffInSecs = Math.floor((now - date) / 1000);
        
        if (diffInSecs < 60) return 'just now';
        if (diffInSecs < 3600) return `${Math.floor(diffInSecs / 60)}m ago`;
        if (diffInSecs < 86400) return `${Math.floor(diffInSecs / 3600)}h ago`;
        return date.toLocaleDateString();
    };

    // Initial sequence
    trackVisit();
    // Refresh every 30 seconds to show live activity
    setInterval(fetchInsights, 30000);
});
