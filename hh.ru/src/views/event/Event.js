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

	getPositionAndPointers(){
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
		const { top, left, isTopLeft, isTopRight, isBottomLeft, isBottomRight } = this.getPositionAndPointers();
		const classes = this.props.isDisplay ? 'event--display' : '';
		return (
			`<div id=${this.id} class='event ${classes}' style='top: ${top}px; left: ${left}px;'>
				<div id='${this.id}__content' class='event__content'>
					${isTopLeft ? '<span class=\'event__pointer event__pointer--top-left\'></span>' : ''}
					${isTopRight ? '<span class=\'event__pointer event__pointer--top-right\'></span>' : ''}
					${isBottomLeft ? '<span class=\'event__pointer event__pointer--bottom-left\'></span>' : ''}
					${isBottomRight ? '<span class=\'event__pointer event__pointer--bottom-right\'></span>' : ''}
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