import ModalWithForm from "../ModalWithForm/ModalWithForm";

import { useState, useEffect } from "react";

function LoginModal({
  closeModal,
  isOpen,
  loginClick,
  onLoginModalSubmit,
  onSecondButtonClick,
}) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const [errors, setErrors] = useState({});

  const isFormFilled =
    formData.email.length > 0 && formData.password.length > 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (isOpen) {
      setFormData({ email: "", password: "" });
      setErrors({});
    }
  }, [isOpen]);

  const validate = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onLoginModalSubmit({
        email: formData.email,
        password: formData.password,
      });
      console.log("Log-in successful :)");
    }
  };

  const switchModal = () => {
    onSecondButtonClick();
  };

  return (
    <ModalWithForm
      title="Sign in"
      buttonText="Sign in"
      secondButtonText={" Sign up"}
      closeModal={closeModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      switchModal={switchModal}
      loginClick={loginClick}
      onSecondButtonClick={onSecondButtonClick}
      isFormFilled={isFormFilled}
    >
      <label htmlFor="email" className="modal__label">
        Email{""}
        <input
          name="email"
          type="Email"
          className="modal__input"
          id="email"
          placeholder="Enter email"
          required
          onChange={handleChange}
          value={formData.email}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </label>
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          name="password"
          type="password"
          className="modal__input"
          id="login-password"
          placeholder="Enter password"
          required
          onChange={handleChange}
          value={formData.password}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
