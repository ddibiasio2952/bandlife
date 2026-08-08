const modifyEventForm = document.getElementById("modify-event");
const params = new URLSearchParams(window.location.search);
const eventId = params.get("id");
const modifyButton = document.getElementById("modify-button");

/* SHARED FUNCTIONS */ 
/* Load User Data */ // API
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

        // Load Event list if on Event List page
        if (window.location.pathname === "/pages/event-list.html") {
            loadEvents(userJson);
        } else {
            return userJson;
        }
    } catch (error) {
        console.error(error);
    }
}

/**********************/
/* EVENT MODIFY PAGE */
/********************/

/* Load Event by Id */
async function loadEvent(eventId) {
    try {
        const response = await fetch(`/api/events/${eventId}`);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const loadedEvent = await response.json();

        // Fill Event Modify Form
        populateForm(loadedEvent);
        
    } catch (error) {
        console.error(error);
    }
}

/* Populate Modification Form */
function populateForm(loadedEvent) {
    // Populate from Event data
    document.getElementById("id").value = loadedEvent.id;
    document.getElementById("name").value = loadedEvent.name;
    document.getElementById("description").value = loadedEvent.description;

    // Populate from Event arrays
    populateArray(".options", loadedEvent.options);
    populateArray(".outcomes", loadedEvent.outcomes);
    populateArray(".members", loadedEvent.members);
    populateArray(".job", loadedEvent.job);
    populateArray(".jobincome", loadedEvent.jobincome);
    populateArray(".bandincome", loadedEvent.bandincome);
    populateArray(".popularity", loadedEvent.popularity);
    populateArray(".listeners", loadedEvent.listeners);
}

/* Populate Arrays in Form */
function populateArray(selector, values) {
    // Get selector classes
    const inputs = document.querySelectorAll(selector);

    // Fill selector input fields with Event data
    inputs.forEach((input, index) => {
        input.value = values[index] ?? "";
    });
}

/* Get Modified Event Data */
function getModifyEvent() {
    return {
        id: eventId,
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        options: [...document.querySelectorAll(".option")]
            .map(input => input.value.trim())
            .filter(value => value !== ""),
        outcomes: [...document.querySelectorAll(".outcome")]
            .map(input => input.value.trim())
            .filter(value => value !== ""),
        members: [...document.querySelectorAll(".members")]
            .map(input => input.value)
            .filter(value => value !== 0),
        job: [...document.querySelectorAll(".job")]
            .map(input => input.value.trim())
            .filter(value => value !== ""),
        jobincome: [...document.querySelectorAll(".job-income")]
            .map(input => input.value)
            .filter(value => value !== 0),
        bandincome: [...document.querySelectorAll(".band-income")]
            .map(input => input.value)
            .filter(value => value !== 0),
        popularity: [...document.querySelectorAll(".popularity")]
            .map(input => input.value.trim())
            .filter(value => value !== ""),
        listeners: [...document.querySelectorAll(".listeners")]
            .map(input => input.value)
            .filter(value => value !== 0)
    };
}

/* Submit Modified Event */ // API
async function modifyEvent(eventData) {
    const response = await fetch(`/api/events/${eventId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eventData)
    });

    if (!response.ok) {
        throw new Error(`Update failed: ${response.status}`);
    }   
}

/* Modify Event Button */
modifyButton.addEventListener("click", async () => {

    // Get Modified Event Data
    const modifiedEvent = getModifyEvent(eventId);

    try {
        await modifyEvent(modifiedEvent);

        console.log(modifiedEvent);
        window.location.href = 'event-list.html';
    } catch (error) {
        console.error(error);
        alert("Unable to modify event.");
    }
});

/********************/
/* EVENT LIST PAGE */
/******************/

/* Load User's Events */ // API
async function loadEvents(user) {
    try {
        const response = await fetch("/api/events");

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const loadedEvents = await response.json();

        eventChooser(loadedEvents, user);

    } catch (error) {
        console.error(error);
    }
}

/* Choose Events to Load */
function eventChooser(loadedEvents, user) {
    // Initialize Event Queue instance
    let eventQueue;

    // Conditions for Event Queue
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

    // Fill table with User's next Events
    populateTable(eventQueue);
}

/* Populate Event Table */
function populateTable(eventQueue) {
    // Select Event table body and clear HTML
    const tbody = document.querySelector("#event-table tbody");
    tbody.innerHTML = "";

    // Create a table row for each Event
    eventQueue.forEach(event => {
        // Create table elements
        const row = document.createElement("tr");
        const idCell = document.createElement("td");
        const nameCell = document.createElement("td");
        const rightCell = document.createElement("td");
        const button = document.createElement("button");

        /* Determine if List Modify Page or Go Page */
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

        // Assign data to elements and append to row
        idCell.textContent = event.id;
        nameCell.textContent = event.name;
        rightCell.appendChild(button);
        row.append(idCell, nameCell, rightCell);

        // Append row to table
        tbody.appendChild(row);
    });
}

/*******************/
/* EVENT ADD PAGE */
/*****************/

/* Submit New Event */

/* Submit New Event */ // API
addEventForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Get New Event Object
    const addEvent = getNewEvent();        

    try {
        const response = await fetch("/api/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(addEvent)
        });

        if (!response.ok) {
            const error = await response.text();
            console.log("Status:", response.status);
            console.log("Response:", error);
            throw new Error("Failed to send.");
        }

        const createdEvent = await response.json();

        console.log(createdEvent);
        alert("Event creation successful!");
        window.location.href = './pages/event-add.html';
    }
    catch (error) {
        console.error(error);
    }
});

/* Get New Event Data */

function getNewEvent() {
    return {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        options: [...document.querySelectorAll(".options")]
            .map(input => input.value.trim())
            .filter(value => value !== ""),
        outcomes: [...document.querySelectorAll(".outcomes")]
            .map(input => input.value.trim())
            .filter(value => value !== ""),
        members: [...document.querySelectorAll(".members")]
            .map(input => input.value)
            .filter(value => value !== 0),
        job: [...document.querySelectorAll(".job")]
            .map(input => input.value.trim())
            .filter(value => value !== ""),
        jobincome: [...document.querySelectorAll(".job-income")]
            .map(input => input.value)
            .filter(value => value !== 0),
        bandincome: [...document.querySelectorAll(".band-income")]
            .map(input => input.value)
            .filter(value => value !== 0),
        popularity: [...document.querySelectorAll(".popularity")]
            .map(input => input.value.trim())
            .filter(value => value !== ""),
        listeners: [...document.querySelectorAll(".listeners")]
            .map(input => input.value)
            .filter(value => value !== 0)
    };
}

/* Modify Page Load */
document.addEventListener("DOMContentLoaded", () => {
    loadEvent(eventId);
});