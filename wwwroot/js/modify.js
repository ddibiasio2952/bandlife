const modifyEventForm = document.getElementById("modify-event");
const params = new URLSearchParams(window.location.search);
const eventId = params.get("id");
const modifyButton = document.getElementById("modify-button");

/* Load Event by Id */
async function loadEvent(eventId) {
    try {
        const response = await fetch(`/api/events/${eventId}`);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const loadedEvent = await response.json();

        populateForm(loadedEvent);
        
    } catch (error) {
        console.error(error);
    }
}

/* Populate Form */
function populateForm(loadedEvent) {
    document.getElementById("id").value = loadedEvent.id;
    document.getElementById("name").value = loadedEvent.name;
    document.getElementById("description").value = loadedEvent.description;

    populateArray(".option", loadedEvent.options);
    populateArray(".outcome", loadedEvent.outcomes);
}

/* Populate Arrays in Form */
function populateArray(selector, values) {
    const inputs = document.querySelectorAll(selector);

    inputs.forEach((input, index) => {
        input.value = values[index] ?? "";
    });
}

/* Modified Event Data */
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
    };
}

/* Submit Modified Event */
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
    const modifiedEvent = getModifyEvent(eventId);

    try {
        await modifyEvent(modifiedEvent);

        console.log(modifiedEvent);
        window.location.href = 'list.html';
    } catch (error) {
        console.error(error);
        alert("Unable to modify event.");
    }
});

/* Page Load */
document.addEventListener("DOMContentLoaded", () => {
    loadEvent(eventId);
});