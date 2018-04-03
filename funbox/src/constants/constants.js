import keyMirror from 'keymirror';
import createRemoteActions from './utils/createRemoteActions';
import merge from 'lodash/merge';

const remoteConstants = createRemoteActions([
	'APP_ERROR_MESSAGE',
	'APP_INFO_MESSAGE',
	'MAPS_GET_GEO_OBJECTS',
	'MAPS_DRAG_PLACEMARK'
]);

const constants = keyMirror({
	'MAPS_CHANGE_SEARCH_VALUE': null,
	'MAPS_ADD_NEW_ROUTE': null,
	'MAPS_REMOVE_ROUTE': null,
	'MAPS_REPLACE_ROTES': null,
	'MAPS_DRAG_ROUTE': null
});

export default merge(remoteConstants, constants);