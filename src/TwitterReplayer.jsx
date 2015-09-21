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
      <button className="play" onClick={this.handleClick.bind(this)}>Play!</button>
      <Tweets tweets={this.state.tweets}/>
    </div>;
  }

  handleClick() {
    this.ws.send('start');
  }
}
