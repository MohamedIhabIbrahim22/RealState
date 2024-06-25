function animateOnScroll(element) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-in-bottom');
                observer.unobserve(entry.target);
            }
        });
    });
  
    observer.observe(element);
  }
  
  document.querySelectorAll('*').forEach((element) => {
    animateOnScroll(element);
  });
  
  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  
  function validatePassword(password) {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordPattern.test(password);
  }
  
  $(document).ready(function() {
    $('#login-form').submit(function(event) {
        event.preventDefault();
  
        const email = $('#email').val();
        const password = $('#password').val();
  
        if (!validatePassword(password)) {
            $('#password-error').text('Password must be at least 8 characters long and contain at least 1 capital letter and 1 number.').css('color', 'red');
            return;
        } else {
            $('#password-error').text('');
        }
  
        if (email === 'Admin1@hotmail.com' && password === 'Admin777') {
            const successMessage = $('<div>').text('Successfully Logged in').css('color', 'green');
            $('body').append(successMessage);
            setTimeout(() => {
                window.location.href = './Dashboard2.ejs'; // Redirect to the specific dashboard
            }, 1000);
            return; // Stop further execution
        }
  
        if (email === 'Admin2@hotmail.com' && password === 'Admin888') {
            const successMessage = $('<div>').text('Successfully Logged in').css('color', 'green');
            $('body').append(successMessage);
            setTimeout(() => {
                window.location.href = './Dashboard2.ejs'; // Redirect to the specific dashboard
            }, 1000);
            return; // Stop further execution
        }
  
        $.ajax({
            url: '/login2',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email, password }),
            success: function(response) {
                const successMessage = $('<div>').text(response.message).css('color', 'green');
                $('body').append(successMessage);
                setTimeout(() => {
                    window.location.href = './payment.ejs'; // Redirect to the home page
                }, 1000);
            },
            error: function(jqXHR) {
                const errorMessage = $('<div>').text('Invalid email or password. Please try again.').css('color', 'red');
                $('body').append(errorMessage);
                setTimeout(() => {
                    errorMessage.remove();
                }, 1000);
            }
        });
    });
  });
  
  const passwordInputLogin = document.getElementById('password');
  const passwordErrorLogin = document.getElementById('password-error');
  
  passwordInputLogin.addEventListener('input', () => {
    passwordErrorLogin.textContent = '';
  });
  
  function sortProperties() {
    let selectedBedrooms = document.getElementById('bedroomsDropdown').value;
    let selectedPrice = document.getElementById('pricesDropdown').value;
    let selectedLocation = document.getElementById('locationsDropdown').value;
  
    let propertyBoxes = document.querySelectorAll('.property-box2');
  
    propertyBoxes.forEach(box => {
        let price = box.getAttribute('data-price');
        let bedrooms = box.getAttribute('data-bedrooms');
        let location = box.getAttribute('data-location');
  
        let matchesCriteria = true;
        if (selectedBedrooms !== 'Select Bedrooms' && selectedBedrooms !== bedrooms) {
            matchesCriteria = false;
        }
        if (selectedPrice !== 'Select Price Range' && !price.includes(selectedPrice)) {
            matchesCriteria = false;
        }
        if (selectedLocation !== 'Select Location' && selectedLocation !== location) {
            matchesCriteria = false;
        }
  
        box.style.display = matchesCriteria ? 'block' : 'none';
    });
  }
  