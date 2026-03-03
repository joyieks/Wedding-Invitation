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

// Initialize EmailJS
// Get your credentials from https://www.emailjs.com/
emailjs.init("vk4GtJc1VVqgKTtMp"); // Replace with your EmailJS Public Key

document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggleRsvpBtn');
    const formContainer = document.getElementById('rsvpFormContainer');
    const attendanceSelect = document.getElementById('attendance');
    const guestsGroup = document.getElementById('guestsGroup');
    const rsvpForm = document.getElementById('rsvpForm');
    
    // Toggle form visibility
    if (toggleBtn && formContainer) {
        toggleBtn.addEventListener('click', function() {
            if (formContainer.style.display === 'none') {
                formContainer.style.display = 'block';
                toggleBtn.textContent = 'HIDE FORM';
                // Smooth scroll to form
                setTimeout(() => {
                    formContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            } else {
                formContainer.style.display = 'none';
                toggleBtn.textContent = 'RSVP NOW';
            }
        });
    }
    
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
                phone: document.getElementById('phone').value || 'Not provided',
                attendance: document.getElementById('attendance').value,
                guests: document.getElementById('guests').value,
                dietary: document.getElementById('dietary').value || 'None',
                message: document.getElementById('message').value || 'No message'
            };
            
            // Show loading state
            const submitBtn = rsvpForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Send email using EmailJS
            emailjs.send('service_ua0hodd', 'template_7oa40pd', {
                to_email: 'poncejoanjoyd@gmail.com',
                from_name: formData.fullName,
                phone: formData.phone,
                attendance: formData.attendance === 'yes' ? 'Joyfully Accept' : 'Regretfully Decline',
                guests: formData.guests,
                dietary: formData.dietary,
                message: formData.message
            })
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
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
                            Your RSVP has been sent successfully.
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
                
                // Reset form and hide it
                rsvpForm.reset();
                guestsGroup.style.display = 'none';
                formContainer.style.display = 'none';
                toggleBtn.textContent = 'RSVP NOW';
            }, function(error) {
                console.log('FAILED...', error);
                
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Show error message
                alert('Sorry, there was an error sending your RSVP. Please try again or contact us directly.');
            });
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
    const elements = document.querySelectorAll('section:not(.entourage-section)');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('scroll-reveal');
        }
    });
    
    // Always keep entourage section visible
    const entourageSection = document.querySelector('.entourage-section');
    if (entourageSection) {
        entourageSection.classList.add('scroll-reveal');
    }
}

// Initial check on page load
document.addEventListener('DOMContentLoaded', function() {
    revealOnScroll();
    // Force reveal all sections immediately for debugging
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('scroll-reveal');
    });
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

// ===========================
// ENVELOPE ANIMATION
// ===========================

// Force scroll to top on page load/refresh
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});

window.addEventListener('load', function() {
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 0);
});

document.addEventListener('DOMContentLoaded', function() {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Prevent body scrolling while envelope is visible
    document.body.classList.add('envelope-active');
    
    const closedEnvelope = document.getElementById('closedEnvelope');
    const envelopeOverlay = document.getElementById('envelopeOverlay');
    const invitationCard = document.getElementById('invitationCard');
    const openInvitationBtn = document.getElementById('openInvitationBtn');
    const envelopeContainer = document.querySelector('.envelope-container');
    
    // Click envelope to open and show invitation card
    if (closedEnvelope && invitationCard) {
        closedEnvelope.addEventListener('click', function() {
            // Add opening class to animate flap
            closedEnvelope.classList.add('opening');
            
            // After flap animation, fade out envelope container and show card
            setTimeout(function() {
                envelopeContainer.style.opacity = '0';
                envelopeContainer.style.transition = 'opacity 0.5s ease';
                
                setTimeout(function() {
                    envelopeContainer.style.display = 'none';
                    
                    // Show invitation card
                    invitationCard.style.display = 'block';
                    invitationCard.style.opacity = '0';
                    setTimeout(function() {
                        invitationCard.style.opacity = '1';
                    }, 50);
                }, 500);
            }, 1200);
        });
    }
    
    // Click OPEN INVITATION button to reveal main website
    if (openInvitationBtn) {
        openInvitationBtn.addEventListener('click', function() {
            envelopeOverlay.style.opacity = '0';
            envelopeOverlay.style.transition = 'opacity 1s ease';
            setTimeout(function() {
                if (envelopeOverlay && envelopeOverlay.parentNode) {
                    envelopeOverlay.parentNode.removeChild(envelopeOverlay);
                    // Restore body scrolling
                    document.body.classList.remove('envelope-active');
                }
            }, 1000);
        });
    }
});

// ===========================
// RSVP MODAL - REMOVED
// ===========================

// RSVP modal functionality has been removed from the website

// ===========================
// PHOTO CAROUSEL
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.photo-carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    
    let currentSlide = 0;
    let autoPlayInterval;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = carousel.querySelectorAll('.carousel-dot');

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            dots[index].classList.remove('active');
        });
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
        resetAutoPlay();
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    // Pause on hover, resume on mouse leave
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoPlay();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            nextSlide();
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            prevSlide();
        }
    }

    // Start autoplay
    startAutoPlay();
});

// ===========================
// ENTOURAGE SHOW MORE/LESS
// ===========================

function toggleEntourage(sectionId, button) {
    const section = document.getElementById(sectionId);
    const icon = button.querySelector('.toggle-icon');
    
    if (section.style.display === 'none' || section.style.display === '') {
        section.style.display = 'contents';
        button.innerHTML = 'Show Less <span class="toggle-icon">▲</span>';
    } else {
        section.style.display = 'none';
        button.innerHTML = 'Show More <span class="toggle-icon">▼</span>';
        // Scroll to the category heading
        button.closest('.entourage-category').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// ===========================
// ATTIRE SEARCH FUNCTIONALITY
// ===========================

function searchAttire() {
    const searchInput = document.getElementById('attireSearch').value.trim();
    const searchResult = document.getElementById('searchResult');
    
    if (!searchInput) {
        searchResult.textContent = 'Please enter your name.';
        searchResult.style.color = '#dc3545';
        return;
    }
    
    // Get all entourage members
    const allMembers = document.querySelectorAll('.entourage-member');
    let foundMember = null;
    let memberCategory = '';
    let colorClass = '';
    
    // Search through all members
    allMembers.forEach(member => {
        const memberName = member.querySelector('.member-name');
        if (memberName && memberName.textContent.toLowerCase().includes(searchInput.toLowerCase())) {
            foundMember = member;
            
            // Determine category based on closest entourage-category
            const category = member.closest('.entourage-category');
            if (category) {
                const categoryTitle = category.querySelector('h3').textContent;
                memberCategory = categoryTitle;
            }
            
            // Get color class
            if (member.classList.contains('color-indicator-red')) {
                colorClass = 'red';
            } else if (member.classList.contains('color-indicator-green')) {
                colorClass = 'green';
            } else if (member.classList.contains('color-indicator-skyblue')) {
                colorClass = 'blue';
            }
        }
    });
    
    if (foundMember) {
        searchResult.textContent = 'Found! Opening your attire guide...';
        searchResult.style.color = '#28a745';
        
        // Determine which image and instructions to show
        showAttireModal(memberCategory, colorClass, searchInput);
    } else {
        searchResult.textContent = 'Name not found in the entourage list. Please check spelling or contact the couple.';
        searchResult.style.color = '#dc3545';
    }
}

function showAttireModal(category, colorClass, name) {
    const modal = document.getElementById('attireModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalImage = document.getElementById('modalImage');
    const modalInstructions = document.getElementById('modalInstructions');
    
    let imagePath = '';
    let instructions = '';
    let title = '';
    let subtitle = '';
    
    // Helper function to create attire item HTML
    function createAttireItem(label, value) {
        return `<div class="attire-item"><span class="attire-label">${label}:</span><span class="attire-value">${value}</span></div>`;
    }
    
    // Check if Principal Sponsor
    if (category.includes('Principal Sponsors') || category.includes('Secondary Sponsors')) {
        imagePath = 'imgs/outfits/sponsors.png';
        title = 'Principal Sponsors';
        
        // Determine if male or female based on title
        if (name.toLowerCase().includes('mr.') || name.toLowerCase().includes('atty.')) {
            subtitle = 'Gentlemen Sponsors';
            instructions = createAttireItem('Suit', 'Black formal suit') +
                          createAttireItem('Shirt', 'White formal dress shirt') +
                          createAttireItem('Necktie', 'Plain black necktie') +
                          createAttireItem('Shoes', 'Black formal shoes');
        } else {
            subtitle = 'Ladies Sponsors';
            instructions = createAttireItem('Attire', 'Cream or ivory formal gown') +
                          createAttireItem('Style', 'Elegant formal wear');
        }
    }
    // Check if Bridesmaids & Groomsmen
    else if (category.includes('Bridesmaids') || category.includes('Wedding Party')) {
        // Determine if male or female
        const isMale = name.toLowerCase().includes('mr.');
        
        if (isMale) {
            // Show groomsmen attire based on color
            if (colorClass === 'red') {
                imagePath = 'imgs/outfits/redbridesmaid.png';
                title = 'Groomsmen / Escort';
                subtitle = 'Red Group';
                instructions = createAttireItem('Suit', 'Black formal suit') +
                              createAttireItem('Shirt', 'White formal dress shirt') +
                              createAttireItem('Necktie', 'Scottish Red tartan necktie') +
                              createAttireItem('Shoes', 'Black formal shoes') +
                              '<div class="attire-note">Your necktie matches your paired bridesmaid\'s red gown.</div>';
            } else if (colorClass === 'green') {
                imagePath = 'imgs/outfits/greenbridesmaid.png';
                title = 'Groomsmen / Escort';
                subtitle = 'Green Group';
                instructions = createAttireItem('Suit', 'Black formal suit') +
                              createAttireItem('Shirt', 'White formal dress shirt') +
                              createAttireItem('Necktie', 'Scottish Green tartan necktie') +
                              createAttireItem('Shoes', 'Black formal shoes') +
                              '<div class="attire-note">Your necktie matches your paired bridesmaid\'s green gown.</div>';
            } else if (colorClass === 'blue') {
                imagePath = 'imgs/outfits/bluebridesmaid.png';
                title = 'Groomsmen / Escort';
                subtitle = 'Powder Blue Group';
                instructions = createAttireItem('Suit', 'Black formal suit') +
                              createAttireItem('Shirt', 'White formal dress shirt') +
                              createAttireItem('Necktie', 'Scottish Blue tartan necktie') +
                              createAttireItem('Shoes', 'Black formal shoes') +
                              '<div class="attire-note">Your necktie matches your paired bridesmaid\'s powder blue gown.</div>';
            }
        } else {
            // Show bridesmaid attire based on color
            if (colorClass === 'red') {
                imagePath = 'imgs/outfits/redbridesmaid.png';
                title = 'Bridesmaid';
                subtitle = 'Red Group';
                instructions = createAttireItem('Attire', 'Red formal gown') +
                              createAttireItem('Style', 'Elegant floor-length or tea-length formal wear') +
                              '<div class="attire-note">Your gown color matches your paired groomsman\'s Scottish Red tartan necktie.</div>';
            } else if (colorClass === 'green') {
                imagePath = 'imgs/outfits/greenbridesmaid.png';
                title = 'Bridesmaid';
                subtitle = 'Green Group';
                instructions = createAttireItem('Attire', 'Green formal gown') +
                              createAttireItem('Style', 'Elegant floor-length or tea-length formal wear') +
                              '<div class="attire-note">Your gown color matches your paired groomsman\'s Scottish Green tartan necktie.</div>';
            } else if (colorClass === 'blue') {
                imagePath = 'imgs/outfits/bluebridesmaid.png';
                title = 'Bridesmaid';
                subtitle = 'Powder Blue Group';
                instructions = createAttireItem('Attire', 'Powder blue formal gown') +
                              createAttireItem('Style', 'Elegant floor-length or tea-length formal wear') +
                              '<div class="attire-note">Your gown color matches your paired groomsman\'s Scottish Blue tartan necktie.</div>';
            }
        }
    }
    // Matron of Honor
    else if (category.includes('Matron of Honor')) {
        imagePath = 'imgs/outfits/outfittogether.png';
        title = 'Matron of Honor';
        subtitle = '';
        instructions = createAttireItem('Attire', 'Elegant formal gown') +
                      createAttireItem('Style', 'Coordinate with the bridal party theme') +
                      createAttireItem('Color', 'To be confirmed with the bride') +
                      '<div class="attire-note">Please contact Sharon for specific color and style preferences.</div>';
    }
    // Best Man
    else if (category.includes('Best Man')) {
        imagePath = 'imgs/outfits/outfittogether.png';
        title = 'Best Man';
        subtitle = '';
        instructions = createAttireItem('Suit', 'Black formal suit') +
                      createAttireItem('Shirt', 'White formal dress shirt') +
                      createAttireItem('Necktie', 'Scottish tartan necktie') +
                      createAttireItem('Shoes', 'Black formal shoes') +
                      '<div class="attire-note">Please contact Perry for specific necktie color/pattern.</div>';
    }
    // Other roles (Priest, Flower Girls, Ring Bearer, etc.)
    else {
        imagePath = 'imgs/outfits/outfittogether.png';
        title = 'Wedding Party';
        subtitle = '';
        instructions = '<div class="attire-note">Please refer to the general attire guidelines or contact the couple for specific instructions.</div>';
    }
    
    // Set modal content
    modalTitle.textContent = title;
    modalSubtitle.textContent = subtitle;
    modalImage.src = imagePath;
    modalInstructions.innerHTML = instructions;
    
    // Show modal
    modal.style.display = 'block';
}

function closeAttireModal() {
    const modal = document.getElementById('attireModal');
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('attireModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Allow Enter key to search
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('attireSearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                searchAttire();
            }
        });
    }
});
