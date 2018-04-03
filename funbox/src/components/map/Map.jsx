import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import './map.styl';

class Map extends Component {
	constructor(props){
		super(props);

		this.nextProps = {};
		this.map = null;
		this.collection = null;
		this.route = null;
		this.isRouteRedrawing = false;
		this.renderPlacemarks = this.renderPlacemarks.bind(this);
	}

	componentDidMount(){
		this.map = new ymaps.Map(this.DOMmap, {
			center: this.props.center,
			zoom: this.props.zoom,
			controls: [ 'zoomControl' ]
		});

		this.collection = new ymaps.GeoObjectCollection(null, { preset: 'islands#orangeIcon' });
		this.map.geoObjects.add(this.collection);

		ymaps.geolocation.get({
			provider: 'auto',
			mapStateAutoApply: true
		}).then(result => {
			this.map.geoObjects.add(result.geoObjects);
		});
	}

	componentWillReceiveProps(nextProps){
		//this.nextProps = nextProps;

		if (isEqual(nextProps.routes.items, this.props.routes.items) || this.isRouteRedrawing){
			return; 
		}

		this.renderPlacemarks(nextProps);

		/*clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			this.renderPlacemarks();
		}, this.props.routeTimeoutForUpdate);*/
	}

	renderPlacemarks(nextProps){
		if (!this.map){
			return;
		}
		const { routes } = nextProps;
		this.collection.removeAll();
		const notRemovedRoutes = routes.items.filter(r => !r.isRemoved);

		notRemovedRoutes.forEach((r, index) => {
			const coords = r.Point.pos.split(' ');
			const pm = new ymaps.Placemark(coords, {
				iconContent: index + 1,
				balloonContentHeader: r.name,
				balloonContentBody: r.description
			}, {
				draggable: true,
				preset: 'islands#yellowStretchyIcon'
			});
			pm.events.add('dragend', e => {
				if (this.props.onDragEndPlacemark){
					this.props.onDragEndPlacemark(e.get('target').geometry.getCoordinates(), index);
				}
			});
			this.collection.add(pm);
		});

		const coordinates = notRemovedRoutes.reduce((f, s) => {
			const coords = s.Point.pos.split(' ');
			return f.concat([ coords ]);
		}, []);

		if (coordinates.length <= 1){
			if (coordinates.length === 1){
				this.map.setCenter(this.collection.get(0).geometry.getCoordinates());
			}
			return;
		}

		const polyline = new ymaps.Polyline(coordinates, {}, {
			//strokeColor: '#000000',
			strokeWidth: 4
			// Первой цифрой задаем длину штриха. Второй цифрой задаем длину разрыва.
			//strokeStyle: '1 5'
		});

		this.collection.add(polyline);

		// Устанавливаем карте границы линии.
		this.map.setBounds(polyline.geometry.getBounds());

		/*if (this.route){
			this.map.geoObjects.remove(this.route);
		}

		// if coordinates.length === 0,
		// the request will not be exec and self.isRouteRedrawing will not be equal false
		if (coordinates.length > 0) {   
			this.isRouteRedrawing = true;
			ymaps.route(coordinates, {
				multiRoute: true,
				mapStateAutoApply: true
			}).then(route => {
				this.isRouteRedrawing = false;
				this.route = route;
				this.map.geoObjects.add(route);
			}, err => {
				this.isRouteRedrawing = false;
				console.log(err);
			});
		}*/
	}
	
	render(){
		return (
			<div
				className='map'
				ref={map => {
					this.DOMmap = map; 
				}}
			/>
		);
	}
}

Map.defaultProps = {
	routeTimeoutForUpdate: 1000,
	zoom: 10,
	routes: {}
};

Map.propTypes = {
	updateRouteTimeout: PropTypes.number,
	center: PropTypes.arrayOf(PropTypes.number).isRequired,
	zoom: PropTypes.number
};

export default Map;