import { getCurrentUser, removeCurrentUser } from "./user.js";

let cUser = await getCurrentUser()
let nav = document.querySelector('.navbar')

if(cUser) {
    nav.innerHTML = `
       <div>
            <a href="index.html">Home</a>
            <a href="dashboard.html">Dashboard</a>
            <a href="login.html">Account</a>
        </div>
    `
} else {
    nav.innerHTML = `
         <div>
            <a href="index.html">Home</a>
            <a href="dashboard.html">Dashboard</a>
            <a href="login.html">Login</a>
        </div>
    `
}

// logout event listener
let logout = document.getElementById("logout")
if(logout) logout.addEventListener('click', removeCurrentUser)

// fetchData function: use for POST, PUT, and DELETE. 
// Fetch method implementation:
export async function fetchData(route = '', data = {}, methodType) {
  const response = await fetch(`http://localhost:3500${route}`, {
    method: methodType, // *POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  if (response.ok) {
    return await response.json(); // parses JSON response into native JavaScript objects
  } else {
    throw await response.json();
  }
}