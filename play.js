require('babel/register');

function play(name) {
  const TweetPlayer = require('./libs/TweetPlayer');
  const player = new TweetPlayer(name);
  player.play((tweets) => {
    tweets.forEach((tweet) => {
      console.log(tweet.text);
    });
  });
}

play('GATE');
