import Component from '../Component';
import Element from '../Element';
import tags from '../tags';
import './calendar-cell.styl';

export class CalendarCell extends Component {

	constructor(props){
		super(props);

		this.state = {
			isSelected: false
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){
		const rect = this.domNode.getBoundingClientRect();
		this.setState({
			isSelected: true
		});
		if (this.props.onClick){
			this.props.onClick(rect, this.props.date);
		}
	}

	render(){
		const { isSelected } = this.state;
		const { isCurDate, isCurMonth, title, event } = this.props;

		let classes = isCurDate ? 'calendar-cell--cur-date ' : '';
		classes += isSelected ? 'calendar-cell--selected ' : '';

		const titleClasses = !isCurMonth ? 'calendar-cell__title--not-cur-date' : '';
		
		return (
			tags.div({
				class: `calendar-cell ${classes}`,
				onClick: this.handleClick
			}, tags.div({
				class: 'calendar-cell__content'
			}, [
				tags.div({
					class: `calendar-cell__title ${titleClasses}`
				}, title),
				tags.div({
					class: 'calendar-cell__event-title'
				}, event.event),
				tags.div({
					class: 'calendar-cell__event-participants'
				}, event.participants.join(', '))
			]))
		);
	}
}

CalendarCell.defaultProps = {
	event: {
		event: '',
		participants: [],
		description: ''
	}
};

const CalendarCellElement = Element.createFactory(CalendarCell);
export default CalendarCellElement;