function validateUsername(username) {
    // Check if username is provided
    if (!username) {
        return "Username is required.";
    }

    // Check if username length is between 4 and 20 characters
    if (username.length < 4 || username.length > 20) {
        return "Username must be between 4 and 20 characters.";
    }

    // Check if username starts with a letter
    if (!/^[a-zA-Z]/.test(username)) {
        return "Username must start with a letter.";
    }

    // Check if username contains only alphanumeric characters and underscores
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        return "Username can only contain letters, numbers, and underscores.";
    }

    // If username passed all checks
    return true;
}

function validatePassword(password) {
    // Check if password is provided
    if (!password) {
        return "Password is required.";
    }

    // Check if password length is at least 8 characters
    if (password.length < 8) {
        return "Password must be at least 8 characters.";
    }

    // Check if password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        return "Password must contain at least one lowercase letter.";
    }

    // Check if password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one uppercase letter.";
    }

    // Check if password contains at least one digit
    if (!/[0-9]/.test(password)) {
        return "Password must contain at least one digit.";
    }

    // Check if password contains at least one special character
    if (!/[!@#\$%\^&\*\(\)_\+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
        return "Password must contain at least one special character.";
    }

    // If password passed all checks
    return true;
}

function validatePasswordConfirmation(passwordConfirmation, password) {
    // Check if passwordConfirmation is provided
    if (!passwordConfirmation) {
        return "Password confirmation is required.";
    }

    // Check if passwordConfirmation matches the original password
    if (passwordConfirmation !== password) {
        return "Password confirmation doesn't match.";
    }

    // If passwordConfirmation passed all checks
    return true;
}

function validateEmail(email) {
    if (!email) {
        return "Email is required.";
    }

    // Using a more comprehensive regex for email validation
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!re.test(email)) {
        return "Invalid email format.";
    }

    return true;
}

function displayValidation(input, message, type) {
  const successIcon = input.parentNode.querySelector(".icon-success");
  const errorIcon = input.parentNode.querySelector(".icon-error");
  const errorMessage = input.parentNode.querySelector(".error-message");
  if (type === "success") {
    //show success icon
    successIcon.classList.remove("hidden");
    errorIcon.classList.add("hidden");
    errorMessage.textContent = "";
  } else {
    //show error message and error icon
    successIcon.classList.add("hidden");
    errorIcon.classList.remove("hidden");
    errorMessage.textContent = message;
  }
}

function validateFields(input) {
  let message;
  switch (input.id) {
    case "username":
      message = validateUsername(input.value.trim());
      break;
    case "email":
      message = validateEmail(input.value.trim());
      break;
    case "password":
      message = validatePassword(input.value.trim());
      break;
    case "password-confirmation":
      const password = document.querySelector("#password").value.trim();
      message = validatePasswordConfirmation(input.value.trim(), password);
      break;
    default:
      break;
  }
  if (message === true) {
    displayValidation(input, "", "success");
  } else {
    displayValidation(input, message, "error");
  }
}

const form = document.querySelector(".form");
const fields = ["username", "email", "password", "password-confirmation"];
const inputs = fields.map((field) => document.querySelector(`#${field}`));

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    validateFields(input);
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  inputs.forEach((input) => validateFields(input));
});


// Update Date
function updateDateSelection(){
    let input = document.querySelector("#date")
    for(let i = 1; i<32; i++){
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        input.appendChild(option);
    }
}
function updateMonthSelection(){
    let input = document.querySelector("#month")
    monthDict = {1:"Jan", 2:"Feb", 3:"Mar", 4:"Apr", 5:"May", 6:"Jun",
                7:"Jul", 8:"Aug", 9:"Sep", 10:"Oct", 11:"Nov", 12:"Dec"}
    for(let value = 1; value< 13; value++){
        let option = document.createElement("option");
        option.value = value;
        option.textContent = monthDict[value];
        input.appendChild(option);
    }
}
function updateYearSelection(){
    let input = document.querySelector("#year")
    for(let i = 2023; i > 1990; i--){
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        input.appendChild(option);
    }
}

function validateFutureDate(year, month, date){
    const dob = new Date(year, month - 1, date);
    let today = new Date();
    if(dob > today) return false;
    return true;
}

function validateExistDateOfBirth(year, month, date) {
    maxDateInMonth = new Date(year, month, 0).getDate();
    console.log(`Last date of ${year} ${month} is ${maxDateInMonth}`)
    if (date > maxDateInMonth) return false
    return true;
  }

function validateUnder18(year, month, date){
    const dob = new Date(year, month - 1, date);
    let today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    let monthDiff = today.getMonth() - dob.getMonth();
    if(monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())){
        age--;
    }
    console.log(`Age is ${age}`);
    if(age < 18) return false;
    return true;
}

function validateAllBirthdayErrors(){
    const date = document.querySelector("#date").value;
    const month = document.querySelector("#month").value;
    const year = document.querySelector("#year").value;
    let element = document.querySelector(".birthday-input");
    let errorMessage = element.parentNode.querySelector(".error-message");
    errorMessage.innerHTML = '' // clear error message
  
    const validators = [
      { validator: validateFutureDate, 
        dedaultError: "Cannot select future date." },
      { validator: validateExistDateOfBirth, 
        dedaultError: "Date of birth is invalid." },
      { validator: validateUnder18, 
        dedaultError: "Age must be at least 18." }
    ];
  
    validators.forEach(({validator, dedaultError}) => {
      if (validator(year, month, date) !== true) {
        const e = document.createElement("div");
        e.textContent = dedaultError;
        errorMessage.appendChild(e);
      }
    }); 
}
updateDateSelection();
updateMonthSelection();
updateYearSelection();

birthday_input_ids = ["date", "month", "year"];
birthday_inputs = birthday_input_ids.map((field) => 
  document.querySelector(`#${field}`));
birthday_inputs.forEach((input) => {
    input.addEventListener("input", validateAllBirthdayErrors);
});
  
form.addEventListener("submit", (event) => {
    event.preventDefault();
    errorMessages = document.querySelectorAll(".error-message");
    console.log(Array.from(errorMessages).map((e) => e.textContent));
    checkAll = Array.from(errorMessages).every((e) => e.textContent === "");
    if (checkAll) {
      alert("Register successfully");
    }
});
  