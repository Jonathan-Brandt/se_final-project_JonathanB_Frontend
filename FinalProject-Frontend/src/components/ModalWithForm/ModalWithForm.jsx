import "./ModalWithForm.css";
import { useState } from "react";

function ModalWithForm({
  children,
  buttonText,
  secondButtonText,
  title,
  isOpen,
  onSecondButtonClick,
  closeModal,
  onSubmit,
  isFormFilled,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={closeModal}
          type="button"
          className="modal__close"
        ></button>
        <form onSubmit={onSubmit} className={"modal__form"}>
          {children}
          <div className="modal__buttons">
            <button
              type="submit"
              className={
                !isFormFilled ? "modal__submit" : "modal__submit_active"
              }
              disabled={!isFormFilled}
            >
              {buttonText}
            </button>
            {secondButtonText && (
              <button
                type="button"
                className="modal__switch"
                onClick={onSecondButtonClick}
              >
                {" "}
                or <span className="switch-txt">{secondButtonText}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
