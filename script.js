(function(){
  "use strict";
  
  // ---------- THEME TOGGLE ----------
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('i');
  
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark');
    themeIcon.classList.remove('bx-sun');
    themeIcon.classList.add('bx-moon');
  }
  
  themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark')) {
      body.classList.remove('dark');
      themeIcon.classList.remove('bx-moon');
      themeIcon.classList.add('bx-sun');
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.add('dark');
      themeIcon.classList.remove('bx-sun');
      themeIcon.classList.add('bx-moon');
      localStorage.setItem('theme', 'dark');
    }
  });

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
  
  const form = document.getElementById('popup-contact-form');
  form.addEventListener('submit', (e) => { 
    e.preventDefault(); 
    alert('✨ Message sent (demo)'); 
    modal.classList.remove('active'); 
    form.reset(); 
  });

  // ---------- POCKET GYM LINK ----------
  document.getElementById('open-pocket-gym')?.addEventListener('click', (e) => {
    e.preventDefault(); 
    window.open('pocket-gym.html', '_blank');
  });

  // ---------- INITIALIZE ----------
  showSection('home');
})();
