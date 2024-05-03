"use strict";

import { createTodosContent } from "./helpers.js";
const todosEl = document.querySelector(".todos");
const btnDeleteAll = document.querySelector(".btn--deleteAll");
const addTaskBtn = document.querySelector(".add__link");
const backBtn = document.querySelector(".back-btn");

todosEl.addEventListener("click", async function (event) {
  try {
    event.preventDefault();
    const token = localStorage.getItem("jwt");
    if (!token) return location.assign("/");
    const el = event.target.closest(".view");
    if (!el) return;
    const { id } = el.dataset;
    const res = await fetch(`http://localhost:3000/todos/${id}`, {
      method: "GET",
      headers: { token },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.errors);

    const { data: todo } = data;
    const html = createTodosContent(todo);
    todosEl.innerHTML = "";
    todosEl.insertAdjacentHTML("afterbegin", html);
    btnDeleteAll.classList.add("hidden");
    addTaskBtn.classList.add("hidden");
    backBtn.classList.remove("hidden");
  } catch (err) {
    console.error("Error: ", err);
  }
});

backBtn?.addEventListener("click", function () {
  location.assign("/");
});
