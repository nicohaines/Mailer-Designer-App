import { fetchData } from "./main.js";
import { getCurrentUser } from "./user.js";

let mailerForm = document.getElementById("mailer");
if (mailerForm) mailerForm.addEventListener("submit", createMailer);

async function createMailer(e) {
  e.preventDefault();

  let cUser = await getCurrentUser();
  if (!cUser) {
    let error = document.getElementById("error");
    error.innerText = "Error finding user.";
    return;
  }

  let title = document.getElementById("title").value;
  // let importInfo = document.getElementById("importInfo").value;
  let category = document.getElementById("category").value;

  if (checkTitle(title)) {
    const mailer = {
      title: title,
      // importInfo: importInfo,
      category: category,
      isTemplate: false,
      userId: cUser.userId,
    };

    console.log(mailer);

    fetchData("/mailer/createMailer", mailer, "POST")
      .then((data) => {
        if (data.message) {
          window.location = "dashboard.html";
        }
      })
      .catch((err) => {
        let error = document.getElementById("error");
        error.innerText = err.message;
      });
  } else {
    let string = "Title cannot be longer than 50 characters.";
    console.log(string);
    let error = document.getElementById("error");
    error.innerText = string;
  }
}

function checkTitle(title) {
  if (title.length > 50) {
    return false;
  }
  return true;
}
