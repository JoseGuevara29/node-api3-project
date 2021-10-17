// require your server and launch it

const server = require("./api/server");
server.listen(1234, () => {
  console.log(".. server is running on http://localhost:1234 ..");
});
