import React from "react";
import NewItemForm from "./components/NewItemForm";
import { useState } from "react";
import CommentList from "./components/CommentList";
import DetailsModal from "./components/DetailsModal";
import EmptyPage from "./components/EmptyPage";

export const AppContext = React.createContext();

function App() {
  const [items, setItems] = useState([]);

  const [modalData, setModalData] = useState(null);

  const addItem = (result) => {
    setItems((prevState) => [...prevState, result]);
    closeModal();
  };

  const editItem = (result) => {
    setItems((prevState) =>
      prevState.map((item) => (item.date === result.date ? result : item))
    );
    closeModal();
  };

  const deleteItem = (id) => {
    setItems((prevState) => prevState.filter((item) => item.date !== id));
  };

  const showModal = (data) => {
    setModalData(data);
  };

  const closeModal = () => {
    setModalData(null);
  };

  const api = {
    items,
    modalItem: modalData?.data || null,
    setItems,
    addItem,
    editItem,
    deleteItem,
    showModal,
    closeModal,
  };

  return (
    <AppContext.Provider value={api}>
      <div className={`app${modalData ? " app--modal-open" : ""}`}>
        {items.length ? <CommentList /> : <EmptyPage />}
        {modalData?.type === "detail" && <DetailsModal />}
        {modalData?.type === "form" && <NewItemForm />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
