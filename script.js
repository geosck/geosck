(function(){
  "use strict";

  // ---------- NAVIGATION ----------
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  
  function showSection(sectionId) {
    sections.forEach(s => s.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.dataset.section === sectionId) link.classList.add('active');
    });
  }
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showSection(link.dataset.section);
    });
  });

  // ---------- THEME TOGGLE (two-color light/dark) ----------
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const themeIcon = themeToggle.querySelector('i');
  
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.classList.remove('bx-sun');
    themeIcon.classList.add('bx-moon');
  }
  
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    themeIcon.classList.toggle('bx-sun', !isDark);
    themeIcon.classList.toggle('bx-moon', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // ---------- WEATHER WITH GEOLOCATION ----------
  const weatherEl = document.getElementById('weather-time');
  
  async function fetchWeather() {
    try {
      const pos = await new Promise((res, rej) => 
        navigator.geolocation.getCurrentPosition(res, rej, { timeout: 8000 })
      );
      const { latitude, longitude } = pos.coords;
      const API_KEY = 'ae8d76353d4e41668b8215222261903';
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      );
      if (!resp.ok) throw new Error('weather fail');
      const data = await resp.json();
      const temp = Math.round(data.main.temp);
      const desc = data.weather[0].description;
      weatherEl.textContent = `${temp}°C · ${desc.charAt(0).toUpperCase() + desc.slice(1)}`;
    } catch (e) {
      weatherEl.textContent = '—° · Local';
    }
  }
  
  fetchWeather();
  setInterval(fetchWeather, 1800000);

  // ---------- CONTACT MODAL ----------
  const modal = document.getElementById('contact-modal');
  const contactBtn = document.getElementById('contact-popup-btn');
  const closeBtn = document.querySelector('.close-modal');
  
  contactBtn.addEventListener('click', (e) => { 
    e.preventDefault(); 
    modal.classList.add('active'); 
  });
  
  closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  
  window.addEventListener('click', (e) => { 
    if (e.target === modal) modal.classList.remove('active'); 
  });
  
  document.addEventListener('keydown', (e) => { 
    if (e.key === 'Escape') modal.classList.remove('active'); 
  });

  // ---------- CONTACT FORM (demo) ----------
  document.getElementById('popup-contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('✨ Message sent (demo) — thank you.');
    modal.classList.remove('active');
    e.target.reset();
  });

  // ---------- POCKET GYM LINK ----------
  document.getElementById('open-pocket-gym')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.open('pocket-gym.html', '_blank');
  });

  // ---------- INITIALIZE ----------
  showSection('home');
})();
