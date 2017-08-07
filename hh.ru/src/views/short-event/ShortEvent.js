import Component from '../Component';
import './short-event.styl';

class ShortEvent extends Component {

	constructor(props){
		super(props);

		//this.handleClick = this.handleClick.bind(this);
	}

	addEventListeners(){
		/*const domNode = document.getElementById(`${this.id}`);
		domNode.addEventListener('click', this.handleClick);*/
	}

	render(){
		return (
			`<div id=${this.id} class='short-event'>
				<span class='short-event__pointer'></span>
				<div class='short-event__body'>
					ShortEvent
				</div>
			</div>`
		);
	}
}

export default ShortEvent;