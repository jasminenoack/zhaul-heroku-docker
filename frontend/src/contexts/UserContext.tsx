import React, {ReactNode, useState} from 'react';
import {useQuery, useMutation} from 'react-query'
import axios from 'axios'
import {getCookie} from "./helpers";

export interface LoginType {
  username: string;
  password: string;
}

export const UserContextDefault = {
  username: '',
  login: (params: LoginType) => {},
  createUser: (params: LoginType) => {},
  logout: () => {},
  showLogin: false,
  setShowLogin: (value: boolean) => {},
  showCreateUser: false,
  setShowCreateUser: (value: boolean) => {},
}

interface UserContext {
  username: string;
  login: (params: LoginType) => void;
  createUser: (params: LoginType) => void;
  logout: () => void;
  showLogin: boolean;
  setShowLogin: (value: boolean) => void;
  showCreateUser: boolean;
  setShowCreateUser: (value: boolean) => void;
}

export const UserContext = React.createContext<UserContext>(UserContextDefault);

function getCurrentUser() {
  return axios.get('/api/current_user/').then(res => {
      return res.data
    }).catch(err => console.log(err));
}


export function UserContextProvider({children}: {children: ReactNode}) {
  const {data, refetch} = useQuery('user', getCurrentUser);
  const csrfToken = getCookie('csrftoken') as string;
  const [showLogin, setShowLogin] = useState(false);
  const [showCreateUser, setShowCreateUser] = useState(false);

  function onAuthenticationSuccess() {
    refetch()
    setShowLogin(false)
    setShowCreateUser(false)
  }

  function loginFunction (params: LoginType) {
    return axios.post(
        '/api/auth/login/',
          params,
      {'headers': {'X-CSRFToken': csrfToken}},
        )
    }
    const login: any = useMutation(
        loginFunction,
        {onSuccess: onAuthenticationSuccess}
      )

  function logoutFunction() {
    return axios.delete(
        '/api/auth/logout/',
        {'headers': {'X-CSRFToken': csrfToken}},
      )
    }
    const logout: any = useMutation(
        logoutFunction,
        {onSuccess: onAuthenticationSuccess}
      )

    function createUserFunction(params: LoginType) {
      return axios.post(
        '/api/auth/register/',
          params,
        {'headers': {'X-CSRFToken': csrfToken}},
        )
    }
    const createUser: any = useMutation(
        createUserFunction,
        {onSuccess: onAuthenticationSuccess}
      )

    const context = {
      ...UserContextDefault,
      login: login.mutate,
      logout: logout.mutate,
      username: data?.username,
      showLogin,
      setShowLogin,
      showCreateUser,
      setShowCreateUser,
      createUser: createUser.mutate,
    }
    return (
        <UserContext.Provider value={context}>
            <div>
                {children}
            </div>
        </UserContext.Provider>
    )
}
