import Component from './Component';
import Element from './Element';
import tags from './tags';

export class Test extends Component {

	constructor(props){
		super(props);

		this.state = {
			isSelected: false
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){
		this.setState({
			isSelected: true
		});
	}

	render(){
		const { isSelected } = this.state;
		const { title } = this.props;

		const classes = isSelected ? 'calendar-cell--selected ' : '';
		
		return (
			tags.div({
				class: `calendar-cell ${classes}`,
				onClick: this.handleClick
			}, title)
		);
	}
}

const TestElement = Element.createFactory(Test);
export default TestElement;