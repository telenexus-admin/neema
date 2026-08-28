const heroVideo = document.querySelector(".hero__video-player");
if (heroVideo) { heroVideo.muted = true; const startHeroVideo = () => heroVideo.play().catch(() => {}); if (heroVideo.readyState >= 2) startHeroVideo(); else heroVideo.addEventListener("canplay", startHeroVideo, { once: true }); }

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("[data-nav-links]");
const coverageSelect = document.querySelector("[data-coverage-select]");
const mapFrame = document.querySelector("[data-map-frame]");
const mapLink = document.querySelector("[data-map-link]");
const contactForm = document.querySelector(".contact-form");

const enhancementStyle = document.createElement("style");
enhancementStyle.textContent = `
.bar__row a{display:flex;align-items:center;justify-content:center;color:#888;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.08em;transition:color .2s,transform .2s;cursor:pointer;text-decoration:none}
.bar__row a:before{content:"◆";color:var(--red);font-size:8px;margin-right:8px}
.bar__row a:hover,.bar__row a:focus{color:var(--red);transform:translateY(-1px)}
#home-packages,#business-packages,#community-package,#coverage{scroll-margin-top:115px}
@media(max-width:700px){.bar__row{display:flex;flex-wrap:nowrap;overflow-x:auto;justify-content:flex-start;padding-bottom:4px;-webkit-overflow-scrolling:touch}.bar__row a{flex:0 0 auto}}
`;
document.head.appendChild(enhancementStyle);

const bar = document.querySelector(".bar__row");
const packageCategory = document.querySelector(".package-category");
const business = document.querySelector(".package-category--business");

if (packageCategory) packageCategory.id = "home-packages";
if (business) business.id = "business-packages";

if (bar) {
  const targets = {
    homes: "#home-packages",
    businesses: "#business-packages",
    students: "#community-package",
    communities: "#community-package",
    "coverage checks": "#coverage"
  };

  [...bar.querySelectorAll(":scope > span")].forEach((span) => {
    const label = span.textContent.trim().toLowerCase();
    const href = targets[label];
    if (!href) return;
    const link = document.createElement("a");
    link.href = href;
    link.textContent = span.textContent.trim();
    link.setAttribute("aria-label", `Go to ${span.textContent.trim()}`);
    span.replaceWith(link);
  });

  bar.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link || !bar.contains(link)) return;
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    history.replaceState(null, "", link.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

if (packageCategory) {
  const homeGrid = packageCategory.querySelector(".packages-grid");
  if (homeGrid) {
    homeGrid.style.display = "flex";
    homeGrid.style.flexWrap = "nowrap";
    homeGrid.style.overflowX = "auto";
    homeGrid.style.overflowY = "hidden";
    homeGrid.style.gap = "18px";
    homeGrid.style.webkitOverflowScrolling = "touch";
    [...homeGrid.querySelectorAll(".price-card")].forEach(card => {
      card.style.flex = "0 0 270px";
      card.style.minWidth = "270px";
    });
  }
}

const community = document.querySelector(".package-category--business")?.parentElement?.querySelector("#community-package");
if (!document.querySelector("#community-package") && packageCategory) {
  const section = document.createElement("div");
  section.id = "community-package";
  section.style.scrollMarginTop = "115px";
  section.style.position = "relative";
  section.style.top = "0";
  packageCategory.parentElement.insertBefore(section, business || null);
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
  navLinks.addEventListener("click", event => {
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
  contactForm.addEventListener("submit", event => {
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
