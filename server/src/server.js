const http = require("http");

require('dotenv').config();

const path = require("path");

const { connectMongoDB } = require(path.join(__dirname, "service", "mongo.js"));

const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");

const { loadLaunchData } = require("./models/launches.model");

// const {setUpSSL} = require('./service/ssl');

const {saveSpaceXUserToDatabase} = require('./models/users.model');

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

async function startServer() {
  await connectMongoDB();
  await saveSpaceXUserToDatabase();
  await loadData();
  await loadLaunchData();
  
  server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
  });
}

async function loadData() {
  await loadPlanetsData();
}


startServer();
