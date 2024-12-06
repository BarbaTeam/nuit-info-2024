const { hash } = require("crypto");

const utils = require("./utils");


GameStructure = {
  ZODIAC: "zodiac",
  FISHERMAN: "fisherman",
  CARGO: "cargo",
  OIL_PLATFORM: "oil platform",
}


class Game {
  constructor() {
    player_money = 0;
    pollution_rate = 0;
    hp = 100;

    structures = [];
  }

  parseToJSON() {
    return JSON.stringify({
      "player_money": player_money,
      "pollution_rate": pollution_rate,
      "hp": hp,
      "structures": structures,
    });
  }
}


function genToken(username, password) {
  return 31 * hash(`${username}`) + hash(`${password}`);
}

const USERS = {}
const GAMES /*UserToken : Game*/ = {}


// API tasks namespace :

const APITasks = {
  signin: (response, user_inputs) => {
    response.statusCode = 200;

    const username = user_inputs["username"];
    const password = user_inputs["password"];

    USERS[username] = genToken(username, password);

    /*DEBUG ::*/ console.log("USERS :::"); console.log(USERS);
    response.end();
  },

  login: (response, user_inputs) => {
    const username = user_inputs["username"];
    const password = user_inputs["password"];

    if (!USERS[username]) {
      response.status(400).send(new Error("User doesn't exist"));
      return;
    }

    if (USERS[username] != genToken(username, password)) {
      response.status(400).send(new Error("Wrong password"));
      return;
    }

    /*DEBUG ::*/ console.log(USERS[username])

    response.statusCode = 200;
    response.setHeader('Content-Type', "text/plain")
    response.end(USERS[username])
  },
}





const GameTasks = {
  default: (response) => {
    response.statusCode = 200;
    response.end(`Thanks for calling ${request.url}`);
  },

  newGame: (response, user_token) => {
    // Reset Game :
    GAMES[user_token] = new Game();

    const game = GAMES[user_token];

    response.statusCode = 200;
    response.setHeader("Content-Type", utils.getMIMETypes(".json"));

    // Something
    response.end(game.parseToJSON());
  },

  continueGame: (response, user_token) => {
    //...
  },


  // TODO : Game Actions :
  /*
  ... : (response, user_token, params) => {
    response.statusCode = 200;

    const game = Games[user_token];

    const letter = params[0]["letter"];

    // . . .
  },
  */
};



exports.manageRequest = async (request, response) => {
  const api_request = request.url.split("/api/").filter(Boolean)[0];
  const parsed_request = utils.parseRequest(api_request);

  /*DEBUG ::*/ console.log("iiiiiiii", parsed_request);

  switch (parsed_request["task"]) {
    case "signin":
      APITasks.signin(response, await utils.getBody(request));
      break;

    case "login":
      /*DEBUG ::*/ console.log(USERS);
      APITasks.login(response, await utils.getBody(request));
      break;

    case "newGame":
      GameTasks.newGame(response, utils.getToken(request));
      break;

    case "continueGame":
      GameTasks.continueGame(response, utils.getToken(request));
      break;

    case ... :
      GameTasks. ...(response, utils.getToken(request), parsed_request["params"]);
      break;

    default: GameTasks.default(response);
  }
}
