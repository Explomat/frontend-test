import Component from '../Component';
import Element from '../Element';
import tags from '../tags';
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