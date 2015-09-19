import React from 'react';
import twitterText from 'twitter-text';

class Url extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <a
      className="tweet-url"
      href={this.props.entity.url}
      dangerouslySetInnerHTML={{__html: this.props.entity.display_url}}
    />;
  }
}

export default class TweetBody extends React.Component {
  constructor(props) {
    super(props);
  }

  getComponents() {
    const components = [];
    // this.props.tweet.entities.forEach((entity) => {
    //   console.log(entity);
    // });
    // console.log(this.getEntities());
    this.getEntities().forEach((entity) => {
      switch (entity.type) {
      case 'urls':
        components.push(<Url entity={entity}/>);
        break;
      case 'hashtags':
        break;
      case 'trends':
        break;
      case 'symbols':
        break;
      case 'user_mentions':
        break;
      default:
        break;
      }
    });
    return components;
  }

  getEntities() {
    let entities = [];
    Object.keys(this.props.tweet.entities).forEach((key) => {
      let entity = this.props.tweet.entities[key];
      if (entity.length > 0) {
        entity.map((v) => {
          v.type = key;
          return v;
        });
        entities = entities.concat(entity);
      }
    });
    return entities;
  }

  render() {
    return <div className='tweet-body'>
      {this.getComponents()}
    </div>;
  }
}
