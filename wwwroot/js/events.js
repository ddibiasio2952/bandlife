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
    // Populate page
    //loadProfile(profileData);
}

// Load Events
const loadedEvents = await getEvents();

// Determine which Events to show
eventChooser(loadedEvents, profileData);

/* Choose Next Events for User */
function eventChooser(loadedEvents, profileData) {
    // Initialize empty Event Queue
    let eventQueue;

    console.log("User's Events: ", profileData.events);
    console.log("Events: ", loadedEvents.length);

    // Conditional Processing for Event Queue
    if (profileData.events === 0) {
        /* Load only first event for new User */
        eventQueue = loadedEvents.splice(0, 1);

    } else if (profileData.events === 1) {
        /* Load member events */
        eventQueue = loadedEvents.splice(1, 3);

    } else if (profileData.events < loadedEvents.length) {
        eventQueue = loadedEvents.splice(profileData.events, profileData.events + 5);
    } else {
        return;
    }

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
