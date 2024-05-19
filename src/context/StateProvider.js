import { createContext, useEffect, useState } from "react";

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


  return <StateContext.Provider
    value={{
      alert,
      setAlert,
      pageSize,
      cereriAdeverinte,
      setCereriAdeverinte,
    }}
  >{children}</StateContext.Provider>;
};

export default StateContext;
