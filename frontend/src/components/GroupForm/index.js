import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as groupActions from "../../store/groups";
import "./GroupForm.css"

export const GroupForm = ({ formType, group }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formData, setFormData] = useState({
    location: "",
    name: "",
    about: "",
    type: undefined,
    privacy: undefined,
    url: "",
  });


  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formType === "Create") {
      const errors = {};
      const { location, name, about, type, privacy, url } = formData;

      if (!location || !location.includes(",")) {
        errors.location = "Location is required";
      }
      if (!name) {
        errors.name = "Name is required";
      }
      if (about.length < 30) {
        errors.about = "Description must be at least 30 characters long";
      }
      if (type === undefined) {
        errors.type = "Group Type is required";
      }
      if (privacy === undefined) {
        errors.privacy = "Visibility type is required";
      }

      setValidationErrors(errors);

      if (Object.values(errors).length) {
        return;
      }

      const groupData = {
        city: location.split(",")[0],
        state: location.split(",")[1],
        name,
        about,
        type,
        private: Boolean(privacy),
        url,
      };

      dispatch(groupActions.thunkCreateGroup(groupData, url))
      .then((res) => {
        history.push(`/groups/${res.id}`);
      })
      .catch((err) => {
        console.error("Error creating group:", err);
      });
  }
};

  return (
    <form className="form-step-form" onSubmit={handleSubmit}>
      <div className="form-container">
        <div className="form-header">
          <span className="form-title">BECOME AN ORGANIZER</span>
          <h2>
            We'll walk you through a few steps to build your local community
          </h2>
        </div>
        <hr />
        <div className="form-step">
          <h3>First, set your group's location</h3>
          <span>
            Meetup groups meet locally, in person and online.
          </span>
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="City, STATE"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
            {validationErrors.location && (
              <span className="errors">{validationErrors.location}</span>
            )}
          </div>
          <div className="form-group">
            <h3>What will your group's name be?</h3>
            <span>
              Choose a name that will give people a clear idea of what the group
              is about.
            </span>
            <span>
              You can edit this later if you change your mind.
            </span>
            <input
              type="text"
              className="form-input"
              placeholder="What is your group name?"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {validationErrors.name && (
              <span className="errors">{validationErrors.name}</span>
            )}
          </div>
          <div className="form-group">
            <h3>Now describe what your group will be about</h3>
            <span>
              People will see this when we promote your group, but you'll be
              able to add to it later, too.
            </span>
            <span>1. What's the purpose of the group?</span>
            <span>2. Who should join?</span>
            <span>3. What will you do at your events?</span>
            <textarea
              className="form-textarea"
              name="about"
              value={formData.about}
              placeholder="Please write at least 30 characters"
              onChange={handleInputChange}
            ></textarea>
            {validationErrors.about && (
              <span className="errors">{validationErrors.about}</span>
            )}
          </div>
          <div className="form-group">
            <h3>Final steps...</h3>
            <span>Is this an in person or online group?</span>
            <select
              className="form-select"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
            >
              <option value={undefined}>(select one)</option>
              <option value="Online">Online</option>
              <option value="In person">In person</option>
            </select>
            {validationErrors.type && (
              <span className="errors">{validationErrors.type}</span>
            )}
            <span>Is this group private or public?</span>
            <select
              className="form-select"
              name="privacy"
              value={formData.privacy}
              onChange={handleInputChange}
            >
              <option value={undefined}>(select one)</option>
              <option value="private">Private</option>
                <option value="public">Public</option>
            </select>
            {validationErrors.privacy && (
              <span className="errors">{validationErrors.privacy}</span>
            )}
            <span>Please add an image URL for your group below.</span>
            <input
              type="url"
              className="form-input"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
            />
            {validationErrors.url && (
              <span className="errors">{validationErrors.url}</span>
            )}
          </div>
          <hr />
          <button
            type="submit"
            className="form-submit-btn"
            onClick={handleSubmit}
          >
            Create group
          </button>
        </div>
      </div>
    </form>

  );
};

export default GroupForm;
