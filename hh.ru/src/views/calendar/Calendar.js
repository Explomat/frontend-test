import Component from '../Component';
import { addEventListener } from '../../store/calendarStore';
import { getState, addEvent, prevMonth, nextMonth } from '../../actions/calendarActions';
import CalendarCell from '../calendar-cell';
import ShortEvent from '../short-event';
import Event from '../event';
import { getMonthName, getWeekDayName, equalDates } from '../../utils/date';
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
			curEvent: null,
			isDisplayEvent: false,
			isDisplayShortEvent: false
		};

		this.handleAddEvent = this.handleAddEvent.bind(this);
		this.handleToggleDisplayShortEvent = this.handleToggleDisplayShortEvent.bind(this);
		this.handleToggleDisplayEvent = this.handleToggleDisplayEvent.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	componentWillMount(){
		addEventListener(updateState.bind(this));
		getState();
	}

	addEventListeners(){
		document.addEventListener('click', this.handleClickOutside, true);

		const addEventButton = document.getElementById(`${this.id}__add_event`);
		if (addEventButton){
			addEventButton.addEventListener('click', this.handleToggleDisplayShortEvent);
		}

		const prevMonthButton = document.getElementById(`${this.id}__prev-month`);
		if (prevMonthButton){
			prevMonthButton.addEventListener('click', prevMonth);
		}

		const nextMonthButton = document.getElementById(`${this.id}__next-month`);
		if (nextMonthButton){
			nextMonthButton.addEventListener('click', nextMonth);
		}
	}

	removeEventListeners(){
		const addEventButton = document.getElementById(`${this.id}__add_event`);
		if (addEventButton){
			addEventButton.removeEventListener('click', this.handleToggleDisplayShortEvent);
		}
	}

	handleToggleDisplayShortEvent(){
		this.setState({
			isDisplayShortEvent: !this.state.isDisplayShortEvent
		});
	}

	handleToggleDisplayEvent(nativeEvent){
		this.setState({
			isDisplayEvent: !this.state.isDisplayEvent,
			curEvent: {
				nativeEvent
			}
		});
	}

	handleAddEvent(){
		addEvent();
	}

	handleClickOutside(e){
		const shortEventNode = document.getElementById(`${this.id}__short-event`);
		if (shortEventNode && !shortEventNode.contains(e.target)){
			this.setState({
				isDisplayShortEvent: false
			});
		}

		const eventNode = document.getElementById(`${this.id}__event`);
		if (eventNode && !eventNode.contains(e.target)){
			this.setState({
				isDisplayEvent: false
			});
		}
	}

	renderCells(date){
		let cellsIter = 0;
		const year = date.getFullYear();
		const month = date.getMonth();
		const lastMonthDayInPrevMonth = new Date(year, month, 0);
		let startWeekDayInPrevMonth = new Date(year, month, -lastMonthDayInPrevMonth.getDay() + 1);
		let diffPrevDays = lastMonthDayInPrevMonth.getDate() - startWeekDayInPrevMonth.getDate() + 1;
		if (diffPrevDays >= 28){
			startWeekDayInPrevMonth = new Date(year, month, -lastMonthDayInPrevMonth.getDay() - 6);
			diffPrevDays = lastMonthDayInPrevMonth.getDate() - startWeekDayInPrevMonth.getDate() + 1;
		}

		const rows = [];
		let cells = [];

		const curDate = startWeekDayInPrevMonth;
		const dateNow = new Date();
		for (let i = 0; i < diffPrevDays; i++) {
			cells.push(new CalendarCell({
				key: `${this.id}_${cellsIter++}`,
				title: `${getWeekDayName(curDate)}, ${curDate.getDate()}`,
				isCurDate: equalDates(dateNow, curDate),
				date: new Date(curDate),
				onClick: this.handleToggleDisplayEvent
			}));
			curDate.setDate(curDate.getDate() + 1);
		}
		for (let i = diffPrevDays; i < 7; i++) {
			cells.push(new CalendarCell({
				key: `${this.id}_${cellsIter++}`,
				title: `${getWeekDayName(curDate)}, ${curDate.getDate()}`,
				date: new Date(curDate),
				isCurMonth: true,
				isCurDate: equalDates(dateNow, curDate),
				onClick: this.handleToggleDisplayEvent
			}));
			curDate.setDate(curDate.getDate() + 1);
		}
		rows.push(`<div class='calendar__row clearfix'>${cells.join('')}</div>`);

		const lastDayInCurMonth = new Date(year, month + 1, 0);
		for (let i = 1; i < 6; i++) {
			cells = [];
			for (let j = 0; j < 7; j++) {
				cells.push(new CalendarCell({
					key: `${this.id}_${cellsIter++}`,
					title: curDate.getDate(),
					date: new Date(curDate),
					isCurDate: equalDates(dateNow, curDate),
					isCurMonth: curDate <= lastDayInCurMonth,
					onClick: this.handleToggleDisplayEvent
				}));
				curDate.setDate(curDate.getDate() + 1);
			}
			rows.push(`<div class='calendar__row clearfix'>${cells.join('')}</div>`);
		}
		return rows.join('');
	}

	render(){
		const {
			isFetching,
			isDisplayShortEvent,
			isDisplayEvent,
			curDate,
			curEvent
		} = this.state;

		//всегда нужно рендерить, иначе перед позиционированием не сможем найти по id (это вам не React :) )
		const eventClasses = isDisplayEvent ? 'calendar__event--display' : '';
		return (
			`<div id=${this.id} class='calendar'>
				${isFetching ? '<div class=\'overlay-loading overlay-loading--show\'></div>' : ''}
				<div class='calendar__header'>
					<div class='calendar__valign'></div>
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
						${isDisplayShortEvent ?
							new ShortEvent({
								id: `${this.id}__short-event`,
								placeholder: '',
								onClose: this.handleToggleDisplayShortEvent
							}) : ''
						}
					</div>
				</div>
				<div class='calendar__body'>
					<div class='calendar__menu'>
						<span id='${this.id}__prev-month' class='menu__prev-month'>prev</span>
						<span class='menu__cur-date'>${getMonthName(curDate)} ${curDate.getFullYear()}</span>
						<span id='${this.id}__next-month' class='menu__next-month'>next</span>
					</div>
					<div class='calendar__cells'>
						${this.renderCells(curDate)}
					</div>
				</div>
				<div class='calendar__event ${eventClasses}'>
					${new Event({
						id: `${this.id}__event`,
						...curEvent
					})}
				</div>
			</div>`
		);
	}
}

export default Calendar;