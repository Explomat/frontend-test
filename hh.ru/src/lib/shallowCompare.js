import shallowEqual from './shallowEqual';

function shallowCompare(instance, nextProps, nextState) {
	return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
}

export default shallowCompare;