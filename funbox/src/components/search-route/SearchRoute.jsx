import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextView } from '../modules/text-label';
import FeatureRoute from './FeatureRoute';
import './search-route.styl';

class SearchRoute extends Component {

	constructor(props){
		super(props);

		this.TIMEOUT = 400;
		this.handleSearch = this.handleSearch.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.handleSelect = this.handleSelect.bind(this);

		this.state = {
			isDisplayItems: false
		};
	}

	componentDidMount(){
		document.addEventListener('click', this.handleClickOutside);
	}

	handleSearch(value){
		const { onSearch, changeSearchValue } = this.props;

		if (changeSearchValue){
			changeSearchValue(value);
		}
		if (onSearch && value){
			this._onSearch(value);
		} else if (!value){
			this.setState({
				isDisplayItems: false
			});
		}
	}

	handleKeyDown(e){
		const { isDisplayItems } = this.state;
		const { geoData } = this.props;
		if (
			isDisplayItems &&
			geoData.features.length > 0 &&
			e.keyCode === 40
		){
			e.preventDefault();
			this.items.firstChild.focus();
		}
	}

	handleClick(e){
		if (this.props.onSearch && e.target.value.trim() !== ''){
			this._onSearch(e.target.value);
		}
	}

	handleClickOutside(e){
		const { isDisplayItems } = this.state;

		if (isDisplayItems && !this.searchRoute.contains(e.target)){
			this.setState({
				isDisplayItems: false
			});
		}
	}

	handleSelect(fr){
		this.setState({
			isDisplayItems: false
		});
		if (this.props.onSelect){
			this.props.onSelect(fr);
		}
	}

	_onSearch(value){
		const self = this;
		this.prevTime = Date.now();
		clearTimeout(this.timeoutId);
		
		this.timeoutId = setTimeout(
			() => {
				if ((Date.now() - this.prevTime) >= self.TIMEOUT){
					this.setState({
						isDisplayItems: true
					});
					this.props.onSearch(value);
				}
			},
			self.TIMEOUT
		);
	}

	render(){
		const { isDisplayItems } = this.state;
		const { searchValue, geoData } = this.props;
		return (
			<div
				className='search-route'
				ref={(searchRoute) => {
					this.searchRoute = searchRoute;
				}}
			>
				<TextView
					value={searchValue}
					placeholder='Введите новую точку маршрута'
					onChange={this.handleSearch}
					onKeyDown={this.handleKeyDown}
					onClick={this.handleClick}
				/>
				{isDisplayItems && geoData.features.length > 0 &&
				<div className='search-route__items'>
					<div
						ref={items => {
							this.items = items;
						}}
						className='search-route__content'
					>
						{geoData.features.map((fp, index) => {
							return <FeatureRoute key={index} {...fp} onClick={this.handleSelect}/>;
						})}
					</div>
				</div>}
			</div>
		);
	}
}

SearchRoute.propTypes = {
	searchValue: PropTypes.string.isRequired,
	geoData: PropTypes.shape({
		type: PropTypes.string.isRequired,
		properties: PropTypes.shape({
			ResponseMetaData: PropTypes.shape({
				SearchRequest: PropTypes.shape({
					request: PropTypes.string.isRequired,
					results: PropTypes.string.number,
					skip: PropTypes.string.number,
					boundedBy: PropTypes.arrayOf(PropTypes.array)
				}).isRequired
			}).isRequired,
			SearchResponse: PropTypes.shape({
				found: PropTypes.number.isRequired,
				Point: PropTypes.shape({
					type: PropTypes.string.isRequired,
					coordinates: PropTypes.array.isRequired
				}),
				boundedBy: PropTypes.arrayOf(
					PropTypes.arrayOf(
						PropTypes.number
					)
				),
				display: PropTypes.string.isRequired
			})
		}),
		features: PropTypes.arrayOf(PropTypes.object).isRequired
	}).isRequired,
	onSearch: PropTypes.func,
	changeSearchValue: PropTypes.func,
	onSelect: PropTypes.func
};

SearchRoute.defaultProps = {
	searchValue: '',
	geoData: {}
};

export default SearchRoute;