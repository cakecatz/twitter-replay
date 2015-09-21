require('babel/register');
const ws = require('nodejs-websocket');
const TweetPlayer = require('./libs/TweetPlayer');

class TweetReplayServer {
  constructor(track) {
    this.port = 8080;
    this.player = null;
    this.track = track;
    this.server = ws.createServer((connection) => {
      connection.on('exit', () => {
        console.log('exit');
      });

      connection.on('text', (str) => {
        switch (str) {
        case 'start':
          if (this.player === null) {
            this.initPlayer(this.track);
          }
          this.play(connection);
          break;
        case 'stop':
          this.stop();
          break;
        case 'pause':
          this.pause();
          break;
        default:
          break;
        }
      });
    });
  }

  initPlayer(name) {
    this.player = new TweetPlayer(name);
    this.player.setSpeed(5);
    this.player.setInterval(250);
  }

  play(connection) {
    this.player.play((tweets) => {
      if (connection.readyState !== 1) {
        this.player.stop();
        return;
      }
      connection.sendText(JSON.stringify(tweets));
    });
  }

  stop() {
    if (this.player) {
      this.player.stop();
    }
  }

  start() {
    this.server.listen(this.port);
  }

  pause() {
    if (this.player) {
      this.player.pause();
    }
  }
}

const replayer = new TweetReplayServer('GATE');
replayer.start();
