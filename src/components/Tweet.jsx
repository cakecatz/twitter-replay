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

  render() {
    return <div style={tweetStyle} className='tweet' key={this.props.tweet.id}>
      <TweetBody tweet={this.props.tweet} />
    </div>;
  }

  // createTweetBody(text) {
  //   return { __html: tw.autoLink(tw.htmlEscape(text)) };
  // }
}
