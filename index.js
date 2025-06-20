/* eslint-env node */
/* eslint-disable no-undef */

const jsonServer = require('json-server');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(cors({ origin: '*' })); // ✅ Allow all origins
server.use(middlewares);
server.use('/dishes', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
server.use(router);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`✅ JSON Server is running on port ${PORT}`);
});
