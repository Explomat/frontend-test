import Component from '../Component';
import './short-event.styl';

class ShortEvent extends Component {
	componentDidMount(){
		this.initEventHandles();
	}

	initEventHandles(){
		const domNode = document.getElementById(`${this.id}`);
		domNode.addEventListener('click', this.handleClick.bind(this));
	}

	handleClick(){
		this.setState({
			error: this.id
		});
	}

	render(){
		const { date } = this.props;
		return (
			`<div id=${this.id} class='short-event'>
				${date.toLocaleDateString()}
			</div>`
		);
	}
}

export default ShortEvent;