/*******************************/
/* EVENTS AND EVENT LIST PAGE */
/*****************************/

// Imports
import { requireLogin, requireRole } from "./auth.js";
import { getUser, getEvents } from "./api.js";

// Get current User data with User Id from localStorage
const storedLogin = JSON.parse(localStorage.getItem("user"));
const userData = await getUser(storedLogin.id);

// Load Events
const loadedEvents = await getEvents();

// Determine which Events to show
eventChooser(loadedEvents, userData);

/* Choose Next Events for User */
function eventChooser(loadedEvents, userData) {
    // Initialize empty Event Queue
    let eventQueue;

    console.log("User's Events: ", userData.events);
    console.log("Events: ", loadedEvents.length);

    // Conditional Processing for Event Queue
    if (window.location.pathname === "/ProtectedPages/event-list") {
        /* Load all events if Admin List Page */
        eventQueue = loadedEvents;

    } else if (userData.events === 0) {
        /* Load only first event for new User */
        eventQueue = loadedEvents.splice(0, 1);

    } else if (userData.events === 1) {
        /* Load member events */
        eventQueue = loadedEvents.splice(1, 3);

    } else if (userData.events < loadedEvents.length) {
        eventQueue = loadedEvents.splice(userData.events, userData.events + 5);
    } else {
        /* Load no Events if User is caught up */
        alert("No events available. Go write some music!");
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

        /* Determine if Modify Page or User Page */
        if (window.location.pathname === "/ProtectedPages/event-list") {
            // Create button to modify Event
            button.textContent = "Modify";
            button.addEventListener("click", () => {
                window.location.href = `/ProtectedPages/event-modify?id=${event.id}`;
            });
        } else {
            // Create button to play Event
            button.textContent = "Go!";
            button.addEventListener("click", () => {
                window.location.href = `/ProtectedPages/event-go?id=${event.id}`;
            });
        }

        // Update row elements
        idCell.textContent = event.id;
        nameCell.textContent = event.name;
        rightCell.appendChild(button);
        row.append(idCell, nameCell, rightCell);

        // Append row to table body
        tbody.appendChild(row);
    });
}
