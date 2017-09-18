import Component from 'src/lib/Component';
import Element from 'src/lib/Element';
import tags from 'src/lib/tags';
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