// Header shadow on scroll
const header = document.querySelector(".header");
const onScroll = () => {
  header.classList.toggle("scrolled", window.scrollY > 10);
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Reveal on scroll
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!reduceMotion && "IntersectionObserver" in window) {
  const targets = document.querySelectorAll(
    ".section-heading, .fact, .cards .card, .contact-grid .card, .tutor-card, .steps > div, .cta, details, .notice"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("visible");
        observer.unobserve(el);
        setTimeout(() => {
          el.classList.remove("reveal", "visible");
          el.style.removeProperty("--d");
        }, 1200);
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => {
    const index = Array.from(el.parentElement.children).indexOf(el);
    el.style.setProperty("--d", Math.min(index, 4) * 0.1 + "s");
    el.classList.add("reveal");
    observer.observe(el);
  });
}