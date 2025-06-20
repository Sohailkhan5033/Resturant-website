/* eslint-env node */
/* eslint-disable no-undef */

const jsonServer = require('json-server');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// ✅ Allow CORS from anywhere
server.use(cors());
server.options('*', cors()); // Preflight CORS

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`✅ JSON Server is running on port ${PORT}`);
});
