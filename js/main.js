// Main application functionality
class App {
    constructor() {
        this.videos = [
            {
                id: "w77zPAtVTuI",
                title: "Small Space Vegetable Gardening",
                description: "Learn how to grow vegetables in limited spaces with this comprehensive guide. Perfect for beginners!",
                summary: "This video covers the basics of container gardening, soil preparation, and choosing the right vegetables for small spaces."
            },
            {
                id: "m1hFhVvF-fU",
                title: "Balcony Garden Setup",
                description: "Transform your balcony into a productive vegetable garden with these simple steps.",
                summary: "Learn about balcony-friendly containers, sunlight optimization, and drainage solutions for successful balcony gardening."
            },
            {
                id: "4D4KZ4H5o9Y",
                title: "Vertical Gardening Ideas",
                description: "Maximize your growing space with creative vertical gardening techniques.",
                summary: "Discover innovative vertical gardening systems, plant selection, and maintenance tips for vertical gardens."
            },
            {
                id: "videoseries?list=PLgJq9piFwGZQ8X3VM-6Hj-moHt4QO2SIN",
                title: "Container Gardening Series",
                description: "Complete series on container gardening from start to harvest.",
                summary: "A comprehensive series covering everything from choosing containers to harvesting your home-grown vegetables."
            }
        ];

        this.tutorials = [
            {
                title: "Choosing the Right Containers for Vegetables",
                preview: "Selecting the proper containers is crucial for successful vegetable gardening in small spaces...",
                fullContent: `
                    <h4>Choosing the Right Containers for Vegetables</h4>
                    <p><strong>Container Size:</strong> Most vegetables need containers at least 12 inches deep. Root vegetables like carrots need 18-24 inches.</p>
                    <p><strong>Material Options:</strong></p>
                    <ul>
                        <li><strong>Plastic:</strong> Lightweight, retains moisture well</li>
                        <li><strong>Terracotta:</strong> Breathable but dries out quickly</li>
                        <li><strong>Fabric Pots:</strong> Excellent aeration, prevents overwatering</li>
                        <li><strong>Wood:</strong> Natural look, good insulation</li>
                    </ul>
                    <p><strong>Drainage:</strong> Ensure containers have adequate drainage holes. Add a layer of gravel or broken pottery pieces at the bottom.</p>
                    <p><strong>Self-Watering Containers:</strong> Great for busy gardeners as they provide consistent moisture.</p>
                `
            },
            {
                title: "Creating the Perfect Soil Mix",
                preview: "The right soil mixture can make or break your container garden. Here's how to create the ideal blend...",
                fullContent: `
                    <h4>Creating the Perfect Soil Mix</h4>
                    <p>Never use garden soil in containers - it becomes compacted and doesn't drain properly.</p>
                    <p><strong>Basic Recipe:</strong></p>
                    <ul>
                        <li>60% high-quality potting mix</li>
                        <li>30% compost (for nutrients)</li>
                        <li>10% perlite or vermiculite (for aeration)</li>
                    </ul>
                    <p><strong>For Heavy Feeders:</strong> Add worm castings or slow-release organic fertilizer</p>
                    <p><strong>pH Level:</strong> Most vegetables prefer slightly acidic soil (6.0-6.8 pH)</p>
                    <p><strong>Refresh Soil:</strong> Replace top 2-3 inches of soil each season or completely replace every 2 years</p>
                `
            },
            {
                title: "Watering Techniques for Container Gardens",
                preview: "Proper watering is essential for healthy vegetable plants. Learn when and how much to water...",
                fullContent: `
                    <h4>Watering Techniques for Container Gardens</h4>
                    <p><strong>When to Water:</strong> Check soil moisture daily. Water when the top inch feels dry.</p>
                    <p><strong>Best Time:</strong> Early morning or late afternoon to reduce evaporation</p>
                    <p><strong>How Much:</strong> Water until it drains from the bottom - this ensures deep root growth</p>
                    <p><strong>Signs of Overwatering:</strong> Yellow leaves, mold growth, wilting despite wet soil</p>
                    <p><strong>Signs of Underwatering:</strong> Dry, crispy leaves, soil pulling away from container edges</p>
                    <p><strong>Mulching:</strong> Add 1-2 inches of mulch to retain moisture and reduce watering frequency</p>
                `
            },
            {
                title: "Choosing Vegetables for Small Spaces",
                preview: "Not all vegetables are created equal for container gardening. Here are the best options...",
                fullContent: `
                    <h4>Choosing Vegetables for Small Spaces</h4>
                    <p><strong>Best Choices for Beginners:</strong></p>
                    <ul>
                        <li><strong>Lettuce & Greens:</strong> Quick growing, shade tolerant</li>
                        <li><strong>Radishes:</strong> Fast harvest (3-4 weeks)</li>
                        <li><strong>Cherry Tomatoes:</strong> Use determinate varieties</li>
                        <li><strong>Peppers:</strong> Compact varieties available</li>
                        <li><strong>Herbs:</strong> Basil, parsley, mint, thyme</li>
                    </ul>
                    <p><strong>Space-Saving Varieties:</strong> Look for "patio," "bush," "compact," or "dwarf" varieties</p>
                    <p><strong>Vertical Growers:</strong> Pole beans, peas, cucumbers (with trellis)</p>
                    <p><strong>Avoid:</strong> Large plants like corn, pumpkins, and most fruit trees</p>
                `
            }
        ];

        this.init();
    }

    init() {
        this.loadContent();
        this.setupEventListeners();
    }

    // Load content based on page
    loadContent() {
        const contentArea = document.getElementById('contentArea');
        if (!contentArea) return;

        const currentPage = window.location.pathname.split('/').pop();

        if (currentPage === 'videos.html') {
            this.loadVideos();
        } else if (currentPage === 'tutorials.html') {
            this.loadTutorials();
        }
    }

    // Load videos with summaries
    loadVideos() {
        const contentArea = document.getElementById('contentArea');
        contentArea.innerHTML = `
            <div class="video-grid" id="videosGrid"></div>
        `;

        const videosGrid = document.getElementById('videosGrid');
        
        this.videos.forEach((video, index) => {
            const videoCard = document.createElement('div');
            videoCard.className = 'video-card';
            videoCard.dataset.index = index;
            
            videoCard.innerHTML = `
                <div class="video-wrapper">
                    <iframe 
                        src="https://www.youtube.com/embed/${video.id}" 
                        title="${video.title}"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
                <div class="video-info">
                    <div class="video-title">${video.title}</div>
                    <div class="video-description">${video.description}</div>
                    <div class="video-summary" style="display: none; margin-top: 1rem; padding: 1rem; background: #e8f5e9; border-radius: 5px;">
                        <strong>Summary:</strong> ${video.summary}
                    </div>
                    <button class="btn btn-outline" style="margin-top: 1rem; width: 100%; padding: 0.5rem;" onclick="app.toggleSummary(${index})">
                        Show Summary
                    </button>
                </div>
            `;
            
            videosGrid.appendChild(videoCard);
        });
    }

    // Load tutorials with expandable content
    loadTutorials() {
        const contentArea = document.getElementById('contentArea');
        contentArea.innerHTML = `
            <div class="tutorial-grid" id="tutorialsGrid"></div>
        `;

        const tutorialsGrid = document.getElementById('tutorialsGrid');
        
        this.tutorials.forEach((tutorial, index) => {
            const tutorialCard = document.createElement('div');
            tutorialCard.className = 'tutorial-card';
            tutorialCard.dataset.index = index;
            
            tutorialCard.innerHTML = `
                <h3>${tutorial.title}</h3>
                <div class="tutorial-preview">${tutorial.preview}</div>
                <div class="tutorial-full" id="tutorial-${index}">
                    ${tutorial.fullContent}
                </div>
                <button class="btn btn-primary" onclick="app.toggleTutorial(${index})" style="margin-top: 1rem;">
                    Read Full Tutorial
                </button>
            `;
            
            tutorialsGrid.appendChild(tutorialCard);
        });
    }

    // Toggle video summary
    toggleSummary(index) {
        const videoCard = document.querySelector(`.video-card[data-index="${index}"]`);
        const summary = videoCard.querySelector('.video-summary');
        const button = videoCard.querySelector('button');
        
        if (summary.style.display === 'none') {
            summary.style.display = 'block';
            button.textContent = 'Hide Summary';
        } else {
            summary.style.display = 'none';
            button.textContent = 'Show Summary';
        }
    }

    // Toggle tutorial full content
    toggleTutorial(index) {
        const tutorialFull = document.getElementById(`tutorial-${index}`);
        const button = tutorialFull.parentElement.querySelector('button');
        
        tutorialFull.classList.toggle('show');
        
        if (tutorialFull.classList.contains('show')) {
            button.textContent = 'Show Less';
            button.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            button.textContent = 'Read Full Tutorial';
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Additional event listeners can be added here
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});