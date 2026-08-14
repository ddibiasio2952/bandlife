/*****************/
/* PROFILE PAGE */
/***************/

// Imports
import { getProfile, requireLogin } from "./api.js";

console.log("Current origin:", window.location.origin);

/* Check if User is logged in with Profile API call */

/* Check if User is logged in */
/*
const currentUser = await requireLogin();

if (currentUser) {
    console.log("Loading user.");

    // Load Profile
    document.body.classList.remove("authentication-pending");
    //await loadProfile();

} else {
// Redirect to login page
    window.location.href = "../login.html";
}

*/
try {
    // API call
    const profileData = await getProfile();

    if (profileData) {
        // Remove authentication pending class
        document.body.classList.remove("authentication-pending");
        // Populate page
        loadProfile(profileData);
    }
} catch (error) {
    console.error("Error loading profile:", error);

    // Redirect to login page
    window.location.href = "../login.html";
}


/* Load profile */
function loadProfile(userData) {
    // const userData = await 
    document.getElementById("band").textContent = userData.band;
    
    document.getElementById("genre").textContent = userData.genres[0];
    document.getElementById("members").textContent = userData.members;

    userData.releases.length === 0 ?
    document.getElementById("releases").textContent = 0 :
    document.getElementById("releases").textContent = userData.releases;
    
    document.getElementById("job").textContent = userData.job;
    document.getElementById("job-income").textContent = userData.jobIncome;

    document.getElementById("band-income").textContent = userData.bandIncome;
    document.getElementById("listeners").textContent = userData.listeners;
    document.getElementById("popularity").textContent = userData.popularity;
}