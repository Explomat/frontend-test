import Component from 'src/lib/Component';
import Element from 'src/lib/Element';
import tags from 'src/lib/tags';
import InputText from 'src/views/input-text';
import InputTextArea from 'src/views/input-text-area';
import Error from 'src/views/error';
import './event.styl';

export class Event extends Component {

	constructor(props){
		super(props);

		this.handleChangeEvent = this.handleChangeEvent.bind(this);
		this.handleChangeParticipants = this.handleChangeParticipants.bind(this);
		this.handleChangeDescription = this.handleChangeDescription.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = {
			error: null,
			event: '',
			participants: [],
			description: ''
		};
	}

	_resetState(){
		this.state = {
			event: '',
			participants: [],
			description: ''
		};
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			event: nextProps.event,
			participants: nextProps.participants,
			description: nextProps.description
		});
	}

	handleChangeEvent(e){
		this.setState({
			event: e.target.value
		});
	}

	handleChangeParticipants(e){
		this.setState({
			participants: e.target.value.split(',')
		});
	}

	handleChangeDescription(e){
		this.setState({
			description: e.target.value
		});
	}

	handleSave(){
		if (this.props.onSave)		{
			if (this.props.event || this.state.event) {
				this.props.onSave({
					event: this.props.event ?
						this.props.event : this.state.event,
					participants: this.props.participants.length > 0 ?
						this.props.participants : this.state.participants,
					description: this.props.description ?
						this.props.description : this.state.description
				}, this.props.date);
				this._resetState();
			} else {
				this.setState({
					error: 'Необходимо заполнить название'
				});
			}
		}
	}

	handleDelete(){
		if (this.props.onDelete){
			this.props.onDelete(this.props.date);
			this._resetState();
		}
	}

	handleClose(){
		if (this.props.onClose){
			this._resetState();
			this.props.onClose();
		}
	}

	getPositionAndPointers(){
		const { elementRect } = this.props;
		if (elementRect){
			const domNode = this.refs.eventContent;
			const thisRect = domNode.getBoundingClientRect();
			const thisWidth = thisRect.width;
			const thisHeight = thisRect.height;

			const bodyRect = document.body.getBoundingClientRect();

			const rightDiff = bodyRect.right - elementRect.right;
			const bottomDiff = bodyRect.bottom - elementRect.bottom;
			return {
				top: bottomDiff > elementRect.top ?
					elementRect.top + document.body.scrollTop - 14 :
					elementRect.bottom - thisHeight + document.body.scrollTop + 14,
				left: elementRect.left > rightDiff ? elementRect.left - thisWidth - 14 : elementRect.right + 14,
				isTopLeft: bottomDiff > elementRect.top && elementRect.left < rightDiff,
				isTopRight: bottomDiff > elementRect.top && elementRect.left > rightDiff,
				isBottomLeft: bottomDiff < elementRect.top && elementRect.left < rightDiff,
				isBottomRight: bottomDiff < elementRect.top && elementRect.left > rightDiff
			};
		}
		return {
			top: 0,
			left: 0
		};
	}

	render(){
		const { error, event, participants, description } = this.state;
		const { isEdit, date } = this.props;
		const { top, left, isTopLeft, isTopRight, isBottomLeft, isBottomRight } = this.getPositionAndPointers();
		const classes = this.props.isDisplay ? 'event--display' : '';
		return (
			tags.div({
				class: `event ${classes}`,
				style: `top: ${top}px; left: ${left}px;`
			}, tags.div({
				ref: 'eventContent',
				class: 'event__content'
			}, [
				isTopLeft && tags.span({
					class: 'event__pointer event__pointer--top-left'
				}),
				isTopRight && tags.span({
					class: 'event__pointer event__pointer--top-right'
				}),
				isBottomLeft && tags.span({
					class: 'event__pointer event__pointer--bottom-left'
				}),
				isBottomRight && tags.span({
					class: 'event__pointer event__pointer--bottom-right'
				}),
				tags.div({
					class: 'event__header'
				}, tags.span({
					class: 'close-button',
					onClick: this.handleClose
				})),
				tags.div({
					class: 'event__body'
				}, [
					this.props.event && isEdit ?
						tags.strong({
							class: 'event__label-name'
						}, event)
						: InputText({
							value: event,
							placeholder: 'Событие',
							className: 'event__name',
							onChange: this.handleChangeEvent
						}
					),
					isEdit && tags.div({
						class: 'event__date'
					}, new Date(date).toLocaleString('ru', { month: 'long', day: 'numeric' })),
					this.props.participants.length > 0 && isEdit ?
						tags.div({
							class: 'event__members'
						}, [
							tags.div({
								class: 'event__members-label'
							}, 'Участники'),
							tags.div({
								class: 'event__members-value'
							}, participants.join(','))
						])
						: InputText({
							value: participants.join(','),
							placeholder: 'Участники',
							className: 'event__participants',
							onChange: this.handleChangeParticipants
						}
					),
					this.props.description && isEdit ?
						tags.div(null, [
							tags.div({
								class: 'event__label-description'
							}, 'Описание'),
							tags.div({
								class: 'event__value-description'
							}, description)
						])
						: InputTextArea({
							value: description,
							placeholder: 'Описание',
							className: 'event__description',
							onChange: this.handleChangeDescription
						}
					)
				]),
				tags.div({
					class: 'event__footer'
				}, [
					tags.button({
						type: 'button',
						class: 'event__create-button',
						onClick: this.handleSave
					}, 'Готово'),
					isEdit && tags.button({
						type: 'button',
						class: 'event__delete-button',
						onClick: this.handleDelete
					}, 'Удалить'),
					error && Error({
						text: error
					})
				])
			])
			)
		);
	}
}

Event.defaultProps = {
	isEdit: false,
	event: '',
	participants: [],
	description: ''
};

const EventElement = Element.createFactory(Event);
export default EventElement;