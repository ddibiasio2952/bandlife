/*******************/
/* EVENT ADD PAGE */
/*****************/

// Imports
import { initializeAuthorizedPage, Roles } from "./auth.js";
import { postEvent } from "./api.js";

/* Check if User is logged in with Profile API call */
// API call
const profileData = await initializeAuthorizedPage([
    Roles.MODERATOR,
    Roles.ADMIN
]);

// Get Add Event form element
const addEventForm = document.getElementById("add-event");

// Added all below to event-modify.js

/* Submit new Event Button */
addEventForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        // Read new Event form
        const eventData = readAddEventForm();

        if (eventData.options.length < 2) {
            throw new Error("The event must have at least two options.");
        }

        // API call
        const createdEvent = await postEvent(eventData);

        console.log(createdEvent);
        alert("Event creation successful!");

        // Redirect to Event List if successful
        window.location.href = "/pages/event-list";

    } catch (error) {
        console.error(error);
        alert("Unable to add Event.");
    }
});

/* Get new Event form data */
function readAddEventForm() {
    // Return new Event data from form
    return {
        name: document.getElementById("name").value.trim(),
        category: document.getElementById("category").value.trim(),
        description: document.getElementById("description").value.trim(),
        options: getEventOptions()
    };
}

// Get Event Options
function getEventOptions() {
    const optionClasses = [
        "option-one",
        "option-two",
        "option-three",
        "option-four"
    ];

    return optionClasses
        .map(optionClass => getEventOption(optionClass))
        .filter(option => option.text && option.outcome);
}

// Get Event Option
function getEventOption(optionClass) {
    const inputs = document.querySelectorAll(`.${optionClass}`);
    const option = {};

    inputs.forEach(input => {
        const propertyName = input.dataset.field;

        if (input.type === "number") {
            option[propertyName] = Number(input.value) || 0;
        } else {
            option[propertyName] = input.value.trim() || null;
        }
    });

    return option;
}