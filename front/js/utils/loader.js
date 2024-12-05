const LOADER     = document.getElementById("loader");
//const LOADER_GIF = document.getElementById("loader-gif");
const LOADER_MSG = document.getElementById("loader-msg");


/*export*/ function startLoader( loader_body = {
  //"loader_gif": "../img/loader.gif",
  "loader_msg": "Loading..."
}) {
  /*Must be explicitly called.*/
  //LOADER_GIF.src       = loader_body["loader_gif"];
  LOADER_MSG.innerText = loader_body["loader_msg"];

  LOADER.style.visibility = "visible";
}

/*export*/ function stopLoader() {
  LOADER.style.visibility = "hidden";
}