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


const loginForm = document.getElementById('login-form');
const passwordInputLogin = document.getElementById('password');
const passwordErrorLogin = document.getElementById('password-error');

loginForm.addEventListener('submit', (event) => {
event.preventDefault();

const email = document.getElementById('email').value;
const password = passwordInputLogin.value;

if (!validateEmail(email)) {
  errorMessage.className = 'alert2';
  errorMessage.innerHTML = 'Invalid email or password. Please try again. <span class="close-btn2" onclick="this.parentElement.style.display=\'none\'">&times;</span>';
  return;
}

if (!validatePassword(password)) {
  passwordErrorLogin.textContent = 'Password must be at least 8 characters long and contain at least 1 capital letter and 1 number.';
  passwordErrorLogin.style.color = 'red';
  return;
} else {
  passwordErrorLogin.textContent = '';
}

if (email === 'Abdelrahman@gmail.com' && password === 'Abdelrahman1') {
  const successMessage = document.createElement('div');
  successMessage.textContent = 'Successfully Logged in';
  successMessage.style.color = 'green';
  document.body.appendChild(successMessage);

  setTimeout(function () {
      window.location.href = 'History1.html';
  }, 1000);
} 
else if (email === 'Mazhar@gmail.com' && password === 'Mazhar123') {
  const successMessage = document.createElement('div');
  successMessage.textContent = 'Successfully Logged in';
  successMessage.style.color = 'green';
  document.body.appendChild(successMessage);

  setTimeout(function () {
    window.location.href = 'History2.html';
  }, 1000);
}
else if (email === 'Omar@gmail.com' && password === 'OmarOmar3') {
  const successMessage = document.createElement('div');
  successMessage.textContent = 'Successfully Logged in';
  successMessage.style.color = 'green';
  document.body.appendChild(successMessage);

  setTimeout(function () {
    window.location.href = 'Historyno5.html';
  }, 1000);
}

else {
  const errorMessage = document.createElement('div');
  errorMessage.className = 'alert2';
  errorMessage.innerHTML = 'Invalid email or password. Please try again. <span class="close-btn2" onclick="this.parentElement.style.display=\'none\'">&times;</span>';
  document.body.appendChild(errorMessage);
  setTimeout(() => {
      errorMessage.style.display = 'none';
  }, 1000);
}
});

function validateEmail(email) {
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return emailPattern.test(email);
}

function validatePassword(password) {
const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
return passwordPattern.test(password);
}

passwordInputLogin.addEventListener('input', () => {
passwordErrorLogin.textContent = '';
});


