// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
      hamburger.addEventListener('click', function() {
          navLinks.classList.toggle('active');
          hamburger.classList.toggle('active');
      });
  }

  // Close mobile menu when clicking on a nav link
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
      item.addEventListener('click', function() {
          if (navLinks.classList.contains('active')) {
              navLinks.classList.remove('active');
              hamburger.classList.remove('active');
          }
      });
  });

  // Reservation Form Validation and Submission
  const reservationForm = document.getElementById('reservation-form');
  const modal = document.getElementById('confirmation-modal');
  const closeButton = document.querySelector('.close-button');
  const reservationDetails = document.getElementById('reservation-details');

  if (reservationForm) {
      reservationForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Basic form validation
          const name = document.getElementById('name').value;
          const date = document.getElementById('date').value;
          const time = document.getElementById('time').value;
          const guests = document.getElementById('guests').value;
          const phone = document.getElementById('phone').value;
          
          if (!name || !date || !time || !guests || !phone) {
              alert('Please fill in all fields');
              return;
          }
          
          // Format reservation details for modal
          const formattedDate = new Date(date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
          });
          
          reservationDetails.innerHTML = `
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Date:</strong> ${formattedDate}</p>
              <p><strong>Time:</strong> ${time}</p>
              <p><strong>Guests:</strong> ${guests}</p>
              <p><strong>Phone:</strong> ${phone}</p>
          `;
          
          // Show confirmation modal
          modal.style.display = 'flex';
          
          // Reset form
          reservationForm.reset();
      });
  }

  // Contact Form Validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Basic form validation
          const name = document.getElementById('contact-name').value;
          const email = document.getElementById('email').value;
          const message = document.getElementById('message').value;
          
          if (!name || !email || !message) {
              alert('Please fill in all fields');
              return;
          }
          
          // Email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
              alert('Please enter a valid email address');
              return;
          }
          
          // Show success message
          alert('Thank you for your message! We will get back to you soon.');
          
          // Reset form
          contactForm.reset();
      });
  }

  // Close modal when clicking the close button
  if (closeButton) {
      closeButton.addEventListener('click', function() {
          modal.style.display = 'none';
      });
  }

  // Close modal when clicking outside of it
  window.addEventListener('click', function(e) {
      if (e.target === modal) {
          modal.style.display = 'none';
      }
  });

  // Menu Category Filtering
  const categoryButtons = document.querySelectorAll('.category-btn');
  const menuItems = document.querySelectorAll('.menu-item');

  if (categoryButtons.length > 0) {
      categoryButtons.forEach(button => {
          button.addEventListener('click', function() {
              // Remove active class from all buttons
              categoryButtons.forEach(btn => btn.classList.remove('active'));
              
              // Add active class to clicked button
              this.classList.add('active');
              
              const category = this.getAttribute('data-category');
              
              // Show/hide menu items based on category
              if (category === 'all') {
                  menuItems.forEach(item => {
                      item.style.display = 'block';
                  });
              } else {
                  menuItems.forEach(item => {
                      if (item.getAttribute('data-category') === category) {
                          item.style.display = 'block';
                      } else {
                          item.style.display = 'none';
                      }
                  });
              }
          });
      });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80, // Adjust for navbar height
                  behavior: 'smooth'
              });
          }
      });
  });

  // Navbar background change on scroll
  window.addEventListener('scroll', function() {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
          navbar.style.backgroundColor = 'rgba(122, 35, 35, 0.95)';
          navbar.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
      } else {
          navbar.style.backgroundColor = 'var(--primary-color)';
          navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      }
  });
});
