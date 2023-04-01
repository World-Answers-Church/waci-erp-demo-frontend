import {
  BASE_URL,
  SOME_ERROR_OCCURED,
  INTERNAL_SERVER_ERROR,
} from "../constants/Constants";
import { UserSessionUtils } from "./UserSessionUtils";

export default class BaseApiService {
  token = UserSessionUtils.getUserToken();

  headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + this.token,
  };

  async getRequest(path, queryParam) {
    const fullPath = BASE_URL + path + "?" + new URLSearchParams(queryParam);
    return await fetch(fullPath, { method: "GET", headers: this.headers });
  }

  async makeGetRequest(path, queryParam) {
    return this.getRequest(path, queryParam).then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 401) {
        UserSessionUtils.clearLocalStorageAndLogOut();
      } else {
        let data = response.json();
        let errorMessage = data.message ? data.message : SOME_ERROR_OCCURED;
        throw new Error(errorMessage);
      }
    });
  }

  async postRequest(requestBody, path) {
    const fullPath = BASE_URL + path;

    return await fetch(fullPath, {
      method: "POST",
      headers: this.headers,
      body: requestBody !== null ? JSON.stringify(requestBody) : "",
    });
  }

  async makePostRequest(requestBody, path) {
    return this.postRequest(requestBody, path).then(async (response) => {
      if (response.ok) {
        return response
      } else if (
        response.status === 400 ||
        response.status === 403 ||
        response.status === 500
      ) {
        let data = await response.json();
        let errorMessage = data?.responseMessage ?? INTERNAL_SERVER_ERROR;
        throw new TypeError(errorMessage);
      } else if (response.status === 401) {
        UserSessionUtils.clearLocalStorageAndLogOut();
      } else {
        throw new TypeError(INTERNAL_SERVER_ERROR);
      }
    });
  }
}
