// ===========================
// BACKGROUND MUSIC CONTROL
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = musicToggle.querySelector('.music-icon');
    
    // Set initial volume
    music.volume = 0.5;
    
    // Try to play immediately
    function attemptPlay() {
        const playPromise = music.play();
        
        if (playPromise !== undefined) {
            playPromise.then(function() {
                // Autoplay started successfully
                musicToggle.classList.remove('muted');
                musicIcon.textContent = '🔊';
            }).catch(function(error) {
                // Autoplay was prevented - show muted icon
                console.log('Autoplay prevented. Waiting for user interaction.');
                musicToggle.classList.add('muted');
                musicIcon.textContent = '🔇';
                // Make the button pulse to draw attention
                musicToggle.style.animation = 'pulse 2s infinite';
            });
        }
    }
    
    // Try to play on load
    attemptPlay();
    
    // Try to play on any user interaction
    function playOnInteraction() {
        if (music.paused) {
            attemptPlay();
        }
        // Remove listeners after first successful interaction
        document.removeEventListener('touchstart', playOnInteraction);
        document.removeEventListener('click', playOnInteraction);
    }
    
    document.addEventListener('touchstart', playOnInteraction, { passive: true });
    document.addEventListener('click', playOnInteraction);
    
    // Toggle music on button click
    musicToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        if (music.paused) {
            music.play();
            musicToggle.classList.remove('muted');
            musicIcon.textContent = '🔊';
            musicToggle.style.animation = 'none';
        } else {
            music.pause();
            musicToggle.classList.add('muted');
            musicIcon.textContent = '🔇';
        }
    });
});

// ===========================
// COUNTDOWN TIMER
// ===========================

function updateCountdown() {
    const weddingDate = new Date('May 18, 2026 16:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update the countdown display
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    // If countdown is finished
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown').innerHTML = `
            <div style="font-size: 2rem; color: var(--accent-gold); font-family: var(--font-heading);">
                The Wedding Day Has Arrived! 🎉
            </div>
        `;
    }
}

// Update countdown every second
const countdownInterval = setInterval(updateCountdown, 1000);

// Initialize countdown on page load
updateCountdown();

// ===========================
// FAQ ACCORDION
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// ===========================
// RSVP FORM HANDLING
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const attendanceSelect = document.getElementById('attendance');
    const guestsGroup = document.getElementById('guestsGroup');
    const rsvpForm = document.getElementById('rsvpForm');
    
    // Show/hide guests field based on attendance
    if (attendanceSelect) {
        attendanceSelect.addEventListener('change', function() {
            if (this.value === 'yes') {
                guestsGroup.style.display = 'block';
            } else {
                guestsGroup.style.display = 'none';
            }
        });
    }
    
    // Handle form submission
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                attendance: document.getElementById('attendance').value,
                guests: document.getElementById('guests').value,
                dietary: document.getElementById('dietary').value,
                message: document.getElementById('message').value
            };
            
            // Here you would typically send the data to a server
            // For now, we'll just show a success message
            console.log('RSVP Data:', formData);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 40px;
                border-radius: 15px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                text-align: center;
                z-index: 9999;
                max-width: 400px;
            `;
            
            if (formData.attendance === 'yes') {
                successMessage.innerHTML = `
                    <h2 style="color: var(--primary-red); font-family: var(--font-heading); margin-bottom: 20px;">
                        Thank You! 🎉
                    </h2>
                    <p style="color: var(--text-dark); line-height: 1.8;">
                        We're thrilled you'll be joining us on our special day! 
                        A confirmation email will be sent to <strong>${formData.email}</strong>
                    </p>
                    <button onclick="this.parentElement.remove()" style="
                        margin-top: 20px;
                        padding: 12px 30px;
                        background: var(--accent-gold);
                        color: var(--dark-charcoal);
                        border: none;
                        border-radius: 25px;
                        cursor: pointer;
                        font-weight: 600;
                    ">Close</button>
                `;
            } else {
                successMessage.innerHTML = `
                    <h2 style="color: var(--primary-blue); font-family: var(--font-heading); margin-bottom: 20px;">
                        We'll Miss You 💙
                    </h2>
                    <p style="color: var(--text-dark); line-height: 1.8;">
                        Thank you for letting us know. We'll miss you on our special day!
                    </p>
                    <button onclick="this.parentElement.remove()" style="
                        margin-top: 20px;
                        padding: 12px 30px;
                        background: var(--accent-gold);
                        color: var(--dark-charcoal);
                        border: none;
                        border-radius: 25px;
                        cursor: pointer;
                        font-weight: 600;
                    ">Close</button>
                `;
            }
            
            document.body.appendChild(successMessage);
            
            // Reset form
            rsvpForm.reset();
            guestsGroup.style.display = 'none';
        });
    }
});

// ===========================
// SMOOTH SCROLL FOR NAVIGATION
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// SCROLL ANIMATIONS
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for fade-in animation
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
});

// ===========================
// GALLERY IMAGE LIGHTBOX (SIMPLE)
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const lightbox = document.createElement('div');
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                cursor: pointer;
                animation: fadeIn 0.3s ease;
            `;
            
            const lightboxImg = document.createElement('img');
            lightboxImg.src = img.src;
            lightboxImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 10px;
                box-shadow: 0 10px 50px rgba(0,0,0,0.5);
            `;
            
            lightbox.appendChild(lightboxImg);
            document.body.appendChild(lightbox);
            
            lightbox.addEventListener('click', function() {
                this.remove();
            });
        });
    });
});

// ===========================
// PARALLAX EFFECT FOR HERO
// ===========================

window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// ===========================
// SCROLL ANIMATIONS
// ===========================

function revealOnScroll() {
    const elements = document.querySelectorAll('section');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('scroll-reveal');
        }
    });
}

// Initial check on page load
document.addEventListener('DOMContentLoaded', function() {
    revealOnScroll();
});

// Check on scroll
window.addEventListener('scroll', function() {
    revealOnScroll();
});

// ===========================
// PREVENT FORM RESUBMISSION ON REFRESH
// ===========================

if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}
