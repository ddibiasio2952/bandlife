const eventTable = document.getElementById("event-table");
const eventTableHeader = document.getElementById("event-table-header");
const eventTableBody = document.getElementById("event-table-body");
/**/
const login = JSON.parse(localStorage.getItem("user"));
console.log(login);

/* Load User Data */
async function loadUser(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`)

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const userJson = await response.json();

        /* Update localStorage */
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(userJson));
        loadEvents(userJson);

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

        if (window.location.pathname === "/pages/list.html") {
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

        populateForm(eventQueue);
    } catch (error) {
        console.error(error);
    }
}

/* Populate Form */
function populateForm(eventQueue) {
    const tbody = document.querySelector("#event-table tbody");

    tbody.innerHTML = "";

    eventQueue.forEach(event => {
        const row = document.createElement("tr");
        const idCell = document.createElement("td");
        const nameCell = document.createElement("td");
        const rightCell = document.createElement("td");
        const button = document.createElement("button");

        /* Determine if Modify Page or Adventure Page */
        if (window.location.pathname === "/pages/list.html") {
            button.textContent = "Modify";
            button.addEventListener("click", () => {
                window.location.href = `modify.html?id=${event.id}`;
            });
        } else {
            button.textContent = "Go!";
            button.addEventListener("click", () => {
                window.location.href = `goevent.html?id=${event.id}`;
            });
        }

        idCell.textContent = event.id;
        nameCell.textContent = event.name;
        rightCell.appendChild(button);
        row.append(idCell, nameCell, rightCell);

        tbody.appendChild(row);
    });
}

/* Load Events */
/*
async function loadEvents() {
    try {
        const response = await fetch("/api/events");

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const loadedEvents = await response.json();
        populateForm(eventQueue);
    } catch (error) {
        console.error(error);
    }
}
*/

document.addEventListener("DOMContentLoaded", () => {
    loadUser(login.id);
});