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
        name: document.getElementById("name").value,
        band: document.getElementById("band").value,
        instrument: document.getElementById("instrument").value,
        genres: [...document.querySelectorAll(".genre")]
            .map(input => input.value.trim())
            .filter(value => value !== ""),
        status: [],
        members: 1,
        events: 0,
        job: "Jobless",
        jobincome: 0,
        bandincome: 0,
        popularity: "\"Who?\"",
        listeners: 0,
        releases: []
    };
}

/* Submit Registration */
registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Read new User form
    const newUserData = readNewUserForm();

    try {
        // API call
        const newUser = await postUser(newUserData);

        console.log(newUser);
        // Store User data to localStorage
        localStorage.setItem("user", JSON.stringify(newUser));

        // Redirect to Home if successful
        window.location.href = './pages/home.html';

    }
    catch (error) {
        console.error(error);
        alert("Unable to register User.");
    }
});

