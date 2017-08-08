import Component from '../Component';
import './calendar-cell.styl';

class CalendarCell extends Component {

	constructor(props){
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	addEventListeners(){
		const domNode = document.getElementById(`${this.id}`);
		if (domNode){
			domNode.addEventListener('click', this.handleClick);
		}
	}

	removeEventListeners(){
		const domNode = document.getElementById(`${this.id}`);
		if (domNode){
			domNode.removeEventListener('click', this.handleClick);
		}
	}

	handleClick(e){
		if (this.props.onClick){
			this.props.onClick(e, this);
		}
	}

	render(){
		const { isCurDate, isCurMonth, title } = this.props;
		const classes = isCurDate ? 'calendar-cell--cur-date' : '';
		const titleClasses = !isCurMonth ? 'calendar-cell__title--not-cur-date' : '';
		return (
			`<div id=${this.id} class='calendar-cell ${classes}'>
				<span class='calendar-cell__title ${titleClasses}'>${title}</span>
			</div>`
		);
	}
}

export default CalendarCell;