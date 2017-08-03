class Component {
	constructor(props){
		this.props = props || {};
		this.id = Component.id++;
	}

	setState(){
		
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
	return this.render();
};

export default Component;