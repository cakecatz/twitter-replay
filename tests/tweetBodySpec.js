var twitterText = require('twitter-text');
var Datastore = require('nedb');

var db = new Datastore({
  filename: `${__dirname}/../data/${this.name}.db`,
});

db.loadDatabase((err) => {
  if (err) {
    throw err;
  }
});

db.find({}, (err, data) => {
  data.forEach((v) => {
    
  });
});
