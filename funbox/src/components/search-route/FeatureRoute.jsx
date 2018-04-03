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
		const { properties } = this.props;
		return (
			<div
				ref='point'
				tabIndex={properties.id}
				className='point'
				onKeyDown={this.handleKeyDown}
				onClick={this.handleClick}
			>
				<div className='point__name'>{properties.name}</div>
				<div className='point__description'>{properties.description}</div>
			</div>
		);
	}
}

FeatureRoute.propTypes = {
	type: PropTypes.string.isRequired,
	properties: PropTypes.shape({
		GeocoderMetaData: PropTypes.shape({
			kind: PropTypes.string.isRequired,
			text: PropTypes.string.isRequired,
			precision: PropTypes.string.isRequired
		}),
		id: PropTypes.string,
		description: PropTypes.string,
		name: PropTypes.string,
		boundedBy: PropTypes.arrayOf(
			PropTypes.arrayOf(
				PropTypes.number
			)
		)
	}).isRequired,
	geometry: PropTypes.shape({
		type: PropTypes.string.isRequired,
		coordinates: PropTypes.arrayOf(PropTypes.number).isRequired
	}).isRequired,
	geometries: PropTypes.arrayOf(PropTypes.object)
};

export default FeatureRoute;