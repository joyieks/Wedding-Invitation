// ===========================
// IMAGE PROTECTION
// ===========================

// Prevent right-click, drag, and long-press on all images
document.addEventListener('DOMContentLoaded', function() {
    const allImages = document.querySelectorAll('img');
    
    allImages.forEach(img => {
        // Disable right-click context menu
        img.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });
        
        // Disable drag and drop
        img.addEventListener('dragstart', (e) => {
            e.preventDefault();
            return false;
        });
        
        // Disable long-press on mobile
        img.addEventListener('touchstart', (e) => {
            img.style.webkitTouchCallout = 'none';
        });
        
        // Additional protection attributes
        img.setAttribute('draggable', 'false');
        img.style.userSelect = 'none';
        img.style.webkitUserSelect = 'none';
    });
    
    // Also prevent right-click on the entire document
    document.addEventListener('contextmenu', (e) => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });
});

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
    const weddingDate = new Date('May 20, 2026 13:00:00').getTime();
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
                
                // Show success message with overlay
                const overlay = document.createElement('div');
                overlay.className = 'rsvp-success-overlay';
                
                const successMessage = document.createElement('div');
                successMessage.className = 'rsvp-success-message';
                
                if (formData.attendance === 'yes') {
                    successMessage.innerHTML = `
                        <div class="success-icon">
                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                <circle cx="30" cy="30" r="28" stroke="#DAA520" stroke-width="3" fill="white"/>
                                <path d="M18 30L26 38L42 22" stroke="#2C5F2D" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <h2 class="success-title">Thank You!</h2>
                        <p class="success-text">
                            We're thrilled you'll be joining us on our special day! 
                            Your RSVP has been confirmed.
                        </p>
                        <button onclick="document.querySelector('.rsvp-success-overlay').remove()" class="success-close-btn">
                            Close
                        </button>
                    `;
                } else {
                    successMessage.innerHTML = `
                        <div class="success-icon">
                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                <circle cx="30" cy="30" r="28" stroke="#DAA520" stroke-width="3" fill="white"/>
                                <path d="M30 20V32" stroke="#1a3a52" stroke-width="4" stroke-linecap="round"/>
                                <circle cx="30" cy="40" r="2" fill="#1a3a52"/>
                            </svg>
                        </div>
                        <h2 class="success-title">We'll Miss You</h2>
                        <p class="success-text">
                            Thank you for letting us know. We appreciate your response!
                        </p>
                        <button onclick="document.querySelector('.rsvp-success-overlay').remove()" class="success-close-btn">
                            Close
                        </button>
                    `;
                }
                
                overlay.appendChild(successMessage);
                document.body.appendChild(overlay);
                
                // Trigger animation
                setTimeout(() => {
                    overlay.classList.add('show');
                }, 10);
                
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
// PHOTO CAROUSEL - Continuous Scroll
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.photo-carousel');
    if (!carousel) return;

    // The carousel now runs automatically with CSS animation
    // No JavaScript needed for the scrolling effect
    console.log('Continuous carousel loaded');
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
        title = 'Sponsors';
        
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
    // Flower Girls
    else if (category.includes('Flower Girls')) {
        imagePath = 'imgs/outfits/flowergirls.png';
        title = 'Flower Girls';
        subtitle = '';
        instructions = createAttireItem('Attire', 'Flower girl dress') +
                      createAttireItem('Style', 'Formal and age-appropriate') +
                      '<div class="attire-note">Please coordinate final style details with the couple.</div>';
    }
    // Bible Bearer / Ring Bearer
    else if (category.includes('Bible Bearer') || category.includes('Ring Bearer')) {
        imagePath = 'imgs/outfits/flowerboy.png';
        title = category;
        subtitle = '';
        instructions = createAttireItem('Attire', 'Formal boy outfit') +
                      createAttireItem('Style', 'Neat and ceremonial') +
                      '<div class="attire-note">Please coordinate final style details with the couple.</div>';
    }
    // Other roles (Priest and remaining roles)
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

// ===========================
// ENTOURAGE MODAL FUNCTIONALITY
// ===========================

// Entourage data structure
const entourageData = {
    priest: {
        title: 'Priest',
        subtitle: '1 Member',
        members: [
            { name: 'Fr. Diony Tabiliran', gender: 'male' }
        ]
    },
    principal: {
        title: 'Principal Sponsors',
        subtitle: '14 Members',
        members: [
            { name: 'Mr. Ismael L. Segundo', gender: 'male' },
            { name: 'Mrs. Marvie O. Segundo', gender: 'female' },
            { name: 'Mr. Ronald E. Reyes', gender: 'male' },
            { name: 'Mrs. Ermelita L. Reyes', gender: 'female' },
            { name: 'Mr. Dominador Lopez', gender: 'male' },
            { name: 'Mrs. Meriam Llanes', gender: 'female' },
            { name: 'Mr. Nestor Cadavas', gender: 'male' },
            { name: 'Mrs. Marina R. Velasco', gender: 'female' },
            { name: 'Atty. Wendel E. Avisado', gender: 'male' },
            { name: 'Mrs. Nicanora D. Adlao', gender: 'female' },
            { name: 'Mr. Lazaro F. Lamparas Jr.', gender: 'male' },
            { name: 'Mrs. Rosalia D. Lamparas', gender: 'female' },
            { name: 'Mr. Edgardo Amboy', gender: 'male' },
            { name: 'Mrs. Joan D. Galarion', gender: 'female' }
        ]
    },
    secondary: {
        title: 'Secondary Sponsors',
        subtitle: '4 Members',
        members: [
            { name: 'Mr. Carlito Omoso', gender: 'male' },
            { name: 'Mrs. Presentacion Omoso', gender: 'female' },
            { name: 'Mr. Neil B. Jadraque', gender: 'male' },
            { name: 'Mrs. Peachy P. Jadraque', gender: 'female' }
        ]
    },
    matron: {
        title: 'Matron of Honor',
        subtitle: '1 Member',
        members: [
            { name: 'Mrs. Betchie P. Toyama', gender: 'female' }
        ]
    },
    bestman: {
        title: 'Best Man',
        subtitle: '1 Member',
        members: [
            { name: 'Mr. Ismael L. Segundo', gender: 'male' }
        ]
    },
    bridesmaids: {
        title: 'Bridesmaids & Groomsmen',
        subtitle: '58 Members',
        members: [
            { name: 'Mr. Joey John Omoso', gender: 'male', group: 'red' },
            { name: 'Mrs. Antonette L. Tanchico', gender: 'female', group: 'red' },
            { name: 'Mr. Dionel Batistel', gender: 'male', group: 'red' },
            { name: 'Mrs. Deborah Mae A. Batistel', gender: 'female', group: 'red' },
            { name: 'Mr. Joselito Lonzon', gender: 'male', group: 'red' },
            { name: 'Mrs. Gemma B. Lonzon', gender: 'female', group: 'red' },
            { name: 'Mr. Michael John R. Bula', gender: 'male', group: 'red' },
            { name: 'Mrs. Barbara J. Bula', gender: 'female', group: 'red' },
            { name: 'Mr. Lowell Ted Sevilla', gender: 'male', group: 'red' },
            { name: 'Mrs. Ennah May S. Sevilla', gender: 'female', group: 'red' },
            { name: 'Mr. Bernard Ponce', gender: 'male', group: 'red' },
            { name: 'Mrs. Cossette Navales', gender: 'female', group: 'red' },
            { name: 'Mr. Felix Bagol', gender: 'male', group: 'red' },
            { name: 'Mrs. Beatriz Bagol', gender: 'female', group: 'red' },
            { name: 'Mr. Benedict Maboloc', gender: 'male', group: 'red' },
            { name: 'Miss Alicia S. Dalumpines', gender: 'female', group: 'red' },
            { name: 'Mr. Juerry Bemm P. Salva', gender: 'male', group: 'green' },
            { name: 'Mrs. Sharade P. Fernandez', gender: 'female', group: 'green' },
            { name: 'Mr. Cris L. Machitar', gender: 'male', group: 'green' },
            { name: 'Mrs. Ma Lorena M. Machitar', gender: 'female', group: 'green' },
            { name: 'Mr. Herosdie Cedeño', gender: 'male', group: 'green' },
            { name: 'Mrs. Geraldine Arobo', gender: 'female', group: 'green' },
            { name: 'Mr. Louie John Omoso', gender: 'male', group: 'green' },
            { name: 'Miss Louwela Dou', gender: 'female', group: 'green' },
            { name: 'Mr. Michael Libetan', gender: 'male', group: 'green' },
            { name: 'Mrs. Elsilyn Cuizon', gender: 'female', group: 'green' },
            { name: 'Mr. Christain Kyle Crisologo', gender: 'male', group: 'green' },
            { name: 'Mrs. Annabelle M. Crisologo', gender: 'female', group: 'green' },
            { name: 'Mr. Emmanual P. Enojarda', gender: 'male', group: 'green' },
            { name: 'Mrs. Joan Virador', gender: 'female', group: 'green' },
            { name: 'Mr. Kenneth Ceballos', gender: 'male', group: 'green' },
            { name: 'Miss Stephanie Racho', gender: 'female', group: 'green' },
            { name: 'Mr. Janel Omoso', gender: 'male', group: 'green' },
            { name: 'Miss Irish Plaza', gender: 'female', group: 'green' },
            { name: 'Mr. Nichole Alcebar', gender: 'male', group: 'green' },
            { name: 'Mrs. Imee Johanne S. Alcebar', gender: 'female', group: 'green' },
            { name: 'Mr. Jeremy R. Lopez', gender: 'male', group: 'green' },
            { name: 'Mrs. Rochelle M. Lopez', gender: 'female', group: 'green' },
            { name: 'Mr. Ruel Ceasar Cuizon', gender: 'male', group: 'green' },
            { name: 'Mrs. Jenelyn Cuizon', gender: 'female', group: 'green' },
            { name: 'Mr. Romie A. Cabatic', gender: 'male', group: 'green' },
            { name: 'Mrs. Lady Diana O. Cabatic', gender: 'female', group: 'green' },
            { name: 'Mr. Michael Aaron Cuizon', gender: 'male', group: 'blue' },
            { name: 'Miss Niña Jade P. Fernandez', gender: 'female', group: 'blue' },
            { name: 'Mr. Joseph Arol Cuizon', gender: 'male', group: 'blue' },
            { name: 'Miss Joan Joy Diocampo', gender: 'female', group: 'blue' },
            { name: 'Mr. Jay Are I. Maynagcot', gender: 'male', group: 'blue' },
            { name: 'Miss Heidi R. Vleasco', gender: 'female', group: 'blue' },
            { name: 'Mr. Ismael O. Segundo Jr.', gender: 'male', group: 'blue' },
            { name: 'Miss Chamberlene M. Raotraot', gender: 'female', group: 'blue' },
            { name: 'Mr. Ivan O. Segundo', gender: 'male', group: 'blue' },
            { name: 'Miss Kyle Andrea A. Balbin', gender: 'female', group: 'blue' },
            { name: 'Mr. Aaron Josh O. Cabatic', gender: 'male', group: 'blue' },
            { name: 'Miss Nathalie Kate O. Cabatic', gender: 'female', group: 'blue' },
            { name: 'Mr. Gregor Graf', gender: 'male', group: 'blue' },
            { name: 'Miss Giamae B. Lonzon', gender: 'female', group: 'blue' },
            { name: 'Mr. Deo Jean Ponce', gender: 'male', group: 'blue' },
            { name: 'Miss Tracy Frances P. Fernandez', gender: 'female', group: 'blue' }
        ]
    },
    flowergirls: {
        title: 'Flower Girls',
        subtitle: '7 Members',
        members: [
            { name: 'Angel Nicole Arobo', gender: 'female' },
            { name: 'Cholenne Angela S. Alcebar', gender: 'female' },
            { name: 'Shilo Faith O. Cabatic', gender: 'female' },
            { name: 'Selena Marie C. Peter', gender: 'female' },
            { name: 'Daniela Rizz A. Batistel', gender: 'female' },
            { name: 'Selah Lois S. Sevilla', gender: 'female' },
            { name: 'Cerys Esmeray Segundo', gender: 'female' }
        ]
    },
    biblebearer: {
        title: 'Bible Bearer',
        subtitle: '1 Member',
        members: [
            { name: 'Imry L. Segundo', gender: 'male' }
        ]
    },
    ringbearer: {
        title: 'Ring Bearer',
        subtitle: '1 Member',
        members: [
            { name: 'Zebi Crizeign M. Machitar', gender: 'male' }
        ]
    }
};

function getEntouragePhotoPath(name) {
    const fallback = 'imgs/entourage/entouragepic.jpg';
    if (!name) return fallback;

    // Handle exceptional cases where display name doesn't match file naming.
    const overrides = {
        'fr diony tabiliran': 'priest.jpg',
        'diony tabiliran': 'priest.jpg',
        'deo jean ponce': 'deojeanponce.png',
        'deo jean pinote': 'deo-pinote.jpg',
        'bernard ponce': 'bernardponce.png',
        'cholenne angela s alcebar': 'cholennealcebar.png',
        'imee johanne s alcebar': 'imeealcebar.png',
        'joan d galarion': 'joan-galarion.png',
        'kyle andrea a balbin': 'kylebalbin.png',
        'michael libetan': 'michael-libetan.png',
        'nicanora d adlao': 'niconoraadlao.jpg',
        'nicanora adlao': 'niconoraadlao.jpg',
        'nicanoeral adlao': 'niconoraadlao.jpg',
        'nichole alcebar': 'nicholealcebar.png',
        'ivan o segundo': 'ivan-segundo.png',
        'janel omoso': 'janelomoso.png',
        'aaron josh o cabatic': 'aaroncabatic.png',
        'romie a cabatic': 'romiecabatic.png',
        'nathalie kate o cabatic': 'nathaliecabatic.png',
        'peachy p jadraque': 'peachy-jadraque.png',
        'christain kyle crisologo': 'christain-crisologo.png',
        'annabelle m crisologo': 'anabellecrisologo.png',
        'emmanual p enojarda': 'emmanuelenorjada.png',
        'cossette navales': 'cossette-navales.png',
        'ennah may s sevilla': 'ennahsevilla.png',
        'kenneth ceballos': 'kennethceballos.png',
        'lady diana o cabatic': 'ladydianacabatic.jpg',
        'geraldine arobo': 'geraldinearobo.png',
        'graldine arobo': 'geraldinearobo.png',
        'lowell ted sevilla': 'lowellted sevilla.png',
        'juerry bemm p salva': 'juerrybemmsalva.png',
        'juerry bemm salva': 'juerrybemmsalva.png',
        'jeremy r lopez': 'jeremylopez.png',
        'jeremy lopez': 'jeremylopez.png',
        'presentacion omoso': 'presentacion-omoso.png',
        'rochelle m lopez': 'rochelle-lopez.png',
        'rochelle lopez': 'rochelle-lopez.png',
        'selah lois s sevilla': 'selahsevilla.png',
        'giamae b lonzon': 'giamaelonzon.png',
        'gregor graf': 'gregorgraf.png',
        'elsilyn cuizon': 'elsilyn-cuizon.png',
        'alsilyn cuizon': 'elsilyn-cuizon.png',
        'daniela rizz a batistel': 'danielabatistel.png',
        'cerys esmeray segundo': 'cerysesmeraysegundo.png',
        'carlito omoso': 'carlito-omoso.png',
        'nestor cadavas': 'nestorcadavas.png',
        'stephanie racho': 'stephanieracho.png',
        'benedict maboloc': 'benedictmaboloc.png',
        'herosdie cedeno': 'herosdiecedeño.png',
        'louwela dou': 'louweladou.png',
        'angel nicole arobo': 'angelarobo.png',
        'chamberlene m raotraot': 'chamberlene.png',
        'cris l machitar': 'cris-machitar.png',
        'imry l segundo': 'imry-segundo.png',
        'marvie o segundo': 'marvie-segundo.png',
        'nina jade p fernandez': 'ninajadefernandez.png',
        'antonette l tanchico': 'antonette-tanchico.png',
        'selena marie c peter': 'selena-peter.png',
        'tracy frances p fernandez': 'tracyfrances.png',
        'zebi crizeign m machitar': 'zebimachitar.png',
        'joan joy diocampo': 'joanjoydiocampo.jpg',
        'alicia s dalumpines': 'aliciadalumpines.png',
        'gemma b lonzon': 'gemma-lonzon.png',
        'irish plaza': 'irishplaza.png',
        'ismael o segundo jr': 'ismaelOsegundojr.png',
        'jenelyn cuizon': 'jenelyncuizon.png',
        'joselito lonzon': 'joselito-lonzon.png',
        'joseph arol cuizon': 'josepharol cuizon.png',
        'michael aaron cuizon': 'michaelaaroncuizon.png',
        'ruel ceasar cuizon': 'ruelceasarcuizon.png',
        'joan virador': 'joan-virador.png'
    };

    const normalized = name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\b(mr|mrs|miss|ms|atty|fr)\.?\b/g, '')
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    if (overrides[normalized]) {
        return `imgs/entourage/${overrides[normalized]}`;
    }

    let tokens = normalized.split(' ').filter(Boolean);
    tokens = tokens.filter(token => !['jr', 'sr', 'ii', 'iii', 'iv'].includes(token));
    tokens = tokens.filter(token => token.length > 1 && token !== 'ma');

    if (tokens.length < 2) {
        return fallback;
    }

    const first = tokens[0];
    const last = tokens[tokens.length - 1];
    return `imgs/entourage/${first}-${last}.jpg`;
}

function initializeEntouragePhotos() {
    const allEntourageImages = document.querySelectorAll('.entourage-member img');
    allEntourageImages.forEach(img => {
        const personName = img.alt || '';
        img.src = getEntouragePhotoPath(personName);
        img.onerror = function () {
            this.src = 'imgs/entourage/entouragepic.jpg';
        };
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEntouragePhotos);
} else {
    initializeEntouragePhotos();
}

let entourageModalScrollPosition = 0;
let entourageModalOpenedAt = 0;
let entouragePersonModalOpenedAt = 0;

function lockEntourageBackgroundScroll() {
    entourageModalScrollPosition = window.scrollY || window.pageYOffset || 0;
    document.body.classList.add('entourage-modal-open');
    document.body.style.top = `-${entourageModalScrollPosition}px`;
}

function unlockEntourageBackgroundScroll() {
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;

    root.style.scrollBehavior = 'auto';
    document.body.classList.remove('entourage-modal-open');
    document.body.style.top = '';
    window.scrollTo(0, entourageModalScrollPosition);

    requestAnimationFrame(() => {
        root.style.scrollBehavior = previousScrollBehavior;
    });
}

function openEntourageModal(category) {
    const modal = document.getElementById('entourageModal');
    const modalTitle = document.getElementById('entourageModalTitle');
    const modalSubtitle = document.getElementById('entourageModalSubtitle');
    const modalBody = document.getElementById('entourageModalBody');
    
    const data = entourageData[category];
    
    if (!data) {
        console.error('Category not found:', category);
        return;
    }
    
    // Set title and subtitle
    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    
    // Clear previous content
    modalBody.innerHTML = '';
    modalBody.scrollTop = 0;
    
    // Check if this category should display in pairs
    const pairedCategories = ['principal', 'secondary', 'bridesmaids'];
    const isPaired = pairedCategories.includes(category);
    
    if (isPaired) {
        // Create paired layout
        const pairsContainer = document.createElement('div');
        pairsContainer.className = 'modal-pairs-container';
        
        // Group members in pairs
        for (let i = 0; i < data.members.length; i += 2) {
            const male = data.members[i];
            const female = data.members[i + 1];
            
            const pairRow = document.createElement('div');
            pairRow.className = 'modal-pair-row';
            
            // If only one member in the pair, center it
            if (!female) {
                pairRow.classList.add('single-member');
            }
            
            // Add group indicator for bridesmaids
            if (male && male.group) {
                pairRow.classList.add('group-' + male.group);
            }
            
            // Male member
            if (male) {
                const maleCard = document.createElement('div');
                maleCard.className = 'modal-member-card pair-male';
                maleCard.innerHTML = `
                    <div class="modal-member-photo">
                        <img src="${getEntouragePhotoPath(male.name)}" alt="${male.name}" onerror="this.src='imgs/entourage/entouragepic.jpg'">
                    </div>
                    <p class="modal-member-name">${male.name}</p>
                `;
                pairRow.appendChild(maleCard);
            }
            
            // Female member
            if (female) {
                const femaleCard = document.createElement('div');
                femaleCard.className = 'modal-member-card pair-female';
                femaleCard.innerHTML = `
                    <div class="modal-member-photo">
                        <img src="${getEntouragePhotoPath(female.name)}" alt="${female.name}" onerror="this.src='imgs/entourage/entouragepic.jpg'">
                    </div>
                    <p class="modal-member-name">${female.name}</p>
                `;
                pairRow.appendChild(femaleCard);
            }
            
            pairsContainer.appendChild(pairRow);
        }
        
        modalBody.appendChild(pairsContainer);
    } else {
        // Create regular grid for non-paired categories
        const membersGrid = document.createElement('div');
        membersGrid.className = 'modal-members-grid';
        
        data.members.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.className = 'modal-member-card';
            
            memberCard.innerHTML = `
                <div class="modal-member-photo">
                    <img src="${getEntouragePhotoPath(member.name)}" alt="${member.name}" onerror="this.src='imgs/entourage/entouragepic.jpg'">
                </div>
                <p class="modal-member-name">${member.name}</p>
            `;
            
            membersGrid.appendChild(memberCard);
        });
        
        modalBody.appendChild(membersGrid);
    }
    
    // Show modal with animation
    lockEntourageBackgroundScroll();
    modal.style.display = 'block';
    entourageModalOpenedAt = Date.now();
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function closeEntourageModal() {
    const modal = document.getElementById('entourageModal');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
        unlockEntourageBackgroundScroll();
    }, 300);
}

function openEntouragePersonModal(name, imageSrc) {
    const personModal = document.getElementById('entouragePersonModal');
    const personImage = document.getElementById('entouragePersonImage');
    const personName = document.getElementById('entouragePersonName');

    if (!personModal || !personImage || !personName) {
        return;
    }

    const fallback = 'imgs/entourage/entouragepic.jpg';
    personImage.src = imageSrc || fallback;
    personImage.alt = name || 'Entourage member';
    personImage.onerror = function () {
        this.src = fallback;
    };
    personName.textContent = name || 'Entourage Member';

    personModal.style.display = 'flex';
    personModal.style.opacity = '1';
    personModal.setAttribute('aria-hidden', 'false');
    entouragePersonModalOpenedAt = Date.now();
}

function closeEntouragePersonModal() {
    const personModal = document.getElementById('entouragePersonModal');
    if (!personModal) {
        return;
    }

    personModal.style.opacity = '0';
    setTimeout(() => {
        personModal.style.display = 'none';
        personModal.setAttribute('aria-hidden', 'true');
    }, 200);
}

function bindEntouragePersonPopup() {
    document.addEventListener('click', function(event) {
        const memberCard = event.target.closest('.entourage-member, .modal-member-card');
        if (!memberCard) {
            return;
        }

        const image = memberCard.querySelector('.member-photo img, .modal-member-photo img, img');
        if (!image) {
            return;
        }

        event.stopPropagation();

        const nameElement = memberCard.querySelector('.member-name, .modal-member-name');
        const personName = (nameElement && nameElement.textContent ? nameElement.textContent : image.alt || '').trim();
        openEntouragePersonModal(personName, image.currentSrc || image.src || getEntouragePhotoPath(personName));
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindEntouragePersonPopup);
} else {
    bindEntouragePersonPopup();
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const entourageModal = document.getElementById('entourageModal');
    const personModal = document.getElementById('entouragePersonModal');

    if (event.target === entourageModal) {
        if (Date.now() - entourageModalOpenedAt < 350) {
            return;
        }
        closeEntourageModal();
    }

    if (event.target === personModal) {
        if (Date.now() - entouragePersonModalOpenedAt < 350) {
            return;
        }
        closeEntouragePersonModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const personModal = document.getElementById('entouragePersonModal');
        if (personModal && personModal.style.display === 'flex') {
            closeEntouragePersonModal();
            return;
        }

        const modal = document.getElementById('entourageModal');
        if (modal && modal.style.display === 'block') {
            closeEntourageModal();
        }
    }
});
