const fs = require("fs");

const utils = require("./utils");


const FRONT_PATH = "./front";

exports.manageRequest = (request, response) => {
  let pathname = FRONT_PATH + request.url;
  try {
    if (fs.statSync(pathname).isDirectory()) {
      pathname += "index.html";
    }

    if (fs.statSync(pathname).isFile()) {
      fs.readFile(pathname, (err, data) => {
        if (err) {
          response.statusCode = 418;
          // TODO : Sending "Error 418" page
          response.end("err");
        } else {
          response.setHeader(
            "Content-Type", utils.getMIMETypes('.' + pathname.split('.').slice(-1)[0])
          );
          response.end(data);
        }
      });
    }

  } catch (err) {
    response.statusCode = 404;
    // TODO : Sending "Error 404" page
    response.end("err");
  }
}