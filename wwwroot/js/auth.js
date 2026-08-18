/********************************/
/* SHARED AUTHENTICATION TOOLS */
/******************************/

// Roles
export const Roles = Object.freeze({
    USER: "User",
    MODERATOR: "Moderator",
    ADMIN: "Admin"
});

/*****************************/
/* AUTHENTICATION FUNCTIONS */
/***************************/

/* General authentication check */
export async function initializeAuthorizedPage(allowedRoles) {
    console.log("Allowed Roles: ", allowedRoles)
    try {
        // Verify authentication and role
        const authData = await requireRole(allowedRoles);

        if (!authData) {
            return null;
        }

        // Load profile data for page population
        const profileData = await getProfile();
        console.log("Auth Data:", authData.roles);
        console.log("Profile Data:", profileData);

        if (!profileData) {

            window.location.replace("/login.html");
            return null;
        }

        // Load HTML elements with successful login and populate accordingly
        if (authData.roles.includes("Moderator") || authData.roles.includes("Admin")) {
            const navLinks = document.querySelectorAll(".nav-link.hidden");
            // Nav content
            navLinks.forEach(navLink => {
                navLink.classList.remove("hidden");
            });
        }
        // Page content
        document.body.classList.remove("authentication-pending");

        // Return profile data for page population
        return profileData;
    } catch (error) {

        console.error("Error initializing authenticated page:", error);
        
        window.location.replace("/login.html");
        return null;
    }
}

/* Require User to have specific Role(s) */
export async function requireRole(allowedRoles) {
    const authData = await requireLogin();

    if (!authData) {
        window.location.replace("/login.html");
        return null;
    }

    const hasRequiredRole = allowedRoles.some(role =>
        userHasRole(authData, role)
    );

    if (!hasRequiredRole) {
        window.location.replace(
            "/access-denied.html"
        );

        return null;
    }

    return authData;
}

/* Check if User has specific Role */
export function userHasRole(authData, role) {

    return authData?.roles?.includes(role) ?? false;
}

/*************/
/* GET APIS */
/***********/

/* Get Authenticated User data to verify authentication */
export async function requireLogin() {
    const response = await fetch("/api/account/status", {
        method: "GET",
        credentials: "include"
    });

    if (response.status === 401) {
        return null;
    }

    if (!response.ok) {
        throw new Error(
            `Unable to verify login. Status: ${response.status}`
        );
    }

    return await response.json();
}

/* Get Authenticated User Profile data for page population */
export async function getProfile() {
    const response = await fetch("/api/applicationusers/profile", {
        credentials: "include"
    });

    if (response.status === 401) {
        return null;
    }

    if (!response.ok) {
        throw new Error(
            `Failed to load profile. Status: ${response.status}`
        );
    }

    return await response.json();
}