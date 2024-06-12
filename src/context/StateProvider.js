import { createContext, useEffect, useState } from "react";
import { getFacultate } from "../api/API";

const StateContext = createContext({});

export const StateProvider = ({ children }) => {

  let pageSize = 3;
  // alert
  const [alert, setAlert] = useState(null);
  if (alert) {
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  }

  const [cereriAdeverinte, setCereriAdeverinte] = useState([]);

  const fetchCereriAdeverinte = async () => {
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_GOOGLE_SHEET_ID}/values/Sheet1?key=${process.env.REACT_APP_GOOGLE_SHEET_API_KEY}`
      );
      const result = await response.json();
      console.log(result);
      setCereriAdeverinte(result.values);
    } catch (error) {
      console.error('Error fetching cereriAdeverinte: ', error);
    }
  };

  useEffect(() => {
    fetchCereriAdeverinte();
  }, []);

  const [facultate, setFacultate] = useState(null);

  const fetchFacultate = async () => {
    try {
      const response = await getFacultate();
      if (response?.status === 200) {
        setFacultate(response.data[0])
      }
    } catch (error) {
      console.log(error.message, "error");
      setAlert({
        type: "danger",
        message: error.message || "Something went wrong...", // Use the error message from the catch
      });
    }
  };
  return <StateContext.Provider
    value={{
      alert,
      setAlert,
      pageSize,
      cereriAdeverinte,
      setCereriAdeverinte,
      facultate,
      setFacultate,
      fetchFacultate,
    }}
  >{children}</StateContext.Provider>;
};

export default StateContext;
