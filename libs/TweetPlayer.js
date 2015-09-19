const Datastore = require('nedb');
const moment = require('moment');

export default class TweetPlayer {
  constructor(name) {
    this.name = name;
    this.dbSetup();
    this.q_ = null;
    this.interval = 1000; // Milliseconds
  }

  dbSetup() {
    this.db = new Datastore({
      filename: `${__dirname}/../data/${this.name}.db`,
    });
    this.db.loadDatabase((err) => {
      if (err) {
        throw err;
      }
    });
    this.db.find({}).sort({ created_at: 1 }).exec((err, docs) => {
      if (err) {
        throw err;
      }
      this.tweets = docs;
      if (this.q_) {
        this.q_();
      }
    });
  }

  play(callback) {
    if (this.q_ === null) {
      this.callback = callback;
      this.q_ = this.play;
      return;
    }

    this.startTime = new Date(this.tweets[0].created_at);
    this.endTime = new Date(this.tweets[this.tweets.length - 1].created_at);
    console.log(this.convertTime(this.startTime), ':', this.convertTime(this.endTime));

    this.p_ = setInterval(() => {
      if (this.endTime < this.startTime) {
        this.stop();
      } else {
        this.db.find({
          created_at: {
            $gte: this.convertTime(this.startTime),
            $lt: this.convertTime(this.startTime) + this.interval,
          },
        }).sort({ created_at: 1 }).exec((err, docs) => {
          if (err) {
            throw err;
          }

          if (docs.length > 0) {
            this.callback(docs);
          }
        });

        this.startTime =  new Date( this.startTime.getTime() + this.interval);
      }
    }, this.interval);
  }

  convertTime(tweetDate) {
    return moment.utc(tweetDate).format('ddd MMM DD HH:mm:ss ZZ YYYY');
  }

  stop() {
    clearInterval(this.p_);
  }
}
