import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    const validationErrors = {};
    if (!firstName.length) {
      validationErrors.firstName = "First name field cannot be empty";
    } else if (!lastName.length) {
      validationErrors.lastName = "Last name field cannot be empty";
    } else if (username.length < 4) {
      validationErrors.username = "Username must be four characters or longer";
    } else if (password.length < 6) {
      validationErrors.password = "Password must be six characters or longer";
    } else if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords don't match";
    } else if (!email.length) {
      validationErrors.email = "Email can't be empty";
    }

    setValidationErrors(validationErrors);
  }, [email, username, firstName, lastName, password, confirmPassword]);

  const isFormValid = Object.keys(validationErrors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

return (
  <>
    <section className="modal-box">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="error-container">
          {Object.values(errors).map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
        <label>
          Email
          <input
            type="text"
            className="signup-content"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="signup-content"
          />
        </label>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="signup-content"
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="signup-content"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="signup-content"
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="signup-content"
          />
        </label>
        <button
          className="signup-button"
          type="submit"
          disabled={!isFormValid}
        >
          Sign Up
        </button>
      </form>
    </section>
  </>
);
}

export default SignupFormModal;
