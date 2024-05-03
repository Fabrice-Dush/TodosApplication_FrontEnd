import { hideBtns } from "./helpers.js";

//? DOM Elements

const fetchHomepage = function () {
  const token = localStorage.getItem("jwt");
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!token || !user) hideBtns();
  else hideBtns(true, user);
};
fetchHomepage();
