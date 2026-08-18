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
    /*document.getElementById("bank-account").textContent = userData.bankAccount;
    document.getElementById("job-income").textContent = userData.jobIncome;

    document.getElementById("band-income").textContent = userData.bandIncome;*/
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

    // Handles release sentence
    if (userData.releases.length === 0) {
        paraOneSentThree = `The band currently has no releases and ${userData.listeners} listeners. `
    } else if (userData.releases.length === 1) {
        paraOneSentThree = `The band currently has 1 release and ${userData.listeners} listeners. `
    } else {
        `The band currently has ${userData.releases.length} releases and ${userData.listeners} listeners. `
    }

    // Display paragraph contents
    paragraphOne.textContent =
        paraOneSentOne + paraOneSentTwo + paraOneSentThree + paraOneSentFour;

    paragraphTwo.textContent = userData.status
        .map(status => formatStatus(status, userData))
        .join(" ");
/*
    userData.status.forEach(status => {
        const statusElement = document.createElement("span");
        statusElement.textContent = `${formatStatus(status, userData)} `;

        paragraphTwo.appendChild(statusElement);
    })*/

    //paragraphTwo.textContent = userData.status.join(" ");
}

// Replace placeholders in Status array with User profile properties
function formatStatus(status, userData) {
    return status.replace(
        /\{\{([a-zA-Z]\w*)(?:\[(\d+)\])?\}\}/g,
        (placeholder, propertyName, index) => {
            const propertyValue = userData[propertyName];

            if (propertyValue === undefined || propertyValue === null) {
                return placeholder;
            }

            if (index !== undefined) {
                if (!Array.isArray(propertyValue)) {
                    return placeholder;
                }

                return propertyValue[Number(index)] ?? placeholder;
            }

            if (
                typeof propertyValue === "string" ||
                typeof propertyValue === "number"
            ) {
                return String(propertyValue);
            }

            return placeholder;
        }
    );
}