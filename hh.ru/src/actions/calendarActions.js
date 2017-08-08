import constants from '../constants';
import { dispatch } from '../store/dispatcher';

export function getState(){
	dispatch({ type: constants.CALENDAR_GET_STATE });
	
	setTimeout(() => {
		dispatch({
			type: constants.CALENDAR_GET_STATE_SUCCESS,
			state: {
				curDate: new Date(),
				events: []
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