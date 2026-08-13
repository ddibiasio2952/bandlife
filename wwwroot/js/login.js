/***************/
/* LOGIN PAGE */
/*************/

// Imports
import { getBandName, postUser } from "./api.js";


// Get Login button element
const loginButton = document.getElementById("submit-login");

/* Login button */
loginButton.addEventListener("click", async () => {
    // Read email and password from login
    const loginData = {
        email: document.getElementById("login-email").value,
        password: document.getElementById("login-password").value
    };

    try {
        // API call with band name
        const userData = await login(loginData);

        // Redirect to Home if successful
        window.location.href = './pages/profile.html';

    } catch (error) {
        console.error(error);
        alert("Unable to find band.");
    }
});