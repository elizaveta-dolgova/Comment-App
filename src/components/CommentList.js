import React, { Fragment, useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import "./CommentList.css";

const sortingFn = (array, ascending) => {
  if (ascending) {
    return array
      .slice()
      .sort((firstItem, secItem) => firstItem.date - secItem.date);
  } else {
    return array
      .slice()
      .sort((firstItem, secItem) => secItem.date - firstItem.date);
  }
};

function CommentList() {
  const { items, setItems, deleteItem, editItem, showModal } =
    useContext(AppContext);
  const [isSortingAscending, setSortingAscending] = useState(true);

  useEffect(() => {
    setItems(sortingFn(items, isSortingAscending));
  }, [isSortingAscending]);

  const sortBtnHandler = () => {
    setSortingAscending(!isSortingAscending);
  };

  return (
    <div className='comment-container'>
      <div className="list-header">
        <button
          className={`list-header__sort-btn${isSortingAscending ? ' list-header__sort-btn--desc' : ''}`}
          onClick={sortBtnHandler}
        >
          Sort by Date
        </button>
        <button
          className="list-header__add-btn"
          onClick={() => {
            showModal({ type: "form", data: null });
          }}
        >
          Add new item
        </button>
      </div>
      <ul className="comment-list">
        {items.map((item) => (
          <li key={item.date} className="comment-item">
            <figure className="comment-item__figure">
              <blockquote className="comment-item__quote">
                <p>{item.comment}</p>
              </blockquote>
              <figcaption className="comment-item__info">
                {item.name} from {item.address} 
                <div> in {new Date(item.date).toLocaleString()}</div>
              </figcaption>
            </figure>
            <div className='comment-item__btn-row'>
              <button
                className="comment-item__btn"
                onClick={() => showModal({ type: "detail", data: item })}
              >
                Show Details
              </button>
              <button
                className="comment-item__btn"
                onClick={() => deleteItem(item.date)}
              >
                Delete Item
              </button>
              <button
                className="comment-item__btn"
                onClick={() => showModal({ type: "form", data: item })}
              >
                Edit Item
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
