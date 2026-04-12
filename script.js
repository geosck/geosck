  <!-- ============================================ -->
  <!-- JAVASCRIPT (Clean, Well-Commented)           -->
  <!-- ============================================ -->
  <script>
    // Wait for the DOM to be fully loaded before running any code
    document.addEventListener('DOMContentLoaded', function() {
      
      // ============================================
      // 1. NAVIGATION BETWEEN SECTIONS
      // ============================================
      const navLinks = document.querySelectorAll('.nav-link');
      const sections = document.querySelectorAll('.section');
      
      // Function to show a specific section and hide others
      function showSection(sectionId) {
        // Hide all sections
        sections.forEach(function(section) {
          section.classList.remove('active');
        });
        
        // Show the selected section
        document.getElementById(sectionId).classList.add('active');
        
        // Update active state on navigation links
        navLinks.forEach(function(link) {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
          }
        });
      }
      
      // Add click event listeners to all navigation links
      navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
          e.preventDefault(); // Prevent any default anchor behavior
          const sectionId = this.getAttribute('data-section');
          showSection(sectionId);
        });
      });
      
      // ============================================
      // 2. THEME TOGGLE (Light/Dark Mode)
      // ============================================
      const themeToggle = document.getElementById('theme-toggle');
      const body = document.body;
      const themeIcon = document.getElementById('theme-icon');
      
      // Check if user has a saved theme preference
      const savedTheme = localStorage.getItem('theme');
      
      // Apply saved theme or default to light
      if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.className = 'bx bx-moon';
      } else {
        body.classList.remove('dark-mode');
        themeIcon.className = 'bx bx-sun';
      }
      
      // Toggle theme when button is clicked
      themeToggle.addEventListener('click', function() {
        // Toggle the dark-mode class on body
        body.classList.toggle('dark-mode');
        
        // Check if dark mode is now active
        const isDarkMode = body.classList.contains('dark-mode');
        
        // Update the icon
        if (isDarkMode) {
          themeIcon.className = 'bx bx-moon';
        } else {
          themeIcon.className = 'bx bx-sun';
        }
        
        // Save the preference to localStorage
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
      });
      
      // ============================================
      // 3. WEATHER DISPLAY (Geolocation)
      // ============================================
      const weatherElement = document.getElementById('weather-time');
      
      // Function to fetch and display weather
      async function fetchWeather() {
        try {
          // Check if geolocation is available
          if (!navigator.geolocation) {
            weatherElement.textContent = 'Geolocation not supported';
            return;
          }
          
          // Get user's current position
          const position = await new Promise(function(resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              timeout: 8000,
              maximumAge: 600000 // Cache for 10 minutes
            });
          });
          
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          
          // OpenWeatherMap API (free tier)
          const API_KEY = 'ae8d76353d4e41668b8215222261903';
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
          );
          
          if (!response.ok) {
            throw new Error('Weather data not available');
          }
          
          const data = await response.json();
          const temperature = Math.round(data.main.temp);
          const description = data.weather[0].description;
          
          // Capitalize first letter of description
          const formattedDesc = description.charAt(0).toUpperCase() + description.slice(1);
          
          weatherElement.textContent = `${temperature}°C · ${formattedDesc}`;
          
        } catch (error) {
          console.log('Weather error:', error);
          weatherElement.textContent = '—° · Local';
        }
      }
      
      // Fetch weather immediately
      fetchWeather();
      
      // Refresh weather every 30 minutes
      setInterval(fetchWeather, 30 * 60 * 1000);
      
      // ============================================
      // 4. CONTACT MODAL (Popup Form)
      // ============================================
      const modal = document.getElementById('contact-modal');
      const contactBtn = document.getElementById('contact-popup-btn');
      const closeModalBtn = document.getElementById('close-modal-btn');
      
      // Open modal when contact button is clicked
      contactBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.add('active');
      });
      
      // Close modal when X is clicked
      closeModalBtn.addEventListener('click', function() {
        modal.classList.remove('active');
      });
      
      // Close modal when clicking outside the modal content
      window.addEventListener('click', function(e) {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
      
      // Close modal when Escape key is pressed
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
          modal.classList.remove('active');
        }
      });
      
      // ============================================
      // 5. CONTACT FORM SUBMISSION
      // ============================================
      const contactForm = document.getElementById('popup-contact-form');
      
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message (demo purposes)
        alert('✨ Thanks for your message! (This is a demo form)');
        
        // Close the modal
        modal.classList.remove('active');
        
        // Reset the form
        contactForm.reset();
        
        // Note: The form will still submit to Formspree because we used preventDefault
        // For a real implementation, you might want to use fetch() or let it submit naturally
      });
      
      // ============================================
      // 6. POCKET GYM LINK
      // ============================================
      const pocketGymLink = document.getElementById('open-pocket-gym');
      
      if (pocketGymLink) {
        pocketGymLink.addEventListener('click', function(e) {
          e.preventDefault();
          // Open the pocket gym page in a new tab
          window.open('pocket-gym.html', '_blank');
        });
      }
      
      // ============================================
      // 7. INITIALIZE - Show home section by default
      // ============================================
      showSection('home');
      
    }); // End of DOMContentLoaded
