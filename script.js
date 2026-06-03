const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("[data-nav-links]");
const contactForm = document.querySelector(".contact-form");
const coverageSelect = document.querySelector("[data-coverage-select]");
const mapFrame = document.querySelector("[data-map-frame]");
const mapLink = document.querySelector("[data-map-link]");

const coverageLocations = [
  "Kayole",
  "Kayole Corner",
  "Kayole Poster",
  "Kayole 1",
  "Patanisho",
  "Soweto",
  "Stage 17",
  "Muthisha",
  "Jacaranda",
  "Nasra",
  "Sosion",
  "Masimba",
  "Nyama Villa",
  "Kwa DO",
  "Kayole Naivas",
  "Kangundo Road",
  "Umoja Kwa Chief",
  "Umoja Kwa Maji",
  "First Love Church Kayole",
  "Sabasaba Kayole",
  "Rasta Kayole",
  "Kioi Kayole",
  "Stage 20 Kayole",
  "Mugendi Kayole",
  "Kayole Hospital",
  "Tushauriane",
  "Matopeni",
  "Komarock F1",
  "Komarock F2",
  "Komarock F3",
  "K-Mall Komarock",
  "Shujaa Mall",
  "Donholm",
  "Umoja 1",
  "Umoja 2",
  "Umoja 3",
  "Dandora Total",
  "Dandora F1",
  "Dandora F2",
  "Dandora F3",
  "Dandora F4",
  "Dandora Cinema",
  "Kwa Mbao Dandora",
  "Kiamaiko",
  "Dandora Greeni",
  "Dandora BP",
  "Dandora Equity",
  "COCH Dandora",
  "Kariobangi South",
  "Kariobangi North",
  "Ruai Town",
  "Ruai Primary",
  "Ruai Quickmart",
  "Ruai Bypass",
  "Ruai Junction",
  "Ruai Family",
  "Ruai Shelter Villa",
  "Ruai Dune",
  "Ruai Wel Kim",
  "Ruai Seventh Sunday",
  "Ruai Red Gate",
  "Ruai Mimamu"
];

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
      `New NIS connection request from ${name}`,
      `Phone: ${phone}`,
      `Location: ${location}`,
      `Package: ${plan}`,
      `Message: ${message}`
    ].join("\n");

    window.location.href = `mailto:info@neemainternetsolution.co.ke?subject=New%20Connection%20Request&body=${encodeURIComponent(body)}`;
  });
}

const animatedItems = document.querySelectorAll(
  ".section, .stats, .package-card, .rate-card, .principle-card, .coverage-panel, .contact-form"
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  animatedItems.forEach((item, index) => {
    item.classList.add("reveal");
    item.style.setProperty("--reveal-delay", `${Math.min(index * 45, 360)}ms`);
    revealObserver.observe(item);
  });
} else {
  animatedItems.forEach((item) => item.classList.add("is-visible"));
}

if (coverageSelect && mapFrame && mapLink) {
  coverageSelect.replaceChildren();

  coverageLocations.forEach((location) => {
    const option = document.createElement("option");
    option.value = `${location}, Nairobi, Kenya`;
    option.textContent = location;
    coverageSelect.append(option);
  });

  const updateMap = () => {
    const query = encodeURIComponent(coverageSelect.value);
    mapFrame.src = `https://www.google.com/maps?q=${query}&output=embed`;
    mapLink.href = `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  coverageSelect.addEventListener("change", updateMap);
  updateMap();
}
