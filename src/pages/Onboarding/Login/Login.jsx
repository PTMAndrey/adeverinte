import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";

import useAuthProvider from "../../../hooks/useAuthProvider";
import useStateProvider from "../../../hooks/useStateProvider";

import { loginAdmin, loginStudent } from "../../../api/API";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { jwtDecode } from "jwt-decode";
import { GoogleIcon, VisibilityIcon, VisibilityOffIcon } from "../../../assets/icons/iconsMUI";
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const { rememberMe, fetchUser, setRememberMe, setUser } = useAuthProvider();
  const { setAlert } = useStateProvider();
  const navigate = useNavigate();

  const [passwordShown, setPasswordShown] = useState(true);

  const [formValue, setFormValue] = useState({
    eMailAdress: "",
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
    if (field === "eMailAdress") {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (formValue.eMailAdress.length === 0)
        return "This field is mandatory!";
      else if (reg.test(formValue.eMailAdress) === false)
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
        const response = await loginAdmin(formValue.eMailAdress, formValue.password);
        if (response !== null) {
          const decodedToken = jwtDecode(response.data.jwt);
          if (rememberMe) localStorage.setItem('token', response.data.jwt);
          else sessionStorage.setItem('token', response.data.jwt);
          // setUser(decodedToken);
          const user = await fetchUser(decodedToken.userId);
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
      const response = await loginStudent(objDecoded.email);
      if (response !== null) {
        if (rememberMe) localStorage.setItem('token', token.credential);
        else sessionStorage.setItem('token', token.credential);
        setUser(response?.data);
        // const user = await fetchUser(objDecoded.userId);
        console.log(response?.data, objDecoded, token)
        //navigate("/");
        // const googleFormsUrl = "https://forms.gle/yJa8VuKWNVJoRUXt5"; // Schimba cu URL-ul tău
        // window.location.href = googleFormsUrl;
        window.open("https://forms.gle/yJa8VuKWNVJoRUXt5");

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
                id="eMailAdress"
                name="eMailAdress"
                value={formValue.eMailAdress}
                onChange={handleChange}
                error={showErrors && checkErrors("eMailAdress") ? true : false}
                helper={showErrors ? checkErrors("eMailAdress") : ""}
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
                if (credentialResponseDecode.hd === 'student.usv.ro' || credentialResponseDecode.hd === 'usv.ro' || credentialResponseDecode.hd === 'usm.ro')
                  handleGoogleLogin(credentialResponseDecode, credentialResponse);
                else {
                  alert('Please use your USV account');
                }
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