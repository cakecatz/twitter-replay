require('babel/register');

function record(name, track) {
  const TweetRecoder = require('./libs/TweetRecoder');
  const tr = new TweetRecoder(name);
  tr.start({
    track: track,
  });
}

record('test', 'test');
