const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("[data-nav-links]");
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

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get("name") || "Customer";
    const phone = formData.get("phone") || "";
    const location = formData.get("location") || "";
    const plan = formData.get("package") || "";
    const message = formData.get("message") || "";
    const body = [
      `New Neema Fiber request from ${name}`,
      `Phone: ${phone}`,
      `Location: ${location}`,
      `Package: ${plan}`,
      `Message: ${message}`
    ].join("\n");

    window.location.href = `mailto:info@neemafiber.co.ke?subject=New%20Connection%20Request&body=${encodeURIComponent(body)}`;
  });
}
