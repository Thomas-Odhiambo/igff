document.addEventListener('DOMContentLoaded', function() {
    // Program Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const programCards = document.querySelectorAll('.program-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter programs
            programCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Tab Switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding pane
            const tabId = this.getAttribute('data-tab');
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === tabId) {
                    pane.classList.add('active');
                }
            });
            
            // Load content dynamically if needed
            if (tabId === 'upcoming') {
                loadUpcomingEvents();
            } else if (tabId === 'testimonials') {
                loadTestimonials();
            }
        });
    });
    
    // Function to load upcoming events (simulated)
    function loadUpcomingEvents() {
        const upcomingPane = document.querySelector('#upcoming .upcoming-events');
        if (upcomingPane && !upcomingPane.hasChildNodes()) {
            // Simulate loading
            upcomingPane.innerHTML = '<p class="loading-text">Loading upcoming events...</p>';
            
            // In a real implementation, this would be an AJAX call
            setTimeout(() => {
                upcomingPane.innerHTML = `
                    <div class="upcoming-event-card">
                        <div class="event-date">
                            <span class="date-day">15</span>
                            <span class="date-month">JUN</span>
                        </div>
                        <div class="event-details">
                            <h4>Leadership Conference</h4>
                            <p>Nairobi, Kenya</p>
                            <a href="#" class="btn btn-primary">Details</a>
                        </div>
                    </div>
                    <!-- Additional events would be added here -->
                `;
            }, 800);
        }
    }
    
    // Function to load testimonials (simulated)
    function loadTestimonials() {
        const testimonialsPane = document.querySelector('#testimonials .testimonials-slider');
        if (testimonialsPane && !testimonialsPane.hasChildNodes()) {
            // Simulate loading
            testimonialsPane.innerHTML = '<p class="loading-text">Loading testimonials...</p>';
            
            // In a real implementation, this would be an AJAX call
            setTimeout(() => {
                testimonialsPane.innerHTML = `
                    <div class="testimonial active">
                        <blockquote>
                            <p>"The campus discipleship program completely transformed my university experience. I found authentic Christian community and grew deeper in my faith."</p>
                            <footer>
                                <img src="images/testimonial2.jpg" alt="James K.">
                                <cite>James K., Kenyatta University</cite>
                            </footer>
                        </blockquote>
                    </div>
                    <!-- Additional testimonials would be added here -->
                `;
                
                // Initialize testimonial slider
                initTestimonialSlider();
            }, 800);
        }
    }
    
    // Initialize testimonial slider
    function initTestimonialSlider() {
        const testimonials = document.querySelectorAll('.testimonial');
        let currentIndex = 0;
        
        if (testimonials.length > 1) {
            setInterval(() => {
                testimonials[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % testimonials.length;
                testimonials[currentIndex].classList.add('active');
            }, 5000);
        }
    }
    
    // Initial load of default tab content
    loadUpcomingEvents();
    
    // Animation for program cards on scroll
    const animateOnScroll = () => {
        const cards = document.querySelectorAll('.program-card');
        const windowHeight = window.innerHeight;
        
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const animationPoint = windowHeight - 100;
            
            if (cardPosition < animationPoint) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state and add scroll event listener
    programCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});