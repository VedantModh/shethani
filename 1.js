// Kick off the responsive scroll animation once GSAP is ready
window.addEventListener('load', applyResponsiveScrollAnimation);

// =============================
// Section 4 Horizontal Scroll
// =============================
function initSection4HorizontalScroll() {
  const section = document.querySelector('#section-4');
  const track = document.querySelector('#section-4 .hscroll');
  if (!section || !track) return;

  // Total scroll distance equals track width minus viewport width
  const totalScroll = track.scrollWidth - window.innerWidth;

  gsap.to(track, {
    x: () => -totalScroll,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${totalScroll}`,
      scrub: true,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });
}

window.addEventListener('load', () => {
  initSection4HorizontalScroll();
  // Recalculate on resize/rotation
  window.addEventListener('resize', () => ScrollTrigger.refresh());
});