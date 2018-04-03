import React, { Component } from 'react';
import SearchRoute from '../components/search-route';
import Map from '../components/map';
import Routes from '../components/routes';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import * as actionCreators from '../actions';
import { connect } from 'react-redux';
import flow from 'lodash/flow';


class MapsContainer extends Component {

	/*constructor(props){
		super(props);

		this.handleSearch = this.handleSearch.bind(this);
		this.handleChangeSearchValue = this.handleChangeSearchValue.bind(this);
		this.handleAddRoute = this.handleAddRoute.bind(this);
		this.handleRemoveRoute = this.handleRemoveRoute.bind(this);
	}

	handleSearch(value){
		this.props.getGeoObjects(value);
	}

	handleChangeSearchValue(value){
		this.props.changeSearchValue(value);
	}

	handleAddRoute(route){
		this.props.addNewRoute(route);
	}

	handleRemoveRoute(index){
		this.props.removeRoute(index);
	}*/

	render(){
		const {
			getGeoObjects,
			changeSearchValue,
			addNewRoute,
			removeRoute,
			replaceRoutes,
			dragRoute,
			dragPlacemark,
			searchRoute,
			routes
		} = this.props;
		return (
			<div className='maps-container'>
				<SearchRoute
					onSearch={getGeoObjects}
					changeSearchValue={changeSearchValue}
					onSelect={addNewRoute}
					{...searchRoute}
				/>
				<Routes
					routes={routes.items.filter(r => !r.isRemoved)}
					onRemove={removeRoute}
					onReplace={replaceRoutes}
					onDrag={dragRoute}
				/>
				<Map routes={routes} center={[55.76, 37.64]} onDragEndPlacemark={dragPlacemark}/>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return { ...state };
}

export default flow(
	DragDropContext(HTML5Backend),
	connect(mapStateToProps, actionCreators)
)(MapsContainer);