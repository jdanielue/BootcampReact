import React from "react";
import "./Modal.css";

export const Modal = ({children, isOpen, closeModal}) => {
  return (
    <article className={`modal ${isOpen && "is-open"}`}>
      <div className="modal-container"></div>
      
      {children}
    </article>
  );
};
