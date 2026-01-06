import ModalWithForm from "../ModalWithForm/ModalWithForm";

import { useState, useEffect } from "react";

function LoginModal({
  closeModal,
  isOpen,
  loginClick,
  onLoginModalSubmit,
  onSecondButtonClick,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      setPassword("");
      setEmail("");
    }
  }, [isOpen]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginModalSubmit({ email, password });
  };

  const switchModal = () => {
    onSecondButtonClick();
  };

  return (
    <ModalWithForm
      title="Sign in"
      buttonText="Sign in"
      secondButtonText={"or Sign up"}
      closeModal={closeModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      switchModal={switchModal}
      loginClick={loginClick}
      onSecondButtonClick={onSecondButtonClick}
    >
      <label htmlFor="email" className="modal__label">
        Email{""}
        <input
          type="Email"
          className="modal__input"
          id="email"
          placeholder="email"
          required
          onChange={handleEmailChange}
          value={email}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          type="text"
          className="modal__input"
          id="login-password"
          placeholder="password"
          required
          onChange={handlePasswordChange}
          value={password}
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
