var MicroGear = require('microgear');

const APPID  = 'SmartFarmTESR';
const KEY    = 'eO1GZztXfbZJ3Q3';
const SECRET = 'eSwuByW54bO2W5782RKWixPby';

var microgear = MicroGear.create({
    key : KEY,
    secret : SECRET
});

microgear.on('connected', function() {
    console.log('Connected...');
    microgear.setAlias("netpie_connect");
    microgear.subscribe('/#');

});

microgear.on('message', function(topic,body) {
    console.log('incoming : '+topic+' : '+body);
});

microgear.on('closed', function() {
    console.log('Closed...');
});

microgear.connect(APPID);
