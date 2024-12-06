// ----- DOM's Shortcuts :

const DOM__INPUTS = ["username", "password"].map((id) => document.getElementById(id));

const DOM__SIGN_BTN = document.getElementById("signb");
const DOM__LOG_BTN = document.getElementById("logb");


// ----- Website's Listeners :

// window.addEventListener("load", () => {if(localStorage.getItem("game_token")) window.location.href = "./game.html";});

DOM__SIGN_BTN.addEventListener("click", signin);
DOM__LOG_BTN.addEventListener("click", login);


// ----- User Connection

const MDP_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


//Note : Pas besoin de faire un 'call_count'
async function signin() {
  startLoader();

  let user_inputs = {"username" : DOM__INPUTS[0].value, "password" : DOM__INPUTS[1].value};

  if (!user_inputs["username"] || !user_inputs["password"]) {
    stopLoader();
    openModal({
      modal_header: "Missing Field",
      modal_content: "You must have a username and a password."
    });
    return;
  }

  if (!MDP_REGEX.test(user_inputs["password"])) {
    stopLoader();
    openModal({
      modal_header: "Invalid Input",
      modal_content: "Password must be of at least 8 characters.\nIt must contain at least 1 letter and 1 number."
    });
    return;
  }

  try {
    await fetch("http://loirat.alwaysdata.net/api/signin", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(user_inputs)
    });
  } catch (error) {
    stopLoader();
    openModal({
      modal_header: "Server Error",
      modal_content: `An Error has been thrown by the server :\n${error}`
    });
    return;
  }

  stopLoader();
}

//Note : Pas besoin de faire un 'call_count'
async function login() {
  startLoader();

  let user_inputs = {"username" : DOM__INPUTS[0].value, "password" : DOM__INPUTS[1].value}
  console.log(`loading : ${user_inputs}`);

  if (!user_inputs["username"] || !user_inputs["password"]) {
    stopLoader();
    openModal({
      modal_header: "Missing Field",
      modal_content: "You must have a username and a password."
    });
    return;
  }

  try {
    let resp = await fetch("http://loirat.alwaysdata.net/api/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(user_inputs)
    });

    //? It seems that there is no errors thrown when user enter a bad password.
    if (!resp.ok) {
      stopLoader();
      openModal({
        modal_header: "Invalid Password",
        modal_content: "The password entered is wrong."
      });
      return;
    }

    localStorage.setItem("game_token", await resp.text());
    window.location.href = "./index.html";

  } catch (error) {
    stopLoader();
    openModal({
      modal_header: "Server Error",
      modal_content: `An Error has been thrown by the server :\n${error}`
    });
  }
}
