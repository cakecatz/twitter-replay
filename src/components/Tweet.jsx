import React from 'react';
import TweetBody from './TweetBody.jsx';
import tw from 'twitter-text';

const tweetStyle = {
  color: 'black',
  backgroundColor: 'white',
};

export default class Tweet extends React.Component {
  constructor(props) {
    super(props);
  }

  getUserLink() {
    return `https://twitter.com/${this.props.tweet.user.screen_name}`;
  }

  getFullname() {
    return <strong>{this.props.tweet.user.name}</strong>;
  }

  getUsername() {
    return `@${this.props.tweet.user.screen_name}`;
  }

  getTweetedUser() {
    return <a
      className="user-identifier"
      target="external_link"
      href={this.getUserLink()}>
      <span className="fullname">
        {this.getFullname()}
      </span>
      <span> </span>
      <span className="username">
        {this.getUsername()}
      </span>
    </a>;
  }

  render() {
    return <div style={tweetStyle} className='tweet' key={this.props.tweet.id}>
      {this.getTweetedUser()}
      <TweetBody tweet={this.props.tweet} />
    </div>;
  }
}
