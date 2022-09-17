import React, { useContext, useReducer, useRef, useEffect } from "react";
import { AppContext } from "../App";
import Modal from "./Modal";
import "./NewItemForm.css";

const formReducer = (state, { type, value, field }) => {
  switch (type) {
    case "INPUT":
      return {
        ...state,
        [field]: {
          ...state[field],
          value: value,
          isValid: value.trim() !== "",
        },
      };

    case "BLUR":
      return {
        ...state,
        [field]: {
          ...state[field],
          wasTouched: true,
          isValid: state[field].value.trim() !== "",
        },
      };

    case "ADD_FILE":
      return {
        ...state,
        files: {
          ...state.files,
          value: value,
        },
      };
    
    default:
      return state;
  }
};

const getInitialState = (modalItem) => {
  if (modalItem) {
    return {
      name: { value: modalItem.name, isValid: true, wasTouched: true },
      address: { value: modalItem.address, isValid: true, wasTouched: true },
      comment: { value: modalItem.comment, isValid: true, wasTouched: true },
      files: { value: modalItem.files, isValid: true },
    };
  } else {
    return {
      name: { value: "", isValid: false, wasTouched: false },
      address: { value: "", isValid: false, wasTouched: false },
      comment: { value: "", isValid: false, wasTouched: false },
      files: { value: "", isValid: true },
    };
  }
};

function NewItemForm() {
  const inputRef = useRef(null);

  const { addItem, modalItem, editItem } = useContext(AppContext);

  const [formState, dispatch] = useReducer(
    formReducer,
    getInitialState(modalItem)
  );

  useEffect(() => { inputRef.current.focus() }, []);

  const nameInputIsInvalid = !formState.name.isValid && formState.name.wasTouched;
  const addressInputIsInvalid = !formState.address.isValid && formState.address.wasTouched;
  const commentInputIsInvalid = !formState.comment.isValid && formState.comment.wasTouched;

  const nameInputHandler = (ev) => {
    dispatch({ type: "INPUT", value: ev.target.value, field: "name" });
  };

  const nameInputBlurHandler = () => {
    dispatch({ type: "BLUR", field: "name" });
  };

  const addressInputHandler = (ev) => {
    dispatch({ type: "INPUT", value: ev.target.value, field: "address" });
  };

  const addressInputBlurHandler = () => {
    dispatch({ type: "BLUR", field: "address" });
  };

  const commentHandler = (ev) => {
    dispatch({ type: "INPUT", value: ev.target.value, field: 'comment' });
  };

  const commentInputBlur = () => {
    dispatch({ type: 'BLUR', field: "comment" })
  }

  const onFileChangeHandler = (ev) => {
    dispatch({ type: "ADD_FILE", value: ev.target.files });
  };

  const formSubmitHandler = (ev) => {
    ev.preventDefault();
    dispatch({ type: "BLUR", field: "name" });
    dispatch({ type: "BLUR", field: "address" });
    dispatch({ type: 'BLUR', field: 'comment' });

    if (!formState.name.isValid || !formState.address.isValid || !formState.comment.isValid) {
      return;
    }

    const result = {
      ...Object.keys(formState).reduce((currVal, nextVal) => {
        currVal[nextVal] = formState[nextVal].value;
        return currVal;
      }, {}),
      date: modalItem?.date || Date.now(),
    };

    modalItem ? editItem(result) : addItem(result);
  };

  const { name, address, comment, files } = formState;

  return (
    <Modal>
      <form className="new-item-form" onSubmit={formSubmitHandler}>
        <label className="new-item-form__label">
          Full Name*
          <input
            ref={inputRef}
            className={`new-item-form__input ${nameInputIsInvalid ? " new-item-form__input--invalid" : ""}`}
            type="text"
            onChange={nameInputHandler}
            onBlur={nameInputBlurHandler}
            value={name.value}
          />
          {nameInputIsInvalid && (
            <p className="error-message">Name must not be empty</p>
          )}
        </label>
        <label className="new-item-form__label">
          Address*
          <input
            className={`new-item-form__input${addressInputIsInvalid ? " new-item-form__input--invalid" : ""
              }`}
            type="text"
            id="address"
            onChange={addressInputHandler}
            onBlur={addressInputBlurHandler}
            value={address.value}
          />
          {addressInputIsInvalid && (
            <p className="error-message">Address must not be empty</p>
          )}
        </label>
        <label className="new-item-form__label">
          Type your comment*
          <textarea
            className={`new-item-form__textarea${commentInputIsInvalid ? ' new-item-form__textarea--invalid' : ''}`}
            onChange={commentHandler}
            onBlur={commentInputBlur}
            value={comment.value}
          />
          {commentInputIsInvalid && <p className="error-message">Comment must not be empty</p>}
        </label>
        {files.value && (
          <ul>
            {Array.from(files.value).map((item) => (
              <li key={item.size} className="new-item-form__input-file-name">
                {item.name} - {(item.size / 1024).toFixed(2)} kb
              </li>
            ))}
          </ul>
        )}
        <label className="new-item-form__btn">
          Add image
          <input
            className="new-item-form__input-file"
            type="file"
            id="image"
            accept="image/png, image/gif, image/jpeg"
            onChange={onFileChangeHandler}
          />
        </label>
        <button className="new-item-form__btn">Submit</button>
      </form>
    </Modal>
  );
}

export default NewItemForm;
