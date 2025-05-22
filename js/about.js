document.addEventListener('DOMContentLoaded', function() {
    // Accordion functionality for doctrinal beliefs
    const beliefToggles = document.querySelectorAll('.belief-toggle');
    
    beliefToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const beliefItem = this.parentElement;
            const beliefContent = this.nextElementSibling;
            
            // Close all other open items
            document.querySelectorAll('.belief-content.show').forEach(openContent => {
                if (openContent !== beliefContent) {
                    openContent.classList.remove('show');
                    openContent.previousElementSibling.classList.remove('active');
                }
            });
            
            // Toggle current item
            this.classList.toggle('active');
            beliefContent.classList.toggle('show');
        });
    });
    
    // Leadership structure animation
    const structureLevels = document.querySelectorAll('.structure-level');
    
    function animateStructure() {
        structureLevels.forEach((level, index) => {
            setTimeout(() => {
                level.style.opacity = '1';
                level.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    // Only animate when in view
    const structureSection = document.querySelector('.leadership-structure');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateStructure();
            observer.unobserve(structureSection);
        }
    }, { threshold: 0.1 });
    
    if (structureSection) {
        // Set initial state
        structureLevels.forEach(level => {
            level.style.opacity = '0';
            level.style.transform = 'translateY(20px)';
            level.style.transition = 'all 0.5s ease';
        });
        
        observer.observe(structureSection);
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});