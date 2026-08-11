/**********************/
/* EVENT MODIFY PAGE */
/********************/

// Imports
import { getEvent, modifyEvent } from "./api.js";

// Get Event Id from URL
const params = new URLSearchParams(window.location.search);
const eventId = params.get("id");

// Get Event form elements
const modifyButton = document.getElementById("modify-button");

// Get Event
const loadedEvent = await getEvent(eventId);

// Populate inputs form with Event data
populateForm(loadedEvent);

/* Populate Modification form */
function populateForm(loadedEvent) {
    // Populate form with Event data
    document.getElementById("id").value = loadedEvent.id;
    document.getElementById("name").value = loadedEvent.name;
    document.getElementById("category").value = loadedEvent.category;
    document.getElementById("description").value = loadedEvent.description;

    // Populate form with Event arrays
    populateArray(".options", loadedEvent.options);
    populateArray(".outcomes", loadedEvent.outcomes);
    populateArray(".members", loadedEvent.members);
    populateArray(".job", loadedEvent.job);
    populateArray(".job-income", loadedEvent.jobIncome);
    populateArray(".band-income", loadedEvent.bandIncome);
    populateArray(".popularity", loadedEvent.popularity);
    populateArray(".listeners", loadedEvent.listeners);
}

/* Populate Arrays in form */
function populateArray(selector, values) {
    // Get selector classes
    const inputs = document.querySelectorAll(selector);

    // Fill selector input fields with Event data
    inputs.forEach((input, index) => {
        input.value = values[index] ?? "";
    });
}

/* Get modified Event data */
function readModifyEventForm() {
    // Return modified Event data from form
    return {
        id: eventId,
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
        jobIncome: [...document.querySelectorAll(".job-income")]
            .map(input => input.value === "" ? "0" : input.value),
        bandIncome: [...document.querySelectorAll(".band-income")]
            .map(input => input.value === "" ? "0" : input.value),
        popularity: [...document.querySelectorAll(".popularity")]
            .map(input => input.value.trim())
            .filter(value => value !== ""),
        listeners: [...document.querySelectorAll(".listeners")]
            .map(input => input.value === "" ? "0" : input.value)
    };
}

/* Modify Event Button */
modifyButton.addEventListener("click", async () => {

    // Read modified Event form
    const modifiedEvent = readModifyEventForm(eventId);

    try {
        // API call
        await modifyEvent(modifiedEvent, eventId);

        // Redirect to Event List if successful
        window.location.href = 'event-list.html';

    } catch (error) {
        console.error(error);
        alert("Unable to modify Event.");
    }
});