/****************/
/* SHARED APIS */
/**************/

/*************/
/* GET APIS */
/***********/

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

    return await response.json();
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
        credentials: "include",
        body: JSON.stringify(newUserData)
    });

    if (!response.ok) {
        throw new Error(`Post user failed. Status: ${response.status}`);
    }

    return await response.json();
}

/* Post Event Go Option choice */
export async function applyOutcome(eventId, eventOptionId) {
    const response = await fetch(`/api/events/${eventId}/choose`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            eventOptionId: eventOptionId
        })
    });

    if (!response.ok) {
        const responseBody = await response.text();

        console.error("Status:", response.status);
        console.error("Response:", responseBody);

        throw new Error(
            responseBody ||
            `Post Event option failed. Status: ${response.status}`
        );
    }

    return await response.json();    
}

/* Post login User data */
export async function login(loginData) {
    const response = await fetch("/api/account/login?useCookies=true", {
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

    return body;
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
        credentials: "include",
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
    const response = await fetch(`/api/events/event/${eventData.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eventData)
    });

    if (!response.ok) {
        throw new Error(`Update failed: ${response.status}`);
    }

    return;
}

/* Put modified Option */
export async function modifyOption(eventOptionData) {
    //console.log(eventOptionData);    
    const response = await fetch(`/api/events/option/${eventOptionData.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eventOptionData)
    });

    if (!response.ok) {
        throw new Error(`Update failed: ${response.status}`);
    }

    return;
}

/****************/
/* DELETE APIS */
/**************/

