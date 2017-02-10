import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import FontAwesome from 'react-fontawesome'
import numeral from 'numeral'

export default class PostCard extends Component {
    render () {
        let faves = this.props.faves;
        if (faves > 999) faves = numeral(faves).format('0.0a');
        let image = 'url(' + this.props.image + ')';
        return (
    <div className="story">
     <Link className="story-card" to={this.props.slug}>
  <div className="story-header">
    <div className="story-img" style={{backgroundImage: image}}></div>
    <div className="story-title">
      {this.props.title}
      <div className="story-author">by: {this.props.author}</div>
    </div>
    
    </div>
       
    <div className="story-preview">
      {this.props.preview}
       <div className="story-faves">
      <FontAwesome name="star" /> {faves}
      </div>
      </div>
      
    </Link>
    </div>
        )
    }
}

PostCard.propTypes = {
    title: PropTypes.string.isRequired
};