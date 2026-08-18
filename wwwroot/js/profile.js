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
    document.getElementById("bank-account").textContent = userData.bankAccount;

    /*document.getElementById("job-income").textContent = userData.jobIncome;
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
        const latestStatus = userData.status.slice(userData.status.length - 4, userData.status.length);

        paragraphTwo.textContent = latestStatus
            .map(status => formatStatus(status, userData))
            .join(" ");
    }
    /*
    paragraphTwo.textContent = userData.status
        .map(status => formatStatus(status, userData))
        .join(" ");*/

    console.log("Length: ", userData.status.length - 4);
    console.log("Length: ", userData.status.length);
    
}

// Replace placeholders in Status array with User profile properties
function formatStatus(status, userData) {

    // String.replace() searches the status string for every placeholder
    // that matches this regular expression.
    return status.replace(

        // Match every placeholder as a {{string}} or {{array[0]}}
        /\{\{([a-zA-Z]\w*)(?:\[(\d+)\])?\}\}/g,

        // Run callback for each placeholder found
        (placeholder, propertyName, index) => {
            const propertyValue = userData[propertyName];

            // Leave the original string placeholder unchanged if property not found
            if (propertyValue === undefined || propertyValue === null) {
                return placeholder;
            }

            // Verify array placeholder
            if (index !== undefined) {

                // Leave the array placeholder unchanged if not index
                if (!Array.isArray(propertyValue)) {
                    return placeholder;
                }

                // Convert index to number and retrieve
                // Nullish returns the original placeholder if the array item is undefined or null.
                return propertyValue[Number(index)] ?? placeholder;
            }

            // Directly insert strings / numbers into the status text if no array index supplied
            if (
                typeof propertyValue === "string" ||
                typeof propertyValue === "number"
            ) {
                // Convert the value to a string
                return String(propertyValue);
            }

            // Leave the placeholder unchanged for unsupported values (arrays without an index, objects, bool)
            return placeholder;
        }
    );
}