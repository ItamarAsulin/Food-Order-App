import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <div className={classes.backdrop}></div>,
        document.getElementById("modal-backdrop")
      )}
      {ReactDOM.createPortal(
        <div className={classes.modal}>{props.children}</div>,
        document.getElementById("modal-overlay")
      )}
    </React.Fragment>
  );
};

export default Modal;
