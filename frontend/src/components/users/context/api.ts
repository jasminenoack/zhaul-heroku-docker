import axios from "axios";
import {LoginType} from "./types";

export function getCurrentUser() {
  return axios.get('/api/current_user/').then(res => {
    return res.data
  }).catch(err => console.log(err));
}

export function buildLoginPost(csrfToken: string) {
  function loginFunction(params: LoginType) {
    return axios.post(
      '/api/auth/login/',
      params,
      {'headers': {'X-CSRFToken': csrfToken}},
    )
  }

  return loginFunction
}

export function buildLogoutDelete(csrfToken: string) {
  function logoutFunction() {
    return axios.delete(
      '/api/auth/logout/',
      {'headers': {'X-CSRFToken': csrfToken}},
    )
  }

  return logoutFunction
}

export function buildCreateUserPost(csrfToken: string) {
  function createUserFunction(params: LoginType) {
    return axios.post(
      '/api/auth/register/',
      params,
      {'headers': {'X-CSRFToken': csrfToken}},
    )
  }

  return createUserFunction
}
