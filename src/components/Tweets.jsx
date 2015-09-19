import React from 'react';
import Tweet from './Tweet.jsx';
export default class Tweets extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="tweets">
      {this.props.tweets.map((tweet) => {
        return <Tweet tweet={tweet} />;
      })}
    </div>;
  }
}
