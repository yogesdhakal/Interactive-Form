// Selecting the DOM elements

const form = document.querySelector('form');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const creditCardNumber = document.querySelector('#cc-num');
const cvvNumber = document.querySelector('#cvv');
const zipcode = document.querySelector('#zip');
const jobRole = document.querySelector('#title');
const jobRoleOptions = document.querySelector('#title option');
const otherJobRole = document.querySelector('#other-job-role');
const design = document.querySelector('#design');
const color = document.querySelector('#color');
const colorOptions = color.children;
const activities = document.querySelector('#activities');
const activitiesCost = document.querySelector('#activities-cost');
let totalActivitiesCost = 0;
const payment = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');

// The initial state of the form as the page first loads

document.addEventListener( 'DOMContentLoaded', () => {

    // setting the focus property to true
    name.focus();

    // Hiding the 'Other job role' field
    otherJobRole.hidden = true;

    // Disabling the 'color' menu
    color.disabled = true;

    // Hide 'Paypal' and 'Bitcoin' sections
    paypal.hidden = true;
    bitcoin.hidden = true;

    // Setting 'Credit Card' option to 'selected' as default

    const creditCardOption = payment.querySelector('option[value="credit-card"]');
    creditCardOption.setAttribute('selected','true');


}
)


// Change event for 'Job Roles' 

jobRole.addEventListener('change', (e) => {

    const target = e.target;
    
    if (target.value === 'other'){
        otherJobRole.hidden = false;

    }
    else{
        otherJobRole.hidden = true;
    }
})

// Event for the ""T-Shirt Info" section"

design.addEventListener('change', (e) => {

    const target = e.target

    // Enabling 'Color' menu
    color.disabled = false;

    for (let i=1; i<colorOptions.length; i++) {
        const colorTheme = colorOptions[i].getAttribute('data-theme');

        colorOptions[0].textContent = 'Please select a color';
        color.value = 'Please select a color';

        if (target.value === colorTheme){
            colorOptions[i].hidden = false;
        }
        else{
            colorOptions[i].hidden = true;
        }
    }
});


// Register for Activities

activities.addEventListener('change', (e) => {
    const dataCost = +e.target.getAttribute('data-cost');
    const target = e.target;

    if(target.checked){
        totalActivitiesCost += dataCost;

    }
    else{
        totalActivitiesCost -= dataCost;
    }

    activitiesCost.innerHTML = `Total: $${totalActivitiesCost}`;
    activityFilter(target);

});


// The Payment Event

payment.addEventListener('change', (e) => {
    const target = e.target;
    const paymentMethods = [creditCard,paypal,bitcoin];

    for(let i=0; i<paymentMethods.length; i++){
        const paymentId = paymentMethods[i].getAttribute('id');

        if (target.value === paymentId){
            paymentMethods[i].hidden = false;
        }
        else{
            paymentMethods[i].hidden = true;
        }
    }

});


// Form Validation 

// Validation for Name

function nameValidation(){
    const nameValue = name.value;
    const nameValidator = /[a-zA-z]+/.test(nameValue);

    return nameValidator;
}

// Validation for Email 

function emailValidation() {
    const emailValue = email.value;
    const emailValidator = /^[a-z]+@[a-z]+\.com$/.test(emailValue);
  
    return emailValidator;
  }

  // Validation for Activities
function activitiesValidation() {
    const activitiesValidator = totalActivitiesCost > 0;
  
    return activitiesValidator;
  }

  // Validation for Credit Card
function creditCardValidation() {
    const isCardNumberValid = /^\d{13,16}$/.test(parseInt(creditCardNumber.value));
  
    return isCardNumberValid;
  }

  // Validation for zip code
function zipCodeValidation() {
    const isZipValid = /^\d{5}$/.test(parseInt(zipcode.value));
  
    return isZipValid;
  }
  
  //  Validation for CVV
  function cvvValidation() {
    const isCvvValid = /^\d{3}$/.test(parseInt(cvvNumber.value));
  
    return isCvvValid;
  }

  // Validation on Form Submission
function formSubmitValidation(isElementValid, element, e) {
    if (!isElementValid) {
      e.preventDefault();
      console.log('fail');
      element.parentElement.className = 'not-valid';
      element.parentElement.lastElementChild.style.display = 'inline';
    }
    else {
      console.log('pass')
      element.parentElement.className = 'valid';
      element.parentElement.lastElementChild.style.display = 'none';
    }
  }
  
  // Display error Messages
  function errorDisplay(element, type, validationType) {
    const inputLength = element.value.length;
  
    if (!validationType) {
      if (inputLength === 0) {
        element.parentElement.className = 'not-valid';
        element.parentElement.lastElementChild.style.display = 'inline';
        element.parentElement.lastElementChild.textContent = `${type} field cannot be blank`;
      }
      else if (inputLength > 0) {
        element.parentElement.className = 'not-valid';
        element.parentElement.lastElementChild.style.display = 'inline';
        element.parentElement.lastElementChild.textContent = `${type} must be formatted correctly`;
      }
    }
    else if (validationType) {
      element.parentElement.className = 'valid';
      element.parentElement.lastElementChild.style.display = 'none';
    }
  }
  
  /* -------------------------------------------------------------------------------- */
  
  // Steps for Extra Credit

  // Check to see if whether or not activies conflict with each other's day and time
  function activityFilter(targetElement) {
    const activitiesAll = activities.querySelectorAll('input[data-day-and-time]');
    
    if (targetElement.checked) {
      activitiesAll.forEach(activity => {
        if (activity !== targetElement && activity.getAttribute('data-day-and-time') === targetElement.getAttribute('data-day-and-time')) {
          activity.disabled = true;
          activity.parentElement.classList.add('disabled');
        }
      })
    }
    else {
      activitiesAll.forEach(activity => {
        if (activity !== targetElement && activity.getAttribute('data-day-and-time') === targetElement.getAttribute('data-day-and-time')) {
          activity.disabled = false;
          activity.parentElement.classList.remove('disabled');
        }
      })
    }
  }
  
  // Real-time error message (name field)
  name.addEventListener('keyup', (e) => {
    // Validate Name
    errorDisplay(name, 'Name', nameValidation());
  })