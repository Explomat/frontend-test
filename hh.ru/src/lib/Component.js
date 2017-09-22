import { update } from './render';
import shallowCompare from './shallowCompare';

class Component {
	constructor(props){
		this.props = props || {};
		this.state = {};
	}


	setState(nextState){
		/*this.state = {
			...this.state,
			...nextState
		};*/
		update(this, nextState);
	}

	shouldComponentUpdate(nextProps, nextState){
		return shallowCompare(this, nextProps, nextState);
	}
}

export default Component;