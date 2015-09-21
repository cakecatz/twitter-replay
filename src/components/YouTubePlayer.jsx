import YouTube from 'react-youtube';
import React from 'react';

export default class YouTubePlayer extends React.Component {
  getStyle() {
    return {
      float: 'left',
    };
  }

  render() {
    return <div className="youtube-player">
      <YouTube
        url={this.props.url}
        onPlay={this.props.onPlay}
        onReady={this.props.onReady}
        onPause={this.props.onPause}
      />
    </div>;
  }
}
