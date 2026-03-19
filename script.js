const html = document.documentElement;
const toggle = document.getElementById("modeToggle");
const heroSub = document.getElementById("heroSub");
const ctaHead = document.getElementById("ctaHead");
const ctaSub = document.getElementById("ctaSub");
const ctaBtn = document.getElementById("ctaBtnText");
const eggEl = document.getElementById("easterEgg");
const eggFlash = document.getElementById("eggFlash");
const eggCrown = document.getElementById("eggCrown");

const MEME_COPY = {
  heroSub:
    "he said he'd send a proposal deck.<br/>he actually built a whole website.",
  ctaHead: "So\u2026<br/>do we have a deal?",
  ctaSub: "Awaiting your formal approval, your majesty.",
  ctaBtn: "I Approve This Proposal",
};

const FORMAL_COPY = {
  heroSub: "Prepared exclusively for the consideration of<br/>elliephantgator.",
  ctaHead: "Awaiting Your<br/>Formal Approval",
  ctaSub: "Please direct all responses and approvals via the button below.",
  ctaBtn: "Approve \u2192",
};

function setMode(isFormal) {
  html.dataset.mode = isFormal ? "formal" : "meme";
  const copy = isFormal ? FORMAL_COPY : MEME_COPY;
  heroSub.innerHTML = copy.heroSub;
  ctaHead.innerHTML = copy.ctaHead;
  ctaSub.textContent = copy.ctaSub;
  ctaBtn.textContent = copy.ctaBtn;
}

// FIX 2: toggle fires correctly now that input is not display:none
toggle.addEventListener("change", () => setMode(toggle.checked));

// FIX 3: Easter egg — eggFlash/eggCrown are direct children of <body>,
// outside any scroll container, so position:fixed works correctly.
let eggCount = 0;
eggEl.addEventListener("click", () => {
  eggCount++;
  eggFlash.classList.add("pop");
  eggCrown.classList.add("pop");
  setTimeout(
    () => {
      eggFlash.classList.remove("pop");
      eggCrown.classList.remove("pop");
    },
    eggCount > 4 ? 2000 : 600,
  );
  if (eggCount > 4) {
    document.body.style.transition = "filter 0.3s";
    document.body.style.filter = "hue-rotate(180deg)";
    setTimeout(() => {
      document.body.style.filter = "";
    }, 1800);
    eggCount = 0;
  }
});
