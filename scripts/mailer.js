let mailerForm = document.getElementById("mailer");
if (mailerForm) mailerForm.addEventListener("submit", createMailer);

function createMailer(e) {
  e.preventDefault();

  let title = document.getElementById("title").value;
  let importInfo = document.getElementById("importInfo").value;
  let category = document.getElementById("category").value;

  const mailer = {
    title: title,
    importInfo: importInfo,
    category: category,
  };

  console.log(mailer);
}