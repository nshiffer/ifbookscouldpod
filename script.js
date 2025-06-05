// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - navbar.offsetHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const navbarToggle = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            
            if (navbarCollapse.classList.contains('show')) {
                navbarToggle.click();
            }
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animations
    const animateElements = document.querySelectorAll('.about-card, .host-card, .episode-card, .social-card');
    animateElements.forEach(el => observer.observe(el));
    
    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Handle already loaded images
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.about-card, .host-card, .episode-card, .social-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click animation to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                from {
                    transform: scale(0);
                    opacity: 1;
                }
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Episode filter functionality (for future use)
    function filterEpisodes(searchTerm) {
        const episodes = document.querySelectorAll('.episode-card');
        
        episodes.forEach(episode => {
            const title = episode.querySelector('.episode-title').textContent.toLowerCase();
            const author = episode.querySelector('.episode-author').textContent.toLowerCase();
            
            if (title.includes(searchTerm.toLowerCase()) || author.includes(searchTerm.toLowerCase())) {
                episode.style.display = 'block';
                episode.classList.add('fade-in');
            } else {
                episode.style.display = 'none';
            }
        });
    }
    
    // Lazy loading for podcast episodes (simulate API call)
    function loadMoreEpisodes() {
        // This would typically fetch from an API
        // For now, just a placeholder for future implementation
        console.log('Loading more episodes...');
    }
    
    // Add scroll-to-top functionality
    function createScrollToTop() {
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--sky-blue);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 18px;
            box-shadow: 0 4px 15px rgba(255, 107, 157, 0.4);
            transition: all 0.3s ease;
            opacity: 0;
            visibility: hidden;
            z-index: 1000;
        `;
        
        document.body.appendChild(scrollToTopBtn);
        
        // Show/hide scroll to top button
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
            }
        });
        
        // Scroll to top functionality
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Hover effect
        scrollToTopBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
            this.style.boxShadow = '0 8px 25px rgba(255, 107, 157, 0.6)';
        });
        
        scrollToTopBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 15px rgba(255, 107, 157, 0.4)';
        });
    }
    
    // Initialize scroll to top
    createScrollToTop();
    
    // Add loading screen (optional)
    function createLoadingScreen() {
        const loader = document.createElement('div');
        loader.className = 'loading-screen';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, var(--dusty-pink) 0%, var(--sky-blue) 35%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        `;
        
        loader.innerHTML = `
            <div style="text-align: center; color: white;">
                <div style="width: 50px; height: 50px; border: 3px solid rgba(255,255,255,0.3); border-top: 3px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
                <h3 style="font-family: 'Playfair Display', serif; margin: 0;">If Books Could Kill</h3>
                <p style="margin: 10px 0 0; opacity: 0.8;">Loading...</p>
            </div>
        `;
        
        // Add spin animation
        if (!document.querySelector('#loading-styles')) {
            const style = document.createElement('style');
            style.id = 'loading-styles';
            style.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(loader);
        
        // Remove loading screen after a delay
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1500);
    }
    
    // Uncomment to enable loading screen
    // createLoadingScreen();
    
    // Add typing effect to hero subtitle
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Initialize typing effect after a delay
    setTimeout(() => {
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) {
            const originalText = heroSubtitle.textContent;
            typeWriter(heroSubtitle, originalText, 30);
        }
    }, 1000);
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Press 'Escape' to close mobile menu
        if (e.key === 'Escape') {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const navbarToggle = document.querySelector('.navbar-toggler');
                navbarToggle.click();
            }
        }
        
        // Press 'Home' to scroll to top
        if (e.key === 'Home' && e.ctrlKey) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
    
    // Add touch gestures for mobile
    let touchStartY = 0;
    let touchStartX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
    });
    
    document.addEventListener('touchend', function(e) {
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndX = e.changedTouches[0].clientX;
        const diffY = touchStartY - touchEndY;
        const diffX = touchStartX - touchEndX;
        
        // Swipe down to refresh (if at top of page)
        if (diffY < -100 && Math.abs(diffX) < 50 && window.scrollY === 0) {
            // Could add pull-to-refresh functionality here
            console.log('Pull to refresh gesture detected');
        }
    });
    
    // Load latest episodes from RSS feed
    loadLatestEpisodes();
    
    // Add refresh episodes functionality
    const refreshButton = document.getElementById('refresh-episodes');
    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            const icon = this.querySelector('i');
            icon.classList.add('fa-spin');
            
            loadLatestEpisodes().finally(() => {
                icon.classList.remove('fa-spin');
            });
        });
    }
    
    console.log('If Books Could Kill website loaded successfully!');
});

// Function to load latest episodes from RSS feed
async function loadLatestEpisodes() {
    const episodesContainer = document.getElementById('episodes-container');
    const fallbackEpisodes = document.querySelectorAll('.fallback-episode');
    const loadingIndicator = document.getElementById('episodes-loading');
    
    // Show loading indicator
    loadingIndicator.style.display = 'block';
    episodesContainer.style.opacity = '0.5';
    
    try {
        // Try to fetch from RSS feed using a CORS proxy
        const rssUrl = 'https://feeds.buzzsprout.com/2040953.rss';
        const corsProxy = 'https://api.allorigins.win/raw?url=';
        
        const response = await fetch(corsProxy + encodeURIComponent(rssUrl));
        
        if (!response.ok) {
            throw new Error('Failed to fetch RSS feed');
        }
        
        const rssText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(rssText, 'text/xml');
        
        // Parse RSS items
        const items = xmlDoc.querySelectorAll('item');
        const episodes = [];
        
        // Get the first 3 episodes
        for (let i = 0; i < Math.min(3, items.length); i++) {
            const item = items[i];
            const title = item.querySelector('title')?.textContent || 'Episode Title';
            const pubDate = item.querySelector('pubDate')?.textContent || '';
            const description = item.querySelector('description')?.textContent || '';
            const link = item.querySelector('link')?.textContent || 'https://open.spotify.com/show/2khJBoF73ujIATWUFtSxLD';
            
            // Parse the date
            const date = new Date(pubDate);
            const formattedDate = date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            
            // Extract book author from title or description
            let author = '';
            let cleanTitle = title;
            
            // Handle specific episode patterns
            if (title.includes('TEASER')) {
                author = 'Premium Preview';
                cleanTitle = title;
            } else if (title.includes('"') && title.includes('"')) {
                // Extract book title in quotes and author
                const bookMatch = title.match(/"([^"]+)"/);
                const authorMatch = title.match(/by\s+([^,\n\[\]]+)/i) || 
                                  description.match(/by\s+([^,\n\.]+)/i);
                
                if (bookMatch) {
                    cleanTitle = bookMatch[1];
                }
                if (authorMatch) {
                    author = `by ${authorMatch[1].trim()}`;
                }
            } else {
                // General patterns for book analysis episodes
                const patterns = [
                    /^([^:]+):\s*(.+)$/,  // "Topic: Description" format
                    /^(.+?)\s+by\s+(.+)$/i,  // "Title by Author" format
                ];
                
                for (const pattern of patterns) {
                    const match = title.match(pattern);
                    if (match) {
                        if (pattern.source.includes('by')) {
                            cleanTitle = match[1].trim();
                            author = `by ${match[2].trim()}`;
                        }
                        break;
                    }
                }
            }
            
            // If no author found, try description
            if (!author && description) {
                const descMatch = description.match(/by\s+([^,\n\.]+)/i);
                if (descMatch) {
                    author = `by ${descMatch[1].trim()}`;
                }
            }
            
            // Fallback for episodes without clear book authors
            if (!author) {
                author = 'Analysis & Commentary';
            }
            
            episodes.push({
                number: i + 1,
                title: cleanTitle,
                author: author,
                date: formattedDate,
                link: link
            });
        }
        
        // Clear existing content and add new episodes
        if (episodes.length > 0) {
            episodesContainer.innerHTML = '';
            
            episodes.forEach((episode, index) => {
                const episodeHtml = `
                    <div class="col-lg-4 col-md-6 mb-4 dynamic-episode">
                        <div class="episode-card">
                            <div class="episode-number">Latest ${index === 0 ? '' : index === 1 ? '2nd' : '3rd'}</div>
                            <h3 class="episode-title">${episode.title}</h3>
                            <p class="episode-author">${episode.author}</p>
                            <p class="episode-date">${episode.date}</p>
                            <a href="https://open.spotify.com/show/2khJBoF73ujIATWUFtSxLD" class="btn btn-outline-primary btn-sm" target="_blank" rel="noopener">Listen Now</a>
                        </div>
                    </div>
                `;
                episodesContainer.innerHTML += episodeHtml;
            });
            
            // Add fade-in animation to new episodes
            const dynamicEpisodes = document.querySelectorAll('.dynamic-episode');
            dynamicEpisodes.forEach((episode, index) => {
                setTimeout(() => {
                    episode.classList.add('fade-in');
                }, index * 100);
            });
            
            console.log('Successfully loaded latest episodes from RSS feed');
        } else {
            throw new Error('No episodes found in RSS feed');
        }
        
    } catch (error) {
        console.log('Failed to load dynamic episodes, using fallback content:', error.message);
        
        // Show fallback episodes if dynamic loading fails
        fallbackEpisodes.forEach((episode, index) => {
            setTimeout(() => {
                episode.classList.add('fade-in');
            }, index * 100);
        });
    } finally {
        // Hide loading indicator
        loadingIndicator.style.display = 'none';
        episodesContainer.style.opacity = '1';
    }
}

// Alternative function to try loading from Buzzsprout API (if available)
async function tryBuzzsproutAPI() {
    try {
        // This is a hypothetical API endpoint - Buzzsprout may not provide public API
        const response = await fetch('https://www.buzzsprout.com/api/2040953/episodes.json');
        
        if (!response.ok) {
            throw new Error('Buzzsprout API not available');
        }
        
        const data = await response.json();
        return data.episodes || [];
    } catch (error) {
        console.log('Buzzsprout API not available:', error.message);
        return [];
    }
}

// Function to extract episode data from HTML content (if needed)
function parseEpisodeFromHTML(htmlContent) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // This would need to be customized based on Buzzsprout's HTML structure
    const episodes = [];
    const episodeElements = doc.querySelectorAll('.episode-item'); // Hypothetical selector
    
    episodeElements.forEach((element, index) => {
        if (index < 3) { // Only get first 3
            const title = element.querySelector('.episode-title')?.textContent || '';
            const date = element.querySelector('.episode-date')?.textContent || '';
            const author = element.querySelector('.episode-author')?.textContent || '';
            
            episodes.push({
                title,
                author,
                date,
                number: index + 1
            });
        }
    });
    
    return episodes;
} 