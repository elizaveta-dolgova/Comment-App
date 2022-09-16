import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import "./DetailsModal.css";
import Modal from "./Modal";

function DetailsModal() {
  const { modalItem } = useContext(AppContext);
  const [img, setImg] = useState(null);

  useEffect(() => {
    let reader;
    if (modalItem.files) {
      reader = new FileReader();
      reader.onload = (e) => {
        setImg(e.target.result);
      };
      reader.readAsDataURL(modalItem.files[0]);
    }

    return () => {
      if (reader && !img) {
        reader.abort();
      }
    };
  }, []);

  return (
    <Modal>
      <figure className="modal-content">
        <img src={img} className="modal-content__image" />
        <blockquote className="modal-content__comment">
          <p>{modalItem.comment}</p>
        </blockquote>
        <figcaption className="modal-content__author">
          {modalItem.name} from {modalItem.address}
          <div> in {new Date(modalItem.date).toLocaleString()}</div>
        </figcaption>
      </figure>
    </Modal>
  );
}

export default DetailsModal;
