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

/* Populate Template Function */
function populateTemplate(elementId, template) {
    const targetElement = document.getElementById(elementId);

    // Verify target element and template exist
    if (targetElement && template) {
        // Append template content to target element
        targetElement.appendChild(template.content.cloneNode(true));
    } else {
        // Log warning if unsuccessful
        if (!targetElement) console.warn(`Target element ${elementId} not found. Skipping template.`);
        if (!template) console.warn(`Template ${template.id} not found in file.`);
    }
}

// Populate page
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

// Replace placeholders in Status array with User profile properties
export function formatStatus(status, userData) {

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