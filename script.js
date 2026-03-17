document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const envelope = document.getElementById('envelope');
    const claimBtn = document.getElementById('claim-button');
    
    if (envelope) {
        envelope.addEventListener('click', () => {
            envelope.classList.toggle('open');
        });
    }

    if (claimBtn && envelope) {
        claimBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Avoid double toggle if clicked same area
            envelope.classList.toggle('open');
        });
    }

    // 3. Scroll Reveal Animations
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // 4. Background Star/Lantern Particles
    const particleContainer = document.getElementById('particle-container');
    const emojis = ['✨', '⭐', '🌙', '🏮'];
    
    function createParticle() {
        const particle = document.createElement('div');
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        
        particle.innerText = emoji;
        particle.style.position = 'absolute';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = '-20px';
        particle.style.fontSize = (Math.random() * 10 + 10) + 'px';
        particle.style.opacity = Math.random();
        particle.style.filter = 'blur(' + (Math.random() * 2) + 'px)';
        particle.style.transition = 'transform ' + (Math.random() * 5 + 10) + 's linear, opacity 2s';
        
        particleContainer.appendChild(particle);
        
        // Use timeout to trigger transition
        setTimeout(() => {
            particle.style.transform = 'translateY(' + (window.innerHeight + 100) + 'px) rotate(' + (Math.random() * 360) + 'deg)';
            particle.style.opacity = '0';
        }, 100);
        
        // Remove from DOM
        setTimeout(() => {
            particle.remove();
        }, 15000);
    }

    // Initialize particles
    setInterval(createParticle, 1000);

    // 5. Stagger Animations for some lists
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.style.transitionDelay = (index * 0.1) + 's';
    });
});
