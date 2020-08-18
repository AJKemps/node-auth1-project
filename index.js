const server = require("./api/server");

const port = process.env.PORT || 5005;
server.listen(port, () =>
  console.log(`. . . server running on port ${port} . . .`)
);
