
let representatives = [
    {firstName:"Rep", lastName:"Smith", password:"!Abc123", id:"1000", phone:"555-123-4567 ext 123", email:"rep0@mou.com"},
    {firstName:"Mary", lastName:"Brown", password:"@Mary12", id:"1001", phone:"555-123-4568 ext 124", email:"mary@mou.com"},
    {firstName:"John", lastName:"Jones", password:"#John12", id:"1002", phone:"555-123-4569 ext 125", email:"john@mou.com"},
    {firstName:"Lisa", lastName:"Davis", password:"$Lisa12", id:"1003", phone:"555-123-4570 ext 126", email:"lisa@mou.com"},
    {firstName:"Anna", lastName:"Wilson", password:"%Anna12", id:"1004", phone:"555-123-4571 ext 127", email:"anna@mou.com"},
    {firstName:"Mark", lastName:"Taylor", password:"&Mark12", id:"1005", phone:"555-123-4572 ext 128", email:"mark@mou.com"},
    {firstName:"Jane", lastName:"Thomas", password:"*Jane12", id:"1006", phone:"555-123-4573 ext 129", email:"jane@mou.com"},
    {firstName:"Eric", lastName:"Moore", password:"!Eric12", id:"1007", phone:"555-123-4574 ext 130", email:"eric@mou.com"},
    {firstName:"Sara", lastName:"White", password:"@Sara12", id:"1008", phone:"555-123-4575 ext 131", email:"sara@mou.com"},
    {firstName:"Paul", lastName:"Green", password:"#Paul12", id:"1009", phone:"555-123-4576 ext 132", email:"paul@mou.com"}
];


let lastNames = [
    "Smith", "Brown", "Jones", "Williams", "Davis",
    "Wilson", "Taylor", "Thomas", "Moore", "Jackson"
];

for (let i = 0; i < 10; i++) {
    representatives.push({
        firstName: "Rep",
        lastName: lastNames[i],
        password: "!Abc123",
        id: String(1000 + i),
        phone: "555-123-4567 ext 123",
        email: "rep" + i + "@mou.com"
    });
}

function showPassword() {
    let password = document.getElementById("password");

    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}

function showError(id, message) {
    alert(message);
    let field = document.getElementById(id);
    field.focus();
    if (field.select) {
        field.select();
    }
}

document.getElementById("loginForm").onsubmit = function(event) {
    event.preventDefault();
    validate();
};

function validate() {
    let firstName = document.getElementById("firstName").value.trim();
    let lastName = document.getElementById("lastName").value.trim();
    let password = document.getElementById("password").value;
    let repID = document.getElementById("repID").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    let confirmEmail = document.getElementById("emailConfirm").checked;
    let transaction = document.getElementById("transaction").value;

    let namePattern = /^[A-Za-z]+(?:[' -][A-Za-z]+)*$/;
    let passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])[^ \t\r\n]{3,7}$/;
    let idPattern = /^[0-9]{4}$/;
    let phonePattern = /^[0-9]{3}[- ]?[0-9]{3}[- ]?[0-9]{4}\s*(?:ext\.?|x)\s*[0-9]+$/i;
    let emailPattern = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,5}$/;

    if (!namePattern.test(firstName)) {
        showError("firstName", "Enter a valid first name using letters.");
        return;
    }

    if (!namePattern.test(lastName)) {
        showError("lastName", "Enter a valid last name using letters.");
        return;
    }

    if (!passwordPattern.test(password)) {
        showError("password", "Password must start with a special character, contain an uppercase letter and number, and have no more than 7 characters.");
        return;
    }

    if (!idPattern.test(repID)) {
        showError("repID", "Representative ID must contain exactly 4 digits.");
        return;
    }

    if (!phonePattern.test(phone)) {
        showError("phone", "Enter a 10-digit phone number with an extension, such as 555-123-4567 ext 123.");
        return;
    }

    if (confirmEmail && !emailPattern.test(email)) {
        showError("email", "Enter a valid email address because email confirmation is requested.");
        return;
    }

    if (transaction === "") {
        showError("transaction", "Please select a transaction.");
        return;
    }

    verify(firstName, lastName, password, repID, phone, email, confirmEmail, transaction);
}

function verify(firstName, lastName, password, repID, phone, email, confirmEmail, transaction) {
    let found = false;

    for (let i = 0; i < representatives.length; i++) {
        let rep = representatives[i];

        if (
            rep.firstName === firstName &&
            rep.lastName === lastName &&
            rep.password === password &&
            rep.id === repID &&
            rep.phone === phone &&
            (!confirmEmail || rep.email === email)
        ) {
            found = true;
            break;
        }
    }

    if (found) {
        alert("Welcome " + firstName + " " + lastName +
              "! Transaction: " + transaction);
    } else {
        alert("Account for " + firstName + " " + lastName +
              " cannot be found.");
    }
}
