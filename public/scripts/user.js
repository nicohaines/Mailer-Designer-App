import { fetchData } from "./main.js";

let loginForm = document.getElementById("login");
if (loginForm) loginForm.addEventListener("submit", login);

let registerForm = document.getElementById("register");
if (registerForm) registerForm.addEventListener("submit", register);

function login(e) {
  e.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (checkPassword(password)) {
    const user = {
      email: email,
      password: password,
    };
    console.log(user);
    fetchData("/user/login", user, "POST")
      .then((data) => {
        if (!data.message) {
          setCurrentUser(data);
          window.location = "dashboard.html";
        }
      })
      .catch((err) => {
        let error = document.getElementById("error");
        error.innerText = "Invalid email or password.";
        document.getElementById("password").value = "";
      });
  } else {
    let string = "Invalid password.";
    console.log(string);
    let error = document.getElementById("error");
    error.innerText = string;
  }
}

function register(e) {
  e.preventDefault();

  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (checkPassword(password)) {
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    console.log(user);
    fetchData("/user/register", user, "POST")
      .then((data) => {
        if (!data.message) {
          setCurrentUser(data);
          window.location = "dashboard.html";
        }
      })
      .catch((err) => {
        let error = document.getElementById("error");
        error.innerText = err.message;
      });
  } else {
    let string = "Password must be 4-12 characters long.";
    console.log(string);
    let error = document.getElementById("error");
    error.innerText = string;
  }
}

function checkPassword(password) {
  if (password.length < 4 || password.length > 12) {
    return false;
  }
  return true;
}

async function setCurrentUser(user) {
  await localStorage.setItem("user", JSON.stringify(user));
}

export async function getCurrentUser() {
  return await JSON.parse(localStorage.getItem("user"));
}

export async function removeCurrentUser() {
  localStorage.removeItem("user");
  window.location = "index.html";
}
