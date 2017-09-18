import Component from 'src/lib/Component';
import Element from 'src/lib/Element';
import tags from 'src/lib/tags';
import './error.styl';

export class Error extends Component {

	render(){
		const { text, className, ...rest } = this.props;
		return (
			tags.div({
				class: `error ${className}`,
				...rest
			}, text)
		);
	}
}

Error.defaultProps = {
	text: '',
	className: ''
};

const ErrorElement = Element.createFactory(Error);
export default ErrorElement;