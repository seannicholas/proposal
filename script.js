const tabBtns         = document.querySelectorAll('.tab-btn');
const plans           = document.querySelectorAll('.plan');
const scrollContainer = document.getElementById('scroll-container');
const dateBtns        = document.querySelectorAll('.date-btn');
const planLinks       = document.querySelectorAll('.cta-opt[data-msg]');
const ctaSection      = document.getElementById('cta');
const ctaDates        = document.querySelector('.cta-dates');

// Set initial palette
scrollContainer.dataset.plan = 'a';

// Plan tab switching
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    plans.forEach(p => p.classList.add('hidden'));
    btn.classList.add('active');
    document.getElementById('plan-' + btn.dataset.tab).classList.remove('hidden');
    scrollContainer.dataset.plan = btn.dataset.tab;
  });
});

// Date selection — toggle, update hrefs, manage date-ready state
let selectedDate = null;

function updatePlanLinks() {
  planLinks.forEach(link => {
    const msg = selectedDate
      ? `${link.dataset.msg} — ${selectedDate}`
      : link.dataset.msg;
    link.href = `https://t.me/seannicho?text=${encodeURIComponent(msg)}`;
  });
  ctaSection.classList.toggle('date-ready', !!selectedDate);
}

dateBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const isActive = btn.classList.contains('active');
    dateBtns.forEach(b => b.classList.remove('active'));
    selectedDate = isActive ? null : btn.dataset.date;
    if (!isActive) btn.classList.add('active');
    updatePlanLinks();
  });
});

// Nudge the date row if Plan A/B clicked without a date
planLinks.forEach(link => {
  link.addEventListener('click', e => {
    if (!selectedDate) {
      e.preventDefault();
      ctaDates.classList.remove('nudge');
      void ctaDates.offsetWidth; // reflow to restart animation
      ctaDates.classList.add('nudge');
      ctaDates.addEventListener('animationend', () => ctaDates.classList.remove('nudge'), { once: true });
    }
  });
});
