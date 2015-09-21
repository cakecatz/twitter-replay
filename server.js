require('babel/register');
const ws = require('nodejs-websocket');
const TweetPlayer = require('./libs/TweetPlayer');

class TweetReplayServer {
  constructor(track) {
    this.port = 8080;
    this.server = ws.createServer((connection) => {
      const player = new TweetPlayer(track);
      player.setSpeed(5);
      player.setInterval(500);

      connection.on('exit', () => {
        console.log('exit');
      });

      connection.on('text', (str) => {
        switch (str) {
        case 'start':
          player.play((tweets) => {
            if (connection.readyState === connection.OPEN) {
              connection.sendText(JSON.stringify(tweets));
            } else {
              player.stop();
              return;
            }
          });
          break;
        case 'stop':
          player.stop();
          break;
        case 'pause':
          player.pause();
          break;
        default:
          break;
        }
      });
    });
  }

  start() {
    this.server.listen(this.port);
  }
}

const replayer = new TweetReplayServer('GATE');
replayer.start();
