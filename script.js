document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector("[data-nav-links]");
  const bar = document.querySelector(".bar__row");
  const packageCategory = document.querySelector(".package-category");
  const business = document.querySelector(".package-category--business");
  const coverageSelect = document.querySelector("[data-coverage-select]");
  const mapFrame = document.querySelector("[data-map-frame]");
  const mapLink = document.querySelector("[data-map-link]");
  const contactForm = document.querySelector(".contact-form");
  const heroVideo = document.querySelector(".hero__video-player");

  // Keep the header transparent without placing any overlay over links.
  const style = document.createElement("style");
  style.textContent = `
    .site-header{background:transparent!important;box-shadow:none!important}
    .site-header,.site-header *,.bar,.bar *,.nav-links a,.btn,a,button{pointer-events:auto}
    .site-header{z-index:1000}
    .bar{position:relative;z-index:10}
    .bar__row a{display:flex;align-items:center;justify-content:center;cursor:pointer;color:#888;text-decoration:none}
    .bar__row a:before{content:"◆";color:var(--red);font-size:8px;margin-right:8px}
    .bar__row a:hover{color:var(--red)}
    #home-packages,#business-packages,#student-package,#community-package,#coverage{scroll-margin-top:115px}
    #home-packages .packages-grid{display:flex!important;flex-wrap:nowrap!important;overflow-x:auto;gap:18px;padding:8px 4px 18px;-webkit-overflow-scrolling:touch}
    #home-packages .price-card{flex:0 0 270px;min-width:270px}
    @media(max-width:700px){#home-packages .price-card{flex-basis:255px;min-width:255px}.bar__row{overflow-x:auto;flex-wrap:nowrap;justify-content:flex-start}.bar__row a{flex:0 0 auto}}
  `;
  document.head.appendChild(style);

  if (packageCategory) packageCategory.id = "home-packages";
  if (business) business.id = "business-packages";

  // Make the category strip real HTML links. No click interception: browser handles anchors natively.
  if (bar) {
    const targets = [
      ["Homes", "#home-packages"],
      ["Businesses", "#business-packages"],
      ["Students", "#student-package"],
      ["Communities", "#community-package"],
      ["Coverage checks", "#coverage"]
    ];
    [...bar.children].forEach((item, index) => {
      const target = targets[index];
      if (!target) return;
      if (item.tagName === "A") {
        item.href = target[1];
        item.textContent = target[0];
        return;
      }
      const link = document.createElement("a");
      link.href = target[1];
      link.textContent = target[0];
      link.setAttribute("aria-label", `Go to ${target[0]}`);
      item.replaceWith(link);
    });
  }

  // Restore the complete home package strip.
  const homeGrid = packageCategory?.querySelector(".packages-grid");
  if (homeGrid) {
    const plans = [
      ["7 Mbps", "KSh 1,000", "Good for browsing and lighter daily use."],
      ["10 Mbps", "KSh 1,500", "A balanced package for everyday homes."],
      ["15 Mbps", "KSh 1,800", "For multiple devices and family use."],
      ["20 Mbps", "KSh 2,000", "Great for busy families and streaming."],
      ["25 Mbps", "KSh 2,500", "Reliable home entertainment and work."],
      ["30 Mbps", "KSh 3,000", "For heavy home usage and many devices."],
      ["40 Mbps", "KSh 4,000", "Best for busy households and heavier demand."]
    ];
    const cards = [...homeGrid.querySelectorAll(".price-card")];
    plans.forEach((plan, i) => {
      let card = cards[i];
      if (!card) {
        card = document.createElement("article");
        card.className = "price-card";
        homeGrid.appendChild(card);
      }
      card.innerHTML = `<h3>${plan[0]}</h3><strong>${plan[1]} <span>/ month</span></strong><p>${plan[2]}</p>`;
      card.classList.toggle("price-card--featured", i === 3);
      if (i === 3) card.insertAdjacentHTML("afterbegin", '<div class="popular-tag">Most popular</div>');
    });
    cards.slice(plans.length).forEach(card => card.remove());
  }

  // Add student and community sections only if they are not already in the page.
  if (!document.getElementById("student-package") && packageCategory) {
    const student = document.createElement("section");
    student.id = "student-package";
    student.className = "extra-package-section";
    student.innerHTML = `<span class="eyebrow">Student Connectivity</span><h3>Student Package</h3><p>Affordable unlimited internet for students to study, attend online classes, research, submit assignments and stay connected.</p><div class="student-package-card"><div><span class="eyebrow">Student Home Plan</span><strong>10 Mbps</strong><strong>KSh 600 <small>/ month</small></strong><ul><li>Unlimited home internet</li><li>Designed for learning and study</li><li>Coverage confirmation applies</li></ul><a class="btn btn--solid" href="#contact">Request Student Package</a></div><div><span class="eyebrow">Built For Learning</span><h3>Stay connected to opportunity.</h3><p>Reliable access for classes, research, assignments, applications, communication and online resources.</p></div></div>`;
    packageCategory.parentElement.insertBefore(student, business || null);
  }

  if (!document.getElementById("community-package") && packageCategory) {
    const community = document.createElement("section");
    community.id = "community-package";
    community.className = "extra-package-section";
    community.innerHTML = `<span class="eyebrow">Serving The Community</span><h3>Community Connect — Accessible Connectivity</h3><p>NIS supports customers with disabilities with affordable home internet for communication, study, work and daily access.</p><div class="community-access-card"><img src="assets/images/community-accessible-new.jpg" alt="Customer using a laptop while seated in a wheelchair"><div><span class="eyebrow">Customers With Disabilities</span><strong>10 Mbps — KSh 600 / month</strong><p>Unlimited home internet for eligible customers with disabilities. Coverage confirmation applies before installation.</p><a class="btn btn--solid" href="#contact">Request Community Package</a></div></div>`;
    packageCategory.parentElement.insertBefore(community, business || null);
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    navLinks.addEventListener("click", e => {
      if (e.target.closest("a")) {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.play().catch(() => {});
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
    contactForm.addEventListener("submit", e => {
      e.preventDefault();
      const data = new FormData(contactForm);
      const body = [
        `Name: ${data.get("name") || ""}`,
        `Phone: ${data.get("phone") || ""}`,
        `Location: ${data.get("location") || ""}`,
        `Package: ${data.get("package") || ""}`,
        `Message: ${data.get("message") || ""}`
      ].join("\n");
      window.location.href = `mailto:info@neemainternet.co.ke?subject=New%20Connection%20Request&body=${encodeURIComponent(body)}`;
    });
  }
});
