/****************/
/* SHARED APIS */
/**************/

/*************/
/* GET APIS */
/***********/

/* Get User Data */ 
export async function getUser(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`)

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        // Retrieve user data
        const userData = await response.json();

        // Update localStorage
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(userData));

        return userData;

    } catch (error) {
        console.error(error);
    }
}

/* Get Event by Id */
export async function getEvent(eventId) {
    try {
        const response = await fetch(`/api/events/${eventId}`);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const loadedEvent = await response.json();
        return loadedEvent;

    } catch (error) {
        console.error(error);
    }
}

/* Get User's Events */ 
export async function getEvents() {
    try {
        const response = await fetch("/api/events");

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const loadedEvents = await response.json();

        return loadedEvents;

    } catch (error) {
        console.error(error);
    }
}

/**************/
/* POST APIS */
/************/

/* Post New Event */
export async function postEvent(eventData) {
    try {
        const response = await fetch("/api/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventData)
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
    }
    catch (error) {
        console.error(error);
    }
}

/*************/
/* PUT APIS */
/***********/

/* Put Modified Event */
export async function modifyEvent(eventData, eventId) {
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