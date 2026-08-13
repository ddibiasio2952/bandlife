/**********************/
/* REGISTRATION PAGE */
/********************/

// Imports
import { postUser } from "./api.js";

// Get Register form element
const registerForm = document.getElementById("register");

/* Get new User form data */
function readNewUserForm() {
    // Return new User data from form
    return {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,

        name: document.getElementById("name").value,
        band: document.getElementById("band").value,
        instrument: document.getElementById("instrument").value,
        genres: [...document.querySelectorAll(".genre")]
            .map(input => input.value.trim())
            .filter(value => value !== ""),
    };
}

/* Submit Registration */
registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Read new User form
    const password = document.getElementById("password").value;
    const confirmedPassword = document.getElementById("confirm-password").value;

    if (password !== confirmedPassword) {
        alert("Passwords do not match.");
        return;
    }

    const newUserData = readNewUserForm();

    try {
        // API call
        const createdUser = await postUser(newUserData);

        console.log(createdUser);

        // Redirect to Profile if successful
        window.location.href = './profile.html';

    }
    catch (error) {
        console.error(error);
        alert("Unable to register User.");
    }
});

