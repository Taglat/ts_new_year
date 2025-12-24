import gsap from "gsap";

/**
 * 🎨 APR_2025: Two Events
 * Event 1: Art Therapy - Pixel Capybara Canvas (0-50%)
 * Event 2: 12 Activity Clubs Tour (50-100%)
 */

export function initAPR_2025(section, stateManager, index) {
    console.log(`✅ APR_2025 initialized`);

    // Create both events
    createArtTherapyEvent(section);
    createClubsTourEvent(section);

    const event1 = section.querySelector('.event-1-art-therapy');
    const event2 = section.querySelector('.event-2-clubs-tour');

    console.log('APR Event 1:', event1);
    console.log('APR Event 2:', event2);

    // Main timeline
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=1200%", // Massive scroll distance
            pin: true,
            scrub: 5, // Slower scrub = animations take longer
            markers: true, // Debug mode
            pinSpacing: true,
            anticipatePin: 1,
            onEnter: () => {
                stateManager.currentIndex = index;
                section.style.zIndex = '101';
                section.style.visibility = 'visible';
            },
            onEnterBack: () => {
                stateManager.currentIndex = index;
                section.style.zIndex = '101';
                section.style.visibility = 'visible';
            },
            onLeave: () => {
                section.style.zIndex = '1';
                section.style.visibility = 'hidden';
            },
            onLeaveBack: () => {
                section.style.zIndex = '1';
                section.style.visibility = 'hidden';
            },
            onUpdate: (self) => {
                console.log('APR Progress:', (self.progress * 100).toFixed(1) + '%');
            }
        }
    });

    // Initially hide event 2
    gsap.set(event2, { opacity: 0, display: 'none' });

    // ==========================================
    // EVENT 1: ART THERAPY - PIXEL CAPYBARA (0-50%)
    // ==========================================

    const pixels = Array.from(event1.querySelectorAll('.pixel')); // Convert to array!
    const canvas = event1.querySelector('.pixel-canvas');

    console.log('Pixels count:', pixels.length);

    // Set initial state - pixels start invisible (scale 0)
    gsap.set(pixels, { scale: 0, transformOrigin: 'center' });

    // Canvas appears
    tl.from(canvas, {
        scale: 0.5,
        rotation: 10,
        opacity: 0,
        duration: 4, // Increased 1→4
        ease: "back.out(1.7)"
    });

    // Pixels fill organically to form capybara
    // Create organic filling pattern
    const pixelGroups = [
        pixels.slice(0, 48),    // First wave (20% of 240)
        pixels.slice(48, 96),   // Second wave
        pixels.slice(96, 144),  // Third wave
        pixels.slice(144, 192), // Fourth wave
        pixels.slice(192)       // Final wave
    ];

    console.log('Pixel groups:', pixelGroups.map(g => g.length));

    pixelGroups.forEach((group, groupIndex) => {
        tl.to(group, {
            scale: 1,
            duration: 6, // Increased 0.8→6
            stagger: {
                amount: 3, // Increased 0.6→3
                from: "random",
                ease: "power2.out"
            },
            ease: "back.out(1.5)"
        }, `-=${groupIndex === 0 ? 2 : 4}`); // Increased overlap
    });

    // Paint brushes float across canvas
    const brushes = event1.querySelectorAll('.paint-brush');
    brushes.forEach((brush, i) => {
        gsap.fromTo(brush,
            { x: -100, y: gsap.utils.random(0, 300), opacity: 0 },
            {
                x: window.innerWidth + 100,
                opacity: 1,
                duration: 3,
                delay: i * 0.5,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "+=200%",
                    scrub: 1
                }
            }
        );
    });

    // Hold Event 1 for viewing
    tl.to({}, { duration: 10 }); // Increased 3→10

    // Transition to Event 2
    tl.to(event1, {
        opacity: 0,
        scale: 0.9,
        duration: 5, // Increased 2→5
        ease: "power2.in"
    })
    .set(event1, { display: 'none' })
    .set(event2, { display: 'flex' })
    .to(event2, {
        opacity: 1,
        duration: 3, // Increased 1→3
        ease: "power2.out"
    });

    // ==========================================
    // EVENT 2: 12 ACTIVITY CLUBS TOUR (50-100%)
    // ==========================================

    const clubs = event2.querySelectorAll('.club-door');
    const progressText = event2.querySelector('.progress-text');

    // Clubs appear
    tl.from(clubs, {
        scale: 0,
        rotation: 180,
        opacity: 0,
        duration: 4, // Increased 1→4
        stagger: 0.3, // Increased 0.08→0.3
        ease: "back.out(1.7)"
    });

    // As user scrolls, clubs get "entered" one by one
    clubs.forEach((club, i) => {
        // Door opens
        tl.to(club, {
            rotationY: 90,
            duration: 1.5, // Increased 0.3→1.5
            ease: "power2.in"
        });

        // Light shines through
        tl.add(() => {
            club.classList.add('visited');
            const currentCount = Math.min(i + 1, 12);
            progressText.textContent = `${currentCount}/12 Clubs Visited`;
            createSparkles(club);
        });

        // Club disappears
        tl.to(club, {
            scale: 0,
            opacity: 0,
            duration: 1.5, // Increased 0.4→1.5
            ease: "back.in(2)"
        }, "-=0.5");
    });

    // All clubs visited - celebration!
    tl.add(() => {
        progressText.textContent = "ALL CLUBS COMPLETED! 🎉";
        createConfetti(event2);
    });

    tl.to(progressText, {
        scale: 1.5,
        color: '#00ff00',
        duration: 2, // Increased 0.5→2
        yoyo: true,
        repeat: 3
    });

    // Hold Event 2 for viewing
    tl.to({}, { duration: 10 }); // Increased 3→10
}

function createArtTherapyEvent(section) {
    const event = document.createElement('div');
    event.className = 'event-1-art-therapy';

    // Create pixel grid for capybara (20x12 grid = 240 pixels)
    const capybaraPattern = createCapybaraPattern();

    event.innerHTML = `
        <div class="event-title">Art Therapy 🎨</div>
        <div class="pixel-canvas">
            ${capybaraPattern.map(color => `
                <div class="pixel" style="background-color: ${color}"></div>
            `).join('')}
        </div>
        ${Array(3).fill(0).map(() => `<div class="paint-brush">🖌️</div>`).join('')}
    `;

    section.appendChild(event);
}

function createClubsTourEvent(section) {
    const clubs = [
        { name: 'Beginner English', icon: '🔤' },
        { name: 'Freelance', icon: '💼' },
        { name: 'Public Speaking', icon: '🎤' },
        { name: 'Board Games', icon: '🎲' },
        { name: 'Startup', icon: '🚀' },
        { name: 'Music Jam', icon: '🎸' },
        { name: 'AI Tools', icon: '🤖' },
        { name: 'Soft Skills', icon: '🤝' },
        { name: 'Movie', icon: '🎬' },
        { name: 'Debate', icon: '⚖️' },
        { name: 'JavaScript', icon: '⚡' },
        { name: 'Social Media Club', icon: '📱' }
    ];

    const event = document.createElement('div');
    event.className = 'event-2-clubs-tour';

    event.innerHTML = `
        <div class="event-title">12 Activity Clubs 🏫</div>
        <div class="progress-text">0/12 Clubs Visited</div>
        <div class="clubs-grid">
            ${clubs.map(club => `
                <div class="club-door">
                    <div class="door-front">
                        <div class="door-icon">${club.icon}</div>
                        <div class="door-name">${club.name}</div>
                        <div class="door-handle"></div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    section.appendChild(event);
}

function createCapybaraPattern() {
    // Simple capybara pixel art pattern
    // B = brown, D = dark brown, L = light background, N = nose (black), E = eye
    const pattern = [
        'L','L','L','L','L','L','L','L','L','L','L','L','L','L','L','L','L','L','L','L',
        'L','L','L','L','D','D','D','D','D','D','D','D','D','D','D','D','L','L','L','L',
        'L','L','L','D','B','B','B','B','B','B','B','B','B','B','B','B','D','L','L','L',
        'L','L','D','B','B','B','E','B','B','B','B','B','E','B','B','B','B','D','L','L',
        'L','L','D','B','B','B','B','B','B','B','B','B','B','B','B','B','B','D','L','L',
        'L','D','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','D','L',
        'L','D','B','B','B','B','B','N','N','N','B','B','B','B','B','B','B','B','D','L',
        'L','D','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','D','L',
        'L','L','D','B','B','B','B','B','B','B','B','B','B','B','B','B','B','D','L','L',
        'L','L','L','D','D','B','B','B','B','B','B','B','B','B','B','D','D','L','L','L',
        'L','L','L','L','L','D','D','D','D','D','D','D','D','D','D','L','L','L','L','L',
        'L','L','L','L','L','L','L','L','L','L','L','L','L','L','L','L','L','L','L','L'
    ];

    const colorMap = {
        'B': '#8B6F47',  // Brown (capybara body)
        'D': '#5C4033',  // Dark brown (outline)
        'L': '#b8e0d2',  // Light teal background (no white!)
        'N': '#2C1810',  // Nose (black)
        'E': '#1a1a1a'   // Eye (black)
    };

    return pattern.map(p => colorMap[p]);
}

function createSparkles(element) {
    const rect = element.getBoundingClientRect();

    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.textContent = '✨';
        sparkle.style.left = rect.left + rect.width / 2 + 'px';
        sparkle.style.top = rect.top + rect.height / 2 + 'px';
        document.body.appendChild(sparkle);

        gsap.to(sparkle, {
            x: gsap.utils.random(-80, 80),
            y: gsap.utils.random(-80, 80),
            opacity: 0,
            scale: 0,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => sparkle.remove()
        });
    }
}

function createConfetti(container) {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.cssText = `
            position: absolute;
            left: 50%;
            top: 20%;
            width: 10px;
            height: 10px;
            background: ${['#ff6b6b', '#4ecdc4', '#ffe66d', '#a8dadc'][Math.floor(Math.random() * 4)]};
        `;
        container.appendChild(confetti);

        gsap.to(confetti, {
            x: gsap.utils.random(-300, 300),
            y: gsap.utils.random(200, 500),
            rotation: gsap.utils.random(0, 720),
            opacity: 0,
            duration: gsap.utils.random(2, 3),
            ease: "power2.out",
            onComplete: () => confetti.remove()
        });
    }
}
