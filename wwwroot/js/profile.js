/*****************/
/* PROFILE PAGE */
/***************/

// Imports
import { initializeAuthorizedPage, Roles } from "./auth.js";

/* Check if User is logged in with Profile API call */
// API call
const profileData = await initializeAuthorizedPage([
    Roles.USER,
    Roles.MODERATOR,
    Roles.ADMIN
]);

if (profileData) {
    // Populate page
    loadProfile(profileData);
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