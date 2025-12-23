import gsap from "gsap";

/**
 * 🌸 MAR_2025: 8 Марта - Международный женский день
 * 
 * Красивая анимация с падающими лепестками, плавными переходами
 * и элегантным появлением контента
 */

export function initMAR_2025(section, stateManager, index) {
    console.log(`✅ Инициализирована секция MAR_2025 (индекс: ${index})`);

    // Находим все события
    const events = section.querySelectorAll('.event');

    // Создаем падающие лепестки
    createPetals(section);

    // ═══════════════════════════════════════════════════════
    // 🌸 ОСНОВНАЯ АНИМАЦИЯ С PIN
    // ═══════════════════════════════════════════════════════

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=600%",           // Увеличили для 3 событий
            pin: true,
            pinSpacing: true,        // 🔥 ИСПРАВЛЕНИЕ: добавляем spacing
            scrub: 1,
            markers: true,

            // 🔥 ИСПРАВЛЕНИЕ: добавляем z-index
            onRefresh: (self) => {
                gsap.set(section, { zIndex: 100 });
            },

            onEnter: () => {
                stateManager.currentIndex = index;
                gsap.set(section, { zIndex: 100 });
                console.log(`🌸 Вошли в MAR_2025`);
            },
            onEnterBack: () => {
                stateManager.currentIndex = index;
                gsap.set(section, { zIndex: 100 });
            },
            onLeave: () => {
                gsap.set(section, { zIndex: 1 });
            },
            onLeaveBack: () => {
                gsap.set(section, { zIndex: 1 });
            }
        }
    });

    // Скрываем все события изначально
    gsap.set(events, { opacity: 0 });

    // ═══════════════════════════════════════════════════════
    // АНИМИРУЕМ КАЖДОЕ СОБЫТИЕ ПООЧЕРЕДНО
    // ═══════════════════════════════════════════════════════

    events.forEach((event, eventIndex) => {
        const title = event.querySelector('h3');
        const desc = event.querySelector('.desc');
        const imgContainer = event.querySelector('.img');
        const img = event.querySelector('.c_img');

        // Показываем контейнер события
        tl.to(event, {
            opacity: 1,
            duration: 0.01
        });

        // ЭТАП 1: Появление заголовка
        tl.from(title, {
            y: 100,
            opacity: 0,
            scale: 0.8,
            duration: 1,
            ease: "back.out(1.7)"
        })
            .to(title, {
                y: -20,
                scale: 1.1,
                duration: 0.5,
                ease: "power2.inOut"
            })
            .to(title, {
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: "elastic.out(1, 0.5)"
            });

        // ЭТАП 2: Появление описания
        tl.from(desc, {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.3");

        // ЭТАП 3: Появление изображения
        tl.from(imgContainer, {
            scale: 0,
            opacity: 0,
            rotation: -15,
            duration: 1.5,
            ease: "back.out(1.2)"
        }, "-=0.2")
            .from(img, {
                scale: 1.5,
                filter: "blur(10px)",
                duration: 1.5,
                ease: "power2.out"
            }, "<");

        // ЭТАП 4: Финальный акцент
        tl.to(imgContainer, {
            y: -10,
            duration: 0.5,
            ease: "power1.inOut",
            yoyo: true,
            repeat: 1
        });

        // Если не последнее событие, скрываем его перед следующим
        if (eventIndex < events.length - 1) {
            tl.to(event, {
                opacity: 0,
                scale: 0.9,
                duration: 1,
                ease: "power2.in"
            });
        }
    });

    // Финальная анимация фона
    tl.to(section, {
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        duration: 2,
        ease: "power2.inOut"
    }, "-=1");

    // ═══════════════════════════════════════════════════════
    // АНИМАЦИЯ ЛЕПЕСТКОВ
    // ═══════════════════════════════════════════════════════
    animatePetals(section);
}

/**
 * Создаем элементы лепестков
 */
function createPetals(section) {
    const petalsContainer = document.createElement('div');
    petalsContainer.classList.add('petals-container');
    section.appendChild(petalsContainer);

    // Создаем 20 лепестков
    for (let i = 0; i < 20; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.textContent = '🌸';
        petalsContainer.appendChild(petal);
    }
}

/**
 * Анимируем падение лепестков
 */
function animatePetals(section) {
    const petals = section.querySelectorAll('.petal');

    petals.forEach((petal, i) => {
        // Случайные начальные позиции
        gsap.set(petal, {
            x: gsap.utils.random(-50, window.innerWidth + 50),
            y: gsap.utils.random(-100, -50),
            rotation: gsap.utils.random(0, 360),
            scale: gsap.utils.random(0.5, 1.5)
        });

        // Анимация падения
        gsap.to(petal, {
            y: window.innerHeight + 100,
            x: `+=${gsap.utils.random(-200, 200)}`,
            rotation: `+=${gsap.utils.random(360, 720)}`,
            duration: gsap.utils.random(8, 15),
            delay: i * 0.3,
            repeat: -1,
            ease: "none"
        });

        // Дополнительная анимация качания
        gsap.to(petal, {
            x: `+=${gsap.utils.random(-30, 30)}`,
            duration: gsap.utils.random(2, 4),
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });
    });
}