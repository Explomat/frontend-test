import constants from '../constants';
import uuidv1 from 'uuid/v1';

export default function routes(state = {
	items: [],
	isRouteDragging: false
}, action) {
	switch (action.type) {
		case constants.MAPS_ADD_NEW_ROUTE: {
			const { route } = action;
			return {
				...state,
				items: state.items.concat([ {
					id: uuidv1(), //set uuid for render key in Route component
					//placemark: new ymaps.Placemark(route.geometry.coordinates),
					...route
				} ])
			};
		}
		case constants.MAPS_REMOVE_ROUTE: {
			const filteredItems = state.items
				.filter(r => !r.isRemoved)
				.map(r => {
					return { ...r };
				});
			filteredItems[action.index].isRemoved = true;
			return {
				...state,
				items: filteredItems
			};
		}
		case constants.MAPS_REPLACE_ROTES: {
			const { firstIndex, secondIndex } = action;
			const nextItems = state.items
				.filter(r => !r.isRemoved)
				.map(r => {
					return { ...r };
				});

			const temp = nextItems[firstIndex];
			nextItems[firstIndex] = nextItems[secondIndex];
			nextItems[secondIndex] = temp;

			return {
				...state,
				items: nextItems
			};
		}
		case constants.MAPS_DRAG_PLACEMARK_SUCCESS: {
			const { geoObject, index } = action;
			const nextItems = state.items
				.filter(r => !r.isRemoved)
				.map(r => {
					return { ...r };
				});
			nextItems[index] = {
				...nextItems[index],
				...geoObject
			};
			return {
				...state,
				items: nextItems
			};
		}

		case constants.MAPS_DRAG_ROUTE: {
			return {
				...state,
				isRouteDragging: action.isRouteDragging
			};
		}
		
		default:
			return state;
	}
}

