import { update } from './render';

class Component {
	constructor(props){
		this.props = props || {};
		this.state = {};
	}


	setState(nextState){
		this.state = {
			...this.state,
			...nextState
		};
		update(this.id);
	}
}

export default Component;