
let representatives = [];

for (let i = 0; i < 10; i++) {
    representatives.push({
        firstName: "Rep",
        lastName: "UserA",
        password: "!Abc123",
        id: String(1000 + i),
        phone: "555-123-4567",
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
    field.select();
}

function validateForm() {
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
    let phonePattern = /^[0-9]{3}[- ]?[0-9]{3}[- ]?[0-9]{4}(?:\s*(?:x|ext\.?)\s*[0-9]+)?$/i;
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
        showError("password", "Password must be at most 7 characters and contain an uppercase letter, a number, and a special character. It must begin with a special character.");
        return;
    }

    if (!idPattern.test(repID)) {
        showError("repID", "Representative ID must contain exactly 4 digits.");
        return;
    }

    if (!phonePattern.test(phone)) {
        showError("phone", "Enter a valid 10-digit phone number and extension.");
        return;
    }

    if (confirmEmail && !emailPattern.test(email)) {
        showError("email", "Enter a valid email address, such as name@example.com.");
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
            rep.phone.replace(/\D/g, "") === phone.replace(/\D/g, "").slice(0, 10) &&
            (!confirmEmail || rep.email === email)
        ) {
            found = true;
            break;
        }
    }

    if (found) {
        alert("Welcome " + firstName + " " + lastName + "! Transaction: " + transaction);
    } else {
        alert("Account for " + firstName + " " + lastName + " cannot be found.");
    }
}
