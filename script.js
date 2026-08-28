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
    /* Translucent blue navigation header */
    .site-header{
      background:rgba(22,91,190,.78)!important;
      box-shadow:0 8px 28px rgba(9,38,100,.18)!important;
      backdrop-filter:blur(14px) saturate(145%);
      -webkit-backdrop-filter:blur(14px) saturate(145%);
      border-bottom:1px solid rgba(255,255,255,.18);
    }
    .site-header:before{
      background:linear-gradient(90deg,rgba(83,40,201,.92),rgba(20,135,223,.92))!important;
    }
    .site-header,.site-header *,.bar,.bar *,.nav-links a,.btn,a,button{pointer-events:auto}
    .site-header{z-index:1000}
    .site-header .brand img{filter:drop-shadow(0 3px 7px rgba(0,0,0,.18))}
    .site-header .nav-links>a:not(.btn){color:#fff!important;text-shadow:0 1px 5px rgba(0,35,90,.28)}
    .site-header .nav-links>a:not(.btn):hover{color:#dceeff!important}
    .site-header .nav-toggle span{background:#fff!important}
    .site-header .nav-links{background:rgba(14,74,160,.94)}
    .site-header .nav-links>a{color:#fff}

    .bar{position:relative;z-index:10}
    .bar__row a{display:flex;align-items:center;justify-content:center;cursor:pointer;color:#888;text-decoration:none}
    .bar__row a:before{content:"◆";color:var(--red);font-size:8px;margin-right:8px}
    .bar__row a:hover{color:var(--red)}
    #home-packages,#business-packages,#student-package,#community-package,#coverage{scroll-margin-top:115px}
    #home-packages .packages-grid{display:flex!important;flex-wrap:nowrap!important;overflow-x:auto;gap:18px;padding:8px 4px 18px;-webkit-overflow-scrolling:touch}
    #home-packages .price-card{flex:0 0 270px;min-width:270px}

    /* Premium community section */
    #community-package{
      position:relative;
      margin-top:42px;
      padding:0!important;
      border:0!important;
      overflow:visible;
    }
    #community-package:before{
      content:"";
      position:absolute;
      width:190px;
      height:190px;
      right:-80px;
      top:-45px;
      border-radius:50%;
      background:rgba(20,135,223,.09);
      pointer-events:none;
    }
    #community-package>h3{
      max-width:760px;
      margin:10px 0 12px;
      font-family:"DM Serif Display",Georgia,serif;
      font-size:clamp(34px,4vw,52px);
      line-height:1;
      letter-spacing:-.045em;
      color:var(--ink);
    }
    #community-package>p{
      max-width:760px;
      margin:0 0 26px;
      color:var(--muted);
      font-size:15px;
      line-height:1.75;
    }
    #community-package .community-access-card{
      position:relative;
      display:grid;
      grid-template-columns:minmax(0,1.08fr) minmax(360px,.92fr);
      min-height:440px;
      margin-top:24px;
      overflow:hidden;
      border:0;
      border-radius:18px;
      background:linear-gradient(135deg,#111b4b 0%,#173f8d 52%,#1487df 100%);
      box-shadow:0 24px 60px rgba(21,48,120,.22);
    }
    #community-package .community-access-card:after{
      content:"";
      position:absolute;
      inset:0;
      background:linear-gradient(90deg,transparent 30%,rgba(5,20,62,.25) 55%,rgba(5,20,62,.72) 100%);
      pointer-events:none;
    }
    #community-package .community-access-card img{
      width:100%;
      height:100%;
      min-height:440px;
      object-fit:cover;
      object-position:center;
      filter:saturate(.96) contrast(1.02);
    }
    #community-package .community-access-card>div{
      position:relative;
      z-index:2;
      display:flex;
      flex-direction:column;
      justify-content:center;
      padding:48px 46px;
      color:#fff;
    }
    #community-package .community-access-card>div:before{
      content:"COMMUNITY CONNECT";
      display:inline-flex;
      align-self:flex-start;
      align-items:center;
      min-height:30px;
      padding:0 12px;
      margin-bottom:16px;
      border:1px solid rgba(255,255,255,.28);
      border-radius:999px;
      background:rgba(255,255,255,.10);
      color:#d9edff;
      font-size:9px;
      font-weight:900;
      letter-spacing:.16em;
    }
    #community-package .community-access-card .eyebrow{color:#91d0ff}
    #community-package .community-access-card strong{
      display:block;
      margin:10px 0 14px;
      color:#fff;
      font-family:"DM Serif Display",Georgia,serif;
      font-size:clamp(30px,3.1vw,45px);
      line-height:1.05;
      letter-spacing:-.03em;
    }
    #community-package .community-access-card p{
      max-width:470px;
      margin:0 0 22px;
      color:rgba(255,255,255,.78);
      font-size:14px;
      line-height:1.75;
    }
    #community-package .community-access-card .btn{
      align-self:flex-start;
      background:#fff;
      color:#173f8d;
      border-radius:6px;
      box-shadow:0 12px 28px rgba(0,0,0,.18);
    }
    #community-package .community-access-card .btn:hover{
      background:#eaf5ff;
      color:#102a7a;
    }
    #community-package .community-access-card:before{
      content:"♿  ACCESSIBLE CONNECTIVITY";
      position:absolute;
      z-index:3;
      left:24px;
      bottom:22px;
      padding:9px 13px;
      border:1px solid rgba(255,255,255,.3);
      border-radius:999px;
      background:rgba(9,30,80,.62);
      backdrop-filter:blur(8px);
      color:#fff;
      font-size:9px;
      font-weight:900;
      letter-spacing:.1em;
    }

    @media(max-width:980px){
      #community-package .community-access-card{grid-template-columns:1fr;min-height:0}
      #community-package .community-access-card img{height:330px;min-height:330px}
      #community-package .community-access-card:after{background:linear-gradient(0deg,rgba(5,20,62,.78),transparent 58%)}
      #community-package .community-access-card>div{padding:34px 30px 40px}
    }
    @media(max-width:700px){
      #home-packages .price-card{flex-basis:255px;min-width:255px}
      .bar__row{overflow-x:auto;flex-wrap:nowrap;justify-content:flex-start}
      .bar__row a{flex:0 0 auto}
      #community-package{margin-top:30px}
      #community-package>h3{font-size:34px}
      #community-package .community-access-card{border-radius:12px}
      #community-package .community-access-card img{height:245px;min-height:245px}
      #community-package .community-access-card>div{padding:28px 22px 34px}
      #community-package .community-access-card strong{font-size:32px}
      #community-package .community-access-card:before{left:14px;bottom:auto;top:214px;font-size:8px}
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
