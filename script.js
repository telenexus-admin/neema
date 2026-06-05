const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("[data-nav-links]");
const contactForm = document.querySelector(".contact-form");
const coverageSelect = document.querySelector("[data-coverage-select]");
const mapFrame = document.querySelector("[data-map-frame]");
const mapLink = document.querySelector("[data-map-link]");
const siteChat = document.querySelector("[data-site-chat]");
const siteChatOpen = document.querySelector("[data-site-chat-open]");
const siteChatClose = document.querySelector("[data-site-chat-close]");
const siteChatForm = document.querySelector("[data-site-chat-form]");
const siteChatInput = document.querySelector("[data-site-chat-input]");
const siteChatMessages = document.querySelector("[data-site-chat-messages]");
const siteChatApi = "https://nexa.telenexustechnologies.com/api/public/site-chat/4/message";

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

    window.location.href = `mailto:info@neemainternet.co.ke?subject=New%20Connection%20Request&body=${encodeURIComponent(body)}`;
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

function siteChatSessionId() {
  const key = "neemaSiteChatSession";
  let session = localStorage.getItem(key);
  if (!session) {
    session = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(key, session);
  }
  return session;
}

function addSiteChatMessage(text, type = "agent") {
  if (!siteChatMessages) return null;
  const bubble = document.createElement("div");
  bubble.className = `site-chat__message site-chat__message--${type}`;
  bubble.textContent = text;
  siteChatMessages.append(bubble);
  siteChatMessages.scrollTop = siteChatMessages.scrollHeight;
  return bubble;
}

if (siteChat && siteChatOpen && siteChatClose) {
  siteChatOpen.addEventListener("click", () => {
    siteChat.hidden = false;
    siteChatInput?.focus();
  });

  siteChatClose.addEventListener("click", () => {
    siteChat.hidden = true;
  });
}

if (siteChatForm && siteChatInput) {
  siteChatForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = siteChatInput.value.trim();
    if (!message) return;
    addSiteChatMessage(message, "user");
    siteChatInput.value = "";
    siteChatInput.disabled = true;
    const submitButton = siteChatForm.querySelector("button");
    if (submitButton) submitButton.disabled = true;
    const typing = addSiteChatMessage("Typing...", "agent");

    try {
      const response = await fetch(siteChatApi, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          session_id: siteChatSessionId(),
          message,
          name: "Neema website visitor"
        })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error ? `${response.status}: ${data.error}` : `${response.status}: Support is unavailable right now.`);
      if (typing) typing.remove();
      addSiteChatMessage(data.reply || "I am here. How can I help?", "agent");
    } catch (error) {
      if (typing) typing.remove();
      addSiteChatMessage(`I could not connect to live AI support right now (${error.message || "network error"}). Please try again, WhatsApp us, or call 0727 841 778.`, "error");
    } finally {
      siteChatInput.disabled = false;
      if (submitButton) submitButton.disabled = false;
      siteChatInput.focus();
    }
  });
}
