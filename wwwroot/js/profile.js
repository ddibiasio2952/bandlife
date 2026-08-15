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

// Populate page if profile data is available
if (profileData) {
    loadProfile(profileData);
    loadProfileText(profileData);
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

function loadProfileText(userData) {
    document.getElementById("profile-one").textContent = `
    ${userData.band} is a basement ${userData.genres[0]} band.
    The band boasts ${userData.members} members, with the leader and founding member ${userData.name} on ${userData.instrument} duties.
    The band currently has ${userData.releases.length} releases and ${userData.listeners} listeners.
    When asked about ${userData.band}'s music, the average person responds with, ${userData.popularity}
    `;
}