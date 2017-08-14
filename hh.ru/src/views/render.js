
const excludedProps = {
	children: 'children',
	events: 'events'
};

let rootDomNode = null;
const nodes = {};

export function renderAfterState(id){
	const obj = nodes[id];
	render(obj,
		(obj.parent && obj.parent.domNode ? obj.parent.domNode : rootDomNode)
	);
}

export function render({ type, props, parent, id }, domNode) {
	rootDomNode = domNode;
	_render({ type, props, parent, id }, domNode);
}

function _render({ type, props, parent, id }, domNode) {
	const newId = parent ? `${parent.id}.${id ? id : '0'}` : '0';
	const hasNode = newId in nodes;
	let obj = {};

	if (hasNode){
		obj = nodes[newId];
	} else {
		obj = {
			id: newId,
			type,
			parent
		};
		nodes[newId] = obj;
	}
	
	if (typeof type === 'string'){
		const prevDomNode = obj.domNode;
		obj.domNode = document.createElement(type);
		obj.domNode.setAttribute('id', newId);

		if (props){
			obj.props = Object.assign({}, props);

			for (const p in props){
				if (!(p in excludedProps) && props.hasOwnProperty(p)){
					obj.domNode.setAttribute(p, props[p]);
				}
			}
			if (props.events){
				for (const e in props.events){
					if (props.events.hasOwnProperty(e)){
						obj.domNode.addEventListener(e, props.events[e]);
						if (hasNode){
							prevDomNode.removeEventListener(e, props.events[e]);
						}
					}
				}
			}

			if (props.children) {
				if (Array.isArray(props.children)){
					for (let i = 0, len = props.children.length; i < len; i++) {
						const child = {
							type: props.children[i].type,
							props: props.children[i].props,
							parent: obj,
							id: i
						};
						obj.props.children.push(child);
						_render(child, obj.domNode);
					}
				} else if (typeof props.children === 'string') {
					const textNode = document.createTextNode(props.children);
					obj.domNode.appendChild(textNode);
				}
			}
		}
		if (hasNode){
			domNode.replaceChild(obj.domNode, prevDomNode);
		} else {
			domNode.appendChild(obj.domNode);
		}
		return obj;
	} else if (typeof type === 'function') {
		let Component = null;
		if (hasNode){
			Component = obj.instance;
		} else {
			Component = new type(props);
			Component.id = newId;
			obj.instance = Component;
		}

		if (Component.componentWillMount && !hasNode){
			Component.componentWillMount();
		}
		
		const el = Component.render();

		if (el){
			obj.props = Object.assign({}, props);
			const child = _render({
				type: el.type,
				props: el.props,
				parent: obj,
				id: '0'
			}, domNode);
			obj.domNode = child.domNode;
			Component.domNode = child.domNode;

			if (Component.componentDidMount && !hasNode){
				Component.componentDidMount();
			}
		}
	}
}