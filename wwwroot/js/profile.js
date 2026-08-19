/*****************/
/* PROFILE PAGE */
/***************/

// Imports
import { initializeAuthorizedPage, Roles } from "./auth.js";
import { formatStatus } from "./shared.js";

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
    
}


/* Load profile */
function loadProfile(userData) {
    document.getElementById("band").textContent = userData.band;
    
    document.getElementById("genre").textContent = userData.genres[0];
    document.getElementById("members").textContent = userData.members;

    userData.releases.length === 0 ?
    document.getElementById("releases").textContent = 0 :
        document.getElementById("releases").textContent = userData.releases;

    document.getElementById("job").textContent = userData.job;
    document.getElementById("bank-account").textContent = `$${userData.bankAccount}`;


    document.getElementById("listeners").textContent = userData.listeners;
    document.getElementById("popularity").textContent = userData.popularity;

    loadProfileTextConditional(userData);
}

// Conditional flow for profile text
function loadProfileTextConditional(userData) {
    const paragraphOne = document.getElementById("profile-one");
    const paragraphTwo = document.getElementById("profile-two");

    let paraOneSentOne = "";
    let paraOneSentTwo = "";
    let paraOneSentThree = "";
    let paraOneSentFour = "";


    // Conditional structure for paragraph one
    // Handles fame in sentences one and four
    if (userData.listeners < 100) {
        paraOneSentOne = `${userData.band} is a basement ${userData.genres[0]} band. `;
        paraOneSentFour = `When asked about ${userData.band}'s music, the average person responds with, ${userData.popularity}`
    } else {
        paraOneSentOne = `${userData.band} is a ${userData.genres[0]} band. `;
        paraOneSentFour = `When asked about ${userData.band}'s music, the average person responds with, ${userData.popularity}`
    }

    // Handles members sentence
    if (userData.members < 2) {
        paraOneSentTwo = `The band only features the founding member ${userData.name} on ${userData.instrument} duties. `
    } else {
        paraOneSentTwo = `The band boasts ${userData.members} members. The leader and founding member is ${userData.name} on ${userData.instrument} duties. `
    }

    // Handles releases and listeners sentence
    if (userData.releases.length === 0) {
        paraOneSentThree = `The band currently has 0 releases and ${userData.listeners} listeners. `
    } else if (userData.releases.length === 1) {
        paraOneSentThree = `The band currently has 1 release and ${userData.listeners} listeners. `
    } else {
        `The band currently has ${userData.releases.length} releases and ${userData.listeners} listeners. `
    }

    // Display paragraph one contents
    paragraphOne.textContent =
        paraOneSentOne + paraOneSentTwo + paraOneSentThree + paraOneSentFour;


    // Display paragraph two contents
    if (userData.status.length > 4) {
        // Show only last four statuses if > 4
        const latestStatus = userData.status.slice(userData.status.length - 4, userData.status.length);

        paragraphTwo.textContent = latestStatus
            .map(status => formatStatus(status, userData))
            .join(" ");
    } else {
        // Show all available statuses if <= 4
        paragraphTwo.textContent = userData.status
            .map(status => formatStatus(status, userData))
            .join(" ");
    }
}

