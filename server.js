require('babel/register');
const ws = require('nodejs-websocket');

function play(name, conn) {
  const TweetPlayer = require('./libs/TweetPlayer');
  const player = new TweetPlayer(name);
  player.play((tweets) => {
    if (conn.readyState !== 1) {
      player.stop();
      return;
    }
    conn.sendText(JSON.stringify(tweets));
  });
}

const server = ws.createServer((conn) => {
  conn.on('exit', () => {
    console.log('exit');
  });

  conn.on('text', (str) => {
    switch (str) {
    case 'start':
      play('GATE', conn);
      break;
    default:
      break;
    }
  });
});

server.listen(8080);
