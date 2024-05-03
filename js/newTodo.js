"use strict";

const formEl = document.querySelector(".form");

formEl.addEventListener("submit", async function (event) {
  try {
    event.preventDefault();
    const text = formEl.text.value;
    const token = localStorage.getItem("jwt");
    if (!token) return location.assign("login.html");

    const res = await fetch(`http://localhost:3000/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json", token },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    console.log(data);

    if (!res.ok) throw new Error(data.errors);
    console.log(data);

    if (data.data) {
      location.assign("/");
    }
  } catch (err) {
    console.error("Error: ", err);
  }
});
