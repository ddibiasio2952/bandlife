/********************/
/* EVENT PLAY PAGE */
/******************/

// Imports
import { initializeAuthorizedPage, Roles } from "./auth.js";
import { loadEventAction, applyOutcome } from "./api.js";

/* Check if User is logged in with Profile API call */
// API call
const profileData = await initializeAuthorizedPage([
    Roles.USER,
    Roles.MODERATOR,
    Roles.ADMIN
]);

// Get Event Id from URL
const params = new URLSearchParams(window.location.search);
const eventId = params.get("id");

/* Load User's Events */
const loadedEvent = await loadEventAction(eventId);
console.log("Loaded Event", loadedEvent);

if (loadedEvent) {
    renderOptions(loadedEvent);
}

/* Populate Option Form */
function renderOptions(loadedEvent) {
    // Select and fill Event Name and Description Fields
    const nameField = document.querySelector("#name");
    nameField.innerHTML = loadedEvent.name;

    const descriptionField = document.querySelector("#description");
    descriptionField.innerHTML = loadedEvent.description;

    // Select container element for Event Options
    const container = document.getElementById("choose-option")
    container.innerHTML = "";

    // Create a container row for each Event Option
    loadedEvent.options.forEach((option, index) => {
        // Create container row elements
        const div = document.createElement("div");
        const button = document.createElement("button");
        button.textContent = "Go";

        // Add Event Listener to Option Button
        button.addEventListener("click", async () => {
            // Apply Outcome to User Data
            console.log("loadedEvent.id: ", loadedEvent.id, " option.id: ", option.id);
            try {
                const postedOption = await applyOutcome(loadedEvent.id, option.id);
                console.log(postedOption);
                window.location.href = "/pages/events";
            } catch (error) {
                console.error("Error sending option:", error);
            }
        });

        container.appendChild(button);

        const optionText = document.createElement("p");
        optionText.textContent = option.text;
        
        div.appendChild(optionText);
        div.appendChild(button);
        container.appendChild(div);
    });
}

/* Modified Data */
function getModifyData() {
    return {
        id: eventId,
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        options: [...document.querySelectorAll(".option")]
            .map(input => input.value.trim())
            .filter(value => value !== ""),
        outcomes: [...document.querySelectorAll(".outcome")]
            .map(input => input.value.trim())
            .filter(value => value !== ""),
    };
}