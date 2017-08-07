import Component from '../Component';
import './calendar-cell.styl';

class CalendarCell extends Component {

	constructor(props){
		super(props);

		this.state = {
			iter: 0
		};

		this.handleClick = this.handleClick.bind(this);
	}

	addEventListeners(){
		const domNode = document.getElementById(`${this.id}`);
		domNode.addEventListener('click', this.handleClick);
	}

	removeEventListeners(){
		const domNode = document.getElementById(`${this.id}`);
		if (domNode){
			domNode.removeEventListener('click', this.handleClick);
		}
	}

	handleClick(){
		this.setState({
			iter: this.state.iter + 1
		});
	}

	render(){
		const { date } = this.props;
		return (
			`<div id=${this.id} class='calendar-cell'>
				${date.toLocaleDateString()}
				<strong>${this.state.iter}</strong>
			</div>`
		);
	}
}

export default CalendarCell;