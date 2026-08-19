/********************/
/* EVENT PLAY PAGE */
/******************/

// Imports
import { initializeAuthorizedPage, Roles } from "./auth.js";
import { loadEventAction, applyOutcome } from "./api.js";
import { formatStatus } from "./shared.js";

/* Check if User is logged in with Profile API call */
// API call
const profileData = await initializeAuthorizedPage([
    Roles.USER,
    Roles.MODERATOR,
    Roles.ADMIN
]);

// Get Event Id from URL
const params = new URLSearchParams(window.location.search);
const eventId = Number(params.get("id"));

// Popup modal for showing Option Outcome
const popupModal = document.getElementById("outcome-modal");
const outcomeText = document.getElementById("outcome-text");
const closeModal = document.getElementById("close-outcome-modal");

// Remove Outcome modal display and redirect
closeModal.addEventListener("click", () => {
    popupModal.classList.toggle("hidden");
    // Redirect to Events
    window.location.href = "/pages/events";
});

// Check if Event is completed
const eventAvailable = eventCompleteCheck(eventId, profileData.completedEventIds);

if (eventAvailable !== undefined) {
    console.log("Available");

    // Load Event 
    const loadedEvent = await loadEventAction(eventAvailable);

    // Populate page with Options if Event is loaded
    if (loadedEvent) {
        renderOptions(loadedEvent);
    }
} else {
    console.log("Completed");
    const descriptionField = document.querySelector("#description");
    descriptionField.classList.add("completed");
    descriptionField.innerHTML = "This event has already been completed.";
}

// Check if event is completed
function eventCompleteCheck(eventId, completedEventIds) {
    // Convert completedEventIds Array to Set for faster processing
    const completedEvents = new Set(completedEventIds ?? []);

    return completedEvents.has(eventId) ? undefined : eventId;
}

/* Populate Option Selector */
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
            // console.log("loadedEvent.id: ", loadedEvent.id, " option.id: ", option.id); Debug
            try {
                const postedOption = await applyOutcome(loadedEvent.id, option.id);

                // Format outcome
                const formattedOutcome = formatStatus(postedOption.outcome, profileData);

                console.log(formattedOutcome);
                // Show Outcome modal
                outcomeText.innerHTML = formattedOutcome;
                popupModal.classList.remove("hidden");
                popupModal.scrollIntoView({ behavior: "smooth", block: "center" });

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