const { hash } = require("crypto");

const utils = require("./utils");


GameStructure = {
  ZODIAC: {name: "zodiac", price: 50, "money_modifier":5, "pollution_modifier":10},
  FISHERMAN: {name: "fisherman", price: 200, "money_modifier":10, "pollution_modifier":20},
  CARGO: {name: "cargo", price: 1000, "money_modifier":100, "pollution_modifier":200},
  OIL_PLATFORM: {name: "oil platform", price: 10000, "money_modifier":500, "pollution_modifier": 1000},
}

function get_GameStructureName() {
  l = [];
  for (sruct of GameStructure.values()) {
    l.push(struct.name);
  }
  return l;
}


class Game {
  constructor() {
    player_money = 0;
    pollution_rate = 0;
    hp = 100;
    effects = [];

    inventory = {};
    for (key of get_GameStructureName()) {
      inventory[key] = 0;
    }
  }

  parseToJSON() {
    return JSON.stringify({
      "player_money": player_money,
      "pollution_rate": pollution_rate,
      "hp": hp,
      "inventory": inventory,
      "effects": effects,
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

    const username = user_inputs["username"];
    const password = user_inputs["password"];

    USERS[username] = genToken(username, password);

    /*DEBUG ::*/ console.log("USERS :::"); console.log(USERS);
    response.statusCode = 200;
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
    response.end(game.parseToJSON());
  },

  continueGame: (response, user_token) => {
    if (!GAMES[user_token]) {
      GAMES[user_token] = new Game();
    }

    const game = GAMES[user_token];

    response.statusCode = 200;
    response.setHeader("Content-Type", utils.getMIMETypes(".json"));
    response.end(game.parseToJSON());
  },


  buyStruct : (response, user_token, params) => {
    response.statusCode = 200;

    const game = Games[user_token];

    const structure = params[0]["structure"];

    response.statusCode = 200;

    if (!get_GameStructureName().includes(structure)) {
      response.setHeader("Content-Type", utils.getMIMETypes(".json"));
      response.end(JSON.stringify({"transaction_succes": false}));
      return;
    }

    if (game.player_money < structure.price) {
      response.setHeader("Content-Type", utils.getMIMETypes(".json"));
      response.end(JSON.stringify({"transaction_succes": false}));
      return;
    }

    game.player_money -= structure.price;
    game.inventory[structure.name]++;
    game.pollution_rate += structure.pollution_modifier;

    response.setHeader("Content-Type", utils.getMIMETypes(".json"));
    response.end(JSON.stringify({"transaction_succes": true}));
  },
};



exports.manageRequest = async (request, response) => {
  const api_request = request.url.split("/api/").filter(Boolean)[0];
  const parsed_request = utils.parseRequest(api_request);

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

    case "buyStruct" :
      GameTasks.buyStruct(response, utils.getToken(request), parsed_request["params"]);
      break;

    default: GameTasks.default(response);
  }
}



exports.update_all_games = () => {
  for (game of GAMES) {
    if (inventory[GameStructure.ZODIAC.name] > 0) {
      game.player_money += GameStructure.ZODIAC.money_modifier * inventory[GameStructure.ZODIAC.name];
    }

    if (inventory[GameStructure.CARGO.name] > 0) {
      game.player_money += GameStructure.CARGO.money_modifier * inventory[GameStructure.CARGO.name];
    }

    if (inventory[GameStructure.FISHERMAN.name] > 0) {
      game.player_money += GameStructure.FISHERMAN.money_modifier * inventory[GameStructure.FISHERMAN.name];
    }
  }
}
