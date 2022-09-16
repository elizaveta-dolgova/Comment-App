import React, { useContext } from "react";
import { AppContext } from "../App";
import "./Modal.css";

function Modal(props) {
  const { closeModal } = useContext(AppContext);

  const closeModalFromOverlay = (ev) => {
    console.log(ev.target);
    if (!ev.target.dataset.overlay) {
      return;
    } else {
      console.log("mouse up");
      ev.target.addEventListener(
        "mouseup",
        (ev2) => {
          console.log(ev2.target);
          if (!ev2.target.dataset.overlay) {
            return;
          } else {
            closeModal();
          }
        },
        { once: true }
      );
    }
  };

  return (
    <div
      className="modal-wrapper"
      data-overlay
      onMouseDown={closeModalFromOverlay}
    >
      <div className="modal-card">
        <button className="modal-card__close-btn" onClick={closeModal} />
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
