const express = require("express");
const routes = require('./routes');
const fetch = require("node-fetch");
const sequelize = require("./config/config.js");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({force: true}).then(() => {
    var listener = app.listen(PORT, async () => {
        console.log("Listening!")
        let listeningPort = await listener.address().port;
        await fetch(`http://${process.env.DB_HOST}:${listeningPort}/api/questions`)
        module.exports = await listeningPort
    })
})


