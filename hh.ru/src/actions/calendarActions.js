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
					'1.08.2017': {
						event: 'test',
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