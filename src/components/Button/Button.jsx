import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";
import { PersonSearchRoundedIcon } from "../../assets/icons/iconsMUI";

const Button = ({
  className,
  variant,
  label,
  icon,
  position,
  disabled,
  onClick,
  iconRol,
  border,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]} ${styles[position]} ${className} ${border ? styles.border : styles.noBorder}`}
    >
      {
        iconRol === 'search' ? <PersonSearchRoundedIcon /> : null
      }
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "tertiary", "destructive", "transparent"]).isRequired,

  label: PropTypes.string.isRequired,
  icon: PropTypes.node,
  position: PropTypes.oneOf(["left", "right", "none"]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  iconRol: PropTypes.string,
  border: PropTypes.bool,
};

Button.defaultProps = {
  variant: "primary",
  label: "Buton",
  position: "none",
  disabled: false,
  onClick: () => { },
  className: "",
  icon: null,
  iconRol: "",
  border: true,
};

export default Button;
