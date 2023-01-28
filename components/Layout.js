import React from 'react';
import Navigation from './navigation';

const Layout = ({ children }) => (
	<div className="d-flex flex-row w-100">
		<Navigation />
		<div className="d-flex overflow-auto align-items-center justify-content-center w-100">
			{children }
		</div>
	</div>
);

export default Layout;
