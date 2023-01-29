import getConfig from 'next/config';
import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Members from '../components/members';
import Plans from '../components/plans';
import Payments from '../components/payments';
import Dashboard from '../pages';
const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    const model = [
        {
            label: 'Home',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', page:<Dashboard/> }]
        },
        {
            label: '',
            items: [
                {
                    label: 'Members',
                    icon: 'pi pi-fw pi-users',
                    page: <Members />,
                    id: 1
                },
                {
                    label: 'Plans',
                    icon: 'pi pi-fw pi-briefcase',
                    page: <Plans />,
                    id: 2
                },
                {
                    label: 'Payments',
                    icon: 'pi pi-fw pi-money-bill',
                    page: <Payments />,
                    id: 3
                }
            ]
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}

                {/* <Link href="https://www.primefaces.org/primeblocks-react">
                    <a target="_blank" style={{ cursor: 'pointer' }}>
                        <img alt="Prime Blocks" className="w-full mt-3" src={`${contextPath}/layout/images/banner-primeblocks${layoutConfig.colorScheme === 'light' ? '' : '-dark'}.png`} />
                    </a>
                </Link> */}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
