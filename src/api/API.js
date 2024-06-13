import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080';

axios.defaults.headers = {
  // 'Content-Type': 'multipart/form-data',
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
  'Content-Type': 'application/json'
};

// ---------------------------- Calls ----------------------------------
export const loginAdmin = async (email, password) => {
  try {
    const response = await axios.post('/auth/administrator/login?email=' + email + '&parola=' + password);
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data || "Something went wrong... Try again later");

    } else {
      throw new Error("Network error or other issue");
    }
  }
};

export const login = async (email) => {
  try {
    const response = await axios.post('/auth/login?email=' + email);
    if (response.data.jwt === '')
      return null;
    else
      return response;
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      throw new Error(error.response.data || "Something went wrong... Try again later");

    } else {
      throw new Error("Network error or other issue");
    }
  }
};


// get admin by id
export const getAdminByEmail = async (email) => {
  try {
    const response = await axios.get("/administrator/get/" + email);
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data || "Something went wrong... Try again later");

    } else {
      throw new Error("Network error or other issue");
    }
  }
};


export const getSecretarByEmail = async (email) => {
  try {
    const response = await axios.get("/secretar/get/" + email);
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data || "Something went wrong... Try again later");

    } else {
      throw new Error("Network error or other issue");
    }
  }
};


export const addStudents = async (data) => {
  try {
    const response = await axios.post('/student/addMultiple', data);
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data || "Something went wrong... Try again later");

    } else {
      throw new Error("Network error or other issue");
    }
  }
};

export const addListSecretari = async (data) => {
  try {
    const response = await axios.post('/secretar/addMultiple', data);
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data || "Something went wrong... Try again later");

    } else {
      throw new Error("Network error or other issue");
    }
  }
};

// get studenti
export const getAllStudenti = async () => {
  try {
    const response = await axios.get("/student/getAll");
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data || "Something went wrong... Try again later");

    } else {
      throw new Error("Network error or other issue");
    }
  }
};


// get secretari
export const getAllSecretari = async () => {
  try {
    const response = await axios.get("/secretar/getAll");
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data || "Something went wrong... Try again later");

    } else {
      throw new Error("Network error or other issue");
    }
  }
};

// get facultate
export const getFacultate = async () => {
  try {
    const response = await axios.get("/facultate/getAll");
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data || "Something went wrong... Try again later");

    } else {
      throw new Error("Network error or other issue");
    }
  }
};

export const getCereriAdeverinte = async () => {
  try {
    const response = await axios.get("/api/google-sheets/new-entries");
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data || "Something went wrong... Try again later");

    } else {
      throw new Error("Network error or other issue");
    }
  }
};

export const isFirstProcessedToday = async () => {
  try {
    const response = await axios.get("/adeverinta/isFirstProcessedToday");
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data || "Something went wrong... Try again later");

    } else {
      throw new Error("Network error or other issue");
    }
  }
};


export const aproveCerereAdeverinta = async (nrInreg, emailSecretar, data) => {
  try {
    const response = await axios.post('/adeverinta/approve?nrInregistrare=' + nrInreg + "&emailSecretar=" + emailSecretar, data);
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data || "Something went wrong... Try again later");

    } else {
      throw new Error("Network error or other issue");
    }
  }
};


export const rejectCerereAdeverinta = async (motiv, emailSecretar, data) => {
  try {
    const response = await axios.post('/adeverinta/reject?motivRespingere=' + motiv + "&emailSecretar=" + emailSecretar, data);
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data || "Something went wrong... Try again later");

    } else {
      throw new Error("Network error or other issue");
    }
  }
};

export const getAdeverinteAcceptate = async () => {
  try {
    const response = await axios.get("/adeverinta/approved");
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data || "Something went wrong... Try again later");

    } else {
      throw new Error("Network error or other issue");
    }
  }
};

export const getAdeverinteRespinse = async () => {
  try {
    const response = await axios.get("/adeverinta/rejected");
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data || "Something went wrong... Try again later");

    } else {
      throw new Error("Network error or other issue");
    }
  }
};