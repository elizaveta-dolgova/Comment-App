import React, { useContext } from "react";
import { AppContext } from "../App";
import "./EmptyPage.css";

function EmptyPage(props) {
  const { showModal } = useContext(AppContext);

  return (
    <div className="no-items-container">
      <p>No items found</p>
      <p className="no-items-container__content">But you can change it</p>
      <button
        onClick={() => {
          showModal({ type: "form", data: null });
        }}
        className="no-items-container__btn"
      >
        Add new item
      </button>
    </div>
  );
}

export default EmptyPage;
