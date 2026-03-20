// Mobile menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Close menu when clicking a nav link on mobile
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

// Scroll reveal animation
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  revealElements.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 80) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Counter animation
const counters = document.querySelectorAll(".counter");
let counterStarted = false;

function runCounters() {
  if (counterStarted) return;

  const aboutSection = document.querySelector(".about-box");
  const sectionTop = aboutSection.getBoundingClientRect().top;

  if (sectionTop < window.innerHeight - 100) {
    counterStarted = true;

    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      let count = 0;
      const speed = Math.max(10, Math.floor(2000 / target));

      const updateCounter = () => {
        if (count < target) {
          count++;
          counter.innerText = count;
          setTimeout(updateCounter, speed);
        } else {
          counter.innerText = target + "+";
        }
      };

      updateCounter();
    });
  }
}

window.addEventListener("scroll", runCounters);
window.addEventListener("load", runCounters);

// Active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

function setActiveLink() {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 130;
    const sectionHeight = section.offsetHeight;

    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navAnchors.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);

// Fake form submit
const form = document.querySelector(".contact-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you! Your message has been sent.");
  form.reset();
});