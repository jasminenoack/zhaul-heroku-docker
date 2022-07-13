import React, {ReactNode, useState} from 'react';
import {useQuery, useMutation} from 'react-query'
import axios from 'axios'

export interface LoginType {
  username: string;
  password: string;
}

export const UserContextDefault = {
  username: '',
  login: (params: LoginType) => {},
  logout: () => {},
}

interface UserContext {
  username: string;
  login: (params: LoginType) => void;
  logout: () => void;
}

export const UserContext = React.createContext<UserContext>(UserContextDefault);

function getCurrentUser() {
  return axios.get('/api/current_user/').then(res => {
      return res.data
    }).catch(err => console.log(err));
}

function getCookie(name: string) {
  if (!document.cookie) {
    return null;
  }

  const xsrfCookies = document.cookie.split(';')
    .map(c => c.trim())
    .filter(c => c.startsWith(name + '='));

  if (xsrfCookies.length === 0) {
    return null;
  }
  return decodeURIComponent(xsrfCookies[0].split('=')[1]);
}



export function UserContextProvider({children}: {children: ReactNode}) {
  const {data, refetch} = useQuery('user', getCurrentUser);
  const csrfToken = getCookie('CSRF-TOKEN') as string;

  function loginFunction (params: LoginType) {
    return axios.post(
        '/api/auth/login/',
          params,
        )
    }
    const login: any = useMutation(
        loginFunction,
        {onSuccess: () => {refetch()}}
      )

  function logoutFunction() {
    return axios.delete(
        '/api/auth/logout/',
        {'headers': {'X-CSRFToken': csrfToken}},
      )
    }
    const logout: any = useMutation(
        logoutFunction,
        {onSuccess: () => {refetch()}}
      )

    const context = {
      ...UserContextDefault,
      login: login.mutate,
      logout: logout.mutate,
      username: data?.username
    }
    return (
        <UserContext.Provider value={context}>
            <div>
                {children}
            </div>
        </UserContext.Provider>
    )
}
