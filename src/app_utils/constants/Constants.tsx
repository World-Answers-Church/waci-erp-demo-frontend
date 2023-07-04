/**
 * User session key placeholders
 */
export const APP_NAME = "Tugende CRM";
export const KEY_APP_VERSION = "v1.0.0"; // This represents the current running app version that has to be updated when making a release
/**
 * This has been moved from the .env file because it was not being set as an environment variable. React does not
 * read directly from the environment and therefore the read has to be done from the .env file.
 * Also, the risk of other people using this key is minimized by setting the URIs in the Google Console.
 * More research needs to be done to read the variable from the .env file
 */
export const REACT_APP_GOOGLE_CLIENT_ID = "631187462392-bu7ph8e7nis0olor367ugdt5iooghmei.apps.googleusercontent.com";
export const KEY_BEARER_TOKEN = "KEY_BEARER_TOKEN";
export const KEY_REFRESH_TOKEN = "KEY_REFRESH_TOKEN";
export const KEY_USER_DETAILS = "KEY_USER_DETAILS";
export const KEY_SELECTED_APPLICATION_MODULE = "KEY_SELECTED_APPLICATION_MODULE";
export const KEY_SELECTED_OBJECT = "KEY_SELECTED_OBJECT";
export const KEY_IS_LOGGED_IN = "KEY_IS_LOGGED_IN";
export const KEY_RANDOM_DEVICE_ID = "KEY_RANDOM_DEVICE_ID";
export const MAXIMUM_RECORDS_PER_PAGE: number = 20;
export const SEARCH_DATE_FILTER_FORMAT = "yy-mm-dd";
export const SEARCH_DATE_TIME_FILTER_FORMAT = "yy-mm-dd";
export const TITLE_FILTER_HEADER = "Filters";
export const NULLISH_DATE = "0001-01-01T00:00:00+00:00";

/**
 * This is the main content layout id. It houses the container that has the main display.
 * Use it in scenarios where where you want to replace the current content without
 * modifying the URL
 */
export const ID_LAYOUT_CONTENT = "layoutContent";

export const ICON_SEARCH = "pi pi-search";
export const ICON_REFRESH = "pi pi-refresh";
export const CSS_FILTER_SUBMIT_BUTTON = "p-button-primary mr-2 ml-2 mt-5";
export const CSS_FILTER_RESET_BUTTON = "p-button-secondary mr-2 ml-2 mt-5";
export const CSS_FILTER_SEARCH_INPUT_DIV = "field col-4 p-fluid";
export const CSS_FILTER_SEARCH_INPUT_NORMAL_DIV = "field col-2 p-fluid";
export const CSS_FILTER_DEFAULT_DIV = "field col-2 p-fluid";
export const CSS_FILTER_SMALL_DIV = "field col-1 p-fluid";
export const CSS_FILTER_MEDIUM_DIV = "field col-3 p-fluid";
export const CSS_ADD_NEW_BUTTON = "p-button-outlined p-button-indigo mr-2 mb-2";
export const CSS_EDIT_BUTTON = "p-button-rounded p-button-success mr-2";
export const CSS_MD_COL_3 = "md:col-3";
export const CSS_MD_COL_12 = "md:col-12";
export const CSS_COL_2 = "col-2";
export const CSS_COL_3 = "col-3";
export const CSS_COL_4 = "col-4";
export const CSS_COL_6 = "col-6";
export const CSS_COL_8 = "col-8";
export const CSS_COL_9 = "col-9";
export const CSS_COL_10 = "col-10";
export const CSS_COL_12 = "col-12";

export const CSS_BACK_BUTTON = "p-button-secondary mr-2 mb-2";
export const LABEL_BACK_BUTTON = "Back To List";
export const LABEL_BACK = "Back";
export const ICON_BACKWARD = "pi pi-fast-backward";
export const ICON_ADD_NEW = "pi pi-plus";
export const ICON_EDIT = "pi pi-pencil";
export const ICON_SYNC = "pi pi-sync";

export const ICON_BACK_OFFICE_TOP_BAR = "pi pi-user-edit action green-bgcolor white-color";
export const ICON_CRM_CORE_TOP_BAR = "pi pi-cog action pink-bgcolor white-color";
export const ICON_DOCUMENT_REPOSITORY_TOP_BAR = "pi pi-folder action blue-bgcolor white-color";

export const ICON_COLLECTIONS_TOP_BAR = "pi pi-image action indigo-bgcolor white-color";
export const ICON_REPORTS_TOP_BAR = "pi pi-file-pdf action orange-bgcolor white-color";
export const ICON_PRODUCTS_TOP_BAR = "pi pi-th-large action teal-bgcolor white-color";
export const ICON_CLIENT_SEARCH_TOP_BAR = "pi pi-search action green-bgcolor white-color";
export const ICON_VETTING_TOP_BAR = "pi pi-check-circle action teal-bgcolor white-color";
export const ICON_INCIDENTS_TOP_BAR = "pi pi-exclamation-circle action orange-bgcolor white-color";
export const ICON_SERVER_STATS_TOP_BAR = "pi pi-chart-bar action orange-bgcolor white-color";
export const ICON_MANUAL_TRANSACTIONS_TOP_BAR = "pi pi-credit-card action blue-bgcolor white-color";
export const ICON_NOTIFICATIONS_TOP_BAR = "pi pi-envelope action purple-bgcolor white-color";
export const ICON_ENGAGEMENTS = "pi pi-comments action blue-bgcolor white-color";
export const ICON_LEADS_GENERATION = "pi pi-user-plus action brown-bgcolor white-color";

export const BTN_BACKOFFICE_CSS = "p-button-rounded p-button-success";
export const BTN_SETTINGS_CSS = "p-button-rounded p-button-info action pink-bgcolor white-color";
export const BTN_DOCUMENT_REPOSITORY_CSS = "p-button-rounded p-button-info action blue-bgcolor white-color";

export const BTN_CLIENT_SEARCH_CSS = "p-button-rounded p-button-success";
export const BTN_VETTING_CSS = "p-button-rounded p-button-info";
export const BTN_INCIDENTS_CSS = "p-button-rounded p-button-warning";
export const BTN_SERVER_STATS_INCIDENTS_CSS = "p-button-rounded p-button-danger";
export const BTN_MANUAL_TRANSACTIONS_CSS = "p-button-rounded p-button-primary";
export const BTN_NOTIFICATIONS_CSS = "p-button-rounded p-button-help";
export const BTN_ENGEGEMENTS_CSS = "p-button-rounded p-button-secondary";
export const BTN_LEADS_GENERATION_CSS = "p-button-rounded p-button-dark-brown";

export const BACKEND_KNOWN_HTTP_ERROR_CODES = [400, 403, 415, 500];

// Regular Expressions
export const EmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// Supported Countries
export const SupportedTerritories = [
  { territory: "Uganda", countryIsoCode: "UG" },
  { territory: "Kenya", countryIsoCode: "KE" },
];

export const RECORD_STATUSES = [
  { id: 0, value: "Active" },
  { id: "-1", value: "Deactivated" },
];
