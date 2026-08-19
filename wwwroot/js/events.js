/*******************************/
/* EVENTS AND EVENT LIST PAGE */
/*****************************/

// Imports
import { getEvents } from "./api.js";
import { initializeAuthorizedPage, Roles } from "./auth.js";

/* Check if User is logged in with Profile API call */
// API call
const profileData = await initializeAuthorizedPage([
    Roles.USER,
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
    // Convert completedEventIds Array to Set for faster processing
    const completedEvents = new Set(profileData.completedEventIds ?? []);

    // Conditional Processing for Event Queue
    if (completedEvents.size === 0) {
        // Load only first event for new User
        eventQueue = loadedEvents.slice(0, 1);

    } else if (completedEvents.size <= 2) {
        // Load events for getting members
        eventQueue = loadedEvents.slice(1, 3);

    } else if (completedEvents.size < loadedEvents.length) {
        // Load events in batches of 3 if User's completed events is less than total event count
        eventQueue = loadedEvents;
    } else {
        // Load no events if the User's completed events is greater than the total event count
        // Clear event table and display message
        clearEventTable();
        return;
    }

    // Filter completed events from Event Queue
    const remainingEvents = eventFilter(eventQueue, completedEvents);

    // Send Event Queue to table
    populateEventTable(remainingEvents);
}

/* Filter completed events from Event Queue */
function eventFilter(eventQueue, completedEvents) {
    return eventQueue.filter(event => !completedEvents.has(event.id)).slice(0, 3);
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
        const rightCell = document.createElement("td");
        const button = document.createElement("button");

        button.textContent = "Go!";
        button.addEventListener("click", () => {
            window.location.href = `/pages/event-go?id=${event.id}`;
        });

        // Update row elements
        idCell.textContent = event.id;
        nameCell.textContent = event.name;
        rightCell.appendChild(button);
        row.append(idCell, nameCell, rightCell);

        // Append row to table body
        tbody.appendChild(row);
    });
}

/* Clear Event Table */
function clearEventTable() {
    // Remove Event table
    const article = document.querySelector(".content");
    article.innerHTML = "";

    // Initialize container and text element
    const div = document.createElement("div");
    div.id = "outcome-info";

    // Initialize text element, add info for CSS styling and text
    const span = document.createElement("span");
    span.id = "description";
    span.classList.add("completed");
    span.textContent = "No events available.";

    // Append container and text to container
    div.appendChild(span);
    article.appendChild(div);
}