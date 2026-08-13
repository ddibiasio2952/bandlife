/***************/
/* LOGIN PAGE */
/*************/

// Imports
import { login } from "./api.js";


// Get Login button element
const loginForm = document.getElementById("login-form");

/* Login button */
loginForm.addEventListener("submit", async event => {
    event.preventDefault();

    // Read Login request
    const loginRequest = {
        email: document.getElementById("login-email").value,
        password: document.getElementById("login-password").value,
        rememberMe: document.getElementById("remember-me").checked
    };

    try {
        // API call with user credentials
        const userData = await login(loginRequest);

        // Redirect to Profile if successful
        console.log("Logged in:", userData);
        window.location.href = './pages/profile.html';

    } catch (error) {
        console.error(error);
        const errorMessage = document.getElementById("login-error-message");

        // Display error message if login fails 
        if (errorMessage) {
            errorMessage.textContent = error.message;
        }
    }
});