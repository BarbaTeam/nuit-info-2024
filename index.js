const http = require("http");

const api = require("./api");
const files = require("./files");


http.createServer(async (request, response) => {
  let parsed_url = request.url.split('/').filter(Boolean);

  if (parsed_url && parsed_url[0] === "api") {
    /*DEBUG ::*/ console.log(`API Call ::: ${parsed_url[1]}`);
    await api.manageRequest(request, response);
  } else {
    files.manageRequest(request, response);
  }
}).listen(8000);