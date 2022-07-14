import axios from "axios";
import {LoginType} from "./types";

/*
* These are api builds to be used in the context object
* They are separated more for ease of reading than anything else
* */

export function getCurrentUser() {
  return axios.get('/api/current_user/').then(res => {
    return res.data
  }).catch(err => console.log(err));
}

export function buildLoginPost(csrfToken: string) {
  /*
  * Build the function we use to login.
  * We wrap this to get a closure with the csrf variable.
  * */
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
  /*
  * Build the function we use to logout.
  * We wrap this to get a closure with the csrf variable.
  * */
  function logoutFunction() {
    return axios.delete(
      '/api/auth/logout/',
      {'headers': {'X-CSRFToken': csrfToken}},
    )
  }

  return logoutFunction
}

export function buildCreateUserPost(csrfToken: string) {
  /*
  * Build the function we use to create a user.
  * We wrap this to get a closure with the csrf variable.
  * */
  function createUserFunction(params: LoginType) {
    return axios.post(
      '/api/auth/register/',
      params,
      {'headers': {'X-CSRFToken': csrfToken}},
    )
  }

  return createUserFunction
}
