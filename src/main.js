import './css/style.css'

const app = document.querySelector('#app');
const dateDisplay = document.querySelector('#date');
const elevator = document.querySelector('#elevator');
const particlesContainer = document.querySelector('#particles');
const startScreen = document.querySelector('#start');
const windLines = document.querySelector('#wind-lines');
const birdsContainer = document.querySelector('#birds-container');
const cloudsContainer = document.querySelector('#clouds-container');

// Month data with seasons and colors
const months = [
  { name: 'October 2024', season: 'fall', bg: 'linear-gradient(to bottom, #d4a574 0%, #8b6914 100%)' },
  { name: 'November 2024', season: 'fall', bg: 'linear-gradient(to bottom, #b8860b 0%, #704214 100%)' },
  { name: 'December 2024', season: 'winter', bg: 'linear-gradient(to bottom, #e0f2f7 0%, #90caf9 100%)' },
  { name: 'January 2025', season: 'winter', bg: 'linear-gradient(to bottom, #b0bec5 0%, #78909c 100%)' },
  { name: 'February 2025', season: 'winter', bg: 'linear-gradient(to bottom, #cfd8dc 0%, #90a4ae 100%)' },
  { name: 'March 2025', season: 'spring', bg: 'linear-gradient(to bottom, #b2dfdb 0%, #80cbc4 100%)' },
  { name: 'April 2025', season: 'spring', bg: 'linear-gradient(to bottom, #c8e6c9 0%, #81c784 100%)' },
  { name: 'May 2025', season: 'spring', bg: 'linear-gradient(to bottom, #dcedc8 0%, #aed581 100%)' },
  { name: 'June 2025', season: 'summer', bg: 'linear-gradient(to bottom, #fff9c4 0%, #ffeb3b 100%)' },
  { name: 'July 2025', season: 'summer', bg: 'linear-gradient(to bottom, #ffe082 0%, #ffc107 100%)' },
  { name: 'August 2025', season: 'summer', bg: 'linear-gradient(to bottom, #ffcc80 0%, #ff9800 100%)' },
  { name: 'September 2025', season: 'fall', bg: 'linear-gradient(to bottom, #ffab91 0%, #ff7043 100%)' },
  { name: 'October 2025', season: 'fall', bg: 'linear-gradient(to bottom, #d4a574 0%, #8b6914 100%)' },
  { name: 'November 2025', season: 'fall', bg: 'linear-gradient(to bottom, #b8860b 0%, #704214 100%)' },
  { name: 'December 2025', season: 'winter', bg: 'linear-gradient(to bottom, #e0f2f7 0%, #90caf9 100%)' }
];

let currentSeason = 'fall';
let particleInterval = null;
let sunElement = null;
let weatherInterval = null;

// Scroll to bottom on load (so user scrolls UP to reach Dec 2025)
window.addEventListener('load', () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'auto'
  });
  
  // Animate start screen out
  gsap.to(startScreen, {
    opacity: 0,
    duration: 1,
    delay: 2,
    onComplete: () => {
      startScreen.style.display = 'none';
    }
  });
  
  // Initial cloud setup
  createClouds();
});

// Update on scroll
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = 1 - (scrollTop / scrollHeight); // 1 at bottom (Oct 2024), 0 at top (Dec 2025)
  
  // Calculate current month index (0-14)
  const monthIndex = Math.min(Math.floor(scrollProgress * 15), 14);
  const currentMonth = months[monthIndex];
  
  // Update date display with GSAP
  if (dateDisplay.textContent !== currentMonth.name) {
    gsap.to(dateDisplay, {
      scale: 1.2,
      duration: 0.2,
      onComplete: () => {
        dateDisplay.textContent = currentMonth.name;
        gsap.to(dateDisplay, { scale: 1, duration: 0.2 });
      }
    });
  }
  
  // Update background with smooth transition
  app.style.background = currentMonth.bg;
  
  // Handle season change and particles
  if (currentSeason !== currentMonth.season) {
    currentSeason = currentMonth.season;
    clearParticles();
    startSeasonEffect(currentSeason, monthIndex);
  }
  
  // Continuous weather and nature effects
  handleContinuousEffects(currentMonth.season, monthIndex, scrollProgress);
});

// Clear all particles and intervals
function clearParticles() {
  if (particleInterval) {
    clearInterval(particleInterval);
    particleInterval = null;
  }
  if (weatherInterval) {
    clearInterval(weatherInterval);
    weatherInterval = null;
  }
  
  // Clear containers
  particlesContainer.innerHTML = '';
  windLines.innerHTML = '';
  birdsContainer.innerHTML = '';
  
  // Remove sun if exists
  if (sunElement) {
    sunElement.remove();
    sunElement = null;
  }
  
  // Remove shake effect
  elevator.classList.remove('shake');
}

// Start season-specific effects
function startSeasonEffect(season, monthIndex) {
  switch(season) {
    case 'fall':
      createFallingLeaves();
      createBirds();
      createWindEffect();
      break;
    case 'winter':
      createSnowfall();
      createHeavySnow();
      elevator.classList.add('shake');
      createWindEffect(true); // stronger wind
      break;
    case 'spring':
      createBloomingFlowers();
      createRainEffect();
      createButterflies();
      createBirds();
      break;
    case 'summer':
      createSun();
      createBirds();
      break;
  }
}

// Fall: Falling leaves in batches with GSAP
function createFallingLeaves() {
  const createBatch = () => {
    const batchSize = 8 + Math.floor(Math.random() * 7);
    for (let i = 0; i < batchSize; i++) {
      setTimeout(() => {
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        const startX = Math.random() * 100;
        leaf.style.left = startX + '%';
        particlesContainer.appendChild(leaf);
        
        // GSAP animation
        gsap.to(leaf, {
          y: window.innerHeight + 50,
          x: (Math.random() - 0.5) * 200,
          rotation: 360 * (Math.random() > 0.5 ? 1 : -1),
          duration: 5 + Math.random() * 3,
          ease: 'none',
          onComplete: () => leaf.remove()
        });
      }, i * 150);
    }
  };
  
  createBatch();
  particleInterval = setInterval(createBatch, 3000);
}

// Winter: Heavy snowfall with GSAP
function createSnowfall() {
  const createSnowflake = () => {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    const startX = Math.random() * 100;
    snowflake.style.left = startX + '%';
    particlesContainer.appendChild(snowflake);
    
    gsap.to(snowflake, {
      y: window.innerHeight + 20,
      x: '+=' + (Math.random() - 0.5) * 100,
      rotation: 360,
      duration: 8 + Math.random() * 4,
      ease: 'none',
      onComplete: () => snowflake.remove()
    });
  };
  
  particleInterval = setInterval(createSnowflake, 200);
}

// Heavy snow effect for winter
function createHeavySnow() {
  weatherInterval = setInterval(() => {
    for (let i = 0; i < 5; i++) {
      const snow = document.createElement('div');
      snow.className = 'heavy-rain';
      snow.style.left = Math.random() * 100 + '%';
      snow.style.background = 'linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0))';
      snow.style.width = '3px';
      particlesContainer.appendChild(snow);
      
      setTimeout(() => snow.remove(), 2000);
    }
  }, 400);
}

// Spring: Flowers with GSAP grow animation
function createBloomingFlowers() {
  const createFlower = () => {
    const flower = document.createElement('div');
    flower.className = 'flower';
    flower.style.left = Math.random() * 100 + '%';
    flower.style.bottom = Math.random() * 40 + '%';
    particlesContainer.appendChild(flower);
    
    gsap.fromTo(flower, 
      { scale: 0, opacity: 0, y: 100 },
      { 
        scale: 1, 
        opacity: 0.8, 
        y: 0,
        duration: 2,
        ease: 'elastic.out(1, 0.5)'
      }
    );
  };
  
  // Initial burst
  for (let i = 0; i < 25; i++) {
    setTimeout(createFlower, i * 150);
  }
  
  particleInterval = setInterval(createFlower, 2000);
}

// Rain effect for spring
function createRainEffect() {
  weatherInterval = setInterval(() => {
    for (let i = 0; i < 10; i++) {
      const rain = document.createElement('div');
      rain.className = 'heavy-rain';
      rain.style.left = Math.random() * 100 + '%';
      particlesContainer.appendChild(rain);
      
      setTimeout(() => rain.remove(), 1500);
    }
    
    // Occasional lightning
    if (Math.random() < 0.1) {
      createLightning();
    }
  }, 300);
}

// Lightning flash
function createLightning() {
  const flash = document.createElement('div');
  flash.className = 'lightning';
  document.body.appendChild(flash);
  
  gsap.to(flash, {
    opacity: 1,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    onComplete: () => flash.remove()
  });
}

// Butterflies for spring
function createButterflies() {
  const createButterfly = () => {
    const butterfly = document.createElement('div');
    butterfly.className = 'butterfly';
    const startY = 20 + Math.random() * 60;
    butterfly.style.top = startY + '%';
    butterfly.style.left = '-30px';
    birdsContainer.appendChild(butterfly);
    
    gsap.to(butterfly, {
      x: window.innerWidth + 60,
      y: '+=' + (Math.random() - 0.5) * 200,
      opacity: 0.8,
      duration: 12 + Math.random() * 8,
      ease: 'sine.inOut',
      onComplete: () => butterfly.remove()
    });
  };
  
  setInterval(createButterfly, 5000);
}

// Summer: Animated sun with GSAP
function createSun() {
  sunElement = document.createElement('div');
  sunElement.id = 'sun';
  document.body.appendChild(sunElement);
  
  // Pulse animation
  gsap.to(sunElement, {
    scale: 1.1,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
  
  // Position animation on scroll
  const updateSunPosition = () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = 1 - (scrollTop / scrollHeight); // Inverted
    const monthIndex = Math.min(Math.floor(scrollProgress * 15), 14);
    
    if (monthIndex >= 8 && monthIndex <= 10) {
      const sunProgress = (monthIndex - 8) / 2;
      gsap.to(sunElement, {
        left: 20 + (sunProgress * 60) + '%',
        top: 15 - (Math.sin(sunProgress * Math.PI) * 5) + '%',
        opacity: 1,
        duration: 1
      });
    } else {
      gsap.to(sunElement, { opacity: 0, duration: 1 });
    }
  };
  
  window.addEventListener('scroll', updateSunPosition);
  updateSunPosition();
}

// Wind effect
function createWindEffect(strong = false) {
  setInterval(() => {
    const windLine = document.createElement('div');
    windLine.className = 'wind-line';
    windLine.style.top = Math.random() * 100 + '%';
    windLine.style.left = '-100px';
    windLine.style.width = (100 + Math.random() * 100) + 'px';
    windLines.appendChild(windLine);
    
    gsap.to(windLine, {
      x: window.innerWidth + 200,
      opacity: strong ? 0.8 : 0.4,
      duration: strong ? 1 : 2,
      ease: 'power1.out',
      onComplete: () => windLine.remove()
    });
    
    // Wind affects elevator
    if (strong && Math.random() < 0.3) {
      gsap.to(elevator, {
        x: (Math.random() - 0.5) * 4,
        duration: 0.1,
        yoyo: true,
        repeat: 3
      });
    }
  }, strong ? 500 : 1500);
}

// Birds flying
function createBirds() {
  const createBird = () => {
    const bird = document.createElement('div');
    bird.className = 'bird';
    const startY = 10 + Math.random() * 40;
    bird.style.top = startY + '%';
    bird.style.left = '-50px';
    birdsContainer.appendChild(bird);
    
    gsap.to(bird, {
      x: window.innerWidth + 100,
      y: '+=' + (Math.random() - 0.5) * 150,
      opacity: 0.7,
      duration: 15 + Math.random() * 10,
      ease: 'none',
      onComplete: () => bird.remove()
    });
  };
  
  setInterval(createBird, 8000);
  createBird(); // Initial bird
}

// Clouds
function createClouds() {
  for (let i = 0; i < 5; i++) {
    const cloud = document.createElement('div');
    cloud.className = 'cloud';
    cloud.style.top = 10 + Math.random() * 40 + '%';
    cloud.style.left = Math.random() * 100 + '%';
    cloudsContainer.appendChild(cloud);
    
    gsap.to(cloud, {
      x: window.innerWidth + 200,
      opacity: 0.6,
      duration: 60 + Math.random() * 40,
      repeat: -1,
      ease: 'none'
    });
  }
}

// Handle continuous weather based on season
function handleContinuousEffects(season, monthIndex, scrollProgress) {
  // Adjust cloud opacity based on season
  const clouds = cloudsContainer.querySelectorAll('.cloud');
  clouds.forEach(cloud => {
    let targetOpacity = 0.4;
    if (season === 'winter') targetOpacity = 0.7;
    if (season === 'spring') targetOpacity = 0.6;
    if (season === 'summer') targetOpacity = 0.3;
    
    gsap.to(cloud, { opacity: targetOpacity, duration: 2 });
  });
}

// Initial setup
window.dispatchEvent(new Event('scroll'));