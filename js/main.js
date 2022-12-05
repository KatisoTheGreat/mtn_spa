function validateEmail(email) {
    return /^(\w+)([.-]\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(email);
}

function validatePassword(password) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
}

const steps = Array.from(document.querySelectorAll("form .step"));
var nextBtn = document.querySelectorAll("form .next-btn");
const backBtn = document.querySelectorAll("form .back-btn");
var submitBtn = document.querySelector("form .submit-btn");
const form = document.querySelector("form");
var email = document.getElementById("email");
var password = document.getElementById("password");
const emailInput = document.getElementById("email");
var myInput = document.getElementById("password");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

/* First Page*/

email.addEventListener("change", function (e) {
  email = e.target.value;
  emailValid = validateEmail(email);
  if (emailValid) {
    emailInput.classList.add("valid-feedback");
    nextBtn.disabled = false
    
    nextBtn.forEach((button) => {
      button.addEventListener("click", () => {
    
        changeStep("next");
      });
    });
  } else {
    emailDiv.classList.remove("invalid-feedback");
    nextBtn.disabled = true
    }
});

/* Second Page*/

// When the user clicks on the password field, show the message box
myInput.onfocus = function() {
  document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function() {
  document.getElementById("message").style.display = "none";
}

// When the user starts to type something inside the password field
myInput.onkeyup = function() {
  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if(myInput.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
}

  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if(myInput.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if(myInput.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  // Validate length
  if(myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
}

backBtn.forEach((button) => {
  button.addEventListener("click", () => {
    changeStep("back");
  });
});

password.addEventListener("password", function (e) {
  password = e.target.value;
  passwordValid = validatePassword(password);
  if (passwordValid) {
    submitBtn.disabled = false
  } else {
    submitBtn.disabled = true
    }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputs = [];
  form.querySelectorAll("input").forEach((input) => {
    const { name, value } = input;
    inputs.push({ name, value });
      // Initialize client
    var webAuth = new auth0.WebAuth({
      domain:       '',
      clientID:     ''
    });
    
    webAuth.signup({ 
      connection: 'Username-Password-Authentication', 
      email: '', 
      password: '',
      user_metadata: { plan: 'silver', team_id: 'a111' }
    }, function (err) { 
      if (err) return alert('Something went wrong: ' + err.message); 
        return alert('success signup without login!') 
    });
    alert("You have registered successfully");
  });
  console.log(inputs);
  form.reset();
});

function changeStep(btn) {
  let index = 0;
  const active = document.querySelector(".active");
  index = steps.indexOf(active);
  steps[index].classList.remove("active");
  if (btn === "next") {
    index++;
  } else if (btn === "back") {
    index--;
  }
  steps[index].classList.add("active");
}