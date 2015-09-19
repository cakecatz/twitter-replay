const Twitter = require('twitter');
const Datastore = require('nedb');
const twitterConfig = require('../config.json');

export default class TweetRecoder {
  constructor(name) {
    this.init();
    this.dbSetup(name);
  }

  init() {
    this.client = new Twitter(twitterConfig);
  }

  dbSetup(name) {
    this.db = new Datastore({
      filename: `${__dirname}/../data/${name}.db`,
    });
    this.db.loadDatabase((err) => {
      if (err) {
        throw err;
      }
    });
  }

  start(track) {
    this.client.stream('statuses/filter', track, (stream) => {
      stream.on('data', (tweet) => {
        this.store(tweet);
      });

      stream.on('error', (err) => {
        throw err;
      });
    });
  }

  store(tweet) {
    console.log(tweet.text);
    this.db.insert(tweet);
  }
}
