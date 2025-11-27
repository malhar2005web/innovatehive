gsap.registerPlugin(ScrollTrigger);

AOS.init({
    duration: 800,
    once: true,
    offset: 50
});

document.addEventListener('DOMContentLoaded', function() {
    initCustomCursor();
    initHeroAnimations();
    initAIChat();
    initNavigation();
    
    loadServices();
    loadProjects();
    loadBlogs();
    loadTestimonials();
    initContactForm();
});

function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const interactiveBg = document.querySelector('.interactive-bg');
    
    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        if(cursorDot) {
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
        }
        
        if(cursorOutline) {
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        }

        if(interactiveBg) {
            interactiveBg.style.background = `radial-gradient(600px circle at ${posX}px ${posY}px, rgba(124, 58, 237, 0.15), transparent 40%)`;
        }
    });

    document.body.addEventListener('mouseover', (e) => {
        if(e.target.closest('.magnet') && cursorOutline) {
            cursorOutline.classList.add('hovered');
        }
    });
    
    document.body.addEventListener('mouseout', (e) => {
        if(e.target.closest('.magnet') && cursorOutline) {
            cursorOutline.classList.remove('hovered');
        }
    });
}

function initHeroAnimations() {
    const tl = gsap.timeline();
    
    tl.from(".word", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out"
    })
    .from(".hero-subtitle", {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out"
    }, "-=0.5")
    .from(".hero-buttons", {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out"
    }, "-=0.8");
    
    document.querySelectorAll('.stat-value').forEach(stat => {
        const target = +stat.getAttribute('data-target');
        
        ScrollTrigger.create({
            trigger: stat,
            start: "top 85%",
            once: true,
            onEnter: () => {
                gsap.to(stat, {
                    innerText: target,
                    duration: 2,
                    snap: { innerText: 1 },
                    ease: "power2.out"
                });
            }
        });
    });
}

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(5, 5, 5, 0.9)";
        } else {
            navbar.style.background = "rgba(5, 5, 5, 0.6)";
        }
    });

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('open');
        });
    }
}

async function loadServices() {
    try {
        const response = await fetch('/api/services');
        const services = await response.json();
        const grid = document.getElementById('servicesGrid');
        
        if (grid) {
            grid.innerHTML = services.map((service, index) => `
                <a href="/service/${service.id}" class="service-card glass-effect magnet" data-aos="fade-up" data-aos-delay="${index * 100}">
                    <div class="service-icon">
                        <i class="${service.icon}"></i>
                    </div>
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                </a>
            `).join('');
            
            AOS.refresh();
        }
    } catch (error) {
        console.error(error);
    }
}

async function loadProjects() {
    try {
        const response = await fetch('/api/projects');
        const projects = await response.json();
        const grid = document.getElementById('projectsGrid');
        
        if (grid) {
            grid.innerHTML = projects.map((project, index) => `
                <a href="/project/${project.id}" class="project-card glass-effect magnet" data-category="${project.category}" data-aos="fade-up" data-aos-delay="${index * 100}">
                    <img src="${project.image}" alt="${project.title}" class="project-image">
                    <div class="project-content">
                        <span class="highlight" style="font-size:0.8rem; text-transform:uppercase;">${project.category}</span>
                        <h3 style="margin-top:0.5rem;">${project.title}</h3>
                        <p>${project.description}</p>
                    </div>
                </a>
            `).join('');
            
            initProjectFilters();
            AOS.refresh();
        }
    } catch (error) {
        console.error(error);
    }
}

function initProjectFilters() {
    const btns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');
    
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            
            cards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    gsap.to(card, { opacity: 1, scale: 1, duration: 0.3 });
                } else {
                    gsap.to(card, { 
                        opacity: 0, 
                        scale: 0.8, 
                        duration: 0.3, 
                        onComplete: () => { card.style.display = 'none'; } 
                    });
                }
            });
        });
    });
}

async function loadBlogs() {
    try {
        const response = await fetch('/api/blogs');
        const data = await response.json();
        const blogs = data.blogs || data;
        const grid = document.getElementById('blogsGrid');
        
        if (grid) {
            grid.innerHTML = blogs.map((blog, index) => `
                <div class="blog-card glass-effect magnet" data-aos="fade-up" data-aos-delay="${index * 100}">
                    <img src="${blog.image}" alt="${blog.title}" class="blog-image">
                    <div class="blog-content">
                        <div class="blog-meta">${blog.author} • ${blog.date}</div>
                        <h3>${blog.title}</h3>
                        <p>${blog.excerpt}</p>
                    </div>
                </div>
            `).join('');
            
            AOS.refresh();
        }
    } catch (e) {
        console.error(e);
    }
}

async function loadTestimonials() {
    try {
        const response = await fetch('/api/testimonials');
        const testimonials = await response.json();
        const slider = document.getElementById('testimonialsSlider');
        
        if (!slider) return;
        
        slider.innerHTML = testimonials.map((t, i) => `
            <div class="testimonial-card glass-effect ${i === 0 ? 'active' : ''}">
                <p class="testimonial-text">"${t.text}"</p>
                <h4 class="testimonial-author">${t.name}</h4>
                <p style="color:var(--text-muted)">${t.company}</p>
                <div class="testimonial-rating">${'★'.repeat(t.rating)}</div>
            </div>
        `).join('');
        
        let idx = 0;
        const cards = document.querySelectorAll('.testimonial-card');
        
        const show = (i) => {
            cards.forEach(c => c.style.display = 'none');
            cards[i].style.display = 'block';
            gsap.fromTo(cards[i], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
        };
        
        const nextBtn = document.getElementById('nextTestimonial');
        const prevBtn = document.getElementById('prevTestimonial');

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                idx = (idx + 1) % cards.length;
                show(idx);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                idx = (idx - 1 + cards.length) % cards.length;
                show(idx);
            });
        }
        
    } catch (e) {
        console.error(e);
    }
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const oldText = btn.innerText;
        btn.innerText = 'Sending...';
        
        setTimeout(() => {
            btn.innerText = 'Sent!';
            btn.style.background = '#10b981';
            btn.style.color = '#fff';
            form.reset();
            
            setTimeout(() => {
                btn.innerText = oldText;
                btn.style.background = '';
                btn.style.color = '';
            }, 3000);
        }, 1500);
    });
}

function initAIChat() {
    const aiBtn = document.getElementById('aiChatBtn');
    const chatWidget = document.getElementById('chatWidget');
    const closeBtn = document.getElementById('closeChat');
    const sendBtn = document.getElementById('sendChat');
    const input = document.getElementById('chatInput');
    const msgs = document.getElementById('chatMessages');

    if (!aiBtn) return;

    aiBtn.addEventListener('click', () => {
        chatWidget.classList.toggle('active');
        if (chatWidget.classList.contains('active') && input) {
            input.focus();
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            chatWidget.classList.remove('active');
        });
    }

    if (sendBtn) {
        sendBtn.addEventListener('click', handleChat);
    }

    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleChat();
        });
    }

    async function handleChat() {
        const text = input.value.trim();
        if (!text) return;
        
        const userDiv = document.createElement('div');
        userDiv.className = 'message user-message';
        userDiv.innerText = text;
        msgs.appendChild(userDiv);
        input.value = '';
        msgs.scrollTop = msgs.scrollHeight;

        const botDiv = document.createElement('div');
        botDiv.className = 'message bot-message';
        botDiv.innerText = 'Thinking...';
        msgs.appendChild(botDiv);
        msgs.scrollTop = msgs.scrollHeight;
        
        try {
            
            const apiKey = "AIzaSyBGqjCgIa7cpk6nBqE_g0oH1ywZkDAIzpc"; 
            
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: text }] }] })
            });

            const data = await response.json();
            
            if (data.candidates && data.candidates[0].content) {
                botDiv.innerText = data.candidates[0].content.parts[0].text;
            } else {
                botDiv.innerText = "I'm having trouble connecting right now.";
            }
        } catch (error) {
            botDiv.innerText = "Error: Could not reach the AI server.";
            console.error(error);
        }
        msgs.scrollTop = msgs.scrollHeight;
    }
}