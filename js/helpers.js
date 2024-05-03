const todosEl = document.querySelector(".todos");
const boxEl = document.querySelector(".box");
const headerEl = document.querySelector(".header");
const logoutBtn = document.querySelector(".btn--logout");
const loginBtn = document.querySelector(".btn--login");
const signupBtn = document.querySelector(".btn--signup");

export const hideBtns = function (isLoggedIn = false, user = undefined) {
  if (!isLoggedIn) {
    logoutBtn?.classList.add("hidden");
    boxEl?.classList.add("hidden");
    loginBtn?.classList.remove("hidden");
    signupBtn?.classList.remove("hidden");
  } else {
    loginBtn?.classList.add("hidden");
    signupBtn?.classList.add("hidden");
    logoutBtn?.classList.remove("hidden");
    boxEl?.classList.remove("hidden");
    boxEl.innerText = user.fullname
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }
};

export const createTodosContent = function (todo, length = 0) {
  const html = `
        <li class="todos__todo" data-id="${todo._id}">
          <div class="todo__left">
          <input type="checkbox" id="${todo._id}" class="checkbox" ${
    todo.completed ? "checked" : ""
  }/>
            <p class="todos__text">
              <span class="${todo.completed ? "completed" : ""}">${
    todo.text
  }</span>
              <a href="show.html" class="view" data-id="${
                todo._id
              }">View &rarr;</a>
            </p>
          </div>
          <div class="todo__right">
            <a href="/todos/${todo._id}/edit" class="todo__edit" data-todoID="${
    todo._id
  }">
              <ion-icon name="create" class="todo__edit-icon"></ion-icon>
            </a>
              <button class="delete todo__delete" data-todoID="${todo._id}">
                <ion-icon name="trash" class="todo__delete-icon"></ion-icon>
              </button>
          </div>
        </li>
    `;
  return html;
};
