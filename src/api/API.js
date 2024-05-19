import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080';

axios.defaults.headers = {
  // 'Content-Type': 'multipart/form-data',
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
  'Content-Type': 'application/json'
};
//? token will be added by auth middleware
// axios.interceptors.request.use(
//   (config) => {
//     // Attempt to retrieve the token from localStorage or sessionStorage
//     const token = localStorage.getItem("token") || sessionStorage.getItem("token");

//     // If the token exists, append it to the Authorization header
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );


// ---------------------------- Calls ----------------------------------
export const loginAdmin = async (email, password) => {
  try {
    const response = await axios.post('/auth/login?email='+email+'&password='+password);
    if (response.data.jwt === '')
      return null;
    else
      return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data|| "Something went wrong... Try again later");

    } else {
      throw new Error("Network error or other issue");
    }
  }
};

export const loginStudent = async (emailStudent) => {
    try {
      const response = await axios.post('/auth/login?emailStudent='+emailStudent);
      if (response.data.jwt === '')
        return null;
      else
        return response;
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        throw new Error(error.response.data|| "Something went wrong... Try again later");
  
      } else {
        throw new Error("Network error or other issue");
      }
    }
  };
  
  
// get user by id
export const getUserById = async (id) => {
  try {
    const response = await axios.get("/user/getById?idUser=" + id);
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data || "Something went wrong... Try again later");

    } else {
      throw new Error("Network error or other issue");
    }
  }
};



export const sendEmailInvitations = async (data) => {
  try {
    const response = await axios.post('/email/send', data);
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data || "Something went wrong... Try again later");

    } else {
      throw new Error("Network error or other issue");
    }
  }
};