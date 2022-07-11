import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const AuthContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProviderAuth();
  return <AuthContext value={auth}> {children} </AuthContext>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProviderAuth() {
  const [user, setUser] = useState(null);

  const singIn = async (email, password) => {
    setUser('login');
  };

  return {
    user,
    singIn,
  };
}
