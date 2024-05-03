"use strict";
import { createTodosContent } from "./helpers.js";
const todoEl = document.querySelector(".todos");
const btnDeleteAll = document.querySelector(".btn--deleteAll");
const backBtn = document.querySelector(".back-btn");
const overlayEl = document.querySelector(".overlay-delete");
const modalEl = document.querySelector(".modal-delete");
const btnDelete = document.querySelector(".delete-yes");
const btnCancel = document.querySelector(".delete-cancel");

backBtn.classList.add("hidden");

const toggleClass = function () {
  overlayEl.classList.toggle("hidden");
  modalEl.classList.toggle("hidden");
};

const deleteTodos = async function () {
  try {
    const token = localStorage.getItem("jwt");
    if (!token) return location.assign("login.html");
    const res = await fetch(`http://localhost:3000/todos/deleteAll`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({ message: "Delete everything" }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.errors);

    setTimeout(() => {
      location.assign("/");
    }, 1500);
  } catch (err) {
    console.error("Error: ", err);
  }
};

const cancelDelete = function () {
  toggleClass();
};

const displayTodos = function (todos) {
  todoEl.innerHTML = "";
  todos.forEach((todo, i) => {
    const html = createTodosContent(todo, todos.length);
    todoEl.insertAdjacentHTML("beforeend", html);
  });
};

const fetchTodos = async function () {
  try {
    const token = localStorage.getItem("jwt");
    if (!token) return location.assign("login.html");
    const res = await fetch(`http://localhost:3000/todos`, {
      method: "GET",
      headers: { token },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.errors);
    console.log(data);
    const { data: todos } = data;
    if (todos.length === 0) return;
    displayTodos(todos);

    if (todos.length >= 2) btnDeleteAll.classList.remove("hidden");
  } catch (err) {
    console.log("An error: ", err);
  }
};
fetchTodos();

btnDeleteAll.addEventListener("click", function (event) {
  try {
    event.preventDefault();
    toggleClass();
    btnDelete.addEventListener("click", deleteTodos);
    btnCancel.addEventListener("click", cancelDelete);
  } catch (err) {
    console.error("Error: ", err.stack);
  }
});
