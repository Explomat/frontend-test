import constants from '../constants';
import { dispatch } from '../store/dispatcher';

export function getState(){
	dispatch({ type: constants.CALENDAR_GET_STATE });
	
	setTimeout(() => {
		dispatch({
			type: constants.CALENDAR_GET_STATE_SUCCESS,
			state: {
				curDate: new Date(),
				events: {
					'2017.7.1': {
						event: 'test',
						participants: ['Матвеев Савва', 'Габдуллин Дамир'],
						description: 'description'
					},
					'2017.7.2': {
						event: 'test1',
						participants: ['Матвеев Савва', 'Габдуллин Дамир'],
						description: 'description'
					},
					'2017.7.3': {
						event: 'test2',
						participants: ['Матвеев Савва', 'Габдуллин Дамир'],
						description: 'description'
					},
					'2017.7.4': {
						event: 'test3',
						participants: ['Матвеев Савва', 'Габдуллин Дамир'],
						description: 'description'
					},
					'2017.7.5': {
						event: 'test4',
						participants: ['Матвеев Савва', 'Габдуллин Дамир'],
						description: 'description'
					},
					'2017.7.6': {
						event: 'test5',
						participants: ['Матвеев Савва', 'Габдуллин Дамир'],
						description: 'description'
					},
					'2017.7.7': {
						event: 'test6',
						participants: ['Матвеев Савва', 'Габдуллин Дамир'],
						description: 'description'
					},
					'2017.7.8': {
						event: 'test7',
						participants: ['Матвеев Савва', 'Габдуллин Дамир'],
						description: 'description'
					},
					'2017.7.9': {
						event: 'test8',
						participants: ['Матвеев Савва', 'Габдуллин Дамир'],
						description: 'description'
					}
				}
			}
		});
	}, 300);
}

export function prevMonth(){
	dispatch({
		type: constants.CALENDAR_SET_PREV_MONTH
	});
}

export function nextMonth(){
	dispatch({
		type: constants.CALENDAR_SET_NEXT_MONTH
	});
}

export function saveEvent(event, date){
	dispatch({
		type: constants.CALENDAR_SAVE_EVENT_SUCCESS,
		event,
		date
	});
}

export function deleteEvent(date){
	dispatch({
		type: constants.CALENDAR_DELETE_EVENT_SUCCESS,
		date
	});
}

export function searchEvents(value){
	dispatch({
		type: constants.CALENDAR_SEARCH_EVENTS_SUCCESS,
		value
	});
}