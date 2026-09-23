// These are now handled in main.js: Mobile menu, Scroll reveal

// Project filter buttons (projects.html only)
const filterBtns = document.querySelectorAll(".proj-filter-btn");
const projectCards = document.querySelectorAll(".project-card[data-status]");

if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach(card => {
        if (filter === "all") {
          card.classList.remove("hidden");
          card.classList.add("reveal");
          card.classList.add("active");
        } else {
          if (card.getAttribute("data-status") === filter) {
            card.classList.remove("hidden");
            card.classList.add("active");
          } else {
            card.classList.add("hidden");
          }
        }
      });
    });
  });
}
