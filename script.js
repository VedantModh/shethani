// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Initial loader animation
document.addEventListener('DOMContentLoaded', function() {
  const loaderContainer = document.querySelector('.loader-container');
  const mainContent = document.getElementById('main');
  
  // Set up main content for animation
  mainContent.style.display = 'block';
  
  // Check if video is loaded and play it
  const loaderVideo = document.querySelector('.video-loader video');
  
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

// Existing scroll animation
var tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#section-1",
    start: "0% ",
    end: "50%",
    scrub: true,
  },
});

tl.to("#image-sec", {
  top: "85%",
  left: "-30%",
  rotate: "17deg",
  scale: "0.8",
});

// Mousemove Parallax Effect for Shethani Bottle
document.addEventListener("mousemove", (e) => {
  const images = document.querySelectorAll("#image-sec img, #left img, #right img"); // select ALL images
  const { clientX, clientY } = e;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // Calculate offset
  const moveX = (clientX - centerX) * 0.02;
  const moveY = (clientY - centerY) * 0.02;

  // Apply transform to every image
  images.forEach((img) => {
    gsap.to(img, {
      x: -moveX,
      y: -moveY,
      duration: 0.5,
      ease: "power2.out",
    });
  });
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

// Create section-part2 trigger after loader to avoid missing onEnter
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

