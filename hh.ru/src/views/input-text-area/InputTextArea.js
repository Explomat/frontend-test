import Component from '../Component';
import Element from '../Element';
import tags from '../tags';
import './input-text-area.styl';

export class InputTextArea extends Component {

	constructor(props){
		super(props);

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e){
		if (this.props.onChange){
			this.props.onChange(e.target.value);
		}
	}

	render(){
		const { value, placeholder, className } = this.props;
		return (
			tags.textarea({
				placeholder,
				class: `input-text-area form-control ${className}`,
				onChange: this.handleChange
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