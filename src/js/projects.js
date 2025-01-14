import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll(".project");

  const initScrollAnimations = () => {
    if (window.innerWidth >= 1248) {
      cards.forEach((card, index, cards) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 120px",
            end: () => index + 1 === cards.length ? "top 25%" : "bottom 120px",
            scrub: 0.4,
            pin: ".projects-wrapper",
            pinSpacing: false
          },
          scale: 1 - 0.03 * (cards.length - index - 1),
          marginBottom: -(card.offsetHeight - 16) // 16 - размер "чёлки" карточки сзади
        });
      });
    } else {
      return false
    }
  };

  initScrollAnimations();

  window.addEventListener('resize', () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    initScrollAnimations();
  });
});