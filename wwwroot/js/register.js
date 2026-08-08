const registerForm = document.getElementById("register");
const loginForm = document.getElementById("login");
const openLogin = document.querySelector(".login-text");
const closeLogin = document.getElementById("close-modal");
const login = document.querySelector(".modal-login");
const loginButton = document.getElementById("submit-login");

/* Login Modal */
openLogin.addEventListener("click", () => {
  login.classList.add("open");
});

document.addEventListener('click', (event) => {
  if (event.target === login) {
    // If the click is directly on the dialog backdrop or outside the dialog
    login.classList.remove('open');
  }
});

/* Submit Login */
async function bandSearch(band) {
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

/* Search Login Button */ 
loginButton.addEventListener("click", async () => {
    const band = document.getElementById("login-band").value;

    try {
        const user = await bandSearch(band);

        localStorage.setItem("band", user.band); // Remove???
        localStorage.setItem("user", JSON.stringify(user));
        console.log("Logged in");
        console.log(user);
        window.location.href = './pages/home.html';
    } catch (error) {
        console.error(error);
        alert("Unable to find band.");
    }
});



/* Submit Registration */
registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const user = {
        email: document.getElementById("email").value,
        band: document.getElementById("band").value,
        instrument: document.getElementById("instrument").value,
        genres: [...document.querySelectorAll(".genre")]
            .map(input => input.value.trim())
            .filter(value => value !== ""),
        status: [],
        members: 1,
        events: 0,
        job: "Jobless",
        jobincome: 0,
        bandincome: 0,
        popularity: "\"Who?\"",
        listeners: 0,
        releases: []
    };

    try {
        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            const error = await response.text();
            console.log("Status:", response.status);
            console.log("Response:", error);
            throw new Error("Failed to send.");
        }

        const createdUser = await response.json();

        console.log(createdUser);
        alert("Registration successful!");
        /* Save Band Login */
        localStorage.setItem("band", user.band);
        window.location.href = './pages/home.html';
    }
    catch (error) {
        console.error(error);
    }
});

