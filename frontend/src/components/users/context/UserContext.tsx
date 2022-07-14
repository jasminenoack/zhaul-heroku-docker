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

export function UserContextProvider({children}: { children: ReactNode }) {
  const {data, refetch} = useQuery('user', getCurrentUser);
  const csrfToken = getCookie('csrftoken') as string;
  const [showLogin, setShowLogin] = useState(false);
  const [showCreateUser, setShowCreateUser] = useState(false);

  function onAuthenticationSuccess() {
    refetch()
    setShowLogin(false)
    setShowCreateUser(false)
  }

  const login: any = useMutation(
    buildLoginPost(csrfToken),
    {onSuccess: onAuthenticationSuccess}
  );

  const logout: any = useMutation(
    buildLogoutDelete(csrfToken),
    {onSuccess: onAuthenticationSuccess}
  );

  const createUser: any = useMutation(
    buildCreateUserPost(csrfToken),
    {onSuccess: onAuthenticationSuccess}
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
  };
  return (
    <UserContext.Provider value={context}>
      <div>
        {children}
      </div>
    </UserContext.Provider>
  );
}
