import axios from "axios";
import { Exception } from "sass";
import { BASE_URL, SOME_ERROR_OCCURED } from "../constants/Constants";
import { UserSessionUtils } from "./UserSessionUtils";

export default class BaseApiService {
  async getRequest(path, queryParam) {
    const token = UserSessionUtils.getUserToken();
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    const fullPath = BASE_URL + path + "?" + new URLSearchParams(queryParam);
    return await fetch(fullPath, { method: "GET", headers: headers });
  }

  async makeGetRequest(path, queryParam) {
    return this.getRequest(path, queryParam).then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 401) {
        UserSessionUtils.clearLocalStorageAndLogOut();
      } else {
        let data = response.json();
        let errorMessage = data.responseMessage
          ? data.responseMessage
          : SOME_ERROR_OCCURED;
        throw new Exception(errorMessage);
      }
    });
  }
}
