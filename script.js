// Smooth scrolling for navigation links
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

// Add scroll effect to navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 82, 255, 0.2)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Add parallax effect to floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Add animation on scroll (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.about-card, .tokenomics-card, .community-card, .meme-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add number counter animation for stats
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const statValue = entry.target.querySelector('.stat-value');
            const text = statValue.textContent;
            
            // Only animate if it's a number
            if (!isNaN(text) && text !== '') {
                const endValue = parseInt(text);
                statValue.textContent = '0';
                animateValue(statValue, 0, endValue, 2000);
            }
            
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Add hover effect to hand gesture
const handGesture = document.querySelector('.hand-gesture');
if (handGesture) {
    handGesture.addEventListener('mouseenter', () => {
        handGesture.style.animation = 'handWave 0.5s infinite';
    });
    
    handGesture.addEventListener('mouseleave', () => {
        handGesture.style.animation = 'handWave 1.5s infinite';
    });
}

// Add click effect to buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Copy contract address functionality - safe clipboard access
const contractAddress = '0x03826b21a1AA589bbAe1EC6B4eB16530B7D3c423';
const contractAddressElement = document.getElementById('contractAddress');
const copyBtn = document.getElementById('copyContract');

if (copyBtn && contractAddressElement) {
    copyBtn.addEventListener('click', async () => {
        // Only use clipboard API if available and in secure context
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(contractAddress);
                
                // Visual feedback
                const originalText = contractAddressElement.textContent;
                contractAddressElement.textContent = 'Copied!';
                copyBtn.style.background = 'rgba(0, 82, 255, 0.3)';
                
                setTimeout(() => {
                    contractAddressElement.textContent = originalText;
                    copyBtn.style.background = '';
                }, 2000);
            } catch (err) {
                // If clipboard fails, just show the full address
                contractAddressElement.textContent = contractAddress;
            }
        } else {
            // Fallback: just show the full address
            contractAddressElement.textContent = contractAddress;
            setTimeout(() => {
                contractAddressElement.textContent = '0x0382...c423';
            }, 3000);
        }
    });
}

// Show full address on hover
if (contractAddressElement) {
    contractAddressElement.addEventListener('mouseenter', () => {
        contractAddressElement.textContent = contractAddress;
    });
    
    contractAddressElement.addEventListener('mouseleave', () => {
        contractAddressElement.textContent = '0x0382...c423';
    });
}

// Console message for developers
console.log('%cBASE 67', 'color: #0052FF; font-size: 24px; font-weight: bold;');
console.log('%cSix... Seven! 🚀', 'color: #0066FF; font-size: 16px;');
console.log('%cContract: ' + contractAddress, 'color: #B0B0B0; font-size: 12px;');
console.log('%cDexScreener: https://dexscreener.com/base/' + contractAddress, 'color: #B0B0B0; font-size: 12px;');

