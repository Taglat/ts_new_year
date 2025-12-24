import gsap from "gsap";

/**
 * ⚽ MAY_2025: Two Events
 * Event 1: Welcome Nargiz (0-50%)
 * Event 2: Football Match - Tomorrow School wins! (50-100%)
 */

export function initMAY_2025(section, stateManager, index) {
    console.log(`✅ MAY_2025 initialized`);

    // Create both events
    createWelcomeNargizEvent(section);
    createFootballMatchEvent(section);

    const event1 = section.querySelector('.event-1-welcome-nargiz');
    const event2 = section.querySelector('.event-2-football-match');

    console.log('MAY Event 1:', event1);
    console.log('MAY Event 2:', event2);

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
                section.style.zIndex = '102';
                section.style.visibility = 'visible';
            },
            onEnterBack: () => {
                stateManager.currentIndex = index;
                section.style.zIndex = '102';
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
                console.log('MAY Progress:', (self.progress * 100).toFixed(1) + '%');
            }
        }
    });

    // Initially hide event 2
    gsap.set(event2, { opacity: 0, display: 'none' });

    // ==========================================
    // EVENT 1: WELCOME NARGIZ (0-50%)
    // ==========================================

    const welcomeBanner = event1.querySelector('.welcome-banner');
    const nargizCharacter = event1.querySelector('.nargiz-character');
    const stars = event1.querySelectorAll('.star');
    const confettiTrigger = event1.querySelector('.confetti-trigger');

    // Welcome banner slides in
    tl.from(welcomeBanner, {
        y: -200,
        opacity: 0,
        duration: 4, // Increased 1→4
        ease: "bounce.out"
    });

    // Nargiz character appears
    tl.from(nargizCharacter, {
        scale: 0,
        rotation: 360,
        opacity: 0,
        duration: 6, // Increased 1.5→6
        ease: "elastic.out(1, 0.5)"
    }, "-=2");

    // Stars sparkle around
    tl.from(stars, {
        scale: 0,
        rotation: 180,
        opacity: 0,
        duration: 3, // Increased 0.8→3
        stagger: 0.4, // Increased 0.1→0.4
        ease: "back.out(3)"
    }, "-=4");

    // Stars twinkle continuously
    stars.forEach((star, i) => {
        gsap.to(star, {
            scale: 1.5,
            opacity: 0.5,
            duration: gsap.utils.random(0.8, 1.5),
            yoyo: true,
            repeat: -1,
            delay: i * 0.2,
            ease: "sine.inOut"
        });
    });

    // Confetti explosion
    tl.add(() => {
        createWelcomeConfetti(event1);
    });

    // Character celebrates (bounce)
    tl.to(nargizCharacter, {
        y: -30,
        duration: 1.5, // Increased 0.4→1.5
        yoyo: true,
        repeat: 5,
        ease: "power2.inOut"
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
    // EVENT 2: FOOTBALL MATCH (50-100%)
    // ==========================================

    const field = event2.querySelector('.football-field');
    const ball = event2.querySelector('.ball');
    const tomorrowPlayers = event2.querySelectorAll('.tomorrow-player');
    const astanaPlayers = event2.querySelectorAll('.astana-player');
    const scoreboard = event2.querySelector('.match-scoreboard');
    const tomorrowScoreEl = event2.querySelector('.tomorrow-score');
    const astanaScoreEl = event2.querySelector('.astana-score');
    const goal = event2.querySelector('.goal-net');

    let tomorrowScore = 0;
    let astanaScore = 0;

    // Field appears
    tl.from(field, {
        scaleX: 0,
        duration: 4, // Increased 1→4
        ease: "power2.out"
    });

    // Teams enter from sides
    tl.from(tomorrowPlayers, {
        x: -200,
        opacity: 0,
        duration: 3, // Increased 0.8→3
        stagger: 0.4, // Increased 0.1→0.4
        ease: "power2.out"
    }, "-=2");

    tl.from(astanaPlayers, {
        x: 200,
        opacity: 0,
        duration: 3, // Increased 0.8→3
        stagger: 0.4, // Increased 0.1→0.4
        ease: "power2.out"
    }, "-=3");

    // Ball appears
    tl.from(ball, {
        y: -300,
        duration: 3, // Increased 0.8→3
        ease: "bounce.out"
    });

    // Players move around (simulate match)
    [...tomorrowPlayers, ...astanaPlayers].forEach(player => {
        gsap.to(player, {
            y: gsap.utils.random(-20, 20),
            duration: gsap.utils.random(1, 2),
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });
    });

    // Hold before goal
    tl.to({}, { duration: 5 });

    // GOAL SEQUENCE: Tomorrow School scores!
    tl.to(ball, {
        x: 250,
        y: -10,
        scale: 0.8,
        duration: 4, // Increased 1→4 and moved to timeline
        ease: "power2.in"
    });

    // Ball enters goal
    tl.to(ball, {
        x: 280,
        y: 0,
        scale: 0.6,
        duration: 1.5, // Increased 0.3→1.5
        ease: "power1.out"
    });

    // GOAL celebration
    tl.add(() => {
        tomorrowScore++;
        tomorrowScoreEl.textContent = tomorrowScore;
        createGoalExplosion(goal);
    });

    tl.to(goal, {
        scale: 1.1,
        duration: 0.8, // Increased 0.2→0.8
        yoyo: true,
        repeat: 3
    }, "-=0.5");

    tl.to(scoreboard, {
        scale: 1.3,
        backgroundColor: '#00ff00',
        duration: 1.2, // Increased 0.3→1.2
        yoyo: true,
        repeat: 3
    }, "-=2");

    // Tomorrow players celebrate
    tl.to(tomorrowPlayers, {
        y: -40,
        duration: 1.5, // Increased 0.4→1.5
        stagger: 0.2, // Increased 0.05→0.2
        yoyo: true,
        repeat: 3,
        ease: "power2.out"
    }, "-=2");

    // Pause to show the goal
    tl.to({}, { duration: 8 }); // Increased 2→8

    // Victory celebration - create element once and animate it
    const victoryText = document.createElement('div');
    victoryText.className = 'victory-text';
    victoryText.textContent = 'TOMORROW SCHOOL WINS! 🏆';
    victoryText.style.opacity = '0';
    victoryText.style.transform = 'translate(-50%, -50%) scale(0) rotate(0deg)';
    event2.appendChild(victoryText);

    tl.add(() => {
        createVictoryConfetti(event2);
    });

    tl.to(victoryText, {
        opacity: 1,
        scale: 1,
        rotation: 360,
        duration: 4,
        ease: "elastic.out(1, 0.5)"
    }, "-=0.5");

    // Hold Event 2 for viewing
    tl.to({}, { duration: 10 }); // Increased 3→10
}

function createWelcomeNargizEvent(section) {
    const event = document.createElement('div');
    event.className = 'event-1-welcome-nargiz';

    event.innerHTML = `
        <div class="welcome-banner">
            <div class="banner-text">NEW TEAM MEMBER</div>
            <div class="member-name">NARGIZ</div>
        </div>
        <div class="nargiz-character">
            <div class="character-avatar">👩‍💼</div>
            <div class="character-badge">✨ WELCOME! ✨</div>
        </div>
        ${Array(12).fill(0).map((_, i) => `
            <div class="star" style="
                left: ${gsap.utils.random(10, 90)}%;
                top: ${gsap.utils.random(10, 90)}%;
            ">⭐</div>
        `).join('')}
        <div class="confetti-trigger"></div>
    `;

    section.appendChild(event);
}

function createFootballMatchEvent(section) {
    const event = document.createElement('div');
    event.className = 'event-2-football-match';

    event.innerHTML = `
        <div class="event-title">Astana Hub Football Tournament ⚽</div>
        <div class="match-scoreboard">
            <div class="team tomorrow">
                <div class="team-name">Tomorrow School</div>
                <div class="tomorrow-score">0</div>
            </div>
            <div class="vs">VS</div>
            <div class="team astana">
                <div class="team-name">Astana Hub</div>
                <div class="astana-score">0</div>
            </div>
        </div>
        <div class="football-field">
            <div class="field-line halfway-line"></div>
            <div class="center-circle"></div>

            <div class="tomorrow-side">
                ${Array(3).fill(0).map(() => `<div class="tomorrow-player">⚽</div>`).join('')}
            </div>

            <div class="astana-side">
                ${Array(3).fill(0).map(() => `<div class="astana-player">⚫</div>`).join('')}
            </div>

            <div class="ball">⚪</div>

            <div class="goal-net">
                <div class="goal-frame">🥅</div>
            </div>
        </div>
    `;

    section.appendChild(event);
}

function createWelcomeConfetti(container) {
    for (let i = 0; i < 60; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'welcome-confetti';
        confetti.style.cssText = `
            position: absolute;
            left: 50%;
            top: 30%;
            width: 12px;
            height: 12px;
            background: ${['#ff6b6b', '#4ecdc4', '#ffe66d', '#a8dadc', '#ff9ff3'][Math.floor(Math.random() * 5)]};
            border-radius: 50%;
        `;
        container.appendChild(confetti);

        gsap.to(confetti, {
            x: gsap.utils.random(-400, 400),
            y: gsap.utils.random(-200, 400),
            rotation: gsap.utils.random(0, 720),
            opacity: 0,
            duration: gsap.utils.random(1.5, 3),
            ease: "power2.out",
            onComplete: () => confetti.remove()
        });
    }
}

function createGoalExplosion(goalElement) {
    const rect = goalElement.getBoundingClientRect();

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'goal-particle';
        particle.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            width: 15px;
            height: 15px;
            background: ${['#ffd700', '#ffff00', '#00ff00', '#ff6b6b'][Math.floor(Math.random() * 4)]};
            border-radius: 50%;
        `;
        document.body.appendChild(particle);

        gsap.to(particle, {
            x: gsap.utils.random(-200, 200),
            y: gsap.utils.random(-200, 200),
            opacity: 0,
            scale: 0,
            duration: 1.5,
            ease: "power2.out",
            onComplete: () => particle.remove()
        });
    }
}

function createVictoryConfetti(container) {
    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'victory-confetti';
        confetti.style.cssText = `
            position: absolute;
            left: 50%;
            top: 10%;
            width: 10px;
            height: 20px;
            background: ${['#ffd700', '#ff6b6b', '#4ecdc4'][Math.floor(Math.random() * 3)]};
        `;
        container.appendChild(confetti);

        gsap.to(confetti, {
            x: gsap.utils.random(-500, 500),
            y: gsap.utils.random(300, 700),
            rotation: gsap.utils.random(0, 1080),
            opacity: 0,
            duration: gsap.utils.random(2, 4),
            ease: "power2.out",
            onComplete: () => confetti.remove()
        });
    }
}
