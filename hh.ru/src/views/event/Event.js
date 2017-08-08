import Component from '../Component';
import InputText from '../input-text';
import InputTextArea from '../input-text-area';
import './event.styl';

class Event extends Component {

	constructor(props){
		super(props);
	}

	addEventListeners(){
		const domNode = document.getElementById(`${this.id}__close`);
		if (domNode){
			domNode.addEventListener('click', this.props.onClose);
		}
	}

	removeEventListeners(){
		const domNode = document.getElementById(`${this.id}__close`);
		if (domNode){
			domNode.removeEventListener('click', this.props.onClose);
		}
	}

	getPosition(){
		const { nativeEvent } = this.props;
		if (nativeEvent){
			const domNode = document.getElementById(`${this.id}__content`);
			const thisRect = domNode.getBoundingClientRect();
			const thisWidth = thisRect.width;
			const thisHeight = thisRect.height;

			const element = nativeEvent.currentTarget || nativeEvent.target;
			const elementRect = element.getBoundingClientRect();
			const bodyRect = document.body.getBoundingClientRect();

			const rightDiff = bodyRect.right - elementRect.right;
			const bottomDiff = bodyRect.bottom - elementRect.bottom;
			return {
				top: bottomDiff > elementRect.top ?
					elementRect.top + document.body.scrollTop :
					elementRect.bottom - thisHeight + document.body.scrollTop,
				left: elementRect.left > rightDiff ? elementRect.left - thisWidth - 14 : elementRect.right + 14,
				topPointer: bottomDiff > elementRect.top ?
					24 : thisHeight - 24,
				leftPointer: elementRect.left > rightDiff ? thisWidth - 7 : -7
			};
		}
		return {
			top: 0,
			left: 0
		};
	}

	render(){
		const pos = this.getPosition();
		const classes = this.props.isDisplay ? 'event--display' : '';
		return (
			`<div id=${this.id} class='event ${classes}' style='top: ${pos.top}px; left: ${pos.left}px;'>
				<span class='event__pointer' style='top: ${pos.topPointer}px; left: ${pos.leftPointer}px;'></span>
				<div id='${this.id}__content' class='event__content'>
					<div class='event__header'>
						<span id='${this.id}__close' class='close-button'></span>
					</div>
					<div class='event__body'>
						${new InputText({
							placeholder: 'Событие'
						})}
						${new InputText({
							placeholder: 'Участники'
						})}
						${new InputTextArea({
							placeholder: 'Описание'
						})}
					</div>
					<div class='event__footer'>
						<button type='button' class='event__create-button'>Готово</button>
					</div>
				</div>
			</div>`
		);
	}
}

export default Event;