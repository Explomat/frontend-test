import createRemoteActions from './utils/createRemoteActions';

const remoteConstants = createRemoteActions([
	'CALENDAR_GET_STATE'
]);

const constants = {
	'CALENDAR_SET_PREV_MONTH': 'CALENDAR_SET_PREV_MONTH',
	'CALENDAR_SET_NEXT_MONTH': 'CALENDAR_SET_NEXT_MONTH'
};

export default Object.assign(remoteConstants, constants);