// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Responsive container positioning
function handleResponsiveContainer() {
  const leftSection = document.querySelector('#left-section');
  const rightSection = document.querySelector('#right-section');
  const sectionPart2 = document.querySelector('#section-part2');
  
  if (!leftSection || !rightSection || !sectionPart2) return;
  
  const windowWidth = window.innerWidth;
  
  // Reset any inline styles first
  leftSection.style.position = '';
  leftSection.style.top = '';
  leftSection.style.left = '';
  leftSection.style.transform = '';
  
  if (windowWidth <= 768) {
    // Mobile: Stack vertically, center content
    sectionPart2.style.flexDirection = 'column';
    sectionPart2.style.alignItems = 'center';
    sectionPart2.style.gap = '30px';
    
    leftSection.style.width = '100%';
    leftSection.style.display = 'flex';
    leftSection.style.flexDirection = 'column';
    leftSection.style.alignItems = 'center';
    leftSection.style.gap = '20px';
    
    rightSection.style.width = '100%';
    rightSection.style.textAlign = 'center';
    rightSection.style.paddingLeft = '0';
  } else {
    // Desktop: Side by side layout
    sectionPart2.style.flexDirection = 'row';
    sectionPart2.style.alignItems = 'center';
    sectionPart2.style.gap = '0';
    
    leftSection.style.width = '50%';
    leftSection.style.display = 'flex';
    leftSection.style.flexDirection = 'row';
    leftSection.style.alignItems = 'center';
    leftSection.style.justifyContent = 'center';
    leftSection.style.marginBottom = '100px';
    
    rightSection.style.width = '50%';
    rightSection.style.textAlign = 'start';
    rightSection.style.paddingLeft = '100px';
  }
}

// Handle responsive image positioning within left-section
function handleResponsiveImages() {
  const leftSection = document.querySelector('#left-section');
  const leftImages = document.querySelectorAll('#left-section img');
  
  if (!leftSection || !leftImages.length) return;
  
  const windowWidth = window.innerWidth;
  
  if (windowWidth <= 768) {
    // Mobile: Stack images vertically and center them
    leftImages.forEach((img, index) => {
      img.style.position = 'relative';
      img.style.top = '0';
      // img.style.left = '0';
      img.style.transform = 'none';
      img.style.zIndex = 'auto';
      
      if (index === 0) {
        img.style.width = '100%';
        img.style.maxWidth = '400px';
        img.style.height = 'auto';
      } else {
        img.style.width = '120px';
        img.style.height = '120px';
        img.style.top = '-100px';
        img.style.left = '50px';
      }
    });
  } else {
    // Desktop: Original positioning
    if (leftImages[0]) {
      leftImages[0].style.width = '500px';
      leftImages[0].style.height = '300px';
      leftImages[0].style.position = 'absolute';
      leftImages[0].style.top = '30%';
      leftImages[0].style.zIndex = '1';
    }
    
    if (leftImages[1]) {
      leftImages[1].style.width = '150px';
      leftImages[1].style.height = '150px';
      leftImages[1].style.position = 'relative';
      leftImages[1].style.top = '40%';
      leftImages[1].style.left = '20%';
      leftImages[1].style.zIndex = '909';
    }
  }
}

// Call on load and resize
window.addEventListener('load', () => {
  handleResponsiveContainer();
  handleResponsiveImages();
});
window.addEventListener('resize', () => {
  handleResponsiveContainer();
  handleResponsiveImages();
});

// Initial loader animation
document.addEventListener('DOMContentLoaded', function() {
  const loaderContainer = document.querySelector('.loader-container');
  const mainContent = document.getElementById('main');
  const loaderVideo = document.querySelector('.video-loader video');
  
  // Ensure loader scales correctly on orientation change and resize
  function resizeLoader() {
    if (!loaderContainer) return;
    // Use dynamic viewport units on supported browsers
    loaderContainer.style.height = `${Math.max(window.innerHeight, document.documentElement.clientHeight)}px`;
  }
  resizeLoader();
  window.addEventListener('resize', resizeLoader);
  window.addEventListener('orientationchange', resizeLoader);
  
  // Set up main content for animation
  mainContent.style.display = 'block';
  
  // Check if video is loaded and play it
  
  // Function to handle video end
  function handleVideoEnd() {
    // Fade out loader immediately
    loaderContainer.style.opacity = '0';
    loaderContainer.style.transition = 'opacity 0s ease-out';
    
    // Show main content with animation immediately
    mainContent.classList.add('show');
    
    // Start animations immediately
    if (typeof startAnimations === 'function') {
      startAnimations();
    }
    // Initialize scroll-triggered animations for in-view effects
    if (typeof initScrollAnimations === 'function') {
      initScrollAnimations();
    }
    // Initialize section-part2 timeline after hero image appears logic
    if (typeof initSectionPart2Trigger === 'function') {
      initSectionPart2Trigger();
    }
    
    // Ensure responsive container positioning
    handleResponsiveContainer();
    handleResponsiveImages();
    
    // Remove loader from DOM after transition
    setTimeout(() => {
      loaderContainer.style.display = 'none';
      // Ensure ScrollTrigger recalculates after layout changes
      if (window.ScrollTrigger && typeof ScrollTrigger.refresh === 'function') {
        ScrollTrigger.refresh();
      }
      // Add scroll event listener
      if (typeof handleScrollBasedLoader === 'function') {
        window.addEventListener('scroll', handleScrollBasedLoader);
      }
    }, 700);
  }
  
  // If video exists, add event listener for when it ends
  if (loaderVideo) {
    loaderVideo.addEventListener('ended', handleVideoEnd);
    
    // Fallback in case video doesn't trigger ended event
    setTimeout(handleVideoEnd, 3000);
  } else {
    // If no video, use timeout
    setTimeout(handleVideoEnd, 1000);
  }
});


// Logo animation function
function startAnimations() {
  // Create a master timeline for section-1 animations
  const masterTimeline = gsap.timeline({
    defaults: {
      ease: "power3.out",
      duration: 0.5,
    },
  });
  
  // Create a separate timeline for section-2 animations
  const section2Timeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#section-2",
      start: "top 20%",
      end: "top 10%",
      toggleActions: "play none none none"
    },
    defaults: {
      ease: "power3.out",
      duration: 0.8,
      stagger: 0.1
    }
  });

  // Section 2 animations
  section2Timeline.from(".section2-header h1, .section2-header h2", {
    y: 50,
    opacity: 0,
    stagger: 0.2
  })
  .from(".card", {
    y: 50,
    opacity: 0,
    stagger: 0.15
  });

  // Header logo animation
  masterTimeline.from("#header img", {
    y: -50,
    opacity: 0,
    duration: 0.5,
  });

  // Hero section text animation - one by one with slow speed
  masterTimeline.from(
    "#hero-section h1:nth-child(1)",
    {
      y: 100,
      opacity: 0,
      duration: 0.5,
    },
    "+=0.1"
  );

  masterTimeline.from(
    "#hero-section h1:nth-child(2)",
    {
      y: 100,
      opacity: 0,
      duration: 0.5,
    },
    "+=0.1"
  );

  masterTimeline.from(
    "#hero-section h1:nth-child(3)",
    {
      y: 100,
      opacity: 0,
      duration: 0.5,
    },
    "+=0.1"
  );

  masterTimeline.from(
    "#hero-section h1:nth-child(4)",
    {
      y: 100,
      opacity: 0,
      duration: 0.5,
    },
    "+=0.1"
  );

  // Left and right images animation
  masterTimeline.from(
    "#left",
    {
      x: 100,
      opacity: 0,
      duration: 1.1,
    },
    "anim"
  );

  masterTimeline.from(
    "#right",
    {
      x: -100,
      opacity: 0,
      duration: 1.1,
    },
    "anim"
  );

  // Image section animation
  masterTimeline.from(
    "#image-sec",
    {
      y: 100,
      opacity: 0,
      duration: 0.5,
    },
    "anim"
  );

}

// =============================
// Responsive Scroll Animation
// =============================
// Customize per breakpoint here (max-width). Adjust values to your liking.
const responsiveAnimationConfig = {
  default: { top: "88%", left: "-30%", rotate: "17deg", scale: 0.8 },
  992:     { top: "75%", left: "-26%", rotate: "17deg", scale: 0.82 },
  768:     { top: "58%", left: "0%", rotate: "17deg", scale: 0.85,zIndex:10000000, },
  600:     { top: "55%", left: "-7%", rotate: "17deg", scale: 0.9  },
  480:     { top: "64%", left: "-6%",  rotate: "17deg", scale: 0.95 },
};

function getCurrentBreakpoint() {
  if (window.matchMedia('(max-width: 480px)').matches) return 480;
  if (window.matchMedia('(max-width: 600px)').matches) return 600;
  if (window.matchMedia('(max-width: 768px)').matches) return 768;
  if (window.matchMedia('(max-width: 992px)').matches) return 992;
  return 'default';
}

let responsiveTl;
function applyResponsiveScrollAnimation() {
  const bp = getCurrentBreakpoint();
  const cfg = responsiveAnimationConfig[bp] || responsiveAnimationConfig.default;

  if (responsiveTl) {
    responsiveTl.kill();
    responsiveTl = null;
  }

  responsiveTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#section-1",
      start: "top -20%",
      end: "top -50%",
      scrub: true,
    },
    defaults: { ease: 'none' }
  });

  responsiveTl.to("#image-sec", {
    top: cfg.top,
    left: cfg.left,
    rotate: cfg.rotate,
    scale: cfg.scale,
  });

  if (window.ScrollTrigger && typeof ScrollTrigger.refresh === 'function') {
    ScrollTrigger.refresh();
  }
}

// Re-apply on viewport changes
['(max-width: 992px)', '(max-width: 768px)', '(max-width: 600px)', '(max-width: 480px)']
  .forEach(query => matchMedia(query).addEventListener('change', applyResponsiveScrollAnimation));

// Mousemove Parallax Effect for Shethani Bottle (responsive)
document.addEventListener("mousemove", (e) => {
  const images = document.querySelectorAll("#image-sec img, #left img, #right img"); // select ALL images
  const { clientX, clientY } = e;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // Calculate offset with responsive scaling
  const windowWidth = window.innerWidth;
  const parallaxIntensity = windowWidth <= 768 ? 0.01 : 0.02; // Reduce on mobile
  
  const moveX = (clientX - centerX) * parallaxIntensity;
  const moveY = (clientY - centerY) * parallaxIntensity;

  // Apply transform to every image (only on desktop)
  if (windowWidth > 768) {
    images.forEach((img) => {
      gsap.to(img, {
        x: -moveX,
        y: -moveY,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  }
});





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


function startAnimations() {
  const masterTimeline = gsap.timeline({
    defaults: {
      ease: "power3.out",
      duration: 1,
    },
  });

  // 1. Logo animation
  masterTimeline.from("#header img", {
    y: -50,
    opacity: 0,
  });

  // 2. First "Shethani" — zoom in from center
  masterTimeline.fromTo(
    "#hero-section h1:nth-child(1)",
    {
      scale: 100,
      opacity: 0,
      y: 0,
    },
    {
      scale: 1,
      opacity: 1,
      y: 0,
      duration: 0.5,
    }
  );

  // 3. Second "Shethani" — comes below the first
  masterTimeline.fromTo(
    "#hero-section h1:nth-child(2)",
    {
      opacity: 0,
      y: 0,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.002,
    },
    // "+=0.1"
  );

  // 4. Third "Shethani" — comes further down
  masterTimeline.fromTo(
    "#hero-section h1:nth-child(3)",
    {
      opacity: 0,
      y: 0,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.002,      
    },
    // "+=0.1"
  );

  // 5. Fourth "Shethani" — even lower
  masterTimeline.fromTo(
    "#hero-section h1:nth-child(4)",
    {
      opacity: 0,
      y: 0,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.002,
    },
    // "+=0.1"
  );

  // Optional bounce effect
  masterTimeline.to(
    "#hero-section h1",
    {
      scale: 1.05,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
    },
    "+=0.2"
  );

  // --- Your remaining animations go here ---
  masterTimeline.from("#left", { x: 100, opacity: 0, duration: 1.1 }, "anim");
  masterTimeline.from("#right", { x: -100, opacity: 0, duration: 1.1 }, "anim");
  masterTimeline.from("#image-sec", { y: 100, opacity: 0, duration: 0.5 }, "anim");
  masterTimeline.from("#section-part2 #left-section", { x: -50, opacity: 0, duration: 0.5 });
  masterTimeline.from("#section-part2 #right-section h1", { y: 50, opacity: 0, duration: 0.2 });
  masterTimeline.from("#section-part2 #right-section h2", { y: 50, opacity: 0, duration: 0.2 });
  masterTimeline.from("#section-part2 #right-section h3", { y: 50, opacity: 0, duration: 0.2 });


  
}




  // Optional: slight stagger or bounce
  masterTimeline.to(
    "#hero-section h1",
    {
      scale: 1.05,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
    },
    "+=0.2"
  );

  // Continue with rest of your animations
  masterTimeline.from(
    "#left",
    {
      x: 100,
      opacity: 0,
      duration: 1.1,
    },
    "anim"
  );

  masterTimeline.from(
    "#right",
    {
      x: -100,
      opacity: 0,
      duration: 1.1,
    },
    "anim"
  );

  masterTimeline.from(
    "#image-sec",
    {
      y: 100,
      opacity: 0,
      duration: 0.5,
    },
    "anim"
  );

// gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollTrigger);

// Create section-part2 trigger after loader to avoid missing onEnter (responsive)
function initSectionPart2Trigger() {
  const sectionPart2Timeline = gsap.timeline({
    defaults: { immediateRender: false },
    scrollTrigger: {
      // Trigger when the Shethani image inside the container comes near
      trigger: "#image-sec img",
      start: "top 90%", // jab image aye, tab
      toggleActions: "play none none none",
      markers: false,
      once: true,
      anticipatePin: 1,
    }
  });

  // Responsive animation based on screen size
  const windowWidth = window.innerWidth;
  
  if (windowWidth <= 768) {
    // Mobile: Different animation approach
    sectionPart2Timeline.from("#section-part2 #left-section", {
      y: 30,
      opacity: 0,
      duration: 0.5,
    }, "+=0.1");

    sectionPart2Timeline.from("#section-part2 #right-section h1", {
      y: 30,
      opacity: 0,
      duration: 0.3,
    }, "+=0.1");

    sectionPart2Timeline.from("#section-part2 #right-section h2", {
      y: 30,
      opacity: 0,
      duration: 0.3,
    }, "+=0.1");

    sectionPart2Timeline.from("#section-part2 #right-section h3", {
      y: 30,
      opacity: 0,
      duration: 0.3,
    }, "+=0.1");
  } else {
    // Desktop: Original animation
    sectionPart2Timeline.from("#section-part2 #left-section", {
      x: -50,
      opacity: 0,
      duration: 0.5,
    }, "+=0.1");

    sectionPart2Timeline.from("#section-part2 #right-section h1", {
      y: 50,
      opacity: 0,
      duration: 0.2,
    }, "+=0.1");

    sectionPart2Timeline.from("#section-part2 #right-section h2", {
      y: 50,
      opacity: 0,
      duration: 0.2,
    }, "+=0.1");

    sectionPart2Timeline.from("#section-part2 #right-section h3", {
      y: 50,
      opacity: 0,
      duration: 0.2,
    }, "+=0.1");
  }
}





// Scroll-triggered animations that fire when elements come near the viewport
function initScrollAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Section 2 header enters when close (proximity trigger)
  gsap.from([".section2-header h1", ".section2-header h2"], {
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 0.6,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#section-2",
      start: "top 85%", // jab pass aae tab
      toggleActions: "play none none none",
      once: true,
    },
  });

  // Each card animates as it approaches the viewport
  gsap.utils.toArray("#section-2 .section2-cards .card").forEach((card, index) => {
    gsap.from(card, {
      y: 50,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
      delay: (index % 3) * 0.05,
      scrollTrigger: {
        trigger: card,
        start: "top 88%", // near viewport bottom
        toggleActions: "play none none none",
        once: true,
      },
    });
  });

  // Optional: subtle parallax on farm bottle within its card when near
  const farmBottle = document.querySelector("#section-2 .farm-box img");
  if (farmBottle) {
    gsap.fromTo(
      farmBottle,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: farmBottle,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true,
        },
      }
    );
  }
}

