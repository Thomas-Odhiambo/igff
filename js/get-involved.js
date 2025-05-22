document.addEventListener('DOMContentLoaded', function() {
    // Pathway Tab Switching
    const pathwayButtons = document.querySelectorAll('.pathway-btn');
    const pathwayContents = document.querySelectorAll('.pathway-content');
    
    pathwayButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active classes
            pathwayButtons.forEach(btn => btn.classList.remove('active'));
            pathwayContents.forEach(content => content.classList.remove('active'));
            
            // Add active classes
            this.classList.add('active');
            const pathway = this.dataset.pathway;
            const targetContent = document.getElementById(pathway);
            if (targetContent) targetContent.classList.add('active');
        });
    });

    // Donation Card Selection
    document.querySelectorAll('.donation-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.donation-card').forEach(c => {
                c.classList.remove('selected');
            });
            this.classList.add('selected');
        });
    });

    // Prayer Counter Animation
    const prayerCounter = document.querySelector('.prayer-counter');
    if (prayerCounter) {
        let currentCount = 0;
        const targetCount = parseInt(prayerCounter.textContent);
        const increment = Math.ceil(targetCount / 100);

        const updateCounter = () => {
            currentCount += increment;
            if (currentCount >= targetCount) {
                currentCount = targetCount;
                clearInterval(counterInterval);
            }
            prayerCounter.textContent = currentCount;
        };

        const counterInterval = setInterval(updateCounter, 50);
    }

    // Modal Handling
    const modal = document.getElementById('volunteer-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (modal) {
        // Open modal
        document.querySelectorAll('[data-modal-target]').forEach(btn => {
            btn.addEventListener('click', () => {
                modal.classList.add('active');
            });
        });

        // Close modal
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Close when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Form Validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const valid = validateForm(this);
            if (valid) {
                this.submit();
            }
        });
    });

    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        return isValid;
    }
});