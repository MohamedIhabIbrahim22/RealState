
function animateOnScroll(elements) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-in-bottom');
                observer.unobserve(entry.target);
            }
        });
    });


    elements.forEach((element) => {
        observer.observe(element);
    });
}

const images = document.querySelectorAll('img');
const rewards = document.querySelectorAll('.reward');
const c = document.querySelectorAll('.client');
const p = document.querySelectorAll('.carousel-caption');


animateOnScroll(images);
animateOnScroll(c);
animateOnScroll(p);
animateOnScroll(rewards);



document.addEventListener("DOMContentLoaded", function() {
  const navbar = document.querySelector(".navbar");
  const video = document.querySelector(".video");

  window.addEventListener("scroll", function() {
      if (window.scrollY > video.offsetHeight) {
          navbar.classList.add("navbar-scrolled");
      } else {
          navbar.classList.remove("navbar-scrolled");
      }
  });
});


function scheduleMeeting() {
  const meetingTime = document.getElementById('meeting-time').value;
  const customerName = document.getElementById('customer-name').value;
  const email = document.getElementById('email').value;

  // You can add further processing here, like sending the data to a server or displaying a confirmation message.
  
  // For demonstration, we'll display a confirmation message.
  const meetingResponse = document.getElementById('meeting-response');
  meetingResponse.style.display = 'block';
  meetingResponse.innerHTML = `Meeting scheduled for ${meetingTime} with ${customerName}. Confirmation email sent to ${email}.`;
}




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


 
  // Example user profile data
  const userProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    rewards: []
};

document.getElementById('join-us-btn').addEventListener('click', function() {
    // Add a reward to the user's profile
    userProfile.rewards.push("Reward 1");

    // Display a message to the user
    const messageBox = document.getElementById('message-box');
    const messageText = document.getElementById('message-text');
    messageText.textContent = "Congratulations " + userProfile.name + "! You have successfully joined our reward program.";
    messageBox.style.display = 'flex';

    // Hide the message box after 5 seconds
    setTimeout(function() {
        messageBox.style.display = 'none';
    }, 5000);
});

// Hide the message box when clicking outside of it
window.onclick = function(event) {
    const messageBox = document.getElementById('message-box');
    if (event.target == messageBox) {
        messageBox.style.display = 'none';
    }
}









document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel');
  const dots = document.querySelectorAll('.dot');
  
  function updateDots() {
    const index = Math.round(carousel.scrollLeft / carousel.clientWidth);
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  carousel.addEventListener('scroll', updateDots);
  updateDots(); // Initialize dots on load
  
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      carousel.scrollTo({ left: i * carousel.clientWidth, behavior: 'smooth' });
    });
  });
});




// Get the modal
var modal = document.getElementById("modal");

// Get the button that opens the modal
var btn = document.getElementById("openModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.getElementById('joinReward').addEventListener('click', async () => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    alert('Please login first');
    return;
  }

  const response = await fetch('/join-reward', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId })
  });

  if (response.ok) {
    alert('Successfully joined the reward program');
  } else {
    alert('Failed to join the reward program');
  }
});

async function loginUser(email, password) {
  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('userId', data.userId);
    alert('Login successful');
  } else {
    alert(data);
  }
}

async function signupUser(username, email, password) {
  const response = await fetch('/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });

  if (response.ok) {
    alert('Signup successful');
  } else {
    alert('Failed to signup');
  }
}