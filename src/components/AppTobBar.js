import { classNames } from "primereact/utils";
import React, {
  useState,
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from "react";
import { LayoutContext } from "../context/layoutcontext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router-dom";
const AppTopbar = forwardRef((props, ref) => {
  const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } =
    useContext(LayoutContext);
  const menubuttonRef = useRef(null);
  const topbarmenuRef = useRef(null);
  const topbarmenubuttonRef = useRef(null);
  // const contextPath = getConfig().publicRuntimeConfig.contextPath;
  const [displayConfirmation, setDisplayConfirmation] = useState(false);
  const navigate = useNavigate();
  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current,
  }));
  const logOut = () => {
    navigate("/");
  };

  const confirmationDialogFooter = (
    <>
      <Button
        type="button"
        label="No"
        icon="pi pi-times"
        onClick={() => setDisplayConfirmation(false)}
        className="p-button-text"
      />
      <Button
        type="button"
        label="Yes"
        icon="pi pi-check"
        onClick={() => logOut()}
        className="p-button-text"
        autoFocus
      />
    </>
  );
  return (
    <div className="layout-topbar">
      {/* <Link href="/"> */}
      <a className="layout-topbar-logo">
        <>
          {/* <img src={`${contextPath}/layout/images/logo-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`} width="47.22px" height={'35px'} widt={'true'} alt="logo" /> */}
          <span>WACI </span>
        </>
      </a>
      {/* </Link> */}

      <button
        ref={menubuttonRef}
        type="button"
        className="p-link layout-menu-button layout-topbar-button"
        onClick={onMenuToggle}
      >
        <i className="pi pi-bars" />
      </button>

      {/* <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button> */}

      <div
        ref={topbarmenuRef}
        className={classNames("layout-topbar-menu", {
          "layout-topbar-menu-mobile-active": layoutState.profileSidebarVisible,
        })}
      >
        {/* <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-calendar"></i>
                    <span>Calendar</span>
                </button>
                
                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-user"></i>
                    <span>Profile</span>
                </button> */}
        {/* <Link href="/documentation"> */}
        {/* <button type="button" className="p-link layout-topbar-button">
                        <i className="pi pi-cog"></i>
                        <span>Settings</span>
                    </button> */}
        {/* </Link> */}
        <button
          type="button"
          className="p-link layout-topbar-button"
          onClick={() => setDisplayConfirmation(true)}
        >
          <i className="pi pi-fw pi-sign-out"></i>
          <span>LogOut</span>
        </button>
      </div>
      <Dialog
        header="Confirmation"
        visible={displayConfirmation}
        onHide={() => setDisplayConfirmation(false)}
        style={{ width: "350px" }}
        modal
        footer={confirmationDialogFooter}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          <span>Are you sure you want to sign out?</span>
        </div>
      </Dialog>
    </div>
  );
});

export default AppTopbar;
