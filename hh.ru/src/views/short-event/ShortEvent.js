import Component from '../Component';
import './short-event.styl';

class ShortEvent extends Component {
	componentDidMount(){
		this.initEventHandles();
	}

	initEventHandles(){
		const domNode = document.getElementById(`${this.id}`);
		domNode.addEventListener('click', this.handleClick.bind(this));
	}

	render(){
		return (
			`<div id=${this.id} class='short-event'>
				
			</div>`
		);
	}
}

export default ShortEvent;