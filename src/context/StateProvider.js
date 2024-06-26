import { createContext, useEffect, useState } from "react";
import { getAdeverinteAcceptate, getAdeverinteRespinse, getAllSecretari, getAllStudenti, getCereriAdeverinte, getFacultate } from "../api/API";

const StateContext = createContext({});

export const StateProvider = ({ children }) => {
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
    fetchFacultate();
  }, []);

  const [facultate, setFacultate] = useState(null);

  const fetchFacultate = async () => {
    try {
      const response = await getFacultate();
      if (response?.status === 200) {
        setFacultate(response.data[0]);
        console.log(response.data[0]);
      }
    } catch (error) {
      console.log(error.message, "error");
      setAlert({
        type: "danger",
        message: error.message || "Something went wrong...", // Use the error message from the catch
      });
    }
  };


  const [listaStudenti, setListaStudenti] = useState(null);
  let pageSize = 3;
  const [currentPageStudenti, setCurrentPageStudenti] = useState(1);

  const fetchListaStudenti = async () => {
    try {
      const response = await getAllStudenti();
      if (response?.status === 200) {
        setListaStudenti(response.data)
      }
    } catch (error) {
      console.log(error.message, "error");
      setAlert({
        type: "danger",
        message: error.message || "Something went wrong...", // Use the error message from the catch
      });
    }
  };


  const [listaSecretari, setListaSecretari] = useState(null);
  let pageSizeSecretariat = 3;
  const [currentPageSecretari, setCurrentPageSecretari] = useState(1);

  const fetchListaSecretari = async () => {
    try {
      const response = await getAllSecretari();
      if (response?.status === 200) {
        setListaSecretari(response.data)
      }
    } catch (error) {
      console.log(error.message, "error");
      setAlert({
        type: "danger",
        message: error.message || "Something went wrong...", // Use the error message from the catch
      });
    }
  };


  const [listaCereriAdeverinte, setListaCereriAdeverinte] = useState(null);
  let pageSizeCereriAdeverinta = 3;
  const [currentPageCereriAdeverinta, setCurrentPageCereriAdeverinta] = useState(1);

  const fetchListaCereriAdeverinte = async () => {
    try {
      const response = await getCereriAdeverinte();
      if (response?.status === 200) {
        setListaCereriAdeverinte(response.data)
      }
    } catch (error) {
      console.log(error.message, "error");
      setAlert({
        type: "danger",
        message: error.message || "Something went wrong...", // Use the error message from the catch
      });
    }
  };

  const [listaAdeverinteAcceptate, setListaAdeverinteAcceptate] = useState(null);

  const fetchListaAdeverinteAcceptate = async () => {
    try {
      const response = await getAdeverinteAcceptate();
      if (response?.status === 200) {
        setListaAdeverinteAcceptate(response.data)
      }
    } catch (error) {
      console.log(error.message, "error");
      setAlert({
        type: "danger",
        message: error.message || "Something went wrong...", // Use the error message from the catch
      });
    }
  };


  
  const [listaAdeverinteRespinse, setListaAdeverinteRespinse] = useState(null);

  const fetchListaAdeverinteRespinse= async () => {
    try {
      const response = await getAdeverinteRespinse();
      if (response?.status === 200) {
        setListaAdeverinteRespinse(response.data)
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

      listaStudenti,
      setListaStudenti,
      fetchListaStudenti,
      currentPageStudenti,
      setCurrentPageStudenti,

      pageSizeSecretariat,
      listaSecretari,
      setListaSecretari,
      currentPageSecretari,
      setCurrentPageSecretari,
      fetchListaSecretari,

      listaCereriAdeverinte,
      setListaCereriAdeverinte,
      pageSizeCereriAdeverinta,
      currentPageCereriAdeverinta,
      setCurrentPageCereriAdeverinta,
      fetchListaCereriAdeverinte,

      listaAdeverinteAcceptate,
      setListaAdeverinteAcceptate,
      fetchListaAdeverinteAcceptate,

      listaAdeverinteRespinse,
      setListaAdeverinteRespinse,
      fetchListaAdeverinteRespinse,
    }}
  >{children}</StateContext.Provider>;
};

export default StateContext;
