var InfluxdbClient = require("influxdb-client");
var MicroGear = require('microgear');

const APPID = 'SmartFarmTESR';
const KEY = 'eO1GZztXfbZJ3Q3';
const SECRET = 'eSwuByW54bO2W5782RKWixPby';
const ALIAS = 'netpie_connector'


var microgear = MicroGear.create({
    key: KEY,
    secret: SECRET,
    alias: ALIAS
});


var client = InfluxdbClient.create({
    host: "45.77.32.210",
    port: 8086,
    protocol: "http", // Currently only http is supported
    database: "smartfarm", // Default database
    user: null,
    password: null,
    retentionPolicy: null, // Default retention policy
    userClientTimestamp: false
});

microgear.on('connected', function () {
    console.log('Connected...');
    microgear.subscribe('/gearname/FreeBoard_TESR');

});

microgear.on('message', function (topic, body) {
    console.log('incoming : ' + topic + ' : ' + body);
        var data = body.toString().split(",");



        client.write("measurment", {
                temp: data[2],
                humid: data[1],
                moisture: data[3],
                pump: data[4],
                mode: data[5]
            }, {
                tag: data[0]
            })
            .then(function (response) {
                console.log(response.statusCode);
            })
            .catch(function (err) {
                console.warn(err);
            });


});

microgear.on('closed', function () {
    console.log('Closed...');

});

microgear.connect(APPID);
