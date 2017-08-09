import Component from '../Component';
import './calendar-cell.styl';

class CalendarCell extends Component {

	constructor(props){
		super(props);

		this.state = {
			isSelected: false
		};

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

	handleClick(){
		this.setState({
			isSelected: true
		});
		/*if (this.props.onClick){
			this.props.onClick(e, this);
		}*/
	}

	render(){
		const { isSelected } = this.state;
		const { isCurDate, isCurMonth, title } = this.props;

		let classes = isCurDate ? 'calendar-cell--cur-date' : '';
		classes += isSelected ? 'calendar-cell--selected' : '';

		const titleClasses = !isCurMonth ? 'calendar-cell__title--not-cur-date' : '';
		return (
			`<div id=${this.id} class='calendar-cell ${classes}'>
				<span class='calendar-cell__title ${titleClasses}'>${title}</span>
			</div>`
		);
	}
}

export default CalendarCell;