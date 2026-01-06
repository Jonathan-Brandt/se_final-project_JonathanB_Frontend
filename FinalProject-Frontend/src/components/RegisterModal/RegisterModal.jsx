import ModalWithForm from "../ModalWithForm/ModalWithForm";

import { useState, useEffect } from "react";

function RegisterModal({
  closeModal,
  isOpen,
  registerClick,
  onRegisterModalSubmit,
  onSecondButtonClick,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterModalSubmit({ name, avatar, email, password });
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign up"
      secondButtonText="Sign in"
      closeModal={closeModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onSecondButtonClick={onSecondButtonClick}
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="Email"
          className="modal__input"
          id="register-email"
          placeholder="Enter your email"
          required
          onChange={handleEmailChange}
          value={email}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="register-password"
          placeholder="Enter password"
          required
          onChange={handlePasswordChange}
          value={password}
        />
      </label>
      <label htmlFor="name" className="modal__label">
        Username{" "}
        <input
          type="text"
          className="modal__input"
          id="register-name"
          placeholder="Enter your username"
          required
          onChange={handleNameChange}
          value={name}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
