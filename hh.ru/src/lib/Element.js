const EXCLUDED_PROPS = {
	key: true
};

const Element = (key, type, props) => {
	return {
		key,
		type,
		props: props || {}
	};
};

Element.createElement = (type, config, children) => {
	let propName;
	const props = {};
	let key = null;

	if (config) {
		if (config.key !== undefined) {
			key = '' + config.key;
		}

		for (propName in config) {
			if (
				hasOwnProperty.call(config, propName) &&
				!EXCLUDED_PROPS.hasOwnProperty(propName)
			) {
				props[propName] = config[propName];
			}
		}
	}

	const childrenLength = arguments.length - 2;
	if (childrenLength === 1) {
		props.children = children;
	} else if (childrenLength > 1) {
		const childArray = Array(childrenLength);
		for (let i = 0; i < childrenLength; i++) {
			childArray[i] = arguments[i + 2];
		}
		props.children = childArray;
	}

	if (type && type.defaultProps) {
		const defaultProps = type.defaultProps;
		for (propName in defaultProps) {
			if (props[propName] === undefined) {
				props[propName] = defaultProps[propName];
			}
		}
	}
	return Element(
		key,
		type,
		props
	);
};


Element.createFactory = (type) => {
	const factory = Element.createElement.bind(null, type);
	factory.type = type;
	return factory;
};

export default Element;