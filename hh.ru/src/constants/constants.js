import createRemoteActions from './utils/createRemoteActions';

const remoteConstants = createRemoteActions([
	'CALENDAR_GET_STATE',
	'CALENDAR_SAVE_EVENT',
	'CALENDAR_DELETE_EVENT',
	'CALENDAR_SEARCH_EVENTS'
]);

const constants = {
	'CALENDAR_SET_PREV_MONTH': 'CALENDAR_SET_PREV_MONTH',
	'CALENDAR_SET_NEXT_MONTH': 'CALENDAR_SET_NEXT_MONTH'
};

export default Object.assign(remoteConstants, constants);