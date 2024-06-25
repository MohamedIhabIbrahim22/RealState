$(document).ready(function() {
  const signupForm = $('#signup-form');
  const emailInput = $('#email');
  const usernameInput = $('#username');
  const passwordInput = $('#password');
  const confirmPasswordInput = $('#confirm-password');
  const emailError = $('#email-error');
  const usernameError = $('#username-error');
  const passwordError = $('#password-error');
  const confirmPasswordError = $('#confirm-password-error');

  signupForm.on('submit', function(event) {
    event.preventDefault();

    const username = usernameInput.val();
    const email = emailInput.val();
    const password = passwordInput.val();
    const confirmPassword = confirmPasswordInput.val();

    // Clear previous errors
    emailError.text('');
    usernameError.text('');
    passwordError.text('');
    confirmPasswordError.text('');

    // Validate inputs
    if (!validateEmail(email)) {
      emailError.text('Invalid email address.').css('color', 'red');
      return;
    }

    if (!validatePassword(password)) {
      passwordError.text('Password must be at least 8 characters long and contain at least 1 capital letter and 1 number.').css('color', 'red');
      return;
    }

    if (password !== confirmPassword) {
      confirmPasswordError.text('Passwords do not match.').css('color', 'red');
      return;
    }

    $.ajax({
      url: '/signup',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ username, email, password }),
      success: function(response) {
        const successMessage = $('<div>').text('Successfully Signed up!').css('color', 'green');
        $('body').append(successMessage);
        setTimeout(() => {
          window.location.href = './';
        }, 1000);
      },
      error: function(jqXHR) {
        const result = jqXHR.responseJSON;
        if (jqXHR.status !== 200) {
          if (result.field === 'email') {
            emailError.text(result.message).css('color', 'red');
          } 
           if (result.field === 'username') {
            usernameError.text(result.message).css('color', 'red');
          }
        }
      }
    });
  });

  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  function validatePassword(password) {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordPattern.test(password);
  }

  emailInput.on('input', function() {
    emailError.text('');
  });

  usernameInput.on('input', function() {
    usernameError.text('');
  });

  passwordInput.on('input', function() {
    passwordError.text('');
  });

  confirmPasswordInput.on('input', function() {
    confirmPasswordError.text('');
  });
});
