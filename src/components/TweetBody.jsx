import React from 'react';
import twitterText from 'twitter-text';

export class Anchor extends React.Component {
  render() {
    return <a
      target="external_link"
      href={this.props.href}
      dangerouslySetInnerHTML={{__html: this.props.content}}
    />;
  }
}

class Link extends React.Component {
  render() {
    return <Anchor
      className="tweet-url"
      href={this.props.entity.url}
      content={this.props.entity.display_url}
    />;
  }
}

class User extends React.Component {
  getUrl() {
    return `https://twitter.com/${this.props.entity.screen_name}`;
  }

  getText() {
    return `@<b>${this.props.entity.screen_name}</b>`;
  }

  render() {
    return <Anchor
      className="user-mention"
      href={this.getUrl()}
      content={this.getText()}
    />;
  }
}

class Hashtag extends React.Component {
  getText() {
    return `#<b>${this.props.entity.text}</b>`;
  }

  getUrl() {
    return `https://twitter.com/hashtag/${this.props.entity.text}?src=hash`;
  }

  render() {
    return <Anchor
      className="hashtag"
      href={this.getUrl()}
      content={this.getText()}
    />;
  }
}

class Cashtag extends React.Component {
  getUrl() {
    return `https://twitter.com/search?q=%24${this.props.entity.text}&src=ctag`;
  }

  getText() {
    return `$${this.props.entity.text}`;
  }

  render() {
    return <Anchor
      className="cashtag"
      href={this.getUrl()}
      content={this.getText()}
    />;
  }
}

class Media extends React.Component {
  getStyle() {
    return {
      width: '100%',
      marginTop: '-15px',
    };
  }

  render() {
    return <div className="preview">
      <a className="media media-thumbnail">
        <img
          src={this.props.entity.media_url}
          style={this.getStyle()}
          alt="Embedded image permalink"/>
      </a>
    </div>;
  }
}

class Text extends React.Component {
  render() {
    return <span
      className="tweet-text"
      dangerouslySetInnerHTML={{__html: this.props.text}}
    />;
  }
}

export default class TweetBody extends React.Component {
  constructor(props) {
    super(props);
  }

  getComponents() {
    const components = [];
    let pos = 0;
    const text = this.props.tweet.text;
    this.getEntities().forEach((entity) => {
      components.push(<Text text={text.substring(pos, entity.indices[0])}/>);
      switch (entity.type) {
      case 'urls':
        components.push(<Link entity={entity}/>);
        break;
      case 'hashtags':
        components.push(<Hashtag entity={entity}/>);
        break;
      case 'media':
        console.log(entity);
        components.push(<Media entity={entity}/>);
        break;
      case 'symbols':
        components.push(<Cashtag entity={entity}/>);
        break;
      case 'user_mentions':
        components.push(<User entity={entity}/>);
        break;
      default:
        break;
      }
      pos = entity.indices[1];
    });
    components.push(<Text text={text.substring(pos, text.length)}/>);
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
    entities.sort((a, b) => {
      if (a.indices[0] > b.indices[0]) {
        return 1;
      } else if (a.indices[0] < b.indices[0]) {
        return -1;
      }
      return 0;
    });
    return entities;
  }

  render() {
    return <div className='tweet-body'>
      {this.getComponents()}
    </div>;
  }
}
