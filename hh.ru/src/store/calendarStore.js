import { subscribe, emit } from '../utils/eventEmmiter';
import { register } from './dispatcher';
import constants from '../constants';

let state = {
	isFetching: false,
	curDate: new Date(),
	events: {}
};

export function addEventListener(cb){
	subscribe('update', cb);
}

register(function calendarStore(action){
	switch (action.type){
		case constants.CALENDAR_GET_STATE: {
			state = {
				...state,
				isFetching: true
			};
			emit('update', state);
			break;
		}
		case constants.CALENDAR_GET_STATE_SUCCESS: {
			state = {
				...state,
				...action.state,
				isFetching: false
			};
			emit('update', state);
			break;
		}
		case constants.CALENDAR_SET_PREV_MONTH: {
			const { curDate } = state;
			state = {
				...state,
				curDate: new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
			};
			emit('update', state);
			break;
		}
		case constants.CALENDAR_SET_NEXT_MONTH: {
			const { curDate } = state;
			state = {
				...state,
				curDate: new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
			};
			emit('update', state);
			break;
		}
		default:
			return;
	}
});