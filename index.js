const form_sign = document.querySelector("#form-signin");

form_sign.addEventListener("submit", e => {
  if(userList.every(data => data.name !== form_sign.name.value || data.password !== form_sign.password.value)){
    alert('wrong');
    e.preventDefault();
  }
});