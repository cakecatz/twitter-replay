import React from 'react';
import Tweets from './components/Tweets.jsx';
import YouTubePlayer from './components/YouTubePlayer.jsx';
export default class TwitterReplayer extends React.Component {
  constructor(props) {
    super(props);
    this.ws = new WebSocket(`ws://${props.server}`);
    this.state = {tweets: [], videoStatus: 'init', timelineStatus: 'stop'};
    this.init();
  }

  init() {
    this.ws.onopen = () => {
      this.ws.send('init');
    };

    this.ws.onmessage = (e) => {
      const tweets = JSON.parse(e.data);

      this.setState({
        tweets: this.state.tweets.concat(tweets),
      });
    };
  }

  render() {
    return <div>
      <button className="play" onClick={this.handlePlayButton.bind(this)}>Play!</button>
      <button className="pause" onClick={this.handlePauseButton.bind(this)}>Pause!</button>
      <button className="stop" onClick={this.handleStopButton.bind(this)}>Stop!</button>
      <span className='status'>
        videoStatus: {this.state.videoStatus} TLStatus: {this.state.timelineStatus}
      </span>
      <YouTubePlayer
        onPlay={this._onPlayerPlay.bind(this)}
        onReady={this._onPlayerReady.bind(this)}
        onPause={this._onPlayerPause.bind(this)}
        url={'https://www.youtube.com/watch?v=h68AH5nEaxw'}
      />
      <Tweets tweets={this.state.tweets}/>
    </div>;
  }

  _onPlayerReady(event) {
    this.player = event.target;
    this.setState({
      videoStatus: 'stop',
    });
  }

  _onPlayerPause() {
    this.setState({
      videoStatus: 'pause',
    });
  }

  _onPlayerPlay() {
    this.setState({
      videoStatus: 'playing',
    });
  }

  handlePlayButton() {
    this.playVideo();
    this.ws.send('start');
    this.setState({
      timelineStatus: 'playing',
    });
  }

  handleStopButton() {
    this.stopVideo();
    this.ws.send('stop');
    this.setState({
      timelineStatus: 'stop',
      tweets: [],
    });
  }

  handlePauseButton() {
    this.pauseVideo();
    this.ws.send('pause');
    this.setState({
      timelineStatus: 'pause',
    });
  }

  pauseVideo() {
    this.player.pauseVideo();
  }

  playVideo() {
    if (this.state.videoStatus !== 'pause') {
      console.log('hello');
      this.player.seekTo(1);
    }
    this.player.playVideo();
  }

  stopVideo() {
    this.player.pauseVideo();
    this.player.seekTo(1);
    this.setState({
      videoStatus: 'stop',
    });
  }
}
