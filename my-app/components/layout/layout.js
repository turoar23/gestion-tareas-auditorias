import { NextUIProvider } from '@nextui-org/react';

import Navbar from './navbar';

const Layout = props => {
	return (
		<NextUIProvider>
			<Navbar />
			{props.children}
		</NextUIProvider>
	);
};

export default Layout;
