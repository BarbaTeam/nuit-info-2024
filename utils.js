exports.getMIMETypes = (key) => {
  switch (key) {
    case ".ico" : return "image/x-icon";
    case ".html": return "text/html";
    case ".js"  : return "text/javascript";
    case ".json": return "application/json";
    case ".css" : return "text/css";
    case ".png" : return "image/png";
    case ".jpg" : return "image/jpeg";
    case ".wav" : return "audio/wav";
    case ".mp3" : return "audio/mpeg";
    case ".svg" : return "image/svg+xm";
    case ".pdf" : return "application/pdf";
    case ".doc" : return "application/msword";
    case ".md"  : return "text/plain";
    default     : return "application/octet-stream";
  }
}


exports.getToken = (request) => request.headers["token"]

exports.getBody = async (request) => {
  let body;
  await request.on("data", (chunk) => body = chunk);
  await request.on("end", () => {});

  /*DEBUG ::*/ console.log(JSON.parse(body));
  return JSON.parse(body);
}

exports.parseRequest = (request) => {
  if (!request.includes('?')) {
    return {
      "task": request,
      "params": "",
    };
  }

  let split = request.split('?');
  return {
    "task": split[0],
    "params": [split[1]].map(a => a.split('&'))[0]
                        .map(a => a.split('='))
                        .map(([k, v]) => ({[k]: v})),
  };
}