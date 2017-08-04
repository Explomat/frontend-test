import createRemoteActions from './utils/createRemoteActions';

const remoteConstants = createRemoteActions([
	'CALENDAR_GET_STATE'
]);

const constants = {};

export default Object.assign(remoteConstants, constants);