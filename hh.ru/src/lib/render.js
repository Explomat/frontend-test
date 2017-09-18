import eventList from './eventList';
import tags from './tags';

const EXCLUDED_PROPS = {
	children: true,
	ref: true,
	key: true
};
let rootDomNode = null;
const nodes = {};
const components = {};

export function update(id){
	const obj = components[id];
	const parentDomNode = (obj.parent && obj.parent.domNode ? obj.parent.domNode : rootDomNode);
	_renderTree(obj, parentDomNode);
}

export function render({ type, props, parent, id }, container) {
	rootDomNode = container;
	_renderTree({ type, props, parent, id }, container);
}

function _removeNode(nodeId){
	let node = nodes[nodeId];
	if (node.parent && node.parent.instance){
		node = node.parent;
	}
	Object.keys(nodes).forEach(n => {
		if (~n.indexOf(node.id)) {
			delete nodes[n];
		}
	});
}

function _getComponentForNode(id){
	let node = nodes[id];
	if (node &&
		typeof node.type === 'string' &&
		node.parent
	) {
		while (node.parent && typeof node.type !== 'function'){
			node = node.parent;
		}
	}
	return node && node.instance;
}

function _clearNode(id){
	const node = nodes[id];

	if (node && node.domNode){
		if (node.domNode.hasAttributes()) {
			const attrs = node.domNode.attributes;
			for (let i = attrs.length - 1; i >= 0; i--) {
				node.domNode.removeAttribute(attrs[i].name);
			}
		}

		if (node.props) {
			for (const p in node.props){
				if (node.props.hasOwnProperty(p) &&
					eventList.hasOwnProperty(p)
				){
					const ev = p.substr(2).toLowerCase();
					node.domNode.removeEventListener(ev, node.props[p]);
				}
			}
		}
	}
}

function _renderTree({ key, type, props, parent, id }, parentDomNode) {
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
		//oid[(oid.length - 1)];
		const okey = key !== undefined && key !== null ? `$${key}` : '';
		
		const parentId = parent ? parent.id.toString() : '0';
		const [ pid ] = parentId.split('$');
		
		newId = `${pid}.${oid}${okey}`;
	}

	const obj = {
		key,
		id: newId,
		type,
		parent
	};
	
	if (typeof type === 'function'){
		const isSameElement = components.hasOwnProperty(newId) && components[newId].type === type;
		let Component = null;

		if (isSameElement){
			Component = components[newId].instance;
		} else {
			Component = new type(props);
			Component.id = newId;
		}

		obj.props = props;
		obj.instance = Component;
		components[newId] = obj;

		if (Component.componentWillMount && !isSameElement){
			Component.componentWillMount();
			return;
		}
		
		Component.props = props;
		const el = Component.render();

		if (el){
			const child = _renderTree({
				...el,
				parent: obj,
				id: '0'
			}, parentDomNode);
			Component.domNode = child.domNode;

			if (Component.componentDidMount && !isSameElement){
				Component.componentDidMount();
			}
		}
		return obj;
	} else if (typeof type === 'string') {
		if (nodes.hasOwnProperty(newId)){
			if (nodes[newId].type === type) {
				obj.domNode = nodes[newId].domNode;
				_clearNode(newId);
			} else {
				obj.domNode = document.createElement(type);
			}
			//obj.domNode = nodes[newId].domNode;
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
							if (key === undefined || key === null){
								const dataId = childDomNode.getAttribute('data-id');
								_removeNode(dataId);
							}
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
				const curComponent = _getComponentForNode(newId);
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