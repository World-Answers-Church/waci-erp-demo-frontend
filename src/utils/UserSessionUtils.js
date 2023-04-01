import {
  TOKEN_LOCALSTORAGE_KEY,
  USER_DETAILS_LOCALSTORAGE_KEY,
  REFRESH_TOKEN_LOCALSTORAGE_KEY,
  USER_IS_LOGGED_IN_LOCALSTORAGE_KEY,
} from "../constants/Constants";

/**
 * This class manages user session variables and state
 */
export class UserSessionUtils {
  /**
   * This stores users authentication token into the session storage
   * @param {*} token
   * @returns
   */
  static setUserToken(token) {
    return localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, token);
  }
  /**
   * This fetches users authentication token from the session storage
   * @returns
   */
  static getUserToken() {
    return localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);
  }
  /**
   * This stores users authentication token into the session storage
   * @param {*} userdetails
   * @returns
   */
  static setUserDetails(userdetails) {
    localStorage.setItem(
      USER_DETAILS_LOCALSTORAGE_KEY,
      JSON.stringify(userdetails)
    );
    this.setIsUserLoggedIn("true");
  }
  /**
   * This fetches users authentication token from the session storage
   * @returns
   */
  static getUserDetails() {
    let user = localStorage.getItem(USER_DETAILS_LOCALSTORAGE_KEY);
    return JSON.parse(user);
  }

  /**
   * This fetches users refresh token from the local storage
   * @returns
   */
  static getUserRefreshToken() {
    let token = localStorage.getItem(REFRESH_TOKEN_LOCALSTORAGE_KEY);
    return token;
  }
  /**
   * This fetches users login status key from the local storage
   * @returns
   */
  static isUserLoggedIn() {
    let loggedIn = localStorage.getItem(USER_IS_LOGGED_IN_LOCALSTORAGE_KEY);
    return loggedIn === "true" ? true : false;
  }

  /**
   * This fetches users login status key from the local storage
   * @returns
   */
  static setIsUserLoggedIn(isLOGGEDin) {
    return localStorage.setItem(USER_IS_LOGGED_IN_LOCALSTORAGE_KEY, isLOGGEDin);
  }

  /**
   * This method clears localStorage and logout
   * @returns
   */
  static clearLocalStorageAndLogOut() {
    localStorage.clear();
    localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, "");
    localStorage.setItem(USER_DETAILS_LOCALSTORAGE_KEY, "");
    localStorage.setItem(REFRESH_TOKEN_LOCALSTORAGE_KEY, "");
    localStorage.setItem(USER_IS_LOGGED_IN_LOCALSTORAGE_KEY, "");
    window.location.href = "/";
  }
}
