import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import endPoints from 'services/api';

const AuthContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProviderAuth();
  return <AuthContext.Provider value={auth}> {children} </AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProviderAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState();

  // const fetchUser = useCallback(async () => {
  //   try {
  //     const token = Cookies.get('token');

  //     if (token) {
  //       axios.defaults.headers.Authorization = `Bearer ${token}`;
  //       const { data: user } = await axios.get(endPoints.auth.profile);
  //       setUser(user);
  //     }
  //   } catch (error) {
  //     setUser(null);
  //   }
  // }, []);

  const signIn = async (email, password) => {
    const options = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };
    const { data: access_token } = await axios.post(endPoints.auth.login, { email, password }, options);
    if (access_token) {
      const token = access_token.access_token;
      Cookies.set('token', token, { expires: 5 });
      // await fetchUser();

      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data: user } = await axios.get(endPoints.auth.profile);
      console.log(user);
      setUser(user);
    }
  };

  // useEffect(fetchUser, [fetchUser]);

  return {
    user,
    signIn,
    setError,
    error,
  };
}
