import { postEvent } from "./api.js";

const addEventForm = document.getElementById("add-event");

// Added all below to event-modify.js

/*******************/
/* EVENT ADD PAGE */
/*****************/

/* Submit new Event Button */
addEventForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Read new Event form
    const eventData = readAddEventForm();

    try {
        // API call
        const createdEvent = await postEvent(eventData);

        console.log(createdEvent);
        alert("Event creation successful!");

        // Redirect to Event List if successful
        window.location.href = './event-list.html';

    } catch (error) {
        console.error(error);
        alert("Unable to add Event.");
    }
});

/* Get new Event form data */
function readAddEventForm() {
    // Return new Event data from form
    return {
        name: document.getElementById("name").value,
        category: document.getElementById("category").value,
        description: document.getElementById("description").value,
        options: [...document.querySelectorAll(".options")]
            .map(input => input.value.trim())
            .filter(value => value !== ""),
        outcomes: [...document.querySelectorAll(".outcomes")]
            .map(input => input.value.trim())
            .filter(value => value !== ""),
        members: [...document.querySelectorAll(".members")]
            .map(input => input.value === "" ? "0" : input.value),
        job: [...document.querySelectorAll(".job")]
            .map(input => input.value.trim())
            .filter(value => value !== ""),
        jobincome: [...document.querySelectorAll(".job-income")]
            .map(input => input.value === "" ? "0" : input.value),
        bandincome: [...document.querySelectorAll(".band-income")]
            .map(input => input.value === "" ? "0" : input.value),
        popularity: [...document.querySelectorAll(".popularity")]
            .map(input => input.value.trim())
            .filter(value => value !== ""),
        listeners: [...document.querySelectorAll(".listeners")]
            .map(input => input.value === "" ? "0" : input.value)
    };
}