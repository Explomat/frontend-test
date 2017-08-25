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
					'8/1/2017': {
						event: 'test',
						participants: ['Матвеев Савва', 'Габдуллин Дамир'],
						description: 'description'
					},
					'8/3/2017': {
						event: 'test1',
						participants: ['Матвеев Савва', 'Габдуллин Дамир'],
						description: 'description'
					},
					'8/5/2017': {
						event: 'test222222222222222222222222222222',
						participants: ['Матвеев Савва', 'Габдуллин Дамир'],
						description: 'description'
					},
					'8/7/2017': {
						event: 'test3',
						participants: ['Матвеев Савва', 'Габдуллин Дамир'],
						description: 'description'
					},
					'8/9/2017': {
						event: 'test4',
						participants: ['Матвеев Савва', 'Габдуллин Дамир'],
						description: 'description'
					},
					'8/11/2017': {
						event: 'test5',
						participants: ['Матвеев Савва', 'Габдуллин Дамир'],
						description: 'description'
					},
					'8/13/2017': {
						event: 'test6',
						participants: ['Матвеев Савва', 'Габдуллин Дамир'],
						description: 'description'
					},
					'8/15/2017': {
						event: 'test7',
						participants: ['Матвеев Савва', 'Габдуллин Дамир'],
						description: 'description'
					},
					'8/17/2017': {
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

export function setDate(date){
	dispatch({
		type: constants.CALENDAR_SET_DATE_EVENT,
		date
	});
}

export function searchEvents(value){
	dispatch({
		type: constants.CALENDAR_SEARCH_EVENTS_SUCCESS,
		value
	});
}