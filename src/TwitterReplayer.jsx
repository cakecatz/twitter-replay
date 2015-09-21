import React from 'react';
import Tweets from './components/Tweets.jsx';
export default class TwitterReplayer extends React.Component {
  constructor(props) {
    super(props);
    this.ws = new WebSocket(`ws://${props.server}`);
    this.state = {tweets: []};
    this.init();
  }

  init() {
    this.ws.onopen = () => {
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
      <Tweets tweets={this.state.tweets}/>
    </div>;
  }

  handlePlayButton() {
    this.ws.send('start');
  }

  handleStopButton() {
    this.ws.send('stop');
  }

  handlePauseButton() {
    this.ws.send('pause');
  }
}
