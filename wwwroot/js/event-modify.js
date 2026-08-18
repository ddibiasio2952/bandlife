/**********************/
/* EVENT MODIFY PAGE */
/********************/

// Imports
import { initializeAuthorizedPage, Roles } from "./auth.js";
import { getEvent, modifyEvent, modifyOption } from "./api.js";

/* Check if User is logged in with Profile API call */
// API call
const profileData = await initializeAuthorizedPage([
    Roles.MODERATOR,
    Roles.ADMIN
]);

// Get Event Id from URL
const params = new URLSearchParams(window.location.search);
const eventId = params.get("id");

// Get Event form elements
const modifyEventButton = document.getElementById("modify-event-button");
const modifyOptionButton = document.getElementById("modify-option-button");

// Popup modal for editing option
const popupModal = document.getElementById("modify-modal");
const closeModal = document.getElementById("close-modal");
// Remove modal display
closeModal.addEventListener("click", () => {
    popupModal.classList.toggle("hidden");
});

// Get Event
const loadedEvent = await getEvent(eventId);

// Populate inputs form with Event data
populateForm(loadedEvent);

/* Populate modification form */
function populateForm(loadedEvent) {
    // Populate form with Event data
    document.getElementById("id").value = loadedEvent.id;
    document.getElementById("name").value = loadedEvent.name;
    document.getElementById("category").value = loadedEvent.category;
    document.getElementById("description").value = loadedEvent.description;

    // Initialize and clear Event Option table body container
    const tbody = document.querySelector("#event-table tbody");
    tbody.innerHTML = "";

    loadedEvent.options.forEach((option, index) => {
        const row = document.createElement("tr");
        const idCell = document.createElement("td");
        const optionCell = document.createElement("td");
        const buttonCell = document.createElement("td");
        const button = document.createElement("button");
        button.type = "button";

        button.textContent = "Modify";
        button.addEventListener("click", () => {
            popupModal.classList.remove("hidden");
            popupModal.scrollIntoView({ behavior: 'smooth', block: 'center' });
            console.log(option);
            //popupModal.style.display = 'block';
            showModifyOption(option);
        });

        // Update row elements
        idCell.textContent = option.id;
        optionCell.textContent = option.text;
        buttonCell.appendChild(button);
        row.append(idCell, optionCell, buttonCell);

        // Append row to table body
        tbody.appendChild(row);
    });
}

/* Populate Option Table */
function showModifyOption(option) {
    console.log(option.eventId);
    // Populate form with Option data
    const optionId = document.getElementById("option-id").value = option.id;
    const optionText = document.getElementById("option").value = option.text;
    const outcomeText = document.getElementById("outcome").value = option.outcome;
    const members = document.getElementById("members").value = option.membersModifier;
    const job = document.getElementById("job").value = option.newJob;
    const jobIncome = document.getElementById("job-income").value = option.jobIncomeModifier;
    const bandIncome = document.getElementById("band-income").value = option.bandIncomeModifier;
    const popularity = document.getElementById("popularity").value = option.newPopularityLevel;
    const listeners = document.getElementById("listeners").value = option.listenersModifier;
    const eventId = document.getElementById("event-id").value = option.eventId;
}

/*****************/
/* MODIFY EVENT */
/***************/

/* Get modified Event data */
function readModifyEventForm() {
    // Return modified Event data from form
    return {
        id: eventId,
        name: document.getElementById("name").value,
        category: document.getElementById("category").value,
        description: document.getElementById("description").value,
    };
}

/* Modify Event Button */
modifyEventButton.addEventListener("click", async () => {

    // Read modified Event form
    const modifiedEvent = readModifyEventForm(eventId);

    try {
        // API call
        await modifyEvent(modifiedEvent);

        // Redirect to Events
        window.location.href = "/pages/event-list";
    } catch (error) {
        console.error(error);
        alert("Unable to modify Event.");
    }
});

/******************/
/* MODIFY OPTION */
/****************/

/* Get modified Option data */
function readModifyOptionForm() {
    // Return modified Event data from form
    // UpdateEventOptionDto
    return {
        id: document.getElementById("option-id").value,
        text: document.getElementById("option").value,
        outcome: document.getElementById("outcome").value,
        membersModifier: document.getElementById("members").value,
        newJob: document.getElementById("job").value,
        jobIncomeModifier: document.getElementById("job-income").value,
        bandIncomeModifier: document.getElementById("band-income").value,
        newPopularityLevel: document.getElementById("popularity").value,
        listenersModifier: document.getElementById("listeners").value,
        //eventId: document.getElementById("event-id").value
    };
}

/* Modify Option Button */
modifyOptionButton.addEventListener("click", async () => {

    // Read modified Event form
    const modifiedOption = readModifyOptionForm(eventId);

    try {
        // API call
        await modifyOption(modifiedOption);
        // Hide modal
        popupModal.classList.toggle("hidden");

        // Get Event
        const refreshedEvent = await getEvent(eventId);

        // Populate inputs form with Event data
        populateForm(refreshedEvent);

        // Popup
        alert("Modification successful.");
    } catch (error) {
        console.error(error);
        alert("Unable to modify Event Option.");
    }
});