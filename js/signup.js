"use strict";

const form = document.querySelector(".form");
const errorEmail = document.querySelector(".error.email");
const errorPassword = document.querySelector(".error.password");
const errorFullname = document.querySelector(".error.fullname");
const successEl = document.querySelector(".success");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  errorEmail.textContent =
    errorPassword.textContent =
    errorFullname.textContent =
      "";

  const fullname = form.fullname.value;
  const email = form.email.value;
  const password = form.password.value;

  const res = await fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullname, email, password }),
  });
  const data = await res.json();
  // console.log(data);

  if (data.data) {
    const { data: user } = data;
    console.log(user);
    localStorage.setItem("jwt", data.token);
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    successEl.classList.remove("hidden");
    setTimeout(() => {
      location.assign("/");
      successEl.classList.add("hidden");
    }, 3000);
  } else if (data.errors) {
    console.log(data.errors);
    const { fullname, email, password } = data.errors;
    if (fullname) {
      errorFullname.classList.remove("hidden");
      errorFullname.textContent = fullname;
    }
    if (email) {
      errorEmail.classList.remove("hidden");
      errorEmail.textContent = email;
    }
    if (password) {
      errorPassword.classList.remove("hidden");
      errorPassword.textContent = password;
    }
  }
});
