import { createContext, useEffect, useState } from "react";
import { getAdminByEmail, getSecretarByEmail } from "../api/API";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const [rememberMe, setRememberMe] = useState(true);
  const [user, setUser] = useState(null);

  const userIsLogged =
    rememberMe || !!localStorage.getItem("emailToLog")
      ? localStorage.getItem("emailToLog")
      : sessionStorage.getItem("emailToLog");

  const isLoggedIn = () => {
    return !!userIsLogged;
  };

  function logout() {
    sessionStorage.removeItem("emailToLog")
    localStorage.removeItem("emailToLog")
    
    sessionStorage.removeItem("rol")
    localStorage.removeItem("rol")
    setUser(null);
    window.location.reload();
  }

  useEffect(() => {
    if (!user && userIsLogged) {
      const rolUser =
        rememberMe || !!localStorage.getItem("rol")
          ? localStorage.getItem('rol')
          :
          sessionStorage.getItem('rol');
      if (rolUser === 'ADMIN')
        fetchUser(userIsLogged);
      else
        if (rolUser === 'SECRETAR')
          fetchSecretar(userIsLogged);
    }
  }, [userIsLogged])

  const fetchUser = async (email) => {
    try {
      const response = await getAdminByEmail(email);
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchSecretar = async (email) => {
    try {
      const response = await getSecretarByEmail(email);
      console.log(response.data);
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        rememberMe,
        setRememberMe,
        isLoggedIn,
        userIsLogged,
        fetchUser,
        fetchSecretar,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;