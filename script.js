// ---------- SECTION NAVIGATION ----------
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

function showSection(sectionId) {
  sections.forEach(section => section.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === sectionId) {
      link.classList.add('active');
    }
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute('data-section');
    showSection(sectionId);
  });
});

// ---------- THEME TOGGLE ----------
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.classList.add('light-mode');
  themeIcon.classList.remove('bx-sun');
  themeIcon.classList.add('bx-moon');
}

themeToggle.addEventListener('click', () => {
  if (body.classList.contains('light-mode')) {
    body.classList.remove('light-mode');
    themeIcon.classList.remove('bx-moon');
    themeIcon.classList.add('bx-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.add('light-mode');
    themeIcon.classList.remove('bx-sun');
    themeIcon.classList.add('bx-moon');
    localStorage.setItem('theme', 'light');
  }
});

// ---------- WEATHER WITH YOUR API KEY ----------
const weatherElement = document.getElementById('weather-time');
const API_KEY = 'ae8d76353d4e41668b8215222261903';

async function getLocationAndWeather() {
  try {
    // Get user's location
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        timeout: 10000,
        maximumAge: 600000
      });
    });
    
    const { latitude, longitude } = position.coords;
    console.log('Location obtained:', latitude, longitude);
    
    // Fetch weather from OpenWeatherMap with your API key
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Weather data:', data);
    
    if (data.main && data.weather) {
      const temp = Math.round(data.main.temp);
      const description = data.weather[0].description;
      // Capitalize first letter
      const weatherDesc = description.charAt(0).toUpperCase() + description.slice(1);
      
      weatherElement.textContent = `${temp}°C · ${weatherDesc}`;
    } else {
      throw new Error('Invalid weather data');
    }
  } catch (error) {
    console.error('Weather error:', error);
    weatherElement.textContent = 'Weather unavailable';
    // Fallback to time after 2 seconds
    setTimeout(updateFallbackTime, 2000);
  }
}

function updateFallbackTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  weatherElement.textContent = `${hours}:${minutes} Local`;
}

// Try to get weather immediately
getLocationAndWeather();

// Refresh weather every 30 minutes
setInterval(getLocationAndWeather, 1800000);

// ---------- CONTACT MODAL ----------
const modal = document.getElementById('contact-modal');
const contactBtn = document.getElementById('contact-popup-btn');
const closeBtn = document.querySelector('.close-modal');

contactBtn.addEventListener('click', (e) => {
  e.preventDefault();
  modal.classList.add('active');
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    modal.classList.remove('active');
  }
});

// ---------- CONTACT FORM ----------
const contactForm = document.getElementById('popup-contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Message sent! (Demo form)');
  modal.classList.remove('active');
  contactForm.reset();
});

// ---------- POCKET GYM LINK ----------
document.getElementById('open-pocket-gym')?.addEventListener('click', (e) => {
  e.preventDefault();
  window.open('pocket-gym.html', '_blank');
});

// ---------- INITIALIZE ----------
showSection('home');