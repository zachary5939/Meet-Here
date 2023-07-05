import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { login } from "../../store/session";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    dispatch(login({ credential, password }))
      .then(closeModal)
      .catch((res) => {
        if (res.data && res.data.errors) {
          setErrors(res.data.errors);
        }
      });
  };

  const handleDemoUserClick = () => {
    const demoCredential = "demo@user.io";
    const demoPassword = "password";

    dispatch(login({ credential: demoCredential, password: demoPassword }))
      .then(closeModal)
      .catch((res) => {
        if (res.data && res.data.errors) {
          setErrors(res.data.errors);
        }
      });
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="LoginForm">
        <label>
          Username or Email
          <input
            type="text"
            className="LoginUser"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            className="LoginUser"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        <button className="LoginButton" type="submit">
          Log In
        </button>
        <p className="DemoButton" type="button" onClick={handleDemoUserClick}>
          <u>Demo User</u>
        </p>
      </form>
    </>
  );
}

export default LoginFormModal;
