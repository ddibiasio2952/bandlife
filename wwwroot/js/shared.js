/*********************/
/* SHARED RESOURCES */
/*******************/

import { logoutUser } from "./api.js";

// Fetch HTML template
const templateResponse = await fetch("../templates/template.html");

// Convert response to plain text;
const templateHtml = await templateResponse.text();

// Create DOMParser object
const parser = new DOMParser();
// Parse HTML from text string to DOM elements
const template = parser.parseFromString(templateHtml, "text/html");

// Create constants for template elements from parsed HTML
const mainNavTemplate = template.getElementById("main-nav-template");
const mainFooterTemplate = template.getElementById("main-footer-template");

/* Populate Main Navbar */
function populateTemplate(elementId, template) {
    const targetElement = document.getElementById(elementId);

    // Verify target element and template exist
    if (targetElement && template) {
        targetElement.appendChild(template.content.cloneNode(true));
    } else {
        // Log warning if unsuccessful
        if (!targetElement) console.warn(`Target element ${elementId} not found. Skipping template.`);
        if (!template) console.warn(`Template ${template.id} not found in file.`);
    }
}

populateTemplate("main-nav", mainNavTemplate);
populateTemplate("main-footer", mainFooterTemplate);

/* Log Out Button Listener */
if (document.getElementById("main-nav")) {
    const logoutButton = document.getElementById("log-out");

    logoutButton.addEventListener("click", async () => {
        try {
            await logoutUser();

            console.log("Logout successful.");

            // Redirect to login page
            window.location.href = "../login.html";
        }
        catch (error) {
            console.error(error);
        }

    });
}