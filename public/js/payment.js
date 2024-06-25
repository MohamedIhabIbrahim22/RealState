window.onload = function() {
    const params = new URLSearchParams(document.location.search);
    let price = parseFloat(params.get("price"));
    let p1 = parseFloat(price);
    p1 -= price * (30 / 100);
    document.getElementById("pay-price1").innerHTML = Math.ceil(price * (30 / 100));
    document.getElementById("pay-price11").innerHTML = Math.ceil(p1 / 3);
    let p2 = parseFloat(price);
    p2 -= price * (25 / 100);
    document.getElementById("pay-price2").innerHTML = Math.ceil(price * (25 / 100));
    document.getElementById("pay-price22").innerHTML = Math.ceil(p2 / 8);
    let p3 = parseFloat(price);
    p3 -= price * (20 / 100);
    document.getElementById("pay-price3").innerHTML = Math.ceil(price * (20 / 100));
    document.getElementById("pay-price33").innerHTML = Math.ceil(p3 / 12);
  }
  
  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  
  function payvalidate() {
    var x = true;
    var name = document.getElementById("pay-name").value;
    var email = document.getElementById("pay-email").value;
    var address = document.getElementById("pay-adress").value;
    var tel = document.getElementById("tel-number").value;
    var city = document.getElementById("pay-city").value;
    var cname = document.getElementById("pay-cname").value;
    var cnum = document.getElementById("pay-cnum").value;
    var expmonth = document.getElementById("expmonth").value;
    var expyear = document.getElementById("expyear").value;
    var cvv = document.getElementById("cvv").value;
  
    if (name == "") {
      document.getElementById("pay-name-alert").innerHTML = "Name is empty";
      x = false;
    } else {
      document.getElementById("pay-name-alert").innerHTML = "";
    }
  
    if (!validateEmail(email) || email == "") {
      document.getElementById("pay-email-alert").innerHTML = "Email is empty or invalid";
      x = false;
    } else {
      document.getElementById("pay-email-alert").innerHTML = "";
    }
  
    if (address == "") {
      document.getElementById("pay-adress-alert").innerHTML = "Address is empty";
      x = false;
    } else {
      document.getElementById("pay-adress-alert").innerHTML = "";
    }
  
    if (tel == "" || isNaN(tel)) {
      document.getElementById("tel-number-alert").innerHTML = "Telephone number is empty or invalid";
      x = false;
    } else {
      document.getElementById("tel-number-alert").innerHTML = "";
    }
  
    if (city == "") {
      document.getElementById("pay-city-alert").innerHTML = "City is empty";
      x = false;
    } else {
      document.getElementById("pay-city-alert").innerHTML = "";
    }
  
    if (cname == "") {
      document.getElementById("pay-cname-alert").innerHTML = "Name is empty";
      x = false;
    } else {
      document.getElementById("pay-cname-alert").innerHTML = "";
    }
  
    if (cnum == "" || isNaN(cnum)) {
      document.getElementById("pay-cnum-alert").innerHTML = "Card number is empty or invalid";
      x = false;
    } else {
      document.getElementById("pay-cnum-alert").innerHTML = "";
    }
  
    if (expmonth == "" || isNaN(expmonth)) {
      document.getElementById("expmonth-alert").innerHTML = "Exp Month is empty or invalid";
      x = false;
    } else {
      document.getElementById("expmonth-alert").innerHTML = "";
    }
  
    if (expyear == "" || isNaN(expyear)) {
      document.getElementById("expyear-alert").innerHTML = "Exp Year is empty or invalid";
      x = false;
    } else {
      document.getElementById("expyear-alert").innerHTML = "";
    }
  
    if (cvv == "" || isNaN(cvv)) {
      document.getElementById("cvv-alert").innerHTML = "CVV is empty or invalid";
      x = false;
    } else {
      document.getElementById("cvv-alert").innerHTML = "";
    }
  
    if (x) {
      alert('Paid successfully');
    }
  }