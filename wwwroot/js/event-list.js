// Added all below to event-modify.js

/* Load User Data */
async function loadUser(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`)

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        // Retrieve user data
        const userJson = await response.json();

        // Update localStorage
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(userJson));

        if (window.location.pathname === "/pages/event-list.html") {
            loadEvents(userJson);
        }

    } catch (error) {
        console.error(error);
    }
}

/* Load User's Events */
async function loadEvents(user) {
    try {
        const response = await fetch("/api/events");

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const loadedEvents = await response.json();
        let eventQueue;

        if (window.location.pathname === "/pages/event-list.html") {
            /* Load all events */
            eventQueue = loadedEvents;
        } else if (user.events === 0) {
            /* Load only first event */
            eventQueue = loadedEvents.splice(0, 1);
            console.log("You're just beginning!");
        } else if (user.events === 1) {
            /* Load member events */
            eventQueue = loadedEvents.splice(1, 3);
            console.log("eventQueue: " + eventQueue);
            console.log("loadedEvents: " + loadedEvents);
            console.log("You need members!");
        } else if (user.events >= loadedEvents.length) {
            /* Load only third event */
            //eventQueue = loadedEvents.splice(2, 3);
            alert("No events available.");
            return;
        }

        populateTable(eventQueue);
    } catch (error) {
        console.error(error);
    }
}

/* Populate Event Table */
function populateTable(eventQueue) {
    const tbody = document.querySelector("#event-table tbody");

    tbody.innerHTML = "";

    eventQueue.forEach(event => {
        const row = document.createElement("tr");
        const idCell = document.createElement("td");
        const nameCell = document.createElement("td");
        const rightCell = document.createElement("td");
        const button = document.createElement("button");

        /* Determine if Modify Page or Adventure Page */
        if (window.location.pathname === "/pages/event-list.html") {
            button.textContent = "Modify";
            button.addEventListener("click", () => {
                window.location.href = `event-modify.html?id=${event.id}`;
            });
        } else {
            button.textContent = "Go!";
            button.addEventListener("click", () => {
                window.location.href = `event-go.html?id=${event.id}`;
            });
        }

        idCell.textContent = event.id;
        nameCell.textContent = event.name;
        rightCell.appendChild(button);
        row.append(idCell, nameCell, rightCell);

        tbody.appendChild(row);
    });
}

/* Event List Load 
const login = JSON.parse(localStorage.getItem("user"));
console.log(login);
document.addEventListener("DOMContentLoaded", () => {
    // Load user Id from localStorage 
    loadUser(login.id);
});
*/