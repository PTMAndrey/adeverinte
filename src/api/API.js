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
    const response = await axios.post('/auth/administrator/login?email='+email+'&parola='+password);
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data|| "Something went wrong... Try again later");

    } else {
      throw new Error("Network error or other issue");
    }
  }
};

export const login = async (email) => {
    try {
      const response = await axios.post('/auth/login?email='+email);
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
  
  
// get admin by id
export const getAdminByID = async (id) => {
  try {
    const response = await axios.get("/administrator/get/" + id);
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


// export const sendEmail = async (data) => {
//   try {
//     const response = await axios.post('/email/send', data);
//     return response;
//   } catch (error) {
//     if (error.response) {
//       throw new Error(error.response.data || "Something went wrong... Try again later");

//     } else {
//       throw new Error("Network error or other issue");
//     }
//   }
// };


 
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

 
// get facultate
export const getSecretar = async () => {
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
