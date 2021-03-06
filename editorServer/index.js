const express = require('express');
const {json} = require('body-parser');
const fs = require('fs');

const {GLOBALS} = require('../src/globals.js');

const app = express();

app.use(json());

const PLACEMENTS_PATH = 'src/games/AmmoPlayground/placements';

const enhanceWithNoCors = (endpoint, method = 'get', callback) => {
    app.options(endpoint, (req, res) => {
        res
            .header('Access-Control-Allow-Origin', "*")
            .header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type')
            .send();
    });

    app[method](endpoint, (req, res) => {
        res.header('Access-Control-Allow-Origin', "*");

        callback(req, res)
    });
}

enhanceWithNoCors('/placements/list', 'get', (req, res) => {
    const files = fs.readdirSync(PLACEMENTS_PATH);

    res.send(files);
});

enhanceWithNoCors('/placements/', 'get', (req, res) => {
    const {placementName} = req.query;

    const file = fs.readFileSync(`${PLACEMENTS_PATH}/${placementName}`);

    res.send(file);
});

enhanceWithNoCors('/placements/', 'post', (req, res) => {
    const newName = `PL_${Math.random()}.json`;

    try {
        fs.writeFileSync(`${PLACEMENTS_PATH}/${newName}`, JSON.stringify(req.body, null, 4));
        res.send(true);
    } catch {
        res.send(false);
    }
});

app.listen(GLOBALS.EDITOR_PORT, function () {
    console.info("server started at port:", GLOBALS.EDITOR_PORT);
});
