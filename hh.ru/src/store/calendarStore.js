import { subscribe, emit } from '../utils/eventEmmiter';
import { register } from './dispatcher';
import constants from '../constants';
import { dateToString } from '../utils/date';

let state = {
	isFetching: false,
	curDate: new Date(),
	events: {},
	foundEvents: []
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
		case constants.CALENDAR_SAVE_EVENT_SUCCESS: {
			state = {
				...state,
				events: {
					...state.events,
					[dateToString(action.date)]: action.event
				}
			};
			emit('update', state);
			break;
		}
		case constants.CALENDAR_DELETE_EVENT_SUCCESS: {
			delete state.events[dateToString(action.date)];
			emit('update', state);
			break;
		}

		case constants.CALENDAR_SEARCH_EVENTS_SUCCESS: {
			let evs = [];
			const val = action.value.trim();

			if (val !== ''){
				evs = Object.keys(state.events).filter(e => {
					return ~state.events[e].event.indexOf(val);
				}).map(e => {
					return {
						...state.events[e],
						date: new Date(e)
					};
				});
			}
			
			state = {
				...state,
				foundEvents: evs
			};
			emit('update', state);
			break;
		}
		default:
			return;
	}
});