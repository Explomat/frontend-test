import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FeatureRoute extends Component {

	constructor(props){
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	handleClick(){
		const { onClick, ...props } = this.props;
		if (onClick){
			onClick(props);
		}
	}

	handleKeyDown(e){
		const node = this.refs.point;
		const { onClick, ...props } = this.props;
		if (e.keyCode === 13 && onClick){
			onClick(props);
		} else {
			const nextNode =
				e.keyCode === 40 ? node.nextSibling :
				e.keyCode === 38 ? node.previousSibling :
				null;
			if (nextNode){
				e.preventDefault();
				nextNode.focus();
			}
		}
	}	

	render(){
		const { id, name, description } = this.props;
		return (
			<div
				ref='point'
				tabIndex={id}
				className='point'
				onKeyDown={this.handleKeyDown}
				onClick={this.handleClick}
			>
				<div className='point__name'>{name}</div>
				<div className='point__description'>{description}</div>
			</div>
		);
	}
}

FeatureRoute.propTypes = {
	metaDataProperty: PropTypes.shape({
		GeocoderMetaData: PropTypes.shape({
			kind: PropTypes.string,
			text: PropTypes.string,
			precision: PropTypes.string,
			Address: PropTypes.shape({
				country_code: PropTypes.string,
				formatted: PropTypes.string
			}),
			Components: PropTypes.arrayOf(
				PropTypes.shape({
					kind: PropTypes.string,
					name: PropTypes.string
				})
			),
			AddressDetails: PropTypes.shape({
				Country: PropTypes.shape({
					AddressLine: PropTypes.string,
					CountryNameCode: PropTypes.string,
					CountryName: PropTypes.string,
					Locality: PropTypes.shape({
						LocalityName: PropTypes.string,
						Premise: PropTypes.shape({
							PremiseName: PropTypes.string
						})
					})
				})
			})
		})
	}),
	description: PropTypes.string,
	name: PropTypes.string,
	boundedBy: PropTypes.shape({
		Envelope: PropTypes.shape({
			lowerCorner: PropTypes.string,
			upperCorner: PropTypes.string
		})
	}),
	Point: PropTypes.shape({
		pos: PropTypes.string
	}),
	uriMetaData: PropTypes.shape({
		URI: PropTypes.shape({
			uri: PropTypes.string
		})
	})
};

export default FeatureRoute;