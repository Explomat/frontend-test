import Component from '../Component';
import Element from '../Element';
import tags from '../tags';
import './input-text.styl';

export class InputText extends Component {
	render(){
		const { className, ...rest } = this.props;
		return (
			tags.input({
				type: 'text',
				class: `input-text form-control ${className}`,
				...rest
			})
		);
	}
}

InputText.defaultProps = {
	value: '',
	placeholder: 'Введите значение',
	className: ''
};

const InputTextElement = Element.createFactory(InputText);
export default InputTextElement;