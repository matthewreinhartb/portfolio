// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Typing animation in hero
const typedEl = document.getElementById("typed");
if (typedEl) {
  const roles = [
    "Business Analysis",
    "Business Development",
    "Operations",
    "Technology",
    "turning data into insights",
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    const current = roles[roleIndex];
    if (!deleting) {
      typedEl.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length) {
        deleting = true;
        return setTimeout(typeLoop, 1600);
      }
    } else {
      typedEl.textContent = current.slice(0, --charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 45 : 90);
  }
  typeLoop();
}

// Navbar background on scroll
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 40);
});

// Mobile menu toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  navToggle.classList.toggle("active");
});
// Close menu when a link is clicked
navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("active");
  })
);

// Scrollspy — highlight biru berpindah mengikuti section yang sedang dilihat
const spyLinks = Array.from(navLinks.querySelectorAll("a"));
const spySections = spyLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function setActiveLink(id) {
  spyLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + id);
  });
}

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveLink(entry.target.id);
    });
  },
  // Section dianggap "aktif" saat berada di sepertiga atas layar
  { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
);
spySections.forEach((sec) => spyObserver.observe(sec));

// Scroll reveal animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  observer.observe(el);
});
