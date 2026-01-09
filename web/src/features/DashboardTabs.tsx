import * as Chakra from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface ITabsConfigTab {
	path: string;
	name: string;
}

interface ITabsConfig {
	tabs: ITabsConfigTab[];
}

const TABS_CONFIG: ITabsConfig = {
	tabs: [
		{ path: "/dashboard/reservations", name: "reservations" },
		{ path: "/dashboard/employees", name: "employees" },
		{ path: "/dashboard/vehicles", name: "vehicles" }
	]
}

const Tabs = () => {
	const navigate = useNavigate();

	return (
		<Chakra.Tabs.Root defaultValue={TABS_CONFIG.tabs[0].path}>
			<Chakra.Tabs.List>
				{ TABS_CONFIG.tabs.map((tab: ITabsConfigTab) => {
					return <Chakra.Tabs.Trigger onClick={() => navigate(`${tab.path}`)} value={tab.path}>{tab.name}</Chakra.Tabs.Trigger>
				})}
			</Chakra.Tabs.List>
		</Chakra.Tabs.Root>
	);
}

export default Tabs;
