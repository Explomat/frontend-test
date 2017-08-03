import Component from '../Component';
import './calendar-cell.styl';

class CalendarCell extends Component {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		this.initEventHandles();
	}

	initEventHandles(){
		const domNode = document.getElementById(`${this.id}`);
		domNode.addEventListener('click', this.handleClick.bind(this));
	}

	handleClick(){
		console.log(this.id);
	}

	render(){
		const { date } = this.props;
		return (
			`<div id=${this.id} class='calendar-cell'>
				${date.toLocaleDateString()}
			</div>`
		);
	}
}

export default CalendarCell;