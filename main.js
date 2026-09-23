// ==========================================
// main.js - Shared functionality for all pages
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

  // 1. Mobile Menu
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
    
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
      });
    });
  }

  // 2. Scroll Reveal Animation
  const revealElements = document.querySelectorAll(".reveal");
  
  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < windowHeight - 80) {
        el.classList.add("active");
      }
    });
  }
  
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Trigger on load

  // 3. Custom Cursor
  const cursor = document.querySelector(".custom-cursor");
  const cursorFollower = document.querySelector(".custom-cursor-follower");
  
  if (cursor && cursorFollower && window.matchMedia("(pointer: fine)").matches) {
    // Only enable custom cursor on non-touch devices
    document.body.classList.add("has-custom-cursor");
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Update main dot immediately
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });
    
    // Smooth follower animation
    function animateFollower() {
      // Ease follower position
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      
      cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
      requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Hover effects for links and buttons using event delegation
    document.addEventListener("mouseover", (e) => {
      if (
        e.target.closest("a") || 
        e.target.closest("button") || 
        e.target.closest(".feature-card") || 
        e.target.closest(".service-card") || 
        e.target.closest(".project-card") || 
        e.target.closest(".team-value-card") ||
        e.target.closest(".team-page-card") ||
        e.target.closest(".client-box") ||
        e.target.closest("input") ||
        e.target.closest("textarea")
      ) {
        cursorFollower.classList.add("hover");
      }
    });

    document.addEventListener("mouseout", (e) => {
      if (
        e.target.closest("a") || 
        e.target.closest("button") || 
        e.target.closest(".feature-card") || 
        e.target.closest(".service-card") || 
        e.target.closest(".project-card") || 
        e.target.closest(".team-value-card") ||
        e.target.closest(".team-page-card") ||
        e.target.closest(".client-box") ||
        e.target.closest("input") ||
        e.target.closest("textarea")
      ) {
        cursorFollower.classList.remove("hover");
      }
    });
  }

  // 4. Parallax Scrolling Effects
  const heroSection = document.querySelector(".hero");
  const pageHeroGlows = document.querySelectorAll(".page-hero-glow, .hero::before, .hero::after");
  
  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;
    
    // Subtle background shift for home hero
    if (heroSection) {
      heroSection.style.backgroundPositionY = `${scrollY * 0.4}px`;
    }
    
    // Float glowing orbs
    pageHeroGlows.forEach(glow => {
      // Create a slight parallax offset
      glow.style.transform = `translateY(${scrollY * 0.25}px)`;
    });
  });

  // 5. Page Transitions
  // Add enter animation class on load
  document.body.classList.add("page-enter");
  
  const links = document.querySelectorAll('a[href]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetUrl = this.getAttribute('href');
      
      // Skip transition for hash links (anchor links on same page), external links, or target="_blank"
      if (
        targetUrl.startsWith('#') || 
        targetUrl.startsWith('http') || 
        targetUrl.startsWith('mailto') ||
        this.getAttribute('target') === '_blank' ||
        targetUrl === window.location.pathname.split('/').pop() // Same page link
      ) {
        return;
      }
      
      e.preventDefault();
      
      // Add leave animation class
      document.body.classList.add('page-leave');
      document.body.classList.remove('page-enter');
      
      // Navigate after animation completes (match CSS duration)
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 400); // 400ms matches the CSS animation
    });
  });

});
