import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";
import logo from "../../assets/meetlogo.png"

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <li>
          <NavLink exact to="/create-group">
            <button className="create-group-button">Create a New Group</button>
          </NavLink>
        </li>
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      </>
    );
  } else {
    sessionLinks = (
      <li>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
          className="login"
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
          className="signup"
        />
      </li>
    );
  }

  return (
    <nav>
      <div className="logo-container">
        <NavLink exact to="/">
        <img src={logo} alt="Meet Here Logo" className="logo-image" />
        </NavLink>
      </div>
      <ul className="navigation-links">
        {isLoaded && sessionLinks}
      </ul>
    </nav>
  );
}

export default Navigation;
