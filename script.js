const heroVideo = document.querySelector(".hero__video-player"); if (heroVideo) { heroVideo.muted = true; const startHeroVideo = () => heroVideo.play().catch(() => {}); if (heroVideo.readyState >= 2) startHeroVideo(); else heroVideo.addEventListener("canplay", startHeroVideo, { once: true }); }
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("[data-nav-links]");
const coverageSelect = document.querySelector("[data-coverage-select]");
const mapFrame = document.querySelector("[data-map-frame]");
const mapLink = document.querySelector("[data-map-link]");
const contactForm = document.querySelector(".contact-form");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (coverageSelect && mapFrame && mapLink) {
  const updateMap = () => {
    const query = encodeURIComponent(coverageSelect.value);
    mapFrame.src = `https://www.google.com/maps?q=${query}&output=embed`;
    mapLink.href = `https://www.google.com/maps/search/?api=1&query=${query}`;
  };
  coverageSelect.addEventListener("change", updateMap);
  updateMap();
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const body = [
      `Name: ${formData.get("name") || ""}`,
      `Phone: ${formData.get("phone") || ""}`,
      `Location: ${formData.get("location") || ""}`,
      `Package: ${formData.get("package") || ""}`,
      `Message: ${formData.get("message") || ""}`
    ].join("\n");
    window.location.href = `mailto:info@neemainternet.co.ke?subject=New%20Connection%20Request&body=${encodeURIComponent(body)}`;
  });
}

