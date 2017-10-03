import { subscribe, emit } from '../utils/eventEmmiter';
import { register } from './dispatcher';
import constants from '../constants';
import { dateToString, parseDateFromString, equalDates } from '../utils/date';

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
			const events = (action.state.events || []).reduce((f, s) => {
				f[s.date] = s;
				return f;
			}, {});
			state = {
				...state,
				...action.state,
				events,
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
			const ev = action.event || {};
			state = {
				...state,
				events: {
					...state.events,
					[dateToString(ev.date)]: {
						date: dateToString(ev.date),
						event: ev.event || '',
						description: ev.description || '',
						participants: ev.participants || []
					}
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

		case constants.CALENDAR_SET_DATE_EVENT: {
			state = {
				...state,
				curDate: action.date
			};
			emit('update', state);
			break;
		}

		case constants.CALENDAR_SEARCH_EVENTS_SUCCESS: {
			let evs = [];
			const val = action.value.trim().toLowerCase();

			if (val !== ''){
				evs = Object.keys(state.events).filter(e => {
					const ev = state.events[e];
					const participants =
						ev.participants
							.filter(p => ~p.toLowerCase().indexOf(val));
					const d = parseDateFromString(val);
					return ~ev.event
							.toLowerCase()
							.indexOf(val) ||
							participants.length > 0 ||
							equalDates(d, new Date(e));
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