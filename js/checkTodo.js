"use strict";

const todosEl = document.querySelector(".todos");

todosEl.addEventListener("click", async function (event) {
  const el = event.target.closest(".checkbox");
  if (!el) return;
  const id = el.id;
  console.log(el);
  const token = localStorage.getItem("jwt");
  if (!token) return location.assign("login.html");

  el.parentElement
    .querySelector(".todos__text")
    .querySelector("span")
    .classList.toggle("completed");

  const res = await fetch(`http://localhost:3000/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", token },
    body: JSON.stringify({ message: "Change the data" }),
  });
  const data = await res.json();

  location.assign("/");
});
