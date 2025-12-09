// Enhanced Dashboard System
class Dashboard {
    constructor() {
        this.userData = JSON.parse(localStorage.getItem('userData')) || {
            recentActivity: [
                { type: 'welcome', title: 'Welcome to HarvestHub!', time: 'Just now', icon: '🎉' }
            ]
        };
        this.init();
    }

    init() {
        this.setupNavigation();
        this.loadContent();
    }

    setupNavigation() {
        const mainNav = document.getElementById('mainNav');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser) {
            // User is logged in
            mainNav.innerHTML = `
                <li><a href="#" id="dashboardLink" style="color: #2e7d32; background: rgba(46, 125, 50, 0.1);">Dashboard</a></li>
                <li><a href="videos.html"> Videos</a></li>
                <li><a href="tutorials.html">Tutorials</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="#" class="btn btn-outline" id="logoutBtn">Logout</a></li>
            `;
        } else {
            // User is not logged in - About is accessible
            mainNav.innerHTML = `
                <li><a href="index.html"> Home</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="login.html" class="btn btn-outline"> Sign In</a></li>
                <li><a href="signup.html" class="btn btn-primary"> Get Started</a></li>
            `;
        }

        // Add event listeners
        document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }

    loadContent() {
        const contentContainer = document.getElementById('contentContainer');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser) {
            // Show Enhanced Dashboard for logged in users
            contentContainer.innerHTML = this.getDashboardHTML(currentUser);
        } else {
            // Show Enhanced Homepage for non-logged users
            contentContainer.innerHTML = this.getPublicHomepageHTML();
        }
    }

    getDashboardHTML(currentUser) {
        return `
            <div class="container">
                <div class="dashboard">
                    <div class="dashboard-header">
                        <h2>Welcome back, ${currentUser.name}! 👋</h2>
                        <p>Continue your urban gardening journey with our expert tutorials</p>
                    </div>
                    
                    <div class="dashboard-buttons">
                        <a href="videos.html" class="btn btn-primary">
                             Watch Videos
                            <small style="font-size: 0.9rem; opacity: 0.9;">Learn visually</small>
                        </a>
                        <a href="tutorials.html" class="btn btn-secondary">
                            Read Tutorials
                            <small style="font-size: 0.9rem; opacity: 0.9;">Step-by-step guides</small>
                        </a>
                    </div>
                    
                    <div class="recent-activities">
                        <h3>Your Recent Activities</h3>
                        ${this.getRecentActivityHTML()}
                    </div>
                    
                    <div style="text-align: center; margin-top: 3rem; color: #666; font-size: 0.9rem;">
                        <p>🎯 Complete 3 tutorials to unlock your first gardening achievement!</p>
                    </div>
                </div>
            </div>
        `;
    }

    getPublicHomepageHTML() {
        return `
            <div class="container">
                <div class="home-hero">
                    <h1>🌱 Grow Fresh Vegetables Anywhere</h1>
                    <p>Learn urban gardening techniques for apartments, balconies, and small spaces. Start your journey to fresh, home-grown food today.</p>
                    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <a href="signup.html" class="btn btn-primary btn-large">Start Free</a>
                        <a href="login.html" class="btn btn-outline btn-large">Sign In</a>
                    </div>
                </div>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <div class="feature-icon"></div>
                        <h3>Video Tutorials</h3>
                        <p>Watch expert gardeners demonstrate techniques for small-space cultivation</p>
                        <a href="signup.html" class="btn btn-outline" style="margin-top: 1rem;">Unlock Videos</a>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon"></div>
                        <h3>Step-by-Step Guides</h3>
                        <p>Detailed tutorials for every stage of your gardening journey</p>
                        <a href="signup.html" class="btn btn-outline" style="margin-top: 1rem;">Unlock Tutorials</a>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon"></div>
                        <h3>Learn About Us</h3>
                        <p>Discover our mission, team, and gardening philosophy</p>
                        <a href="about.html" class="btn btn-primary" style="margin-top: 1rem;">Visit About Page</a>
                    </div>
                </div>
                
                <div style="text-align: center; margin: 4rem 0;">
                    <h2>Ready to Start Growing?</h2>
                    <p style="max-width: 600px; margin: 0 auto 2rem;">Join thousands of urban gardeners who are growing their own fresh vegetables.</p>
                    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <a href="signup.html" class="btn btn-primary btn-large"> Get Started Free</a>
                        <a href="about.html" class="btn btn-outline btn-large">Learn More</a>
                    </div>
                </div>
            </div>
        `;
    }

    getRecentActivityHTML() {
        return this.userData.recentActivity.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">${activity.icon}</div>
                <div class="activity-content">
                    <h4>${activity.title}</h4>
                    <p>${activity.type === 'video' ? 'Watched a video tutorial' : 
                         activity.type === 'tutorial' ? 'Read a gardening guide' : 
                         activity.type === 'welcome' ? 'Started your gardening journey' : 
                         'Completed an achievement'}</p>
                </div>
                <div class="activity-time">${activity.time}</div>
            </div>
        `).join('');
    }

    recordActivity(type, title) {
        const newActivity = {
            type: type,
            title: title,
            time: this.getTimeAgo(),
            icon: type === 'video' ? '🎥' : '📖'
        };

        this.userData.recentActivity.unshift(newActivity);
        this.userData.recentActivity = this.userData.recentActivity.slice(0, 5);
        localStorage.setItem('userData', JSON.stringify(this.userData));
    }

    getTimeAgo() {
        const times = ['Just now', '1 hour ago', 'Today', 'Yesterday', 'This week'];
        return times[Math.floor(Math.random() * times.length)];
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new Dashboard();
    
    // Record initial activity for new users
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (currentUser && userData && userData.recentActivity.length === 0) {
        window.dashboard.recordActivity('welcome', 'Welcome to HarvestHub!');
    }
});