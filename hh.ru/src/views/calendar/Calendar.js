import Component from '../Component';
import { addEventListener } from '../../store/calendarStore';
import { getState, addEvent } from '../../actions/calendarActions';
import CalendarCell from '../calendar-cell';
import ShortEvent from '../short-event';
import './calendar.styl';

function updateState(st) {
	this.setState({
		...this.state,
		...st
	});
}

class Calendar extends Component {
	constructor(props){
		super(props);

		this.state = {
			isDisplayShortEvent: false
		};

		this.handleAddEvent = this.handleAddEvent.bind(this);
		this.handleToggleDisplayShortEvent = this.handleToggleDisplayShortEvent.bind(this);
	}

	componentWillMount(){
		addEventListener(updateState.bind(this));
		getState();
	}

	componentDidMount(){
		this.initEventHandles();
	}

	initEventHandles(){
		const addEventButton = document.getElementById(`${this.id}__add_event`);
		if (addEventButton){
			addEventButton.addEventListener('click', this.handleToggleDisplayShortEvent);
		}
		/*const domNode = document.getElementById(`${this.id}`);
		console.log(domNode);*/
	}

	handleToggleDisplayShortEvent(){
		this.setState({
			isDisplayShortEvent: !this.state.isDisplayShortEvent
		});
	}

	handleAddEvent(){
		addEvent();
	}

	renderCells(date){
		const lastMonthDayInPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0);
		const startWeekDayInPrevMonth = new Date(date.getFullYear(), date.getMonth(), -lastMonthDayInPrevMonth.getDay() + 1);
		const diffPrevDays = lastMonthDayInPrevMonth.getDate() - startWeekDayInPrevMonth.getDate() + 1;

		const rows = [];
		let cells = [];

		const curDate = startWeekDayInPrevMonth;
		for (let i = 0; i < diffPrevDays; i++) {
			cells.push(new CalendarCell({ date: new Date(curDate) }));
			curDate.setDate(curDate.getDate() + 1);
		}
		for (let i = diffPrevDays; i < 7; i++) {
			cells.push(new CalendarCell({ date: new Date(curDate) }));
			curDate.setDate(curDate.getDate() + 1);
		}
		rows.push(`<div class='calendar__row clearfix'>${cells.join('')}</div>`);

		for (let i = 1; i < 6; i++) {
			cells = [];
			for (let j = 0; j < 7; j++) {
				cells.push(new CalendarCell({ date: new Date(curDate) }));
				curDate.setDate(curDate.getDate() + 1);
			}
			rows.push(`<div class='calendar__row clearfix'>${cells.join('')}</div>`);
		}
		return rows.join('');
	}

	render(){
		const { isFetching, isDisplayShortEvent, curDate } = this.state;
		/*if (isFetching){
			return `<div id=${this.id} class='overlay-loading overlay-loading--show' />`;
		}*/
		return (
			`<div id=${this.id}>
				${isFetching ? '<div class=\'overlay-loading overlay-loading--show\' />' : ''}
				<div class='calendar__header'>
					<div class='calendar__buttons'>
						<button
							id=${this.id}__add_event
							type='button'
							class='form-control calendar__buttons--add'
						>
							Добавить
						</button>
						<button
							id=${this.id}__refresh
							type='button'
							class='form-control calendar__buttons--refresh'
						>
							Обновить
						</button>
					</div>
					${isDisplayShortEvent ? `${new ShortEvent()}` : ''}
				</div>
				<div class='calendar__body'>
					<div class='menu'>
						<span class='menu__prev-month'>prev</span>
						<span class='menu__cur-month'>${curDate.getMonth()}</span>
						<span class='menu__next-month'>next</span>
					</div>
					<div class='calendar__cells'>
						${this.renderCells(curDate)}
					</div>
				</div>
			</div>`
		);
	}
}

export default Calendar;