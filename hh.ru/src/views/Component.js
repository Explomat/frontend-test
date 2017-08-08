
const states = {};

class Component {
	constructor(props){
		this.props = props || {};
		this.state = {};
		this.id = this.props.id || Component.id++;
	}

	componentDidMount(){
		if (this.addEventListeners){
			this.addEventListeners();
		}
		if (this.removeEventListeners){
			const domNode = document.getElementById(this.id);
			if (domNode){
				domNode.addEventListener('DOMNodeRemoved', () => {
					this.removeEventListeners();
				}, false);
			}
		}
	}

	setState(nextState){
		this.state = {
			...this.state,
			...nextState
		};
		if (this.props.key){
			states[this.props.key] = this.state;
		}

		const domNode = document.getElementById(this.id);
		if (domNode){
			/*
				if component has binding DOM events,it must have two methods:
					1. addEventListeners - for binding
					2. removeEventListeners - for unbinding
				Because when we use outerHTML method, events are reset
				and we need to binding them again. If component have only
				addEventListeners method, memory leek possible
			*/
			if (this.removeEventListeners){
				this.removeEventListeners();
			}
			
			domNode.outerHTML = this.render();

			if (this.addEventListeners){
				this.addEventListeners();
			}
		}
	}
}

Component.id = 0;
Component.prototype.toString = function toString() {
	if (this.timeout){
		clearTimeout(this.timeout);
	}

	//this is a dirty hack, for bind listeners to DOM after it render into document
	this.timeout = setTimeout(() => {
		if (this.componentDidMount){
			this.domNode = document.getElementById(this.id);
			this.componentDidMount();
		}
	}, 0);
	if (this.componentWillMount){
		this.componentWillMount();
	}

	// key is used for save state of component
	if (this.props.key && states[this.props.key]){
		this.state = states[this.props.key];
	}
	return this.render();
};

export default Component;