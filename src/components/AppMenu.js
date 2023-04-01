import React from "react";
import Members from "../appPages/Members";
import Plans from "../appPages/Plans";
import Payments from "../appPages/Payments";
import { MenuProvider } from "../context/menucontext";
import Dashboard from "../appPages/Dashboard";
import AppMenuitem from "./AppMenuItem";

const AppMenu = () => {
  const model = [
    {
      label: "Home",
      items: [
        { label: "Dashboard", icon: "pi pi-fw pi-home", page: <Dashboard /> },
      ],
    },
    {
      label: "",
      items: [
        {
          label: "Members",
          icon: "pi pi-fw pi-users",
          page: <Members />,
          id: 1,
        },
        {
          label: "Plans",
          icon: "pi pi-fw pi-briefcase",
          page: <Plans />,
          id: 2,
        },
        {
          label: "Payments",
          icon: "pi pi-fw pi-money-bill",
          page: <Payments />,
          id: 3,
        },
      ],
    },
  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item.seperator ? (
            <AppMenuitem item={item} root={true} index={i} key={item.label} />
          ) : (
            <li className="menu-separator"></li>
          );
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
