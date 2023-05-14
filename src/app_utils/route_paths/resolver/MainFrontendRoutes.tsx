import { PrimeIcons } from "primereact/api";
import { Module } from "../../../app_utils/constants/Module";
import LandingPage from "../../../dashboard/pages/LandingPage";
import { UserSessionUtils } from "../../utils/UserSessionUtils";
import { LOGIN_ROUTE_PATH } from "../Auth";
import { DASHBOARD_ROUTE_PATH } from "../../../dashboard/routes/Dashboard";
import { BackofficeRoutes } from "../../../back_office/routes/BackofficeRoutes";
import { arrayContains } from "../../utils/Utils";
import * as constants from "../../constants/Constants";
import Login from "../../../dashboard/pages/Login";
import { CoreRoutes } from "../../../crm_core/CoreRoutes";
import { DocumentRepositoryRoutes } from "../../../document_repository/routes/DocumentRepositoryRoutes";

export class MainFrontendRoutes {
    /**
     * Start of module section handler attributes
     */
    settingsModuleSelected = false;
    crmCoreModuleSelected = false;
    documentRepositoryModuleSelected = false;
    userDetails: any = {};
    appHistory: any = null;

    constructor(selectedModuleName: string) {
        this.settingsModuleSelected = selectedModuleName === Module.BACK_OFFICE.toString();
        this.crmCoreModuleSelected = selectedModuleName === Module.CRM_CORE.toString();
        this.documentRepositoryModuleSelected = selectedModuleName === Module.DOCUMENT_REPOSITORY.toString();
        this.userDetails = UserSessionUtils.getUserDetails();
    }

    /**
     * This checks whether a user can view the landing page. It checks whether a user has a specific
     * module or set of permissions that are allowed to view the landing page
     * @returns boolean
     */
    userCanViewLandingPage() {
        if (this.userDetails?.isASuperAdmin) {
            return true;
        }
        let userModules: any = [...new Set<string>(this.userDetails?.permissionLists?.map((permission: any) => permission.module))];

        return arrayContains(userModules, constants.MODULE_BACKOFFICE_VALUE);
    }

    /**
     * From here we populate menu item for the selected module
     */
    getMainNavigationMenu() {
        if (this.settingsModuleSelected) return new BackofficeRoutes(this.userDetails).getNavigationMenu();
        else if (this.crmCoreModuleSelected) return new CoreRoutes(this.userDetails).getNavigationMenu();
        else if (this.documentRepositoryModuleSelected) return new DocumentRepositoryRoutes(this.userDetails).getNavigationMenu();
        return [];
    }

    /**
     *
     * @returns
     */
    getMainUnAuthenticatedNavigationMenu() {
        return [{ label: "Login", icon: PrimeIcons.SIGN_IN, to: LOGIN_ROUTE_PATH }];
    }

    /**
     *
     * @returns
     */
    getAuthenticatedComponentRouters() {
        if (this.settingsModuleSelected) {
            return new BackofficeRoutes(this.userDetails).getAuthenticatedComponetRouters();
        } else if (this.crmCoreModuleSelected) return new CoreRoutes(this.userDetails).getAuthenticatedComponetRouters();
        else if (this.documentRepositoryModuleSelected) return new DocumentRepositoryRoutes(this.userDetails).getAuthenticatedComponetRouters();

        return [{ path: DASHBOARD_ROUTE_PATH, label: "Dashboard", component: LandingPage, exact: true }];
    }

    /**
     *
     * @returns
     */
    getUnAuthenticatedComponetRouters() {
        return [{ path: LOGIN_ROUTE_PATH, label: "Login", component: Login, exact: true }];
    }

    /**
     *
     * @returns
     */
    getAuthenticatedRoutes() {
        return [];
    }
}
