document.addEventListener('DOMContentLoaded', function() {
    const tl = gsap.timeline();
    
    const cursor = document.querySelector('.cursor');
    const cursorTrail = document.querySelector('.cursor-trail');
    
    const logo = document.querySelector('.logo');
    const title = document.querySelector('.title');
    const subtitle = document.querySelector('.subtitle');
    const buttons = document.querySelectorAll('.btn');
    const statItems = document.querySelectorAll('.stat-item');
    const bgElements = document.querySelectorAll('.bg-element');
    
    function initLoadAnimation() {
        gsap.set(bgElements, { rotation: 0, scale: 0 });
        
        tl.to(bgElements, {
            scale: 1,
            rotation: 360,
            duration: 1.5,
            stagger: 0.2,
            ease: "back.out(1.7)"
        })
        .to(logo, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)"
        }, "-=1")
        .to(title, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
        }, "-=0.5")
        .to(subtitle, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.3")
        .to(buttons, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.2")
        .to(statItems, {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)"
        }, "-=0.3");
    }
    
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-target'));
            const isPercentage = number.parentElement.querySelector('.stat-label').textContent === '만족도';
            
            gsap.to(number, {
                innerHTML: target,
                duration: 2,
                ease: "power2.out",
                snap: { innerHTML: 1 },
                onUpdate: function() {
                    const current = Math.round(this.targets()[0].innerHTML);
                    number.innerHTML = isPercentage ? current + '%' : current.toLocaleString();
                }
            });
        });
    }
    
    function initCustomCursor() {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let trailX = 0, trailY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            trailX += (mouseX - trailX) * 0.05;
            trailY += (mouseY - trailY) * 0.05;
            
            gsap.set(cursor, {
                x: cursorX,
                y: cursorY,
                opacity: 1
            });
            
            gsap.set(cursorTrail, {
                x: trailX,
                y: trailY,
                opacity: 1
            });
            
            requestAnimationFrame(animateCursor);
        }
        
        animateCursor();
        
        const hoverElements = document.querySelectorAll('.btn, .stat-item');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                gsap.to(cursor, { scale: 1.5, duration: 0.3 });
                gsap.to(cursorTrail, { scale: 1.2, duration: 0.3 });
            });
            
            element.addEventListener('mouseleave', () => {
                gsap.to(cursor, { scale: 1, duration: 0.3 });
                gsap.to(cursorTrail, { scale: 1, duration: 0.3 });
            });
        });
    }
    
    function initBackgroundAnimation() {
        bgElements.forEach((element, index) => {
            gsap.to(element, {
                rotation: 360,
                duration: 20 + (index * 5),
                ease: "none",
                repeat: -1
            });
            
            gsap.to(element, {
                scale: 1.2,
                duration: 3 + (index * 0.5),
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1
            });
        });
    }
    
    function initTypingAnimation() {
        const titleText = title.textContent;
        const subtitleText = subtitle.textContent;
        
        title.textContent = '';
        subtitle.textContent = '';
        
        gsap.to(title, {
            text: titleText,
            duration: 2,
            ease: "none",
            delay: 2
        });
        
        gsap.to(subtitle, {
            text: subtitleText,
            duration: 1.5,
            ease: "none",
            delay: 3.5
        });
    }
    
    function createParticles() {
        const container = document.querySelector('.container');
        const rect = container.getBoundingClientRect();
        for (let i = 0; i < 100; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const x = Math.random() * rect.width;
            const y = Math.random() * rect.height;
            gsap.set(particle, {
                x: x,
                y: y,
                opacity: Math.random() * 0.8
            });
            container.appendChild(particle);
            const dx = (Math.random() - 0.5) * 200;
            const dy = (Math.random() - 0.5) * 200;
            gsap.to(particle, {
                x: x + dx,
                y: y + dy,
                opacity: 0,
                duration: 5 + Math.random() * 5,
                ease: "power2.out",
                repeat: -1,
                delay: Math.random() * 5
            });
        }
    }
    
    function createParticleAt(x, y, parent) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        gsap.set(particle, {
            x: x,
            y: y,
            opacity: 0.8
        });
        parent.appendChild(particle);
        gsap.to(particle, {
            x: x + (Math.random() - 0.5) * 100,
            y: y + (Math.random() - 0.5) * 100,
            opacity: 0,
            duration: 2 + Math.random() * 2,
            ease: "power2.out",
            onComplete: () => particle.remove()
        });
    }
    
    function showRipple(x, y, parent) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.left = (x - 5) + 'px';
        ripple.style.top = (y - 5) + 'px';
        ripple.style.pointerEvents = 'none';
        parent.appendChild(ripple);
        gsap.to(ripple, {
            scale: 10,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => {
                ripple.remove();
            }
        });
    }
    
    function initButtonAnimations() {
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                gsap.to(button, {
                    scale: 0.95,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut",
                    onComplete: () => {
                        window.open(button.href, button.target || "_self");
                    }
                });
                showRipple(e.offsetX, e.offsetY, button);
            });
        });
        
        const container = document.querySelector('.container');
        container.addEventListener('click', (e) => {
            if (!e.target.classList.contains('btn')) {
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                showRipple(x, y, container);
            }
        });
    }
    
    function initScrollAnimations() {
        gsap.registerPlugin(ScrollTrigger);
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            bgElements.forEach((element, index) => {
                gsap.to(element, {
                    y: rate * (index + 1) * 0.1,
                    duration: 0.5
                });
            });
        });
    }
    
    function initMouseInteractions() {
        const container = document.querySelector('.container');
        
        container.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPos = (clientX / innerWidth) - 0.5;
            const yPos = (clientY / innerHeight) - 0.5;
            
            bgElements.forEach((element, index) => {
                const speed = (index + 1) * 0.02;
                gsap.to(element, {
                    x: xPos * 50 * speed,
                    y: yPos * 50 * speed,
                    duration: 1,
                    ease: "power2.out"
                });
            });
            
            gsap.to('.main-content', {
                rotationY: xPos * 5,
                rotationX: yPos * -5,
                duration: 1,
                ease: "power2.out"
            });
        });
    }
    
    function initResponsiveAnimations() {
        const mm = gsap.matchMedia();
        
        mm.add("(max-width: 768px)", () => {
            gsap.set(bgElements, { scale: 0.7 });
            gsap.to(bgElements, {
                rotation: 180,
                duration: 15,
                ease: "none",
                repeat: -1
            });
        });
        
        mm.add("(min-width: 769px)", () => {
            initMouseInteractions();
        });
    }
    
    function initAllAnimations() {
        initLoadAnimation();
        initCustomCursor();
        initBackgroundAnimation();
        initTypingAnimation();
        initButtonAnimations();
        initResponsiveAnimations();
        createParticles();
        
        setTimeout(() => {
            animateNumbers();
        }, 3000);
        
        const container = document.querySelector('.container');
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            createParticleAt(x, y, container);
        });
    }
    
    initAllAnimations();
    
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            gsap.globalTimeline.pause();
        } else {
            gsap.globalTimeline.resume();
        }
    });
});