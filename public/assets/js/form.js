const form = document.getElementById("contact-form");
const result = document.getElementById("result");
const sendContactMessage = document.getElementById("sendContactMessage");

form.addEventListener("submit", function (e) {
  const formData = new FormData(form);
  e.preventDefault();
  var object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  var json = JSON.stringify(object);
  sendContactMessage.style.display = "none";
  result.innerHTML = "Envíando mensaje";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: json
  })
    .then(async (response) => {
      await response.json();
      if (response.status == 200) {
        result.classList.remove("danger");
        result.classList.add("success");      
        result.innerHTML = 'Tu mensaje ha sido envíado. Nos contactaremos con usted a la brevedad';
      } else {
        result.classList.remove("success");
        result.classList.add("danger");      
        result.innerHTML = "Hubo un error, intentalo nuevamente";
      }
    })
    .catch((error) => {
      result.classList.remove("success");
      result.classList.add("danger");      
      result.innerHTML = "Hubo un error, intentalo nuevamente";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
        sendContactMessage.style.display = "inline-block";
      }, 7000);
    });
});
