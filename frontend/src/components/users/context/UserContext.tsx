import React, {ReactNode, useState} from 'react';
import {useQuery, useMutation} from 'react-query'
import {getCookie} from "../../helpers";
import {LoginType} from "./types";
import {buildCreateUserPost, buildLoginPost, buildLogoutDelete, getCurrentUser} from "./api";

export const UserContextDefault = {
  username: '',
  login: (params: LoginType) => {
  },
  createUser: (params: LoginType) => {
  },
  logout: () => {
  },
  showLogin: false,
  setShowLogin: (value: boolean) => {
  },
  showCreateUser: false,
  setShowCreateUser: (value: boolean) => {
  },
  error: null,
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
  error: null | {[key: string]: string};
}

export const UserContext = React.createContext<UserContext>(UserContextDefault);

export function UserContextProvider({children}: { children: ReactNode }) {
  /*
 * This manages the state around users
 * */
  const {data, refetch} = useQuery('user', getCurrentUser);
  const csrfToken = getCookie('csrftoken') as string;
  const [showLogin, setShowLogin] = useState(false);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [error, setError] = useState(null);

  function onAuthenticationSuccess() {
    refetch()
    setShowLogin(false)
    setShowCreateUser(false)
  }

  function onAuthenticationError(error: any) {
    const errorData = error?.response?.data
    setError(errorData)
  }

  const login: any = useMutation(
    buildLoginPost(csrfToken),
    {onSuccess: onAuthenticationSuccess, onError: onAuthenticationError}
  );

  const logout: any = useMutation(
    buildLogoutDelete(csrfToken),
    {onSuccess: onAuthenticationSuccess}
  );

  const createUser: any = useMutation(
    buildCreateUserPost(csrfToken),
    {onSuccess: onAuthenticationSuccess, onError: onAuthenticationError}
  );

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
    error
  };
  return (
    <UserContext.Provider value={context}>
      <div>
        {children}
      </div>
    </UserContext.Provider>
  );
}
