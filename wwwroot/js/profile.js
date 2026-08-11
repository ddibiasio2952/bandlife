/*****************/
/* PROFILE PAGE */
/***************/

// Imports
import { getUser } from "./api.js";

/*
const registerForm = document.getElementById("register");
const loginForm = document.getElementById("login");
const openLogin = document.querySelector(".login-text");
const closeLogin = document.getElementById("close-modal");
const login = document.querySelector(".modal-login");
const loginButton = document.getElementById("submit-login");
*/

// Get current User data with User Id from localStorage
const storedLogin = JSON.parse(localStorage.getItem("user"));
const userData = await getUser(storedLogin.id);

// Load User profile
loadProfile(userData);

/* Load profile */
function loadProfile(userData) {
    /*
    document.getElementById("band-status").textContent = userData.status;
    populateArray(".status", loadedEvent.status);
    */
    document.getElementById("band").textContent = userData.band;
    
    document.getElementById("genre").textContent = userData.genres[0];
    document.getElementById("members").textContent = userData.members;

    userData.releases.length === 0 ?
        document.getElementById("releases").textContent = 0 :
        document.getElementById("releases").textContent = userData.releases;
    
    document.getElementById("job").textContent = userData.job;
    document.getElementById("job-income").textContent = userData.jobIncome;

    document.getElementById("band-income").textContent = userData.bandIncome;
    document.getElementById("listeners").textContent = userData.listeners;
    document.getElementById("popularity").textContent = userData.popularity;
}

/*
const band = document.getElementById("band");
const bandStatus = document.getElementById("band-status");

const genre = document.getElementById("genre");
const members = document.getElementById("members");
const releases = document.getElementById("releases");

const job = document.getElementById("job");
const jobIncome = document.getElementById("job-income");

const bandIncome = document.getElementById("band-income");
const listeners = document.getElementById("listeners");
const popularity = document.getElementById("popularity");
*/