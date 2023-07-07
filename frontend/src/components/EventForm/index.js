import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkCreateEvent } from "../../store/events";
import { thunkGetGroupDetails } from "../../store/groups";
import "./EventForm.css";

export function EventForm({ formType }) {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const groupStore = useSelector((state) => state.groups);
  const group = groupStore[groupId] ? groupStore[groupId] : "";
  const [name, setName] = useState("");
  const [eventType, setEventType] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(thunkGetGroupDetails(groupId));
  }, [dispatch, groupId]);



  const handleSubmit = (e) => {
    e.preventDefault();
    if (formType === "Create") {
      const errors = {};

      if (!name) {
        errors.name = "Name is required";
      }

      if (!eventType) {
        errors.eventType = "Event Type is required";
      }

      // Convert capacity to an integer
      const parsedCapacity = parseInt(capacity, 10);
      if (!parsedCapacity || !Number.isInteger(parsedCapacity)) {
        errors.capacity = "Capacity must be a whole number";
      }

      // Convert price to a number
      const parsedPrice = parseFloat(price);
      if (isNaN(parsedPrice) || parsedPrice <= 0) {
        errors.price = "Price is invalid";
      }

      if (!startDate) {
        errors.startDate = "Start date is required";
      } else if (new Date(startDate) < new Date()) {
        errors.startDate = "Start date must be in the future";
      }

      if (!endDate) {
        errors.endDate = "End date is required";
      }

      if (startDate > endDate) {
        errors.startDate = "Start date cannot be after end date";
        errors.endDate = "End date cannot be before start date";
      }

      if (!imageURL) {
        errors.imageURL = "Image URL is required";
      } else if (
        !imageURL.endsWith(".jpeg") &&
        !imageURL.endsWith(".jpg") &&
        !imageURL.endsWith(".png")
      ) {
        errors.imageURL = "Image URL must end with .png, .jpg, or .jpeg";
      }

      if (!description) {
        errors.description = "Description is required";
      } else if (description.length < 30) {
        errors.description = "Description must be at least 30 characters long";
      }

      if (Object.keys(errors).length === 0) {
        const form = {
          venueId: null,
          name,
          type: eventType,
          capacity: parsedCapacity,
          price: parsedPrice,
          description,
          startDate,
          endDate,
        };
        dispatch(thunkCreateEvent(form, groupId, imageURL));
      }

      setErrors(errors);
    }
  };

  return (
    <>
      {formType === "Create" && (
        <form onSubmit={handleSubmit}>
          <div className="create-event-container">
            <p>Create a new event for {group.name}</p>
            <p>What is the name of your event?</p>
            <input
              placeholder="Event Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <span className="create-event-errors-section-1">
                {errors.name}
              </span>
            )}
            <p className="create-event-borders" />
            <p>Is this an in-person or online event?</p>
            <select
              className="create-event-select-location"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            >
              <option value="nothing">(select one)</option>
              <option value="In person">In person</option>
              <option value="Online">Online</option>
            </select>
            {errors.eventType && (
              <span className="create-event-errors-section-2">
                {errors.eventType}
              </span>
            )}
            <p>How many people can attend this event?</p>
            <input
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="# of people"
              type="number"
              step="1"
            />
            {errors.capacity && (
              <span className="create-event-errors-section-2">
                {errors.capacity}
              </span>
            )}
            <p>What is the price for your event?</p>
            <div className="create-event-price-label">
              <span className="create-event-price-symbol">$</span>
              <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0"
            className="price-input"
          />
            </div>
            {errors.price && (
              <span className="create-event-errors-section-3">
                {errors.price}
              </span>
            )}
            <p className="create-event-borders" />
            <p>When does your event start?</p>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            {errors.startDate && (
              <span className="create-event-errors-section-4">
                {errors.startDate}
              </span>
            )}
            <p>When does your event end?</p>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            {errors.endDate && (
              <span className="create-event-errors-section-4">
                {errors.endDate}
              </span>
            )}
            <p className="create-event-borders" />
            <p>Please add an image URL for your event below:</p>
            <input
              style={{ fontSize: "12px" }}
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              placeholder="Image URL"
            />
            {errors.imageURL && (
              <span className="create-event-errors-section-5">
                {errors.imageURL}
              </span>
            )}
            <p className="create-event-borders" />
            <p
            >
              Please describe your event
            </p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please include at least 30 characters"
            />
            {errors.description && (
              <span className="create-event-errors-section-6">
                {errors.description}
              </span>
            )}
            <div></div>
            <button type="submit">Create event</button>
          </div>
        </form>
      )}
    </>
  );
}

export default EventForm;
