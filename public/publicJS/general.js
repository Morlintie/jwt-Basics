const formList = document.querySelector(".login-con");
const nameInput = document.querySelector(".login-input");
const passInput = document.querySelector(".password-input");
const submitButton = document.querySelector(".post-submit");
const errorLogin = document.querySelector(".error-login");
const tokenInformer = document.querySelector(".token-info");
const privateData = document.querySelector(".private-section");
const getButton = document.querySelector(".get-button");
const incomingData = document.querySelector(".incoming-data");
const privateError = document.querySelector(".private-error");

function generalJS() {
  formList.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const username = nameInput.value;
      const password = passInput.value;

      const response = await fetch("/api/v1/register/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });
      nameInput.value = "";
      passInput.value = "";

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        errorLogin.classList.remove("display-error");
        generalJS();
      } else {
        throw new Error(data.msg);
      }
    } catch (error) {
      errorLogin.textContent = error;
      errorLogin.classList.add("display-error");
      localStorage.removeItem("token");
      incomingData.innerHTML = "";
      generalJS();
    }
  });

  if (localStorage.getItem("token")) {
    tokenInformer.textContent = "token is valid";
    tokenInformer.classList.add("token-valid");
  } else {
    tokenInformer.textContent = "no token is provided";
    tokenInformer.classList.remove("token-valid");
  }

  getButton.addEventListener("click", async (event) => {
    try {
      const response = await fetch("/api/v1/register/get", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        incomingData.innerHTML = data.msg;
        privateError.classList.remove("display-private-error");
      } else {
        console.log(data);
        throw new Error(data.msg);
      }
    } catch (error) {
      privateError.textContent = error;
      privateError.classList.add("display-private-error");
    }
  });
}

generalJS();
