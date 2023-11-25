import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [token, setToken_] = useState(() => {
    // Retrieve token from cookie
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    return cookieValue || null;
  });

  const setToken = (newToken) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;

      // Set token in an HttpOnly cookie with a one-day expiration
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 1);

      document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; HttpOnly; Secure; SameSite=Strict`;
    } else {
      delete axios.defaults.headers.common["Authorization"];

      // Remove the token cookie
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; HttpOnly; Secure; SameSite=Strict';
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;