/***************/
/* LOGIN PAGE */
/*************/

// Imports
import { getBandName, postUser } from "./api.js";


// Get Login modal and form elements
// const loginForm = document.getElementById("login");

const loginButton = document.getElementById("submit-login");

/* Search login button */
loginButton.addEventListener("click", async () => {
    // Read band name from login modal
    const bandName = document.getElementById("login-band").value;
    try {
        // API call with band name
        const userData = await getBandName(bandName);

        // Store User data to localStorage
        localStorage.setItem("user", JSON.stringify(userData));

        // Redirect to Home if successful
        window.location.href = './pages/profile.html';

    } catch (error) {
        console.error(error);
        alert("Unable to find band.");
    }
});