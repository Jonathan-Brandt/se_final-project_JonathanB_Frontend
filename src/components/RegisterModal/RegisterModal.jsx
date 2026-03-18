import ModalWithForm from "../ModalWithForm/ModalWithForm";

import { useState, useEffect } from "react";

function RegisterModal({
  closeModal,
  isOpen,
  registerClick,
  onRegisterModalSubmit,
  onSecondButtonClick,
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userName: "",
  });

  const [errors, setErrors] = useState({});

  const isFormFilled =
    formData.email.length > 0 &&
    formData.password.length > 0 &&
    formData.userName.length > 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (isOpen) {
      setFormData({ email: "", password: "", userName: "" });
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

    if (!values.userName) {
      errors.userName = "A name is required";
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

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign up"
      secondButtonText=" Sign in"
      closeModal={closeModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onSecondButtonClick={onSecondButtonClick}
      isFormFilled={isFormFilled}
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="Email"
          className="modal__input"
          id="register-email"
          placeholder="Enter your email"
          required
          onChange={handleChange}
          value={formData.email}
          name="email"
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </label>
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="register-password"
          placeholder="Enter password"
          required
          onChange={handleChange}
          value={formData.password}
          name="password"
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </label>
      <label htmlFor="name" className="modal__label">
        Username{" "}
        <input
          type="text"
          className="modal__input"
          id="register-name"
          placeholder="Enter your username"
          required
          onChange={handleChange}
          value={formData.userName}
          name="userName"
        />
        {errors.userName && <span className="error">{errors.userName}</span>}
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
