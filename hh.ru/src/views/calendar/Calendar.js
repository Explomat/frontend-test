import Component from '../Component';
import { addEventListener } from '../../store/calendarStore';
import {
	getState,
	prevMonth,
	nextMonth,
	saveEvent,
	deleteEvent,
	setDate,
	searchEvents
} from '../../actions/calendarActions';
import CalendarCell from '../calendar-cell';
//import Test from '../Test';
import ShortEvent from '../short-event';
import Event from '../event';
import InputSearch from '../input-search';
import tags from '../tags';
import Element from '../Element';
import {
	getMonthName,
	getWeekDayName,
	equalDates,
	dateToString,
	dateToStringForList
} from '../../utils/date';
import './calendar.styl';

function updateState(st) {
	this.setState({
		...this.state,
		...st
	});
}

export class Calendar extends Component {
	constructor(props){
		super(props);

		this.state = {
			curDate: new Date(),
			curEvent: null,
			isDisplayEvent: false,
			isDisplayShortEvent: false
		};

		this.handleTestPrev = this.handleTestPrev.bind(this);
		this.handleTestNext = this.handleTestNext.bind(this);
		
		this.handleToggleDisplayShortEvent = this.handleToggleDisplayShortEvent.bind(this);
		this.handleDisplayEvent = this.handleDisplayEvent.bind(this);
		this.handleHideEvent = this.handleHideEvent.bind(this);
		this.handleSaveEvent = this.handleSaveEvent.bind(this);
		this.handleSaveShortEvent = this.handleSaveShortEvent.bind(this);
		this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
		this.handleSearchEvents = this.handleSearchEvents.bind(this);
		this.handleSelectEvent = this.handleSelectEvent.bind(this);
		this.handlePrevMonth = this.handlePrevMonth.bind(this);
		this.handleNextMonth = this.handleNextMonth.bind(this);
	}

	componentWillMount(){
		addEventListener(updateState.bind(this));
		getState();
	}

	handleTestPrev(){
		const { curDate } = this.state;
		this.setState({
			curDate: new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
		});
	}

	handleTestNext(){
		const { curDate } = this.state;
		this.setState({
			curDate: new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
		});
	}

	handleToggleDisplayShortEvent(){
		this.setState({
			isDisplayShortEvent: !this.state.isDisplayShortEvent,
			isDisplayEvent: false
		});
	}

	handleHideEvent(){
		this.setState({
			isDisplayEvent: false
		});
	}

	handleDisplayEvent(elementRect, date){
		const { events } = this.state;
		const ev = events[dateToString(date)];

		this.setState({
			isDisplayEvent: true,
			isDisplayShortEvent: false,
			curEvent: {
				elementRect,
				date,
				isEdit: !!ev,
				...ev
			}
		});
	}

	handleSaveEvent(event, date){
		this.setState({
			isDisplayEvent: false
		});
		saveEvent(event, date);
	}

	handleSaveShortEvent(eventName, date){
		this.setState({
			isDisplayShortEvent: false
		});
		saveEvent({
			event: eventName
		}, date);
	}

	handleDeleteEvent(date){
		this.setState({
			isDisplayEvent: false
		});
		deleteEvent(date);
	}

	handleSearchEvents(val){
		searchEvents(val);
	}

	handleSelectEvent(event){
		setDate(event.date);

		const dateString = dateToString(event.date);
		const cellNode = this.domNode.querySelector(`.calendar-cell[data-date='${dateString}']`);
		if (cellNode){
			const { events } = this.state;
			const ev = events[dateToString(event.date)];
			const elementRect = cellNode.getBoundingClientRect();

			this.setState({
				isDisplayEvent: true,
				isDisplayShortEvent: false,
				curEvent: {
					elementRect,
					date: event.date,
					isEdit: !!ev,
					...ev
				}
			});
		}
	}

	handlePrevMonth(){
		this.setState({
			isDisplayEvent: false
		});
		prevMonth();
	}

	handleNextMonth(){
		this.setState({
			isDisplayEvent: false
		});
		nextMonth();
	}

	renderCells(date){
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

		const { events } = this.state;
		let ev;
		for (let i = 0; i < diffPrevDays; i++) {
			ev = events[dateToString(curDate)];
			cells.push(CalendarCell({
				key: dateToString(curDate),
				title: `${getWeekDayName(curDate)}, ${curDate.getDate()}`,
				isCurDate: equalDates(dateNow, curDate),
				date: new Date(curDate),
				event: ev,
				onClick: this.handleDisplayEvent
			}));
			curDate.setDate(curDate.getDate() + 1);
		}
		for (let i = diffPrevDays; i < 7; i++) {
			ev = events[dateToString(curDate)];
			cells.push(CalendarCell({
				key: dateToString(curDate),
				title: `${getWeekDayName(curDate)}, ${curDate.getDate()}`,
				date: new Date(curDate),
				event: ev,
				isCurMonth: true,
				isCurDate: equalDates(dateNow, curDate),
				onClick: this.handleDisplayEvent
			}));
			curDate.setDate(curDate.getDate() + 1);
		}

		rows.push(tags.div({
			class: 'calendar__row clearfix'
		}, cells));

		const lastDayInCurMonth = new Date(year, month + 1, 0);
		for (let i = 1; i < 6; i++) {
			cells = [];
			for (let j = 0; j < 7; j++) {
				ev = events[dateToString(curDate)];
				cells.push(CalendarCell({
					key: dateToString(curDate),
					title: curDate.getDate(),
					date: new Date(curDate),
					event: ev,
					isCurDate: equalDates(dateNow, curDate),
					isCurMonth: curDate <= lastDayInCurMonth,
					onClick: this.handleDisplayEvent
				}));
				curDate.setDate(curDate.getDate() + 1);
			}
			rows.push(tags.div({
				class: 'calendar__row clearfix'
			}, cells));
		}
		return rows;
	}

	render(){
		/*const { curDate } = this.state;
		return tags.div({
			key: 'test'
		}, [
			tags.span({
				onClick: this.handleTestPrev
			}, 'prev'),
			Test({
				key: dateToString(curDate),
				title: dateToString(curDate)
			}),
			tags.span({
				onClick: this.handleTestNext
			}, 'next')
		]);*/
		const {
			isFetching,
			isDisplayShortEvent,
			isDisplayEvent,
			curDate,
			curEvent,
			foundEvents
		} = this.state;

		if (isFetching){
			return tags.div({
				class: 'overlay-loading overlay-loading--show'
			});
		}
		
		return tags.div({
			class: 'calendar'
		}, [
			tags.div({
				class: 'calendar__header'
			}, [
				tags.div({
					class: 'calendar__valign'
				}),
				tags.div({
					class: 'calendar__buttons'
				}, [
					tags.button({
						type: 'button',
						class: 'form-control calendar__buttons--add',
						onClick: this.handleToggleDisplayShortEvent
					}, 'Добавить'),
					isDisplayShortEvent && ShortEvent({
						onSave: this.handleSaveShortEvent,
						onClose: this.handleToggleDisplayShortEvent
					}),
					InputSearch({
						className: 'calendar__search',
						placeholder: 'Событие, дата или участник',
						items: foundEvents.map(fe => {
							return {
								...fe,
								title: fe.event,
								description: dateToStringForList(fe.date)
							};
						}),
						onSearch: this.handleSearchEvents,
						onSelect: this.handleSelectEvent
					})
				])
			]),
			tags.div({
				class: 'calendar__body'
			}, [
				tags.div({
					class: 'calendar__menu'
				}, [
					tags.span({
						class: 'calendar__prev-month',
						onClick: this.handlePrevMonth
					}),
					tags.span({
						class: 'calendar__cur-date'
					}, `${getMonthName(curDate)} ${curDate.getFullYear()}`),
					tags.span({
						class: 'calendar__next-month',
						onClick: this.handleNextMonth
					})
				]),
				tags.div({
					class: 'calendar__rows'
				}, this.renderCells(curDate))
			]),
			Event({
				isDisplay: isDisplayEvent,
				onClose: this.handleHideEvent,
				onSave: this.handleSaveEvent,
				onDelete: this.handleDeleteEvent,
				...curEvent
			})
		]);
	}
}

const CalendarElement = Element.createFactory(Calendar);
export default CalendarElement;