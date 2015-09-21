const Datastore = require('nedb');
const moment = require('moment');

export default class TweetPlayer {
  constructor(name) {
    this.name = name;
    this.dbSetup();
    this.q_ = null;
    this.speed = 1.0;
    this.isEnd = null;
    this.interval = 1000; // Milliseconds
    this.seeker = null;
    this.isPause = false;
    this.tweets = null;
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  setInterval(interval) {
    this.interval = interval;
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
    // TODO: 取得するのは最初と最後のツイートだけでいい
    this.db.find({}).sort({ created_at: 1 }).exec((err, docs) => {
      if (err) {
        throw err;
      }
      this.tweets = docs;
    });
  }

  play(callback) {
    this.callback = callback;
    this.mainProcess();
  }

  mainProcess() {
    if (!this.tweets) {
      setTimeout(this.mainProcess, 100);
    }

    if (!this.isPause || this.endTime < this.seeker) {
      this.setupTimes();
    } else {
      this.isPause = false;
    }

    this.p_ = setInterval(() => {
      if (this.endTime < this.seeker) {
        this.isPause = false;
        this.isEnd = true;
        this.stop();
      } else {
        const startPoint = this.convertTime(this.seeker);
        this.seeker = new Date( this.seeker.getTime() + (this.interval * this.speed) );
        const endPoint = this.convertTime(this.seeker);

        console.log(startPoint, endPoint);

        this.db.find({
          created_at: {
            $gte: startPoint,
            $lt: endPoint,
          },
        }).sort({ created_at: 1 }).exec((err, docs) => {
          if (err) {
            throw err;
          }

          if (docs.length > 0) {
            this.callback(docs);
          }
        });
      }
    }, this.interval);
  }

  setupTimes() {
    this.startTime = new Date(this.tweets[0].created_at);
    this.endTime = new Date(this.tweets[this.tweets.length - 1].created_at);
    this.seeker = this.startTime;
  }

  convertTime(tweetDate) {
    return moment.utc(tweetDate).format('ddd MMM DD HH:mm:ss ZZ YYYY');
  }

  stop() {
    this.isPause = false;
    clearInterval(this.p_);
  }

  pause() {
    this.isPause = true;
    clearInterval(this.p_);
  }
}
