import React from 'react';
import TweetBody from './TweetBody.jsx';
import tw from 'twitter-text';
import moment from 'moment';

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

  getTime() {
    const time = this.props.tweet.created_at;
    return moment(time, 'ddd MMM DD HH:mm:ss ZZ YYYY').format('LLL');
  }

  getAvatar() {
    return <img className='avatar'
      src={this.props.tweet.user.profile_image_url} />;
  }

  getTweetedUser() {
    return <a
      className="user-identifier"
      target="external_link"
      href={this.getUserLink()}>
      {this.getAvatar()}
      <span className="fullname">
        {this.getFullname()}
      </span>
      <span> </span>
      <span className="username">
        {this.getUsername()}
      </span>
      <small className="time">
        {this.getTime()}
      </small>
    </a>;
  }

  render() {
    return <div style={tweetStyle} className='tweet' key={this.props.tweet.id}>
      <div className="content">
        {this.getTweetedUser()}
        <TweetBody tweet={this.props.tweet} />
      </div>
    </div>;
  }
}
