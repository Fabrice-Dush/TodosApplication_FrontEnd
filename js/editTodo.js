"use strict";

const todosEl = document.querySelector(".todos");
const modalEl = document.querySelector(".modal-edit");
const overlayEl = document.querySelector(".overlay-edit");
const editForm = document.querySelector(".edit--form");

const toggleClass = function () {
  overlayEl.classList.toggle("hidden");
  modalEl.classList.toggle("hidden");
};

//? Edit todo
todosEl.addEventListener("click", function (event) {
  event.preventDefault();
  const el = event.target.closest(".todo__edit");
  if (!el) return;
  console.log(el.parentElement);
  toggleClass();

  const text = el
    .closest(".todos__todo")
    .querySelector(".todos__text")
    .querySelector("span").innerText;
  const id = el.dataset.todoid;
  editForm.text.value = text;
  editForm.text.dataset.id = id;
});

overlayEl.addEventListener("click", toggleClass);

//? Edit todo
editForm.addEventListener("submit", async function (event) {
  try {
    event.preventDefault();
    const token = localStorage.getItem("jwt");
    if (!token) return location.assign("login.html");
    const text = editForm.text.value;
    const { id } = editForm.text.dataset;

    const res = await fetch(`http://localhost:3000/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", token },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    console.log(data.data);

    setTimeout(() => location.assign("/"), 1500);
  } catch (err) {
    console.error("Error: ", err);
  }
});
