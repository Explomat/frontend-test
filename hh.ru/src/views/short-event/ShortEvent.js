import Component from '../Component';
import Element from '../Element';
import InputText from '../input-text';
import tags from '../tags';
import './short-event.styl';

export class ShortEvent extends Component {
	render(){
		return (
			tags.div({
				class: 'short-event'
			}, tags.div({
				class: 'short-event__content'
			}, [
				tags.div({
					class: 'short-event__header'
				}, tags.span({
					class: 'close-button',
					onClick: this.props.onClose })
				),
				tags.div({
					class: 'short-event__body'
				}, InputText()),
				tags.div({
					class: 'short-event__footer'
				}, tags.button({
					type: 'button',
					class: 'short-event__create-button'
				}, 'Создать'))
			]))
		);
	}
}

const ShortEventElement = Element.createFactory(ShortEvent);
export default ShortEventElement;