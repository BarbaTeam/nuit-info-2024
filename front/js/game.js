/////////////////////////////
// Game Starting :

const DOM__NEW_GAME_B = document.getElementById("newgameb");
const DOM__CONTINUE_B = document.getElementById("continueb");

DOM__NEW_GAME_B.addEventListener("click", start_new_game());
DOM__CONTINUE_B.addEventListener("click", continue_game);

const GAME_TOKEN = localStorage.getItem("game_token");

var GAME;

async function start_new_game() {
  let call_count = 0;

  async function _fetchNewGame() {
    startLoader();
    call_count++;

    try {
      let resp = await fetch("http://loirat.alwaysdata.net/api/newGame", {
        method: "GET",
        headers: {"token": GAME_TOKEN}
      });

      if (!resp.ok) {
        if (call_count != 6) return await _fetchNewGame();
      }

      return await resp.json();
    }
    catch (error) {
      stopLoader();
      openModal({
        modal_header: "Server Error",
        modal_content: `An Error has been thrown by the server :\n${error}`,
      });
      if (call_count != 6) return await _fetchNewGame();
    }
  }

  GAME = await _fetchNewGame();
  stopLoader();

  if (call_count == 6) {
    openModal({
      modal_header: "Warning",
      modal_content: "Maximum number of call to the server exceeded.\n<strong>(Will implemnt retry functionality later)</strong>"
    });
    //logout();
  }
}

async function continue_game() {
  async function _fetchExistingGame() {
    startLoader();
    call_count++;

    try {
      let resp = await fetch("http://loirat.alwaysdata.net/api/continueGame", {
        method: "GET",
        headers: {"token": GAME_TOKEN}
      });

      if (!resp.ok) {
        if (call_count != 6) return await _fetchExistingGame();
      }

      return await resp.json();
    }
    catch (error) {
      stopLoader();
      openModal({
        modal_header: "Server Error",
        modal_content: `An Error has been thrown by the server :\n${error}`,
      });
      if (call_count != 6) return await _fetchExistingGame();
    }
  }

  GAME = await _fetchExistingGame();
  stopLoader();

  if (call_count == 6) {
    openModal({
      modal_header: "Warning",
      modal_content: "Maximum number of call to the server exceeded.\n<strong>(Will implemnt retry functionality later)</strong>"
    });
    //logout();
  }

  return ret;
}
