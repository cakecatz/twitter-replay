require('babel/register');
const ws = require('nodejs-websocket');
const TweetPlayer = require('./libs/TweetPlayer');

class TweetReplayServer {
  constructor(track) {
    this.port = 8080;
    const player = new TweetPlayer(track);
    player.setSpeed(1.0);
    player.setInterval(500);
    player.setSeekTo(20);
    this.server = ws.createServer((connection) => {
      connection.on('exit', () => {
        console.log('exit');
      });

      connection.on('text', (str) => {
        switch (str) {
        case 'init':
          player.init((tweets) => {
            if (connection.readyState === connection.OPEN) {
              connection.sendText(JSON.stringify(tweets));
            }
          });
          break;
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

const replayer = new TweetReplayServer('matz');
replayer.start();
