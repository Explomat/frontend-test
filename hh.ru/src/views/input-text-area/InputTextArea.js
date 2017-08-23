import Component from '../Component';
import Element from '../Element';
import tags from '../tags';
import './input-text-area.styl';

export class InputTextArea extends Component {

	render(){
		const { value, className, ...rest } = this.props;
		return (
			tags.textarea({
				class: `input-text-area form-control ${className}`,
				...rest
			}, value)
		);
	}
}

InputTextArea.defaultProps = {
	value: '',
	placeholder: 'Введите значение',
	className: ''
};

const InputTextAreaElement = Element.createFactory(InputTextArea);
export default InputTextAreaElement;