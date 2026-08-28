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

    .community-modern{position:relative;overflow:hidden;padding:70px 0 80px;background:linear-gradient(135deg,#f7f8ff 0%,#fff 55%,#eef5ff 100%)}
    .community-modern:before{content:"";position:absolute;width:330px;height:330px;left:-180px;top:-110px;background:linear-gradient(135deg,#6d61df,#3c32c7);border-radius:42% 58% 63% 37% / 46% 36% 64% 54%;transform:rotate(24deg);opacity:.95}
    .community-modern:after{content:"";position:absolute;width:290px;height:290px;right:-150px;bottom:-145px;background:linear-gradient(135deg,#8e86ef,#3e32d0);border-radius:58% 42% 37% 63% / 41% 62% 38% 59%;transform:rotate(18deg);opacity:.95}
    .community-modern__inner{position:relative;z-index:1;display:grid;grid-template-columns:.9fr 1.1fr;align-items:center;gap:75px}
    .community-modern__visual{position:relative;min-height:430px;display:grid;place-items:center}
    .community-modern__blob{position:absolute;width:365px;height:365px;background:linear-gradient(135deg,#8e88ef,#4b3ed6);border-radius:46% 54% 58% 42% / 51% 42% 58% 49%;transform:rotate(-13deg)}
    .community-modern__image-frame{position:relative;width:285px;height:285px;overflow:hidden;border:7px solid #fff;box-shadow:0 22px 55px rgba(48,42,155,.22);transform:rotate(45deg);border-radius:28px;background:#fff}
    .community-modern__image-frame img{width:100%;height:100%;object-fit:cover;transform:rotate(-45deg) scale(1.43)}
    .community-modern__badge{position:absolute;left:4%;bottom:38px;display:flex;align-items:center;gap:10px;padding:12px 16px;background:#fff;border-radius:999px;box-shadow:0 12px 30px rgba(35,37,129,.16);font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.07em;color:#27205f}
    .community-modern__badge:before{content:"✓";display:grid;place-items:center;width:25px;height:25px;border-radius:50%;background:var(--red);color:#fff;font-size:12px}
    .community-modern__content{max-width:620px}
    .community-modern__content .eyebrow{margin-bottom:8px}
    .community-modern__content h2{margin:8px 0 18px;font-family:"DM Serif Display",Georgia,serif;font-size:clamp(36px,4.4vw,58px);line-height:.98;letter-spacing:-.045em;color:var(--ink)}
    .community-modern__content>p{max-width:570px;color:var(--muted);font-size:15px;line-height:1.75;margin:0 0 24px}
    .community-modern__offer{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:25px 0}
    .community-modern__offer div{padding:17px 18px;background:rgba(255,255,255,.82);border:1px solid rgba(223,228,244,.95);border-radius:12px;box-shadow:0 10px 28px rgba(35,37,129,.07)}
    .community-modern__offer span{display:block;color:var(--red);font-size:10px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;margin-bottom:7px}
    .community-modern__offer strong{font-size:19px;color:var(--ink)}
    .community-modern__content .btn{box-shadow:0 12px 25px rgba(233,40,53,.18)}

    @media(max-width:700px){
      #home-packages .price-card{flex-basis:255px;min-width:255px}
      .bar__row{overflow-x:auto;flex-wrap:nowrap;justify-content:flex-start}
      .bar__row a{flex:0 0 auto}
      .community-modern{padding:55px 0 65px}
      .community-modern__inner{grid-template-columns:1fr;gap:35px}
      .community-modern__visual{min-height:330px}
      .community-modern__blob{width:285px;height:285px}
      .community-modern__image-frame{width:220px;height:220px}
      .community-modern__badge{left:7%;bottom:8px;font-size:9px;padding:9px 12px}
      .community-modern__offer{grid-template-columns:1fr}
      .community-modern__content h2{font-size:40px}
    }
  `;
  document.head.appendChild(style);

  if (packageCategory) packageCategory.id = "home-packages";
  if (business) business.id = "business-packages";

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
    community.className = "community-modern";
    community.innerHTML = `<div class="container community-modern__inner"><div class="community-modern__visual"><div class="community-modern__blob"></div><div class="community-modern__image-frame"><img src="assets/images/community-accessible-new.jpg" alt="Customer with a disability enjoying internet access"></div><div class="community-modern__badge">Inclusive connectivity for everyone</div></div><div class="community-modern__content"><span class="eyebrow">Serving The Community</span><h2>Connection should be accessible to everyone.</h2><p>NIS supports customers with disabilities with affordable home internet for communication, study, work and everyday digital access.</p><div class="community-modern__offer"><div><span>Community Package</span><strong>10 Mbps</strong></div><div><span>Monthly Access</span><strong>KSh 600 / month</strong></div></div><a class="btn btn--solid" href="#contact">Request Community Package</a></div></div>`;
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
