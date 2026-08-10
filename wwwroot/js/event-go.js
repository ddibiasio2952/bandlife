const params = new URLSearchParams(window.location.search);
const eventId = params.get("id");
const login = JSON.parse(localStorage.getItem("user"));

/* Load Event by Id */ // API
async function loadEventAction(eventId) {
    try {
        const response = await fetch(`/api/events/${eventId}`);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const loadedEvent = await response.json();

        renderOptions(loadedEvent);
        
    } catch (error) {
        console.error(error);
    }
}

/* Populate Option Form */
function renderOptions(loadedEvent) {
    // Select and fill Event Name and Description Fields
    const nameField = document.querySelector("#name");
    nameField.innerHTML = loadedEvent.name;

    const descriptionField = document.querySelector("#description");
    descriptionField.innerHTML = loadedEvent.description;

    // Select container element for Event Options
    const container = document.getElementById("choose-option")
    container.innerHTML = "";

    // Create a container row for each Event Option
    loadedEvent.options.forEach((option, index) => {
        // Create container row elements
        const div = document.createElement("div");
        const button = document.createElement("button");
        button.textContent = "Go";

        // Add Event Listener to Option Button
        button.addEventListener("click", () => {
            // Apply Outcome to User Data
            console.log(loadedEvent.outcomes[index]),
            applyOutcome(loadedEvent.outcomes[index])
        });

        container.appendChild(button);

        const optionText = document.createElement("p");
        optionText.textContent = option;
        
        div.appendChild(optionText);
        div.appendChild(button);
        container.appendChild(div);
    });
}

/* Send Option Button */
async function applyOutcome(option) {
    // Retrieve User Data
    const userJson = loadUser(login.id);

    console.log(userJson);
}

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

/* Modified Data */
function getModifyData() {
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
    };
}

/* Submit Modified Event */
async function Event(eventData) {
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

/* Page Load */
document.addEventListener("DOMContentLoaded", () => {
    loadEventAction(eventId);
});