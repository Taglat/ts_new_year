import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

gsap.from("#pinned h3, #pinned p:not(:has(.btn))", {
  scrollTrigger: {
    trigger: "#pinned",
    start: "top top",
    end: "+=100%",
    scrub: true
  },
  y: -30,
  opacity: 0,
  stagger: 0.1
});
