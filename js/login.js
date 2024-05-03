"use strict";

const form = document.querySelector(".form");
const errorEmail = document.querySelector(".error.email");
const errorPassword = document.querySelector(".error.password");
const successEl = document.querySelector(".success");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  errorEmail.textContent = errorPassword.textContent = "";

  const email = form.email.value;
  const password = form.password.value;

  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  console.log(data);

  if (data.data) {
    console.log(data.data);
    const { data: user } = data;
    localStorage.setItem("jwt", data.token);
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    successEl.classList.remove("hidden");
    setTimeout(() => {
      location.assign("/");
      successEl.classList.add("hidden");
    }, 3000);
  } else if (data.errors) {
    const { password } = data.errors;
    console.log(password);

    if (password) {
      errorPassword.classList.remove("hidden");
      errorPassword.textContent = password;
    }
  }
});
