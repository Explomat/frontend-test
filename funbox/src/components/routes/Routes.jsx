import React from 'react';
import Route from './Route';

import './routes.styl';

const Routes = ({ routes, ...props }) => {
	return (
		<div className='routes'>
			{routes.map((r, index) =>
				<Route
					key={r.id} //'index' or 'uuid' as a key not working. https://github.com/react-dnd/react-dnd/issues/748
					index={index}
					{...props}
					{...r}
				/>
			)}
		</div>
	);
};

export default Routes;