/****************/
/* SHARED APIS */
/**************/

/*************/
/* GET APIS */
/***********/

/* Get User data by Id */ 
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

/* Get User data by Band Name */
export async function getBandName(band) {
    try {
        const response = await fetch(`/api/users/band/${band}`);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const loadedUser = await response.json();

        return loadedUser;
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

/* Post new User */

export async function postUser(newUserData) {
    try {
        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUserData)
        });

        if (!response.ok) {
            const error = await response.text();
            console.log("Status:", response.status);
            console.log("Response:", error);
            throw new Error("Failed to send.");
        }

        const createdUser = await response.json();

        return createdUser;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

/* Post new Event */
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

        return createdEvent;
        
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

/*************/
/* PUT APIS */
/***********/

/* Put modified Event */
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

/****************/
/* DELETE APIS */
/**************/

