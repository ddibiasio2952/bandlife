const addEventForm = document.getElementById("add-event");

/* Submit Event */
addEventForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const addEvent = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        options: [...document.querySelectorAll(".option")]
            .map(input => input.value.trim())
            .filter(value => value !== ""),
        outcomes: [...document.querySelectorAll(".outcome")]
            .map(input => input.value.trim())
            .filter(value => value !== ""),
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
        window.location.href = '../pages/add.html';
    }
    catch (error) {
        console.error(error);
    }
});

