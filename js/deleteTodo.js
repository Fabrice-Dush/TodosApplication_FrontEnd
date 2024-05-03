"use strict";

const todosEl = document.querySelector(".todos");
const overlayEl = document.querySelector(".overlay-delete");
const modalEl = document.querySelector(".modal-delete");
const btnDelete = document.querySelector(".delete-yes");
const btnCancel = document.querySelector(".delete-cancel");

const toggleClass = function () {
  overlayEl.classList.toggle("hidden");
  modalEl.classList.toggle("hidden");
};

const deleteTodo = async function () {
  try {
    const token = localStorage.getItem("jwt");
    if (!token) return location.assign("login.html");
    const { todoid: id } = this.dataset;
    const res = await fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", token },
      body: JSON.stringify({ message: "delete" }),
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

todosEl.addEventListener("click", function (event) {
  try {
    event.preventDefault();
    const el = event.target.closest(".todo__delete");
    if (!el) return;
    toggleClass();
    btnDelete.addEventListener("click", deleteTodo.bind(el));
    btnCancel.addEventListener("click", cancelDelete);
  } catch (err) {
    console.error("Error: ", err);
  }
});

overlayEl.addEventListener("click", toggleClass);
