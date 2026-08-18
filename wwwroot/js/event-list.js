/*******************************/
/* EVENTS AND EVENT LIST PAGE */
/*****************************/

// Imports
import { getEvents } from "./api.js";
import { initializeAuthorizedPage, Roles } from "./auth.js";

/* Check if User is logged in with Profile API call */
// API call
const profileData = await initializeAuthorizedPage([
    Roles.MODERATOR,
    Roles.ADMIN
]);

if (profileData) {
    // Load Events
    const loadedEvents = await getEvents();
    // Determine which Events to show
    eventChooser(loadedEvents, profileData);
} 

/* Choose Next Events for User */
function eventChooser(loadedEvents, profileData) {
    // Initialize empty Event Queue
    let eventQueue;

    console.log("User's Events: ", profileData.events);
    console.log("Events: ", loadedEvents.length);

    eventQueue = loadedEvents;

    // Send Event Queue to table
    populateEventTable(eventQueue);
}

/* Populate Event Table */
function populateEventTable(eventQueue) {
    // Initialize and clear Event table body container
    const tbody = document.querySelector("#event-table tbody");
    tbody.innerHTML = "";

    // Create Event row
    eventQueue.forEach(event => {
        // Initialize row elements
        const row = document.createElement("tr");
        const idCell = document.createElement("td");
        const nameCell = document.createElement("td");
        const buttonCell = document.createElement("td");
        const button = document.createElement("button");

        button.textContent = "Modify";
        button.addEventListener("click", () => {
            window.location.href = `/pages/event-modify?id=${event.id}`;
        });

        // Update row elements
        idCell.textContent = event.id;
        nameCell.textContent = event.name;
        buttonCell.appendChild(button);
        row.append(idCell, nameCell, buttonCell);

        // Append row to table body
        tbody.appendChild(row);
    });
}
