import React from 'react'
import FontAwesome from 'react-fontawesome'

export const SocialButtons = (props) => {
	const {draft, fave, tweet, fb} = props;
	const star = draft === true ? '' : <FontAwesome name="star" className="social-button" onClick={fave} />
		const twitter = draft === true ? '' : <FontAwesome name="twitter" className="social-button" onClick={tweet} />
		const facebook = draft === true ? '' : <FontAwesome name="facebook" className="social-button" onClick={fb} />
		return (
			<div className="social hidden"><div></div>{star}{twitter}{facebook}<div></div></div>
		)
		}