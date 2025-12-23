import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function initNOV_2025(section, stateManager, index) {
  const text = section.querySelector(".nov-2025-text");

  gsap.set(text, {
    scale: 0.4,
    opacity: 0,
    y: 550
  });


  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 60%",
      end: "top 10%",
      scrub: 0.9,
    }
  });

  tl.to(text, {
    scale: 1,
    opacity: 1,
    y: 0,
    ease: "power1.out"
  });

  const mkContainer = section.querySelector(".nov-2025-mk-container");
  const mkTitle = section.querySelector(".mk-title");
  const subzero = section.querySelector(".mk-subzero");
  const shards = section.querySelector(".mk-title-shards");

  gsap.set(mkTitle, { x: -2200, opacity: 1 });
  gsap.set(subzero, { x: 800, opacity: 1 });
  gsap.set(shards, { opacity: 0 });

  const mkTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: mkContainer,
      start: "top 80%",      // Start when container enters viewport (80% from top) // 
      end: "center 30%",
      // start: "top 70%",      // Start a bit earlier
      // end: "center center",
      scrub: 1,
    }
  });

  mkTimeline.to(mkTitle, {
    x: 0,
    duration: 1,
    ease: "power1.out"
  });

  mkTimeline.to(subzero, {
    x: 0,
    duration: 1,
    ease: "power1.out"
  })

  mkTimeline.to(mkTitle, {
    color: "#00d4ff",
    textShadow: "0 0 20px #00d4ff, 0 0 40px #00d4ff",
    duration: 0.1
  });

  mkTimeline.to(mkTitle, {
    opacity: 0,
    scale: 1.2,
    duration: 0.1
  });

  mkTimeline.to(shards, {
    opacity: 1,
    duration: 0.1
  }, "<");

  mkTimeline.add(() => {
    createShatterEffect(mkTitle, shards);
  }, "<");
}

function createShatterEffect(titleElement, shardsContainer) {
  const text = titleElement.textContent;
  shardsContainer.innerHTML = '';

  const shardCount = 20;
  for (let i = 0; i < shardCount; i++) {
    const shard = document.createElement('div');
    shard.className = 'mk-shard';
    shard.textContent = text.charAt(Math.floor(Math.random() * text.length));
    shardsContainer.appendChild(shard);

    gsap.set(shard, {
      position: 'absolute',
      left: '50%',
      top: '50%',
      color: '#00d4ff',
      fontSize: '2rem',
      fontWeight: 'bold'
    });

    gsap.to(shard, {
      x: gsap.utils.random(-300, 300),
      y: gsap.utils.random(-200, 200),
      rotation: gsap.utils.random(-360, 360),
      opacity: 0,
      duration: 0.9,
      ease: "power1.out"
    });
  }
}

