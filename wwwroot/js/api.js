/****************/
/* SHARED APIS */
/**************/

/*************/
/* GET APIS */
/***********/

/* Get User data by Id */ 
export async function getUser(userId) {
}


/* Get Event by Id */
export async function getEvent(eventId) {
    const response = await fetch(`/api/events/${eventId}`);
    if (!response.ok) {
        throw new Error(`Get event failed: ${response.status}`);
    }

    return await response.json();
}

/* Load Event by Id */ //Redundant to getEvent? getEvent doesn't have renderOptions
export async function loadEventAction(eventId) {
    const response = await fetch(`/api/events/${eventId}`);
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    if (!response.ok) {
        throw new Error(`Get event failed: ${response.status}`);
    }

    const loadedEvent = await response.json();

    renderOptions(loadedEvent);
}

/* Load User Data */ // API
export async function loadUser(userId) {
    /*
    const response = await fetch(`/api/users/${userId}`)
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    // Retrieve user data
    const userJson = await response.json();

    // Load Event list if on Event List page
    if (window.location.pathname === "/pages/event-list.html") {
        loadEvents(userJson);
    } else {
        return userJson;
    }
    */
}

/* Get User's Events */ 
export async function getEvents() {
    const response = await fetch("/api/events");
    if (!response.ok) {
        throw new Error(`Get events failed: ${response.status}`);
    }

    return await response.json();
}

/**************/
/* POST APIS */
/************/

/* Post new User */
export async function postUser(newUserData) {
    const response = await fetch("/api/account/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUserData)
    });

    if (!response.ok) {
        throw new Error(`Post user failed. Status: ${response.status}`);
    }

    return await response.json();
}

/* Post login User data */
export async function login(loginData) {
    const response = await fetch("/api/account/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(loginData)
    });

    const body = await response.json();

    if (!response.ok) {
        throw new Error(body.message ?? "Login failed.");
    }

    console.log(body.message);

    return body;;
}

/* Post logout */
export async function logoutUser() {
    const response = await fetch("/api/account/logout", {
        method: "POST",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error(`Logout failed. Status: ${response.status}`);
    }
}

/* Post new Event */
export async function postEvent(eventData) {
    const response = await fetch("/api/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eventData)
    });

    if (!response.ok) {
        throw new Error(`Post event failed. Status: ${response.status}`);
    }

    return await response.json();
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

    await response.json();
}

/* Submit Modified Event */ // REVISE
export async function submitEvent(eventData) {
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

