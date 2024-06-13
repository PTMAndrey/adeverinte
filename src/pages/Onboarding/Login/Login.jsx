import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";

import useAuthProvider from "../../../hooks/useAuthProvider";
import useStateProvider from "../../../hooks/useStateProvider";

import { loginAdmin, login } from "../../../api/API";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { jwtDecode } from "jwt-decode";
import { GoogleIcon, VisibilityIcon, VisibilityOffIcon } from "../../../assets/icons/iconsMUI";
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const allowedDomains = ['student.usv.ro', 'usv.ro', 'usm.ro'];
  const { rememberMe, fetchUser, setRememberMe, setUser, logout } = useAuthProvider();
  const { setAlert } = useStateProvider();
  const navigate = useNavigate();

  const [passwordShown, setPasswordShown] = useState(true);

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [showErrors, setShowErrors] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const checkErrors = (field) => {
    // email
    if (field === "email") {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (formValue.email.length === 0)
        return "This field is mandatory!";
      else if (reg.test(formValue.email) === false)
        return "Email address is invalid!";
    }

    // password
    if (field === "password") {
      if (formValue.password.length < 7)
        return "Password must have at least 7 characters!";
    }

    return "";
  };

  // check if form is valid
  const isFormValid = () => {
    let isValid = true;
    Object.keys(formValue).forEach((field) => {
      if (checkErrors(field)) {
        isValid = false;
      }
    });
    return isValid;
  };

  const handleLogin = async () => {
    if (!isFormValid()) {
      setShowErrors(true);
      setAlert({
        type: "danger",
        message: "Fill all the required fields correctly.",
      });
    }
    if (isFormValid()) {
      setShowErrors(false);
      try {
        const response = await loginAdmin(formValue.email, formValue.password);
        if (response.status === 200) {
          //! emailToLog => Id Admin Logged in Session
          if (rememberMe) localStorage.setItem('emailToLog', formValue.email);
          else sessionStorage.setItem('emailToLog', formValue.email);
          if (rememberMe) localStorage.setItem('rol', response?.data.rol);
          else sessionStorage.setItem('rol', response?.data.rol);
          setUser(response?.data);
          navigate("/");

          setAlert({
            type: "success",
            message: "Login successfully",
          });
        }
        else {
          setAlert({
            type: "danger",
            message: "Something went wrong! Check your credentials",
          });
        }
      } catch (error) {
        console.log(error.message, "error");
        setAlert({
          type: "danger",
          message: error.message || "Something went wrong...", // Use the error message from the catch
        });
      }
    }
  };


  const handleGoogleLogin = async (objDecoded, token) => {
    try {
      const response = await login(objDecoded.email);
      if (response.status === 200) {
        // if (rememberMe) localStorage.setItem('emailToLog', token.credential);
        // else sessionStorage.setItem('emailToLog', token.credential);
        // const user = await fetchUser(objDecoded.idStudent);
        if (response?.data.rol === 'SECRETAR') {
          if (rememberMe) localStorage.setItem('emailToLog', response?.data.emailSecretar);
          else sessionStorage.setItem('emailToLog', response?.data.emailSecretar);
          if (rememberMe) localStorage.setItem('rol', response?.data.rol);
          else sessionStorage.setItem('rol', response?.data.rol);
          setUser(response?.data);
        }
        if (response?.data.rol === 'STUDENT') {
          if (rememberMe) localStorage.removeItem('emailToLog', response?.data.emailStudent);
          else sessionStorage.removeItem('emailToLog', response?.data.emailStudent);
          if (rememberMe) localStorage.removeItem('rol', response?.data.rol);
          else sessionStorage.removeItem('rol', response?.data.rol);
          setUser(response?.data);
          console.log(response?.data, objDecoded, token)

          const googleFormsUrl = "https://forms.gle/yJa8VuKWNVJoRUXt5";
          window.location.href = googleFormsUrl;
        }


        setAlert({
          type: "success",
          message: "Login successfully",
        });
      }
      else {
        setAlert({
          type: "danger",
          message: "Something went wrong! Check your credentials",
        });
      }
    } catch (error) {
      console.log(error.message, "error");
      setAlert({
        type: "danger",
        message: error.message || "Something went wrong...", // Use the error message from the catch
      });

    }
  }

  const passToggleHandler = () => {
    setPasswordShown(!passwordShown);
  };


  return (
    <div className={styles.auth}>
      <div className={styles.containerAuth}>
        <div className={styles.contentContainerForm}>
          <div className={styles.form}>
            <div className={styles.formTitle}>
              <p className={styles.title}>ADEVERINTE USV</p>
            </div>

            <div className={styles.formInput}>
              {/* email */}
              <Input
                type="email"
                placeholder={"Email"}
                required
                label="Email *"
                id="email"
                name="email"
                value={formValue.email}
                onChange={handleChange}
                error={showErrors && checkErrors("email") ? true : false}
                helper={showErrors ? checkErrors("email") : ""}
              />


              <Input
                type={passwordShown ? "password" : "text"}
                placeholder={"Password"}
                required
                label="Password *"
                id="password"
                name="password"
                value={formValue.password}
                onChange={handleChange}
                error={showErrors && checkErrors("password") ? true : false}
                helper={showErrors ? checkErrors("password") : ""}
                icon={passwordShown ? <VisibilityIcon /> : <VisibilityOffIcon />}
                onIconClick={passToggleHandler}
              />
              <span className={styles.textpwdInfo}>
                At least 7 characters.
              </span>

            </div>
          </div>

          <div className={styles.rememberMe}>
            <div
              className={styles.checkBox}
              type="button"
              onClick={(e) => setRememberMe(!rememberMe)}
            >
              <Input
                type="checkbox"
                label=""
                value={rememberMe}
                checked={rememberMe}
                onClick={(e) => setRememberMe(!rememberMe)}
              />
              <p className={styles.textRememberMe}>Remember me!</p>
            </div>

          </div>
        </div>

        <div className={styles.contentContainerAuthOptions}>
          <div className={styles.contentContainerButtons}>
            <Button variant="primary" label="Login" onClick={handleLogin} />
          </div>
          <div className={styles.contentContainerButtons}>
            <GoogleLogin
              onSuccess={credentialResponse => {
                const credentialResponseDecode = jwtDecode(credentialResponse.credential);
                console.log(credentialResponseDecode);
                //? this code below is important
                //! DO NOT DELETE
                //if (allowedDomains.includes(credentialResponseDecode.hd))
                handleGoogleLogin(credentialResponseDecode, credentialResponse);
                //else {
                //alert('Please use your USV account');
                //}
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;