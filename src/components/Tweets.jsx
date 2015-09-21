import React from 'react';
import Tweet from './Tweet.jsx';
export default class Tweets extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="tweets"><ol>
      {this.props.tweets.map((tweet) => {
        return <li><Tweet tweet={tweet} /></li>;
      }).reverse()}
    </ol></div>;
  }
}
