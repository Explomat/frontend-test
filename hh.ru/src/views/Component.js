class Component {
	constructor(props){
		this.props = props || {};
		this.state = {};
		this.id = Component.id++;
	}

	setState(nextState){
		this.state = nextState;
		const domNode = document.getElementById(this.id);
		if (domNode){
			domNode.outerHTML = this.render();
		}
	}
}

Component.id = 0;
Component.prototype.toString = function toString() {
	if (this.timeout){
		clearTimeout(this.timeout);
	}
	this.timeout = setTimeout(() => {
		if (this.componentDidMount){
			this.componentDidMount();
		}
	}, 0);
	if (this.componentWillMount){
		this.componentWillMount();
	}
	return this.render();
};

export default Component;