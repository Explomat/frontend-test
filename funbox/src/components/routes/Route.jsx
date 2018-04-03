import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import cx from 'classnames';
import flow from 'lodash/flow';

const Types = {
	REPLACE_ROUTE: 'REPLACE_ROUTE'
};

const cardSource = {
	beginDrag(props) {
		if (props.onDrag){
			props.onDrag(true);
		}
		return { index: props.index };
	},

	endDrag(props){
		if (props.onDrag){
			props.onDrag(false);
		}
	}
};

const cardTarget = {
	hover(props, monitor, component){
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;

		if (dragIndex === hoverIndex){
			return;
		}

		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
		const clientOffset = monitor.getClientOffset();
		const hoverClientY = clientOffset.y - hoverBoundingRect.top;

		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return;
		}
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return;
		}

		if (props.onReplace){
			props.onReplace(dragIndex, hoverIndex);
		}

		monitor.getItem().index = hoverIndex;
	}
};

class Route extends Component {

	constructor(props){
		super(props);

		this.handleRemove = this.handleRemove.bind(this);
	}

	handleRemove(){
		const { onRemove, index } = this.props;
		if (onRemove){
			onRemove(index);
		}
	}

	render(){
		const { connectDragSource, connectDropTarget, properties, isDragging } = this.props;
		const routesClasses = cx({
			'route': true,
			'route--not-visible': isDragging
		});

		return connectDragSource(connectDropTarget(
			<div className={routesClasses}>
				<div className='route__name'>{properties.name}</div>
				<div className='route__description'>{properties.description}</div>
				<button type='button' className='close-button' onClick={this.handleRemove}>&times;</button>
			</div>
		));
	}
}

export default flow(
	DragSource(Types.REPLACE_ROUTE, cardSource, (connect, monitor) => {
		return {
			connectDragSource: connect.dragSource(),
			isDragging: monitor.isDragging()
		};
	}),
	DropTarget(Types.REPLACE_ROUTE, cardTarget, connect => {
		return {
			connectDropTarget: connect.dropTarget()
		};
	})
)(Route);