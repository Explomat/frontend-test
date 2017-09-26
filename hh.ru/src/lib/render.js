import eventList from './eventList';
import tags from './tags';
import Node from './Node';

const EXCLUDED_PROPS = {
	children: true,
	ref: true,
	key: true
};
let rootDomNode = null;
const nodes = {};
const components = {};
const componentStates = {};

export function update(ctx, nextState){
	const obj = components[ctx.id];
	const parentDomNode = (obj.parent && obj.parent.domNode ? obj.parent.domNode : rootDomNode);
	_renderTree(obj, parentDomNode, nextState);
}

export function render({ type, props, parent, id }, container) {
	rootDomNode = container;
	_renderTree({ type, props, parent, id }, container);
}

function removeNode(nodeId){
	let node = nodes[nodeId];
	if (node.parent && node.parent.instance){
		node = node.parent;
	}
	Object.keys(nodes).forEach(n => {
		if (~n.indexOf(node.id)) {
			delete nodes[n];
		}
	});
	Object.keys(components).forEach(n => {
		if (~n.indexOf(node.id)) {
			if (node.key !== undefined && node.key !== null){
				componentStates[n] = components[n].instance.state;
			}
			delete components[n];
		}
	});
}

function _renderTree({ key, type, props, parent, id }, parentDomNode, nextState) {
	let newId = null;
	if (parent && typeof parent.type === 'function') {
		newId = parent.id;
	} else {
		const _id = id !== undefined ? id.toString() : '0';
		let [ oid ] = _id.split('$');
		if (~oid.indexOf('.')) {
			const lastIndex = oid.lastIndexOf('.');
			oid = oid.substr(lastIndex + 1);
		}
		const okey = key !== undefined && key !== null ? `$${key}` : '';
		
		const parentId = parent ? parent.id.toString() : '0';
		const [ pid ] = parentId.split('$');
		
		newId = `${pid}.${oid}${okey}`;
	}

	const obj = new Node(key, newId, type, parent);
	
	if (typeof type === 'function'){
		const isSameElement = components.hasOwnProperty(newId) && components[newId].type === type;
		let Component = null;

		if (isSameElement){
			Component = components[newId].instance;
		} else {
			Component = new type(props);
			Component.id = newId;
			Component.state = componentStates.hasOwnProperty(newId) ? componentStates[newId] : Component.state;
		}

		obj.props = props;
		obj.instance = Component;

		const st = {
			...Component.state,
			...nextState
		};

		Component.state = st;
		components[newId] = obj;

		if (!Component._isMounted && Component.componentWillMount && !isSameElement){
			Component.componentWillMount();
		}
		
		Component.props = props;

		if (Component._isMounted && Component.componentWillReceiveProps && !nextState){
			Component.componentWillReceiveProps(props);
		}

		const el = Component.render();

		if (el){
			const child = _renderTree({
				...el,
				parent: obj,
				id: '0'
			}, parentDomNode);
			Component.domNode = child.domNode;
			Component._isMounted = true;

			if (Component.componentDidMount && !isSameElement){
				Component.componentDidMount();
			}
		}
		return obj;
	} else if (typeof type === 'string') {
		if (nodes.hasOwnProperty(newId) && nodes[newId].type === type){
			obj.domNode = nodes[newId].domNode;
		} else {
			obj.domNode = document.createElement(type);
		}
		nodes[newId] = obj;

		obj.domNode.setAttribute('data-id', newId);

		if (props){
			obj.props = Object.assign({}, props);

			for (const p in props){
				if (props.hasOwnProperty(p)){
					if (eventList.hasOwnProperty(p)) {
						const ev = p.substr(2).toLowerCase();
						obj.domNode.addEventListener(ev, props[p]);
					} else if (!EXCLUDED_PROPS.hasOwnProperty(p)){
						obj.domNode.setAttribute(p, props[p]);
						if (type === tags.input.type &&
							p === 'value' &&
							obj.domNode.value !== props[p]
						){
							obj.domNode.value = props[p];
						}
					}
				}
			}

			if (props.children !== undefined) {
				if (Array.isArray(props.children)){
					let i, j, k, len;
					const childs = [];
					for (i = 0, len = props.children.length; i < len; i++) {
						const ch = props.children[i];
						if (ch){
							childs.push(_renderTree({
								...ch,
								parent: obj,
								id: i
							}, obj.domNode));
						}
					}
					for (j = obj.domNode.childNodes.length - 1; j >= 0; j--) {
						const childDomNode = obj.domNode.childNodes[j];
						let isEqual = false;
						for (k = childs.length - 1; k >= 0; k--) {
							const equalNode = childs[k].domNode || childs[k].instance.domNode;
							if (childDomNode === equalNode){
								isEqual = true;
							}
						}
						if (!isEqual){
							const dataId = childDomNode.getAttribute('data-id');
							removeNode(dataId);
							obj.domNode.removeChild(childDomNode);
						}
					}
				} else if (typeof props.children === 'object'){
					_renderTree({
						...props.children,
						parent: obj,
						id: '0'
					}, obj.domNode);
				} else if (typeof props.children === 'boolean'){
					if (obj.domNode.firstChild){
						obj.domNode.removeChild(obj.domNode.firstChild);
					}
				} else {
					const text = props.children.toString();
					if (type === tags.textarea.type) {
						obj.domNode.value = text;
						obj.domNode.textContent = text;
					} else {
						obj.domNode.textContent = text;
					}
				}
			}

			if (props.ref){
				const curComponent = nodes[newId] && nodes[newId].getContainerInstance(); // getComponentForNode(newId);
				if (curComponent){
					curComponent.refs = curComponent.refs || {};
					curComponent.refs[props.ref] = obj.domNode;
				}
			}
		}

		parentDomNode.appendChild(obj.domNode);
		return obj;
	}
}