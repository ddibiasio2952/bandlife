const addEventForm = document.getElementById("add-event");

// Added all below to event-modify.js

/* Submit New Event */
addEventForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const addEvent = {
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

