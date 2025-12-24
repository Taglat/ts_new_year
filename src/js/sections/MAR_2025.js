import gsap from "gsap";

/**
 * 🌸 MAR_2025: Two Events
 * Event 1: Women's Day with Tulips (0-50%)
 * Event 2: Chess Tournament Battle (50-100%)
 */

export function initMAR_2025(section, stateManager, index) {
    console.log(`✅ MAR_2025 initialized`);

    // Create both events
    createWomensDayEvent(section);
    createChessTournamentEvent(section);

    const event1 = section.querySelector('.event-1-womens-day');
    const event2 = section.querySelector('.event-2-chess-tournament');

    console.log('Event 1:', event1);
    console.log('Event 2:', event2);

    // Main timeline with ScrollTrigger
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
                section.style.zIndex = '100';
                section.style.visibility = 'visible';
            },
            onEnterBack: () => {
                stateManager.currentIndex = index;
                section.style.zIndex = '100';
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
                console.log('MAR Progress:', (self.progress * 100).toFixed(1) + '%');
            }
        }
    });

    // Initially hide event 2
    gsap.set(event2, { opacity: 0, display: 'none' });

    // ==========================================
    // EVENT 1: WOMEN'S DAY - PIXEL GIFT (0-50%)
    // ==========================================

    const pixelBoy = event1.querySelector('.pixel-boy');
    const pixelGirl = event1.querySelector('.pixel-girl');
    const pixelFlower = event1.querySelector('.pixel-flower');
    const hearts = event1.querySelectorAll('.floating-heart');

    // Boy appears from left
    tl.from(pixelBoy, {
        x: -300,
        opacity: 0,
        duration: 6,
        ease: "power2.out"
    });

    // Girl appears from right
    tl.from(pixelGirl, {
        x: 300,
        opacity: 0,
        duration: 6,
        ease: "power2.out"
    }, "-=4");

    // Flower appears in boy's hand
    tl.from(pixelFlower, {
        scale: 0,
        rotation: 180,
        opacity: 0,
        duration: 4,
        ease: "back.out(2)"
    });

    // Flower moves from boy to girl
    tl.to(pixelFlower, {
        x: 150,
        duration: 4,
        ease: "power2.inOut"
    });

    // Hearts float up
    tl.from(hearts, {
        y: 100,
        opacity: 0,
        scale: 0,
        duration: 5,
        stagger: 0.3,
        ease: "back.out(1.7)"
    }, "-=2");

    // Characters celebrate (bounce)
    tl.to([pixelBoy, pixelGirl], {
        y: -20,
        duration: 2,
        stagger: 0.2,
        yoyo: true,
        repeat: 3,
        ease: "power2.inOut"
    });

    // Hearts float continuously
    hearts.forEach((heart, i) => {
        gsap.to(heart, {
            y: -30,
            x: gsap.utils.random(-20, 20),
            duration: gsap.utils.random(2, 3),
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: i * 0.3
        });
    });

    // Hold Event 1 for viewing
    tl.to({}, { duration: 10 }); // Increased 3→10

    // Transition: Event 1 fades out, Event 2 fades in
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
    // EVENT 2: CHESS TOURNAMENT BATTLE (50-100%)
    // ==========================================

    const board = event2.querySelector('.chess-battlefield');
    const pieces = event2.querySelectorAll('.chess-piece');

    // Ensure pieces are visible initially
    gsap.set(pieces, { opacity: 1, visibility: 'visible' });

    // Board appears
    tl.from(board, {
        scale: 0,
        rotation: 180,
        duration: 4, // Increased 1→4
        ease: "back.out(1.7)"
    });

    // Pieces drop onto board
    tl.from(pieces, {
        y: -300,
        rotation: 720,
        opacity: 0,
        duration: 4, // Increased 1→4
        stagger: 0.3, // Increased 0.08→0.3
        ease: "bounce.out"
    }, "-=2");

    // BATTLE SEQUENCE: Pieces push and collide
    const whitePieces = Array.from(pieces).filter(p => p.classList.contains('white'));
    const blackPieces = Array.from(pieces).filter(p => p.classList.contains('black'));

    // Round 1: White pieces push forward
    tl.to(whitePieces, {
        x: 50,
        duration: 2, // Increased 0.4→2
        ease: "power2.out"
    });

    // Black pieces push back
    tl.to(blackPieces, {
        x: -50,
        duration: 2, // Increased 0.4→2
        ease: "power2.out"
    }, "-=1");

    // Collision shake
    tl.to(board, {
        x: -5,
        duration: 0.2, // Increased 0.05→0.2
        yoyo: true,
        repeat: 5
    });

    // Round 2: Pieces return and regroup
    tl.to([...whitePieces, ...blackPieces], {
        x: 0,
        duration: 2, // Increased 0.4→2
        ease: "power2.inOut"
    });

    // Round 3: Central clash
    tl.to(whitePieces.slice(0, 3), {
        x: 30,
        y: -20,
        scale: 1.3,
        duration: 2.5, // Increased 0.5→2.5
        ease: "power2.out"
    });

    tl.to(blackPieces.slice(0, 3), {
        x: -30,
        y: 20,
        scale: 1.3,
        duration: 2.5, // Increased 0.5→2.5
        ease: "power2.out"
    }, "-=2.5");

    // Final collision with particles
    tl.add(() => {
        createBattleExplosion(board);
    });

    // Pause for dramatic effect
    tl.to({}, { duration: 2 });

    // WINNING SEQUENCE: Black pieces defeated
    // Black pieces fall and disappear
    tl.to(blackPieces, {
        y: 200,
        rotation: 720,
        opacity: 0,
        scale: 0,
        duration: 3,
        stagger: 0.2,
        ease: "power2.in"
    });

    // White pieces celebrate - jump up
    tl.to(whitePieces, {
        y: -40,
        duration: 1.5,
        stagger: 0.15,
        ease: "power2.out"
    }, "-=2");

    // White pieces land
    tl.to(whitePieces, {
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "bounce.out"
    });

    // King piece (first white piece) stands tall as champion
    tl.to(whitePieces[0], {
        scale: 2.5,
        y: -80,
        duration: 3,
        ease: "elastic.out(1, 0.3)"
    });

    // Add crown to winner
    const crown = document.createElement('div');
    crown.className = 'victory-crown';
    crown.textContent = '👑';
    crown.style.cssText = `
        position: absolute;
        left: 50%;
        top: 30%;
        transform: translate(-50%, -50%) scale(0);
        font-size: 4rem;
        filter: drop-shadow(0 0 20px #ffd700);
        z-index: 1000;
    `;
    event2.appendChild(crown);

    tl.to(crown, {
        scale: 1,
        rotation: 360,
        duration: 2,
        ease: "back.out(2)"
    }, "-=2");

    // Victory text
    const victoryText = document.createElement('div');
    victoryText.className = 'chess-victory-text';
    victoryText.textContent = 'WHITE WINS! 🏆';
    victoryText.style.cssText = `
        position: absolute;
        top: 15%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        font-family: 'Press Start 2P', cursive;
        font-size: 2rem;
        color: #ffd700;
        text-shadow: 3px 3px 0 #000, 6px 6px 0 #fff, 0 0 30px #ffd700;
        z-index: 1000;
        white-space: nowrap;
    `;
    event2.appendChild(victoryText);

    tl.to(victoryText, {
        scale: 1,
        duration: 2,
        ease: "elastic.out(1, 0.5)"
    }, "-=1.5");

    // Victory confetti
    tl.add(() => {
        createChessVictoryConfetti(event2);
    });

    // Remaining white pieces do victory dance
    tl.to(whitePieces.slice(1), {
        rotation: 360,
        duration: 2,
        stagger: 0.1,
        ease: "power2.inOut"
    }, "-=1");

    // Hold Event 2 for viewing
    tl.to({}, { duration: 10 }); // Increased 3→10
}

function createWomensDayEvent(section) {
    const event = document.createElement('div');
    event.className = 'event-1-womens-day';
    event.innerHTML = `
        <div class="pixel-scene">
            <div class="pixel-boy">
                <div class="pixel-character-grid">
                    <div class="pixel-row">
                        <div class="pixel"></div><div class="pixel skin"></div><div class="pixel skin"></div><div class="pixel"></div>
                    </div>
                    <div class="pixel-row">
                        <div class="pixel skin"></div><div class="pixel eye"></div><div class="pixel eye"></div><div class="pixel skin"></div>
                    </div>
                    <div class="pixel-row">
                        <div class="pixel skin"></div><div class="pixel skin"></div><div class="pixel skin"></div><div class="pixel skin"></div>
                    </div>
                    <div class="pixel-row">
                        <div class="pixel blue"></div><div class="pixel blue"></div><div class="pixel blue"></div><div class="pixel blue"></div>
                    </div>
                    <div class="pixel-row">
                        <div class="pixel blue"></div><div class="pixel blue"></div><div class="pixel blue"></div><div class="pixel blue"></div>
                    </div>
                    <div class="pixel-row">
                        <div class="pixel skin"></div><div class="pixel skin"></div><div class="pixel skin"></div><div class="pixel skin"></div>
                    </div>
                </div>
            </div>
            <div class="pixel-flower">
                <div class="flower-pixels">
                    <div class="pixel red"></div><div class="pixel red"></div><div class="pixel red"></div>
                    <div class="pixel red"></div><div class="pixel yellow"></div><div class="pixel red"></div>
                    <div class="pixel"></div><div class="pixel green"></div><div class="pixel"></div>
                </div>
            </div>
            <div class="pixel-girl">
                <div class="pixel-character-grid">
                    <div class="pixel-row">
                        <div class="pixel"></div><div class="pixel skin"></div><div class="pixel skin"></div><div class="pixel"></div>
                    </div>
                    <div class="pixel-row">
                        <div class="pixel skin"></div><div class="pixel eye"></div><div class="pixel eye"></div><div class="pixel skin"></div>
                    </div>
                    <div class="pixel-row">
                        <div class="pixel skin"></div><div class="pixel skin"></div><div class="pixel skin"></div><div class="pixel skin"></div>
                    </div>
                    <div class="pixel-row">
                        <div class="pixel pink"></div><div class="pixel pink"></div><div class="pixel pink"></div><div class="pixel pink"></div>
                    </div>
                    <div class="pixel-row">
                        <div class="pixel pink"></div><div class="pixel pink"></div><div class="pixel pink"></div><div class="pixel pink"></div>
                    </div>
                    <div class="pixel-row">
                        <div class="pixel skin"></div><div class="pixel skin"></div><div class="pixel skin"></div><div class="pixel skin"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="hearts-container">
            ${Array(6).fill(0).map(() => `<div class="floating-heart">❤️</div>`).join('')}
        </div>
        <div class="event-title">March 8 • Women's Day 🌸</div>
    `;
    section.appendChild(event);
}

function createChessTournamentEvent(section) {
    const event = document.createElement('div');
    event.className = 'event-2-chess-tournament';

    const whitePieces = ['♔', '♕', '♖', '♗', '♘', '♙', '♙', '♙'];
    const blackPieces = ['♚', '♛', '♜', '♝', '♞', '♟', '♟', '♟'];

    event.innerHTML = `
        <div class="chess-battlefield">
            <div class="white-side">
                ${whitePieces.map(piece => `
                    <div class="chess-piece white">${piece}</div>
                `).join('')}
            </div>
            <div class="battle-line"></div>
            <div class="black-side">
                ${blackPieces.map(piece => `
                    <div class="chess-piece black">${piece}</div>
                `).join('')}
            </div>
        </div>
        <div class="event-title">Chess Tournament ♔</div>
    `;
    section.appendChild(event);
}

function createBattleExplosion(container) {
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'battle-particle';
        particle.style.cssText = `
            position: absolute;
            left: 50%;
            top: 50%;
            width: 10px;
            height: 10px;
            background: ${['#ffd700', '#ff6b6b', '#4ecdc4'][Math.floor(Math.random() * 3)]};
            border-radius: 50%;
        `;
        container.appendChild(particle);

        gsap.to(particle, {
            x: gsap.utils.random(-150, 150),
            y: gsap.utils.random(-150, 150),
            opacity: 0,
            scale: 0,
            duration: 1,
            ease: "power2.out",
            onComplete: () => particle.remove()
        });
    }
}

function createChessVictoryConfetti(container) {
    for (let i = 0; i < 60; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'chess-confetti';
        confetti.style.cssText = `
            position: absolute;
            left: 50%;
            top: 20%;
            width: ${gsap.utils.random(8, 15)}px;
            height: ${gsap.utils.random(8, 15)}px;
            background: ${['#ffd700', '#ffffff', '#ffed4e', '#fff9c4'][Math.floor(Math.random() * 4)]};
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        `;
        container.appendChild(confetti);

        gsap.to(confetti, {
            x: gsap.utils.random(-400, 400),
            y: gsap.utils.random(200, 600),
            rotation: gsap.utils.random(0, 1080),
            opacity: 0,
            duration: gsap.utils.random(2, 4),
            ease: "power2.out",
            onComplete: () => confetti.remove()
        });
    }
}
