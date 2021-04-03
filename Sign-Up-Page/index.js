const signup = document.querySelector("#form-signup");
const warning = document.getElementsByClassName("alert");

console.log(userList);

signup.addEventListener("submit", e => {
  e.preventDefault();

  if(signup.password.value.length >= 8){
    if(signup.re_password.value === signup.password.value){
      if(userList.every(user => user.name !== signup.name.value)){
        db.collection("user").add({
          username: signup.name.value,
          password: signup.password.value
        });
      }else{
        warning[0].style.display = "block";
        warning[1].style.display = "none";
        warning[2].style.display = "none";
      }
    }else{
      warning[0].style.display = "none";
      warning[1].style.display = "none";
      warning[2].style.display = "block";
    }
  }else{
    warning[0].style.display = "none";
    warning[1].style.display = "block";
    warning[2].style.display = "none";
  }
});