      // CUSTOM MOUSE CURSOR
        const mouseCircle = document.getElementById('mouse-circle');
        const mouseDot = document.getElementById('mouse-dot');
        let mouseX = 0, mouseY = 0;
        let circleX = 0, circleY = 0;
        let dotX = 0, dotY = 0;

        // Update mouse color based on theme
        function updateMouseColor() {
            if (document.documentElement.classList.contains('light-mode')) {
                // Light mode: dark cursor
                mouseCircle.style.borderColor = 'rgba(0, 0, 0, 0.9)';
                mouseDot.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            } else {
                // Dark mode: light cursor
                mouseCircle.style.borderColor = 'rgba(255, 255, 255, 0.9)';
                mouseDot.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            }
        }

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Make sure cursor is always visible
            mouseCircle.style.opacity = '1';
            mouseDot.style.opacity = '1';
        });

        // Smooth cursor animation
        function animateMouse() {
            // Smooth follow for circle (lag behind)
            circleX += (mouseX - circleX) * 0.15;
            circleY += (mouseY - circleY) * 0.15;
            
            // Direct follow for dot
            dotX = mouseX;
            dotY = mouseY;
            
            // Apply positions
            mouseCircle.style.transform = `translate(${circleX - 12}px, ${circleY - 12}px)`;
            mouseDot.style.transform = `translate(${dotX - 3}px, ${dotY - 3}px)`;
            
            requestAnimationFrame(animateMouse);
        }

        // Start mouse animation
        animateMouse();

        // Cursor hover effects
        document.querySelectorAll('a, button, .profile-card, .theme-toggle, .floating-robot, .tech-item, .project-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                mouseCircle.style.width = '32px';
                mouseCircle.style.height = '32px';
                mouseCircle.style.borderWidth = '2.5px';
                mouseDot.style.width = '8px';
                mouseDot.style.height = '8px';
                
                // Make cursor more visible on hover
                if (document.documentElement.classList.contains('light-mode')) {
                    mouseCircle.style.borderColor = 'rgba(0, 0, 0, 1)';
                    mouseDot.style.backgroundColor = 'rgba(0, 0, 0, 1)';
                } else {
                    mouseCircle.style.borderColor = 'rgba(255, 255, 255, 1)';
                    mouseDot.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                }
            });
            
            el.addEventListener('mouseleave', () => {
                mouseCircle.style.width = '24px';
                mouseCircle.style.height = '24px';
                mouseCircle.style.borderWidth = '2px';
                mouseDot.style.width = '6px';
                mouseDot.style.height = '6px';
                updateMouseColor(); // Reset to normal color
            });
        });

        // Initialize mouse color
        updateMouseColor();

        // BACKGROUND STARS
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext("2d");
        document.body.prepend(canvas);
        canvas.id = "galaxy";
        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.zIndex = "-1";
        
        let stars = [], bgMouse = { x: -100, y: -100 };

        // Resize canvas to window size
        function resize() { 
            canvas.width = window.innerWidth; 
            canvas.height = window.innerHeight; 
        }
        
        window.addEventListener("resize", resize); 
        resize();

        // Track mouse for stars
        document.addEventListener('mousemove', (e) => {
            bgMouse.x = e.clientX;
            bgMouse.y = e.clientY;
        });

        // Star class for background animation
        class Star {
            constructor() { 
                this.x = Math.random() * canvas.width; 
                this.y = Math.random() * canvas.height; 
                this.vx = (Math.random()-0.5) * 0.3; 
                this.vy = (Math.random()-0.5) * 0.3; 
                this.size = Math.random() * 1.2 + 0.5;
                this.brightness = Math.random() * 0.4 + 0.3;
            }
            
            update() {
                this.x += this.vx; 
                this.y += this.vy;
                
                // Bounce off edges
                if(this.x < 0 || this.x > canvas.width) this.vx *= -1; 
                if(this.y < 0 || this.y > canvas.height) this.vy *= -1;
                
                // React to mouse
                let d = Math.sqrt((bgMouse.x - this.x)**2 + (bgMouse.y - this.y)**2);
                if(d < 100) { 
                    this.x -= (bgMouse.x - this.x) * 0.02; 
                    this.y -= (bgMouse.y - this.y) * 0.02; 
                }
            }
            
            draw() { 
                ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`; 
                ctx.beginPath(); 
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); 
                ctx.fill(); 
            }
        }

        // Create stars
        for(let i = 0; i < 80; i++) stars.push(new Star());

        // Background animation loop
        function animateBackground() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw connections between stars
            stars.forEach((s, i) => {
                s.update(); 
                s.draw();
                
                // Draw lines between nearby stars
                for(let j = i + 1; j < stars.length; j++) {
                    let d = Math.sqrt((s.x - stars[j].x)**2 + (s.y - stars[j].y)**2);
                    if(d < 100) {
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - d/400})`;
                        ctx.lineWidth = 0.5; 
                        ctx.beginPath(); 
                        ctx.moveTo(s.x, s.y); 
                        ctx.lineTo(stars[j].x, stars[j].y); 
                        ctx.stroke();
                    }
                }
            });
            
            requestAnimationFrame(animateBackground);
        }
        
        animateBackground();

        //NAVIGATION & SCROLL
        window.addEventListener("scroll", () => {
            const rev = window.scrollY > 100;
            document.getElementById("header").classList.toggle("revealed", rev);
            document.getElementById("sidebar").classList.toggle("revealed", rev);
            
            // Trigger scroll animations
            handleScrollAnimations();
        });

        //TYPEWRITER EFFECT
        const roles = ["SYSTEM_ARCHITECT", "AI_DEVELOPER", "IOT_ENGINEER", "FULLSTACK_DEV"];
        let rI = 0, cI = 0, del = false;
        
        function type() {
            const cur = roles[rI]; 
            document.getElementById("type-text").textContent = cur.substring(0, cI);
            
            if(!del && cI < cur.length) {
                cI++;
            } else if(del && cI > 0) {
                cI--;
            } else {
                del = !del;
                if(!del) rI = (rI + 1) % roles.length;
            }
            
            setTimeout(type, del ? 50 : 150);
        }
        
        type();

        // PROFILE CARD FLIP
        const profileCard = document.getElementById('profileCard');
        profileCard.addEventListener('click', function() {
            this.classList.toggle('flip');
        });

        // THEME TOGGLE
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('i');
        
        themeToggle.addEventListener('click', function() {
            document.documentElement.classList.toggle('light-mode');
            
            if (document.documentElement.classList.contains('light-mode')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                // Update mouse color for light mode
                updateMouseColor();
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                // Update mouse color for dark mode
                updateMouseColor();
            }
        });

        // DRAGGABLE ROBOT
        const floatingRobot = document.getElementById('floatingRobot');
        const robotTalk = document.getElementById('robotTalk');
        const robotMouth = document.getElementById('robotMouth');
        
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;
        
        // Robot greetings
        const greetings = [
            "Hello! I'm your assistant bot!",
            "Drag me anywhere!",
            "Nice to see you here!",
            "How can I help you today?",
            "Explore the portfolio!",
            "Click on projects to see details!",
            "Want to collaborate? Contact me!"
        ];
        
        let greetingIndex = 0;
        
        // Mouse events for dragging
        floatingRobot.addEventListener('mousedown', dragStart);
        floatingRobot.addEventListener('touchstart', dragStart);
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag);
        
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('touchend', dragEnd);
        
        function dragStart(e) {
            if (e.type === 'touchstart') {
                initialX = e.touches[0].clientX - xOffset;
                initialY = e.touches[0].clientY - yOffset;
            } else {
                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;
            }
            
            // Show talk bubble
            robotTalk.textContent = greetings[greetingIndex];
            robotTalk.classList.add('show');
            robotMouth.style.height = '10px';
            robotMouth.style.width = '30px';
            
            greetingIndex = (greetingIndex + 1) % greetings.length;
            
            if (e.target === floatingRobot || e.target.closest('.robot-body')) {
                isDragging = true;
            }
        }
        
        function drag(e) {
            if (isDragging) {
                e.preventDefault();
                
                if (e.type === 'touchmove') {
                    currentX = e.touches[0].clientX - initialX;
                    currentY = e.touches[0].clientY - initialY;
                } else {
                    currentX = e.clientX - initialX;
                    currentY = e.clientY - initialY;
                }
                
                xOffset = currentX;
                yOffset = currentY;
                
                setTranslate(currentX, currentY, floatingRobot);
            }
        }
        
        function dragEnd(e) {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
            
            // Hide talk bubble after 3 seconds
            setTimeout(() => {
                robotTalk.classList.remove('show');
                robotMouth.style.height = '5px';
                robotMouth.style.width = '25px';
            }, 3000);
        }
        
        function setTranslate(xPos, yPos, el) {
            el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        }

        // FORM SUBMISSION
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
        });

        //  SMOOTH SCROLLING
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        //SCROLL ANIMATIONS
        function handleScrollAnimations() {
            const elements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        }

        //TECH TRACKS CLONE
        const clone = (id) => { 
            const el = document.getElementById(id); 
            el.innerHTML += el.innerHTML; 
        };
        
        clone('t1'); 
        clone('t2');

        //INITIALIZE
        window.addEventListener('load', handleScrollAnimations);
        window.addEventListener('scroll', handleScrollAnimations);
        
        window.addEventListener('load', function() {
            console.log('Portfolio loaded successfully!');
            console.log('Fixed Mouse Cursor:');
            console.log('   - Dark Mode: White cursor (0.9 opacity)');
            console.log('   - Light Mode: Black cursor (0.9 opacity)');
            console.log('   - Always visible, no hiding');
            console.log('   - Grows larger on hover');
        });
