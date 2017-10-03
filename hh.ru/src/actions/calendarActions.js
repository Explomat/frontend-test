import constants from '../constants';
import * as api from '../api';
import { dispatch } from '../store/dispatcher';
import { dateToString } from '../utils/date';

export function getState(){
	dispatch({ type: constants.CALENDAR_GET_STATE });
	
	api.getEvents().then(events => {
		dispatch({
			type: constants.CALENDAR_GET_STATE_SUCCESS,
			state: {
				curDate: new Date(),
				events
			}
		});
	});
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
	api.saveEvent({
		...event,
		date: dateToString(date)
	}).then(() => {
		dispatch({
			type: constants.CALENDAR_SAVE_EVENT_SUCCESS,
			event: {
				...event,
				date
			}
		});
	});
}

export function deleteEvent(date){
	api.deleteEvent(date).then(() => {
		dispatch({
			type: constants.CALENDAR_DELETE_EVENT_SUCCESS,
			date
		});
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