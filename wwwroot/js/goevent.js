const modifyEventForm = document.getElementById("modify-event");
const params = new URLSearchParams(window.location.search);
const eventId = params.get("id");
const modifyButton = document.getElementById("modify-button");

/* Load Event by Id */
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

/* Populate Form */
function renderOptions(loadedEvent) {
    const nameField = document.querySelector("#name");
    nameField.innerHTML = loadedEvent.name;

    const descriptionField = document.querySelector("#description");
    descriptionField.innerHTML = loadedEvent.description;


    const container = document.getElementById("choose-outcome")
    container.innerHTML = "";

    loadedEvent.options.forEach((option, index) => {
        const div = document.createElement("div");

        const button = document.createElement("button");
        button.textContent = "Go";

        button.addEventListener("click", () => {
            console.log(loadedEvent.outcomes[index]),
            getUpdateUser
            sendOutcome(loadedEvent.outcomes[index])
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
async function sendOption(option) {
    /*
    try {
        const response = await fetch(`/api/user/status`, {
            method: 
        });
    }
    */
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

/* Modify Event Button */
/*modifyButton.addEventListener("click", async () => {
    const modifiedEvent = getModifyData(eventId);

    try {
        await modifyEvent(modifiedEvent);

        console.log(modifiedEvent);
        window.location.href = 'list.html';
    } catch (error) {
        console.error(error);
        alert("Unable to modify event.");
    }
});*/

/* Page Load */
document.addEventListener("DOMContentLoaded", () => {
    loadEventAction(eventId);
});