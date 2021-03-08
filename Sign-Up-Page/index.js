document.getElementById("sign-up").addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;
  localStorage.setItem("name", name);
  localStorage.setItem("password", password);
});