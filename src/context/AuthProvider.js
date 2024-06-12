import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { getAdminByID, getSecretar } from "../api/API";
const AuthContext = createContext({});

//! emailToLog => Id Admin Logged in Session

export const AuthProvider = ({ children }) => {

  const [rememberMe, setRememberMe] = useState(true);
  // user
  const [user, setUser] = useState(null);

  const userIsLogged =
    rememberMe || !!localStorage.getItem("emailToLog")
      ? localStorage.getItem("emailToLog")
      : sessionStorage.getItem("emailToLog");

  console.log(user);
  const isLoggedIn = () => {
    return !!userIsLogged;
  };

  // logout function
  function logout() {
    sessionStorage.removeItem("emailToLog")
    localStorage.removeItem("emailToLog")
    setUser(null);
  }

  useEffect(() => {
    if (!user && userIsLogged) {
      // const decodedToken = jwtDecode(JSON.stringify(userIsLogged));
      // setUser(decodedToken);
      fetchUser(rememberMe || !!localStorage.getItem("emailToLog")
        ? localStorage.getItem("emailToLog")
        : sessionStorage.getItem("emailToLog"));
    }
  }, [userIsLogged])

  const fetchUser = async (email) => {
    try {
      const response = await getAdminByID(email);
      if (response.status === 400) {
        const resp = await getSecretar();
        if (response?.status === 200) {
          const emailObject = resp.find(item => item.emailSecretar === localStorage.getItem('emailToLog') || item.emailSecretar === sessionStorage.getItem('emailToLog'));
          console.log(emailObject);
          setUser(emailObject);
        }
      }
      if (response?.status === 200) {
        setUser(user?.data);
      }
    }
    catch (error) {
      console.log("Waiting for data to fetch...");
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
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;