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
.site-header{background:transparent!important;box-shadow:none!important}
.site-header .nav{background:transparent}
.site-header .nav-links>a:not(.btn){color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.35)}
.site-header .nav-toggle span{background:#fff}
.bar__row a,.bar__row span{cursor:pointer;display:flex;align-items:center;justify-content:center;color:#888;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.08em;transition:color .2s,transform .2s;text-decoration:none}
.bar__row a:before,.bar__row span:before{content:"◆";color:var(--red);font-size:8px;margin-right:8px}
.bar__row a:hover,.bar__row a:focus,.bar__row span:hover{color:var(--red);transform:translateY(-1px)}
#home-packages,#student-package,#community-package,#business-packages,#coverage{scroll-margin-top:115px}
#home-packages .packages-grid{display:flex!important;flex-wrap:nowrap!important;overflow-x:auto;overflow-y:hidden;gap:18px;padding:8px 4px 18px;scroll-snap-type:x proximity;scrollbar-width:thin;-webkit-overflow-scrolling:touch}
#home-packages .price-card{flex:0 0 270px;min-width:270px;scroll-snap-align:start;min-height:225px}
.extra-package-section{margin-top:3.5rem;padding-top:2.5rem;border-top:1px solid var(--line)}
.extra-package-section h3{margin:.35rem 0 .55rem;font-family:"DM Serif Display",Georgia,serif;font-size:clamp(28px,3vw,40px);font-weight:400}
.extra-package-section>p{max-width:700px;color:var(--muted);line-height:1.7}
.student-package-card{display:grid;grid-template-columns:1fr 1fr;gap:22px;align-items:stretch;margin-top:20px}
.student-package-card>div{padding:26px;background:#fff;border:1px solid var(--line);box-shadow:0 10px 25px rgba(0,0,0,.05)}
.student-package-card strong{display:block;font-size:30px;color:var(--ink);margin:8px 0}
.student-package-card ul{margin:16px 0;padding-left:20px;color:var(--muted);line-height:1.9;font-size:13px}
.community-access-card{display:grid;grid-template-columns:1fr 1fr;gap:0;margin-top:20px;background:#fff;border:1px solid var(--line);box-shadow:0 12px 30px rgba(35,37,129,.1);overflow:hidden}
.community-access-card img{width:100%;height:100%;min-height:260px;object-fit:cover}
.community-access-card>div{padding:28px}
.community-access-card strong{display:block;font-size:28px;margin:8px 0}
.community-access-card p{color:var(--muted);line-height:1.7;font-size:14px}
@media(max-width:700px){.bar__row{display:flex;flex-wrap:nowrap;overflow-x:auto;justify-content:flex-start;padding-bottom:4px;-webkit-overflow-scrolling:touch}.bar__row a,.bar__row span{flex:0 0 auto}.student-package-card,.community-access-card{grid-template-columns:1fr}.community-access-card img{min-height:220px}#home-packages .price-card{flex-basis:255px;min-width:255px}}
`;
document.head.appendChild(enhancementStyle);

const bar = document.querySelector(".bar__row");
const packageCategory = document.querySelector(".package-category");
const business = document.querySelector(".package-category--business");

if (packageCategory) packageCategory.id = "home-packages";
if (business) business.id = "business-packages";

if (bar) {
  const targets = [["Homes", "#home-packages"],["Businesses", "#business-packages"],["Students", "#student-package"],["Communities", "#community-package"],["Coverage checks", "#coverage"]];
  [...bar.querySelectorAll(":scope > span")].forEach((span,i)=>{const target=targets[i]; if(!target)return; const link=document.createElement("a"); link.href=target[1]; link.textContent=target[0]; link.setAttribute("aria-label",`Go to ${target[0]}`); span.replaceWith(link);});
  bar.addEventListener("click",event=>{const link=event.target.closest("a"); if(!link||!bar.contains(link))return; const target=document.querySelector(link.getAttribute("href")); if(!target)return; event.preventDefault(); history.replaceState(null,"",link.getAttribute("href")); target.scrollIntoView({behavior:"smooth",block:"start"});});
}

const homeGrid = packageCategory?.querySelector(".packages-grid");
if (packageCategory && homeGrid) {
  const plans = [["7 Mbps","KSh 1,000","Good for browsing and lighter daily use."],["10 Mbps","KSh 1,500","A balanced package for everyday homes."],["15 Mbps","KSh 1,800","For multiple devices and family use."],["20 Mbps","KSh 2,000","Great for busy families and streaming."],["25 Mbps","KSh 2,500","Reliable home entertainment and work."],["30 Mbps","KSh 3,000","For heavy home usage and many devices."],["40 Mbps","KSh 4,000","Best for busy households and heavier demand."]];
  [...homeGrid.querySelectorAll(".price-card")].slice(0,7).forEach((card,i)=>{const [speed,price,description]=plans[i]; const title=card.querySelector("h3"),amount=card.querySelector("strong"),desc=card.querySelector("p"); if(title)title.textContent=speed; if(amount)amount.innerHTML=`${price} <span>/ month</span>`; if(desc)desc.textContent=description; card.classList.toggle("price-card--featured",i===3);});
  [...homeGrid.querySelectorAll(".price-card")].slice(7).forEach(card=>card.remove());
}

if (!document.querySelector("#student-package") && packageCategory) {
  const student=document.createElement("section"); student.id="student-package"; student.className="extra-package-section"; student.innerHTML=`<span class="eyebrow">Student Connectivity</span><h3>Student Package</h3><p>Affordable unlimited internet for students to study, attend online classes, research, submit assignments and stay connected.</p><div class="student-package-card"><div><span class="eyebrow">Student Home Plan</span><strong>10 Mbps</strong><strong>KSh 600 <small>/ month</small></strong><ul><li>Unlimited home internet</li><li>Designed for learning and study</li><li>Coverage confirmation applies</li></ul><a class="btn btn--solid" href="#contact">Request Student Package</a></div><div><span class="eyebrow">Built For Learning</span><h3>Stay connected to opportunity.</h3><p>Reliable access for classes, research, assignments, applications, communication and online resources.</p></div></div>`; packageCategory.parentElement.insertBefore(student,business||null);
}

if (!document.querySelector("#community-package") && packageCategory) {
  const community=document.createElement("section"); community.id="community-package"; community.className="extra-package-section"; community.innerHTML=`<span class="eyebrow">Serving The Community</span><h3>Community Connect — Accessible Connectivity</h3><p>NIS supports customers with disabilities with affordable home internet for communication, study, work and daily access.</p><div class="community-access-card"><img src="assets/images/community-accessible-new.jpg" alt="Customer using a laptop while seated in a wheelchair"><div><span class="eyebrow">Customers With Disabilities</span><strong>10 Mbps — KSh 600 / month</strong><p>Unlimited home internet for eligible customers with disabilities. Coverage confirmation applies before installation.</p><a class="btn btn--solid" href="#contact">Request Community Package</a></div></div>`; packageCategory.parentElement.insertBefore(community,business||null);
}

if (navToggle && navLinks) { navToggle.addEventListener("click",()=>{const isOpen=navLinks.classList.toggle("is-open");navToggle.setAttribute("aria-expanded",String(isOpen));}); navLinks.addEventListener("click",event=>{if(event.target instanceof HTMLAnchorElement){navLinks.classList.remove("is-open");navToggle.setAttribute("aria-expanded","false");}}); }

if (coverageSelect && mapFrame && mapLink) { const updateMap=()=>{const query=encodeURIComponent(coverageSelect.value);mapFrame.src=`https://www.google.com/maps?q=${query}&output=embed`;mapLink.href=`https://www.google.com/maps/search/?api=1&query=${query}`;}; coverageSelect.addEventListener("change",updateMap); updateMap(); }

if (contactForm) { contactForm.addEventListener("submit",event=>{event.preventDefault();const formData=new FormData(contactForm);const body=[`Name: ${formData.get("name")||""}`,`Phone: ${formData.get("phone")||""}`,`Location: ${formData.get("location")||""}`,`Package: ${formData.get("package")||""}`,`Message: ${formData.get("message")||""}`].join("\n");window.location.href=`mailto:info@neemainternet.co.ke?subject=New%20Connection%20Request&body=${encodeURIComponent(body)}`;}); }
